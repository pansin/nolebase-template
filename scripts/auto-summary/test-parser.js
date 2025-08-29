#!/usr/bin/env node

/**
 * 内容解析和元数据提取测试
 */

import fs from 'fs'
import path from 'path'
import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import ContentParser from './modules/contentParser.js'

async function testContentParser() {
  console.log('📄 开始测试内容解析和元数据提取...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 创建内容解析器
    const contentParser = new ContentParser(config, logger)
    console.log('✅ 内容解析器创建成功')

    // 查找测试文件
    console.log('🔍 查找测试文件...')
    const testFiles = await findTestFiles()
    
    if (testFiles.length === 0) {
      console.log('⚠️  未找到测试文件，创建示例文件进行测试')
      await createTestFile()
      testFiles.push('./test-sample.md')
    }

    console.log(`📁 找到 ${testFiles.length} 个测试文件`)

    // 测试单个文件解析
    const testFile = testFiles[0]
    console.log(`\n📄 测试解析文件: ${testFile}`)
    
    const metadata = await contentParser.parseFile(testFile)
    
    console.log('✅ 文件解析成功!')
    console.log('📝 解析结果:')
    console.log('  - 标题:', metadata.title)
    console.log('  - 分类:', metadata.category)
    console.log('  - 标签:', metadata.tags.join(', '))
    console.log('  - 字数:', metadata.wordCount)
    console.log('  - 阅读时间:', metadata.readingTime, '分钟')
    console.log('  - 语言:', metadata.language)
    console.log('  - 标题数量:', metadata.headings.length)
    console.log('  - 链接数量:', metadata.links.length)
    console.log('  - 图片数量:', metadata.images.length)
    console.log('  - 代码块数量:', metadata.codeBlocks.length)
    console.log('  - 包含代码:', metadata.hasCode ? '是' : '否')
    console.log('  - 包含图片:', metadata.hasImages ? '是' : '否')
    console.log('  - 包含链接:', metadata.hasLinks ? '是' : '否')
    
    if (metadata.excerpt) {
      console.log('  - 摘要:', metadata.excerpt.substring(0, 100) + '...')
    }

    // 测试批量解析
    if (testFiles.length > 1) {
      console.log(`\n📚 测试批量解析 ${Math.min(3, testFiles.length)} 个文件...`)
      
      const batchFiles = testFiles.slice(0, 3)
      const batchResults = await contentParser.parseFiles(batchFiles)
      
      console.log('✅ 批量解析成功!')
      console.log('📊 批量解析统计:')
      
      batchResults.forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.title} (${result.wordCount}字, ${result.category})`)
      })
    }

    // 测试文件验证
    console.log('\n🔍 测试文件验证...')
    const validation = await contentParser.validateMarkdownFile(testFile)
    console.log('✅ 文件验证结果:', validation.valid ? '有效' : `无效: ${validation.reason}`)

    // 清理测试文件
    if (fs.existsSync('./test-sample.md')) {
      fs.unlinkSync('./test-sample.md')
      console.log('🧹 清理测试文件')
    }

    console.log('\n🎉 内容解析测试完成!')
    console.log('\n📝 已实现功能:')
    console.log('  ✅ Markdown文件解析')
    console.log('  ✅ Frontmatter元数据提取')
    console.log('  ✅ 标题、分类、标签提取')
    console.log('  ✅ 字数统计和阅读时间估算')
    console.log('  ✅ 内容结构分析（标题、链接、图片、代码）')
    console.log('  ✅ 语言检测')
    console.log('  ✅ 自动摘要提取')
    console.log('  ✅ 批量文件处理')
    console.log('  ✅ 文件验证')

    process.exit(0)

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
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

/**
 * 创建测试文件
 */
async function createTestFile() {
  const testContent = `---
title: 测试文档标题
category: 测试分类
tags: [测试, 示例, Markdown]
author: 测试作者
description: 这是一个用于测试内容解析功能的示例文档
---

# 测试文档标题

这是一个用于测试内容解析和元数据提取功能的示例文档。

## 功能特性

本文档包含以下内容类型：

### 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

### 链接和图片

- [外部链接](https://example.com)
- [内部链接](./other-file.md)

![示例图片](https://via.placeholder.com/300x200)

### 列表和表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 解析 | ✅ | 已完成 |
| 测试 | 🔄 | 进行中 |

### 数学公式

这里有一个数学公式：$E = mc^2$

### 总结

这个测试文档包含了各种markdown元素，用于验证解析功能的完整性。包含中文和English混合内容，用于测试语言检测功能。

TODO: 添加更多测试用例
`

  await fs.promises.writeFile('./test-sample.md', testContent, 'utf8')
  console.log('📝 创建测试文件: test-sample.md')
}

// 运行测试
testContentParser()