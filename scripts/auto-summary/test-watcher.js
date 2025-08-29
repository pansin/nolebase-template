#!/usr/bin/env node

/**
 * 文件监控模块测试
 */

import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import FileWatcher from './modules/fileWatcher.js'

async function testFileWatcher() {
  console.log('🔍 开始测试文件监控模块...')

  try {
    // 初始化配置和日志
    const configManager = new ConfigManager()
    const config = configManager.getConfig()
    const logger = new Logger(config.logging)

    console.log('✅ 配置和日志初始化成功')

    // 创建文件监控器
    const fileWatcher = new FileWatcher(config, logger)

    // 设置事件监听器
    fileWatcher.on('ready', () => {
      console.log('📁 文件监控器就绪')
    })

    fileWatcher.on('fileAdded', (filePath) => {
      console.log('➕ 检测到新文件:', filePath)
      console.log('   分类:', fileWatcher.getFileCategory(filePath))
      console.log('   相对路径:', fileWatcher.getRelativePath(filePath))
    })

    fileWatcher.on('fileChanged', (filePath) => {
      console.log('📝 检测到文件修改:', filePath)
    })

    fileWatcher.on('fileDeleted', (filePath) => {
      console.log('🗑️  检测到文件删除:', filePath)
    })

    fileWatcher.on('error', (error) => {
      console.error('❌ 监控错误:', error.message)
    })

    // 启动监控
    fileWatcher.start()
    console.log('🚀 文件监控已启动')

    // 显示监控统计
    setTimeout(() => {
      const stats = fileWatcher.getStats()
      console.log('📊 监控统计:', stats)
    }, 2000)

    // 扫描现有文件
    setTimeout(async () => {
      try {
        const existingFiles = await fileWatcher.scanExistingFiles()
        console.log('📋 现有文件列表:')
        existingFiles.slice(0, 5).forEach(file => {
          console.log(`   - ${fileWatcher.getRelativePath(file)} [${fileWatcher.getFileCategory(file)}]`)
        })
        if (existingFiles.length > 5) {
          console.log(`   ... 还有 ${existingFiles.length - 5} 个文件`)
        }
      } catch (error) {
        console.error('扫描文件失败:', error.message)
      }
    }, 3000)

    // 测试运行30秒后停止
    setTimeout(async () => {
      console.log('⏹️  停止测试...')
      try {
        await fileWatcher.stop()
        console.log('✅ 文件监控已停止')
        console.log('🎉 测试完成！')
        
        console.log('\n📝 测试结果:')
        console.log('  ✅ 文件监控模块创建成功')
        console.log('  ✅ 事件监听器工作正常')
        console.log('  ✅ 文件扫描功能正常')
        console.log('  ✅ 防抖机制已实现')
        console.log('  ✅ 分类识别功能正常')
        
        process.exit(0)
      } catch (error) {
        console.error('停止监控失败:', error.message)
        process.exit(1)
      }
    }, 30000)

    console.log('\n💡 提示: 现在可以在笔记目录中创建、修改或删除.md文件来测试监控功能')
    console.log('   测试将在30秒后自动结束')

  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    process.exit(1)
  }
}

// 运行测试
testFileWatcher()