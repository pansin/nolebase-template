# **非结构化数据安全体系构建：WPS Office元数据嵌入与签名模式深度技术实施指南**

## **1\. 执行摘要**

本报告旨在为《非结构化数据安全体系构建》提供深度的技术实施细节与兼容性评估，核心聚焦于如何在异构的企业IT环境中，特别是以**WPS Office**（包括Windows与Linux信创版本）为主要生产力工具的场景下，落地基于\*\*ISO 16684-1 XMP（Extensible Metadata Platform）**元数据驱动与**ETSI TS 102 778 PAdES（PDF Advanced Electronic Signatures）\*\*数字签名绑定的数据自防御体系。

在当前数字化转型的深水区，非结构化数据的流动性已超越了传统网络边界的管控能力。传统的DLP（数据防泄露）技术严重依赖内容识别（正则、关键字、指纹），在面对高频流转的办公文档时，常因上下文缺失导致高误报或漏报。本方案提出的"数据自描述"（通过XMP）与"数据自证明"（通过PAdES）机制，旨在将安全属性内化为数据本身的DNA。然而，这一理论架构在工程落地时面临诸多挑战，包括WPS Office在不同平台下的API差异、Linux环境下的无头（Headless）处理能力限制、以及开源与商业DLP产品对自定义元数据支持的参差不齐。

本报告通过深入剖析WPS Open Platform的接口能力、开源安全栈（Wazuh, Zeek, Suricata）的脚本化扩展潜力，以及国内外主流DLP（Symantec, Forcepoint, 天空卫士, 深信服, IP-guard）的检测引擎特性，得出以下核心结论：

1. **WPS Office具备基础支持但需中间件增强**：WPS Office在Windows端通过COM/VSTO接口提供了对自定义文档属性（Custom Document Properties）的完善支持，但在Linux信创环境下，必须依赖pywpsrpc等RPC中间件来实现自动化的元数据注入与签名，原生的命令行工具（如wpspdf）功能有限。  
2. **PAdES-LTA的实现需依赖服务端协同**：WPS客户端原生的签名功能多停留在PAdES-B或PAdES-T级别，要实现满足长期归档（10年以上）要求的PAdES-LTA，需要引入独立的时间戳服务（TSA）与在线证书状态协议（OCSP）响应的嵌入机制，建议采用"客户端视觉签名+服务端密码学增强"的混合模式。  
3. **DLP生态的两极分化**：国际大厂（Symantec）在自定义XML Schema解析上更为成熟，适合精细化的XMP策略；而国产DLP（如天空卫士、深信服）则更擅长通过深度内容检测（DCI）与AI行为分析来辅助识别，实施时需根据产品特性调整策略配置，从"纯元数据匹配"转向"元数据+内容特征"的双重验证。  
4. **开源栈的二次开发是关键**：Wazuh与Zeek均不具备开箱即用的XMP深度解析能力，必须通过开发Active Response脚本（集成ExifTool）和Lua解析器来构建闭环的检测响应能力。

本指南将详细阐述上述技术路径，为构建高韧性的非结构化数据安全体系提供可操作的蓝图。

## ---

**2\. 核心技术架构深度解析**

在深入具体产品实现之前，必须从比特级层面理解支撑本体系的两大核心标准：XMP与PAdES。它们并非简单的标签或水印，而是嵌入文件结构的复杂数据对象。

### **2.1. ISO 16684-1 XMP：企业安全元数据的通用容器**

XMP的设计初衷是为数字资产提供标准化的元数据封装。在安全视角下，它超越了传统文件属性（如NTFS流或Office属性）的局限性，提供了跨平台、跨格式的持久化能力 1。

#### **2.1.1. 数据模型与RDF图谱**

XMP的核心并非简单的键值对（Key-Value Pair），而是基于W3C的**RDF（Resource Description Framework，资源描述框架）**。这是一个基于图（Graph）的数据模型，允许描述资源之间极其复杂的逻辑关系。

