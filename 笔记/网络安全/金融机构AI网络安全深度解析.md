

# **组织中的人工智能：变革金融机构的网络安全 (2025-2026 战略深度报告)**

## **执行摘要：从被动防御到自主免疫系统的范式转变**

2025财年标志着全球金融服务行业网络安全架构的一个关键转折点。随着数字交易在金融格局中占据绝对主导地位，人工智能（AI）与网络安全的融合已不再仅仅是技术升级，而是演变为一场关乎“国家经济安全”的战略重构。正如即将于2026年出版的《Artificial Intelligence in Organizations: Transformative Technologies, Applications, and Impacts》第一卷第四章所详述，金融机构正经历从基于规则的静态防御向动态、代理式（Agentic）和自愈合架构的根本性转变 \[User Query\]。

这一转变的紧迫性体现在行业巨头的资本配置上。摩根大通（JPMorgan Chase）宣布的为期十年、总额达1.5万亿美元的“安全与弹性倡议”，标志着网络安全已超越IT后台职能，成为核心业务韧性的基石 1。在这一背景下，人工智能的角色已从辅助分析工具演变为防御体系的中枢神经系统。然而，这种技术跃迁并非没有代价。随着“代理式AI”（Agentic AI）——即具备自主推理和执行能力的系统——的兴起，防御者与攻击者之间的对抗已升级为机器速度的博弈。攻击者正在武器化同样的AI工具，实施能够绕过传统行为分析的自动化攻击链 3。

本报告基于深入的技术基准测试、企业披露和前沿学术研究，提供了一份关于AI如何重塑金融网络安全的详尽分析。报告深入探讨了从底层算法选择（如梯度提升框架的延迟优化）到宏观架构转型（如无服务器机器学习管道和主机AI加速）的各个层面。同时，我们也将审视在量子计算阴影逼近和欧盟《AI法案》等监管收紧的背景下，金融机构如何平衡创新速度与合规风险 5。

---

## **1\. 算法核心：金融防御中的高级机器学习演进**

现代金融网络安全的有效性，在很大程度上取决于机器学习算法的选择与优化。在2025年的技术实践中，行业已超越了基础的逻辑回归，转向专为处理高频、不平衡和高维金融数据而设计的复杂集成方法和深度学习架构。这种演进不仅是对准确性的追求，更是对实时性与资源效率的极端优化。

### **1.1 梯度提升框架（GBDT）的深度比较与战略选择**

在结构化交易数据的欺诈检测领域，梯度提升决策树（GBDT）依然是主力军。然而，金融机构在LightGBM、XGBoost和CatBoost之间的选择，并非基于单一指标，而是取决于特定的运营需求，如延迟敏感度、稳定性以及特征的复杂性。

#### **1.1.1 LightGBM：高频交易中的延迟霸主**

在高频交易（HFT）和实时支付处理场景中，微秒级的延迟差异可能意味着数百万美元的损失。基于模拟高频环境的研究表明，LightGBM在延迟控制方面目前占据显著优势 7。

* **技术机制：** LightGBM采用基于直方图的算法和带有深度限制的叶子生长策略（leaf-wise）。与维护平衡树的层级生长策略不同，叶子生长策略选择损失减少最大的叶子进行分裂。  
* **运营影响：** 这种机制使得在包含数千万样本的数据集上，LightGBM的训练速度比XGBoost快6到10倍，并将单次推理延迟降低了约30% 7。  
* **资源效率：** 它比XGBoost消耗的内存少约20%，这使其非常适合部署在内存受限的边缘环境或成本优化的云实例中，为大规模实时监控提供了经济可行的方案 7。

#### **1.1.2 CatBoost：高基数特征的稳定性之选**

金融数据集通常充斥着高基数（High-Cardinality）的分类特征，例如商户ID、IP地址、设备指纹等，这些变量可能拥有数千甚至数百万个唯一值。

* **技术机制：** CatBoost通过有序目标编码（Ordered Target Encoding）在处理过程中原生处理分类特征，避免了如独热编码（One-Hot Encoding）那样导致特征空间维度爆炸的预处理步骤。  
* **性能表现：** 实证基准测试显示，在富含分类特征的数据集中，CatBoost能将AUC（曲线下面积）提升2-3个百分点。更重要的是，它表现出更窄的四分位距，这意味着在面对数据漂移时，模型具有卓越的稳定性和鲁棒性 7。对于不仅追求准确率，更看重模型在不同时间段表现一致性的风险管理部门而言，CatBoost是首选。

