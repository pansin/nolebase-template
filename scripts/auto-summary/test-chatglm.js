#!/usr/bin/env node

/**
 * ChatGLM API集成测试
 */

import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import ChatGLMClient from './modules/chatglmClient.js'
import SummaryGenerator from './modules/summaryGenerator.js'

async function testChatGLM() {
  console.log('🤖 开始测试ChatGLM API集成...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 检查API密钥配置
    if (!config.chatglm.apiKey) {
      console.log('⚠️  ChatGLM API密钥未配置')
      console.log('💡 请设置环境变量: export CHATGLM_API_KEY="your-api-key"')
      console.log('   或在配置文件中设置 chatglm.apiKey')
      
      // 使用模拟模式继续测试
      console.log('🔄 使用模拟模式继续测试...')
      await testWithMockMode(config, logger)
      return
    }

    // 测试ChatGLM客户端
    console.log('🔗 测试ChatGLM客户端...')
    const chatglmClient = new ChatGLMClient(config, logger)
    
    // 测试API连接
    const connectionTest = await chatglmClient.testConnection()
    if (connectionTest.success) {
      console.log('✅ API连接测试成功')
      console.log('📝 测试摘要:', connectionTest.summary.description)
    } else {
      console.log('❌ API连接测试失败:', connectionTest.error)
      return
    }

    // 测试摘要生成器
    console.log('📄 测试摘要生成器...')
    const summaryGenerator = new SummaryGenerator(config, logger)
    
    const generatorTest = await summaryGenerator.test()
    if (generatorTest.success) {
      console.log('✅ 摘要生成器测试成功')
    } else {
      console.log('❌ 摘要生成器测试失败:', generatorTest.error)
    }

    // 测试实际文件摘要生成（如果有笔记文件）
    await testRealFileSummary(summaryGenerator)

    console.log('\n🎉 ChatGLM API集成测试完成！')

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

/**
 * 模拟模式测试
 */
async function testWithMockMode(config, logger) {
  console.log('🎭 模拟模式测试...')
  
  try {
    // 创建模拟的ChatGLM客户端
    const mockClient = {
      generateSummary: async (title, content) => {
        console.log('📝 模拟生成摘要:', title)
        return {
          description: `这是对"${title}"的模拟摘要。内容长度: ${content.length}字符。`,
          tags: ['模拟', '测试', 'AI生成'],
          category: '测试分类',
          keyPoints: ['模拟要点1', '模拟要点2'],
          confidence: 0.9
        }
      },
      testConnection: async () => ({
        success: true,
        summary: {
          description: '模拟API连接测试成功',
          tags: ['测试']
        }
      })
    }

    // 测试模拟摘要生成
    const mockSummary = await mockClient.generateSummary(
      '测试标题',
      '这是一个测试内容，用于验证摘要生成功能。'
    )

    console.log('✅ 模拟摘要生成成功')
    console.log('📄 模拟摘要:', mockSummary.description)
    console.log('🏷️  模拟标签:', mockSummary.tags.join(', '))

  } catch (error) {
    console.error('❌ 模拟模式测试失败:', error.message)
  }
}

/**
 * 测试真实文件摘要生成
 */
async function testRealFileSummary(summaryGenerator) {
  try {
    console.log('📁 查找测试文件...')
    
    // 查找一个示例笔记文件
    const fs = await import('fs')
    const path = await import('path')
    
    const notesDir = '笔记'
    if (!fs.existsSync(notesDir)) {
      console.log('⚠️  笔记目录不存在，跳过真实文件测试')
      return
    }

    // 递归查找第一个.md文件
    const findFirstMarkdownFile = (dir) => {
      const files = fs.readdirSync(dir)
      
      for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory() && !file.startsWith('.')) {
          const found = findFirstMarkdownFile(filePath)
          if (found) return found
        } else if (file.endsWith('.md') && file !== 'index.md') {
          return filePath
        }
      }
      return null
    }

    const testFile = findFirstMarkdownFile(notesDir)
    if (!testFile) {
      console.log('⚠️  未找到测试文件，跳过真实文件测试')
      return
    }

    console.log('📄 测试文件:', testFile)
    
    // 生成摘要
    const summary = await summaryGenerator.generateForFile(testFile)
    
    console.log('✅ 真实文件摘要生成成功')
    console.log('📝 标题:', summary.title)
    console.log('📄 摘要:', summary.description.substring(0, 100) + '...')
    console.log('🏷️  标签:', summary.tags.join(', '))
    console.log('📊 字数:', summary.wordCount)
    console.log('📂 分类:', summary.category)

  } catch (error) {
    console.log('⚠️  真实文件测试失败:', error.message)
  }
}

// 运行测试
testChatGLM()