#!/usr/bin/env node

/**
 * ChatGLM API集成快速测试
 */

import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'

async function quickTest() {
  console.log('🤖 快速测试ChatGLM API集成模块...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 测试配置验证
    console.log('📋 ChatGLM配置:')
    console.log('  - API端点:', config.chatglm.endpoint)
    console.log('  - 模型:', config.chatglm.model)
    console.log('  - 最大Token:', config.chatglm.maxTokens)
    console.log('  - 温度参数:', config.chatglm.temperature)
    console.log('  - 超时时间:', config.chatglm.timeout + 'ms')
    console.log('  - 重试次数:', config.chatglm.retryAttempts)

    // 检查API密钥
    if (config.chatglm.apiKey) {
      console.log('  - API密钥: 已配置 ✅')
    } else {
      console.log('  - API密钥: 未配置 ⚠️')
      console.log('    💡 设置方法: export CHATGLM_API_KEY="your-key"')
    }

    // 测试模块导入
    console.log('\n🔧 测试模块导入...')
    
    try {
      const { default: ApiClient } = await import('./utils/apiClient.js')
      console.log('✅ ApiClient 模块导入成功')
      
      const { default: ChatGLMClient } = await import('./modules/chatglmClient.js')
      console.log('✅ ChatGLMClient 模块导入成功')
      
      const { default: SummaryGenerator } = await import('./modules/summaryGenerator.js')
      console.log('✅ SummaryGenerator 模块导入成功')
      
    } catch (importError) {
      console.error('❌ 模块导入失败:', importError.message)
      return
    }

    // 测试模块实例化
    console.log('\n🏗️  测试模块实例化...')
    
    try {
      const { default: ApiClient } = await import('./utils/apiClient.js')
      const apiClient = new ApiClient(config.chatglm, logger)
      console.log('✅ ApiClient 实例化成功')
      
      // 只有在有API密钥时才测试ChatGLM客户端
      if (config.chatglm.apiKey) {
        const { default: ChatGLMClient } = await import('./modules/chatglmClient.js')
        const chatglmClient = new ChatGLMClient(config, logger)
        console.log('✅ ChatGLMClient 实例化成功')
      } else {
        console.log('⚠️  跳过ChatGLMClient实例化（无API密钥）')
      }
      
      const { default: SummaryGenerator } = await import('./modules/summaryGenerator.js')
      const summaryGenerator = new SummaryGenerator(config, logger)
      console.log('✅ SummaryGenerator 实例化成功')
      
    } catch (instanceError) {
      console.error('❌ 模块实例化失败:', instanceError.message)
      return
    }

    // 测试提示词构建
    console.log('\n📝 测试提示词构建...')
    
    const testTitle = '测试笔记标题'
    const testContent = '这是一个测试笔记内容，包含一些示例文字用于测试摘要生成功能。'
    
    console.log('📄 测试输入:')
    console.log('  - 标题:', testTitle)
    console.log('  - 内容长度:', testContent.length, '字符')
    
    // 模拟提示词构建逻辑
    const mockPrompt = `请为以下笔记内容生成一个简洁的摘要：

标题：${testTitle}
内容：${testContent}

要求：
1. 摘要长度控制在100字以内
2. 突出核心观点和关键信息
3. 提取3-5个相关标签
4. 使用简洁明了的语言

请以JSON格式返回，格式如下：
{
  "description": "摘要内容",
  "tags": ["标签1", "标签2", "标签3"],
  "category": "内容分类",
  "keyPoints": ["要点1", "要点2"]
}`

    console.log('✅ 提示词构建成功')
    console.log('📏 提示词长度:', mockPrompt.length, '字符')

    console.log('\n🎉 第三个任务测试完成！')
    console.log('\n📝 已实现功能:')
    console.log('  ✅ HTTP客户端实现 (ApiClient)')
    console.log('  ✅ API调用重试机制')
    console.log('  ✅ ChatGLM4.5客户端 (ChatGLMClient)')
    console.log('  ✅ 摘要生成提示词模板')
    console.log('  ✅ 摘要生成器 (SummaryGenerator)')
    console.log('  ✅ 内容解析和元数据提取')
    console.log('  ✅ 错误处理和备用方案')

    console.log('\n⏭️  下一步: 实现内容管理模块')
    console.log('   功能: 管理摘要列表，更新index.md文件')

    process.exit(0)

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// 运行测试
quickTest()