### **企业公有云应用审计全面解决方案**

---

#### **目录**

**第1章 引言：云时代的审计新范式**
1.1. **背景**：数字化转型浪潮下的公有云依赖
1.2. **挑战**：云环境带来的新型风险与审计复杂性
1.3. **审计目标**：从合规检查到价值创造
1.4. **本文档结构与阅读指南**

**第2章 云审计核心框架与原则**
2.1. **审计范围界定**
2.2. **关键审计标准与框架**
2.3. **核心审计原则**

**第3章 全生命周期审计策略与实践**
3.1. **第一阶段：云服务选型与采购审计**
3.2. **第二阶段：部署与配置审计**
3.3. **第三阶段：运营与持续监控审计**
3.4. **第四阶段：服务终止与退出审计**

**第4章 关键审计领域深度解析**
4.1. **安全审计**
4.2. **合规性审计**
4.3. **性能与可用性审计**
4.4. **成本审计 (FinOps)**

**第5章 审计指标与基线建设**
5.1. **构建结果导向的KPI体系**
5.2. **建立与维护安全基线**
5.3. **CSA持续审计指标目录的应用**

**第6章 自动化与AI赋能的未来审计**
6.1. **云审计自动化的演进**
6.2. **AI在云审计中的应用**
6.3. **案例研究：AI驱动的持续控制监控**

**第7章 审计管控流程与最佳实践**
7.1. **构建审计闭环管理流程**
7.2. **审计团队的角色与职责**
7.3. **审计报告与沟通**
7.4. **最佳实践清单**

**第8章 结论与展望**
8.1. **核心要点回顾**
8.2. **未来趋势**
8.3. **行动倡议**

**附录**
A. **核心概念信息图**
B. **术语表**

---

### **第1章 引言：云时代的审计新范式**

#### **1.1. 背景：数字化转型浪潮下的公有云依赖**
随着企业加速数字化转型，公有云已从一种技术选项演变为支撑业务创新、敏捷性和可扩展性的核心基础设施。从基础设施即服务（IaaS）到平台即服务（PaaS）乃至软件即服务（SaaS），企业正将越来越多的关键应用和数据迁移至云端。这种深度依赖在带来巨大业务价值的同时，也引入了前所未有的风险敞口和管理复杂性。

#### **1.2. 挑战：云环境带来的新型风险与审计复杂性**
传统的数据中心审计方法在动态、抽象的云环境中已显得力不从心。企业审计团队面临着一系列全新的挑战：
- **动态与短暂的基础设施**：虚拟机、容器等资源可能在几分钟内被创建和销毁，传统的周期性审计无法捕捉到配置漂移和短暂性风险。
- **责任共担模型的模糊地带**：云服务提供商（CSP）和客户（CSC）之间的安全责任划分（即“责任共担模型”）常常被误解，导致关键安全控制措施的缺失。
- **供应链风险的延伸**：选择云服务商不仅是技术采购，更是将企业的核心运营依赖于第三方。CSP自身的安全状况、其下游供应商的风险，都构成了企业供应链风险管理（SCRM）的一部分。
- **可见性与控制权的减弱**：企业无法物理接触底层基础设施，必须依赖CSP提供的工具和API来获取审计证据，这要求审计方法和技能的根本性转变。

#### **1.3. 审计目标：从合规检查到价值创造**
面对这些挑战，现代云审计的目标必须超越传统的合规检查。一个成熟的云审计体系应致力于实现三重价值：
1.  **确保安全与合规的底线**：验证云环境是否符合外部法规（如GDPR、行业监管）和内部安全策略，保障数据和应用的安全。
2.  **优化性能与成本效益**：审计云资源的利用率、配置和购买策略，识别浪费，提出优化建议，实现成本效益最大化（FinOps）。
3.  **支撑业务韧性与战略决策**：通过对云架构、灾备能力和供应商风险的评估，为管理层提供数据驱动的洞察，支撑企业战略决策和业务连续性。

#### **1.4. 本档结构与阅读指南**
本文档旨在提供一个覆盖公有云应用**全生命周期**（选型、部署、运营、退出）的综合审计解决方案。它将融合NIST、CSA、ISO等国际主流框架，并探讨自动化与人工智能如何重塑审计的未来。无论您是内部审计师、IT风险管理者还是安全工程师，本文都将为您提供一套系统性的方法论和可落地的实践指南。

---

### **第2章 云审计核心框架与原则**

#### **2.1. 审计范围界定**
成功的云审计始于清晰的范围界定。核心是深刻理解并应用**责任共担模型**。

> **图注**：该图表清晰划分了在IaaS, PaaS, SaaS三种模式下，云服务提供商（蓝色）和客户（绿色）各自的安全责任，以及共享责任区（渐变色）。“审计与合规”作为贯穿所有层级的共享责任被特别强调。

审计范围必须明确覆盖客户责任范围内的所有层面，包括：
- **云之上 (Security *in* the Cloud)**：客户部署的应用、数据、身份访问管理（IAM）、操作系统和网络配置。
- **云之中 (Security *of* the Cloud)**：虽然由CSP负责，但客户仍有责任审计CSP是否履行了其承诺，例如，通过审查其合规性报告（如SOC 2, ISO 27001认证）。

#### **2.2. 关键审计标准与框架**
为了确保审计的系统性和权威性，我们建议采用以下三大框架作为支柱，构建统一的云审计体系。

> **图注**：该图以企业审计目标为中心，通过三个分支分别展示NIST CSF 2.0（风险管理结构）、CSA CCM v4（云原生控制）和ISO 27017（责任共担指南）如何协同工作，共同支撑企业的安全、合规、成本和性能目标。

1.  **NIST网络安全框架 (CSF) 2.0**：作为风险治理的顶层指导。其最新版本引入的“**治理 (Govern)**”职能，强调将网络安全与企业战略和供应链风险管理（SCRM）相结合，为云服务采购和供应商管理提供了战略视角。其五大核心职能（识别、保护、检测、响应、恢复）为构建全方位的审计活动提供了逻辑框架。
2.  **云安全联盟云控制矩阵 (CSA CCM) v4**：这是云原生环境的“黄金标准”。它包含17个域的197项具体控制目标，为评估CSP的安全能力和审计企业内部的云配置提供了最详尽、最贴近云环境的清单。其与主流标准的映射关系（如ISO 27001, PCI-DSS）极大地简化了多重合规性审计。
3.  **ISO/IEC 27017**：作为ISO 27002的云服务扩展，它为CSP和CSC提供了专属的安全实践指南，尤其在**厘清具体场景下的责任**（如监控、虚拟机隔离）和**服务终止时的数据处理**方面提供了明确指引，是合同审查和退出审计的重要依据。

#### **2.3. 核心审计原则**
- **持续性原则**：摒弃“一年一次”的静态审计，转向基于自动化工具的**持续监控和实时验证**。云环境的动态性要求审计活动同样具备高频和实时的特性。
- **风险导向原则**：审计资源永远是有限的。必须基于持续的风险评估，将审计的焦点和深度集中在最关键的业务应用、最敏感的数据和风险最高的配置上。
- **证据驱动原则**：所有审计发现都必须基于可验证的、不可篡改的证据，如云平台日志、配置快照和第三方监控数据。口头确认或不完整的截图是不够的。
- **自动化优先原则**：尽可能利用云原生工具、CSPM（云安全配置管理）和CNAPP（云原生应用保护平台）等自动化技术，实现对海量资源的全面、高效审计，将人力从重复性检查中解放出来，专注于复杂的风险分析。

---

### **第3章 全生命周期审计策略与实践**

对云应用的审计不应是一次性的事件，而应嵌入其从“出生”到“消亡”的整个生命周期中。

> **图注**：一个包含四个阶段（选型采购、部署配置、运营监控、终止退出）的环形图，中心是“持续保障与改进”，强调了审计的连续性和循环特性。每个阶段都配有核心活动的图标和关键词。

