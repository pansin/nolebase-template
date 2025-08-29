# 自动笔记摘要系统

自动监控笔记目录中的新增文件，调用ChatGLM4.5生成摘要，并更新笔记首页展示最新10篇笔记。

## 功能特性

- 🔍 **自动监控**：实时监控笔记目录中的文件变化
- 🤖 **AI摘要**：调用ChatGLM4.5生成高质量摘要
- 📝 **动态更新**：自动更新笔记首页，保持最新10篇摘要
- 🛡️ **错误处理**：完整的错误处理和重试机制
- 📊 **日志记录**：详细的运行日志和监控信息

## 快速开始

### 1. 配置API密钥

在环境变量中设置ChatGLM API密钥：

```bash
export GLM_API_KEY="your-api-key-here"
# 或者
export CHATGLM_API_KEY="your-api-key-here"
```

或者直接修改配置文件 `config/default.json`：

```json
{
  "chatglm": {
    "apiKey": "your-api-key-here"
  }
}
```

### 2. 安装依赖

```bash
npm install winston
```

### 3. 启动系统

```bash
# 开发模式
npm run auto-summary:dev

# 生产模式  
npm run auto-summary:prod

# 或直接运行
npm run auto-summary
```

## 配置说明

### 默认配置 (config/default.json)

```json
{
  "chatglm": {
    "apiKey": "",                    // ChatGLM API密钥
    "endpoint": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    "model": "glm-4-plus",          // 使用的模型
    "maxTokens": 1000,              // 最大token数
    "temperature": 0.7,             // 温度参数
    "timeout": 30000,               // 超时时间(ms)
    "retryAttempts": 3              // 重试次数
  },
  "monitoring": {
    "watchPaths": ["笔记"],         // 监控的目录
    "ignorePatterns": [             // 忽略的文件模式
      "**/.obsidian/**",
      "**/node_modules/**",
      "**/.git/**",
      "**/index.md"
    ],
    "debounceMs": 2000              // 防抖延迟(ms)
  },
  "content": {
    "maxSummaries": 10,             // 最大摘要数量
    "summaryLength": 100,           // 摘要长度
    "indexFilePath": "笔记/index.md" // 索引文件路径
  },
  "logging": {
    "level": "info",                // 日志级别
    "file": "logs/auto-summary.log", // 日志文件
    "maxSize": "10m",               // 最大文件大小
    "maxFiles": 5                   // 最大文件数量
  }
}
```

### 环境变量覆盖

- `GLM_API_KEY` 或 `CHATGLM_API_KEY`: ChatGLM API密钥
- `CHATGLM_ENDPOINT`: API端点地址
- `LOG_LEVEL`: 日志级别 (debug, info, warn, error)
- `NODE_ENV`: 运行环境 (development, production)

## 目录结构

```
scripts/auto-summary/
├── index.js                 # 主入口文件
├── config/                  # 配置文件目录
│   ├── default.json        # 默认配置
│   └── production.json     # 生产环境配置
├── modules/                 # 核心模块
│   └── configManager.js    # 配置管理模块
├── utils/                   # 工具类
│   └── logger.js           # 日志工具
└── README.md               # 说明文档
```

## 开发状态

当前已完成：
- ✅ 项目结构搭建
- ✅ 配置管理系统
- ✅ 日志记录系统
- ✅ 基础启动框架

待开发功能：
- ⏳ 文件监控模块
- ⏳ ChatGLM API集成
- ⏳ 摘要生成逻辑
- ⏳ 内容管理模块
- ⏳ 错误处理机制

## 故障排除

### 常见问题

1. **API密钥未配置**
   - 确保设置了 `CHATGLM_API_KEY` 环境变量
   - 或在配置文件中填写正确的API密钥

2. **权限错误**
   - 确保有读写笔记目录的权限
   - 检查日志文件目录的写入权限

3. **依赖缺失**
   - 运行 `npm install` 安装所有依赖
   - 确保Node.js版本 >= 14

### 日志查看

```bash
# 查看实时日志
tail -f logs/auto-summary.log

# 查看错误日志
grep ERROR logs/auto-summary.log
```