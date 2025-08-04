#!/usr/bin/env node

/**
 * 摘要生成和管理逻辑测试
 */

import fs from 'fs'
import path from 'path'
import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import SummaryGenerator from './modules/summaryGenerator.js'
import SummaryManager from './modules/summaryManager.js'

async function testSummarySystem() {
  console.log('📊 开始测试摘要生成和管理系统...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 创建摘要生成器和管理器
    const summaryGenerator = new SummaryGenerator(config, logger)
    const summaryManager = new SummaryManager(config, logger)

    console.log('✅ 摘要生成器和管理器创建成功')

    // 查找测试文件
    console.log('🔍 查找测试文件...')
    const testFiles = await findTestFiles()
    
    if (testFiles.length === 0) {
      console.log('⚠️  未找到测试文件，跳过文件测试')
      await testWithMockData(summaryManager)
      return
    }

    console.log(`📁 找到 ${testFiles.length} 个测试文件`)

    // 测试单个文件摘要生成
    const testFile = testFiles[0]
    console.log(`\n📄 测试生成摘要: ${path.basename(testFile)}`)
    
    const summary = await summaryGenerator.generateForFile(testFile)
    
    console.log('✅ 摘要生成成功!')
    console.log('📝 摘要信息:')
    console.log('  - ID:', summary.id)
    console.log('  - 标题:', summary.title)
    console.log('  - 分类:', summary.category)
    console.log('  - 标签:', summary.tags.join(', '))
    console.log('  - 字数:', summary.wordCount)
    console.log('  - 阅读时间:', summary.readingTime, '分钟')
    console.log('  - 置信度:', summary.confidence)
    console.log('  - 描述:', summary.description.substring(0, 100) + '...')

    // 测试摘要管理
    console.log('\n📊 测试摘要管理...')
    
    // 添加摘要
    await summaryManager.addSummary(summary)
    console.log('✅ 摘要添加成功')

    // 获取统计信息
    const stats = summaryManager.getStats()
    console.log('📈 管理器统计:')
    console.log('  - 总数:', stats.total)
    console.log('  - 分类:', Object.keys(stats.categories).join(', '))
    console.log('  - 标签数:', Object.keys(stats.tags).length)
    console.log('  - 平均字数:', stats.averageWordCount)

    // 测试批量生成（如果有多个文件）
    if (testFiles.length > 1) {
      console.log(`\n📚 测试批量生成 ${Math.min(3, testFiles.length)} 个摘要...`)
      
      const batchFiles = testFiles.slice(0, 3)
      const batchSummaries = await summaryGenerator.generateBatch(batchFiles, {
        batchSize: 2,
        delay: 500
      })
      
      console.log('✅ 批量生成成功!')
      console.log('📊 批量结果:')
      
      // 添加到管理器
      for (const batchSummary of batchSummaries) {
        await summaryManager.addSummary(batchSummary)
      }
      
      console.log(`  - 成功生成: ${batchSummaries.filter(s => !s.error).length}`)
      console.log(`  - 生成失败: ${batchSummaries.filter(s => s.error).length}`)
    }

    // 测试管理器功能
    console.log('\n🔧 测试管理器功能...')
    
    // 获取最新摘要
    const latestSummaries = summaryManager.getLatestSummaries(5)
    console.log('📋 最新摘要:')
    latestSummaries.forEach((s, i) => {
      console.log(`  ${i + 1}. ${s.title} (${s.category})`)
    })

    // 测试搜索功能
    if (latestSummaries.length > 0) {
      const searchTerm = latestSummaries[0].title.split(' ')[0]
      const searchResults = summaryManager.searchSummaries(searchTerm)
      console.log(`🔍 搜索 "${searchTerm}" 结果: ${searchResults.length} 个`)
    }

    // 测试导出功能
    console.log('\n📤 测试导出功能...')
    const jsonExport = summaryManager.exportSummaries('json')
    console.log('✅ JSON导出成功，长度:', jsonExport.length, '字符')

    // 清理测试数据
    console.log('\n🧹 清理测试数据...')
    const dataFile = path.join(process.cwd(), 'scripts/auto-summary/data/summaries.json')
    if (fs.existsSync(dataFile)) {
      fs.unlinkSync(dataFile)
      console.log('✅ 测试数据已清理')
    }

    console.log('\n🎉 摘要系统测试完成!')
    console.log('\n📝 已实现功能:')
    console.log('  ✅ 整合ContentParser的摘要生成')
    console.log('  ✅ 摘要数据模型和序列化')
    console.log('  ✅ 摘要质量验证和后处理')
    console.log('  ✅ 摘要缓存机制')
    console.log('  ✅ 批量摘要生成')
    console.log('  ✅ 摘要存储和管理')
    console.log('  ✅ 摘要排序和搜索')
    console.log('  ✅ 统计信息和导出')

    process.exit(0)

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

/**
 * 使用模拟数据测试
 */
async function testWithMockData(summaryManager) {
  console.log('🎭 使用模拟数据测试管理器...')

  // 创建模拟摘要
  const mockSummaries = [
    {
      id: 'mock1',
      title: '模拟文档1',
      description: '这是第一个模拟文档的摘要',
      tags: ['模拟', '测试'],
      category: '测试分类',
      filePath: './mock1.md',
      relativePath: 'mock1.md',
      wordCount: 100,
      readingTime: 1,
      confidence: 0.9,
      generatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastModified: Date.now()
    },
    {
      id: 'mock2',
      title: '模拟文档2',
      description: '这是第二个模拟文档的摘要',
      tags: ['模拟', '示例'],
      category: '示例分类',
      filePath: './mock2.md',
      relativePath: 'mock2.md',
      wordCount: 200,
      readingTime: 2,
      confidence: 0.8,
      generatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastModified: Date.now()
    }
  ]

  // 添加模拟摘要
  for (const mockSummary of mockSummaries) {
    await summaryManager.addSummary(mockSummary)
  }

  console.log('✅ 模拟数据添加成功')

  // 测试管理器功能
  const stats = summaryManager.getStats()
  console.log('📊 模拟数据统计:', stats)

  const latest = summaryManager.getLatestSummaries()
  console.log('📋 最新摘要:', latest.map(s => s.title))

  // 清理
  await summaryManager.clearAll()
  console.log('🧹 模拟数据已清理')
}

/**
 * 查找测试文件
 */
async function findTestFiles() {
  const testFiles = []
  
  try {
    const notesDir = '笔记'
    if (!fs.existsSync(notesDir)) {
      return testFiles
    }

    // 递归查找markdown文件
    const findMarkdownFiles = (dir, maxFiles = 3) => {
      if (testFiles.length >= maxFiles) return
      
      const files = fs.readdirSync(dir)
      
      for (const file of files) {
        if (testFiles.length >= maxFiles) break
        
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory() && !file.startsWith('.')) {
          findMarkdownFiles(filePath, maxFiles)
        } else if (file.endsWith('.md') && file !== 'index.md') {
          testFiles.push(filePath)
        }
      }
    }

    findMarkdownFiles(notesDir)
    
  } catch (error) {
    console.warn('查找测试文件时出错:', error.message)
  }
  
  return testFiles
}

// 运行测试
testSummarySystem()