#### **1.1.3 XGBoost：通用的基准与集成组件**

尽管在训练速度上略逊于LightGBM，在原生分类处理上不如CatBoost，但XGBoost凭借其成熟的生态系统和强大的正则化参数（L1/L2），在处理较小或噪声较大的数据集时，依然能有效控制过拟合。

* **当前地位：** 它经常被用作基准模型，或作为堆叠集成（Stacking Ensembles）中的关键组件，利用其特定的偏差-方差权衡特性来补充其他模型 8。

**表 1：2025年欺诈检测中主流GBDT框架的基准比较**

| 指标 | LightGBM | CatBoost | XGBoost |
| :---- | :---- | :---- | :---- |
| **推理延迟** | **最低** (比XGBoost快约30%) 7 | 中等 | 中等至偏高 |
| **训练速度** | **最快** (基于直方图) | 中等 | 较慢 (预排序) |
| **分类特征处理** | 需要预处理 | **原生且卓越** (有序目标编码) | 需要预处理 |
| **内存占用** | **低** (比XGBoost少20%) | 高 | 中等 |
| **稳定性 (AUC)** | 高 | **极高** (窄四分位距) 7 | 高 |
| **最佳应用场景** | 实时支付、高频交易 | 商户/设备指纹分析 | 通用场景 / 模型堆叠 |

### **1.2 深度学习与图神经网络（GNNs）**

虽然GBDT在表格数据上表现出色，但对于非结构化数据（如文本日志、语音生物识别）以及复杂的实体关系映射，深度学习已成为不可或缺的工具。

#### **1.2.1 图嵌入与实体解析**

Capital One在利用图机器学习（Graph ML）解决实体解析挑战方面处于行业前沿。金融交易图本质上是高维且稀疏的，传统的机器学习方法难以捕捉其中的隐性联系。

* **技术突破：** 通过学习“嵌入（Embeddings）”——即节点（客户/商户）的紧凑向量表示——银行能够捕捉潜在关系。例如，当一个虚拟卡号（VCN）绑定到特定商户时，即使商户名称在不同支付处理器中存在差异，系统也能通过向量空间中的距离计算验证其身份 9。  
* **时间动力学分析：** 对这些嵌入随时间变化的“余弦偏移（Cosine Shift）”进行研究，使银行能够可视化商户行为的演变。例如，在疫情期间，企业之间的相似性从地理位置共存（如同一购物中心的商店）转变为服务类型的相似性（如在线流媒体服务）。这种模式只有通过时间图分析才能被检测到，从而帮助模型适应宏观经济环境的变化，避免误判 10。

### **1.3 解决类别不平衡的系统性挑战**

欺诈检测面临的一个普遍挑战是极端的类别不平衡；欺诈交易往往仅占总交易量的0.17%甚至更少 11。在如此偏斜的数据上训练模型会导致分类器偏向多数类（合法交易），从而产生高准确率但低召回率（漏报欺诈）的假象。

#### **1.3.1 高级重采样技术**

* **SMOTE（合成少数类过采样技术）：** 在2024-2025年的基准测试中，SMOTE的表现持续优于随机欠采样（RUS）或Tomek links等策略。SMOTE通过在特征空间中生成少数类的合成样本，而非简单的复制，丰富了决策边界的信息。  
* **性能指标：** 研究表明，应用SMOTE可以将银行交易数据集上的F1分数提高37%至91% 12。  
* **精确率与召回率的权衡：** 虽然SMOTE显著提高了召回率（捕捉更多欺诈），但往往会降低精确率（增加误报） 11。这迫使金融机构必须构建“人在回路中”（Human-in-the-Loop, HITL）的架构，或引入二级筛选层，以管理误报带来的运营成本。

#### **1.3.2 堆叠集成架构（Stacking Ensemble）**

为了减轻单个模型的弱点，机构正在采用“堆叠”架构。一个元模型（通常是逻辑回归）学习如何最佳地结合基础学习器（如随机森林、SVM、XGBoost、CatBoost）的预测结果。

* **结果：** 最新的堆叠集成实施方案已达到高达88.14%的F1分数，显著优于单一模型方法 8。这种鲁棒性对于防御“零日”欺诈攻击至关重要，因为某一种模型可能无法检测到的新型模式，可能会被另一种模型捕捉到。

---

## **2\. 架构转型：构建AI原生银行的基础设施**

