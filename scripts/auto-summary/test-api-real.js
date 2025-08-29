#!/usr/bin/env node

/**
 * 真实API测试
 */

import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import ChatGLMClient from './modules/chatglmClient.js'

async function testRealAPI() {
  console.log('🔥 测试真实ChatGLM API调用...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 检查环境变量
    console.log('🔍 检查环境变量...')
    console.log('  - GLM_API_KEY:', process.env.GLM_API_KEY ? '已设置 ✅' : '未设置 ❌')
    console.log('  - CHATGLM_API_KEY:', process.env.CHATGLM_API_KEY ? '已设置 ✅' : '未设置 ❌')
    console.log('  - NODE_ENV:', process.env.NODE_ENV || 'development')

    // 检查API密钥是否已正确加载
    if (config.chatglm.apiKey) {
      console.log('✅ API密钥已从配置加载')
    } else {
      console.log('❌ 请设置环境变量: export GLM_API_KEY="your-api-key"')
      console.log('   或: export CHATGLM_API_KEY="your-api-key"')
      process.exit(1)
    }

    // 创建ChatGLM客户端
    console.log('🤖 创建ChatGLM客户端...')
    const chatglmClient = new ChatGLMClient(config, logger)

    // 测试API连接
    console.log('🔗 测试API连接...')
    const connectionTest = await chatglmClient.testConnection()
    
    if (connectionTest.success) {
      console.log('✅ API连接测试成功!')
      console.log('📝 测试摘要:', connectionTest.summary.description)
      console.log('🏷️  测试标签:', connectionTest.summary.tags?.join(', ') || '无')
    } else {
      console.log('❌ API连接测试失败:', connectionTest.error)
      process.exit(1)
    }

    // 测试真实摘要生成
    console.log('\n📄 测试真实摘要生成...')
    
    const testTitle = 'AI技术发展趋势分析'
    const testContent = `
# AI技术发展趋势分析

## 引言
人工智能技术在近年来取得了突破性进展，从机器学习到深度学习，再到大语言模型，AI正在改变我们的生活和工作方式。

## 主要趋势
1. **大语言模型的普及**：ChatGPT、GPT-4等模型展现了强大的语言理解和生成能力
2. **多模态AI**：结合文本、图像、音频的综合AI系统
3. **边缘计算**：AI模型向移动设备和边缘设备部署
4. **自动化程度提升**：更多行业开始采用AI自动化解决方案

## 应用场景
- 内容创作和编辑
- 代码生成和调试
- 数据分析和洞察
- 客户服务自动化

## 挑战与机遇
虽然AI技术发展迅速，但仍面临数据隐私、算法偏见、计算资源等挑战。同时，这也为相关行业带来了巨大的发展机遇。
    `

    const realSummary = await chatglmClient.generateSummary(testTitle, testContent)
    
    console.log('✅ 真实摘要生成成功!')
    console.log('📝 标题:', testTitle)
    console.log('📄 摘要:', realSummary.description)
    console.log('🏷️  标签:', realSummary.tags?.join(', ') || '无')
    console.log('📂 分类:', realSummary.category || '无')
    console.log('🎯 要点:', realSummary.keyPoints?.join(', ') || '无')
    console.log('📊 置信度:', realSummary.confidence || '无')

    console.log('\n🎉 真实API测试完成!')
    console.log('✅ ChatGLM4.5 API集成工作正常')

  } catch (error) {
    console.error('❌ 真实API测试失败:', error.message)
    if (error.response) {
      console.error('📡 API响应状态:', error.response.status)
      console.error('📄 API响应数据:', JSON.stringify(error.response.data, null, 2))
    }
    process.exit(1)
  }
}

// 运行测试
testRealAPI()