#### **3.1. 第一阶段：云服务选型与采购审计**
* **审计目标**：确保供应商安全可靠，合同条款权责清晰，从源头控制风险。
* **审计要点**：
    | 审计领域 | 关键审计活动 | 核心依据 |
    | :--- | :--- | :--- |
    | **供应商尽职调查** | 审查CSP的财务状况、市场声誉、技术能力和安全认证（如ISO 27001, SOC 2）。 | NIST CSF 2.0 (Govern) |
    | **供应链风险评估** | 评估CSP的供应链安全实践，了解其对下游供应商的管理。 | NIST CSF 2.0 (SCRM) |
    | **安全能力评估** | 要求CSP提供其**CSA CCM**的合规性问卷（CAIQ）或第三方审计报告，进行逐项评估。 | CSA CCM v4 |
    | **服务等级协议 (SLA) 审计** | 审查SLA中关于可用性、性能、灾备（RTO/RPO）的承诺是否满足业务需求，以及赔偿条款的合理性。 | 业务影响分析 (BIA) |
    | **合同条款审计** | 重点审查数据所有权、数据地理位置、**审计权**、**数据销毁**和**退出机制**等关键条款，确保无供应商锁定风险。 | ISO 27017 |

#### **3.2. 第二阶段：部署与配置审计**
* **审计目标**：验证云环境的初始配置是否符合内部安全基线和行业最佳实践，防止“带病上线”。
* **审计要点**：
    - **身份与访问管理 (IAM)**：
        - 是否遵循**最小权限原则**？
        - 是否对所有特权账户强制启用**多因素认证 (MFA)**？
        - 角色与权限是否实现职责分离？
    - **网络安全配置**：
        - 虚拟私有云（VPC）的子网划分和路由是否合理？
        - 安全组和网络ACLs是否遵循“默认拒绝”策略，仅开放必要的端口？
        - 是否使用网络防火墙、WAF等进行边界防护？
    - **数据安全配置**：
        - 存储桶、数据库等是否默认开启**静态加密**？
        - 数据在传输过程中是否强制使用TLS 1.2以上协议加密？
        - 加密密钥是否由客户管理的密钥管理服务（KMS）进行安全存储和轮换？
    - **计算资源安全**：
        - 虚拟机镜像是否经过**安全硬化**，移除了不必要的服务和软件？
        - 容器镜像是否存在已知高危漏洞？容器运行时安全是否得到监控？
    - **安全基线符合性**：
        - 使用**CSPM**工具，自动化扫描所有云资源配置，对照**CIS Benchmarks**或企业自定义基线，检测配置漂移。

#### **3.3. 第三阶段：运营与持续监控审计**
* **审计目标**：保障云应用在长期运营过程中的持续安全、合规与高效。这是云审计的核心和价值所在。
* **审计要点**：
    - **持续监控与威胁检测 (NIST Detect)**：
        - 是否聚合了所有关键日志（如CloudTrail, VPC Flow Logs）并进行集中分析？
        - 是否部署了基于行为分析的威胁检测能力，以发现异常活动（如异常API调用、数据泄露企图）？
    - **漏洞与补丁管理**：
        - 漏洞扫描的频率和覆盖范围是否足够？
        - 从发现高危漏洞到完成修复的平均时间（MTTR）是否在SLA要求内？
    - **事件响应与恢复 (NIST Respond/Recover)**：
        - 事件响应预案是否针对云环境进行过适配和演练？
        - 备份与恢复流程是否定期测试，并能满足业务RTO/RPO要求？
    - **变更管理**：
        - 是否所有生产环境的变更都通过了严格的审批流程和影响分析？
        - 是否有机制审计“法外变更”（即绕过流程的直接控制台操作）？
    - **成本效益 (FinOps)**：
        - 是否持续监控资源利用率，及时关闭或缩减闲置资源？
        - 成本是否能准确归因到具体的业务部门或项目？

#### **3.4. 第四阶段：服务终止与退出审计**
* **审计目标**：在更换服务商或下线应用时，确保数据被安全、完整地迁移或销毁，避免数据残留和后门风险。
* **审计要点**：
    - **数据迁移与完整性验证**：确保所有业务数据被完整迁移到新环境，并经过哈希校验等方式验证。
    - **数据销毁的有效性**：根据合同和ISO 27017规定，要求CSP提供数据已按标准（如NIST SP 800-88）被彻底销毁的**书面凭证**。
    - **账户与访问权限的彻底移除**：停用并删除所有相关的IAM用户、角色和访问密钥。
    - **网络连接的断开**：确保所有VPC对等连接、VPN等网络通道已被彻底拆除。

---

### **第4章 关键审计领域深度解析**

除了按生命周期划分，审计活动也可以按专业领域进行深度剖析。

#### **4.1. 安全审计**
- **身份认证与权限管理**：审计的核心是验证“谁在何时何地用何种权限访问了什么”。重点关注特权账户、服务账户和跨账户访问的权限模型。
- **数据生命周期安全**：从数据创建、存储、使用、共享到销毁，审计每个环节的加密、脱敏、访问控制和数据防泄露（DLP）措施。
- **应用与接口安全 (API Security)**：在云原生架构中，API是新的攻击面。审计API的认证、授权、速率限制和输入验证机制至关重要。
- **基础设施与网络安全**：审计网络分段、流量监控、DDoS防护和基础设施即代码（IaC）模板的安全性。

#### **4.2. 合规性审计**
- **数据主权与隐私法规**：验证数据存储的地理位置是否符合GDPR、CCPA等法规要求，以及是否建立了处理个人数据请求的流程。
- **行业特定法规**：针对金融（如ABS）、医疗（如HIPAA）等行业，审计云环境是否满足其特定的安全与合规控制要求。
- **内部策略与标准符合性**：验证云上操作是否严格遵守了企业内部的安全策略、数据分类标准等。

#### **4.3. 性能与可用性审计**
- **SLA指标达成率验证**：通过第三方监控工具，独立验证CSP的可用性和性能指标是否如SLA所承诺。
- **业务连续性与灾难恢复计划 (BC/DR)**：审计灾备架构的合理性，并定期组织实战演练，验证其在真实故障场景下的有效性。
- **应用性能瓶颈分析**：结合云监控指标（如CPU、内存、IO）和应用性能监控（APM）数据，审计并定位影响用户体验的性能瓶颈。

#### **4.4. 成本审计 (FinOps)**
- **资源分配与利用率优化**：审计是否存在“僵尸资源”（已创建但未使用）或“过度配置”的资源，并推动优化。
- **预算跟踪与成本归因分析**：审计成本管理工具是否能提供清晰的成本视图，并将费用分摊到具体的成本中心。
- **购买策略评估**：审计预留实例（RI）、节省计划（SP）等长期购买承诺的覆盖率和利用率，评估其投资回报。

---

### **第5章 审计指标与基线建设**

有效的审计需要量化，将模糊的安全感转化为可度量的指标。

#### **5.1. 构建结果导向的KPI体系**
审计报告不应仅仅是问题的罗列，更应是价值的体现。为此，需要将技术指标转化为管理层能理解的业务价值指标。

| 指标类别 | 技术指标示例 | 业务价值KPI示例 |
| :--- | :--- | :--- |
| **安全态势** | 未修复的高危漏洞数量 | 关键业务系统的风险暴露窗口（天） |
| **威胁响应** | 平均威胁检测时间 (MTTD) | 平均业务中断恢复时间 (MTTR) |
| **合规水平** | 安全基线配置符合率 (%) | 通过关键合规审计的首次通过率 (%) |
| **成本效益** | 闲置资源比例 (%) | 每笔交易的IT成本 / 每月活跃用户的云成本 |

