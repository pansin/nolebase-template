

# **道阻且长，行则将至：Far Away安全运营模型的系统性解构与前瞻性论证**

## **摘要**

本报告将深度剖析由刘志诚先生提出的Far Away安全运营模型。通过追溯其系统论哲学根基，本报告将详细解构模型的FAR（发现、分析、响应）、WAY（保障、调整、收益）及AI与自动化三大核心支柱。结合最新的行业研究与实践，包括风险驱动理论、威胁狩猎、MITRE ATT\&CK框架、PDCA循环、安全投资回报率（ROI）量化、入侵与攻击模拟（BAS）、安全编排自动化与响应（SOAR）以及生成式人工智能（Generative AI）等，本报告旨在论证Far Away模型作为一个整合性框架的完备性、前瞻性与实践价值，为新时代下的安全运营体系建设提供具备战略高度与实践深度的参考。

---

## **第一章：思想之源——Far Away模型的系统论哲学基石**

### **1.1 从还原论到系统论：网络安全思想的范式转移**

在网络安全领域，长久以来主导防御体系建设的是一种还原论（Reductionism）的思维模式。这种模式倾向于将复杂的安全问题拆解为一系列独立的、可管理的部分，并为每个部分寻求专门的解决方案 1。其直接产物便是当前企业中普遍存在的安全工具堆砌现象：防火墙负责边界控制，入侵检测系统（IDS）负责流量监控，防病毒软件负责终端防护，Web应用防火墙（WAF）负责应用层保护。每一个工具都在其特定的领域追求极致的性能和效果。

然而，这种方法的弊端日益凸显。当面对跨越多个阶段、利用多种技术、具有高度隐蔽性的高级持续性威胁（APT）时，这些孤立的“点解决方案”便显得力不从心。由于产品来自不同厂商，技术架构各异，它们之间形成了难以逾越的数据孤岛和协同壁垒 2。告警风暴、响应迟缓、根因分析困难成为安全运营中心（SOC）的常态。正如Far Away模型的提出者刘志诚先生所指出的，安全行业亟需“从还原论的泥沼中转身” 1。这种困境并非简单的技术或市场失灵，而是源于一种深层的哲学局限性。还原论无法捕捉到系统作为一个整体所涌现出的复杂特性，而现代网络攻击恰恰是利用了这种系统性的复杂。

系统论（Systems Theory）为此提供了截然不同的视角。系统论的核心思想是整体观念，即任何一个系统都是一个有机的整体，而非各部件的机械组合 4。系统的整体功能，特别是安全这类非功能性属性，是其组成部分在孤立状态下所不具备的。这一思想在网络安全领域的体现便是，安全是一个复杂的系统工程，必须从整体上综合考量硬件、软件、人员、流程和管理等所有要素的相互作用与关联 4。因此，诸如安全信息与事件管理（SIEM）、扩展检测与响应（XDR）和安全编排自动化与响应（SOAR）等平台的兴起，可以被看作是市场在为还原论架构下的工具孤岛“打补丁”，试图在事后强加一个系统层面的视图，以弥补其先天的体系性缺陷。

### **1.2 “整体大于部分之和”：系统论如何重塑安全认知**

系统论的引入，从根本上重塑了对网络安全的认知。首先，它强调了网络空间的复杂巨系统特性。网络空间是所有信息系统的集合，人、信息、技术在其中相互作用，构成了一个动态、复杂的生态系统 4。因此，我们不能孤立地看待设备安全、数据安全或网络安全，而应将它们视为一个统一安全体系的不同层次和维度 4。

其次，系统论将安全的边界从纯技术领域扩展至更广阔的范畴。它明确指出，人是系统中至关重要的变量，是系统的管理者和使用者，也是安全对抗的最终主体 4。安全的本质是人与人之间的对抗。因此，一个有效的安全体系必须将人的因素、组织管理、规章制度和法律保障等非技术性元素纳入其核心考量范围。这与Far Away模型中反复强调运营组织机构、规章制度以及人员能力建设的理念完全吻合 1。

信息安全领域广为人知的“木桶原理”正是系统论思想的直观体现。一个系统的整体安全水平，取决于其最薄弱的一环，而非最强的一环 4。这警示我们，单纯在某个点上投入巨资购买最先进的设备，而忽略了如员工安全意识、安全配置管理或事件响应流程等其他短板，整体安全水平依然无法得到有效提升。这要求安全建设必须是全面、均衡的。

### **1.3 Far Away模型：系统论在安全运营领域的具体实践**

Far Away模型的提出，正是为了将系统论的思维模式具体落实到安全运营的实践中，解决传统方法论的弊病，并建立一套有效的运营目标与考核体系 1。该模型通过其三大核心支柱——FAR（目标）、WAY（内核）和AI与自动化（引擎），构建了一个完整的、动态的运营系统。

这三个部分并非孤立存在，而是紧密耦合、相互作用，形成了一个闭环。FAR（Find, Analyze, Respond）定义了运营的战术目标，即围绕安全的核心对象——风险与事件，进行发现、分析和响应。WAY（Warrant, Adjust, Yield）确立了运营的战略价值内核，回答了“为何运营”（为业务保障）、“如何持续”（动态调整）以及“效果如何”（量化收益）的根本问题。而AI与自动化则作为强大的引擎，驱动整个闭环的高效运转。

这种结构设计完美地体现了系统论的整体观和控制论（Cybernetics）的核心思想。控制论研究系统中的控制和通信规律，强调信息反馈是实现控制的基础 4。在Far Away模型中，FAR阶段发现的风险和事件信息，正是反馈给WAY阶段进行“调整”的输入；WAY阶段确立的“保障”和“收益”目标，又反过来指导FAR阶段的资源分配和优先级排序。AI与自动化则加速了整个“信息-反馈-控制”循环的速度和精度。因此，Far Away模型不仅是一个方法论的集合，更是一个基于系统论构建的、自洽的、可演进的安全运营哲学框架。

## **第二章：运营之的——FAR（发现、分析、响应）目标的深度解析**

Far Away模型将安全运营的核心目标（FAR）精炼为对安全风险（Risk）与安全事件（Event）的发现（Find）、分析（Analyze）和响应（Respond）。这一定义抓住了安全工作的本质，并为运营活动指明了清晰的方向 1。

### **2.1 风险与事件的二元辩证法：安全运营的核心焦点**

模型创造性地将风险与事件比作安全的“阴阳两极”，揭示了两者之间动态转化、相互依存的辩证关系 1。风险是潜在的、概率性的，当其得不到有效控制时，量变引起质变，演化为实际发生的、造成损失的安全事件。反之，当一个安全事件没有得到及时、彻底的响应和处置，其影响可能持续发酵，或暴露出新的脆弱性，从而演化为新的、更大的风险。

这种认知打破了将风险管理和事件响应割裂看待的传统观念。它强调了安全运营必须是一个连续的、闭环的过程，覆盖从“事前”的风险预警到“事中”的事件遏制，再到“事后”的风险重估和能力改进。运营的本质，就是管理好风险与事件的整个生命周期，确保这个“阴阳”循环向着风险收敛的良性方向发展，而不是向事件爆发的恶性方向演化。这一理念将运营工作从繁杂的日常任务中解放出来，聚焦于真正能产生安全价值的核心活动上 1。

