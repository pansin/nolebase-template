import chokidar from 'chokidar'
import path from 'path'
import { EventEmitter } from 'events'

/**
 * 文件监控模块
 * 监控笔记目录中的markdown文件变化
 */
class FileWatcher extends EventEmitter {
  constructor(config, logger) {
    super()
    this.config = config
    this.logger = logger.child({ module: 'FileWatcher' })
    this.watcher = null
    this.isWatching = false
    this.debounceTimers = new Map()
  }

  /**
   * 启动文件监控
   */
  start() {
    if (this.isWatching) {
      this.logger.warn('文件监控已在运行中')
      return
    }

    try {
      const watchPaths = this.config.monitoring.watchPaths
      const ignorePatterns = this.config.monitoring.ignorePatterns
      const debounceMs = this.config.monitoring.debounceMs

      this.logger.info('启动文件监控', { 
        watchPaths, 
        ignorePatterns,
        debounceMs 
      })

      // 配置chokidar选项
      const watcherOptions = {
        ignored: ignorePatterns,
        ignoreInitial: true,
        persistent: true,
        depth: 10,
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 100
        }
      }

      // 创建监控器
      this.watcher = chokidar.watch(watchPaths, watcherOptions)

      // 绑定事件处理器
      this.setupEventHandlers()

      this.isWatching = true
      this.logger.info('文件监控启动成功')

    } catch (error) {
      this.logger.error('文件监控启动失败', error)
      throw error
    }
  }

  /**
   * 设置事件处理器
   */
  setupEventHandlers() {
    // 文件添加事件
    this.watcher.on('add', (filePath) => {
      if (this.isMarkdownFile(filePath)) {
        this.logger.info('检测到新文件', { filePath })
        this.debounceEmit('fileAdded', filePath)
      }
    })

    // 文件修改事件
    this.watcher.on('change', (filePath) => {
      if (this.isMarkdownFile(filePath)) {
        this.logger.info('检测到文件修改', { filePath })
        this.debounceEmit('fileChanged', filePath)
      }
    })

    // 文件删除事件
    this.watcher.on('unlink', (filePath) => {
      if (this.isMarkdownFile(filePath)) {
        this.logger.info('检测到文件删除', { filePath })
        this.emit('fileDeleted', filePath)
      }
    })

    // 监控器就绪事件
    this.watcher.on('ready', () => {
      this.logger.info('文件监控器就绪')
      this.emit('ready')
    })

    // 错误处理
    this.watcher.on('error', (error) => {
      this.logger.error('文件监控错误', error)
      this.emit('error', error)
    })
  }

  /**
   * 防抖发射事件
   */
  debounceEmit(eventName, filePath) {
    const debounceMs = this.config.monitoring.debounceMs
    const timerId = `${eventName}:${filePath}`

    // 清除之前的定时器
    if (this.debounceTimers.has(timerId)) {
      clearTimeout(this.debounceTimers.get(timerId))
    }

    // 设置新的定时器
    const timer = setTimeout(() => {
      this.emit(eventName, filePath)
      this.debounceTimers.delete(timerId)
    }, debounceMs)

    this.debounceTimers.set(timerId, timer)
  }

  /**
   * 检查是否为markdown文件
   */
  isMarkdownFile(filePath) {
    const ext = path.extname(filePath).toLowerCase()
    return ext === '.md' || ext === '.markdown'
  }

  /**
   * 获取文件的相对路径
   */
  getRelativePath(filePath) {
    return path.relative(process.cwd(), filePath)
  }

  /**
   * 获取文件的分类（从路径推断）
   */
  getFileCategory(filePath) {
    const relativePath = this.getRelativePath(filePath)
    const pathParts = relativePath.split(path.sep)
    
    // 如果在笔记目录下的子目录中，使用子目录名作为分类
    if (pathParts.length > 2 && pathParts[0] === '笔记') {
      return pathParts[1]
    }
    
    return '未分类'
  }

  /**
   * 检查文件是否应该被忽略
   */
  shouldIgnoreFile(filePath) {
    const ignorePatterns = this.config.monitoring.ignorePatterns
    const relativePath = this.getRelativePath(filePath)
    
    return ignorePatterns.some(pattern => {
      // 简单的glob模式匹配
      const regex = new RegExp(
        pattern
          .replace(/\*\*/g, '.*')
          .replace(/\*/g, '[^/]*')
          .replace(/\?/g, '[^/]')
      )
      return regex.test(relativePath)
    })
  }

  /**
   * 手动扫描现有文件
   */
  async scanExistingFiles() {
    this.logger.info('开始扫描现有文件')
    
    try {
      const existingFiles = []
      
      // 如果监控器已启动，使用监控器的数据
      if (this.watcher) {
        const watchedPaths = this.watcher.getWatched()
        
        for (const [dir, files] of Object.entries(watchedPaths)) {
          for (const file of files) {
            const filePath = path.join(dir, file)
            if (this.isMarkdownFile(filePath) && !this.shouldIgnoreFile(filePath)) {
              existingFiles.push(filePath)
            }
          }
        }
      } else {
        // 如果监控器未启动，手动扫描目录
        const fs = await import('fs')
        
        for (const watchPath of this.config.monitoring.watchPaths) {
          if (fs.existsSync(watchPath)) {
            await this.scanDirectory(watchPath, existingFiles)
          }
        }
      }

      this.logger.info('扫描完成', { fileCount: existingFiles.length })
      return existingFiles

    } catch (error) {
      this.logger.error('扫描现有文件失败', error)
      throw error
    }
  }

  /**
   * 递归扫描目录
   */
  async scanDirectory(dirPath, existingFiles) {
    const fs = await import('fs')
    
    try {
      const items = await fs.promises.readdir(dirPath)
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item)
        const stat = await fs.promises.stat(itemPath)
        
        if (stat.isDirectory()) {
          // 检查是否应该忽略此目录
          if (!this.shouldIgnoreFile(itemPath)) {
            await this.scanDirectory(itemPath, existingFiles)
          }
        } else if (stat.isFile()) {
          // 检查是否为markdown文件且不应被忽略
          if (this.isMarkdownFile(itemPath) && !this.shouldIgnoreFile(itemPath)) {
            existingFiles.push(itemPath)
          }
        }
      }
    } catch (error) {
      this.logger.warn('扫描目录失败', error, { dirPath })
    }
  }

  /**
   * 获取监控统计信息
   */
  getStats() {
    if (!this.watcher) {
      return { isWatching: false }
    }

    const watchedPaths = this.watcher.getWatched()
    let totalFiles = 0
    let markdownFiles = 0

    for (const [dir, files] of Object.entries(watchedPaths)) {
      totalFiles += files.length
      markdownFiles += files.filter(file => 
        this.isMarkdownFile(path.join(dir, file))
      ).length
    }

    return {
      isWatching: this.isWatching,
      totalFiles,
      markdownFiles,
      watchedDirectories: Object.keys(watchedPaths).length,
      debounceTimers: this.debounceTimers.size
    }
  }

  /**
   * 停止文件监控
   */
  async stop() {
    if (!this.isWatching) {
      this.logger.warn('文件监控未在运行')
      return
    }

    this.logger.info('正在停止文件监控')

    try {
      // 清除所有防抖定时器
      for (const timer of this.debounceTimers.values()) {
        clearTimeout(timer)
      }
      this.debounceTimers.clear()

      // 关闭监控器
      if (this.watcher) {
        await this.watcher.close()
        this.watcher = null
      }

      this.isWatching = false
      this.removeAllListeners()
      
      this.logger.info('文件监控已停止')

    } catch (error) {
      this.logger.error('停止文件监控失败', error)
      throw error
    }
  }

  /**
   * 重启文件监控
   */
  async restart() {
    this.logger.info('重启文件监控')
    
    try {
      await this.stop()
      await new Promise(resolve => setTimeout(resolve, 1000)) // 等待1秒
      this.start()
    } catch (error) {
      this.logger.error('重启文件监控失败', error)
      throw error
    }
  }
}

export default FileWatcher