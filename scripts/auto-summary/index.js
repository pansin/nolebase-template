#!/usr/bin/env node

/**
 * 自动笔记摘要系统 - 主入口文件
 * 监控笔记目录变化，自动生成摘要并更新首页
 */

import path from 'path'
import { fileURLToPath } from 'url'
import ConfigManager from './modules/configManager.js'
import Logger from './utils/logger.js'
import FileWatcher from './modules/fileWatcher.js'
import SummaryGenerator from './modules/summaryGenerator.js'
import SummaryManager from './modules/summaryManager.js'
import ContentManager from './modules/contentManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class AutoSummarySystem {
  constructor() {
    this.configManager = new ConfigManager()
    this.logger = null
    this.fileWatcher = null
    this.summaryGenerator = null
    this.summaryManager = null
    this.contentManager = null
    this.isRunning = false
    this.processingQueue = new Set() // 防止重复处理
  }

  async initialize() {
    try {
      // 加载配置
      const config = this.configManager.getConfig()
      
      // 初始化日志系统
      this.logger = new Logger(config.logging)
      this.logger.info('自动摘要系统启动中...')
      
      // 验证配置
      this.validateConfig(config)
      
      // 初始化所有模块
      await this.initializeModules(config)
      
      this.logger.info('系统初始化完成')
      return true
    } catch (error) {
      console.error('系统初始化失败:', error.message)
      return false
    }
  }

  async initializeModules(config) {
    this.logger.info('初始化系统模块...')
    
    // 初始化摘要生成器
    this.summaryGenerator = new SummaryGenerator(config, this.logger)
    this.logger.debug('摘要生成器初始化完成')
    
    // 初始化摘要管理器
    this.summaryManager = new SummaryManager(config, this.logger)
    this.logger.debug('摘要管理器初始化完成')
    
    // 初始化内容管理器
    this.contentManager = new ContentManager(config, this.logger)
    this.logger.debug('内容管理器初始化完成')
    
    // 清理无效摘要
    const cleanedCount = await this.summaryManager.cleanupInvalidSummaries()
    if (cleanedCount > 0) {
      this.logger.info('清理无效摘要', { count: cleanedCount })
    }
    
    this.logger.info('所有模块初始化完成')
  }

  validateConfig(config) {
    const required = ['monitoring.watchPaths', 'content.indexFilePath']
    
    for (const key of required) {
      const keys = key.split('.')
      let value = config
      
      for (const k of keys) {
        value = value?.[k]
      }
      
      if (!value) {
        throw new Error(`缺少必需的配置项: ${key}`)
      }
    }
    
    // API密钥是可选的，没有时会使用模拟模式
    if (!config.chatglm?.apiKey) {
      this.logger.warn('ChatGLM API密钥未配置，将使用模拟模式')
    }
  }

  async start() {
    if (this.isRunning) {
      this.logger.warn('系统已在运行中')
      return
    }

    const initialized = await this.initialize()
    if (!initialized) {
      process.exit(1)
    }

    try {
      // 执行初始扫描
      await this.performInitialScan()
      
      // 启动文件监控
      await this.startFileWatcher()
      
      this.isRunning = true
      this.logger.info('自动摘要系统已启动')

      // 优雅关闭处理
      process.on('SIGINT', () => this.shutdown())
      process.on('SIGTERM', () => this.shutdown())

    } catch (error) {
      this.logger.error('系统启动失败', error)
      process.exit(1)
    }
  }

  async performInitialScan() {
    this.logger.info('执行初始文件扫描...')
    
    try {
      // 先初始化文件监控器（但不启动监控）
      const config = this.configManager.getConfig()
      this.fileWatcher = new FileWatcher(config, this.logger)
      
      // 扫描现有文件
      const existingFiles = await this.fileWatcher.scanExistingFiles()
      this.logger.info('发现现有文件', { count: existingFiles.length })
      
      if (existingFiles.length === 0) {
        this.logger.info('没有发现需要处理的文件')
        return
      }
      
      // 过滤需要更新的文件
      const filesToProcess = []
      for (const filePath of existingFiles) {
        try {
          const stats = await import('fs').then(fs => fs.promises.stat(filePath))
          const lastModified = stats.mtime.getTime()
          
          if (this.summaryManager.needsUpdate(filePath, lastModified)) {
            filesToProcess.push(filePath)
          }
        } catch (error) {
          this.logger.warn('检查文件状态失败', error, { filePath })
        }
      }
      
      if (filesToProcess.length > 0) {
        this.logger.info('需要处理的文件', { count: filesToProcess.length })
        
        // 批量生成摘要
        await this.processBatchFiles(filesToProcess)
        
        // 更新index.md
        await this.updateIndexFile()
      } else {
        this.logger.info('所有文件摘要都是最新的')
      }
      
    } catch (error) {
      this.logger.error('初始扫描失败', error)
      throw error
    }
  }

  async startFileWatcher() {
    // 如果fileWatcher还没有初始化，先初始化
    if (!this.fileWatcher) {
      const config = this.configManager.getConfig()
      this.fileWatcher = new FileWatcher(config, this.logger)
    }

    // 设置事件监听器
    this.fileWatcher.on('fileAdded', async (filePath) => {
      await this.handleFileAdded(filePath)
    })

    this.fileWatcher.on('fileChanged', async (filePath) => {
      await this.handleFileChanged(filePath)
    })

    this.fileWatcher.on('fileDeleted', async (filePath) => {
      await this.handleFileDeleted(filePath)
    })

    this.fileWatcher.on('error', (error) => {
      this.handleWatcherError(error)
    })

    // 启动监控
    this.fileWatcher.start()
    this.logger.info('文件监控已启动')
  }

  async handleFileAdded(filePath) {
    if (this.processingQueue.has(filePath)) {
      this.logger.debug('文件正在处理中，跳过', { filePath })
      return
    }

    this.logger.info('检测到新文件', { filePath })
    
    try {
      this.processingQueue.add(filePath)
      
      // 生成摘要
      const summary = await this.summaryGenerator.generateForFile(filePath)
      
      // 添加到管理器
      await this.summaryManager.addSummary(summary)
      
      // 更新index.md
      await this.updateIndexFile()
      
      this.logger.info('新文件处理完成', { 
        filePath, 
        title: summary.title 
      })
      
    } catch (error) {
      this.logger.error('处理新文件失败', error, { filePath })
    } finally {
      this.processingQueue.delete(filePath)
    }
  }

  async handleFileChanged(filePath) {
    if (this.processingQueue.has(filePath)) {
      this.logger.debug('文件正在处理中，跳过', { filePath })
      return
    }

    this.logger.info('检测到文件修改', { filePath })
    
    try {
      this.processingQueue.add(filePath)
      
      // 重新生成摘要
      const summary = await this.summaryGenerator.generateForFile(filePath)
      
      // 更新管理器中的摘要
      await this.summaryManager.addSummary(summary)
      
      // 更新index.md
      await this.updateIndexFile()
      
      this.logger.info('文件修改处理完成', { 
        filePath, 
        title: summary.title 
      })
      
    } catch (error) {
      this.logger.error('处理文件修改失败', error, { filePath })
    } finally {
      this.processingQueue.delete(filePath)
    }
  }

  async handleFileDeleted(filePath) {
    this.logger.info('检测到文件删除', { filePath })
    
    try {
      // 从管理器中移除摘要
      const removed = await this.summaryManager.removeSummary(filePath)
      
      if (removed) {
        // 更新index.md
        await this.updateIndexFile()
        
        this.logger.info('文件删除处理完成', { filePath })
      } else {
        this.logger.debug('文件不在摘要列表中', { filePath })
      }
      
    } catch (error) {
      this.logger.error('处理文件删除失败', error, { filePath })
    }
  }

  handleWatcherError(error) {
    this.logger.error('文件监控错误', error)
    
    // 尝试重启监控器
    setTimeout(async () => {
      try {
        this.logger.info('尝试重启文件监控器...')
        await this.fileWatcher.restart()
        this.logger.info('文件监控器重启成功')
      } catch (restartError) {
        this.logger.error('文件监控器重启失败', restartError)
      }
    }, 5000)
  }

  async processBatchFiles(filePaths) {
    this.logger.info('开始批量处理文件', { count: filePaths.length })
    
    try {
      // 批量生成摘要
      const summaries = await this.summaryGenerator.generateBatch(filePaths, {
        batchSize: 3,
        delay: 1000
      })
      
      // 添加到管理器
      for (const summary of summaries) {
        if (!summary.error) {
          await this.summaryManager.addSummary(summary)
        }
      }
      
      const successCount = summaries.filter(s => !s.error).length
      this.logger.info('批量处理完成', { 
        total: summaries.length,
        success: successCount,
        failed: summaries.length - successCount
      })
      
      return summaries
      
    } catch (error) {
      this.logger.error('批量处理失败', error)
      throw error
    }
  }

  async updateIndexFile() {
    try {
      // 获取最新摘要
      const latestSummaries = this.summaryManager.getLatestSummaries()
      
      if (latestSummaries.length === 0) {
        this.logger.debug('没有摘要需要更新到index.md')
        return
      }
      
      // 更新index.md文件
      await this.contentManager.updateIndexFile(latestSummaries)
      
      this.logger.info('index.md文件更新完成', { 
        summariesCount: latestSummaries.length 
      })
      
    } catch (error) {
      this.logger.error('更新index.md文件失败', error)
      throw error
    }
  }

  async getSystemStats() {
    try {
      const summaryStats = this.summaryManager.getStats()
      const contentStats = await this.contentManager.getStats()
      const watcherStats = this.fileWatcher ? this.fileWatcher.getStats() : {}
      
      return {
        summary: summaryStats,
        content: contentStats,
        watcher: watcherStats,
        processing: {
          queueSize: this.processingQueue.size,
          isRunning: this.isRunning
        }
      }
    } catch (error) {
      this.logger.error('获取系统统计失败', error)
      return { error: error.message }
    }
  }

  async shutdown() {
    if (!this.isRunning) return

    this.logger.info('正在关闭系统...')
    this.isRunning = false
    
    try {
      // 等待处理队列清空
      if (this.processingQueue.size > 0) {
        this.logger.info('等待处理队列清空...', { 
          remaining: this.processingQueue.size 
        })
        
        // 最多等待30秒
        let waitTime = 0
        while (this.processingQueue.size > 0 && waitTime < 30000) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          waitTime += 1000
        }
      }
      
      // 停止文件监控
      if (this.fileWatcher) {
        await this.fileWatcher.stop()
        this.fileWatcher = null
      }

      // 清理配置管理器
      if (this.configManager) {
        this.configManager.destroy()
      }

      this.logger.info('系统已关闭')
    } catch (error) {
      this.logger.error('关闭系统时出错', error)
    }
    
    process.exit(0)
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  const system = new AutoSummarySystem()
  system.start().catch(error => {
    console.error('系统启动失败:', error)
    process.exit(1)
  })
}

export default AutoSummarySystem