### **2.2 超越被动响应：从事件驱动到风险驱动，再到“制造事件”**

基于对风险与事件关系的深刻理解，Far Away模型进一步探讨了驱动安全工作的不同模式，这实际上也勾勒出了一条清晰的安全运营成熟度演进路线。

首先是“事件驱动”（Event-Driven）模式。这是安全能力不成熟组织最常见的状态。在这种模式下，安全工作是被动的，只有在发生重大安全事件、造成实际损失后，组织才会“亡羊补牢”，投入资源进行反思和能力建设 1。这种模式虽然能推动安全进步，但代价高昂，且使安全团队长期处于“救火队员”的角色，极度被动，容易成为事故的“背锅侠” 1。

随着安全体系的成熟，组织会向“风险驱动”（Risk-Driven）模式演进。这是一种更主动、更具前瞻性的模式，也是近年来的主流认知 1。风险驱动的核心思想是在事件发生前，通过对资产、威胁和脆弱性的综合评估，识别出对组织构成最大潜在危害的风险，并优先投入有限的资源进行管控 10。这种模式要求组织具备较强的风险评估和管理能力，能够将安全投入与业务风险直接挂钩，从而更有效地分配资源。

然而，Far Away模型并未止步于此，而是提出了一个更具前瞻性的模式——“制造事件的事件驱动” 1。这一模式的核心是通过红蓝对抗、渗透测试、入侵与攻击模拟（Breach and Attack Simulation, BAS）等手段，在可控的范围内主动“制造”安全事件。这种做法巧妙地融合了前两种模式的优点：它像事件驱动一样生动、具体、直观，能够最真实地检验防御体系的有效性；又像风险驱动一样是主动的、可控的，不会对业务造成实质伤害。要安全、有效地“制造”事件，组织必须首先对自身的风险有深刻的理解，知道应该测试什么、如何控制影响范围以及如何衡量结果。这表明，“制造事件”是运营成熟度的最高阶段，它不仅是安全演练，更是对整个FAR（发现、分析、响应）能力的端到端实战检验，其结果可以反过来验证和优化风险模型，形成一个强大的自我改进闭环。

### **2.3 数据源建设：为“发现”与“分析”构建坚实基础**

无论是风险驱动还是事件驱动，其有效性的根基都在于高质量、高覆盖度的数据。Far Away模型强调，安全运营本质上是数据在安全领域的运营 1。因此，为“发现”和“分析”构建坚实的数据基础是首要任务。

首先，需要对风险的三大核心要素——资产（Asset）、脆弱性（Vulnerability）和威胁（Threat）进行全面的数据化。

* **资产**：模型的资产观超越了传统的财务或运维CMDB范畴，强调从“安全属性”来定义资产。这包括主机、网络设备等物理实体，也涵盖了代码、开源组件、配置、特权账号、核心数据等逻辑和信息资产。这些资产范围更广、动态性更强，传统的静态资产管理系统难以全面覆盖 1。  
* **威胁与脆弱性**：其数据源兼具内部和外部属性。外部威胁情报对于发现标准资产的已知漏洞和追踪外部攻击组织的动向至关重要，其准确性和及时性直接影响风险发现能力。而内部的脆弱性（如自研代码漏洞、不当配置）和威胁（如内部人员的恶意或无意行为）的发现，则高度依赖于组织自身安全能力体系的建设，例如研发安全（DevSecOps）、业务流程安全和组织管理体系的成熟度 1。

其次，安全事件的数据源建设是更大的挑战。因为安全事件往往是未知威胁利用一系列未被发现的脆弱性，通过复杂的攻击链实现的 1。

* **关联分析的困境**：现有的SIEM、SOC、XDR等平台试图通过汇聚多源日志，利用关联分析规则来发现事件线索。然而，在产品异构、数据模型不统一的环境下，高质量的关联分析极具挑战。很多时候，这些平台只能在事件发生后进行追溯，难以做到实时预警和响应 1。  
* **新兴的解决思路**：为了突破这一瓶颈，两种主动的分析模式应运而生。一是威胁狩猎（Threat Hunting），二是基于MITRE ATT\&CK框架的攻击行为建模。这两种方法不再被动等待告警，而是主动地、有目的地在海量数据中寻找攻击者的踪迹，这正是Far Away模型中“发现”和“分析”环节的核心实践。

### **2.4 实践深潜：主动发现与分析的利器**

#### **2.4.1 威胁狩猎（Threat Hunting）**

威胁狩猎是一种主动的网络防御活动，其核心理念是从“被动防御”转向“主动出击”。它基于一个核心假设——“系统已被入侵”（Assume Breach），安全分析师（即“猎人”）主动地、迭代地在组织网络中搜索那些已经绕过现有自动化安全工具的威胁 13。这与Far Away模型中主动“发现”威胁的目标高度一致。

威胁狩猎的模式主要分为两种：“情报驱动”和“假设驱动” 13。情报驱动是基于已知的失陷指标（Indicators of Compromise, IoCs），如恶意的IP地址、域名或文件哈希，在内部网络中进行搜索。而假设驱动则更具前瞻性，它基于对攻击者战术、技术和程序（Tactics, Techniques, and Procedures, TTPs）的理解，提出一个可验证的假设，然后去寻找证据。例如，猎人可以假设“攻击者可能正在使用WMI进行横向移动”，然后去分析相关的日志和系统行为，验证该假设是否成立。这种基于攻击行为（Indicators of Attack, IoAs）的狩猎模式，正是Far Away模型中提到的“通过对ATT\&CK攻击向量对APT组织的攻击手法进行建模”的实践体现 1。

案例分析：CrowdStrike的威胁狩猎实践  
全球领先的安全厂商CrowdStrike的Falcon OverWatch团队是威胁狩猎实践的典范。他们通过结合其平台的AI自动化能力、海量的终端遥测数据、行为分析技术以及精英猎人团队的专业知识，能够主动发现并阻止最复杂的、甚至完全不使用恶意软件的“无文件攻击” 17。  
在一个典型案例中，OverWatch团队观察到名为SCATTERED SPIDER的攻击组织发起了一次复杂的跨域攻击。攻击者首先通过钓鱼邮件窃取凭据，然后利用这些凭据登录云管理平台，再通过云平台的虚拟机管理代理在云主机上执行命令，最终尝试安装远程控制软件以建立持久化据点 20。这次攻击横跨了电子邮件、云管理平台和虚拟机三个独立的检测域，在任何一个单一域内的活动足迹都非常微弱，极难被传统的、孤立的检测工具发现。然而，OverWatch团队凭借对该攻击组织TTPs的深刻理解（假设驱动），并结合来自多个域的遥测数据进行关联分析，最终成功识别并挫败了这次入侵。这个案例有力地证明了，高质量的多源数据和主动的威胁狩猎是在复杂威胁面前实现有效“发现”和“分析”的关键。

#### **2.4.2 MITRE ATT\&CK框架**