#### **5.2. 建立与维护安全基线**
安全基线是配置审计的“标尺”。
1.  **采纳行业标准**：以**CIS Benchmarks**或**DISA STIGs**为基础，结合企业自身风险偏好，定制化形成企业自己的云安全配置基线。
2.  **基线的自动化扫描与漂移检测**：利用CSPM工具，对所有云资源进行**持续的基线符合性扫描**。任何偏离基线的配置（即“配置漂移”）都应能被实时发现并产生告警，形成闭环整改。

#### **5.3. CSA持续审计指标目录的应用**
为了加速指标体系的建设，强烈推荐使用**CSA发布的《持续审计指标目录》**。该目录提供了34个标准化的安全指标，并将其映射到CSA CCM的控制项。企业可以直接采纳或基于此进行调整，快速建立一套与行业标准对齐的、可自动化的审计指标库。

---

### **第6章 自动化与AI赋能的未来审计**

手动审计在云时代已不可行。未来属于自动化和智能化。

> **图注**：一个动态的流程循环图，展示了从数据摄入（日志、配置、API调用）、AI/ML分析（异常检测、风险预测）、实时洞察（风险告警、合规记分卡）到自动响应（创建工单、触发修复）的闭环过程，体现了持续反馈和智能驱动的特点。

#### **6.1. 云审计自动化的演进**
- **脚本化审计**：早期通过编写自定义脚本来检查特定配置，灵活但难以维护和扩展。
- **平台化审计**：
    - **云安全配置管理 (CSPM)**：专注于发现云基础设施（IaaS/PaaS）的错误配置、合规性风险和安全漏洞。是配置审计的核心工具。
    - **云原生应用保护平台 (CNAPP)**：整合了CSPM、CWPP（云工作负载保护平台）、CIEM（云基础设施授权管理）等多种能力，提供了从开发到运行时的统一安全视图，代表了云安全审计的未来方向。

#### **6.2. AI在云审计中的应用**
人工智能正在将云审计从“事后发现”推向“事前预测”和“事中阻断”。
- **智能威胁检测**：基于机器学习算法，分析海量日志和行为数据，识别出传统基于规则的系统无法发现的、未知的攻击模式和内部威胁。
- **预测性风险评估**：通过分析配置数据、网络拓扑和权限关系，AI可以模拟攻击路径，预测最可能被利用的漏洞组合，帮助审计师和安全团队“像攻击者一样思考”，提前封堵风险。
- **自动化证据收集与分析**：利用自然语言处理（NLP）技术，AI可以快速从非结构化的证据（如合同文本、策略文档、访谈记录）中提取关键信息，并与结构化数据进行关联分析，极大提升审计效率。

#### **6.3. 案例研究：AI驱动的持续控制监控 (Continuous Controls Monitoring)**
一家跨国金融机构面临着复杂的监管要求和动态的云环境。通过引入AI驱动的持续控制监控平台，他们实现了以下转变：
- **从定期抽样到全量实时验证**：平台自动、持续地从云环境中收集证据，实时验证数千个安全控制项的有效性，取代了过去每季度一次的手动抽样审计。
- **从被动响应到主动预防**：AI模型能够预测出哪些配置组合可能导致合规风险，并在风险实际发生前发出预警。
- **实现“审计就绪”状态**：当外部审计师进场时，企业可以随时生成一份实时的、证据充分的合规性报告，审计准备时间从数周缩短到数小时，显著降低了审计成本和业务干扰。

---

### **第7章 审计管控流程与最佳实践**

技术和工具需要与稳健的流程相结合才能发挥最大效用。

#### **7.1. 构建审计闭环管理流程 (PDCA)**
1.  **计划 (Plan)**：基于风险评估结果，制定年度/季度云审计计划，明确审计目标、范围、资源和时间表。
2.  **执行 (Do)**：开展审计工作，利用自动化工具收集证据，进行访谈和穿行测试。
3.  **检查 (Check)**：分析审计发现，评估风险等级，撰写审计报告，并与相关负责人进行充分沟通。
4.  **行动 (Act)**：与业务和技术团队共同制定整改计划，并**持续跟踪风险整改的进展和最终效果**，确保问题被根除，而非暂时掩盖。

#### **7.2. 审计团队的角色与职责**
云审计的成功需要跨部门协作。内部审计团队应作为独立的监督者和顾问，与IT、安全、开发（DevOps）和业务部门紧密合作，形成合力。审计师需要不断提升云技术知识，理解IaC、容器、Serverless等新技术的风险。

#### **7.3. 审计报告与沟通**
审计报告应“因人而异”：
- **面向技术团队的报告**：应包含详细的技术细节、风险复现步骤和具体的修复建议代码片段。
- **面向管理层的报告**：应聚焦于业务影响、风险敞口、资源投入和投资回报，使用可视化的仪表板和趋势图，将技术风险转化为商业语言。

#### **7.4. 最佳实践清单**
- **高层支持**：确保云审计工作获得管理层的理解和支持。
- **技能提升**：持续投资于审计团队的云技术和安全培训。
- **拥抱自动化**：将自动化作为云审计的核心战略，而非辅助手段。
- **建立伙伴关系**：与被审计部门建立建设性的伙伴关系，共同解决问题。
- **从小处着手，快速迭代**：不要试图一次性审计所有内容。从风险最高的应用开始，逐步扩大覆盖范围。

---

### **第8章 结论与展望**

#### **8.1. 核心要点回顾**
企业公有云审计是一个复杂但至关重要的领域。成功的关键在于：
- **采纳全生命周期视角**，将审计嵌入到云应用的每个阶段。
- **建立基于主流框架的统一审计标准**，如NIST CSF, CSA CCM, 和 ISO 27017。
- **从“时间点”审计转向“持续性”保障**，核心是自动化和智能化。
- **审计目标从合规检查升级为价值创造**，为安全、成本、性能和业务韧性提供洞见。

#### **8.2. 未来趋势**
云审计领域仍在快速演进，未来需要关注的新挑战和机遇包括：
- **零信任架构 (Zero Trust Architecture)**：审计的重点将从边界防御转向对每一次访问请求的显式验证。
- **无服务器 (Serverless) 计算**：对函数（FaaS）的权限、依赖项和执行环境进行审计将成为新课题。
- **AI自身的风险**：随着AI在业务中应用加深，对AI模型本身（如数据偏见、对抗性攻击）的审计将变得重要。
- **云原生技术复杂性**：Service Mesh、eBPF等新技术的出现将带来新的审计盲点和挑战。

#### **8.3. 行动倡议**
云审计不是终点，而是一段持续改进的旅程。我们倡议所有企业立即行动，评估自身云审计的成熟度，制定提升计划，并积极拥抱自动化和AI技术。只有这样，才能在享受云带来的敏捷与创新的同时，有效驾驭其伴生的风险，最终实现安全、可信的数字化未来。

---

### **附录**

#### **A. 核心概念信息图**

**信息图 1: 云应用审计生命周期**
- **标题**: 云应用审计生命周期
- **类型**: 环形生命周期图
- **核心内容**: 一个由四个主要阶段组成的环形流程图，展示了云审计的持续性。
    1.  **阶段1: 选型与采购**: 图标包括“尽职调查”（放大镜下的建筑）和“SLA合同”（带对勾的文件）。关键活动: *CSP风险评估, 合同审查*。
    2.  **阶段2: 部署与配置**: 图标包括“安全基线”（清单）和“IAM”（带钥匙的用户）。关键活动: *配置验证, IAM审计*。
    3.  **阶段3: 运营与监控**: 图标包括“持续监控”（带图表的仪表盘）和“事件响应”（警报器）。关键活动: *威胁检测, 性能审计*。
    4.  **阶段4: 终止与退出**: 图标包括“数据迁移”（服务器到服务器的箭头）和“数据删除”（碎纸机）。关键活动: *数据可移植性, 安全退役*。
    - 圆环中心包含文字: **“持续保障与改进”**。
- **视觉风格**: 现代、简洁，使用企业蓝、灰色调，并用绿色作为高亮和对勾的强调色。图标应简约且易于理解。

