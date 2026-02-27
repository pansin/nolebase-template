# **人工智能系统取证前沿技术研究与数字化取证差异性深度综述报告**

随着人工智能（AI）技术在全球范围内的爆炸式应用，从医疗诊断、自动驾驶到刑事司法风险评估，人工智能系统已深度嵌入现代社会的运行骨架之中 1。然而，这种广泛的影响力伴随着严峻的安全与法律挑战。当人工智能系统出现决策失败、偏见歧视或被恶意利用（如深度伪造、自动化网络攻击）时，如何对其进行科学、规范的调查与归因，已成为网络安全、人工智能及法律界共同面对的核心课题 3。人工智能取证（AI Forensics）作为数字化取证（Digital Forensics）的一个新兴演进分支，其独特性在于它不仅要处理电子数据比特流的完整性，更要解码复杂模型在统计特征驱动下的语义逻辑与不可解释性 5。本报告将从网络安全专家、人工智能专家及法律专家的多维视角，对人工智能系统取证的前沿研究成果进行详尽分析，阐明其与传统取证的本质差异，并深度剖析训练数据质量及机器生成数据对模型评估的深远影响。

## **第一章 人工智能取证与传统数字化取证的范式鸿沟**

数字化取证传统上是一门关于“重构过去”的学科，其核心在于对存储媒介中静态数据残留的提取与分析 5。然而，人工智能取证的兴起标志着取证范式从“静态位分析”向“动态逻辑归因”的根本性转变 3。

### **1.1 证据本质的变迁：从比特完整性到逻辑可解释性**

传统数字化取证主要关注的是证据的真实性和完整性，即确保数字证据在收集、保存和呈现过程中未被篡改 5。其分析对象通常是文件系统、日志文件或网络数据包，其因果关系往往遵循确定性的代码执行路径 9。

相比之下，人工智能系统的核心是基于机器学习的模型，这些模型并非通过显式的条件逻辑（If-Then）构建，而是通过在海量训练数据上学习统计特征而形成的权重与偏差集合 10。这种特性导致了人工智能证据的“非决定论”倾向。在取证过程中，调查人员不仅需要获取模型的参数文件，更需要理解为什么在特定的输入扰动下，模型会产生特定的概率输出 12。

| 维度 | 传统数字化取证 | 人工智能系统取证 |
| :---- | :---- | :---- |
| **调查对象** | 操作系统日志、文件残留、内存镜像 | 模型权重、神经元激活状态、训练数据集、超参数 |
| **逻辑基础** | 确定性逻辑、显式代码路径、硬布尔关系 | 统计关联、概率推断、高维非线性映射 |
| **核心挑战** | 加密技术、反取证手段、数据海量增长 | 模型黑盒化、对抗性攻击、语义不可解释性、数据漂移 |
| **证据目标** | 证明“发生了什么”及“谁做的” | 解释“模型为何如此决策”及“谁训练/操纵了模型” |
| **工具依赖** | 磁盘镜像工具、文件恢复软件、协议分析器 | 可解释AI（XAI）工具、模型审计器、对抗性检测器 |

### **1.2 调查维度的扩张：AI赋能取证与AI作为取证对象**

人工智能在取证领域的角色是双重的：一方面，人工智能驱动的工具（如利用CNN进行多媒体分析、利用NLP进行文本挖掘）极大地提升了处理海量数字化证据的效率 5；另一方面，人工智能系统本身成为受调查的客体，需要对其算法偏见、决策失效及潜在的恶意操纵进行取证分析 3。这种双重身份要求调查人员同时具备传统取证的严谨性与数据科学的深厚功底 14。

## **第二章 统计特征与语义逻辑：黑盒模型的取证困境**

机器学习模型，尤其是深度神经网络，由于其高参数化和非线性结构，通常被视为“黑盒” 12。这种不透明性对法律证据的采信标准提出了严峻挑战，因为司法体系要求证据必须具备可测试性和可验证性 13。

### **2.1 统计关联对可解释性的消解**

基于机器学习的AI系统主要识别数据中的相关性而非因果关系 10。在法证分析中，这种特性的直接后果是“聪明汉斯效应”（Clever Hans Effect）的泛滥——模型可能基于训练数据中存在的偶然性统计特征（如医疗影像中的标注符、图像背景中的特定纹理）做出预测，而非基于真实的病理或目标特征 12。