MITRE ATT\&CK®框架是一个全球公认的、基于真实世界观察的对抗性战术和技术知识库 21。它将攻击者的行为系统地划分为一系列战术（Tactics，即攻击者的意图，如“初始访问”、“持久化”），以及实现这些战术的具体技术（Techniques，如“鱼叉式网络钓鱼”、“计划任务”）和子技术 23。ATT\&CK框架的重大贡献在于，它为全球网络安全社区提供了一套描述和理解攻击者行为的通用语言，使得威胁情报共享、防御策略制定和能力评估有了统一的参照系 24。

该框架是Far Away模型中“分析”环节的核心赋能工具。模型中提到的“通过对ATT\&CK攻击向量对APT组织的攻击手法进行建模” 1，正是ATT\&CK框架在威胁建模和检测工程中的核心应用。安全团队可以利用ATT\&CK矩阵进行“差距分析”，即评估自身现有的安全控制措施（如SIEM规则、EDR策略）对ATT\&CK矩阵中每一种技术的检测和防御覆盖率 23。分析结果可以清晰地揭示防御的薄弱环节，并指导后续的检测规则开发、安全工具配置优化以及威胁狩猎活动的规划。例如，Microsoft Sentinel等现代SIEM平台已经深度集成了ATT\&CK框架，允许用户将其分析规则、搜寻查询和安全事件直接映射到具体的ATT\&CK技术上，从而直观地展示其安全覆盖范围 25。

## **第三章：运营之核——WAY（保障、调整、收益）内核的价值实现**

如果说FAR定义了安全运营的战术动作，那么WAY（Warrant, Adjust, Yield）则构成了其战略内核。它回答了三个根本性问题：我们为何而战（保障）？我们如何进化（调整）？我们价值何在（收益）？这一层面的思考，将安全运营从一个技术性的成本中心，提升到了一个与业务共生共荣的战略价值中心。

### **3.1 保障（Warrant）：从业务抑制者到业务保障者**

Far Away模型在“保障”这一要素上，提出了一个颠覆性的观点，即旗帜鲜明地反对“安全是为了在业务发展与安全之间取得平衡”这一传统误区 1。长期以来，安全部门常常被视为业务发展的“刹车片”，安全措施往往以牺牲用户体验、业务性能或敏捷性为代价。这种观念的根源在于将安全与业务置于对立面，认为两者是零和博弈。

模型的核心理念是，安全与业务战略、企业战略必须在任何时候都保持高度一致。正如“皮之不存，毛将焉附”所言，脱离了业务的成功，安全便失去了存在的意义 1。因此，安全团队的角色不应该是将安全与业务的矛盾上交给领导去“拍板”决策，而应该是主动地、创新地去寻找和发展能够解决这些冲突的技术和方法。任何导致业务流程受阻、增加业务风险的安全措施，本质上都有违安全“保障”的初衷。

这一理念与Gartner等权威研究机构的观点不谋而合。成功的安全项目无一例外都将安全策略与核心业务目标紧密对齐 26。安全领导者需要建立治理框架，如信息安全委员会，让业务部门负责人、IT、法务、财务等关键利益相关者共同参与风险决策，确保安全工作能够真正地为业务赋能，而不是成为业务的阻碍 28。模型中特别提到的安全保险，就是一个极佳的例证。保险作为一种风险转移的控制措施，它可以在不直接干扰业务运营的前提下，为可能发生的损失提供财务保障，这正是“保障”业务连续性的一种创新形式 1。

### **3.2 调整（Adjust）：基于PDCA循环的持续优化**

在VUCA（易变性、不确定性、复杂性、模糊性）时代，业务环境、技术栈和网络威胁都在以前所未有的速度动态变化 1。因此，一个静态的安全体系注定会迅速失效。Far Away模型中的“调整”（Adjust）要素，强调了安全运营必须是一个持续优化和动态演进的循环过程 1。

为了给这种动态调整提供一个结构化的方法论，模型明确借鉴了经典的PDCA循环（Plan-Do-Check-Act，即计划-执行-检查-处理） 1。PDCA循环由质量管理大师戴明提出，其核心在于通过周而复始的循环，实现阶梯式的持续改进 30。这种方法论被广泛应用于项目管理、软件开发等多个领域，并且非常适合指导安全运营的迭代优化 32。

模型进一步强调，这种“调整”不能是自发的、被动的，而必须是主动的、有计划的，需要建立系统化的调整机制 1。这意味着安全运营团队需要定期（例如按季度或月度）或在特定事件（如重大漏洞爆发、新的业务上线）触发下，系统性地执行PDCA循环，不断审视和优化其发现、分析、响应的能力和机制。

下表将PDCA循环的具体阶段与安全运营的实际活动进行了映射，为实践“调整”原则提供了清晰的操作框架。

**表1：PDCA循环在安全运营中的应用框架**

| 阶段 | 描述 30 |  | 安全运营活动 1 |  | 关键指标/KPIs 33 |  |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **P (Plan)** | 分析现状，识别问题，设定改进目标，制定具体措施。 | \- 分析上周期事件/风险趋势，识别新的威胁向量。 \- 设定本周期目标（如：将凭据窃取类事件的检测时间缩短20%）。 \- 规划新的威胁狩猎场景或BAS模拟。 \- 规划新的SOAR剧本。 | \- 目标设定清晰度 (SMART) \- 计划覆盖范围 |  |  |  |
| **D (Do)** | 实施计划，在可控范围内测试变更。 | \- 部署新的检测规则。 \- 执行威胁狩猎或BAS攻击模拟。 \- 运行新的SOAR剧本。 \- 对安全团队进行新技术培训。 | \- 计划执行完成率 \- 模拟攻击执行成功率 |  |  |  |
| **C (Check)** | 评估执行结果，与目标对比，分析效果。 | \- 分析检测规则的告警准确率（真/误报）。 \- 评估BAS模拟结果，验证安全控制有效性。 \- 测量平均检测时间（MTTD）和平均响应时间（MTTR）。 \- 收集团队反馈。 | \- MTTD/MTTR改进率 \- 告警误报率降低幅度 \- BAS验证的防御/检测成功率 |  |  |  |
| **A (Act)** | 标准化成功经验，总结失败教训，纳入下一个循环。 | \- 将有效的检测规则正式部署。 \- 根据BAS结果，优化安全策略（如防火墙规则）。 \- 将成功的SOAR剧本固化为标准流程。 \- 将未解决的问题和新的发现纳入下一个P阶段。 | \- 标准化流程文档数量 \- 下一周期计划的改进点数量 |  |  |  |

### **3.3 收益（Yield）：破解安全投入的“黑洞”难题**

长期以来，安全投入一直被视为一个“黑洞”，其价值难以衡量，这使得安全部门在争取预算和证明自身价值时面临巨大挑战。Far Away模型的“收益”（Yield）要素直面这一难题，强调安全运营必须关注最终的效果，并从投入产出比（ROI）的角度来审视和量化安全工作的价值 1。