上述算法的部署不仅是代码层面的工作，更要求对银行基础设施进行根本性的重新思考。敏捷的AI应用与僵化的传统主机（Mainframe）之间的摩擦，构成了本十年架构转型的核心张力。

### **2.1 突破“主机障碍”与边车模式（Sidecar Patterns）**

尽管云计算备受推崇，但由于无与伦比的可靠性，主机（如IBM Z系列）仍然处理着绝大多数信用卡交易。然而，将基于Python的现代AI模型与基于COBOL的交易处理系统集成，是一项非凡的挑战。

#### **2.1.1 延迟挑战**

传统上，进行欺诈检查意味着将交易数据从主机发送到分布式系统（云端或边车服务器），等待推理结果，然后再返回主机。这种往返传输引入的延迟，对于现代即时支付的服务水平协议（SLA）而言是不可接受的 13。

#### **2.1.2 芯片级AI加速**

为了解决这一问题，硬件创新如IBM Telum处理器（引入于z16，增强于z17）将AI加速器直接集成在主机硅片上。

* **战略优势：** 这允许银行在交易处理窗口期*内*运行复杂的深度学习模型，而无需承受网络延迟的惩罚。它实现了“交易中”评分，而非事后分析 13。  
* **行业影响：** Celent估计，如果全行业广泛采用芯片级AI评分，通过实时拦截复杂的欺诈向量，每年可为行业节省1900亿美元的欺诈损失 14。

### **2.2 大规模无服务器机器学习（Serverless ML）**

Capital One积极推行“无服务器优先”（Serverless First）战略，将其机器学习工作负载从管理的持久集群迁移到事件驱动架构（如AWS Lambda）。

#### **2.2.1 运营驱动力**

主要驱动力在于管理Kubernetes集群的运营负担，特别是对于具有“突发性”流量模式的模型——例如登录异常检测模型。这些模型在高峰使用期间必须瞬间扩展，但在闲置时却会产生高昂的基础设施成本 15。

#### **2.2.2 克服技术约束**

无服务器函数具有严格的限制（如内存、执行时间）。Capital One的工程团队设计了创新的解决方案来规避这些限制：

* **分层架构（Layering）：** 使用AWS Lambda层单独加载庞大的ML库（NumPy, Pandas, Scikit-learn），保持函数代码的轻量化 15。  
* **数据采样：** 对训练数据进行下采样，以适应临时存储限制，同时确保模型准确性没有统计学上的显著损失 15。  
* **异步推理：** 对于执行时间超过15分钟限制的模型，通过异步队列将请求与处理解耦 15。这种架构不仅降低了成本，还赋予了银行在面对流量激增时近乎无限的弹性。

### **2.3 云原生集成与遗留技术债务**

转型并非一帆风顺。“数据孤岛”仍然是最大的阻碍。合规数据、交易日志和客户档案往往驻留在格式不兼容的异构系统中。

* **集成成本：** 开发自定义集成层以连接现代AI API与遗留数据库，可能会使项目时间表延长25-40% 16。  
* **测试严谨性：** 将主机级的测试原则（不可变日志、校验和验证）应用于AI管道已成为标准实践，以确保非确定性的AI模型不会破坏作为“黄金数据源”的金融分类账的完整性 17。

---

## **3\. 代理式AI（Agentic AI）范式转变**

展望2026年，行业正在从“预测性AI”（将交易分类为欺诈）向“代理式AI”（自主调查、遏制和补救威胁的系统）演进。

### **3.1 定义网络安全中的代理式AI**

代理式AI是指具备自主决策和目标导向行为能力的系统。与回答查询的聊天机器人不同，代理式AI可以接收高层指令——例如“保护边界免受检测到的APT攻击”——并独立制定计划、执行工具，并根据对手的反应进行调整 3。

**表 2：网络防御中AI的演进**

| 特征 | 传统AI (2015-2020) | 生成式AI (2022-2024) | 代理式AI (2025+) |
| :---- | :---- | :---- | :---- |
| **主要功能** | 分类 / 异常检测 | 内容生成 / 摘要 | 自主行动 / 编排 |
| **人类角色** | 分析师调查警报 | 副驾驶协助分析师 | 监督者 / 治理 |
| **响应时间** | 分钟至小时 (人类速度) | 秒 (助手速度) | 毫秒 (机器速度) |
| **适应性** | 低 (需重新训练) | 中 (上下文窗口) | 高 (持续学习) |

### **3.2 防御性应用案例**

#### **3.2.1 自主安全运营中心（SOC）**