从人工智能专家的角度看，这种现象源于经验风险最小化（ERM）原则的副作用。当取证调查试图解释一个自动驾驶系统为何在光线充足的情况下仍发生碰撞时，传统的逻辑审计无法解释神经网络内部成千上万个神经元如何共同作用导致了感知错误 10。这种语义层面的断裂，使得从统计输出推导法律因果关系变得异常困难 13。

### **2.2 解释性人工智能（XAI）在取证中的应用与局限**

为了打破黑盒，解释性人工智能（XAI）技术如Grad-CAM（梯度加权类激活映射）和SHAP（Shapley加法解释）被引入取证工作流 6。这些技术通过视觉化或权重分配，试图展示模型在做出决策时“关注”了哪些输入区域 18。

然而，XAI在取证中并非万能药。前沿研究指出，事后解释技术（Post-hoc Explanation）往往是对模型内部复杂逻辑的近似，而非真实过程的完全呈现 6。在司法实践中，如果一种解释方法本身缺乏鲁棒性，甚至可以被对抗性地操纵以掩盖模型的偏见，那么其作为证据的价值将大打折扣 11。

## **第三章 训练数据质量：人工智能取证的生命线**

人工智能系统的行为是其训练数据的函数。因此，对数据质量的评估是AI系统取证中最关键也最困难的一环 20。

### **3.1 数据投毒与后门攻击的法证回溯**

数据投毒（Data Poisoning）是一种隐蔽的对抗性攻击，攻击者通过在训练集中注入精心构造的恶意样本，来操纵模型的最终行为 20。

| 攻击类型 | 机制描述 | 法证调查重点 |
| :---- | :---- | :---- |
| **靶向投毒** | 在特定输入下诱导特定错误（如让识别系统错认特定人脸） | 寻找带有隐藏触发器（Trigger）的训练样本 20 |
| **非靶向投毒** | 降低模型的整体预测准确率或可靠性 | 分析训练过程中损失函数的变化及异常梯度更新 22 |
| **标签翻转** | 保持输入不变，仅修改样本标签以破坏分类逻辑 | 检查数据集中标签分布的统计偏移 23 |
| **干净标签攻击** | 投毒样本在视觉/语义上看起来正常，但在特征空间中具有破坏性 | 深度数据起源（Provenance）审计与哈希校验 22 |

从网络安全专家的视角看，防御这类攻击的取证方法必须包含对数据供应链的完整审计。实时监测模型性能的“行为漂移”并结合版本控制（如DVC或Git）进行回退测试，是目前识别投毒行为的核心手段 23。

### **3.2 偏见与代表性：证据力的消蚀**

如果训练数据无法真实反映现实世界的概率分布，AI系统将不可避免地产生偏见 11。在刑事司法风险评估系统中，如果训练数据在种族或经济地位上存在不平衡，其生成的建议将具有系统性歧视 13。取证调查必须能够量化这种偏见，并评估其对个案判决的影响 11。这要求取证不仅是技术性的，还必须具备社会技术系统的洞察力。

## **第四章 机器生成数据的介入：模型塌缩风险与评估难题**

随着生成式人工智能（GenAI）的普及，互联网数据正被大量的合成内容充斥 25。这一现象引入了一个前沿的科研难题：模型塌缩（Model Collapse）及其对法证评估的毁灭性影响 27。

### **4.1 模型塌缩的数学本质与演化**

模型塌缩是指学习模型在递归地使用前代模型生成的合成数据进行训练时，其生成的分布逐渐偏离真实人类数据分布，最终导致多样性丧失和功能性衰退的现象 28。

研究表明，模型塌缩主要由以下三类误差累积引起：

1. **统计近似误差（Statistical Approximation Error）：** 每次采样过程中的随机性导致信息丢失，特别是在样本量有限的情况下。  
2. **函数表达误差（Functional Expressivity Error）：** 模型架构的容量限制使得某些复杂的长尾特征无法被准确拟合。  
3. **函数近似误差（Functional Approximation Error）：** 训练算法（如SGD）的局部最优特性导致分布边缘的“消失”。

在这一过程中，分布的“长尾”区域（即极低概率但关键的事件）首先消失 27。对于取证专家而言，这意味着如果一个AI系统是基于受污染的合成数据训练的，其表现出的“理性”可能只是某种同质化、平庸化的伪统计特征，无法在极端或罕见场景下提供准确的预测或证据。

