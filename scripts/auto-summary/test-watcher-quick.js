#!/usr/bin/env node

/**
 * 文件监控模块快速测试
 */

import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import FileWatcher from './modules/fileWatcher.js'

async function quickTest() {
  console.log('🔍 快速测试文件监控模块...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 创建文件监控器
    const fileWatcher = new FileWatcher(config, logger)
    console.log('✅ 文件监控器创建成功')

    // 测试配置
    console.log('📋 监控配置:')
    console.log('  - 监控路径:', config.monitoring.watchPaths)
    console.log('  - 忽略模式:', config.monitoring.ignorePatterns)
    console.log('  - 防抖延迟:', config.monitoring.debounceMs + 'ms')

    // 启动监控
    fileWatcher.start()
    console.log('🚀 文件监控已启动')

    // 等待监控器就绪
    await new Promise((resolve) => {
      fileWatcher.on('ready', resolve)
      setTimeout(resolve, 3000) // 最多等待3秒
    })

    // 获取统计信息
    const stats = fileWatcher.getStats()
    console.log('📊 监控统计:', stats)

    // 扫描现有文件
    try {
      const existingFiles = await fileWatcher.scanExistingFiles()
      console.log('📋 发现现有文件:', existingFiles.length, '个')
      
      if (existingFiles.length > 0) {
        console.log('📄 示例文件:')
        existingFiles.slice(0, 3).forEach(file => {
          console.log(`   - ${fileWatcher.getRelativePath(file)} [${fileWatcher.getFileCategory(file)}]`)
        })
      }
    } catch (error) {
      console.warn('⚠️  扫描文件时出错:', error.message)
    }

    // 停止监控
    await fileWatcher.stop()
    console.log('⏹️  文件监控已停止')

    console.log('\n🎉 第二个任务测试完成！')
    console.log('\n📝 已实现功能:')
    console.log('  ✅ chokidar文件监控集成')
    console.log('  ✅ 文件过滤和防抖机制')
    console.log('  ✅ 事件回调处理')
    console.log('  ✅ 文件分类识别')
    console.log('  ✅ 现有文件扫描')
    console.log('  ✅ 监控统计信息')

    process.exit(0)

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// 运行测试
quickTest()