安全运营中心（SOC）正被警报疲劳所淹没。代理式AI可以充当“数字内部员工”，自主分流一级和二级警报。

* **机制：** 当检测到异常时，代理启动调查：查询日志、关联跨端点事件，甚至隔离受损设备——所有这些都在人类分析师打开工单之前完成 19。  
* **生产力：** 早期实施表明，在合规和调查任务中，生产力可能提高20倍 20。

#### **3.2.2 多代理编排（Multi-Agent Orchestration）**

复杂的架构采用“代理小队（Squads）”。一个代理专门负责网络流量分析，另一个负责端点取证，第三个负责监管合规检查。一个“编排代理”综合各方发现，做出整体决策 21。这模仿了人类专家团队的协作，但在机器速度下运行。

### **3.3 对抗性威胁：武器化的代理**

代理式AI的兴起是一把双刃剑。威胁行为者正在部署“攻击性AI代理”，这些代理能够：

* **自动化侦察：** 扫描网络漏洞并在无需人类指导的情况下智能选择攻击链。  
* **适应性：** 如果防御措施阻断了某条攻击路径，攻击代理可以自主转向替代技术，形成机器对机器的空战 4。  
* **欺诈即服务（Fraud-as-a-Service）：** 欺诈的工业化现在包括“代理式欺诈”，即自主机器人大规模执行复杂的社会工程学或账户接管工作流 22。

---

## **4\. 战略案例研究：行业巨头的实践**

主要金融机构在实施这些技术时，基于其遗留系统规模和战略优先级的不同，展现出显著的差异化路径。

### **4.1 摩根大通（JPMorgan Chase）：弹性的堡垒**

摩根大通（JPMC）凭借高达150亿美元的年度技术预算和1.5万亿美元的十年“安全与弹性倡议”，正在为行业树立基准 1。

* **Kinexys（前身为Onyx）：** JPMC已将其区块链部门重塑为 **Kinexys**，标志着区块链与AI集成的成熟 23。  
  * **战略价值：** 通过代币化资产和存款（JPMD），Kinexys实现了7x24小时的可编程价值转移。AI被集成以监控这些不可变分类账的欺诈行为，创建了一个比传统SWIFT消息传递更本质安全的金融轨道 25。  
* **网络安全投资：** 该行的1.5万亿美元倡议不仅关注内部IT，还资助关键国家基础设施技术的开发，包括量子安全通信和AI驱动的防御系统 2。  
* **创新战略：** JPMC的“创新周”强调了对 **代理式AI** 在软件开发中的应用，声称在编码效率上实现了高达20%的提升，这直接转化为更快的补丁修补和功能部署，从而减少了漏洞窗口期 27。

### **4.2 美国银行（Bank of America）：行为智能**

美国银行（BofA）重点关注 **面向客户的AI安全** 和行为分析，并得到每年40亿美元新技​​术计划预算的支持 28。

* **CashPro Data Intelligence：** 该平台体现了从被动报告向主动智能的转变。它利用AI预测现金流异常，并标记企业财务运营中的潜在安全问题，使客户能够实时管理风险 28。  
* **行为分析：** BofA在“AI驱动的行为分析”上投入了巨资（超过10亿美元）。这项技术构建了用户行为的动态档案（鼠标移动、登录时间、交易速度）。任何偏离都将触发升级的身份验证（MFA）或账户冻结 30。  
* **VR与沉浸式培训：** BofA也是利用沉浸式技术（VR）进行员工培训的领导者，确保人类操作员能够有效地与日益复杂的AI系统协作 31。

### **4.3 Capital One：云原生的先锋**

Capital One以“做银行的科技公司”这一理念独树一帜，充分利用其早期对公有云（AWS）的“全押”赌注。

* **图机器学习：** 如前所述，他们在图嵌入方面的工作处于领先地位。通过映射“金融网络”（节点和边），他们能够检测出在表格视图中显得支离破碎的有组织欺诈团伙 10。  
* **无服务器效率：** 他们的运营模式依赖于无服务器架构来处理实时信用卡授权的“突发”性质，这使他们能够随交易量线性扩展ML推理成本，而不是为闲置容量付费 15。  
* **学术合作：** Capital One积极在顶级AI会议（NeurIPS, ICML）上发表论文，在“可解释AI”和“图神经网络”等主题上保持研究级的能力，这使他们领先于现成的供应商解决方案 33。

### **4.4 万事达卡（Mastercard）：全球智能网络**