### **4.2 机器生成数据对取证评估的影响**

当调查人员评估一个AI模型时，如果无法区分训练集中哪些是人类真实数据，哪些是机器生成的合成内容，那么对模型“鲁棒性”和“泛化能力”的任何评估都将是不可靠的 26。机器生成数据的介入产生了一种类似于“信息反馈循环”的效应，使得模型的错误在代际间被放大，这种误差的累积对法证审计提出了极高的要求——必须通过先进的水印技术或起源追踪来甄别数据来源 29。

## **第五章 前沿取证技术：神经元归因与模型溯源**

为了应对黑盒模型的语义黑洞，前沿研究已经从外部行为观察深入到模型内部的微观分析 31。

### **5.1 神经元级知识归因（Neuron Attribution）**

神经元归因技术旨在定位大型语言模型（LLM）中存储特定知识或触发特定决策的确切单元 31。通过分析内部激活模式，研究者发现：

* **值神经元（Value Neurons）：** 通常存在于模型深层，直接决定了最终输出的语义内容。  
* **查询神经元（Query Neurons）：** 存在于中浅层，负责根据输入上下文激活相应的值神经元 31。

这种技术为取证提供了一种“脑部扫描”式的工具。当模型产生虚假信息或偏见言论时，取证人员可以通过干预（Intervention）实验——如将特定的300个关键神经元置零——来观察预测结果的变化，从而确证该输出背后的逻辑路径 31。

### **5.2 水印、指纹与起源标准**

在数字作品权属纠纷中，识别内容是否由特定模型生成是核心诉求。目前的研究聚焦于：

* **统计水印（Statistical Watermarking）：** 在模型推理阶段，通过微调Token生成的Logit概率分布，嵌入隐形的统计偏差 29。  
* **MetaSeal 框架：** 利用可逆神经网络将加密的元数据嵌入图像特征空间，既保证了生成质量，又提供了极高的防篡改性 30。  
* **C2PA 标准：** 通过内容凭证（Content Credentials）记录内容的创作、编辑和分发全过程，建立端到端的证据链 30。

## **第六章 法律专家视角：AI证据的可采性与合规性**

法律专家关注的是AI系统取证结果如何通过司法审判的考验。这不仅涉及技术准确性，还涉及法律的正当程序 3。

### **6.1 全球监管趋势：欧盟 AI Act 的示范效应**

《欧盟人工智能法案》确立了基于风险的分类监管体系。其对高风险AI系统提出的“自动化审计日志”要求，实际上是强制性地在AI系统中内置了取证接口 2。

| 法律条款 | 核心取证要求 | 对法证活动的意义 |
| :---- | :---- | :---- |
| **透明度要求（Art. 52）** | 必须告知用户正在与AI交互，生成内容必须可标记 | 简化了对GenAI内容的识别过程 34 |
| **记录保留（Art. 12）** | 高风险系统必须自动生成并保存全生命周期的审计日志 | 提供了可信的调查数据源（Audit Trail） 35 |
| **人类监督（Art. 14）** | 必须有明确的人类介入机制和操作说明 | 确定了发生故障时的法律责任归属点 35 |
| **可解释性（Recital 38）** | 系统的决策过程必须对用户和监管者具备一定程度的可理解性 | 推动了XAI技术从实验室走向法庭 34 |

### **6.2 美国的证据规则演进：拟议的 Rule 707**

美国联邦证据规则咨询委员会提出的 Rule 707 试图将机器生成的证据与传统的专家证言对标 15。其核心观点是：如果一方当事人在没有专家作证的情况下提供机器生成的结果，且该结果如果由人类做出则属于专家意见，那么该机器结果必须满足 Rule 702 的科学可靠性标准 37。这意味着法院必须审查算法的训练数据是否充分、方法是否可靠、应用是否准确 36。

## **第七章 结语：构建信任的法证基石**

对人工智能系统的取证已不仅仅是数字证据的收集，而是一场关于算法公正、数据完整性与人类可控性的多学科博弈 1。网络安全专家提供的防御性审计、人工智能专家开发的可解释性工具以及法律专家制定的准入标准，共同构成了AI时代法治的基石。

