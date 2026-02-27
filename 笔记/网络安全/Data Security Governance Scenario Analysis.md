# 数据安全治理新范式：以“场景”为核心的四维深度解析

## 导言：从技术堆砌到场景洞察

在数字经济时代，数据已成为驱动企业创新的核心引擎。然而，数据价值的释放伴随着前所未有的安全风险。传统的数据安全治理往往陷入“头痛医头、脚痛医脚”的技术困境——部署防火墙、采购DLP系统、进行权限盘点——这些孤立的措施虽然必要，却常常因为缺乏对业务上下文的理解而效果甚微。

本文提出一个核心论点：**精细化的数据安全治理，源于对“人如何通过系统访问资源”这一具体场景的深刻理解**。安全防护的终极目标不是技术的堆砌，而是对无数个“业务场景”（面向用户）和“作业场景”（面向内部员工）的精细化分析与管控。只有将安全策略根植于真实的场景中，才能实现从被动响应到主动防御的根本转变。

为此，我们构建了一个四维分析框架，从**数据资产**、**信息系统**、**人**和**业务**四个视角出发，系统性地审视和管理风险。这四个视角并非相互独立，而是相互关联的分析工具，共同服务于我们对核心“场景”的洞察与治理。

![数据安全治理四维框架](https://r2.flowith.net/files/png/XG15J-holistic_data_security_governance_framework_index_0@1024x1024.png)

---

## 一、数据资产视角：摸清家底，在关键节点设防

数据资产是治理的客体。此视角的核心在于将数据视为需要精细化管理的战略资源，并识别其在流动与转换过程中的核心风险节点。

### **核心挑战：非结构化数据的治理困境**

与易于管控的结构化数据相比，非结构化数据（如文档、代码、邮件、图片）是数据泄露的重灾区。其治理面临两大现实瓶颈：
*   **意图识别困难**：传统DLP依赖关键词或正则表达式，难以准确判断用户处理非结构化数据的真实意图。例如，一个员工复制客户名单，其意图是正常汇报还是恶意泄露？仅靠技术难以区分。
*   **LLM的性能与成本瓶颈**：虽然大语言模型（LLM）在理解语义方面表现出色，但将其用于实时监控海量内部数据流，面临巨大的性能与成本挑战，短期内难以大规模落地。

### **创新策略：监控“数据转换节点”**

> 与其在数据海洋中盲目监控，不如扼守数据形态转换的关键“隘口”。

数据泄露的高风险行为，往往发生在数据从一种形态转换为另一种形态的节点。监控这些**数据转换节点**，是实现源头管控和精准防御的核心创新策略。

| 关键转换节点 | 场景描述 | 管控要点 |
| :--- | :--- | :--- |
| **结构化 -> 非结构化** | 从数据库、BI系统导出报表（Excel/CSV/PDF） | 监控导出行为，对生成文件进行自动分类打标和加密，审计高频、大量的导出操作。 |
| **代码 -> 可执行文件** | 研发人员编译打包源代码 | 监控编译环境，确保敏感密钥、证书等不被硬编码打包进发布件。 |
| **内部数据 -> 外部传输** | 通过邮件、即时通讯工具、网盘分享文件 | 强制对附件进行内容扫描和安全审批，限制向个人邮箱或非授权应用传输数据。 |
| **明文 -> 密文（或反之）** | 调用加解密接口或使用加解密工具 | 审计对敏感数据的加解密操作，确保密钥管理安全，防止未授权的解密行为。 |

通过聚焦这些转换节点，我们可以用更低的成本实现对高风险行为的精准识别与干预。

![数据资产生命周期安全](https://r2.flowith.net/files/png/LVE3N-data_asset_security_lifecycle_infographic_index_1@1024x1024.png)

---

## 二、信息系统视角：构建以“数据不落端”为原则的数字堡垒

信息系统是数据流动的载体。在云原生和远程办公时代，传统的边界防御已失效，必须转向以“身份”为核心、以“数据不落端”为原则的现代化安全架构。

### **核心风险：知识员工终端的数据黑洞**

研发、法务、财务等知识员工的终端是数据安全最大的“黑洞”。这些终端存储着大量代码、合同、财务报表等高价值非结构化数据，但其安全状态几乎完全失控。本地文件操作（复制、重命名、另存为）难以被有效审计，数据一旦落地，就如同泼出去的水，极易通过各种渠道泄露。

### **核心原则：数据不落终端 (Zero-Trust Data)**

解决终端数据黑洞的根本之道，是贯彻“数据不落终端”原则。这意味着通过虚拟化技术（如VDI、DevBox）或安全工作空间，为员工提供一个云端的、受控的作业环境。所有的数据处理、开发、分析均在此环境中完成，本地终端仅作为操作界面的入口。

> **核心思想**：将数据和作业环境集中在云端进行统一管控，从根本上杜绝数据在不可控终端上的残留和外泄风险。

### **关键界面管控**

系统安全设计的重中之重，是管控好四类关键界面，它们是数据流动的必经之路：
1.  **人机界面**：用户通过终端访问应用系统的入口。需实施强身份认证（MFA）和基于用户/设备风险的动态访问控制。
2.  **机机界面（API）**：应用系统之间数据交换的通道。必须建立API资产清单，实施严格的认证授权，并对API流量进行异常行为监控。
3.  **内外界面**：企业内网与公网的边界。所有出站流量都应经过内容审查，防止敏感数据外传。
4.  **数据转换界面**：即前述的“数据转换节点”，是应用内部数据形态变化的关键控制点。

![零信任架构](https://r2.flowith.net/files/png/9UENN-zero_trust_architecture_infographic_index_2@1024x1024.png)

---

## 三、人的视角：建立授权与验证相结合的动态治理模式

技术构建了防线，但人是操作技术的主体。对人的治理，必须超越单纯的权限分配，建立一个能够验证实际行为的闭环管理体系。

### **核心理念：敏感岗位的动态治理**

对系统管理员、核心研发、高管等“敏感岗位”的治理，必须将授权与验证动态结合，形成一个持续反馈、不断优化的闭环。

> **“自上而下”授权 + “自下而上”验证 = 动态精准治理**

这是一个持续迭代的过程：
1.  **自上而下授权 (Top-Down Authorization)**：基于岗位职责（Job Role），根据最小权限原则，静态地为员工分配其完成工作所必需的访问权限。这是权限管理的起点。
2.  **自下而上验证 (Bottom-Up Verification)**：通过用户与实体行为分析（UEBA）等技术，持续监控员工在系统中的**实际数据访问行为**，形成个人行为基线。
3.  **差异分析与风险识别**：定期比对“应有权限”（授权）与“实际行为”（验证），分析两者之间的差异。
    *   *权限过高*：员工拥有某些权限但从未使用，应予以回收，减少攻击面。
    *   *行为异常*：员工访问了其岗位职责不应触及的数据，或在非工作时间、使用非常用设备进行操作，这可能是内部威胁的明确信号。
4.  **动态调整与响应**：根据差异分析的结果，动态调整用户权限，并对异常行为进行调查和响应。

这种模式将静态的权限分配转变为动态的风险治理，能够更完整、更准确地识别和管理由“人”带来的风险。

![人的因素在安全中的作用](https://r2.flowith.net/files/png/5PG0N-human_element_in_security_infographic_index_3@1024x1024.png)

---

## 四、业务视角：审查作业过程，弥补技术短板

数据安全如果脱离业务，就会成为业务发展的“绊脚石”。此视角强调将安全能力深度融入业务，并通过审查内部“作业过程”的合理性，来弥补纯技术手段的不足。

### **区分“业务过程”与“作业过程”**

理解两种过程的区别，是本视角的关键：
*   **业务过程 (Business Process)**：面向外部用户，是企业创造价值的主流程。例如，用户在线下单、申请贷款。其核心是流程的顺畅和用户体验。
*   **作业过程 (Operational Process)**：面向内部员工，是支撑业务过程的内部操作流程。例如，客服查询订单详情、风控专员审批贷款申请。其核心是操作的规范性和可控性。

### **核心论证：审查“作业过程”的逻辑合理性**

纯技术手段（如DLP、IAM）只能回答“能不能访问”的问题，但无法判断“应不应该访问”。例如，技术上，客服可能有权限查看所有客户的订单，但这并不意味着一个客服随意浏览不属于其服务范围的VIP客户订单是合理的。

因此，对数据安全的治理，必须深入到对“作业过程”的逻辑合理性、可控性进行审查。这需要安全团队与业务团队紧密合作，共同回答以下问题：
-   该岗位的员工，在其标准作业流程中，**真的需要**访问这些敏感数据吗？
-   访问的**频率、数量、时间**是否符合其正常工作的范畴？
-   是否存在更安全的替代方案（如提供脱敏数据、仅返回“是/否”结果）来满足其业务需求？

通过对“作业过程”进行梳理和优化，我们能够设计出更贴合业务、更不易被滥用的安全策略，从而在技术之外，建立起一道坚固的“业务逻辑”防线。这正是弥补纯技术手段短板的关键所在。

---

## 结论：迈向以场景为中心的协同共治

数据安全治理是一项复杂的系统工程，不可能一蹴而就。它要求企业必须转变思维，从孤立的技术采购转向对核心场景的深度理解。

通过以“人如何通过系统访问资源”这一核心场景为锚点，运用**数据资产、信息系统、人、业务**这四个视角进行系统性分析，我们能够：
-   在**数据资产**层面，扼守“数据转换节点”，实现精准防御。
-   在**信息系统**层面，贯彻“数据不落端”原则，构筑零信任堡垒。
-   在**人的**层面，建立“授权与验证”的动态闭环，精准管理内部风险。
-   在**业务**层面，审查“作业过程”的逻辑合理性，弥补技术控制的盲区。

这四个维度相辅相成，共同指向一个目标：让数据安全策略真正根植于业务的土壤，构建一个跨部门、多层次、协同运作的动态治理体系。唯有如此，企业才能在数字化的浪潮中行稳致远，将数据这一核心资产的价值最大限度地安全释放。

## 参考文献

1.  36kr.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFppFOUjl9FxAQ9LoPX2nYODgGZr0UUaC5kGFdAVJOG5FIMXMPpPpln7a4dd726bDkPXgEoUFwqrjredS_08-OgqPfjcOWrnZEUw4MaMPbrnm1BrYnu8ktFZBuYSmEsd34=
2.  8isoft.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGLoo2W2WJ4a3pa8QwntdxgUXUmGnqFV1I_9dFjNSSZw3MrWROxkJSmNZmjR4impBrhmXOzpnJkSsMucScsRDlONb80V-2AYxT69X7beOT6MVMrDjnkAWIuzcc3O2K6AKsIvV7ie0kY2V7fGl_WN9WMhICyhYkUYldvcMHZu8A=
3.  alibabacloud.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH2BG8U6zmjVwmCaBREbmobsa0QeHbEEygE1MFZ5R-M97w418tnMfR3yvI9Z_qPPGEau8r-ZmpXEb7av2B-Kxdx4shexqhWD0yK8dV0dXHh7m2c35Ry1MSvKoDqhrZJu2jUODiv-Lp8OpkuRSz86t7spZjMA==
4.  aliyun.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpV5N28VTuPpS5QNiKocxRE0VcXA_hClEJvqylO3hgemVis0D4g501fD0UN3lvzsTtZdGRxtFLxw6irOyZye-T_9wwwq3fs4miz9kUKW95W26rZJe0vTW7djRsu7u5G1xJR0UM2KNlpJjSl6BsMGzZT_fdn5yROkl9zwudH68=
5.  aliyun.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQERRT9gkAHH6HaYUNoDP9y7uH1OaDCsVAU54b4JmBQVlCmH5jkBY5k78AXlxsnroaRPmIEsz-KtMoksAmHs-HoJI-ht-E3WKfKwUUuAs0AheUKVGJuy0Y6Wb593oWBaoU4l-BMWao9qHJsGWKNUiwSeltEZnyiAVYaoTCMoLpNY3OsQGYGEJ1VMDbuirz63VOy0jr0=
6.  aliyun.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0K7RbYzdCl3sBZ83bSuZ4V7XaHUukrxnpVg-KR_nsqPBizNG99DyzfWD6kOhF3OG2Dq5w93YBMysW3cnrkFMGGKCnLWSsULxCg5aKXnCgxmsjIqegIEsiU4h5YHatm3c4W_nl0OlGHxDT5UwSyA8=
7.  aliyun.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG52QQVzBPdPjwIza5F6EvPJcR0krGZATYV26A73RI5Te0sRDXHUuTX5cZXLQ8VLmvebsGIXaGo1O-oZuMRxWRJBO0W3JWDQUu2C8xeipNaccUUse7T-6Kz0dqgEe6kMpuWc7aKarPlzzC3WpvZ3Dg=
8.  aliyun.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGAEm1AsrFwCnvraDkFeNTynu9OiVpz3I7mHS8MG6s26hZSXnILwp876Gb9sSdrbQcI6LqlVS3KQ85gqinyNe2_-QnWROAL4gttqHqB7ypxgKO0mAFJv-Ez71C_I7_VgdL7g_HILLXoFDwgvTLvfc_7LKRkCDwLsiKiR7L7oDOJqh_jErqXd4N5HRrOZWpclg==
9.  aliyun.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhknLCuHkkVJvvOVsCgUN3EHvyC2rGf7Dqv6ukqsw0w4Xc2KvhpdDiYZErcHi5sOnZ-Cgx56ruVOJ6F0U-GXp7wagzPtZaN1lX-cJWQ_HCqCFFMK-PxhFY3PvmT2xRN9x5wAGBzAM=
10. allbrightlaw.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGeaLXRa-4RTcV0X5x80Hs3rXgPOozQ_wiv53mMbdf42sdQ5hUzGvEhsQLfCDTfH4kj2--tf3xX97qj3HxfT0ZTvGsBEY4ia78yPwLipq73DPHuS7MfDPB5BbkJPsPSo9qFATq--IZpLfKqpjMquCap_6Vnj99Vcs9p
11. amazonaws.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHgeewBUF2IAOwpOHdrZVSQ6Dr37ccEL5tE2OLrEu1GM1_PaIte33fa2zrVGOa2rawu0kMMmdDcD1fODRm_7ikGB94Bn5CcDI1aRGtYNbBGRkm0HXS058moImQhDU0niugO-Gl7Cq5bZeR_7_ctXAyIXo5VL90T
12. anscen.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFIp7VhYFJ8bZLZetEZ8lFcv75vYiVV-BbEFwJnEvJRLZTYjrHcN0sYdBrFvleIhLaWX0Malt_YiVrHOs8EKXC1VN9C35bsNsFyTXFIDGwxS4P3jieBwZf1MNcsZ7-JGC2a
13. authing.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHpsKK9WlMp_oPo52TX6KIHnldgmt4Ca8mXjd0egU58tIL7eD_N5mw3_FToKIUZgZ9cgYO9x5AB9YHwypD4LVv2DTMY0gDNFy82VOvJJRVSDuGs0lUxFl1zD5A=
14. caict.ac.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMoMNuVF3N-gYlArZyDXwtvLLRBbSxhIKR3mIX3vzTnEnMavp-MmvwuU2S3IYB_BS8NVczngTPcjzHuS_gX6XOOM4dT2DYpHv9a2jztVkSQ9dCiQ1MylKFqIDjxP9Lg1MMtcbWzYexYb7QCiEZLHr3DiKKSbY8_1AHI-MM8oSV7WRM
15. caict.ac.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEX5GVwSh6vDVJgT-HbQ9Mkeh8KDV5_6yiCCQio4ZCxPQeEZ8jCp-kUNcRLhMBMfRlZ9AGO8L86o8-9A-EUxwbSYNUZEYbmzRXbcgdpK4BqUV-7a3_NqWacwAyEhusgpy25QW4ZMGUpLmtXc4x3-W_CEZY_oBiUDR74ovujM83IgaGG
16. caict.ac.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF6UFtc_X2M37Yb1_l6K-wrh3qLLYHWDjyP7vvMLLgaUutTcu6bKvksbXVvmhgiFJyBuNc7hmQuZEG7hPslEY6uBxaG9hDRmSxQwGm5zc6pTFE9Fq1GWnkbKHUdulK040V4r2dq23ypARRFfGO3D0FBrnPdjL9i9ieh3uOBWnkoRyyb
17. caict.ac.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG92X_tf2-usR0YnFN7xKGPCCSe-1lVWHkYhNWWGAGDbuv2mGtj0wW6HJNz-hSIy2sWRWoUQLkwPBMv7t6LeRIhWllAV3JndNFXN4NPW-GnGYoUErLs7MPZqHUogPoUR7tk8L4q1acMfGmW5NpCCrkeqXhyiupEaW3JZNohMxFjAH2g
18. caict.ac.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqbjBDA7mKCLQPtjMlaW3Cuv_QtEPfKuxPK-t21POrK-4TBgAbyYewa4vzuOvUy5_Z4EBRhAR0XOYyDC5WOZwgUT8WbiQTRu4kvAIkxL1DUdT73YKXDP8FuhvPUhgbxEi8L1k93CCyicfgAvEkhjeuu-EgZx6Lc3AHkhfDqu29Lfdo
19. cas.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKQdcvLdKF84mfvfvWTSYrSd-RbpWPtgn_oQyJAw1AsCN6ZzYiqV-SIszho0OZDDtDvUiNOgZ0-wK8CPbnBdmSUoh557B2irSGZRwFbqbkmBaixba4mHb2dQF85zCUY0c1K-I_GlBMSjpK7BmRqr9B_DoA_UIOdJ6-OcM=
20. chinacpda.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFko7eOmd1aiymE6bXmbxHt60V7tzR5GhhQMAUZdbxP2is6uXLGiH77uHZYj0ORKP9hrqpDTU4D7z6HsXC_6w-8MAh9b9HIXGqTqMgU9v5OUkR0PrgDpEqFzEEnjZqK0nB1ELyR2lhiLg==
21. china-isi.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF8h00leDYF6mf3_-WXEbpZ_MQeWzvtHFsBmCGDE0pd_uq91-SlMrtdT_9sTjLjWwb6Fph3tBeYGsvww-98OnuuCadJTiM-vBv_Bms5UsTDP3yTz8gh1vndjKykAKoyJFK8ZdgAA0HY71J83pj1XJRrONl9ZnEYfvstPlzIbGRCOuN19ca-90HAmHO3bKcbyD7J7I90j3JK
22. cloudflare.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjFTZG8Nr_sFLHN-1Sov66Ebw6Zc2gaCifEyix9r6lbam8HpTBMgqNz1kLJNGed36Z_CkmN61_QAlTEtQVBcKzjwsc07xMghldfSBN__XsmloQCCo8PGNAv_BXl3vBXSEBqvZmkvFS5vWKi4nW_jDtQpHKp-Qji2tVdAxPFZrGiVE5_g==
23. cnblogs.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQTW5JMzlcERqWdTOo4bJVrgOxRXdfkB5p9G9Hf1kpA_DOkt33Z9eFEiH1Mugd4CDZYnf4pu8Ty_-xapM6SvIFCynDxBctsOGm638MDV4YYViyyH6S-gGCiGXW_73sDwBfB7MG55JBV8xpol5k
24. cnblogs.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF3-7ZbBZRw_jFfuGWEW6kU-WI1EKMRE17B21bXxFqqnIT3hnXtfCz_nGZQ_NrpTl7P0qpdleULEbbgqwWXcydZWdmdD6_p_HnObW3YtaxGY-3oBTBcCtXfBzhVm3TCjr2_Irz67jNrPWiG8Xm8
25. csdn.net. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGpv5QUUwj6rXuevAdf16JrEopJh0nE9-svhu9zlbrxvioXp5eye-JmOAGBB_UJx0NqyVWGdXCuNeAbH34z7MXu5Bu7F8z364FzujVrgKLu0OTeVJYcOAyHfD4-SoBsrTKh4eTUM1odQr37iAqkb3Vydd72534r
26. csdn.net. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG_SJOe84MttqSb_9JEfxUIwDaQxTN9uHcPsSBs7pXofs-LFz4tUUW6_lLgL7cdwgJp7dbOLEhuPVn9m-PBo33RVDwOQobJTCnf5X4-KFQoldcPMUrWLkTza6rIsYm8FKdroOjEyOs9Gl4WGaW0Gxyg33CH0HB1bw4=
27. csdn.net. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHcSmfCrUWaaQZzKfG5W5_zwbcUvzXyrsoNaMm-EW1O1QqDx_JIygsKiKP_TtceO21LhuSFfc6WLhnn_DesnRWDVmAuahbPMasrxIabIYLWsPe4DfgFgm2ly2K0uVLhqoWuPL3zOz2FfQMmg1iCsL_kEAsUgQwo
28. csdn.net. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHU4QBz9SYSvd6y-XTFDlbFIaZ6Rt8VIMrz2cxteP4znIl6bWsJcId_Z6dFdCZ8Lx7M4tgBCexpH4jwBbpPRQLmt3FEbVis9k0JlIIFD8DwW1dihXt1_vPFz65UlYKE_1WjNd5lX9loS4PlTbQu8Zy3L0vU_0Qn
29. csdn.net. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHkrQUskxJ8fnM-jgtj2hoyN5rs-Pu17TYn8TPXA7C5lcULl50c6nOAal9JUjvizinQz-mNkYfbNiZLjMsrDCPbZX_pCiVzykpQfkswxHdLJE4xLhb50fs0Nl-SL5l1czQ-r5R8FqanLSd63H1ArRFOvIIAERJX7RA=
30. ctee.com.tw. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFg5K_tyrD6otuEOx4qgTu2CPkgw0seOmnlef5vzYHXTgvsccHIOrEsnltnlFlEFtwtxaHnlNFkTVwbdLJGiHAEhRGtJ0QnwZSSgWIoQEm23pRsfCxtJu1i7wCao8mNbmQhbRG2PH0kBUwPwM4=
31. cww.net.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFroBUOW3hRXq3N7oWA8XE_q9dmw36bfEHcOXsO5dYXUsDo2ai5H7Tbmnm-_i_rablF2vjEHWHzP2BS9a9vmgIabsnH82PHIvHYymVehBhLiXsxE1bRyBNfo4MtZRsLKv7hcHo=
32. damdjt.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhMgcRKduQK-XYiTtZvuDPhz7Li33ByL5i7YwYO-fr94f2GiqvNNgeRX8483f8vkJPx_tKlQW7AgOhnB9Zu3M6HXKeUcAAgKBCwuDzweii7jGTfkWFqW-UV5UoXz7v_E27iPIgDoZTJp-SkWx4WUFP9EeH9EHVTCmXLGk8J1D6rm4=
33. dqsglobal.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQErJV05CkvNysI2EBDXRL1YNzS61R-OGVWWdbhwxRa8T7t63tWoP8sqTazE4E_gyg22Q8nx54jmVePknFhg9NuV7GcNxNj8tVSXEvHJns9YY2zscOJF8R9Lb2JHRX9Q3zIFLdQixJ55y7qCmYYsv8FKHaeO1V7cBh4upms_iZKOx_lj0zJ-D4VbQ3MMD-xvLgALxT2uW6CN2qZLohnjOxDZAYvuLNzi-0VXfauObCmdKHc1pHlvjJ8_4U2dgNCRkcgSVA_bEIslsFjWl6zFtPWlB98gSIKpR7asaPWPp10xIGn27cnBXgcGLPS0HgD8q7eTp-Q87Y7e2Mn27IkPW0M8R-aZkDNxcsRn4pEfr73PuznzV-e8OOcSBUoIkIp1q8wxyr11joQ=
34. dwcon.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFa5jUZVAka0OIyPno7y-HrVgYu1kaFZiBy7t4ibx2TjS2j_UovmMyCmtTZbj_YUv3kiHi1lHt8aC5pGIhhxMfpILuULJaYfGcdSkaAg4luhkJ-2-Zvw-YcFQ==
35. elastic.co. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgqXdz_EhagAC5OdAyIVUGMH_tcBO3ihi1Iy5I7RRGyoabWyXD7tGM58t1aofGuZqviY3OwwGkJ6Xhld0Ha1uT7RaBaazwxRxtBiGtf-sdNnUsJkmZiCg0yXlTYrmj9LBRfX_9TyJSBnUiuVG8gw==
36. eyzo-sz.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGn5UqnZ-ct8Tv_jwR6zoL8GJrp5qXTCkx44MRDWL8Nv2s5yeZiwczP-319P_GrjGWXlVPD9Vqi16jseLGkRfZaRA9__eQcPBW8IXrA8sARi46Ho-D06zPElwrGUJC4
37. faiusr.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMRTDCcAaSufiGZCpET6aX4YFLxCg5zJyBMlc8jTLyMPqJrL5MssfvjFRDXM8pJK4iLMq3mFavuwxh9TXqLrjdlyRjdyuwqi_YU7VvrTiZ9p0Tt_dk8ajn5Fivt2V-a6En8oAiVMw-xrRJtdekCb5zByPSluEKD_LI8dlPHMfV7A==
38. faiusr.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGZYV5A30vn2_4hiAs0dXGO5bT6GWXIY4xefRKaogmQZZbX2w4Z7jPMB-ITK-v8c1S8DPErjwRbGHB_fmPP1NzYEXCk9DUHiXam7QinRcPI_E3DQdAJv2ryHdwE8PrnzFwRsMzstvmmNmXRTfI7cLKLx5IuqsvFbMreC8Hs4160Nw==
39. fanruan.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEx_U6nxM_o3BJpois8XNRRyOw-fj5Sv86jtZJBVlgiK57iG48lbx-WUDD7t6i05DmUQ_J6TpIW1zXey5Cly_k-hJXOGf7rD8QX3R5QRz3QgbzBeGAbMRaKs7qU-EoadVeOnpGs8nfwps-3Lcw6pC6V_E0ZzEXJmd8ZqSTdAQ==
40. fanruan.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEeP1pK6ADsaM-psx65WjSzfoKp8n-dNOhDjOcHYJS3HJG-AHvoG1bl2Skc64do4eEQEikZoAX-rTzqorgXfuFy3TsYj6nWx1ynRdkQ-tlcogRPiMUSB53hCQCDX0ltL45DaXuKI1UdHUL0RjhKUA91FZJeLFr0rAyTRNYKJw==
41. fanruan.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFK2g1J1x5JR4eUW2cSJCGRPvK_xpNTzDfzWNUPCusAnVnPiF6kDBPyAqyCiQSCPswcLeA4W6Qp0XvC2ezV3nyxDG37Tq-QaTnTUM3UZ-9qTrLHHQaKIuB97xTV7mZFSljNX7anjYgyJ3umzlG_TN69I-wDhlaajOuo4Jfe0A==
42. fanruan.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfAKclGxmIYBXttiWJNkGiNqtn5t98oD1Nsi7BKUElRlVxOjfnk1ykly1OLMq8oaBul5yz4zNCQ8qiYXDIk8dAejzjE2q70bSYbFAZSilNmIQLrXi4j_mWARhARvwtAmZdRIaNMhXb1hDJDezxoftQDIaUr6DT0GlYMlDLyg==
43. fanruan.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzU939pcSzRrytglRzJr5-ffh9J88H57-2HjruV-nLLIZ0TUBmvQmymr8NvyQFaBX4OcS3XH9mi0h7QgZ_xYjinLvqo_7mIe8cAS-UV4MvQcypAexI6mpQJYhLiU4y1pXk9XTaTfb9ry_lA5vfTKTq04H6sUe3MueYiaw5Rg==
44. fanruan.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHYcWsAJoILgcrO-t9FWb3e6AKBI9p_7WafuEit9SUpuQrSEzGgOdjivL8VPqnPQjoM7iH1CDPju8XxG4Rq-X-4Dc66Nl_7DiIn00hjC8wPd5yl4gH8EufuxLgh8-w35EKTz36lAAI_wMl22bCU7wfODhwVp37frjpbTj_vZw==
45. fanruan.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFJ2hf5Ya5yC1nXKSQbWSDNOMyfdxruvY2zqJT2wED_j7cSOVoplsh2-rsllmjR6DT099enETqGnEhvLxDY9E4lSHqWfkEHQy8gAR4Iimha_ACMTy2prRyRiKq5Pz6mujwIy4DIY7tr4w9Y_F7DlctxvtXNi5OW9aN1I069Aw==
46. fineart-tech.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFsJYrXNLzvyNDZz2MvLDCCILKcrLtjzcCDFlDQ5-f082ioB0otuEMFLwCWpw0fILuChhVLQTSlg5uLML25IY0ue_PVwetybEoTmu1735kaSafhkLkLI0UmXXt_wK1WpU9MKU7oALAsypUlNSpb6gsyPIJk4MNb_l6FSDsJns6yaO2hU3nxJA==
47. fineart-tech.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGqVGxLQOpk94a_JNED7Ggu5oPOEcNmzTrY7op0aOTofXruFF86qxDPvpfaEbCRjkgwr_ErGI-2h89Fzv4VuEwWYoHHutwWPeJ9-ZFytw4cZTHgP_UWhA5kUW0E_28S3qCDmup2c8RqA40QWFzFK4eE7n_Wu2zv9fEHK9Hi-i9MaATJcIryGw==
4- fis.com.tw. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGUK3KbHYqrTII8DPRC8acKBYO9t_lYeB0ypAcGZWTJ1AiJHm-zMDQkH1MyREh6CpyXzKUALOe3YOEfpLmafp65eH6JQ8kHQOTPxhVj58FSCq3LA_PswkM5HW2xWzU5gt8WqvEHVIaXF5lkJ4LkpzX9SHvmLbLCPJLI2BGl3UMUuDhPL5AZJwuH09P06icPmRH4S16I_HH3luUajDoKERZ6lz1dslMpfT-9HZQoxo_XHIQ4zP5nTmFblX44EdZ6YeWOIuzQOeG-qGSMfuZot_VlxSc_2N08Zp4kHj8QRPAp7SElY4BUG6y0W5zms1BmNSxUOemLfyOVy3WREha4ZsTwKpc4hXDJAighND2LAaTK-mIIXl35ysU=
48. freebuf.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGXDx-OKl2PQ_h4PX1L_xeZc9Pg1xGIj2k5NAUq7gZTvsQKV-Pf5_5eRUh90J2AkrxZqEJdCP2zC-Z1doU-vP6r0XLVnlg8vMqEfcWqwt208nT7g-ROos5QLPBmQUkjFWe3hQVM08jkwaPlAae81s0p7iLlv2g9_Q==
49. gabriel.hk. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFOZwlB-Ss0C343XguaO_Nq6koWmwSCIHJtj96yPHiPHlj8UQhMMrPVtsnFrBVGReng8ECHdxIP0uS10dcUYbIx8xKeB9gi_QY8v6up0Zxj8g-JJI5d6V5N0iuabvChnI7LDHch_bclVj7cULiMIxNfz8Ux2rWv9WJ2GKoYKvVvom3vtbhiBBMT0GJa7036a2ARboq83hpkosRJ
50. gabriel.hk. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_0SBbHhv6Tlpyc523aLdR3N4VM97A_Dgycx_EuoK5lurcPw1cPE62tDgCO-Y8VybMfs7v-0p2jWSp6ItvJMgpcGATicUqmXI6CxW6GtQ1jNIrxOaidAC9wdpBe3_80UPbHhhNggw473zrm9Uk_pdjOHGkVVinc4jqqi_Tu_ux7zIUGweGc5IA-XwxB8iWTTh5jHLhGXMHlxaE
51. gaia.net. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEjm5T8NjKVdYteiaB1fW9E3wFTQ3Tr0Cd7d_QmIKyce8-KiM-KiZkPWfuaAd0evY7ufgDaT7OJDyxpoZtiT7p_JppnLXpFBrvrFn6T-4WhFBZufZvl02r-y8yTLOv_hfvfjTYa
52. gokuai.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEfVXLrMub_CGTicRkowKEATk4YOXc39stV8uDtdRBRmn5hnFP80Nzq-UNp0eyVDYNsdyAF3TQNavo4FLgo4oxJ29OgDkxlApxaaa40C3uWt2CKOPiY4AgBAv3nl8E=
53. google.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8l9I91W11HCX9eQWuh41TlKMogcjBLpso32nOfk4fB0XDYMVzE0v3sE43MTxGeXTsGH0jrA_cA1PwkJ2erzNzRysUuVBzMLXzYRATNW0r12_lvZ1ZTcb5FpeFHi5bTdL7M-M3JrF3Y-yiuFDndq7YCXk=
54. gss.com.tw. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjIz_Kbstb32qoi04wv1sSgXsFRpidfexAm7Lick90ABmB6wpDYj3wPMF6K8gL74oYiM-MDgYB7SCw7nKMHmNYRxFdXZl70FYye95-YIY54fT6hchi7x8xN9_owq9U0ZPyjX4enbv2EM99-2-Wxw==
55. h3c.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGcDCrDvlYryIDVHpG0LZ4M-OtlNYTcp4-I09CW_56GKXeRVluXqgF1l3JVYhqQAjT6IIbQj-OOiGM5xoOwlVIPvXqtu16ccGDSbkcctpl7POpPd4FR6VryAVMe3TOiaw51fmFk6SlQFwaGRikg4xY=
56. h3c.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHpGNbeCCYMnzNhGhJdWqN5R6atWr7WDRDUl3VhTr_CuT5y0BJb9rddIeIagSW3sZhndcdvITA01dkbsZ2gK8LDyjWXieaKYFUWtjSdcB6PlhfdHNhRF_K81JQ18chbABXb_W4fKgsbhS25VrihUg==
57. h3c.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFthp0fauN338rN9jPjmlcuSEk9dF0IeUTbP0zpYuaJbQ32-RtC6G1tOdM74AG36VOvSPXqrM64P8JvcbXCV93IvGwaqNjrViTSngJYBY3k9tyRTcQKGgiZIoNwGZ7Pf4uENNHgmuhtjjBMupfVzA==
58. henghost.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFVtHbDyx5rH_F2f7RODVzwnWOB1V43av9_GNqP98G41V38pVwH3Gz90jBiOxjn_eM-YzhKJdtCMojsUcL3rEvXN3GYIkGFZi888ZoXTZUcHjj4bgUwiRblMjTTR2pChII=
59. hypers.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFy0npNjsr8DTFhHUG2nHcF9mU0j_9nPV4nipwwcB8SceW-5g2T-1bPp4Of3-V63ZVWDRPiQkEurBd9pfHpX9AAErptL-zUOVySUUU6N244SsCuZH8IGNf94WhtCOEtyU4Ft7L4aZAH
60. iami.xyz. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOXbSzub9oPAienFvDMtoEbABKs0yxS16i5vOgSrps9BDWxfpqs8liCZg6XnP-kwUFo54McvkDZyY-z_ktOe1X5HRP397tbTfHoMYyvwI0N0B6JILIXqXDjSYmRl6G3SdEjFgWUWdztLFf0ziJsA==
61. ibm.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEv7ZmsLMhneLQgiTpyYPP7YMsYYvJAHiLIeRdwJws4pLP-nNMMuyzxBaCc4oSim65pbRlVZiyEaW6Io9YcAVqMgSDtIP2XTvjWpjo6BTh0v3aKa6574UWkqgCza8H1txGxrGhCO6zG1a5_2NA=
62. ibm.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_0vZkwPi3I_9iGtRG8mXko9ZZhKUDSGicY9UY9hq2WPny4uuu7GpYWvsSN4IEyWzkpcL6wUPs_THG7gRqrKlgrhmJc3sK1ZqWpgL5pAvgJN4gjvS9qOx0oakKMPQsAp79E-aqMAMlS1aELEibJjFBWg==
63. ibm.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHyyh_8V__dA72bR7uIO0MHYt-hCW2vz7OkFaKMFcZsQD9xzsPzaGzJ2XGVWc6q-vncKGZ587LkE9Ad2UsYfcHAIa0ZUEthvjMhyOh5rEB_DufL_mjbXExhUxjN4hEEyda5WIVPD-DGU7F_i_S8rOEVGoeGAzl9
64. infoobs.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFTBSqebpxwnl_fRYl4CmZBB-sGOQbLLW7zsiwg2poxKWjN0b2GmeCeQI3JwHHd4ZHzwWAcAmILa-Mi1X3JiqnaJl6DgyopHaiSMSzVQdGYUpS3M7tF3VAD9ocRosdTHvVhjgthUB5q3py2a4aAvg==
65. isc.org.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFN4ouLmZKPus81XaV_SS6X1wSMsaIKkUCAOfMZhH1vQBUp74XLf7ay2YvncvNSBj-DeBPD964du0WnEGTq7vcCeuPpfEylzWO97uHOMmR3oSIys2iCK-qrZFVVn6c771-QeKJbyjdrHrxvEBlJgPoumZk6_xEZ8dV4U0OwPgBAWxPvf9ad5i4Wh25zSdYRNDKcxvFfuH0=
66. isc.org.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGUrfFskglYEAbNhr9U4fpa4H0pWpYwGEwgYQHY7fvHSY9O-CA2VGIrmMlCpszMw7vjdJl0y2c-vPwEtNS1efU31DGsri-zYfItBsTLQps9jkc-ad-x7Vsk8XnanGiqu_-QO9dGIoOVywnlva1Tyskfzt21-VjVDUjsG2FYS98bv0NmFFOnEM87xUaH6CNgkWAqBYQnRKY=
67. ithome.com.tw. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGnvYMl8mW2ehlaICL-6HD93bZYIOkBi1nG_msmUWM3pB7FHwA7E1Mke0JAX5gar8xfUXZRSBHcD2wHhSWqpbQB77G9IY62tgIc_atM9vwhj1zKnxFcxL7jpAoeo4fDy24=
68. keepersecurity.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEMGgdMjALlQTTRSANu_e1ZyZoYz08NjDOYWKHjJWFX-8wZ6Dp0d7x8guWNpWU7SVT0i0ijZ9IL7H6orlJO9n5CmcHNioykbI-uatAoJfIeu5xwdY7r7zcvFitXxEFyer-y_EDZr8DFFSdqbhn5d5Vg18bUlIca-synJT4B11tK_rhX6MjstuIABKlILJP5PR5yZEB5-gaslnxnDPI7qrqNk2rbEcpPvPY=
69. keepersecurity.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFVheqEgNKntPTtgmzdBkRtTzxGLHNo2FtEiXEzvE_mZXuIuaERXEA40P18YR7Lnj9ohtiZsVUMcQaP4hd98gBsPwbdXoCmz8ycBRSiSjqUJ9bCFh2ntoRTxkjXZID8DQ6AcyCOMQQ0bWhDeO6YBulKWgqymD117Az9hvg2Jx0sbMjvU3dsA4-tpnsX7uDWoGBsmoQ5fDNdimFTBwYwtCFXRLHxBw==
70. leagsoft.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEbjjsApcChmxEo25WFnK7yG6Wp1qHeWMHAW8xKXVM5eHkTYdKHBXYvFI1Pu6weYT1HscNIAQspZGGh7lFuWAlVU1J2sey3Eq1fLDYaCvpBCUE8pl67WC8hCb_UUGalpBkKPI0Se2I=
71. longshidata.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEe-taDPrL-OauEn4duF7eC882PbvzYzyOPcOothuvYSey6Dmkfx6PXHgXP6IaQbMOub1PwfWaBSWmT6EmBKpjUwEBhEZa40HEP5DfeSWS93CXPobMtWQJv7cm4xaKHs_-Ct13CKX4xIS9IT3c10A==
72. longshidata.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEPrTtTQFrwUt5847P3lbi0NPAJKn64XrqYQmgWKEg268YWvfL48H8SfzI1uT5lbEKjcF_JAq9qjegc7chBmlY-l7Z90s85gQLlhlQeN9lsVXKe2VbwzZJcYP86bCQQRcLFFZQcWyctKojsVyEJMw==
73. mchz.com.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFoxcdCpUH0lBHvIbuGUOcwoYwA-k66QFdYWixTtNlpLEE1mRmeop_rb-i-76mOIm1S4kqu6ssVMODRrDAJmnZ-yyK4MSPeBa8vDWmQRz2zpz9CjEPuUrc4mHkE
74. microsoft.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHATRHw1cxGh56dJoPahs4G3eIdpQO2UmMh1WMWW9DugZ0vlEx2WiNhIIlu74MV3-bpq8O2Js87HAsL_go6bpH35KvzWQRz6q-duUk7ldTy9DLaTXFgdSf2gczq0SrihT8aLnEAvbsAzY68-n9YObk6cyXsxk9_UlFHSTjxkzGa7R5bw6lwt_DQA-r5U8TXPqE=
75. nightfall.ai. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE9OZOfWP5cl5J7RV0649CM41O2CWyj-F4FElijFO2yoL_Rs-dBmh1HKM2Y52Y9N3PUDvmt5nTWTTzZLRQsCAkOrW5QgltB04jVPacUoVwqhDr3TI-GCWipYk3bCsl8OkBrywNudS_wWPyteKHatCmvLH8Emyp1mWQY-x_Kem6-ZcaVUCWlFUFL9fNJcGyzluxeog==
76. omctech.com.tw. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEpV1OSL657qpOUu8t84ISrsMpAcC0QZNnpvSWI9wnky6sUSVA7_LHE_1km6jCjrbw9iuf1bAFxprzeA6oJUyTkp3yVgpU6tHgYb4M-8y-AAB54pln-u1seOQi_hbI9nMMKSYeL-36noD2h_q9k
77. omctech.com.tw. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVW_1PTOlabeZBTCejGF8AgB_0bfwFJxaepK1XEO2qMlGbdEmxxqxGfZ9dXCMiRdivo9MR1-oeB3IeBzR4xAMBguqZc_LlsXNVj8XUsiRa-WeAVd12K4lt-0rGsl4YAVlvYCWHExHkyXqX0h92
78. ones.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF60I3y_zAVw3O2GnJznp01Da24ABKzydOXWE72WKEFhiUeLIN0WSOeiR8zDupLsByHWpADRV9mt_exZYzxFbevQOEVsh55fZQSvz3I22FL3Fd6lmaYyAvO9FZf-6N9K7F6OHH15GtzWCdJrLcrt0kcLIq7y4mUsX0qtOn72EKk-SWLWuk-kwHhVotgMHeju2FgTsJLxzGqAkV9
79. openfind.com.tw. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQECdWxpLQm445HXgXqk4CLknAYFZoEIlTUhddzipLE9ebinYfWklBEjjPYtskRbHEtglYxVUhCRMuXu_syMGwpBES1bibvLaEQU-1i9rHeNZOB_Dw0VwoqOjNKb6xWvvwFyY_RRlswfagOiwrEp6DUjIaJHTai_796MMvc=
80. pingcap.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGpeXDZ7Gb65ivdintdotLJMXHv51pRxTps1C_3S9nK2tHVnYooku-9ylBmRSL2boXapbkl144EDi8qlskPD-dxkG4qZNsPGSWtjyyImo8us-WXQ_2hhvWPJdc5BvvKu3t0cahO0M9YOSg=
81. qianxin.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlF-D34OHcqk0KxgWibdk0HMHShnA1xYZigvDBIIoadYqycX7HeObSAij_G0lRlF709_dW2dWiSsTabRlv_P0PYuq6ZHqCXvvMwDfM6osy-Fh2588GUN9N9CxDwJJGe9ouEIf_9RB0SDk=
82. safeploy.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFE7x9qwnNPuIvZru-cF89ASsGZQdUCmMyDxaWjYQb3T_5kZ3541gj4dIZv45U2eudtFeiY4YR_KmdBMqaJ9wndMmzz78giT_WBGWtWubg8J_A4mP8bGL2TuPKIv6PeKCSNZF4ordMhYeKRvKfEEGvd7D9PY-Ap4Dxqy294qlS2xqA86PFJOfQPm6wUH-w2cZZ448v
83. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7u7sHp_o_0jmkAm-v86MG_b19DqxumWzU4JX5mw2KHmbPNu9ocbZqllVDgrUlbypTTsHswUQsQLaUyjNLI5Wq6EYmBjrQ2p2tPoqVYzHsYD2FkDoO1UiRa_Ui2UyMPHQ=
84. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEIKo2p7RUTQ8HC_zR5rNbAKjZW3Nj9D9BV-pu7qeffTApG1S0FEOU1sl0JTMJSbSfTsPKgMd52bMWzO5SSNC9-4OmB80WV9fDgUcYdCbrARoyA_-oLiSiZnueU1P4sxsw=
85. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQElca29zROcuSZ8EdHLQakFUop7M8AonWusMokpMf4FLGg7yrY0HKleKAm8aKbF5b8q70EYAHVU9Jd5_4JP3NFL0Rr4WKCe4T3HCfpXs7rGBEgKAR3kdaVIvpf7E7emXtA=
86. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOJ9tN7xLHpUz2xZDdMrnVHLZ2-J_6uT5A1rDHMUHCxlkFSE_HTezh9os4C2dF16Uy1EReUhegO5iy_2Vo6LZfXtZlVu2t8oW3GzSPP_G_7OpVFubL8e7eGM6IXQYu1g==
87. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5vwRWu0EaBZmCsDmreWfHNUqhn0QgLjNsCZ-8gFtItJUGDzlgbAA6hvtkVVjAWkJgn3i66q8EW2Ns8OrkyujEjaIMe92wiKqUvlCxDszdrbfabN5NM9VQufNH8j0HqBI=
88. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFiVHXYxh_7ZmOyTNjrjO59moEOSltUsjIwvTgj0QoMhJiQTstv63hUY6_QyGeRKgbkaG-jqBMysh17zMnPTmsrGMXM_mLPXAps8hEW2qtZPgIwvvYDZ8ECpn_RLkxw4_g=
89. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGYN8On3gPMwz2KMBJjJS_YFKrm15griYgeI8Iv89LLJGECEaNFg4AiX9OZTjbfHnhW5gzkBHWIa07Kb0-Mji0REHFJD79I2qmMnP-FCp0M-ZfFSdW7XlzuTSLs4DXZlU4=
90. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGdyMUr6ndkOIIYYPt2cCwtZCk8p0lGEJxZa8O2bUAqRljYPtF4WwwFRgJWF7uFCwIfTbiYioB1-3Z64w_QtDJADYBQZrREEdN6fDfMGRrGoG4eqGyGSU1376Y7cnuqOVKcm1472ArlaA==
91. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvrJiaEQyanFjSCxxvn_vR2GcNy2Jm5OH-Hkkaoo6XWZTUm18Ce_KQm2QmzeqFsKmY1mTAZRz2rdB90b1zpqIpqhvy0GEGbb8LldaqKWZ6n-methxoGHqRkTzIFnMl6SY=
92. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHKhHX5s2cX5rpXEgWhPCRgXyjczf8BHHR0LVc_e9_iVMX3XUQYI6zyNKYY9Fk1SbywBIGCgpSjCaVoypxW5iFaYJAzPaf71a7MzA0VX85GgTHbKeUHOygqjWlA-RXWQPw=
93. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHUnWmtqAIa29DdMUBIQl4UM7IApayEO-U6msDY48c3ncWnYb_U4wMC22t6jeF-Kizl-pgkAvKct-zKLFMm9XzXWRtVX2oVJbWKopWLfTEyxs5PxRBSUvbNTy6cMQrp5g==
94. secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHwNHaw8J1AdwwoHS8k9-hRP11PDiiskjsrhIUiH_0I9P_TxLAk_1I0TQ9nmqMpM5FGJqCCXIqFGktlUxEx8ot-23MPafYOp5Ok1xiUVAWIX40FGn0hzx418S3E-SpqG4I=
9- secrss.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFPEbiJzDCpEwt01rBB8PbKGOxA7VCDq74N789Ud23yDZkETwubQEaK5CJeo2aBOrzBLxKG2AabyfHAS2H-1y4FzzbSYisv4Yx4zXusDkIhniyT-KagJeaaPwp_LcD54Go=
95. segmentfault.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGSdFQLig5Iy0YQNn7ztOpHCdpdtPvLtvTi3TyovdmyOjWQ5cYy1YW2GYi9tlFNIvVvd1n9FNDIRzvGSZsOZR5TgumQDSJo_ENE-A-dSgu8-56dWu_YBxEppZRMd14PEsjRVEaGEso=
96. skyguard.com.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKvLmYclj84eSk0DYU9t61DSVvOWeQFOwPQFEx8Z5NSR4m3oIz5EOlwEsBauCBIdo9UIiJAmKqdPsWzVxq1EMyBoihjPayDOpg4dEwPTiP03VV7ShhG4xHSkSHoAcqwcMJoH-4aP7kEA==
97. snowbeasts.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfPPw4BLUKHHP-l_SawcItggXUJllk405OhvYKw_T87iaIt3rJebwvAPOxHrxy18Nq1L9oFSmdByQ2A7dWZhy6if1DRbjij2eykktov7HOFcEvYRfJxODpJeYHp1sJqwmcnjQ4PwY=
98. splashtop.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFtNpJ2r1boHnbOIBQw6HiO8VpNQS05IvykjQ7sXCatRfY2uycKIUs3pDtIQUr59xkDZhabfCa_8mKNUtfxScw3kSAGwJNSUOSkvpVLcxhzMabQvelA-ssbSIRsNxoROHwOt75mTfO0XxUdOsc=
99. szandone.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHyv4CkCnS2UULk3O0GlyIgpn2TNtipugbI8gz3OmLndw_uyUfKt0hV4QRpM_ykRjxufK1FwuW45i5Y6G7ZT3yVzlkpuLovF5DLa6VR7OMzqF40Chc9n8k6GfIKsXwsoJrC4QHkyLU=
100. teamviewer.cn. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEY2lFc1oIvwVRCKlS_qYNJJRcFqarxGIfc16XySC4ewnYkiJnaIUWKtO5ZOMT1Bm1_mXd6kGSJ-JXn8ByDl5Trjl_VMiam4WVMutuSCnNKksokRfSWMmBL
101. veeam.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF9ez0vC4WWZSmVo93B5D6V0aEYxL73nkZWp4bRoIN8BF21FkCS2Qc9Cr7f1MQoEKmPrY8b5j9KD5q0RkFl-g5JtfXbqaOTu8hDGoEhm5hBSEA8Hr_p_tLQO7MagRK_0AY4uWym9ofA3M_GyMnmSkA6YCifqFo99QZhZbnLZO2Ko2De87vz
102. veeam.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHoGQ8Zz8nthu6hIkITZrj1jkO5Jbtkw2JVdKQhh8_xcYSD-0JdUFgJDKufO_HfDhc1lPlecXmLqDH7ACuakshofWNk8zPP9FxpkrRRJIoHoPi0T-tvrdfY3CWijehjJFd5YPp6I4CWkvhUJSqunnGoq6WrNzqu3gPtlj8liYpNCA1n-r3D
103. vocus.cc. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7_qN7XpOKf_UjPDvuaL1x4hLuc8q8Gl3dq4kttWdEwVSuEvSrrhgf6rHr-Cf_KNmBZZpJlvWJBx3eFblRXuy8WE1ciU1U0OXfH085xe7ZG0JnLs8rF1EVfHlJ-cyOSKfVDlc45FFd1Q906bc=
104. wgj7.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH_EZHvv_kgl5DXwSdl-DXXxUl5u2MMlePQ1bQEx09bA_rTNnO430V1Nf6sj_QQ7W9R1L8noyI-_06Pqoghw60cB5MUh8KmkwTgwvE50yrWVuMyfQasjVMedEyKPOQ=
105. wgj7.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGr5piOs_iSkXVPiFZVMF2V4UMeP6I_LjpIS1OaJTHbdrbya3IvgNLIWsuMFRzq0BAAVVTpkBwqXfwbBf8BODxS8a5lUMugMmNsk7FxTEamXLBoz7UIbMCOTgVJn7Zn_A==
106. wikipedia.org. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE37KGDMS6aHEhl4mMDToJiaDZlPrBRE9srM-mT59r_QoYe_R54rjuNYQevZXG5XNTe9p3ejJwOLCzhAml2fM2qWrKTO9IoICT071UOUCwd_tm_KPBtDYpO7gUCdBgMtPc8wErJRgfZHq_AH52ZNFUaJ5RK-BdEY3Ejyvcak8JFgCM7TDKrdrm-PHLVuOmWPaIhzAzG
107. xuekanba.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFIu5zu39cF7fN4XIhZkxoHtdYB2lLLGEJfLaoDyrLiVmPuVKR749AxRlZ1VEZRtYPfXvjIpJcDTkIuNU-opKWDqnhn9Q3FV6OhL7R5s3HsafAmp9Q0G2I8n734HV3vQsX-R0bU3RHximQ20hkpv3A=
108. yuandiansec.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG82NvdEUa8Agb_qJo-zOnTe60yoSn1bVNIqTJBbjm5PDthcth40GpRnGbntRlQETefw0I78IRfrJiArfCH6MGZTDHAFrjUTwXDzRp-y-mOlDchWtGTtWBBwz1URAXG7iplpH2Bo2A0SWKjjI8xvQ==
109. yuandiansec.com. (n.d.). Retrieved from https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHNLkXnDylmtrZoBSO4glzDRmcuM_JE1FcGWc1xuGEySgPGzBVDlMFWLupicNwWP04qRPbQWGeb7x3naa9_9n4dESN5N0dvekYKlNoHDtP4BTHy73U2Sj0pPsiHYb198rXag-nd