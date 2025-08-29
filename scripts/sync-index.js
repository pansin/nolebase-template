#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const sourceFile = path.join(__dirname, '../笔记/index.md')
const targetFile = path.join(__dirname, '../index.md')

function syncIndexFile() {
  try {
    if (fs.existsSync(sourceFile)) {
      const content = fs.readFileSync(sourceFile, 'utf8')
      fs.writeFileSync(targetFile, content)
      console.log('✅ 已同步笔记/index.md 到根目录 index.md')
    } else {
      console.log('❌ 源文件不存在:', sourceFile)
    }
  } catch (error) {
    console.error('❌ 同步失败:', error.message)
  }
}

// 立即执行一次同步
syncIndexFile()

// 简单的监控模式提示（不使用 chokidar）
if (process.argv.includes('--watch')) {
  console.log('⚠️  监控模式需要安装 chokidar 依赖')
  console.log('💡 建议使用重定向方案，或手动运行 npm run sync-index')
}