万事达卡的 **Decision Intelligence** 平台代表了网络层面的防御视角。

* **生成式AI用于欺诈检测：** 他们已将生成式AI（Transformer模型）集成到其决策引擎中。与查看静态规则的传统模型不同，该系统分析交易的 *序列* 和 *上下文*（就像语言模型处理句子一样），以预测下一个动作是欺诈的概率 35。  
* **规模效应：** 该系统每年扫描1250亿笔交易，并在50毫秒内做出决策，这种全球视野使其能够识别单一银行无法察觉的跨国欺诈模式 35。

---

## **5\. 新兴威胁载体与未来防御**

### **5.1 量子威胁与后量子密码学（PQC）**

金融安全面临的最具存在主义威胁是量子计算的成熟。一台足够强大的量子计算机（运行Shor算法）可以解密几乎所有当前的金融数据（RSA/ECC加密） 6。

* **时间表：** 美国国家安全局（NSA）已强制要求在2030年前过渡到PQC算法（商业国家安全算法套件2.0），并要求立即开始过渡规划 6。  
* **金融影响：** “现在收集，稍后解密”（Harvest Now, Decrypt Later）的攻击已经在发生。对手截获并存储当今的加密金融数据，预期未来进行解密。  
* **防御：** 银行正在探索量子密钥分发（QKD）和加密敏捷性（Crypto-agility）——即在不重新架构系统的情况下热切换加密算法的能力 36。

### **5.2 区块链与AI的融合**

区块链与AI的交集为“信任”提供了一种新的范式。

* **数据完整性：** 区块链为AI训练数据提供了不可篡改的审计跟踪。如果AI模型开始表现异常（数据投毒攻击），区块链记录允许调查人员追溯导致漂移的确切数据输入 25。  
* **智能合约安全：** AI代理正被部署用于实时审计智能合约，在漏洞被去中心化金融（DeFi）生态系统利用之前预测逻辑缺陷 25。

---

## **6\. 监管与运营治理**

AI采用的“狂野西部”时代正在结束。欧盟《AI法案》（将在2025-2026年全面生效）建立了一个严格的合规环境。

### **6.1 欧盟AI法案：高风险分类**

金融机构必须在一个复杂的监管环境中航行，AI系统根据风险进行分类。

* **信用评分：** 用于信用评估的AI被明确归类为 **高风险**，要求进行符合性评估、高质量的数据治理和人类监督 5。  
* **欺诈检测豁免：** 有趣的是，仅用于检测金融欺诈的AI系统在某些语境下通常从“高风险”分类中剔除，以免阻碍安全防御 37。然而，如果这些系统涉及对自然人的“画像”（行为分析必然涉及），它们仍可能因对基本权利的影响而受到审查 38。  
* **透明度：** 银行必须确保“有限风险”系统（如客户服务聊天机器人）清楚地表明自己是机器 38。

### **6.2 数据隐私与联邦学习**

随着GDPR和CCPA等法规的收紧，银行正在转向 **联邦学习（Federated Learning）**。这允许机构在分散的数据上训练共享的欺诈模型，而无需共享原始的客户个人身份信息（PII）。模型在银行A学习欺诈的 *模式* 并与银行B共享 *权重更新*（而非数据），从而在尊重隐私的前提下建立集体防御机制 39。

---

## **7\. 结论与战略建议**

金融机构网络安全的转型是全面且深刻的。这种转型由防御机器速度攻击的必要性驱动，同时也由通过安全、自动化的商业释放数万亿美元价值的机会所驱动。

**关键结论：**

1. **AI即防御者：** 传统的基于签名的防病毒已经消亡。行为AI、图机器学习和深度学习是防御的最低标准。  
2. **架构至关重要：** 没有显著的桥接技术（边车模式、加速器），无法在1990年代的基础设施上运行2026年的AI模型。  
3. **代理式未来：** 未来的SOC是自主的。人类分析师将治理代理，而不是追逐警报。  
4. **韧性为王：** 在地缘政治不稳定和网络战的时代，冗余、自愈系统和“设计安全”是董事会层面的强制性要求。

**给CISO和CTO的建议：**

* **投资“数据管道”：** 最好的AI也会在糟糕的数据上失败。打破欺诈、网络安全和合规数据湖之间的孤岛。  
* **为后量子做准备：** 现在就开始盘点所有加密资产。向PQC的迁移将耗时数年。  
* **拥抱代理治理：** 制定监控 *你自己的* AI代理的协议。谁来监管监管者？  
* **人机协同：** 投资于培训。SOC分析师所需的技能组合正从“数据包分析”转向“AI监督和数据科学”。

