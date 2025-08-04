import axios from 'axios'

/**
 * API客户端工具类
 * 提供HTTP请求的通用功能，包括重试、超时、错误处理
 */
class ApiClient {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ module: 'ApiClient' })
    this.client = this.createAxiosInstance()
  }

  /**
   * 创建axios实例
   */
  createAxiosInstance() {
    const instance = axios.create({
      timeout: this.config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Nolebase-AutoSummary/1.0.0'
      }
    })

    // 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        this.logger.debug('发送API请求', {
          url: config.url,
          method: config.method,
          headers: this.sanitizeHeaders(config.headers)
        })
        return config
      },
      (error) => {
        this.logger.error('请求拦截器错误', error)
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        this.logger.debug('收到API响应', {
          status: response.status,
          statusText: response.statusText,
          dataSize: JSON.stringify(response.data).length
        })
        return response
      },
      (error) => {
        this.logger.error('API响应错误', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.message
        })
        return Promise.reject(error)
      }
    )

    return instance
  }

  /**
   * 清理敏感信息的请求头
   */
  sanitizeHeaders(headers) {
    const sanitized = { ...headers }
    if (sanitized.Authorization) {
      sanitized.Authorization = 'Bearer ***'
    }
    return sanitized
  }

  /**
   * 发送POST请求，支持重试
   */
  async post(url, data, options = {}) {
    const maxRetries = options.retryAttempts || this.config.retryAttempts || 3
    const retryDelay = options.retryDelay || 1000

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.logger.debug('发送POST请求', { 
          url, 
          attempt, 
          maxRetries,
          dataSize: JSON.stringify(data).length 
        })

        const response = await this.client.post(url, data, {
          timeout: options.timeout || this.config.timeout,
          ...options
        })

        this.logger.info('POST请求成功', { 
          url, 
          status: response.status,
          attempt 
        })

        return response.data

      } catch (error) {
        const isLastAttempt = attempt === maxRetries
        const shouldRetry = this.shouldRetry(error)

        this.logger.warn('POST请求失败', {
          url,
          attempt,
          maxRetries,
          error: error.message,
          status: error.response?.status,
          shouldRetry: shouldRetry && !isLastAttempt
        })

        if (isLastAttempt || !shouldRetry) {
          throw this.createApiError(error, attempt)
        }

        // 指数退避重试
        const delay = retryDelay * Math.pow(2, attempt - 1)
        this.logger.debug('等待重试', { delay, nextAttempt: attempt + 1 })
        await this.sleep(delay)
      }
    }
  }

  /**
   * 判断是否应该重试
   */
  shouldRetry(error) {
    // 网络错误或超时
    if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
      return true
    }

    // HTTP状态码
    if (error.response) {
      const status = error.response.status
      // 5xx服务器错误或429限流
      return status >= 500 || status === 429
    }

    return false
  }

  /**
   * 创建标准化的API错误
   */
  createApiError(originalError, attempt) {
    const error = new Error(`API请求失败 (尝试${attempt}次)`)
    error.name = 'ApiError'
    error.originalError = originalError
    error.status = originalError.response?.status
    error.statusText = originalError.response?.statusText
    error.data = originalError.response?.data
    error.isRetryable = this.shouldRetry(originalError)
    
    return error
  }

  /**
   * 睡眠函数
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 发送GET请求
   */
  async get(url, options = {}) {
    try {
      this.logger.debug('发送GET请求', { url })
      const response = await this.client.get(url, options)
      return response.data
    } catch (error) {
      throw this.createApiError(error, 1)
    }
  }

  /**
   * 检查API连接状态
   */
  async healthCheck(url) {
    try {
      const startTime = Date.now()
      await this.get(url)
      const responseTime = Date.now() - startTime
      
      return {
        status: 'healthy',
        responseTime,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }
  }

  /**
   * 更新配置
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig }
    this.client = this.createAxiosInstance()
    this.logger.info('API客户端配置已更新')
  }
}

export default ApiClient