传统的ROI计算公式，如 ROI=成本(收益−成本)​，在安全领域难以直接套用，因为安全的“收益”往往不是直接创造的利润，而是避免的损失 34。为了解决这个问题，业界发展出了一套基于风险量化的安全ROI计算模型。其核心思想是通过风险评估，估算出在没有安全措施的情况下，某一类风险可能造成的年度预期损失（Annualized Loss Expectancy, ALE）。ALE的计算公式为

ALE=SLE×ARO，其中SLE（Single Loss Expectancy）是单次事件的预期损失，ARO（Annualized Rate of Occurrence）是该事件的年发生率。然后，在实施了某项安全措施后，重新评估风险，计算出新的年度预期损失（modified ALE, mALE）。由此，该安全措施的投资回报率可以量化为：ROI=投入成本(ALE−mALE−投入成本)​ 37。这个模型虽然依赖于一些估算，但它成功地将“风险降低”和“资产保值”这类无形的收益转化为了可量化的财务指标，为安全投资决策提供了有力依据。

“收益”的内涵不止于此。它还包括通过“调整”和优化，对不断叠加的安全能力和控制措施进行“做减法”，将复杂问题简单化，淘汰无效或冗余的工具，从而实现安全投入的效率最大化。更进一步，“收益”也体现在对业务的直接增益上，例如，一个稳健的安全体系可以增强客户信任，提升品牌声誉，甚至成为获取特定行业客户（如金融、政府）的竞争优势，这些都对企业价值和公共关系产生积极影响 1。

#### **3.3.1 实践深潜：入侵与攻击模拟（BAS）**

要量化“收益”，首先需要客观、持续地验证安全措施的“有效性”。入侵与攻击模拟（Breach and Attack Simulation, BAS）平台为此提供了强大的技术手段。BAS平台通过持续、自动地模拟真实世界的攻击技术和战术，来检验企业现有的安全控制措施（如防火墙、EDR、SIEM等）是否能够按预期进行防御、检测和告警 38。

BAS的核心价值在于，它将抽象的安全态势转化为具体、可衡量的数据。BAS平台可以提供明确的防御成功率和检测成功率评分，并将测试结果映射到MITRE ATT\&CK框架上，从而清晰地展示出在对抗何种攻击技术时存在防御缺口 39。这为“收益”的量化提供了直接的、客观的证据。例如，Picus Security等BAS平台能够通过持续的安全控制验证，帮助企业证明其安全工具是否物有所值，并提供具体的优化建议以提升ROI 39。

此外，通过持续运行BAS，组织可以：

1. **验证安全投资的有效性**：确保花费巨资购买的安全产品得到了正确的配置和使用，真正在发挥作用。  
2. **优化安全策略**：根据模拟结果，精确调整防火墙规则、EDR策略等，堵塞安全漏洞。  
3. **驱动PDCA循环**：BAS的验证结果是“Check”阶段的关键输入，直接驱动了“Act”阶段的改进动作。  
4. **提供ROI的量化依据**：例如，在实施某项优化措施后，可以通过BAS验证其防御成功率的提升，从而为计算mALE的降低提供了数据支持。

Forrester的研究也指出，采用持续安全验证的组织，其遭受攻击的可能性显著降低 41，这直接印证了BAS在提升安全“收益”方面的巨大价值。

## **第四章：运营之翼——AI与自动化的双轮驱动**

Far Away模型将人工智能（AI）与自动化（Automation）定位为驱动安全运营体系高效运转的双翼。它们不仅是提升效率的工具，更是重塑运营模式、解放人类智慧的颠覆性力量。这一洞察深刻地预见了现代SOC的演进方向：从人力密集型向智能驱动型转变。

### **4.1 自动化（Automation）：以SOAR为核心，解放生产力**

自动化是安全运营从繁琐、重复的手工任务中解放出来的必由之路，是不可逆转的趋势 1。其核心目标是将标准化的流程，如告警分类、信息富化、初步遏制等，交由机器执行，从而让宝贵的人力资源能够专注于更需要创造力、经验和复杂判断的威胁分析与决策工作 42。

安全编排自动化与响应（Security Orchestration, Automation, and Response, SOAR）是实现这一目标的核心技术。SOAR平台作为一个中枢系统，通过API和预置的连接器，将企业内部各种孤立的安全工具（如SIEM、EDR、防火墙、威胁情报平台）连接起来 1。它通过可视化的剧本（Playbook）编辑器，允许安全团队将事件响应的最佳实践流程固化为可自动执行的程序。当一个告警触发时，SOAR可以自动完成一系列动作：从SIEM获取告警、提取IP地址和文件哈希等关键指标、查询威胁情报平台判断其信誉、在EDR上隔离受感染的主机、在防火墙上阻断恶意IP，并自动创建工单通知相关人员 44。

案例分析：美国互联网安全中心（CIS）的Splunk SOAR实施  
美国互联网安全中心（CIS）作为一个处理海量安全告警的组织，曾面临着一线分析师不堪重负的困境。通过实施Splunk的SOAR平台，他们取得了惊人的成效：单次告警的分类处理时间从原来的30分钟急剧缩短到不足1分钟；约75%的一线分析师日常任务被成功自动化；整体事件响应时间提升了50%。这使得分析师团队能够从重复性的劳动中解脱出来，将精力投入到更复杂的威胁调查和战略性工作中 44。这个案例生动地展示了自动化在提升SOC运营效率、降低人员倦怠感方面的巨大价值。  
然而，实现自动化的道路并非一帆风顺。在拥有大量异构产品、特别是缺少标准化API接口的传统安全环境中，打通工具、统一流程是一项需要长期投入的艰巨任务 1。

### **4.2 人工智能（AI）：从辅助分析到自主决策的演进**

如果说自动化解决了“执行”层面的效率问题，那么人工智能则从根本上改变了“分析”与“决策”的模式。Far Away模型明确指出，AI决定了分析和决策能力，直接关系到风险和事件的发现速度、响应成本和最终效果 1。

传统AI在安全领域的应用，主要是利用机器学习进行模式识别和异常检测，例如识别恶意软件家族特征、发现偏离基线的用户行为等。这些应用通常作为人类专家经验的补充。而“AI驱动型SOC”则代表了下一代安全运营的范式革命。其核心思想是利用AI和机器学习的强大能力，自动完成从数据聚合、关联分析、告警降噪到事件定级和响应建议的全过程，将人类分析师从“大海捞针”式的告警筛选中解放出来，使其能够像外科医生一样，精准地处理少数真正需要人类智慧介入的高风险威胁 3。

#### **4.2.1 实践深潜：Palo Alto Networks的AI驱动型SOC (Cortex XSIAM)**

Palo Alto Networks推出的Cortex XSIAM（扩展安全智能与自动化管理）平台，是“AI驱动型SOC”理念的典型实践。许多组织面临的共同挑战是，传统的SIEM系统产生了海量的告警，但其中绝大多数是误报，同时，由于数据接入和关联分析的复杂性，导致安全可见性严重不足 46。