2026年的金融机构本质上是一家拥有银行牌照的科技公司，由一个能够学习、适应并反击的数字免疫系统提供保护。

#### **Works cited**

1. Investment Targets for JPMorgan Chase’s Security and Resiliency Initiative Analyzed in New Report, accessed November 26, 2025, [https://www.crowdfundinsider.com/2025/10/255033-investment-targets-for-jpmorgan-chases-security-and-resiliency-initiative-analyzed-in-new-report/](https://www.crowdfundinsider.com/2025/10/255033-investment-targets-for-jpmorgan-chases-security-and-resiliency-initiative-analyzed-in-new-report/)  
2. JPMorganChase Launches $1.5 Trillion Security and Resiliency Initiative to Boost Critical Industries, accessed November 26, 2025, [https://www.jpmorganchase.com/newsroom/press-releases/2025/jpmc-security-resiliency-initiative](https://www.jpmorganchase.com/newsroom/press-releases/2025/jpmc-security-resiliency-initiative)  
3. Adopting Agentic AI in Cybersecurity: What CISOs Expect in 2025, accessed November 26, 2025, [https://right-hand.ai/blog/agentic-ai-in-cybersecurity/](https://right-hand.ai/blog/agentic-ai-in-cybersecurity/)  
4. Detecting and countering misuse of AI: August 2025 \- Anthropic, accessed November 26, 2025, [https://www.anthropic.com/news/detecting-countering-misuse-aug-2025](https://www.anthropic.com/news/detecting-countering-misuse-aug-2025)  
5. AI Act implications for the EU banking sector \_updated 20/11/2025, accessed November 26, 2025, [https://www.eba.europa.eu/sites/default/files/2025-11/d8b999ce-a1d9-4964-9606-971bbc2aaf89/AI%20Act%20implications%20for%20the%20EU%20banking%20sector.pdf](https://www.eba.europa.eu/sites/default/files/2025-11/d8b999ce-a1d9-4964-9606-971bbc2aaf89/AI%20Act%20implications%20for%20the%20EU%20banking%20sector.pdf)  
6. Quantum Computing Will Be to 2025 What AI Was to 2024 \- Entrust, accessed November 26, 2025, [https://www.entrust.com/blog/2025/01/quantum-computing-will-be-to-2025-what-ai-was-to-2024](https://www.entrust.com/blog/2025/01/quantum-computing-will-be-to-2025-what-ai-was-to-2024)  
7. (PDF) Comparative Study of Efficient Machine Learning Models for Real-Time Fraud Detection: CatBoost, XGBoost and LightGBM \- ResearchGate, accessed November 26, 2025, [https://www.researchgate.net/publication/395370886\_Comparative\_Study\_of\_Efficient\_Machine\_Learning\_Models\_for\_Real-Time\_Fraud\_Detection\_CatBoost\_XGBoost\_and\_LightGBM/download](https://www.researchgate.net/publication/395370886_Comparative_Study_of_Efficient_Machine_Learning_Models_for_Real-Time_Fraud_Detection_CatBoost_XGBoost_and_LightGBM/download)  
8. Enhancing credit card fraud detection with a stacking-based hybrid machine learning approach \- PubMed Central, accessed November 26, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12453863/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12453863/)  
9. Fighting Fraud with Virtual Card Numbers | Capital One, accessed November 26, 2025, [https://www.capitalone.com/tech/machine-learning/fighting-fraud-with-vcns-and-financial-transaction-embedding/](https://www.capitalone.com/tech/machine-learning/fighting-fraud-with-vcns-and-financial-transaction-embedding/)  
10. Financial graphs help capture financial embeddings over time \- Capital One, accessed November 26, 2025, [https://www.capitalone.com/tech/machine-learning/navigating-dynamics-of-financial-embeddings-over-time/](https://www.capitalone.com/tech/machine-learning/navigating-dynamics-of-financial-embeddings-over-time/)  
11. Improving Credit Card Fraud Detection in Imbalanced Datasets: A Comparative Study of Machine Learning Algorithms \- SciTePress, accessed November 26, 2025, [https://www.scitepress.org/Papers/2024/132639/132639.pdf](https://www.scitepress.org/Papers/2024/132639/132639.pdf)  
12. Addressing Class Imbalance in Financial Fraud Detection \- IEEE Xplore, accessed November 26, 2025, [https://ieeexplore.ieee.org/document/10973667/](https://ieeexplore.ieee.org/document/10973667/)  
13. Mitigating Fraud in The AI Age: Supporting Transaction Fraud Detection at Scale on IBM z17, accessed November 26, 2025, [https://www.celent.com/en/insights/mitigating-fraud-in-the-ai-age-supporting-transaction-fraud-detection-at-scale-on-ibm-z17](https://www.celent.com/en/insights/mitigating-fraud-in-the-ai-age-supporting-transaction-fraud-detection-at-scale-on-ibm-z17)  
14. AI on the mainframe: How the IBM z17 transforms fraud detection, accessed November 26, 2025, [https://community.ibm.com/community/user/blogs/sarah-bowden/2025/05/15/ai-on-the-mainframe-how-the-ibm-z17-transforms-fra](https://community.ibm.com/community/user/blogs/sarah-bowden/2025/05/15/ai-on-the-mainframe-how-the-ibm-z17-transforms-fra)  
15. Shifting ML from the cloud to serverless | Capital One, accessed November 26, 2025, [https://www.capitalone.com/tech/machine-learning/serverless-machine-learning/](https://www.capitalone.com/tech/machine-learning/serverless-machine-learning/)  
16. AI Integration Legacy Systems for Financial Service \- Zero Downtime Guide \- SmartDev, accessed November 26, 2025, [https://smartdev.com/ai-integration-legacy-systems-financial-services/](https://smartdev.com/ai-integration-legacy-systems-financial-services/)  
17. Bridging AI and Legacy: Applying Mainframe Testing to Modern AI Workloads, accessed November 26, 2025, [https://aijourn.com/bridging-ai-and-legacy-applying-mainframe-testing-to-modern-ai-workloads/](https://aijourn.com/bridging-ai-and-legacy-applying-mainframe-testing-to-modern-ai-workloads/)  
18. Agentic AI \- Booz Allen, accessed November 26, 2025, [https://www.boozallen.com/expertise/artificial-intelligence/ai-solutions/agentic-ai.html](https://www.boozallen.com/expertise/artificial-intelligence/ai-solutions/agentic-ai.html)  
19. Agentic AI SOC \- ST Engineering, accessed November 26, 2025, [https://www.stengg.com/en/cybersecurity/solutions/agentic-ai-soc](https://www.stengg.com/en/cybersecurity/solutions/agentic-ai-soc)  
20. How agentic AI can change the way banks fight financial crime \- McKinsey, accessed November 26, 2025, [https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/how-agentic-ai-can-change-the-way-banks-fight-financial-crime](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/how-agentic-ai-can-change-the-way-banks-fight-financial-crime)  
21. Multi-Agent System Patterns in Financial Services: Architectures for Next-Generation AI Solutions | AWS Builder Center, accessed November 26, 2025, [https://builder.aws.com/content/2uDxjoo105xRO6Q7mfkogmOYTVp/multi-agent-system-patterns-in-financial-services-architectures-for-next-generation-ai-solutions](https://builder.aws.com/content/2uDxjoo105xRO6Q7mfkogmOYTVp/multi-agent-system-patterns-in-financial-services-architectures-for-next-generation-ai-solutions)  
22. 'Sophisticated fraud' up 180% globally and UK deepfake attacks double, warns Sumsub, accessed November 26, 2025, [https://pressreleasehub.pa.media/article/sophisticated-fraud-up-180-globally-and-uk-deepfake-attacks-double-warns-sumsub-60826.html](https://pressreleasehub.pa.media/article/sophisticated-fraud-up-180-globally-and-uk-deepfake-attacks-double-warns-sumsub-60826.html)  
23. Why JPMorgan Will Offer Bitcoin Trading But Not Custody in 2025 | Yellow.com, accessed November 26, 2025, [https://yellow.com/en-US/research/why-jpmorgan-will-offer-bitcoin-trading-but-not-custody-in-2025](https://yellow.com/en-US/research/why-jpmorgan-will-offer-bitcoin-trading-but-not-custody-in-2025)  
24. Introducing Kinexys | J.P. Morgan, accessed November 26, 2025, [https://www.jpmorgan.com/insights/payments/blockchain-digital-assets/introducing-kinexys](https://www.jpmorgan.com/insights/payments/blockchain-digital-assets/introducing-kinexys)  
25. Top Use Cases of Blockchain AI Development in 2025 \- NASSCOM Community, accessed November 26, 2025, [https://community.nasscom.in/communities/ai/top-use-cases-blockchain-ai-development-2025](https://community.nasscom.in/communities/ai/top-use-cases-blockchain-ai-development-2025)  
26. The Convergence of AI and Blockchain: Redefining Digital Security and User Experience in Next-Gen Platforms | The AI Journal, accessed November 26, 2025, [https://aijourn.com/the-convergence-of-ai-and-blockchain-redefining-digital-security-and-user-experience-in-next-gen-platforms/](https://aijourn.com/the-convergence-of-ai-and-blockchain-redefining-digital-security-and-user-experience-in-next-gen-platforms/)  
27. Trending at JPMorganChase's 10th Annual Innovation Week, accessed November 26, 2025, [https://www.jpmorganchase.com/about/technology/blog/innovation-week25](https://www.jpmorganchase.com/about/technology/blog/innovation-week25)  
28. BofA AI and Digital Capabilities Win Four Best Innovation Awards | Press Releases, accessed November 26, 2025, [https://newsroom.bankofamerica.com/content/newsroom/press-releases/2025/10/bofa-ai-and-digital-capabilities-win-four-best-innovation-awards.html](https://newsroom.bankofamerica.com/content/newsroom/press-releases/2025/10/bofa-ai-and-digital-capabilities-win-four-best-innovation-awards.html)  
29. BofA at Sibos 2025 – Utilising AI and data analytics to transform treasury management, accessed November 26, 2025, [https://www.youtube.com/watch?v=RHpkmbH\_tzs](https://www.youtube.com/watch?v=RHpkmbH_tzs)  
30. AI-powered threat detection and response in the financial services industry | OpenText, accessed November 26, 2025, [https://www.opentext.com/en/media/point-of-view/ai-powered-threat-detection-and-response-in-the-financial-services-industry-pov-en.pdf](https://www.opentext.com/en/media/point-of-view/ai-powered-threat-detection-and-response-in-the-financial-services-industry-pov-en.pdf)  
31. Bank of America Global Technology Programs \- Join the Team, accessed November 26, 2025, [https://careers.bankofamerica.com/en-us/students/programs/global-technology](https://careers.bankofamerica.com/en-us/students/programs/global-technology)  
32. Capital One: AI & ML in Banking with Humans at the Center, accessed November 26, 2025, [https://www.capitalone.com/tech/machine-learning/](https://www.capitalone.com/tech/machine-learning/)  
33. Capital One partners with NSF to advance U.S. AI leadership, accessed November 26, 2025, [https://www.capitalone.com/tech/ai/capital-one-nsf-partnership-advances-ai-leadership/](https://www.capitalone.com/tech/ai/capital-one-nsf-partnership-advances-ai-leadership/)  
34. Capital One Tech Blog, accessed November 26, 2025, [https://www.capitalone.com/tech/blog/](https://www.capitalone.com/tech/blog/)  
35. Mastercard Launches Decision Intelligence Pro, New Generative AI Model for Fraud Detection \- CDO Magazine, accessed November 26, 2025, [https://www.cdomagazine.tech/aiml/mastercard-launches-decision-intelligence-pro-new-generative-ai-model-for-fraud-detection](https://www.cdomagazine.tech/aiml/mastercard-launches-decision-intelligence-pro-new-generative-ai-model-for-fraud-detection)  
36. The quantum leap in banking: Redefining financial performance, accessed November 26, 2025, [https://www.mckinsey.com/industries/financial-services/our-insights/the-quantum-leap-in-banking-redefining-financial-performance](https://www.mckinsey.com/industries/financial-services/our-insights/the-quantum-leap-in-banking-redefining-financial-performance)  
37. Annex III: High-Risk AI Systems Referred to in Article 6(2) | EU Artificial Intelligence Act, accessed November 26, 2025, [https://artificialintelligenceact.eu/annex/3/](https://artificialintelligenceact.eu/annex/3/)  
38. High-level summary of the AI Act | EU Artificial Intelligence Act, accessed November 26, 2025, [https://artificialintelligenceact.eu/high-level-summary/](https://artificialintelligenceact.eu/high-level-summary/)  
39. A Systematic Review of Machine Learning in Credit Card Fraud Detection Under Original Class Imbalance \- MDPI, accessed November 26, 2025, [https://www.mdpi.com/2073-431X/14/10/437](https://www.mdpi.com/2073-431X/14/10/437)