![Cloud Audit Lifecycle](https://r2.flowith.net/files/png/N7DPM-cloud_audit_lifecycle_infographic_index_0@1536x1024.png)

**信息图 2: 统一的云审计框架**
- **标题**: 统一的云审计框架
- **类型**: 中心辐射图
- **核心内容**:
    - **中心**: 一个中心圆，标有“**企业审计目标：安全、合规、成本、性能**”。
    - **分支**: 三个主要分支连接到中心，每个代表一个关键标准。
        - **分支1 (NIST CSF 2.0)**: 标签为“**风险管理结构**”。它有五个子节点：*治理、识别、保护、检测、响应、恢复*。
        - **分支2 (CSA CCM v4)**: 标签为“**云原生控制**”。它显示其关键域的图标，如*IAM、数据安全、网络安全*。一个小文本框注明：“映射197个控制目标”。
        - **分支3 (ISO/IEC 27017)**: 标签为“**责任共担指南**”。它直观地描绘了一个云提供商和客户的分裂图标，箭头指示具体责任。
    - 虚线连接各分支，表示框架之间的**互操作性和映射关系**。
- **视觉风格**: 专业且结构化。每个框架分支使用不同深浅的蓝色。中心枢纽可以是更深、更突出的颜色。使用清晰、简洁的标签和极简图标。

![Integrated Cloud Governance Framework](https://r2.flowith.net/files/png/YDVH7-integrated_cloud_governance_framework_infographic_index_2@1536x1024.png)

**信息图 3: 演进的责任共担模型**
- **标题**: 演进的责任共担模型
- **类型**: 矩阵图
- **核心内容**: 一个阐明不同服务模型下责任的表格。
    - **行**: 服务层级 (例如, *硬件/物理, 基础设施 (网络/存储), 平台 (操作系统/中间件), 应用, 数据与访问, 审计与合规*)。
    - **列**: 云服务模型 (*IaaS, PaaS, SaaS*)。
    - **单元格**: 用颜色代码填充：
        - **蓝色**: **CSP责任** (例如, 所有模型中的硬件)。
        - **绿色**: **客户责任** (例如, 所有模型中的数据与访问)。
        - **蓝/绿渐变**: **共享责任** (例如, PaaS中的平台层)。
    - “审计与合规”行至关重要，显示它在所有模型中都是*共享*责任，强调客户必须审计自己负责的部分。
- **视觉风格**: 干净的网格布局。使用两种鲜明、互补的颜色（例如，深蓝色代表提供商，鲜绿色代表客户）和渐变/条纹图案表示共享区域。字体应高度清晰。

![Cloud Shared Responsibility Model](https://r2.flowith.net/files/png/WM8JJ-cloud_shared_responsibility_model_infographic_index_1@1536x1024.png)

**信息图 4: AI驱动的持续审计引擎**
- **标题**: AI驱动的持续审计引擎
- **类型**: 流程循环图
- **核心内容**: 一个动态的、循环的图表，显示自动化审计的流程。
    1.  **摄入**: 一个标有“**数据摄入**”的漏斗图标。输入显示为更小的图标：*云日志, 配置文件, API调用, 威胁情报源*。
    2.  **分析**: 一个标有“**AI/ML分析引擎**”的中央“大脑”图标。下面列出的关键功能：*异常检测, 预测性风险建模, 合规漂移检测*。
    3.  **报告**: 一个标有“**实时洞察**”的仪表盘图标。输出显示为标注：*优先级风险警报, 合规记分卡, 证据库*。
    4.  **行动**: 一个标有“**自动响应**”的机械臂图标。显示的操作：*创建修复工单, 触发自动修复脚本, 通知利益相关者*。
    - 一个箭头从“行动”循环回到“摄入”，标签为“**持续反馈循环**”。
- **视觉风格**: 科技感强且动态。为AI大脑和数据流使用发光效果。调色板保持一致（蓝、灰），但绿色强调色用于积极成果，如“合规达成”或自动修复。箭头应清晰地引导观众的视线通过循环。

![AI-driven Continuous Automated Audit Loop](https://r2.flowith.net/files/png/0LE29-continuous_automated_audit_loop_index_3@1536x1024.png)

#### **B. 术语表**
- **CSP (Cloud Service Provider)**: 云服务提供商，如AWS, Azure, Google Cloud。
- **CSC (Cloud Service Customer)**: 云服务客户，即使用云服务的企业或个人。
- **NIST CSF**: 美国国家标准与技术研究院网络安全框架。
- **CSA CCM**: 云安全联盟云控制矩阵。
- **ISO 27017**: 为云服务提供信息安全控制实践指南的国际标准。
- **CSPM (Cloud Security Posture Management)**: 云安全配置管理，用于发现和修复云基础设施错误配置的工具。
- **CNAPP (Cloud-Native Application Protection Platform)**: 云原生应用保护平台，整合多种云安全能力的综合性平台。
- **FinOps**: 云财务运营，一种将财务责任引入IT和业务团队的云成本管理实践。
- **SLA (Service Level Agreement)**: 服务等级协议。
- **IaC (Infrastructure as Code)**: 基础设施即代码。
- **IAM (Identity and Access Management)**: 身份与访问管理。

---

### **参考文献**
- infracloud.io: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGbkSTjzgsaW9znqTHLBYqOzEnTmGbO6ph2EM6PXLNBkvAJM61l3ApPLcIEJF_38V8RdR1wrhk9G1uphoEfVA892fDVPrip86jIVK5brvMrtS8CiTCHTBfC2nbtZLjJQ_lt87UoC1Ixr_eRCkxH7fA46HlfchuPI_C5dK-8qsYSgfCxOQPTUauKdAlUfE9nNS9SNQ==
- balbix.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFU8X7SYdjIRGjs2l0l0t1oSy80jvz4Frw75x6_6lHpJQBoq2iypMlSG-i5-op9OXwgJ-C6z6RvgukxpGyC5gP7KUOx7jZZ675ZH62XI3WmPnCGwz4z9DzEKLxslunECeL7-ITfzEPivTIPgRWxVJalvlZGywWVThc=
- paloaltonetworks.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH6xhKXMxja8IIOUHrhQP6_fMPqXBLEau8xCZDU4uBcZ_l9PrTJYHjFbaac4n9csgM6ULT9KQ1CN2AhRQ1QhsUji7fAbGs3t8V5l50a-RmO3o8VmOsRsvKHMplPHdS8Jbh5TkTWDyhZSREu75k_ZoLELymLzKVTvEg9ksFU_A5fj0XYiUGGJA==
- nist.gov: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8IJ8w9CAfvNp1xMXTlTeEeLLk4KcG1PBBJ496Es81JBmZ0W4gwW8-pVWHXKvgYmbY3YlyX1y52rAzHw8MmKgGb6LY7F49lIsWSCG_TJtCeCcTkMw1ubmQldHuBz6c3YnBfu6M952uhYXDD8_W48uqYkw=, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG9el6U_h8XJdWMZMopJXHorA6PD5R0IkE3wbVif0N1aHwn3KMEnZn2k_FxD-C_JJbPBiLeGIYVHmgqn4j2O2EwyRafl2MnzJaTyS5RTURGW1x65kDKhgeIHCRYzX1_HS5jbYaaYeMSIKA1Fl5RLpAuRDYb
- awsstatic.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFDn4EQGI4oiw3dv39a768bmkRVLZej42_Ko8vjnlnmDCgN1itZzmPihGPlXbN6lzMj2ydSPhQI43Gn60G5vyhDKy6iiUoRDfF0GOzEkLLFIH1M7hx-RiWr6GM1EsAWKQ12NzKuRZ9kIrwoDk7AZXGCI3XbbZbhIlNvoZKd9QIVp_JSrIe7FVcPDQilj_yA7g==
- centraleyes.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_Ph7n646P46ULhIJPX5V2nnCu9L2dpDwhBED_JRSXzXZBws9YYZ3ARM0NvVk40Y1-dJpC6JfIHtp4Hl6whpbW4j8Y604Y4XgY__0PYQxBSFrYCq77GSdaRFBkG4oXZdPteat9RntP-vAsnbEbgxgCtbsn7tEtld7aGMVvK5FDMPsr, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgoKUBFGWKLX_NdJGPGpSMa1vKF8Zft65EOojymmOtx42I6RbND8pgmmPnejKgLHk16T3gsXSgroHbQCb4wpQT9i7PmYIv8wzfSDcwzhDeXAw-k-cbCOy9D99vbuAPvlGwgsxuAoCKa3zU6ZZbJUIsIU4rQWMnXbamKKa8JF0RJQeG-ofCBLg9AOmwKyZN8GdANtpkHFx6ZAGug9AAYFQ1QpYu8PD93sK6_A==
- amazon.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNrqKxCIhQsMXphIDT91cpTge5-_TGmlrhJgeV_9rIbi7L6sUguz29DrfOqtzQMQ6dpE6xKaXHYlMW3OOR5akte5nEp8FimsFmI1ft8MdioC8ZelCOLYMtGHRBm8qYftX_m2sPsgtUQ8sTb_treLwPp4_JYlIHYPtuiWtNMJsfX3y0kzW0GOV1cKNWjiL_gQ9N-XTunn7Tm42WVYOsd4J9RpS_zR0KC2NQCRfNH_Z0ROZiEkxNS2U1F1GuaM8=, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYsZ_rUhfKaH2vuxMo1IvsGlUo9t88ACRbGyqBpjqAJimGydHfECpOZyfTO77rNi2xDzQH2l1xHTvEu3jFZmkChXJDTMexbfRsBpcEXaSs98Jea2Rfzgynq_pMEQdJZ9tfqW9Nbu6c3GKSTzrhegvS1-DjKeOcfBe1pFDKEEMRZUcLMPKbBzqxubIQsuGCIcv9t-f-f78rWkKi6BT2JHC7mH7W8smUtunpMNECX5VqfuiLI6nCxzz_LG0zFC7ifRxfau_BJjKAJao5rw==, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF7v09iWZCYROzgdwEU8DUn3iSh-nfzLRlZZ1TvjDSJRF4YPG1qd_vnWdvxQx6S38bcmuP212qFFKMbq9jolR8t_3IJ1YCwnEcLSJIkLIH9J2SLCtJhbNX3wLuYcu5gdAQl5bd4pKEtzIJPI1eUXKwde8RdcqaFmUfqsnZru8t-j9rVtNC1BMU2AUAfiieqP7fcOWIK_SUbp8Pbyg==
- dawgen.global: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQETkJpVYRQwbe78YypcRhnL770Ah6F0PuP2GP5QCXHupU4db8MC4g8WWwDDOmhu1S_Ylvc8mP9CjJ6Y7O3MytW9qSqsSD1LwWyZDnv1jxSoGF_4xLDPA9njrZwrZv9XeJ76JrzqZnoWxIxqsgjjaKSwIl5L_x-IVgmenk9SyhvbH_isxhPMW8bTlR5NNty1
- scribd.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQELAlYA5fP1Cd4DGX7P8j2pkcMitwo-mIsANcQYKcEJAYZgGKvKAHhplUaR-SSoLur_lWQxLYkvq2ZEelaPdFEGXW9aat94I55KU95oZmsn-xuBPV_op0N23jKEBFa4Oi23BQMdp0sIuow410-0t_JP20tkDObt8SQDXXbxp9kfGnY=
- codific.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGXaBt0xehWJPDf3a1gGLTUONZ-8-96Xr_Achhbkr57k67QiuWOfDw77xRgqkabYPi2QwYzbGZ9_qGZLbly95pL7VTvyyFWBScBU50jsZ43vkyux4WLxGKz65Gyo5kcrD-kA3Dbh16N3hPw1TvnCu2dPiThVXhJ9wuReg-rsP_9EMYdx2qPQr-YY48TVgd3w2jCfsoFmpuz1j1MUUI_IxVY
- xmcyber.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGxZSQnDwC2cfaT9tesN5wNOfvPSsiudCWHEXqiQpgxmyUobgMoT_OfWjXoGOGh5Q6GPcJCSz33DGa4Os3sHYg0LTQXrX8sK1OQLCXlloYr7R0g9OAm8KL_vl-vRWXqMm61p2Em_51UxmgCcNvOBFMmr36qb7E9748HLiUsoYI=
- portnox.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEwP8tWRG1G8tVjlBc6yUT3YfOFbRhcVHVLA-irde7c89DtmhEaI5jHp9Ac9EvLKKgFKjO9kqxkYqS3bAgmkHch_VjcOdNq56Awr0l9F7uEyA9nCYJprl7MNOOBmD6722Qpyny0dl1ukpy2VOvnaZ6LCau9Pehao1cCQ==
- continuumgrc.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHIJN01AOM6GwmJaXjVhCoQWpDXxVAJfZvbt6KtvbL6s7Zq_bs7l_rLGbvW1lWkTP3hRN5bOVSfM1qrR_4whYTsP9RrU3uZyGDYUy2pe10jLbsg-SCQTcCWr2A2FranDnTl2y1I8-ZuxGDcVaZh_zLLHNSteZRe7heauXWf2-zU3vIBw1a6m6sI_QwsRsR3zwoVd233g4J5eD71Qw==
- wiz.io: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFvjiEaX1Su73Eai9O23lKaPMKzhg6oiBMNxHw8JPK-s4vFoaL1Kqcn1bSA8dT6RdzIkJaGk4IW7ceJ7PpAOulE0bq7KiiSw3S-FUzt4fm1dKRc1R9KVvRmhSveKM52H7-sVhSBTsAS5m3L60LDHBWQK99b, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFe9qewhjNrVNt2aYADT_2406G-r763BHgziS1JDhws0TFg0coARAE31BldA1xoo4zzcGegRBkrvPdO3exWpnMz0wl49m8LwAxBAE46qP33Po0KbTYB88BLn6YeGDaKe5s0Xa_npZN2Hm6PoNFEhN3I4_g=, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG2NMKkNdwHN3ZW-o61wkTlxKnG5U-_XaNx1EdnziQyVNcmUfSHVlhx1WhN3Kn8ijMbKd23oEetiFs_7Kvtg0YvDhCJh5pSXVSku9FolsJrcv-3sEZJCHdJzqy1tjxTVfEEqPUsdUrDshqt1pJXLQ==
- cybrary.it: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBMw3yG7FLNcJqBNWp486BADQlr7WKeAQaBNdXdZD-57jzvO2iC1FiIS5OWh2vLD5d2bl5LtGRqXIcX848ok0L85PnQP--0J9nFbFnMUm40Kq114rQ0rYmFNzbwstUiOUq31X7_MGdA-kTh_v3QP222ogPEFz2_m5cyKNOkLWA1lkaPMOw5BSVjXhGwBJxan23UMQZ3XvSqc_qHhMbcZkgTSfl
- helpnetsecurity.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEU32OMO97JoKMmLlZ9iJbbvYB5H8ViZLTgyI_82buvD_aSNaowg0pIyX_RR0hvyssTM4vnpxskDl2Uy7VkDSGdGHvcnpeotRJ6j77QMDKXEfIj783HWM0byAWeD7joPjH1rWxEd0BQQ7zZzjfK7I3Xw9YlYgma7RYwDGxLpmsmBZbUfpE3jZD5Yik=
- concentric.ai: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUR16z_PRTLui5-6I3_r7AF9jAs-8hYkCavuUvazhhTvJT6hbo5OgQzyuvJl5cfi362rasafxZ3SILTC0gAFYtg63vb32Vw40C3ptf3augi3qbVvhYTFjVx_ov3rJ2VH0fbuvoTEHBxKDjsS6ACklVzZ3Mq_U-O66nkf7Bq5siukyNpAA=
- tenendo.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFpcIIIXBbn3Yh7C5ImMpkDIQ3b4YGMN4WuppbuCxozAOtyVSSu5USDlRaJ4f8VW5pXnOReoVSrmngTjOLGag-H-EFyY2KMrK92Pa2pG3z15ktSDFfK2ELpBV4cLL8n8M2z3fID4iPTSYWg28MdC_yjEIlzG0mA
- maintenanceworld.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGuDh3hGlpy2E2aBSOVO0j1xUi4KkXdvEoj3XUWgMvUKaEmp4QF-P4_ZTcZdJgOexc8whx0iTJbzXbpo5DwxJ6yoOe5c16n7oMq8jYn3oOYuc_7zNgunIlHpcTsb-NxD4-f6J9g3eyxcr60kDWS-aHwHlHWgQXWEtHxjLZr9CAZy-MbFw25qg1KH6dVGMPYLpnW_1ckRxEriNYOeM522_7IHdWWQvyv7EM=
- abs.org.sg: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGY6aA0WBMzC5IQ9UluxJ8IgvZZG7geMe9YK8Plc5dBCu1u8pJM82M_ZNNG9pBstc_G3Cre58cGW5w9vaYojQt63g6yWvUHUqBxOrFYaxaANSHpXDFRI0dai-ibHj5UtsPyE4KgYKVkwlSdvBicjR02Le_CQj-_yAL2XeJAOUTWx2DFlqnm-g==
- ebf.eu: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHpeSOPmT8NPR4NsoT22ifUhazIO2dkYViJRC_RQDxCma4FnDJk67iBgHS04AX-k_OTwYF8DbllQkIlrBEhzoi_hM5eqr3fNDi9ZaWv4g3VHggwg2r6DR5RcpGR6UKT9yFNX3w5_kLvuJpWM6pxYZHHcGRKOFBeiYZtH8mqQGhV3GrBWoP-97wuXaNV6-O6iVR19w8AM77YGg13ORoCtsHKoDU=
- nao.org.uk: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEmiW18pUIcRt09msjb6s25t_7ER1Q3ZlXoKKNk5HkE5jqpoNwjOxAW7MzHbn_Sm1kPMrt9YC8F9Y9dpiqGwytmTfr0NKkpEaB6MiRBMvbVJbUx7DhrggeFhsSfxzp_JrLZCo4OuTEJNgr1kwTFtVvcJN_VgUQ61Fo4BdPjkwFNgNjMOg3aH5TEYVJJwCq1Yt8tJOZ_rD5VpiLKKpY26ySC_WXYFA==, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGQ8pcwTLH_xFfG83tKok2qPd0_H12hpEu6A5Y9YIAubzV1uaIHgOWy79tipsHTd8FTWo89GCCNXpUkqoipn_uFvc0HMsNiPMPhmyfRXG3aDTBq-R_UEGBv_FzcI-5jNP_DkGPOtsaq1zN53S_GO2Odgs8QWC008LojSu3b8CMYSpiyy9Ixaj0yWRVxskcVwdCOkixkGnMjAVeaig8lWKggYSVufjmTIJXkBQ==
- ucop.edu: https://vertexaisearch.cloudge-google.com/grounding-api-redirect/AUZIYQHJJG7q-plXfjTyrKPXgqVvHsXxtkJ1-HLwAO6ljo6JfJLv1L4kdmWDq6sUYkgkhcSH9bVBMJdw8lxfUM_YuTcStayfJ97ZankP1Oz5-z7xaMMgF4JgPMOL6-ASDPyU4ZIC0szAaFNFY_K7Qi7K2bZmWw_wyKiQHli7osBcb_y8MvKcd9TYjZQAZQ3xFdUC8w9dvtNqcIjcF6ZIeTK8BfVXFnZ_ADa_T1KaNVQ=
- cloudsecurityalliance.org: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEVeOt-1o8lZRh7IDXEwyydHrwBRkRt7ooQ13AmL-QfYTKXN9k7_xxhREWN0n5EAEi1Oh7ziExjm__7OK3LJZ4rzGoJGqwliENl0nXx1Bw1f_OW4YGG4plBFWAS1q2ZeRcGZnSsB2QxLwQV2V0fr9RRXXF-qpcdyaIAsCY=, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHHRryD5R2f-UzTRDiv519CX4nRHix3YWv_0pRKpg0crmCnSCqcppxHTmdS2QZMlAcz5ZIfDYh4KlJjPLgTsWRdN5Wk0yl8OrTyYvHxCE-pFJGHNUC1twdyhIhwloyt6wyROtrBX9MdyUxrkv32khndW8mCbq1n8-MZQDtsnCuzZyNoikaVGWlBTmPcXT0U9diYsfozz86MwApvTIEYd--9XnxRrZqiTGdqCmx823kOfw==, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGTuhuBy1n0ufBBXTnfroNe3UfEV4_WADkQcJ_JrfEJb4ri-lQ5pXb8UbN9PY12RugNhFV2RJX-K9kR5yzRmRBCtaBp5mRx1NTiR_IdxcErVlXMXrVGNrDC8SerWpayOcDKxbXYayzU1OdPBTSps0MGQDjtExWq8kYeS7hx-n6_Rz9ejX5FK5E52DAY91nB0SJb3qEgnTTJu3J4IoXUXe7tt4PM, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnVHv-ZeA5cIpva-7D0ag-WqfrGI7uMvmEsUCU0GfK8sWp5R4pYgVlWIiKjUtlDBV04UTpuo3MooKmjXP1tIJBxB8AtVH2EgZJOsHCXskKIYgtRFXtrw5OQznMLae21j21ofSy-ytsQWxmZ3K1sQHNfSnn3usq_LJUKQH60YtD8c0SRTEHstiFasklsAinsELy9nc-N5M=, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGMgnwZOY819SbHMYwpXyReNrfgLVq2BK9imIXgKJjinNu_TsxKwVu24jJAmMz1KR-VVOuKKAGYSdxJFmuWQdETWbYCHr_3DAvokOCtn6sO00S0ljQxq0bmZkUvGi5Q6NU2jUxwEK54N8DcfAsUP9Q498YMN9v6dnoTl2ArYSKAxVuv2A==, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNa6a4nTzfph0NWOkemYdHvq1jLltAwNeMPqccuTpYqktm2ycXd3riMeMxsTdEZ5p9toMtzFmdLOwPR69qFMvtMy2oy7YHj4pUJIWM55P6_U40yyOgm4uYcEL4QBOSj5b64DsT01-GpAzUazTXi3VkZXG0A7uroq7Q1BavF06JsS1GogQe8p8uZ8YtSA-IVFvIdGiqPIiwAxnyP8J-p3Lpyjn_jpsc0i4OfczbDDGKwZApFqpD, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHPgkfwPRMn5DX6Sw0H-emfh5PBuQKDuvYWTbBN4SkJHI5X_LuIl-WjbKiHwIfPJagl3APIF9YR-HeYE9hN9IDzVwsdtgpQX0h7yfbhkCUEroFK-MTu4g7VHWx6XTIpt7Kla9qaxnDnc5IXWnFxpo_XL19geMNRS-riVPAUeSJ5qrZlan4MoTTNQJ11
- talpoint.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFL3ggpTU-SFq6IEYmtebD4khD4mfn-vQLjZo8uyXvarvb032u_HzHY1ZCH1aRFCZi4dR0fN-WRP647--Ej9M8-2EW-jALMKRZXyba8KTHWjWC83OK47v_41h78GiS9MXF9vhKIFbEE93q
- manageengine.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHOuxvL1A9sdW47HGKLpnKa6zVKOeempWMfWGAPJy3TclBWR2osDkyi5zT53B-wTBN3N2EoI3EZbSTpvyoWkDxM5mYezaKkFQp8XGkrkxUar3dChUi8nsZYh11Mqh9-tswSKaWzwZzaYpZoUrDF-8ejboxTD9uoV35r2Bqd-afTM7-WpGr5Ir3c55g=
- aristiun.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHH30H28paZX3emwFtj3MHs52IwTUCbTUAwVux2JL4QnDGRJg3dlZImpSsJHZkllb-DQsbQASjGHr2pcFGjgmqdmlA7LHFuZpJJ5h6JRjabh8r0STq0J5_vhd2u0KF4vNqIJ_IYTf9hcaYY11aQbV0fsDCjC5eoUZLlLkhV17WPsfLSdKNaDmjFt3xDwGbPVzMO_xj3
- betsol.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHMmXbe6C62m0hYKOdUYWdHFrPbXrGzaN9izSkDL4477A12IqY9gN6UxH8GKLI6NsQA-OqYMQ9jHTNTX6u_6-dG1VxzyGnFPwksBzfDLkjjW7QwiuI9Hq83f3Gvle-Vv6T5oZXAkiyEe-0ZthU_26azahQNahr5Ep-M_0jd3STRlMWd5hmSTMwhAw==
- drata.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGA1jUlSLCvEtVmoPvfl5dHqg1QWpHGo1Se1kRQqwi0xIM5HUzjkwrqcQv_xZoLOsmrNA_6cwAV6-OKBA6RYg-u6xXVFpSbdsztfw067RQ_oHVjv1z42mgO-Q==
- alukos.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGktLOjn0cLBv0qvbmAN8a6DCxlG1stDxwNAMeZWbJWN7mY7qKYWv_S8gcsOFkO9JrXtvyRzDeENUwFOqJuJfPSy-Cxjl_6Upuw8zLAmS-NBD0ok24xlcw0rcy5_3ercPQp7RTmBPE=
- motictech.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFKWKvJ_Q5JHr5rIn7e05dIKNiAzXJVUMVOyi6Z8-PikW7Szkwh-umDWDEHOQC4cHMjE3HM7Ae8lQxcH7ZQdzkIJr3AntFSKKcwN1UdEvqLgG4IIKrt6xxgREMLXsi-u-F5hL9nFq0sEmN02g==
- securitybrief.co.uk: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEi3yUC9b_mDJ97FU0L22qBdeJb0KgXXr_8gKMIzHRvpdkfIz2yqELhIpkkopJnFqoqFqVDrx1hFXV6vFH2I1s6XMkvfPCWOIiR_pW71BcJOS_hz2ZRBmann_xUFrtKP2SbmRpuNy3-inEoMwtNCtFMqX-mcEu_fmafzjby7CTt4QMfeRVMcb5grU666itCu6CqarHDW9L8XSum6rQClQ==
- ducarainfo.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-C59Z4GOozR_UeoZyesEMj2IdUqKRMNvVx6l_H-Sz4PZSxVajro262169JLb4pW-3k0cJFajL-mzbIo5MsySDxQM7AkLhVQ-93kkMPqRrV_T6PEw30UGHCPOIj_vSXR6MifWCZH-hXIH9rO_cKWeHxsBpnHq3DfKW1h1p8Ci6QZe_zwMpdkMTuc8IgbruW9Qb5ys=
- linfordco.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHTDb_CH3b4g8BzJiGmbNp47YMsgCI8ZsfnTZkB-6QZo9X1IQocL6icyloB41sVIEGxExeDG_i4a_ppuGvk5Fn0Z5N-vBYAGQPeYY_IQwvKGZZEQTo0DffsQfmuoVFKeiVCMSr6kl4FDLBMUKZKO8PP
- anskaffelser.no: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFZTkaNUxOUWMB1cfqhPN-qit9lTxk8qZEJ1HdQbvfyUtwiuglEnasOoXZ1iaYwkGdZvBxdSqJIaW3eFqDpZJml93zRpFqDkaPBDe7sU3SQtrYwOijt-OUi2wJMo6X-SGG68GG78w_zsCS-WAa-3wYmk10-WIYGXQx5fptGEzT4LAidoWPMII2-Fg==
- strongdm.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH68kMKNWysMts8XyIhSYXpAO7SF7kigewHL1mRKIHf5SNtoIgfcb4o7U6phIzgMMNLFHLKjiZxvtwmYxCFn_Jod02yF_DVEYbUZTMYs81VYhFadap3E0doNzRK0aYR74BnQrEGzxZE9stNpYPWwCmVCQ==
- regscale.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEroSL5UmWU0kEwwj2bVxTthC6ONcKEdSLIQTHgCZ5in0K-StC88JYE4Pi3PSh8-7vby8_2ByMFG7vUe_K1-enE0nGxCWRJoN620rohIFA--rwrttOrvA-sHjI636K5ufODaPbSyM2W4VtC2vvi6hMSNwK53BmZcYk1OmWw, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH0WiTqU0tb3ZLu-fuNfA7upCnxqAWMGzTTF74YnCeToEyun2AsfcDACtK9XRcWaa7EFRhdtZXT2N8fDBCFGk6VmV_8Gfh5qhp7a6-DmAyzfZsxzhCVWMs6LFJC0n84dtNZmbPOfAJzNyZISgni96e2vBnVngiVoeqcvMRdkAkhPxIWrCrc8GadNHToUVyBugge9mqn1bZ_Ch5fR932AzNSrCtgMmQAA5dNfdMuvMft0En4
- microsoft.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgnSPG7jwNwLQ4OrwyIaJChHYKYZ-KnNb8bYfSvTlJkgAAtJGVzjNbPCe7krmPJk8OAUKnEB4BD5ZUP9qXPMOfKkDA-ZuPlxpYssen-8iMpRwm4D30nEEoU78H1F1KOev5Bw6uddD8O5AKnAa8Fyve1spXkqs0klnWHJGvXZBNhyMoYds=, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-uawKOQ_klNHaHI9IIqBrjk7mgPI1o96x14R-NM6GIFXH8wTlKh5az8zQu2T4THSScvWhB-Q7aofgy6XajTC7DN8QDJrksdsNHntBTdOOrrUk7nhtxuakrcW6Ad5qSx70xm-00OzZ1g8LM5gGEKID9q-nj4BWniDad27Wq2KGQqTZ3HoFWZjN, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHpOzxZ7cyDyZ5ONF4uqCHzbmm4LyTB35hS26OlzZjouyxD23R_9BuShePBjPB4pVmfMXj-YHuvAOPHdkloPBUfY3iYS6I5ouu_WVcfcrQb4C85FUR4eFy_yM1-oXSqGhG1hMlS6wd5HwZiD2ZkxOgUDHB897tLz0vNibY3JD4CJA_IFQ==
- google.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHC6mXFsTktlmmCH5BP-SzP_H5XG0OCYlT7Cthh62MdUozh7yiZAmBXET3obyLLtawMe_SYUovuIF0GKrSzW6IN_YOQN9qAIWq0ty4PEkmKnafpkLj0h6MjaruR9riGdo2llGkto9dsmlLyQzoBxASd
- nqa.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHPS3kehID5iRj5qZzIKlb4YOvHRujhB62JceipVyxKy6SYl-kbuMFOeURb5-fF8OSmwb6GM9YlPAoYd3vUUx284s85FsYuB8J_ZGBHj0THyQREi1fSflyPH1iQUWUXFzbZkGl1DF4E8vWkVLXRFD7zXGLiB3o=
- sprinto.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESeN7rDYpyGFzknx2O92koqpg5WK-KgXToHw0jIE84bYuuLNAWRvN6pxtjlM_z1v6JN9YMg7J3GF3aj_x6NfxCaoMlT3ZE3SFEuI26cXhFRHE4lEF458E46znBkac=
- sgs.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH1d-unF1Hphmk2fvh02bhieig1rZ_XyAd4cpmqM1Rt-zLyxg7CKXD0SuYuIwJQkvXXkSyhhT1FnHyqM7f0ujK7MElf97cVhpfVSJSJ0Dd8qLakAbcivqslU4tX-b3M827lri5sY_ptvKUYZN38RGY8wpRLcVeJaZrFHS_-QnHW6YGM3SivtTBFaTXb0F2Wr-ca__2DvQm2aP9Nwsrr, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGGOKNJrKWCr75n2MSdEfMU7Hz0GttSsZM1jlbP1_mL2rr_EW7aPU5-AhqFvHx7YFBgk9z_itwRAE9s8aIdNu6rMJ_JytzZKPHtzw3J7vFB7AScLoulgt65XMzbqkoMRDHVwU9cokjQn43_IJf-nHSTn952C5Ky3C98L6ot0jOzJK5XYPb0WLXtklfP3aNL9Nr1UfC_pA_PnPz8O4eHje1n
- isms.online: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQ5us9PqhDwFMvcUiNry2gDwJyRSgYQS-SdXhgUtCBKrExyLN_12WW1KYt0lfveyaE-gYCumG0NInJi84v9686wDDvcQkXodkG5vHOrgwzI_QSWcPILcDJrDxuvQ==
- itgovernance.co.uk: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEC9-RLxtfKu-X-aoU1rBNXfZy1CoHg6nsFVKS9qHx2yTZ5OOimall0tx8HwEJOA-3KmYzpimhx9KNxu_2_vlp-ojRldyHy2-NBA82fiWL1MsmOLjdDXiiUBH8qntmlJnqo-XBT1Nf_T6YiAQ-XB9n4
- tuvsud.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHQBV6mlSxH6O92S1_hfR-7rJSLiY-dlrBvTqoKeZZUFgPhq_7rcUcVIqs2qBNFK25lLc1yV9uWkreyAgee427x7TGeGf1zr8GL92JHtMTbpQQqgvKpJnCK0-41FxpIAg41aPV3lVOA1oebnGhaYpX7UrDzhjTVK2qVhRshOAD7JrBqA0fXatZjmhzHoqnp_LdcjMhkNoiforOImdNpWCsAhW_UHfYbspch3D-DdScj0yqYdg==
- oboloo.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGNKPEjkV1THGfX3JT47-Pyx8pQ1a-We-E_NfBkNboSzaSmY0jDPVThKynmd2o7Mv1jJojWlcmS5VfVhw49Z-OsvrnCmCUoM2WBDKE33gUsxts2mrEx-TmZc88bgzbT95BaqysCO-VfDt70GbQmII6Wwlc_vj3U_lJEUpne3hgz1zgCryUwyR8M
- trustcloud.ai: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGZEvZgfQM4LJxaIUyL0T3Ff-J_fbODiR0_FPrATAMTSL7jer708hRMZxCBCu2LynmyztuehcMvwNW4NklLMTEhHqT5Vdq7Co5OINCV_-vpO6dS8xGz_DYkEOKwEoQfwhUlRlnyho-BZWJSn-Lopf1UTlQnuzuwNFH_0Ebliwcrt80pCLZ-2-2Mu2nTId7W0AmV0N6Z4zFwBms=
- hcltech.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFyA7w-MHKFGlkJ0FaKPQL_8zGs5koklYtPTK-KcOK-aL6qHTyLhxk0UnXbOA7xq-vQJtNya5GWTCKZ5ASaxQW8kczqiUTGtDRb3Z1Si1pbC-WgahHs2eNou4M_Pb7AFz7huprt-3dSI67rl9oGGkZFUw7zUujnfz7Ts4r3BaNCE_2z3n4yC9KGaJ-92C28J68j5M=
- legitsecurity.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjVAAPujld79ygjznER_0TQSrmUo95TTcoZO_stC1OO7_jrkJ06eEAP3q4A_P7Jl3PPQFXeo_34vBRy0NOxYwRsmM9nCmZNDNa01H1yXLpZmIlRcItw2uuqwSAaXgLRzfTOgFtJ6_2Tjb5Vin7ScRwkL_8Qls0QuuQ0NlUUHD-8_Mf21Gsyj4Nftw=
- smartdev.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFBXhN2-8plGyAMCPN7s70RQIb8QUq1v5Ea6H4v-f2sLIFnohy2KKlIRFRyREE2OloE2xYXWUUDKslNw1tjdLg9HIsKa2b1ug_lT09vo5dxT7Ot8Po8s4p9dr1DvorNTiPJRwLdaK8=
- markovate.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0OKUkURf2RAbyP6EY8w6aZvGgGmVvE0yZ5t5LQK7sGDO974rNadM3_5vodkwWJjzge43Ew7-TgP1Uq3s98TNuoEBLyjN3WK34IsakaC3t7JXxHQSpTAXEU95uSsfNb6WWX0jZeMAjaE83
- upv.es: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_K9XFrmje6T6z7FozaeV8yVmHjpvcJErNploKjtFquaEr5ktcJ8iJETG_uwDsaYfMUeJEqLQ7GT_pzXH3Zne14LbS3QPnQ15hbGsvElc8El2oopiOkhs0CAQSrJwlg-vLQMNb-_5V1tHXXVh4VsKLhWnr7-a4bip5AGOVSx4Ssjp38Ww6RuUOqh4iaAQuEafOInLkWM7B2xXGi8jjR1Ne5A==
- qohash.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDfQXlGbhtYqt5JhNAH7MYQo_PocXW_OqMlx77NsIB_k1ANvLWHR9Slv7yOUXAiivgWsbpb1MibrEM3jmi1SsNd6it-_BzSn99VuNWq9PumrzKweEUbe4IoudIDS5_167isYEVxg==
- youtube.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEIkKg6_8qqc-TN5ZsZ2EQfWlXirV22-TFf4BRQ6C4gyV32QUWU9qqIWuqOjlbv5bUhbR_xFceuhVnkc1EeaisbJzcBxLlNbE090rxq7j3ZYQblnemvtAkNPBoOoiWSBpAlvW21TqI=
- qualysec.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfu0_FskqkqF4NE_aRhgx4lYWbwbWsDHPjUwiKVrnOn8jlg9-pXiJHnSJnQC_qx_1YTNHTfN7hi0xQwuP1CZD-wiLnkGpSnX8YYVNWAHMXpbxlFcP6kY3WrTwQzvTdgfSkwCc=, https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbQDpgFu1NoEwIsUxF0OnShRB0kiHfwNe-5GZmWwJLG3lBZePuxnJ-penB1mKhLdDiblhINtyVEFfXHoctQJvZOHStYBFMlRUsBXgoTfip1L3q5LLiVXvTBu0=
- neumetric.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEKR967RbFlmERBCmZFgeW2YWAK9EVLjvjlj-36H0bnYKO-urcAKUZ9Qep3hSVsDxZcyjIU-mQTKDza_DBwBQTncVRSaJqBbUErSYJ11-wc2E9BZxdfsW_E6JTcNGbd6oEM4h9lBY2_5OpWFUrGoHgqK5S0q24ST1szjucHuiMky5GIJPXbt9IHEVaM8clLyCmg2w==
- hicomply.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF2iNblaRV_il9k-3rhlQ44jKLFemmmHQ8TURHPLvH5TcAvhEyOwvYv0nu1nnunsEexVE5518F_B0qnE5pFnbsm_lh_FPWAy_gUoxWTx1j-z1z7trxNlIYqC8jWX9hhHXUPSlxqqA464ERQ
- ocd-tech.com: https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHkGoixQNVcF9k4d2xE_YT1WvlILyPCLc6ZTu9vkyBIJsi5Hzdn0ygzrVlai5kRj57ftHGa-gIoS681mS2VME1UdYdWdNK1wDPb3HB2C47jlkVMsGAQ5ThQXT1xmckREvXSaafVsnTQdZ4F3mEu40Fk94W9RHHWXWgNvs5ZwUcKjN8_AyP0DzQQnrlIw-e2y8lqgPoVpTUPtT1hUTMGMn8wuxOj