案例分析：某大型油气公司的SOC转型  
一家大型油气公司曾深受其传统SIEM的困扰，其告警误报率高达90%，每日产生上千条告警，使得SOC团队和外包的MSSP服务商都疲于奔命。此外，向SIEM中添加新的数据源过程繁琐，限制了安全可见性 46。为了彻底改变这一局面，该公司采用Cortex XSIAM平台进行SOC转型 47。  
XSIAM的核心能力在于其AI驱动的架构。它首先构建了一个统一的智能数据基础，能够高效地接入和整合来自终端、网络、云等所有来源的遥测数据 48。然后，其内置的、开箱即用的AI和机器学习模型会自动对海量原始告警进行分析、关联和聚合，将数千个低价值的告警聚合成少数几个高风险的“事件”（Incident），并为每个事件提供丰富的上下文信息和攻击路径分析 3。最后，通过嵌入式的自动化剧本，XSIAM能够对许多常规事件自动执行响应和关闭操作，真正做到“机器优先，人机协同” 48。

转型的结果是革命性的。该油气公司实现了：

* **误报率**：从90%降低到几乎为零。  
* **事件处理量**：每日需要人工调查的事件从1000个减少到250个。  
* **平均解决时间（MTTR）**：从数天之久缩短到惊人的59分钟 46。

这个案例雄辩地证明，AI不仅仅是现有流程的加速器，更是SOC运营模式的重塑者。它通过智能化的数据处理和决策支持，实现了安全运营在效率和效果上的双重飞跃。

### **4.3 最新研究成果：生成式AI（AIGC/LLM）的革命性潜力**

正当AI驱动型SOC方兴未艾之时，以ChatGPT为代表的生成式AI（Generative AI）和大型语言模型（Large Language Models, LLM）的爆发，为安全运营带来了新一轮的颠覆性机遇 1。2023年至2025年的大量研究报告和学术论文表明，LLM正在深刻地改变网络安全攻防的格局 45。

在威胁情报（Threat Intelligence）中的应用：  
威胁情报往往以非结构化的文本形式存在，如安全博客、研究报告、暗网论坛帖子等。传统上，分析师需要耗费大量时间阅读和提炼。LLM凭借其强大的自然语言理解和生成能力，可以秒级完成这项工作，自动从海量文本中提取关键的攻击者TTPs、IoCs和战役信息，极大提升了情报分析的效率和广度 51。例如，Mitra等人在2024年提出的LocalIntel框架，就利用LLM来查询和总结全球及本地的知识库，为用户提供可靠、精炼的威胁情报 51。  
**在分析（Analyze）与响应（Respond）中的应用**：

* **自然语言查询与交互**：LLM使得安全分析师可以用日常语言与安全数据进行交互，例如直接提问“显示过去24小时内所有从异常地理位置登录失败的管理员账号”，这极大地降低了数据分析的技术门槛 54。  
* **事件摘要与报告生成**：面对复杂的安全事件，LLM可以自动分析相关的所有告警和日志，生成一份通俗易懂的事件摘要、根本原因分析（RCA）报告以及详细的响应步骤建议，将分析师从繁重的报告撰写工作中解放出来 54。  
* **自动化剧本生成与优化**：LLM不仅可以辅助安全工程师编写和调试SOAR剧本，甚至有潜力根据最新的威胁情报动态生成或优化响应策略，使自动化响应更具智能和适应性 54。

双刃剑效应：  
然而，硬币的另一面是，攻击者同样在利用LLM的强大能力。他们使用LLM生成语法完美、上下文高度相关的钓鱼邮件，编写多态的、难以检测的恶意代码，甚至规划复杂的攻击活动 56。这使得AI攻防进入了一场前所未有的“军备竞赛”。这也反过来凸显了防御方必须全面拥抱AI，以AI的规模和速度来对抗AI驱动的攻击，这已不再是选择，而是必然。

## **第五章：整合与远航——Far Away模型的完备性论证与未来展望**

通过对Far Away模型三大支柱的深度解构，并结合前沿理论与一线实践，我们可以清晰地看到，该模型并非孤立概念的简单拼接，而是一个高度整合、逻辑自洽的系统性框架。它为构建面向未来的自适应安全运营体系提供了清晰的蓝图。

### **5.1 模型整合性分析：FAR、WAY与AI/Automation的协同与闭环**

Far Away模型的精髓在于其内部各要素之间形成的强大协同效应和动态闭环。它超越了单纯的技术或管理框架，将战术运营、战略价值和技术赋能有机地融为一体。

* **闭环的形成**：  
  * **FAR** 定义了运营的**战术循环**：围绕风险和事件进行“发现-分析-响应”。这是SOC日常工作的核心。  
  * **WAY** 提供了运营的**战略罗盘**：它回答了“为何运营”（Warrant \- 保障业务）、“如何衡量”（Yield \- 创造收益）以及“如何进化”（Adjust \- 持续调整）的根本问题。  
  * **AI与自动化** 则是驱动整个体系运转的**强大引擎**，它加速并优化了战术循环，同时为战略目标的实现提供了数据和手段。  
* **协同作用**：  
  * **WAY指导FAR**：“保障”（Warrant）和“收益”（Yield）的原则，决定了FAR活动的优先级。安全团队应将有限的资源聚焦于对业务构成最大风险的威胁上，而不是平均用力。例如，一个直接影响核心交易系统的漏洞，其响应优先级远高于一个影响内部非关键应用的漏洞。  
  * **FAR驱动WAY**：“发现”（Find）的风险和事件数据，是“调整”（Adjust）过程的关键输入。每个安全事件都是一次检验防御体系的机会，其分析结果应直接驱动PDCA循环，促进流程、策略和工具的持续改进。  
  * **AI/Automation赋能全局**：AI与自动化并非独立于FAR和WAY之外，而是深度嵌入其中。AI驱动的分析能力提升了“发现”和“分析”的精准度；自动化编排提升了“响应”的速度和一致性；BAS等自动化验证工具为“收益”的量化提供了数据基础；SOAR剧本的迭代本身就是“调整”过程的体现。AI和自动化不仅让FAR和WAY的循环转得更快，更从根本上改变了它们的实现方式，将许多过去依赖人力和经验的环节，转变为数据驱动和代码定义的流程。

下表系统性地总结了Far Away模型的核心要素与其对应的理论基础、关键实践和技术范例，直观地展示了该模型的整合性与完备性。

**表2：Far Away模型核心要素与理论及实践映射表**

| Far Away组件 | 核心哲学 1 |  | 指导理论/框架 | 关键实践/方法论 | 使能技术/案例研究 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **F (Find)** | 主动发现 | 风险驱动安全 1 | 威胁狩猎 13 | CrowdStrike Falcon OverWatch 20 |  |
| **A (Analyze)** | 数据驱动洞察 | MITRE ATT\&CK 21 | 关联事件分析 | Palo Alto XSIAM (AI驱动的关联分析) 46 |  |
| **R (Respond)** | 高效缓解 | 事件响应生命周期 | 自动化响应剧本 | Splunk SOAR 44 |  |
| **W (Warrant)** | 业务赋能 | 对齐安全与业务目标 28 | 安全治理、风险委员会 | \- |  |
| **A (Adjust)** | 持续改进 | PDCA循环 30 | 迭代式流程优化 | SOC优化服务 62 |  |
| **Y (Yield)** | 价值证明 | 安全ROI计算 (ALE模型) 37 | 持续安全验证 | 入侵与攻击模拟 (BAS) 平台 39 |  |
| **AI** | 智能决策 | 生成式AI / LLM 51 | AI驱动的威胁情报与分析 | SOC中的生成式AI 53 |  |
| **Automation** | 规模化执行 | 流程自动化 (RPA/SOAR) 1 | 安全编排 | SOAR平台 (如 Splunk, Cortex XSOAR) 42 |  |

