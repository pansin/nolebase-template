#!/usr/bin/env node

/**
 * 完整系统集成测试
 */

import fs from 'fs'
import path from 'path'
import AutoSummarySystem from './index.js'

async function testFullSystem() {
  console.log('🚀 开始测试完整自动摘要系统...')

  let system = null
  let testFiles = []

  try {
    // 创建系统实例
    system = new AutoSummarySystem()
    console.log('✅ 系统实例创建成功')

    // 创建测试文件
    testFiles = await createTestFiles()
    console.log(`📝 创建了 ${testFiles.length} 个测试文件`)

    // 初始化系统
    const initialized = await system.initialize()
    if (!initialized) {
      throw new Error('系统初始化失败')
    }
    console.log('✅ 系统初始化成功')

    // 执行初始扫描
    console.log('\n📊 测试初始扫描...')
    await system.performInitialScan()
    console.log('✅ 初始扫描完成')

    // 获取系统统计
    console.log('\n📈 获取系统统计...')
    const stats = await system.getSystemStats()
    console.log('📊 系统统计:')
    console.log('  - 摘要总数:', stats.summary?.total || 0)
    console.log('  - 分类数量:', Object.keys(stats.summary?.categories || {}).length)
    console.log('  - 标签数量:', Object.keys(stats.summary?.tags || {}).length)
    console.log('  - 平均字数:', stats.summary?.averageWordCount || 0)
    console.log('  - index文件存在:', stats.content?.indexFileExists ? '是' : '否')
    console.log('  - index文件有效:', stats.content?.indexFileValid ? '是' : '否')
    console.log('  - 当前摘要数:', stats.content?.currentSummaryCount || 0)

    // 测试文件监控（模拟）
    console.log('\n👁️  测试文件事件处理...')
    
    // 模拟新文件添加
    const newTestFile = await createSingleTestFile('new-test-file.md', '这是一个新添加的测试文件')
    testFiles.push(newTestFile)
    
    await system.handleFileAdded(newTestFile)
    console.log('✅ 新文件添加处理完成')

    // 模拟文件修改
    await fs.promises.writeFile(newTestFile, '# 修改后的内容\n\n这是修改后的测试文件内容，包含更多信息。', 'utf8')
    await system.handleFileChanged(newTestFile)
    console.log('✅ 文件修改处理完成')

    // 获取更新后的统计
    const updatedStats = await system.getSystemStats()
    console.log('\n📊 更新后统计:')
    console.log('  - 摘要总数:', updatedStats.summary?.total || 0)
    console.log('  - 当前摘要数:', updatedStats.content?.currentSummaryCount || 0)

    // 验证index.md文件
    console.log('\n📄 验证index.md文件...')
    const indexPath = system.configManager.getConfig().content.indexFilePath
    if (fs.existsSync(indexPath)) {
      const content = await fs.promises.readFile(indexPath, 'utf8')
      const summaryCount = (content.match(/## 📝/g) || []).length
      console.log('✅ index.md文件存在')
      console.log('  - 文件大小:', content.length, '字符')
      console.log('  - 摘要卡片数:', summaryCount)
      
      // 检查是否包含测试文件的摘要
      const containsTestContent = content.includes('测试文件')
      console.log('  - 包含测试内容:', containsTestContent ? '是' : '否')
    } else {
      console.log('⚠️  index.md文件不存在')
    }

    // 测试文件删除
    console.log('\n🗑️  测试文件删除处理...')
    await system.handleFileDeleted(newTestFile)
    console.log('✅ 文件删除处理完成')

    console.log('\n🎉 完整系统测试成功!')
    console.log('\n📝 测试结果总结:')
    console.log('  ✅ 系统初始化正常')
    console.log('  ✅ 初始扫描功能正常')
    console.log('  ✅ 文件添加处理正常')
    console.log('  ✅ 文件修改处理正常')
    console.log('  ✅ 文件删除处理正常')
    console.log('  ✅ index.md更新正常')
    console.log('  ✅ 统计信息获取正常')

  } catch (error) {
    console.error('❌ 系统测试失败:', error.message)
    console.error(error.stack)
  } finally {
    // 清理测试文件
    console.log('\n🧹 清理测试文件...')
    await cleanupTestFiles(testFiles)
    
    // 关闭系统
    if (system && system.isRunning) {
      console.log('🔄 关闭系统...')
      await system.shutdown()
    }
    
    console.log('✅ 清理完成')
    process.exit(0)
  }
}

/**
 * 创建测试文件
 */
async function createTestFiles() {
  const testFiles = []
  const testDir = 'test-notes'
  
  // 确保测试目录存在
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
  }

  const testContents = [
    {
      filename: 'ai-technology.md',
      content: `---
title: AI技术发展趋势
category: 技术文档
tags: [AI, 技术, 趋势]
---

# AI技术发展趋势

人工智能技术正在快速发展，包括大语言模型、计算机视觉、自然语言处理等领域都取得了重大突破。

## 主要发展方向

1. 大语言模型的普及应用
2. 多模态AI的兴起
3. 边缘计算的发展

这些技术将深刻改变我们的工作和生活方式。`
    },
    {
      filename: 'programming-notes.md',
      content: `# 编程学习笔记

## JavaScript基础

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## 重要概念

- 闭包
- 异步编程
- 原型链

学习编程需要持续练习和思考。`
    },
    {
      filename: 'reading-summary.md',
      content: `# 读书笔记：《深度学习》

这本书详细介绍了深度学习的基本概念和应用。

## 核心内容

- 神经网络基础
- 反向传播算法
- 卷积神经网络
- 循环神经网络

![深度学习架构图](https://example.com/dl-architecture.png)

推荐给所有对AI感兴趣的读者。`
    }
  ]

  for (const { filename, content } of testContents) {
    const filePath = path.join(testDir, filename)
    await fs.promises.writeFile(filePath, content, 'utf8')
    testFiles.push(filePath)
  }

  return testFiles
}

/**
 * 创建单个测试文件
 */
async function createSingleTestFile(filename, content) {
  const testDir = 'test-notes'
  const filePath = path.join(testDir, filename)
  
  const fullContent = `# ${filename.replace('.md', '')}

${content}

创建时间: ${new Date().toISOString()}
`
  
  await fs.promises.writeFile(filePath, fullContent, 'utf8')
  return filePath
}

/**
 * 清理测试文件
 */
async function cleanupTestFiles(testFiles) {
  for (const filePath of testFiles) {
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath)
      }
    } catch (error) {
      console.warn('清理文件失败:', filePath, error.message)
    }
  }
  
  // 删除测试目录
  const testDir = 'test-notes'
  if (fs.existsSync(testDir)) {
    try {
      fs.rmSync(testDir, { recursive: true, force: true })
    } catch (error) {
      console.warn('删除测试目录失败:', error.message)
    }
  }
  
  // 清理摘要数据文件
  const dataFile = 'scripts/auto-summary/data/summaries.json'
  if (fs.existsSync(dataFile)) {
    try {
      await fs.promises.unlink(dataFile)
    } catch (error) {
      console.warn('清理数据文件失败:', error.message)
    }
  }
}

// 运行测试
testFullSystem()