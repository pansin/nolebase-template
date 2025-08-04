# Requirements Document

## Introduction

本功能旨在创建一个自动化系统，监控笔记目录中的新增笔记文件，自动调用 ChatGLM4.5 API 生成摘要，并动态更新笔记目录的 index.md 文件，展示最新10篇笔记的简介。

## Requirements

### Requirement 1

**User Story:** 作为知识库维护者，我希望当有新笔记添加时，系统能自动生成摘要并更新首页展示，这样访问者可以快速了解最新内容。

#### Acceptance Criteria

1. WHEN 在笔记目录中添加新的 .md 文件 THEN 系统 SHALL 自动检测到文件变化
2. WHEN 检测到新笔记文件 THEN 系统 SHALL 读取文件内容并调用 ChatGLM4.5 API 生成摘要
3. WHEN 生成摘要成功 THEN 系统 SHALL 将新摘要添加到笔记目录 index.md 的内容展示区域顶部
4. IF 摘要列表超过10个 THEN 系统 SHALL 移除最后一个摘要保持列表长度为10

### Requirement 2

**User Story:** 作为系统管理员，我希望能够配置 ChatGLM4.5 API 的调用参数，以便控制摘要生成的质量和成本。

#### Acceptance Criteria

1. WHEN 系统启动时 THEN 系统 SHALL 从配置文件中读取 API 密钥和端点信息
2. WHEN 调用 API 时 THEN 系统 SHALL 使用配置的参数（如最大token数、温度等）
3. IF API 调用失败 THEN 系统 SHALL 记录错误日志并使用默认摘要格式
4. WHEN API 配置更新时 THEN 系统 SHALL 能够重新加载配置而无需重启

### Requirement 3

**User Story:** 作为内容创作者，我希望生成的摘要能够准确反映笔记的核心内容和主题，这样读者可以快速判断是否感兴趣。

#### Acceptance Criteria

1. WHEN 生成摘要时 THEN 系统 SHALL 提取笔记的标题、主要段落和关键信息
2. WHEN 调用 ChatGLM4.5 时 THEN 系统 SHALL 使用优化的提示词确保摘要质量
3. WHEN 摘要生成完成 THEN 摘要 SHALL 包含笔记标题、简要描述（50-100字）和主要标签
4. IF 笔记包含代码或技术内容 THEN 摘要 SHALL 突出技术要点和应用场景

### Requirement 4

**User Story:** 作为系统维护者，我希望系统能够稳定运行并提供监控信息，以便及时发现和解决问题。

#### Acceptance Criteria

1. WHEN 系统运行时 THEN 系统 SHALL 记录所有重要操作的日志
2. WHEN 文件监控出现异常 THEN 系统 SHALL 自动重启监控服务
3. WHEN API 调用频率过高 THEN 系统 SHALL 实施速率限制避免超出配额
4. WHEN 系统运行超过24小时 THEN 系统 SHALL 生成运行状态报告

### Requirement 5

**User Story:** 作为网站访问者，我希望在笔记首页看到格式统一、内容丰富的最新笔记摘要，这样可以快速浏览和选择感兴趣的内容。

#### Acceptance Criteria

1. WHEN 访问笔记目录首页 THEN 页面 SHALL 显示最新10篇笔记的摘要卡片
2. WHEN 显示摘要时 THEN 每个摘要 SHALL 包含标题、创建时间、简要描述和标签
3. WHEN 摘要更新时 THEN 页面 SHALL 保持原有的样式和布局结构
4. IF 笔记包含图片 THEN 摘要 SHALL 显示第一张图片作为缩略图