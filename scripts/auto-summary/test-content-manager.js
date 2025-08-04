#!/usr/bin/env node

/**
 * 内容管理模块测试
 */

import fs from 'fs'
import path from 'path'
import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import ContentManager from './modules/contentManager.js'

async function testContentManager() {
  console.log('📄 开始测试内容管理模块...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 创建内容管理器
    const contentManager = new ContentManager(config, logger)
    console.log('✅ 内容管理器创建成功')

    // 备份原始index.md文件
    const originalIndexPath = config.content.indexFilePath
    let backupPath = null
    
    if (fs.existsSync(originalIndexPath)) {
      backupPath = await contentManager.backupIndexFile()
      console.log('📋 原始index.md已备份')
    }

    // 创建测试摘要数据
    const testSummaries = createTestSummaries()
    console.log(`📝 创建了 ${testSummaries.length} 个测试摘要`)

    // 测试更新index.md文件
    console.log('\n📄 测试更新index.md文件...')
    await contentManager.updateIndexFile(testSummaries)
    console.log('✅ index.md文件更新成功')

    // 验证文件内容
    console.log('\n🔍 验证文件内容...')
    const validation = await contentManager.validateIndexFile()
    console.log('📊 验证结果:', validation)

    // 获取统计信息
    const stats = await contentManager.getStats()
    console.log('📈 内容管理统计:')
    console.log('  - 文件存在:', stats.indexFileExists ? '是' : '否')
    console.log('  - 文件有效:', stats.indexFileValid ? '是' : '否')
    console.log('  - 当前摘要数:', stats.currentSummaryCount)
    console.log('  - 最大摘要数:', stats.maxSummaries)
    console.log('  - 内容长度:', stats.contentLength, '字符')

    // 测试模板渲染
    console.log('\n🎨 测试模板渲染...')
    const sampleSummary = testSummaries[0]
    const renderedCard = contentManager.renderSummaryCard(sampleSummary)
    console.log('✅ 摘要卡片渲染成功')
    console.log('📄 渲染结果预览:')
    console.log(renderedCard.substring(0, 200) + '...')

    // 测试文件内容读取
    console.log('\n📖 测试文件内容读取...')
    if (fs.existsSync(originalIndexPath)) {
      const content = await fs.promises.readFile(originalIndexPath, 'utf8')
      console.log('✅ 文件读取成功')
      console.log('📏 文件大小:', content.length, '字符')
      
      // 检查摘要卡片是否正确生成
      const summaryCardCount = (content.match(/## 📝/g) || []).length
      console.log('🔢 检测到摘要卡片数量:', summaryCardCount)
    }

    // 测试数量限制
    console.log('\n🔢 测试数量限制...')
    const manyTestSummaries = createTestSummaries(15) // 创建15个摘要
    await contentManager.updateIndexFile(manyTestSummaries)
    
    const newStats = await contentManager.getStats()
    console.log('📊 数量限制测试结果:')
    console.log('  - 输入摘要数:', manyTestSummaries.length)
    console.log('  - 实际显示数:', newStats.currentSummaryCount)
    console.log('  - 限制是否生效:', newStats.currentSummaryCount <= newStats.maxSummaries ? '是' : '否')

    // 恢复原始文件
    if (backupPath && fs.existsSync(backupPath)) {
      console.log('\n🔄 恢复原始文件...')
      await contentManager.restoreFromBackup(backupPath)
      
      // 清理备份文件
      fs.unlinkSync(backupPath)
      console.log('✅ 原始文件已恢复，备份已清理')
    } else {
      console.log('\n⚠️  没有原始文件需要恢复')
    }

    console.log('\n🎉 内容管理模块测试完成!')
    console.log('\n📝 已实现功能:')
    console.log('  ✅ index.md文件更新和管理')
    console.log('  ✅ 摘要卡片模板渲染')
    console.log('  ✅ 内容保留和合并')
    console.log('  ✅ 原子性文件写入')
    console.log('  ✅ 文件验证和统计')
    console.log('  ✅ 备份和恢复功能')
    console.log('  ✅ 数量限制控制')
    console.log('  ✅ 模板系统支持')

    process.exit(0)

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

/**
 * 创建测试摘要数据
 */
function createTestSummaries(count = 5) {
  const summaries = []
  
  for (let i = 1; i <= count; i++) {
    summaries.push({
      id: `test-${i}`,
      title: `测试笔记标题 ${i}`,
      description: `这是第${i}个测试笔记的摘要描述。包含了一些示例内容用于测试摘要卡片的渲染效果。这个描述会被适当截断以适应显示需求。`,
      tags: [`标签${i}`, '测试', 'AI生成'],
      category: i % 2 === 0 ? '技术文档' : '学习笔记',
      filePath: `./test-note-${i}.md`,
      relativePath: `test-note-${i}.md`,
      fileName: `test-note-${i}.md`,
      wordCount: 500 + i * 100,
      readingTime: Math.ceil((500 + i * 100) / 250),
      language: 'zh-CN',
      hasImages: i % 3 === 0,
      hasCode: i % 2 === 0,
      hasLinks: true,
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // i天前
      updatedAt: new Date(Date.now() - i * 12 * 60 * 60 * 1000), // i/2天前
      lastModified: Date.now() - i * 12 * 60 * 60 * 1000,
      confidence: 0.8 + (i % 3) * 0.1,
      generatedAt: new Date(),
      author: i % 4 === 0 ? '测试作者' : null
    })
  }
  
  return summaries
}

// 运行测试
testContentManager()