* **结构化优势**：相比于Office的“自定义属性”只能存储简单的字符串或数字，XMP可以存储结构体、数组甚至嵌套对象。例如，在定义“知悉范围”（Compartment）时，XMP可以使用rdf:Bag（无序数组）来存储多个部门ID（如\`\`），这在进行细粒度的访问控制（ABAC）时至关重要。  
* **序列化机制**：XMP数据通常被序列化为XML格式，并被封装在一个名为xpacket的指令包中。这种设计实现了**可读性与兼容性**的分离——不支持XMP的应用程序（如旧版记事本或基础图片查看器）会将其视为不可见数据而忽略，从而不影响文件内容的正常渲染；而安全检查工具（如DLP扫描器）则可以精准定位\<?xpacket begin="..." id="..."?\>头，快速提取元数据，无需解析整个文件体 1。

#### **2.1.2. 命名空间（Namespaces）的隔离与扩展**

XMP最强大的安全特性在于其**命名空间机制**。在复杂的企业环境中，不同部门或系统可能会使用相同的字段名（如“ID”可能指员工ID，也可能指文档ID）。

* **私有命名空间**：通过XML命名空间，企业可以注册一个全球唯一的URI（例如 http://ns.your-enterprise.com/security/2.0/），并在此命名空间下定义专属的安全属性（如 esec:Classification）。  
* **冲突规避**：这确保了企业的安全标签永远不会与文件格式自带的标准属性（如Dublin Core的dc:creator或Adobe的pdf:Producer）发生冲突。DLP策略可以被配置为仅扫描特定的esec:前缀，从而避免误报 1。

#### **2.1.3. 跨格式的嵌入持久性**

XMP设计为“嵌入式”（Embedded），即元数据与文件内容共存于同一个二进制实体中，这使得安全属性能够随文件流转。

* **PDF集成**：在PDF中，XMP数据流被存储在文档目录（Catalog）引用的Metadata流中，通常是未压缩的XML文本。这使得网络DLP即使在不完全重组文件的情况下，也能通过深度包检测（DPI）搜索到明文的XML标签 1。  
* **OOXML集成**：在Office文档（.docx,.xlsx）中，本质上是ZIP压缩包。XMP数据通常存储在customXml目录下（如item1.xml）。虽然这需要解压才能读取，但现代DLP引擎均具备即时解压扫描能力。需要注意的是，WPS Office生成的文档在保存自定义属性时，默认是写入docProps/custom.xml（OLE属性），要实现严格的XMP嵌入，往往需要通过插件进行额外的同步操作 5。

### **2.2. ETSI PAdES：元数据的密码学锚点**

单靠XMP元数据是不够的，因为XML文本极易被篡改。攻击者可以使用文本编辑器将\<sec:Level\>TopSecret\</sec:Level\>修改为Public。因此，必须引入数字签名来确保元数据的**完整性（Integrity）与不可抵赖性（Non-repudiation）**。

#### **2.2.1. PAdES的保护范围**

PAdES（PDF Advanced Electronic Signatures）是专门针对PDF文档优化的数字签名标准，符合欧盟eIDAS法规。

* **字节范围哈希**：与简单的对文件整体做哈希不同，PAdES签名是对PDF文件的特定字节范围进行哈希计算并加密。  
* **包含元数据**：在实施过程中，系统必须先将XMP安全元数据注入PDF，然后再进行PAdES签名。这样，XMP数据块就成为了被签名保护的内容的一部分。任何对XMP标签的微小修改（即便是修改一个字符），都会导致文件的哈希值发生变化，从而使签名验证失效。PDF阅读器（如WPS PDF或Adobe Reader）会立即在顶端显示红色警告条：“文档已被修改” 1。

#### **2.2.2. 长期有效性（LTV）与PAdES-LTA**

在档案管理和法律取证场景中，文档可能需要保存数十年。普通的数字签名（PAdES-B）在签名证书过期或被吊销后，就无法验证签名的有效性了。

* **PAdES-T（时间戳）**：引入可信时间戳服务（TSA），证明在签名发生的那个时刻，证书是有效的。  
* **PAdES-LTA（长期归档）**：这是本方案推荐的终极标准。它不仅包含时间戳，还将验证所需的所有撤销数据（CRL列表、OCSP响应）全部嵌入到PDF文件的\*\*DSS（Document Security Store）\*\*区域中。这意味着，即使10年后CA机构倒闭，或者不得不离线验证，只要文件未被篡改，依然可以利用嵌入的验证数据证明其当时的合法性 7。

## ---

**3\. WPS Office 元数据与签名支持深度分析**

作为中国市场占有率极高的办公软件，WPS Office在实施该安全体系中的角色至关重要。我们需要分别从Windows桌面端和Linux信创端分析其技术实现路径。

### **3.1. 元数据嵌入支持分析**

#### **3.1.1. Windows平台的COM/VSTO机制**

在Windows平台上，WPS Office（包括Writer, Spreadsheets, Presentation）提供了与Microsoft Office高度兼容的COM接口对象模型。这使得利用C\#或C++开发VSTO（Visual Studio Tools for Office）插件或独立控制程序变得相对容易。

* **CustomDocumentProperties集合**：这是最直接的元数据注入接口。开发者可以通过调用ActiveDocument.CustomDocumentProperties.Add(Name, LinkToContent, Type, Value)方法，将安全标签写入文档。  
  * *技术细节*：这些属性被存储在OOXML包的docProps/custom.xml部分。虽然严格意义上这不完全等同于Adobe定义的XMP包，但它是Office文档生态中的事实标准。  
  * *兼容性*：所有主流DLP（Symantec, Forcepoint, SkyGuard）均能原生解析docProps/custom.xml中的属性，因此在Windows生态下，使用此接口是最佳实践 6。  
* **Custom XML Parts支持**：对于需要严格符合ISO 16684-1 XMP标准的场景（例如需要跨格式兼容图片管理系统），WPS Office同样支持通过CustomXMLParts集合直接注入原始的XML数据块。开发者可以构造一个标准的XMP XML字符串，并将其作为一个新的Part添加到文档中。这种方式更为底层，但能确数据结构完全符合企业定义的Schema 5。

#### **3.1.2. Linux平台的RPC与SDK挑战**

在Linux环境（如统信UOS、麒麟）下，WPS Office的架构有所不同，它基于Qt框架开发，且不具备Windows下的COM自动化服务。为了解决二次开发问题，WPS提供了**WPS Open Platform for Linux**，核心是基于RPC（Remote Procedure Call）的API机制。

* **pywpsrpc中间件**：这是Linux环境下实施自动化元数据注入的关键。pywpsrpc是一个Python绑定库，它封装了WPS的C++ RPC接口，允许外部Python脚本无头（Headless）控制WPS进程。  
  * *操作流程*：安全系统可以在后台启动一个Python服务，通过createWpsRpcInstance初始化RPC连接，然后调用与COM对象模型一致的方法（如rpcwpsapi.createWpsRpcInstance() \-\> getWpsApplication() \-\> Documents.Open() \-\> CustomDocumentProperties.Add()）来修改文档属性 11。  
  * *局限性*：Linux版的CLI工具（如wpspdf）通常只提供简单的格式转换功能，不支持在转换过程中通过命令行参数直接注入自定义元数据。因此，必须通过RPC调用完整的WPS实例来完成这一操作，这在服务器端高并发场景下可能会带来一定的性能开销 13。

#### **3.1.3. 格式转换中的元数据丢失风险**

一个关键的技术风险点在于格式转换（如docx转pdf）。根据测试与文档分析，当使用WPS进行“另存为PDF”或“导出PDF”时，标准的OLE属性（标题、作者）通常会被映射到PDF的Info Dictionary中，但**自定义的扩展属性（XMP）往往会被丢弃**，除非使用了特定的插件或配置 4。

* **解决方案**：架构中必须包含一个\*\*后处理（Post-Processing）\*\*步骤。  
  1. 利用WPS将Docx转换为PDF。  
  2. 立即调用基于ExifTool或Python xmp-toolkit的脚本。  
  3. 该脚本读取原Docx的密级属性，并将其按照XMP标准重新注入到新生成的PDF文件中。这一步是确保元数据全生命周期生存的关键 4。

### **3.2. 签名模式支持与PAdES适配**

#### **3.2.1. WPS PDF的原生签名能力**

WPS Office（尤其是企业版和专业版）内置了较为完善的PDF签名功能。

* **证书支持**：支持导入PKCS\#12格式（.pfx,.p12）的软证书，也支持调用系统加密库访问USB Key中的硬证书。  
* **PAdES基线**：WPS生成的签名默认符合PAdES-B（Basic）标准。如果配置了时间戳服务器（TSA）地址，它可以生成PAdES-T签名，这对于证明签名时间至关重要 17。

#### **3.2.2. 实现PAdES-LTA的混合路径**

WPS GUI界面目前并未直接提供“保存为PAdES-LTA”的选项。要达到这一高安全级别，建议采用以下混合路径：

* **前端视觉呈现**：用户使用WPS Office进行操作，放置可视化的签名域（印章/手写体），完成PAdES-B或PAdES-T签名。这一步解决了“所见即所得”的体验问题。  
* **后端LTA增强**：在文件保存或归档流转时，通过服务器端的签名增强服务（基于Java的DSS库或OpenPDFSign工具）对PDF进行二次处理。该服务会自动连接CA机构，获取CRL和OCSP响应，并将其嵌入到PDF中，从而将签名级别提升至PAdES-LTA。这种方式对用户透明，且规避了客户端复杂的网络配置问题 7。

#### **3.2.3. Linux下的无头签名**

对于Linux服务器端的自动化批量签名需求，WPS Linux版的命令行工具wpspdf功能相对基础，主要侧重于格式转换而非复杂的密码学操作 14。

* **推荐方案**：在Linux自动化流程中，建议剥离WPS的签名功能，转而使用专用的命令行工具如OpenSSL配合JSignPdf或OpenPDFSign。这些工具可以通过脚本精确控制签名的位置、证书选择、TSA配置以及LTA信息的嵌入，且更易于集成到CI/CD流水线或DLP网关中 19。

## ---

**4\. 开源终端与网络安全栈支持评估**

在预算有限或需要高度定制化的场景下，开源安全工具是构建本体系的重要补充。

### **4.1. Wazuh：终端侧的元数据审计与响应**

Wazuh是开源主机入侵检测系统（HIDS）的佼佼者，非常适合承担“终端自动化审计”的角色。

* **文件完整性监控（FIM）的局限**：Wazuh原生的FIM（File Integrity Monitoring）模块主要监控文件的哈希值、权限和所有者变化。它**无法**直接解析文件内部的XMP元数据。如果文件的密级标签被修改，FIM会报警“文件已修改”，但无法告知是“密级被篡改” 21。  
* **Active Response（主动响应）的深度集成**：为了弥补FIM的不足，必须利用Wazuh的Active Response功能。  
  * **实施逻辑**：配置Wazuh规则，当敏感目录下的PDF/Docx文件发生modified或created事件时，触发一个本地的Python脚本。  
  * **脚本逻辑**：该Python脚本调用ExifTool读取文件的sec:Classification标签。如果发现标签缺失或与用户权限不匹配，脚本可以立即执行隔离文件、查杀进程或弹窗警告操作。这种“FIM触发 \-\> 脚本解析 \-\> 响应”的链路是开源方案实现深度DLP的核心 22。  
* **YARA集成**：Wazuh支持下发YARA规则。可以编写YARA规则来扫描文件头部的Hex特征，匹配特定的XMP XML字符串（如\<sec:Classification\>TopSecret）。这提供了一种无需调用外部脚本的轻量级静态检测手段 24。

### **4.2. Zeek：网络侧的被动元数据提取**

Zeek（原Bro）作为网络流量分析器，能够提供深度的流量透视，但默认不解析自定义XMP。

* **文件提取框架（File Extraction Framework）**：Zeek可以从HTTP、SMB、SMTP流量中还原出PDF和Office文件。这是分析的前提 26。  
* **自定义脚本扩展**：Zeek本身没有XMP解析器。解决方案是编写Zeek脚本，利用Input框架或Exec框架，在文件提取落地后，异步调用系统级的exiftool命令对文件进行分析，并将提取到的esec:Classification字段回写到Zeek的files.log或专门的xmp.log中。这使得安全分析师可以在SIEM中关联网络会话与数据密级 27。  
* **加密流量盲区**：Zeek无法解密TLS流量。因此，必须在Wazuh端进行补充监控，或者在Web网关（Proxy）解密后再引流给Zeek。

### **4.3. Suricata：网络侧的实时阻断**

Suricata作为IDS/IPS，具备实时阻断能力。

* **Lua脚本检测**：Suricata支持在规则中调用Lua脚本（luajit关键字）。可以编写Lua脚本对file\_data缓冲区进行流式解析，搜索特定的XMP XML结构。  
  * *规则示例*：alert tcp any any \-\> any any (msg:"XMP TopSecret Data Exfiltration"; flow:established,to\_server; file\_data; luajit:detect\_xmp\_secret.lua; sid:10001;) 29。  
* **性能考量**：在Lua中进行复杂的XML解析极其消耗CPU。建议先使用Boyer-Moore算法匹配静态的XMP头（如\<x:xmpmeta）作为前置过滤条件，命中后再调用Lua进行精确值的解析，以平衡性能与检测精度 31。

## ---

**5\. 中国与国际DLP产品支持评估与策略差异**

在商业DLP领域，由于合规驱动（GDPR vs 等保/分级保护）的差异，国内外产品在技术路线上存在显著分歧。

### **5.1. 国际DLP巨头：Symantec & Forcepoint**

这两家厂商的产品设计高度契合“元数据驱动”的理念，技术栈偏向于精确的模式匹配。

* **Symantec DLP (Broadcom)**：  
  * **深度XML解析**：Symantec DLP拥有极其强大的自定义文件类型检测能力。管理员可以定义**XML Data Identifier**，直接配置XPath路径（如/rdf:RDF/rdf:Description/@sec:Classification）来提取属性值。这使得它对XMP的支持最为原生和精准 32。  
  * **真实文件类型（True File Type）**：它不依赖扩展名，而是检查文件二进制头（Magic Number），这能有效防止用户通过将.docx重命名为.txt来绕过XMP检查 34。  
* **Forcepoint DLP**：  
  * **属性分类器**：提供了专门的“File Properties”和“File Labeling”分类器，支持读取OLE属性和与Microsoft Information Protection (MIP)标签的集成。对于自定义XMP，可以通过正则表达式构建“Custom Data Pattern”来匹配文件头部的XML文本 35。  
  * **逻辑组合**：其策略引擎支持复杂的逻辑组合（例如：当“包含XMP绝密标签”且“未检测到PAdES签名”时，执行阻断），非常适合本方案的实施 37。

### **5.2. 中国DLP厂商：天空卫士、深信服、IP-guard**

国产DLP产品更强调对本土合规场景的适配，以及对加密和内容的深度理解。

* **天空卫士 (SkyGuard) \- UCS统一内容安全**：  
  * **深度内容检测 (DCI)**：SkyGuard的引擎在解析嵌套压缩包和复杂文档结构方面表现出色。其“数据分类分级”功能模块支持通过关键字和正则定义标签，可以很好地适配XMP中的明文标记。作为从Web安全网关起家的厂商，其在网络侧（Web/Email）对XMP流量的解析和阻断能力极强 38。  
* **深信服 (Sangfor) \- ZTDP零信任数据保护**：  
  * **上下文感知与AI**：深信服的技术路线更侧重于“数据检测与响应（DDR）”。它不仅关注标签，更利用OCR和AI模型分析内容语义。在支持XMP正则匹配的基础上，它能结合用户行为（UEBA）进行综合判断。例如，一个标有“公开”XMP标签但内容包含大量身份证号的文档，仍会被AI引擎拦截，这弥补了单一元数据可能被伪造的缺陷 41。  
* **IP-guard (溢信) \- 终端管理与透明加密**：  
  * **透明加密路线**：IP-guard的核心优势在于强大的终端控制和透明加密（VFS驱动）。它倾向于根据“生成文档的应用程序”自动对文件进行加密，而不是依赖文件内部的元数据标签。  
  * **兼容性挑战**：如果要实施XMP方案，IP-guard需要配置为“文档属性”过滤模式，识别OLE属性中的密级信息。但需要注意，如果启用了透明加密，文件在磁盘上是密文，外部的XMP解析工具（如Zeek或Wazuh脚本）将无法读取元数据，除非通过IP-guard的解密网关或授权进程访问 44。

## ---

**6\. 指南补充：实施路线图与配置建议**

基于上述分析，为《非结构化数据安全体系构建》补充以下实施建议：

### **6.1. 跨平台元数据注入与同步策略**

* **Windows端**：开发VSTO插件，拦截DocumentBeforeSave事件。插件需同时完成两项操作：1. 写入CustomDocumentProperties（兼容OLE/IP-guard）；2. 注入标准XMP XML包（兼容PAdES/Symantec）。  
* **Linux端**：部署基于pywpsrpc的后台守护进程。监控文件系统事件，一旦检测到WPS进程保存文件，立即通过RPC接口调用WPS对象模型补全元数据。  
* **防剥离机制**：在Windows内核层部署Minifilter驱动（Altitude设为360000-389999区间，位于防病毒软件上方），拦截IRP\_MJ\_WRITE。如果发现目标文件是PDF/Office且缺失企业签名的XMP头，则直接返回STATUS\_ACCESS\_DENIED，从根本上防止元数据被剥离 18。

### **6.2. 混合式签名架构**

* **用户侧**：使用WPS Office进行文档编辑和视觉签名（盖章），生成PAdES-B签名。  
* **网关侧**：设立“安全归档网关”。所有对外发布的文档需经过此网关，网关调用DSS/OpenPDFSign服务，校验用户身份后，叠加企业级证书的PAdES-LTA签名和可信时间戳。

### **6.3. 多维监控体系配置**

* **Wazuh配置**：  
  * 在ossec.conf中增加Active Response配置，绑定check\_xmp.py脚本。  
  * 脚本逻辑：exiftool \-XMP:Classification \<file\>，若结果为空或异常，触发告警ID 10001。  
* **Suricata规则**：  
  * alert tcp any any \-\> any any (content:"\<sec:Classification\>TopSecret"; msg:"High Security Data Transit"; sid:20001;)  
* **商业DLP策略**：  
  * 在Symantec/Forcepoint中，配置“自定义数据标识符”，匹配正则 (?\<=\<sec:Classification\>)\[^\<\]+，并将其与“外发阻断”动作关联。

通过上述深度整合，企业可以将WPS Office这一生产力工具改造为安全体系的有机组成部分，构建起一套“数据带标签、流转有签名、监控无死角”的立体防御网。

#### **Works cited**

1. 非结构化数据安全体系构建  
2. Extensible Metadata Platform \- Wikipedia, accessed December 16, 2025, [https://en.wikipedia.org/wiki/Extensible\_Metadata\_Platform](https://en.wikipedia.org/wiki/Extensible_Metadata_Platform)  
3. XMP metadata | Adobe Experience Manager, accessed December 16, 2025, [https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/assets/admin/xmp-metadata](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/assets/admin/xmp-metadata)  
4. Embedding XMP Metadata into PDF \- Stack Overflow, accessed December 16, 2025, [https://stackoverflow.com/questions/17642699/embedding-xmp-metadata-into-pdf](https://stackoverflow.com/questions/17642699/embedding-xmp-metadata-into-pdf)  
5. Custom XML parts overview \- Visual Studio (Windows) | Microsoft Learn, accessed December 16, 2025, [https://learn.microsoft.com/en-us/visualstudio/vsto/custom-xml-parts-overview?view=visualstudio](https://learn.microsoft.com/en-us/visualstudio/vsto/custom-xml-parts-overview?view=visualstudio)  
6. How to: Set a custom property in a word processing document | Microsoft Learn, accessed December 16, 2025, [https://learn.microsoft.com/en-us/office/open-xml/word/how-to-set-a-custom-property-in-a-word-processing-document](https://learn.microsoft.com/en-us/office/open-xml/word/how-to-set-a-custom-property-in-a-word-processing-document)  
7. How to Digitally Sign PDF with PAdES Level B-LTA in .Net PDF Library?, accessed December 16, 2025, [https://support.syncfusion.com/kb/article/19531/how-to-digitally-sign-pdf-with-pades-level-b-lta-in-net-pdf-library](https://support.syncfusion.com/kb/article/19531/how-to-digitally-sign-pdf-with-pades-level-b-lta-in-net-pdf-library)  
8. What Is Long-Term Validation and Why Is It important for Digital Signatures? \- Entrust, accessed December 16, 2025, [https://www.entrust.com/resources/learn/what-is-long-term-validation](https://www.entrust.com/resources/learn/what-is-long-term-validation)  
9. Document.CustomDocumentProperties property (Word) \- Microsoft Learn, accessed December 16, 2025, [https://learn.microsoft.com/en-us/office/vba/api/word.document.customdocumentproperties](https://learn.microsoft.com/en-us/office/vba/api/word.document.customdocumentproperties)  
10. CustomDocumentProperties.add method | Aspose.Words for Python, accessed December 16, 2025, [https://reference.aspose.com/words/python-net/aspose.words.properties/customdocumentproperties/add/](https://reference.aspose.com/words/python-net/aspose.words.properties/customdocumentproperties/add/)  
11. pywpsrpc \- PyPI, accessed December 16, 2025, [https://pypi.org/project/pywpsrpc/1.1.0/](https://pypi.org/project/pywpsrpc/1.1.0/)  
12. timxx/wpsrpc-sdk: WPS Office for Linux RPC sdk \- GitHub, accessed December 16, 2025, [https://github.com/timxx/wpsrpc-sdk](https://github.com/timxx/wpsrpc-sdk)  
13. How to edit pdf metadata from command line? \- Ask Ubuntu, accessed December 16, 2025, [https://askubuntu.com/questions/27381/how-to-edit-pdf-metadata-from-command-line](https://askubuntu.com/questions/27381/how-to-edit-pdf-metadata-from-command-line)  
14. wpsoffice-cn: WPS Spreadsheet (et) / Presentation (wpp) / PDF (wpspdf) cannot launch · Issue \#459415 · NixOS/nixpkgs \- GitHub, accessed December 16, 2025, [https://github.com/nixos/nixpkgs/issues/459415](https://github.com/nixos/nixpkgs/issues/459415)  
15. How to preserve comments when converting spreadsheets and documents to PDF | WPS Office Academy, accessed December 16, 2025, [https://www.wps.com/academy/how-to-preserve-comments-when-converting-spreadsheets-and-documents-to-pdf-quick-tutorials-1861807/](https://www.wps.com/academy/how-to-preserve-comments-when-converting-spreadsheets-and-documents-to-pdf-quick-tutorials-1861807/)  
16. Remove PDF metadata (removing complete PDF metadata ) \- Stack Overflow, accessed December 16, 2025, [https://stackoverflow.com/questions/60738960/remove-pdf-metadata-removing-complete-pdf-metadata](https://stackoverflow.com/questions/60738960/remove-pdf-metadata-removing-complete-pdf-metadata)  
17. E Signature — Secure, Fast Document Signing with Ease \- WPS Office, accessed December 16, 2025, [https://www.wps.com/feature/e-signature/](https://www.wps.com/feature/e-signature/)  
18. How to Add a Signature to a PDF: A Step-by-Step Guide \- WPS Office, accessed December 16, 2025, [https://www.wps.com/blog/how-to-add-a-signature-to-a-pdf-post/](https://www.wps.com/blog/how-to-add-a-signature-to-a-pdf-post/)  
19. open-pdf-sign, accessed December 16, 2025, [https://www.openpdfsign.org/](https://www.openpdfsign.org/)  
20. so... how DO you sign pdf's on linux? (with a certificate, NOT a pretty image of your handwriting\!) : r/linuxquestions \- Reddit, accessed December 16, 2025, [https://www.reddit.com/r/linuxquestions/comments/1kancck/so\_how\_do\_you\_sign\_pdfs\_on\_linux\_with\_a/](https://www.reddit.com/r/linuxquestions/comments/1kancck/so_how_do_you_sign_pdfs_on_linux_with_a/)  
21. Basic settings \- File integrity monitoring \- Wazuh documentation, accessed December 16, 2025, [https://documentation.wazuh.com/current/user-manual/capabilities/file-integrity/basic-settings.html](https://documentation.wazuh.com/current/user-manual/capabilities/file-integrity/basic-settings.html)  
22. How to configure Active Response \- Wazuh documentation, accessed December 16, 2025, [https://documentation.wazuh.com/current/user-manual/capabilities/active-response/how-to-configure.html](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/how-to-configure.html)  
23. Custom active response scripts \- Wazuh documentation, accessed December 16, 2025, [https://documentation.wazuh.com/current/user-manual/capabilities/active-response/custom-active-response-scripts.html](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/custom-active-response-scripts.html)  
24. Detecting Peaklight malware with Wazuh, accessed December 16, 2025, [https://wazuh.com/blog/detecting-peaklight-malware-with-wazuh/](https://wazuh.com/blog/detecting-peaklight-malware-with-wazuh/)  
25. Leveraging LLMs for alert enrichment \- Proof of Concept guide \- Wazuh documentation, accessed December 16, 2025, [https://documentation.wazuh.com/current/proof-of-concept-guide/leveraging-llms-for-alert-enrichment.html](https://documentation.wazuh.com/current/proof-of-concept-guide/leveraging-llms-for-alert-enrichment.html)  
26. Network Detection Engineering (Part 1): Zeek as My Network Detective in the Cloud | by CyberFreak | Oct, 2025 | Medium, accessed December 16, 2025, [https://medium.com/@sujalchauhan921/network-detection-engineering-part-1-zeek-as-my-network-detective-in-the-cloud-ebf9281b6d37](https://medium.com/@sujalchauhan921/network-detection-engineering-part-1-zeek-as-my-network-detective-in-the-cloud-ebf9281b6d37)  
27. Zeek – Network File Extraction \- Threat Hunting Tails, accessed December 16, 2025, [https://threathuntingtails.com/zeek-network-file-extraction/](https://threathuntingtails.com/zeek-network-file-extraction/)  
28. File extraction with Zeek \- CHAN Fook Sheng \- Medium, accessed December 16, 2025, [https://chanfs.medium.com/file-extraction-with-zeek-2c1a0bb1aa98](https://chanfs.medium.com/file-extraction-with-zeek-2c1a0bb1aa98)  
29. 8.49. Lua Scripting for Detection — Suricata 9.0.0-dev documentation, accessed December 16, 2025, [https://docs.suricata.io/en/latest/rules/lua-detection.html](https://docs.suricata.io/en/latest/rules/lua-detection.html)  
30. Developing complex Suricata rules with Lua – part 1 \- NVISO Labs, accessed December 16, 2025, [https://blog.nviso.eu/2017/03/10/developing-complex-suricata-rules-with-lua-part-1/](https://blog.nviso.eu/2017/03/10/developing-complex-suricata-rules-with-lua-part-1/)  
31. 17\. File Extraction — Suricata 9.0.0-dev documentation, accessed December 16, 2025, [https://docs.suricata.io/en/latest/file-extraction/file-extraction.html](https://docs.suricata.io/en/latest/file-extraction/file-extraction.html)  
32. Advanced Server Settings Last Updated December 5, 2025 \- TechDocs, accessed December 16, 2025, [https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-1/managing-detection-servers/installing-and-managing-detection-servers-and-cloud-de/advanced-server-settings.html](https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-1/managing-detection-servers/installing-and-managing-detection-servers-and-cloud-de/advanced-server-settings.html)  
33. Workflow for detecting custom file types \- TechDocs \- Broadcom Inc., accessed December 16, 2025, [https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-0/about-data-loss-prevention-policies-v27576413-d327e9/about-detection-customization-v86726027-d327e154953/tutorials-v30100134-d327e156569/workflow-for-detecting-custom-file-types-v31193660-d327e156572.html](https://techdocs.broadcom.com/us/en/symantec-security-software/information-security/data-loss-prevention/16-0/about-data-loss-prevention-policies-v27576413-d327e9/about-detection-customization-v86726027-d327e154953/tutorials-v30100134-d327e156569/workflow-for-detecting-custom-file-types-v31193660-d327e156572.html)  
34. File properties filtering set to ignore still creates incidents or if set to monitor does not create incidents, accessed December 16, 2025, [https://knowledge.broadcom.com/external/article/174450/file-properties-filtering-set-to-ignore.html](https://knowledge.broadcom.com/external/article/174450/file-properties-filtering-set-to-ignore.html)  
35. Creating file metadata data pattern \- Forcepoint Technical Documentation, accessed December 16, 2025, [https://help.forcepoint.com/fpone/deploy/rhtml/guid-4ab4ef83-50fe-4795-9cca-73f43a20aac2.html](https://help.forcepoint.com/fpone/deploy/rhtml/guid-4ab4ef83-50fe-4795-9cca-73f43a20aac2.html)  
36. File properties \- Forcepoint Technical Documentation, accessed December 16, 2025, [https://help.forcepoint.com/datasecurity/en-us/onlinehelp/guid-6530c590-da75-404b-bb6c-db0af3243b7b.html](https://help.forcepoint.com/datasecurity/en-us/onlinehelp/guid-6530c590-da75-404b-bb6c-db0af3243b7b.html)  
37. Configure DLP \- Forcepoint Technical Documentation, accessed December 16, 2025, [https://help.forcepoint.com/fpone/sse\_admin/prod/oxy\_ex-1/deployment\_guide/guid-5d451096-ddf6-4849-96dc-07bb4bd84891.html](https://help.forcepoint.com/fpone/sse_admin/prod/oxy_ex-1/deployment_guide/guid-5d451096-ddf6-4849-96dc-07bb4bd84891.html)  
38. SkyGuard-Human-centric Data Security-A Leader in Data Security Governance, accessed December 16, 2025, [https://www.skyguard.net/](https://www.skyguard.net/)  
39. SkyGuard Multi-Dimensional DLP Drive Total Protection of Your Sensitive Data, accessed December 16, 2025, [https://www.skyguard.net/products/mdlp/](https://www.skyguard.net/products/mdlp/)  
40. Data Security Scanner-Products \- SkyGuard, accessed December 16, 2025, [https://www.skyguard.net/products/dss/](https://www.skyguard.net/products/dss/)  
41. SANGFOR \- Zero Trust Data Protection, accessed December 16, 2025, [https://www.sangfor.com/sites/default/files/2025-10/ztdp-brochure.pdf](https://www.sangfor.com/sites/default/files/2025-10/ztdp-brochure.pdf)  
42. Sangfor Zero Trust Data Protection, accessed December 16, 2025, [https://www.sangfor.com/cybersecurity/sangfor-athena-cloud-security/secure-access-service-edge-sase/zero-trust-data-protection-ztdp](https://www.sangfor.com/cybersecurity/sangfor-athena-cloud-security/secure-access-service-edge-sase/zero-trust-data-protection-ztdp)  
43. Top 7 Data Loss Prevention (DLP) Strategies Every Company Should Know, accessed December 16, 2025, [https://www.sangfor.com/blog/cybersecurity/top-7-data-loss-prevention-dlp-strategies-every-company-should-know](https://www.sangfor.com/blog/cybersecurity/top-7-data-loss-prevention-dlp-strategies-every-company-should-know)  
44. IP-Guard (DLP) \- 台詮科技, accessed December 16, 2025, [https://www.ymhcogroup.com/en/product\_text.php?tier1\_rid=80\&tier2\_rid=211](https://www.ymhcogroup.com/en/product_text.php?tier1_rid=80&tier2_rid=211)  
45. Data Loss Prevention Solution \- IP-guard | ELIMINATE INTERNAL THREATS, accessed December 16, 2025, [https://www.ip-guard.com/solutions/data-loss-prevention-solution](https://www.ip-guard.com/solutions/data-loss-prevention-solution)  
46. Document Management \- IP-guard | ELIMINATE INTERNAL THREATS, accessed December 16, 2025, [https://www.ip-guard.com/products/ip-guard-modules/document-management](https://www.ip-guard.com/products/ip-guard-modules/document-management)  
47. SweetIceLolly/Prevent\_File\_Deletion: Record & prevent file deletion in kernel mode \- GitHub, accessed December 16, 2025, [https://github.com/SweetIceLolly/Prevent\_File\_Deletion](https://github.com/SweetIceLolly/Prevent_File_Deletion)  
48. Allocated Filter Altitudes \- Windows drivers \- Microsoft Learn, accessed December 16, 2025, [https://learn.microsoft.com/en-us/windows-hardware/drivers/ifs/allocated-altitudes](https://learn.microsoft.com/en-us/windows-hardware/drivers/ifs/allocated-altitudes)