### **5.2 实施挑战与战略建议**

尽管Far Away模型描绘了一幅理想的蓝图，但在实践中落地仍面临诸多挑战：

* **文化挑战**：最大的障碍往往来自组织文化。要实现从被动的、技术驱动的、以IT为中心的文化，转向主动的、业务驱动的、持续改进的文化，需要最高管理层自上而下的坚定支持和全员范围内的思维转变 28。  
* **人才挑战**：该模型对安全人才提出了全新的要求。未来的核心安全人才不再是简单的“告警分析员”，而是需要具备数据科学、自动化开发、风险管理、威胁狩猎和业务沟通等多重能力的复合型专家。模型中预见的自动化对传统岗位结构的冲击，要求企业必须对现有的人才培养和招聘模式进行颠覆式设计，以应对未来的人才缺口 1。  
* **技术挑战**：整合异构的安全工具、构建统一的、高质量的数据湖、驾驭AI技术的复杂性（如模型漂移、数据偏见、幻觉等问题），是成功实施该模型的关键技术前提 1。这需要长期的、战略性的技术架构规划和投入。

基于以上挑战，建议企业采取分阶段、迭代式的策略来推进Far Away模型的落地。可以从构建基础的数据可见性和自动化响应能力入手（例如，部署EDR和基础的SOAR剧本），然后逐步引入风险驱动的优先级排序和主动的威胁狩猎实践，最终向全面的、AI驱动的自适应运营体系迈进。

### **5.3 结论：行则将至，构建面向未来的自适应安全运营体系**

Far Away模型并非一个凭空创造的理论，而是对现代安全运营领域最佳实践和未来发展趋势的一次深刻洞察、高度概括和系统性提炼。它以系统论的整体观为哲学根基，将战术层面的运营活动（FAR）、战略层面的价值实现（WAY）以及技术层面的核心驱动力（AI与自动化）无缝地整合在一起，构成了一个动态、闭环、自适应的先进框架。

这个框架的价值在于，它为安全领导者提供了一张从战术执行到战略价值的完整地图。它指导安全团队不仅要做好“发现、分析、响应”的本职工作，更要思考如何“保障业务、持续调整、证明收益”，并善用“AI与自动化”这一强大武器。

在数字化转型浪潮席卷全球、网络攻防对抗日益激烈的VUCA时代，“道阻且长”。然而，遵循Far Away模型所指引的这条系统性、前瞻性的道路，以终为始，持续迭代，“行则将至”。最终的目标，是构建一个不再被动救火，而是能够自我感知、自我调整、自我优化，并能持续向业务证明其核心价值的、真正智能化的新一代安全运营体系。这样的体系，将是企业在未来数字世界中乘风破浪、行稳致远的坚实基石。

#### **Works cited**

