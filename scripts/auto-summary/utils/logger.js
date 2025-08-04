import winston from 'winston'
import path from 'path'
import fs from 'fs'

/**
 * 日志工具类
 * 支持控制台和文件输出，自动日志轮转
 */
class Logger {
  constructor(config = {}) {
    this.config = {
      level: 'info',
      file: 'logs/auto-summary.log',
      maxSize: '10m',
      maxFiles: 5,
      datePattern: 'YYYY-MM-DD',
      ...config
    }
    
    this.logger = this.createLogger()
  }

  /**
   * 创建Winston日志实例
   */
  createLogger() {
    // 确保日志目录存在
    const logDir = path.dirname(this.config.file)
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }

    // 定义日志格式
    const logFormat = winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.printf(({ timestamp, level, message, stack }) => {
        let log = `${timestamp} [${level.toUpperCase()}] ${message}`
        if (stack) {
          log += `\n${stack}`
        }
        return log
      })
    )

    // 配置传输器
    const transports = [
      // 控制台输出
      new winston.transports.Console({
        level: this.config.level,
        format: winston.format.combine(
          winston.format.colorize(),
          logFormat
        )
      })
    ]

    // 文件输出
    if (this.config.file) {
      transports.push(
        new winston.transports.File({
          filename: this.config.file,
          level: this.config.level,
          format: logFormat,
          maxsize: this.parseSize(this.config.maxSize),
          maxFiles: this.config.maxFiles,
          tailable: true
        })
      )
    }

    return winston.createLogger({
      level: this.config.level,
      transports,
      exitOnError: false
    })
  }

  /**
   * 解析文件大小字符串
   */
  parseSize(sizeStr) {
    const units = {
      'b': 1,
      'k': 1024,
      'm': 1024 * 1024,
      'g': 1024 * 1024 * 1024
    }

    const match = sizeStr.toLowerCase().match(/^(\d+)([bkmg]?)$/)
    if (!match) {
      return 10 * 1024 * 1024 // 默认10MB
    }

    const [, size, unit] = match
    return parseInt(size) * (units[unit] || 1)
  }

  /**
   * 记录调试信息
   */
  debug(message, meta = {}) {
    this.logger.debug(message, meta)
  }

  /**
   * 记录一般信息
   */
  info(message, meta = {}) {
    this.logger.info(message, meta)
  }

  /**
   * 记录警告信息
   */
  warn(message, meta = {}) {
    this.logger.warn(message, meta)
  }

  /**
   * 记录错误信息
   */
  error(message, error = null, meta = {}) {
    if (error instanceof Error) {
      this.logger.error(message, { 
        error: error.message, 
        stack: error.stack,
        ...meta 
      })
    } else {
      this.logger.error(message, meta)
    }
  }

  /**
   * 记录致命错误
   */
  fatal(message, error = null, meta = {}) {
    this.error(`[FATAL] ${message}`, error, meta)
  }

  /**
   * 创建子日志器
   */
  child(defaultMeta = {}) {
    return {
      debug: (message, meta = {}) => this.debug(message, { ...defaultMeta, ...meta }),
      info: (message, meta = {}) => this.info(message, { ...defaultMeta, ...meta }),
      warn: (message, meta = {}) => this.warn(message, { ...defaultMeta, ...meta }),
      error: (message, error = null, meta = {}) => this.error(message, error, { ...defaultMeta, ...meta }),
      fatal: (message, error = null, meta = {}) => this.fatal(message, error, { ...defaultMeta, ...meta })
    }
  }

  /**
   * 设置日志级别
   */
  setLevel(level) {
    this.logger.level = level
    this.logger.transports.forEach(transport => {
      transport.level = level
    })
  }

  /**
   * 清理旧日志文件
   */
  cleanup() {
    try {
      const logDir = path.dirname(this.config.file)
      const logBasename = path.basename(this.config.file, path.extname(this.config.file))
      
      if (!fs.existsSync(logDir)) return

      const files = fs.readdirSync(logDir)
        .filter(file => file.startsWith(logBasename))
        .map(file => ({
          name: file,
          path: path.join(logDir, file),
          stat: fs.statSync(path.join(logDir, file))
        }))
        .sort((a, b) => b.stat.mtime - a.stat.mtime)

      // 保留最新的文件，删除多余的
      if (files.length > this.config.maxFiles) {
        const filesToDelete = files.slice(this.config.maxFiles)
        filesToDelete.forEach(file => {
          try {
            fs.unlinkSync(file.path)
            this.info(`已删除旧日志文件: ${file.name}`)
          } catch (error) {
            this.warn(`删除日志文件失败: ${file.name}`, error)
          }
        })
      }
    } catch (error) {
      this.warn('日志清理失败', error)
    }
  }

  /**
   * 关闭日志器
   */
  close() {
    return new Promise((resolve) => {
      this.logger.close(() => {
        resolve()
      })
    })
  }
}

export default Logger