尽管机器学习的统计特性与机器生成数据的介入为评估带来了前所未有的复杂性，但通过神经元归因、数据起源追踪以及日益完善的全球法律框架，我们正在逐步建立起一套能够应对黑盒挑战的取证体系 13。未来的研究必须持续关注“模型塌缩”这一潜伏在数据深处的幽灵，确保在人工智能系统日益主宰决策的明天，真相与正义依然能够通过严谨的法证分析得以显现。

---

**数学附录：模型塌缩中的方差坍缩证明逻辑**

考虑一个多维高斯分布的递归学习过程，在每一代 ![][image1] 中，模型通过样本均值 ![][image2] 和方差 ![][image3] 进行参数估计。根据理论推导，当采样过程完全依赖于前代输出分布时：

![][image4]  
该式表明生成分布与真实分布 ![][image5] 的 Wasserstein-2 距离将随代际增加而无限发散。同时，方差呈现坍缩趋势：

![][image6]  
这揭示了机器生成数据介入后，模型将不可逆地丧失对现实世界复杂性的表达能力 28。这一结论是取证专家在评估递归训练系统时必须采纳的数学边界。

#### **Works cited**

1. AI Forensics e-bok av Joseph C. Sremack – EPUB | Rakuten Kobo Sverige, accessed February 23, 2026, [https://www.kobo.com/se/sv/ebook/ai-forensics](https://www.kobo.com/se/sv/ebook/ai-forensics)  
2. EU Artificial Intelligence Act | Up-to-date developments and analyses of the EU AI Act, accessed February 23, 2026, [https://artificialintelligenceact.eu/](https://artificialintelligenceact.eu/)  
3. AI Forensics vs. Traditional Digital Forensics: Examining AI Systems in Litigation | myLawCLE, accessed February 23, 2026, [https://mylawcle.com/products/ai-forensics-vs-traditional-digital-forensics-examining-ai-systems-in-litigation/](https://mylawcle.com/products/ai-forensics-vs-traditional-digital-forensics-examining-ai-systems-in-litigation/)  
4. The Role of Explainable AI (XAI) in Forensic Investigations | Scilit, accessed February 23, 2026, [https://www.scilit.com/publications/bd3d158a012bc905b860d3f598c01187](https://www.scilit.com/publications/bd3d158a012bc905b860d3f598c01187)  
5. Artificial Intelligence and the Transformation of Digital Forensic ..., accessed February 23, 2026, [https://medium.com/@tedislava.vasileva/artificial-intelligence-and-the-transformation-of-digital-forensic-investigations-732ee28c7653](https://medium.com/@tedislava.vasileva/artificial-intelligence-and-the-transformation-of-digital-forensic-investigations-732ee28c7653)  
6. From Black Boxes to Glass Boxes: Explainable AI for Trustworthy Deepfake Forensics, accessed February 23, 2026, [https://www.mdpi.com/2410-387X/9/4/61](https://www.mdpi.com/2410-387X/9/4/61)  
7. WHAT IS AND WHAT IS NOT 1 DIGITAL FORENSICS, AI, AND CONCERNS \- Paraben Corporation, accessed February 23, 2026, [https://paraben.com/wp-content/uploads/2025/06/White-Paper\_Digital-forensics-AI-and-Concerns-What-is-and-What-is-not.pdf](https://paraben.com/wp-content/uploads/2025/06/White-Paper_Digital-forensics-AI-and-Concerns-What-is-and-What-is-not.pdf)  
8. Essential Digital Evidence Management System Features, accessed February 23, 2026, [https://digitalevidence.ai/blog/essential-digital-evidence-management-system-features](https://digitalevidence.ai/blog/essential-digital-evidence-management-system-features)  
9. A Comparative Analysis of Traditional Computer Forensic Tools and Cloud Forensic Tools \- TIJER.org, accessed February 23, 2026, [https://tijer.org/tijer/papers/TIJER2301009.pdf](https://tijer.org/tijer/papers/TIJER2301009.pdf)  
10. AI's mysterious 'black box' problem, explained | University of Michigan-Dearborn, accessed February 23, 2026, [https://umdearborn.edu/news/ais-mysterious-black-box-problem-explained](https://umdearborn.edu/news/ais-mysterious-black-box-problem-explained)  
11. Explainable AI in High- Stakes Forensic Decision- Making \- IGI Global, accessed February 23, 2026, [https://www.igi-global.com/viewtitle.aspx?TitleId=388843\&isxn=9798337365367](https://www.igi-global.com/viewtitle.aspx?TitleId=388843&isxn=9798337365367)  
12. What Is Black Box AI and How Does It Work? \- IBM, accessed February 23, 2026, [https://www.ibm.com/think/topics/black-box-ai](https://www.ibm.com/think/topics/black-box-ai)  
13. Interpretable algorithmic forensics | PNAS, accessed February 23, 2026, [https://www.pnas.org/doi/10.1073/pnas.2301842120](https://www.pnas.org/doi/10.1073/pnas.2301842120)  
14. The Benefits and Challenges of Artificial Intelligence in Digital Forensics for Cloud Environments \- Old Dominion University WordPress, accessed February 23, 2026, [https://sites.wp.odu.edu/jasmyn-wilhelm/wp-content/uploads/sites/33811/2024/08/Research-Paper.pdf](https://sites.wp.odu.edu/jasmyn-wilhelm/wp-content/uploads/sites/33811/2024/08/Research-Paper.pdf)  
15. Proposed New Federal Rule Regarding AI-Generated Evidence \- Meyers | Nave, accessed February 23, 2026, [https://www.meyersnave.com/proposed-new-federal-rule-regarding-ai-generated-evidence/](https://www.meyersnave.com/proposed-new-federal-rule-regarding-ai-generated-evidence/)  
16. Generative AI as Courtroom Evidence: A Practical Guide \- Mitchell Hamline Open Access, accessed February 23, 2026, [https://open.mitchellhamline.edu/cgi/viewcontent.cgi?article=1380\&context=mhlr](https://open.mitchellhamline.edu/cgi/viewcontent.cgi?article=1380&context=mhlr)  
17. Explainable AI for Digital Forensics: Ensuring Transparency in Legal Evidence Analysis, accessed February 23, 2026, [https://www.forensicscijournal.com/index.php/jfsr/article/view/jfsr-aid1089](https://www.forensicscijournal.com/index.php/jfsr/article/view/jfsr-aid1089)  
18. Explainable AI for forensic speech authentication within cognitive and computational neuroscience \- Frontiers, accessed February 23, 2026, [https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2025.1692122/full](https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2025.1692122/full)  
19. Deepfakes in Court: How Judges Can Proactively Manage Alleged AI-Generated Material in National Security Cases, accessed February 23, 2026, [https://legal-forum.uchicago.edu/print-archive/deepfakes-court-how-judges-can-proactively-manage-alleged-ai-generated-material](https://legal-forum.uchicago.edu/print-archive/deepfakes-court-how-judges-can-proactively-manage-alleged-ai-generated-material)  
20. What is Data Poisoning? AI Impact, Examples and Best Defenses \- Ncontracts, accessed February 23, 2026, [https://www.ncontracts.com/nsight-blog/data-poisoning](https://www.ncontracts.com/nsight-blog/data-poisoning)  
21. What is Data Poisoning? Types & Best Practices \- SentinelOne, accessed February 23, 2026, [https://www.sentinelone.com/cybersecurity-101/cybersecurity/data-poisoning/](https://www.sentinelone.com/cybersecurity-101/cybersecurity/data-poisoning/)  
22. What Is Data Poisoning? \- IBM, accessed February 23, 2026, [https://www.ibm.com/think/topics/data-poisoning](https://www.ibm.com/think/topics/data-poisoning)  
23. AI Data Poisoning: Attacks, Risks & Defense \- WitnessAI, accessed February 23, 2026, [https://witness.ai/blog/ai-data-poisoning/](https://witness.ai/blog/ai-data-poisoning/)  
24. Data Poisoning: Current Trends and Recommended Defense Strategies \- Wiz, accessed February 23, 2026, [https://www.wiz.io/academy/ai-security/data-poisoning](https://www.wiz.io/academy/ai-security/data-poisoning)  
25. AI Model Collapse: Causes and Prevention \- WitnessAI, accessed February 23, 2026, [https://witness.ai/blog/ai-model-collapse/](https://witness.ai/blog/ai-model-collapse/)  
26. Model Collapse and the Right to Uncontaminated Human ..., accessed February 23, 2026, [https://jolt.law.harvard.edu/digest/model-collapse-and-the-right-to-uncontaminated-human-generated-data](https://jolt.law.harvard.edu/digest/model-collapse-and-the-right-to-uncontaminated-human-generated-data)  
27. What Is Model Collapse? \- IBM, accessed February 23, 2026, [https://www.ibm.com/think/topics/model-collapse](https://www.ibm.com/think/topics/model-collapse)  
28. AI models collapse when trained on recursively generated data \- PMC, accessed February 23, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11269175/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11269175/)  
29. Watermarking Fine-Tuning Datasets for Robust Provenance \- MDPI, accessed February 23, 2026, [https://www.mdpi.com/2076-3417/15/19/10457](https://www.mdpi.com/2076-3417/15/19/10457)  
30. AI Watermarking & Provenance Standards \- Emergent Mind, accessed February 23, 2026, [https://www.emergentmind.com/topics/ai-watermarking-and-provenance-standards](https://www.emergentmind.com/topics/ai-watermarking-and-provenance-standards)  
31. Neuron-Level Knowledge Attribution in Large ... \- ACL Anthology, accessed February 23, 2026, [https://aclanthology.org/2024.emnlp-main.191.pdf](https://aclanthology.org/2024.emnlp-main.191.pdf)  
32. Towards Neuron Attributions in Multi-Modal Large Language Models \- OpenReview, accessed February 23, 2026, [https://openreview.net/forum?id=jMJVFP4BH6\&referrer=%5Bthe%20profile%20of%20Junfeng%20Fang%5D(%2Fprofile%3Fid%3D\~Junfeng\_Fang1)](https://openreview.net/forum?id=jMJVFP4BH6&referrer=%5Bthe+profile+of+Junfeng+Fang%5D\(/profile?id%3D~Junfeng_Fang1\))  
33. Detecting AI fingerprints: A guide to watermarking and beyond \- Brookings Institution, accessed February 23, 2026, [https://www.brookings.edu/articles/detecting-ai-fingerprints-a-guide-to-watermarking-and-beyond/](https://www.brookings.edu/articles/detecting-ai-fingerprints-a-guide-to-watermarking-and-beyond/)  
34. AI Act | Shaping Europe's digital future, accessed February 23, 2026, [https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)  
35. Audit Trail Requirements for High-Risk AI Systems \- Scrut, accessed February 23, 2026, [https://www.scrut.io/glossary/audit-trail-for-ai-systems](https://www.scrut.io/glossary/audit-trail-for-ai-systems)  
36. U.S. Judicial Conference considers new rule on AI-generated evidence – ICLR, accessed February 23, 2026, [https://iclr.net/news/u-s-judicial-conference-considers-new-rule-on-ai-generated-evidence/](https://iclr.net/news/u-s-judicial-conference-considers-new-rule-on-ai-generated-evidence/)  
37. Adapting the Rules of Evidence for the Age of AI, accessed February 23, 2026, [https://www.quinnemanuel.com/the-firm/publications/adapting-the-rules-of-evidence-for-the-age-of-ai/](https://www.quinnemanuel.com/the-firm/publications/adapting-the-rules-of-evidence-for-the-age-of-ai/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAlUlEQVR4XmNgGAWDCegC8Twg5obyeYG4AYgnADETVAwO2IF4KxBHA/F/IG4G4gVQuXqoGArYC6VhGhqR5EA2YWgohdLXGDAls7GIwQFIoh2L2GU0MTCQYIBIgpwAA3xQMQUofypCCsJBtxpZrBqIlZDkGP4C8VdkASAoYIBo0AfiS2hyDBZAzIouyACJHwN0wVFACAAA3qgdBAlcrcAAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAA40lEQVR4XmNgGAWjYOiBeiAWQxPjhGKywX8gdscithZNjGjgzQAxAB2AxIzRBYkF5xgwDQ3DIkYSAGk+iyZ2AypONgBpDsAidgRNjGgQxAAxgBVNHCTmBWXDIusUEH8EYjUgPgjEX4FYGiqHAi4zQAzIRhL7CxVjAuJeBkiyioTKgcRtoOw4IN4MZaMAkKJHUBqEn0DFd0D5q6B8GEAOZ5DLw5H4cABS5IMuiAOkAvEeJD7WiARFDlYJHADkC0soW4gBEkzMQGwOVwEEpxlIMxRd7U8g3o4mxnAdiMvQBUcB2QAAt1g0i1/y0rAAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAA/klEQVR4XmNgGAUDBf5D8Xsgfg3Eb4D4HRD/QJKDYZJBLwNhzfMZ8MvjBV8YIJr3oEsgAbINBwGY683RJaBgExAzoQsSC2wY8AePGBBzowuSAo4wICKXJgDmelZ0CWqAr0Cshy5IDXALiBPQBaGgHoh50QWJBesYIOkZF/iALkAsKAHii+iCSICDATUVgfLDHwZI0nzJANFbiSQPB45A/BuI1YFYA4q1GCDh7gvEixlQkygjEGsC8Qsg3gIVAwGsSfgtEH9ngFjwjwFhEDaMDJD5XkB8HYlPMUA2HORAIyQ+RSAFiHci8WEWbUcSIxuAcrIKEv82EN9D4o8C7AAA5hREHC12YnMAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAl4AAAA5CAYAAADnTyVNAAADa0lEQVR4Xu3dT6hmYxwH8GdikAULNGWBlZRILGSpSUn5s7Bj2FmoKUpIFndlIWrSNDUlDWFBljIUsxoLUv4sNIVJ/ixI8nfIMPP73XOO93mfmffeM1K85/186ts9z+855733Patf55z7nFIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYEk+2BQAATu6KyP7IPZEXI89EvprbY3P3t4WwN3Ksz01VfXvkaOTjyH1VHQBg8r6IXFa6BmlQb4+RV70uqcY3R87vt88u3ec9VbpG695hp37uomoMADB5z0ceqcZ143UocmRE8pin+2M+6X8Ozi3d/NtNPb3eFgAApiybojP67Wsi31VzY9wZuboaf19tD34s3e/Z2tRfa8YAAJNWX+F6P3JrZF9V28xaM76hzDdYr0Yuj7xcut91Zl/PW5Lbhp0AAP5Lb5TZA+qb5Z86K/JeNb498lHk0qq2kV1tofdw5OvIb2X2vFe6pcz+5tuqOgDA/8JGzdWFZfEcAACn4LTSNVYftBMVjRcAwL/ggdI1VnmLrlavgTWlxmtK3wUAWDI/lBObkVyQ9K5qfG21vewOtIWR8ny8FNnRTlTyAf98Ju3RdgIAIA3Pd10XuT7yYD+eslP9fr9GvindmmDD+dozt0cpP0c+i1xZugVjc+X8XLUfAGDd8HzX4chjkd2RL/va1I39jgcjFze1/E/KPP65fpzbd8+m//ZtWwAAVtdDpWsabmzqn1bb50W2VONW3rpb1hwrJ64R1spXHp3Mn6U7/qfIs83cIFfUv6MtAgCrKZuGbB5quTBp/dLp36vtKRnTdKXH20Ivm9H8jMw5zVxtX1sAAFbT0DgsckHkrbY4ARt959YrbaEynL9Fn5e3cvOqIgCw4vLdidkwvNtOVHL+9La45Nb6jHW0LfTeieyPPFG68/TL/PS6D8vsHZUAwArLZQ+yYWjX70r5qp2cm+JtxkVXpxbJdz0eaGqHI59X4xfK7MpXvgQ8n+3K1zG9We0DAKygXIsqr+L8VeZvlQ3J+h+RI5Gr+mOmZK0tjJDvghzOVz5Uv31+el3elh3WRMvsnJ8GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGOU4ourNVXnwW28AAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABAklEQVR4XmNgGAWDDXQB8Ucg/g/F34H4HZrYdbhqCgDMMGzgJwNuOaIByIBD6IJQwMMAkW9AEycaRDBADHBEl0AC+HxIEFxjIKyZIguI0UyMGpwApPEAuiAScGOAqCErNcHC3wFNHBncZoCoEUMSmwPEV4D4OJIYVnCTgbDXQfJ/kfhNQBwNZfMD8T0kOQxAKGxhCYAJSQxdPTofBYAkcaX/RgaIvA6aOLqB6Hw4qGaASLqiiQcwQIqK32jiMIBuIIgvgSwwjQESprDgAeE/DJAiAVQWLQFiNrhqTIDNAqoCdAPR+RSDfUBsBmUzAvE/JDmqgc8MkKIe5Hp2NLlRMMAAANXLTOqFuG1cAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAl4AAAA5CAYAAADnTyVNAAAFcUlEQVR4Xu3dWahuUxwA8GXOkAzXWMqYa3hQlKE8eEAoeTAlyVCGeFAUiu4leaG8maOEIsqQMlOSIWOEUC4uZeaKzKx/e29nnXW+7zvD/fY99xy/X/27e/3Xvvvsb99b3/+stffaKQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMxsmeP7HM/kOC7H0sndkxyV44McK3NsXPUBADDCOjn+KdqxvUHRrnX73p3jpLIDAIDRnspxW9Eui7BBoj/i7LoDAIDRoojaqd3eOccvE11TdFOLZ6bpCzQAACo/F9uv57gmx41te5cc3010T5mS7DyX44KiDQCw1oib07spu6/b+DbHqiLfxWHt3+nLkhy/5fgmx9apKbTOKvrebrfD0zleyvF+mnxj/a05ji/aq+OK1FyHGHnrzgMAYLV0hdUxdUdr09T0L6s7FrF3czxZtN/J8ULRBgCYkz3TRPG1btXXOTI1o0z/B5unwfeNRW6LOgkAMFv3paaw+KPuKMQ04EIU64LNxptpeOFVPnXJeA265gCwaP2Zmi+/O+uOVt/3ePXl+hx71MkRutG/2rD8uJyfmiU13stxSdXXOTQ1U54v5zgxx4eTu8fq6hwXF+1DctyT+nt44eYcG9bJGdoox3U5rs2xb9VXOi01nyFGcAFgXq2XJoqLblmHxeKnNPPV7YcVWMPy4/BxmnzsV6t2iKLirqJ9Spq6z7jcm5oHHOL4z+f4IU0U3pGLhxr68GmdmIH9U3NOj6ZmxDa245eIsoi7sM1H0Rj3LJ6R48eiHwDmRYyixBfUW3XHIvBsGr0SfmdYgTUsPw4PpKnHjnYsqVG2zynaXa4PUbiE7jOvX/S91ub6cHKa3XRu3JP4eZWLh0S68463IZya4/dJezQ2S81oKADMmwNTvyMBUfzMZ/yT46o0WuwTURuW70O8szJ+1oNF7sU2tyJNLcDGbb/2z/h5MeVYilyMgE0njnHAHGJZapYSiRG36dySJheFnZhK7P69Rv2bjeoDgF4tSaO/iEb1LQRf5Di2Tg4w7Mt6WH5cnkjN8R9KEyOPsV36qM13EUVKX7ZLzc+IqblS5OJ+tOkcnZrrPduIzxQPcuyepvdJnSjEtYtzjbXqholpVABY42LKZlRREf3lAqYLzes5dqiTQ8T9YIOuReTixvc+xLH/HpB7uGiX579Vjq/S4PMcl3hrQH38uEeqzo3T0jS12BylvD61mLbsCtRhDyss1Cd1AVjg4stp8zpZ+DjH7UX78dQUYjGqcX9q7qEZNOWzNjg9x011coRutKkWubiRe9ziQYY4drx3shS5R1Jz/ru27Vrk4qGIPsSx6+VFIvdrux1vDhi3eHPCbMSrpKLAqsX9W3Gu8X+yK74OnrRH88vEZ1UOAHoXv/WfkJqFVGPEYa8c++Q4KDUjHN2TYue1+8dj/yFy27TbUZRd1G6vbd5IMx/t6sRnO7doxxOFgwqfcYljP1a072hzUdwuTxOFRBS8pb7Pqb4fLnKXpeam9XEXLVemqdOaM7Eix7ZF+4jUnOeObbsbzY2IpSSiGOv2iWUoAGCNiZu3Y2otiq+/UjPd1X1J1VGujxT335QvtY6n4LYv2muT5XViBmLpifjMr6TmCc8Y5Ylioy9xPbt11CL2ThOjXDe0+8T24cU+cf37XEk/fkY9mnZpm19Z5cchjjtX8SRkd11iWnmQGPXs9vkyzX3NMABY4+7OcXnRXp0vTQAARohCq1sT67jUTOftlmOT//YAAGAsygUpYzpqVZq63hMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACL0L9wWUzQbJdgEwAAAABJRU5ErkJggg==>