1. 道阻且长.docx  
2. 网络安全架构现状及发展趋势探讨 \- 国家保密局, accessed June 26, 2025, [https://www.gjbmj.gov.cn/n1/2023/0607/c411145-40008332.html](https://www.gjbmj.gov.cn/n1/2023/0607/c411145-40008332.html)  
3. How AI-Driven SOC Solutions Transform Cybersecurity: Cortex XSIAM \- Palo Alto Networks, accessed June 26, 2025, [https://www.paloaltonetworks.com/cyberpedia/revolutionizing-soc-operations-with-ai-soc-solutions](https://www.paloaltonetworks.com/cyberpedia/revolutionizing-soc-operations-with-ai-soc-solutions)  
4. 网络空间安全综述 \- 中国科学：信息科学 \- 中国科学杂志社, accessed June 26, 2025, [http://scis.scichina.com/cn/2016/N112015-00176.pdf](http://scis.scichina.com/cn/2016/N112015-00176.pdf)  
5. 网络空间安全学科简论Introduction to cyberspace security discipline, accessed June 26, 2025, [https://www.infocomm-journal.com/cjnis/EN/article/downloadArticleFile.do?attachType=PDF\&id=168670](https://www.infocomm-journal.com/cjnis/EN/article/downloadArticleFile.do?attachType=PDF&id=168670)  
6. 蒋广学：从系统工程视角思考网络安全工作 \- 中国教育和科研计算机网, accessed June 26, 2025, [https://www.edu.cn/xxh/focus/li\_lun\_yj/202309/t20230926\_2500216.shtml](https://www.edu.cn/xxh/focus/li_lun_yj/202309/t20230926_2500216.shtml)  
7. 网络安全基础知识大全-黄河水利职业技术学院-信息化管理办公室, accessed June 26, 2025, [https://www.yrcti.edu.cn/main/info/1031/1452.htm](https://www.yrcti.edu.cn/main/info/1031/1452.htm)  
8. 2024年安全运营技术趋势回顾, accessed June 26, 2025, [https://www.secrss.com/articles/74051](https://www.secrss.com/articles/74051)  
9. 厂商视角的“安全运营” \- 安全内参| 决策者的网络安全知识库, accessed June 26, 2025, [https://www.secrss.com/articles/29299](https://www.secrss.com/articles/29299)  
10. Risk Based Supervision \- Stengthening Our Supervisory Approach \- MFSA, accessed June 26, 2025, [https://www.mfsa.mt/wp-content/uploads/2020/06/Risk-Based-Supervision-Stengthening-Our-Supervisory-Approach.pdf](https://www.mfsa.mt/wp-content/uploads/2020/06/Risk-Based-Supervision-Stengthening-Our-Supervisory-Approach.pdf)  
11. Just Enough Software Architecture: A Risk-Driven Approach, accessed June 26, 2025, [http://ndl.ethernet.edu.et/bitstream/123456789/28601/1/11.pdf](http://ndl.ethernet.edu.et/bitstream/123456789/28601/1/11.pdf)  
12. SIEM 与SOC：了解其不同的角色 \- Stellar Cyber, accessed June 26, 2025, [https://stellarcyber.ai/zh-CN/%E5%AD%A6%E4%B9%A0/siem-%E4%B8%8E-soc/](https://stellarcyber.ai/zh-CN/%E5%AD%A6%E4%B9%A0/siem-%E4%B8%8E-soc/)  
13. 什么是威胁猎杀？| IBM, accessed June 26, 2025, [https://www.ibm.com/cn-zh/topics/threat-hunting](https://www.ibm.com/cn-zh/topics/threat-hunting)  
14. 什麼是威脅狩獵? \- TeamT5, accessed June 26, 2025, [https://teamt5.org/tw/posts/what-is-threat-hunting/](https://teamt5.org/tw/posts/what-is-threat-hunting/)  
15. 威胁猎杀终极指南》：技术与解决方案, accessed June 26, 2025, [https://www.aryaka.com/zh-hans/blog/threat-hunting/](https://www.aryaka.com/zh-hans/blog/threat-hunting/)  
16. 威胁狩猎发展研究及政策建议, accessed June 26, 2025, [https://www.secrss.com/articles/40865](https://www.secrss.com/articles/40865)  
17. How CrowdStrike Uses AI to Automate Threat Hunting \- Redress Compliance, accessed June 26, 2025, [https://redresscompliance.com/how-crowdstrike-uses-ai-to-automate-threat-hunting/](https://redresscompliance.com/how-crowdstrike-uses-ai-to-automate-threat-hunting/)  
18. 2020 Threat Hunting Report: Insights From the CrowdStrike OverWatch Team, accessed June 26, 2025, [https://www.crowdstrike.com/en-us/resources/reports/threat-hunting-report-2020/](https://www.crowdstrike.com/en-us/resources/reports/threat-hunting-report-2020/)  
19. CASE STUDY \- CrowdStrike, accessed June 26, 2025, [https://www.crowdstrike.com/wp-content/brochures/manufacturing/Case-Manufacturing.pdf](https://www.crowdstrike.com/wp-content/brochures/manufacturing/Case-Manufacturing.pdf)  
20. How CrowdStrike Hunts, Identifies and Defeats Cloud-Focused Threats, accessed June 26, 2025, [https://www.crowdstrike.com/en-us/blog/how-crowdstrike-hunts-identifies-and-defeats-cloud-threats/](https://www.crowdstrike.com/en-us/blog/how-crowdstrike-hunts-identifies-and-defeats-cloud-threats/)  
21. 什麼是MITRE ATT\&CK 框架？ \- Check Point軟體, accessed June 26, 2025, [https://www.checkpoint.com/tw/cyber-hub/threat-prevention/what-is-mitre-attck-framework/](https://www.checkpoint.com/tw/cyber-hub/threat-prevention/what-is-mitre-attck-framework/)  
22. 什么是MITRE ATT\&CK 框架？, accessed June 26, 2025, [https://www.paloaltonetworks.cn/cyberpedia/what-is-mitre-attack-framework](https://www.paloaltonetworks.cn/cyberpedia/what-is-mitre-attack-framework)  
23. 什么是MITRE ATT\&CK 框架？| IBM, accessed June 26, 2025, [https://www.ibm.com/cn-zh/think/topics/mitre-attack](https://www.ibm.com/cn-zh/think/topics/mitre-attack)  
24. 什麼是MITRE ATT\&CK 框架? 如何利用威脅情資搭配此資安框架並升級企業資安實力?, accessed June 26, 2025, [https://teamt5.org/tw/posts/what-is-mitre-att-and-ck-matrix/](https://teamt5.org/tw/posts/what-is-mitre-att-and-ck-matrix/)  
25. 了解MITRE ATT\&CK® 框架的安全覆盖范围 \- Learn Microsoft, accessed June 26, 2025, [https://learn.microsoft.com/zh-cn/azure/sentinel/mitre-coverage](https://learn.microsoft.com/zh-cn/azure/sentinel/mitre-coverage)  
26. Managed SOC Services | Security Operations Centre \- Acora, accessed June 26, 2025, [https://acora.com/our-services/managed-services/cyber-security/managed-soc/](https://acora.com/our-services/managed-services/cyber-security/managed-soc/)  
27. Boston, MA | SecureWorld, accessed June 26, 2025, [https://events.secureworld.io/agenda/boston-ma-2025/](https://events.secureworld.io/agenda/boston-ma-2025/)  
28. Adam Gresh: Information Security Can Go With the Flow \- South Florida ISSA, accessed June 26, 2025, [https://sfissa.org/adam-gresh-information-security-can-go-with-the-flow/](https://sfissa.org/adam-gresh-information-security-can-go-with-the-flow/)  
29. Cybersecurity Policy Development: Building Digital Defense, accessed June 26, 2025, [https://faisalyahya.com/cybersecurity-leadership/cybersecurity-policy-development-building-digital-defense/](https://faisalyahya.com/cybersecurity-leadership/cybersecurity-policy-development-building-digital-defense/)  
30. PDCA 循环：持续改进指南- Dropbox \- Dropbox.com, accessed June 26, 2025, [https://www.dropbox.com/zh\_CN/resources/pdca](https://www.dropbox.com/zh_CN/resources/pdca)  
31. 搞懂PDCA 模型，工作效率直线提高200% | Xmind 博客, accessed June 26, 2025, [https://xmind.cn/blog/how-to-Improve-work-efficiency-with-PDCA/](https://xmind.cn/blog/how-to-Improve-work-efficiency-with-PDCA/)  
32. 水处理工程项目安全管理中PDCA循环的应用, accessed June 26, 2025, [https://front-sci.com/journal/article?doi=10.32629/eep.v3i7.914](https://front-sci.com/journal/article?doi=10.32629/eep.v3i7.914)  
33. PDCA循环法在提升打车软件服务质量中的应用, accessed June 26, 2025, [https://pdf.hanspub.org/ecl20240200000\_32149365.pdf](https://pdf.hanspub.org/ecl20240200000_32149365.pdf)  
34. 什么是ROAS? 如何计算ROAS? \- Adjust, accessed June 26, 2025, [https://www.adjust.com/zh/glossary/roas-definition/](https://www.adjust.com/zh/glossary/roas-definition/)  
35. 什么是ROI转化分析- Zoho CRM, accessed June 26, 2025, [https://www.zoho.com.cn/crm/articles/roi1710.html](https://www.zoho.com.cn/crm/articles/roi1710.html)  
36. 中小企业如何准确计算安全投资回报率 \- TechTarget信息化, accessed June 26, 2025, [https://searchcio.techtarget.com.cn/8-25790/](https://searchcio.techtarget.com.cn/8-25790/)  
37. 中小企业应该如何计算安全投资回报率？ \- TechTarget信息化, accessed June 26, 2025, [https://searchcio.techtarget.com.cn/8-25838/](https://searchcio.techtarget.com.cn/8-25838/)  
38. 入侵和攻击模拟(BAS) 技术应用实践及热门产品分析 \- 安全内参, accessed June 26, 2025, [https://www.secrss.com/articles/63957](https://www.secrss.com/articles/63957)  
39. Breach and Attack Simulation Platform \- Picus \- Picus Security, accessed June 26, 2025, [https://www.picussecurity.com/breach-and-attack-simulation](https://www.picussecurity.com/breach-and-attack-simulation)  
40. What is Breach and Attack Simulation (BAS)? \- Rapid7, accessed June 26, 2025, [https://www.rapid7.com/fundamentals/what-is-breach-and-attack-simulation-bas/](https://www.rapid7.com/fundamentals/what-is-breach-and-attack-simulation-bas/)  
41. Penetration Testing Services \- CyberPulse, accessed June 26, 2025, [https://www.cyberpulse.com.au/penetration-testing-services/](https://www.cyberpulse.com.au/penetration-testing-services/)  
42. What is SOAR (Security Orchestration, Automation, and Response)? \- Balbix, accessed June 26, 2025, [https://www.balbix.com/insights/what-is-security-orchestration-automation-and-response-soar/](https://www.balbix.com/insights/what-is-security-orchestration-automation-and-response-soar/)  
43. Best Security Orchestration, Automation & Response Software for Enterprises in the US, accessed June 26, 2025, [https://eternitech.com/top-security-orchestration-and-automation-for-enterprises/](https://eternitech.com/top-security-orchestration-and-automation-for-enterprises/)  
44. Skyrocket Security with SOAR in 2024: Automate & Dominate\! \- Bootlabs, accessed June 26, 2025, [https://www.bootlabstech.com/technical-deep-dive-into-soar/](https://www.bootlabstech.com/technical-deep-dive-into-soar/)  
45. State of AI in Cybersecurity 2025 \- MixMode AI, accessed June 26, 2025, [https://mixmode.ai/state-of-ai-in-cyber-2025/](https://mixmode.ai/state-of-ai-in-cyber-2025/)  
46. Oil and gas company deploys AI-driven SOC with Cortex XSIAM \- Palo Alto Networks, accessed June 26, 2025, [https://www.paloaltonetworks.com/customers/oil-and-gas-company-deploys-ai-driven-soc-with-cortex-xsiam](https://www.paloaltonetworks.com/customers/oil-and-gas-company-deploys-ai-driven-soc-with-cortex-xsiam)  
47. AI-Driven SOC Transformation with Cortex XSIAM \- Palo Alto Networks, accessed June 26, 2025, [https://www.paloaltonetworks.com/resources/ebooks/ai-driven-soc-transformation-with-cortex-xsiam](https://www.paloaltonetworks.com/resources/ebooks/ai-driven-soc-transformation-with-cortex-xsiam)  
48. What is Cortex XSIAM? AI-Driven Platform \- Palo Alto Networks, accessed June 26, 2025, [https://www.paloaltonetworks.com.au/cyberpedia//what-is-extended-security-intelligence-and-automation-management-xsiam](https://www.paloaltonetworks.com.au/cyberpedia//what-is-extended-security-intelligence-and-automation-management-xsiam)  
49. Accelerate Your SecOps with Cortex \- Palo Alto Networks, accessed June 26, 2025, [https://origin-www.paloaltonetworks.co.uk/cortex](https://origin-www.paloaltonetworks.co.uk/cortex)  
50. Generative AI in Cyber Security Research Report 2025: Market Opportunities and Strategies to 2034 \- Remote Work and Data Breach Costs Fuel Growth Amid High Implementation Challenges \- GlobeNewswire, accessed June 26, 2025, [https://www.globenewswire.com/news-release/2025/05/12/3079051/28124/en/Generative-AI-in-Cyber-Security-Research-Report-2025-Market-Opportunities-and-Strategies-to-2034-Remote-Work-and-Data-Breach-Costs-Fuel-Growth-Amid-High-Implementation-Challenges.html](https://www.globenewswire.com/news-release/2025/05/12/3079051/28124/en/Generative-AI-in-Cyber-Security-Research-Report-2025-Market-Opportunities-and-Strategies-to-2034-Remote-Work-and-Data-Breach-Costs-Fuel-Growth-Amid-High-Implementation-Challenges.html)  
51. When LLMs meet cybersecurity: a systematic literature review \- ResearchGate, accessed June 26, 2025, [https://www.researchgate.net/publication/388723406\_When\_LLMs\_meet\_cybersecurity\_a\_systematic\_literature\_review](https://www.researchgate.net/publication/388723406_When_LLMs_meet_cybersecurity_a_systematic_literature_review)  
52. s42400-025-00361-w | PDF | Computer Security \- Scribd, accessed June 26, 2025, [https://www.scribd.com/document/851856294/s42400-025-00361-w](https://www.scribd.com/document/851856294/s42400-025-00361-w)  
53. How Can Generative AI Be Used in Cybersecurity? 10 Real-World Examples \- Secureframe, accessed June 26, 2025, [https://secureframe.com/blog/generative-ai-cybersecurity](https://secureframe.com/blog/generative-ai-cybersecurity)  
54. IBM: Mastering Generative AI for Cybersecurity \- edX, accessed June 26, 2025, [https://www.edx.org/learn/computer-science/ibm-mastering-generative-ai-for-cybersecurity](https://www.edx.org/learn/computer-science/ibm-mastering-generative-ai-for-cybersecurity)  
55. How Can Generative AI be Used in Cybersecurity \- Swimlane, accessed June 26, 2025, [https://swimlane.com/blog/how-can-generative-ai-be-used-in-cybersecurity/](https://swimlane.com/blog/how-can-generative-ai-be-used-in-cybersecurity/)  
56. Empowering Cyber Defense: How Generative AI is Transforming Cybersecurity \- NTT Data, accessed June 26, 2025, [https://www.nttdata.com/global/en/insights/focus/2025/empowering-cyber-defense-how-generative-ai-is-transforming-cybersecurity](https://www.nttdata.com/global/en/insights/focus/2025/empowering-cyber-defense-how-generative-ai-is-transforming-cybersecurity)  
57. 7 AI Cybersecurity Trends For The 2025 Cybercrime Landscape \- Exploding Topics, accessed June 26, 2025, [https://explodingtopics.com/blog/ai-cybersecurity](https://explodingtopics.com/blog/ai-cybersecurity)  
58. 2025 Global Threat Report | Latest Cybersecurity Trends & Insights | CrowdStrike, accessed June 26, 2025, [https://www.crowdstrike.com/en-us/global-threat-report/](https://www.crowdstrike.com/en-us/global-threat-report/)  
59. The 2025 Study on the State of AI in Cybersecurity | Ponemon-Sullivan Privacy Report, accessed June 26, 2025, [https://ponemonsullivanreport.com/2025/06/the-2025-study-on-the-state-of-ai-in-cybersecurity/](https://ponemonsullivanreport.com/2025/06/the-2025-study-on-the-state-of-ai-in-cybersecurity/)  
60. 一篇读懂pdca循环模型的内容与应用！, accessed June 26, 2025, [https://boardmix.cn/article/what-is-pdca-model/](https://boardmix.cn/article/what-is-pdca-model/)  
61. PDCA循环法在提升打车软件服务质量中的应用——以“黔出行”App为例 \- hanspub.org, accessed June 26, 2025, [https://www.hanspub.org/journal/paperinformation?paperid=87293](https://www.hanspub.org/journal/paperinformation?paperid=87293)  
62. 优化安全运营 \- Learn Microsoft, accessed June 26, 2025, [https://learn.microsoft.com/zh-cn/azure/sentinel/soc-optimization/soc-optimization-access](https://learn.microsoft.com/zh-cn/azure/sentinel/soc-optimization/soc-optimization-access)  
63. security operations center (soc) optimization services, accessed June 26, 2025, [https://www.guidepointsecurity.com/soc-optimization-services/](https://www.guidepointsecurity.com/soc-optimization-services/)