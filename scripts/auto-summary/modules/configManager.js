import fs from 'fs'
import path from 'path'
import { EventEmitter } from 'events'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 配置管理模块
 * 支持配置文件读取、合并和热重载
 */
class ConfigManager extends EventEmitter {
  constructor() {
    super()
    this.config = null
    this.configPath = path.join(__dirname, '../config')
    this.watchers = new Map()
    
    this.loadConfig()
    this.setupWatchers()
  }

  /**
   * 加载配置文件
   */
  loadConfig() {
    try {
      // 加载默认配置
      const defaultConfig = this.loadConfigFile('default.json')
      
      // 根据环境加载特定配置
      const env = process.env.NODE_ENV || 'development'
      let envConfig = {}
      
      const envConfigPath = path.join(this.configPath, `${env}.json`)
      if (fs.existsSync(envConfigPath)) {
        envConfig = this.loadConfigFile(`${env}.json`)
      }
      
      // 合并配置
      this.config = this.mergeConfig(defaultConfig, envConfig)
      
      // 从环境变量覆盖敏感配置
      this.applyEnvironmentOverrides()
      
    } catch (error) {
      throw new Error(`配置加载失败: ${error.message}`)
    }
  }

  /**
   * 加载单个配置文件
   */
  loadConfigFile(filename) {
    const filePath = path.join(this.configPath, filename)
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`配置文件不存在: ${filePath}`)
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(content)
    } catch (error) {
      throw new Error(`配置文件解析失败 ${filename}: ${error.message}`)
    }
  }

  /**
   * 深度合并配置对象
   */
  mergeConfig(target, source) {
    const result = { ...target }
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.mergeConfig(target[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }
    
    return result
  }

  /**
   * 从环境变量应用配置覆盖
   */
  applyEnvironmentOverrides() {
    // ChatGLM API Key - 支持多种环境变量名
    if (process.env.GLM_API_KEY) {
      this.config.chatglm.apiKey = process.env.GLM_API_KEY
    } else if (process.env.CHATGLM_API_KEY) {
      this.config.chatglm.apiKey = process.env.CHATGLM_API_KEY
    }
    
    // API端点
    if (process.env.CHATGLM_ENDPOINT) {
      this.config.chatglm.endpoint = process.env.CHATGLM_ENDPOINT
    }
    
    // 日志级别
    if (process.env.LOG_LEVEL) {
      this.config.logging.level = process.env.LOG_LEVEL
    }
  }

  /**
   * 设置配置文件监控
   */
  setupWatchers() {
    if (process.env.NODE_ENV === 'production') {
      return // 生产环境不启用热重载
    }

    try {
      const configFiles = ['default.json', 'development.json']
      
      configFiles.forEach(filename => {
        const filePath = path.join(this.configPath, filename)
        
        if (fs.existsSync(filePath)) {
          const watcher = fs.watchFile(filePath, { interval: 1000 }, () => {
            this.reloadConfig()
          })
          
          this.watchers.set(filename, watcher)
        }
      })
    } catch (error) {
      console.warn('配置文件监控设置失败:', error.message)
    }
  }

  /**
   * 重新加载配置
   */
  reloadConfig() {
    try {
      const oldConfig = { ...this.config }
      this.loadConfig()
      
      console.log('配置已重新加载')
      this.emit('configChanged', this.config, oldConfig)
    } catch (error) {
      console.error('配置重新加载失败:', error.message)
    }
  }

  /**
   * 获取当前配置
   */
  getConfig() {
    if (!this.config) {
      throw new Error('配置尚未加载')
    }
    
    return { ...this.config } // 返回副本防止外部修改
  }

  /**
   * 更新配置
   */
  updateConfig(updates) {
    this.config = this.mergeConfig(this.config, updates)
    this.emit('configChanged', this.config)
  }

  /**
   * 验证配置完整性
   */
  validateConfig() {
    const config = this.getConfig()
    const errors = []

    // 验证必需字段
    if (!config.chatglm?.apiKey) {
      errors.push('ChatGLM API Key 未配置')
    }

    if (!config.monitoring?.watchPaths?.length) {
      errors.push('监控路径未配置')
    }

    if (!config.content?.indexFilePath) {
      errors.push('索引文件路径未配置')
    }

    if (errors.length > 0) {
      throw new Error(`配置验证失败:\n${errors.join('\n')}`)
    }

    return true
  }

  /**
   * 清理资源
   */
  destroy() {
    // 停止文件监控
    this.watchers.forEach((watcher, filename) => {
      fs.unwatchFile(path.join(this.configPath, filename))
    })
    
    this.watchers.clear()
    this.removeAllListeners()
  }
}

export default ConfigManager