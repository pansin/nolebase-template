#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

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

// 监控文件变化
if (process.argv.includes('--watch')) {
  console.log('🔍 开始监控文件变化...')
  
  const watcher = chokidar.watch(sourceFile, {
    persistent: true,
    ignoreInitial: true
  })

  watcher.on('change', () => {
    console.log('📝 检测到文件变化，正在同步...')
    syncIndexFile()
  })

  // 优雅退出
  process.on('SIGINT', () => {
    console.log('\n👋 停止监控')
    watcher.close()
    process.exit(0)
  })
}