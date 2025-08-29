/**
 * 错误处理和监控模块
 * 提供全面的错误分类、处理策略和系统监控功能
 */
class ErrorHandler {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ module: 'ErrorHandler' })
    this.errorStats = {
      total: 0,
      byType: {},
      byModule: {},
      recent: []
    }
    this.retryAttempts = new Map()
    this.maxRecentErrors = 100
  }

  /**
   * 处理错误
   */
  handleError(error, context = {}) {
    const errorInfo = this.classifyError(error, context)
    this.recordError(errorInfo)
    
    this.logger.error('错误处理', error, {
      type: errorInfo.type,
      severity: errorInfo.severity,
      module: errorInfo.module,
      context
    })

    // 根据错误类型执行相应的处理策略
    return this.executeErrorStrategy(errorInfo, context)
  }

  /**
   * 分类错误
   */
  classifyError(error, context) {
    const errorInfo = {
      error,
      type: 'unknown',
      severity: 'medium',
      module: context.module || 'unknown',
      timestamp: new Date(),
      context,
      retryable: false,
      strategy: 'log'
    }

    // API相关错误
    if (error.name === 'ApiError' || error.message.includes('API')) {
      errorInfo.type = 'api'
      errorInfo.severity = 'high'
      errorInfo.retryable = true
      errorInfo.strategy = 'retry'
    }
    // 网络错误
    else if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      errorInfo.type = 'network'
      errorInfo.severity = 'high'
      errorInfo.retryable = true
      errorInfo.strategy = 'retry'
    }
    // 文件系统错误
    else if (error.code === 'ENOENT' || error.code === 'EACCES' || error.code === 'EMFILE') {
      errorInfo.type = 'filesystem'
      errorInfo.severity = 'medium'
      errorInfo.retryable = error.code !== 'EACCES'
      errorInfo.strategy = error.code === 'EACCES' ? 'skip' : 'retry'
    }
    // 解析错误
    else if (error.name === 'SyntaxError' || error.message.includes('parse') || error.message.includes('JSON')) {
      errorInfo.type = 'parsing'
      errorInfo.severity = 'low'
      errorInfo.retryable = false
      errorInfo.strategy = 'fallback'
    }
    // 配置错误
    else if (error.message.includes('config') || error.message.includes('配置')) {
      errorInfo.type = 'configuration'
      errorInfo.severity = 'critical'
      errorInfo.retryable = false
      errorInfo.strategy = 'abort'
    }
    // 内存错误
    else if (error.message.includes('memory') || error.code === 'ENOMEM') {
      errorInfo.type = 'memory'
      errorInfo.severity = 'critical'
      errorInfo.retryable = false
      errorInfo.strategy = 'cleanup'
    }

    return errorInfo
  }

  /**
   * 记录错误统计
   */
  recordError(errorInfo) {
    this.errorStats.total++
    this.errorStats.byType[errorInfo.type] = (this.errorStats.byType[errorInfo.type] || 0) + 1
    this.errorStats.byModule[errorInfo.module] = (this.errorStats.byModule[errorInfo.module] || 0) + 1
    
    // 记录最近的错误
    this.errorStats.recent.unshift({
      type: errorInfo.type,
      module: errorInfo.module,
      message: errorInfo.error.message,
      timestamp: errorInfo.timestamp,
      severity: errorInfo.severity
    })
    
    // 限制最近错误的数量
    if (this.errorStats.recent.length > this.maxRecentErrors) {
      this.errorStats.recent = this.errorStats.recent.slice(0, this.maxRecentErrors)
    }
  }

  /**
   * 执行错误处理策略
   */
  async executeErrorStrategy(errorInfo, context) {
    const { strategy, type, error } = errorInfo
    const contextKey = `${context.module || 'unknown'}:${context.operation || 'unknown'}`

    switch (strategy) {
      case 'retry':
        return await this.handleRetryStrategy(errorInfo, contextKey)
      
      case 'fallback':
        return this.handleFallbackStrategy(errorInfo, context)
      
      case 'skip':
        return this.handleSkipStrategy(errorInfo, context)
      
      case 'cleanup':
        return await this.handleCleanupStrategy(errorInfo, context)
      
      case 'abort':
        return this.handleAbortStrategy(errorInfo, context)
      
      default:
        return this.handleLogStrategy(errorInfo, context)
    }
  }

  /**
   * 重试策略
   */
  async handleRetryStrategy(errorInfo, contextKey) {
    const maxRetries = this.config.errorHandling?.maxRetries || 3
    const currentAttempts = this.retryAttempts.get(contextKey) || 0
    
    if (currentAttempts >= maxRetries) {
      this.logger.warn('达到最大重试次数', { 
        contextKey, 
        attempts: currentAttempts,
        maxRetries 
      })
      this.retryAttempts.delete(contextKey)
      return { success: false, action: 'max_retries_reached' }
    }

    this.retryAttempts.set(contextKey, currentAttempts + 1)
    
    // 指数退避延迟
    const delay = Math.min(1000 * Math.pow(2, currentAttempts), 30000)
    
    this.logger.info('准备重试', { 
      contextKey, 
      attempt: currentAttempts + 1,
      delay 
    })
    
    await new Promise(resolve => setTimeout(resolve, delay))
    
    return { success: true, action: 'retry', delay }
  }

  /**
   * 备用方案策略
   */
  handleFallbackStrategy(errorInfo, context) {
    this.logger.info('使用备用方案', { 
      type: errorInfo.type,
      context: context.operation 
    })
    
    return { success: true, action: 'fallback' }
  }

  /**
   * 跳过策略
   */
  handleSkipStrategy(errorInfo, context) {
    this.logger.warn('跳过处理', { 
      type: errorInfo.type,
      context: context.operation 
    })
    
    return { success: true, action: 'skip' }
  }

  /**
   * 清理策略
   */
  async handleCleanupStrategy(errorInfo, context) {
    this.logger.warn('执行清理操作', { 
      type: errorInfo.type 
    })
    
    // 执行内存清理
    if (global.gc) {
      global.gc()
    }
    
    return { success: true, action: 'cleanup' }
  }

  /**
   * 中止策略
   */
  handleAbortStrategy(errorInfo, context) {
    this.logger.error('严重错误，建议中止操作', { 
      type: errorInfo.type,
      message: errorInfo.error.message 
    })
    
    return { success: false, action: 'abort' }
  }

  /**
   * 日志策略
   */
  handleLogStrategy(errorInfo, context) {
    // 错误已经在handleError中记录，这里只返回结果
    return { success: true, action: 'logged' }
  }

  /**
   * 清除重试计数
   */
  clearRetryCount(contextKey) {
    this.retryAttempts.delete(contextKey)
  }

  /**
   * 获取错误统计
   */
  getErrorStats() {
    return {
      ...this.errorStats,
      retryContexts: this.retryAttempts.size
    }
  }

  /**
   * 检查系统健康状态
   */
  checkSystemHealth() {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    
    // 统计最近一小时的错误
    const recentErrors = this.errorStats.recent.filter(
      error => error.timestamp > oneHourAgo
    )
    
    const criticalErrors = recentErrors.filter(
      error => error.severity === 'critical'
    ).length
    
    const highErrors = recentErrors.filter(
      error => error.severity === 'high'
    ).length
    
    // 健康状态评估
    let healthStatus = 'healthy'
    let healthScore = 100
    
    if (criticalErrors > 0) {
      healthStatus = 'critical'
      healthScore = Math.max(0, 100 - criticalErrors * 50)
    } else if (highErrors > 5) {
      healthStatus = 'degraded'
      healthScore = Math.max(20, 100 - highErrors * 10)
    } else if (recentErrors.length > 20) {
      healthStatus = 'warning'
      healthScore = Math.max(50, 100 - recentErrors.length * 2)
    }
    
    return {
      status: healthStatus,
      score: healthScore,
      recentErrors: recentErrors.length,
      criticalErrors,
      highErrors,
      timestamp: now,
      recommendations: this.generateHealthRecommendations(healthStatus, {
        criticalErrors,
        highErrors,
        totalRecent: recentErrors.length
      })
    }
  }

  /**
   * 生成健康建议
   */
  generateHealthRecommendations(status, stats) {
    const recommendations = []
    
    if (stats.criticalErrors > 0) {
      recommendations.push('检查系统配置和资源可用性')
      recommendations.push('考虑重启服务以清理状态')
    }
    
    if (stats.highErrors > 5) {
      recommendations.push('检查网络连接和API服务状态')
      recommendations.push('考虑增加重试间隔时间')
    }
    
    if (stats.totalRecent > 20) {
      recommendations.push('检查日志以识别错误模式')
      recommendations.push('考虑调整处理策略')
    }
    
    if (status === 'healthy') {
      recommendations.push('系统运行正常，继续监控')
    }
    
    return recommendations
  }

  /**
   * 生成错误报告
   */
  generateErrorReport() {
    const health = this.checkSystemHealth()
    const stats = this.getErrorStats()
    
    return {
      summary: {
        totalErrors: stats.total,
        healthStatus: health.status,
        healthScore: health.score
      },
      breakdown: {
        byType: stats.byType,
        byModule: stats.byModule
      },
      recent: stats.recent.slice(0, 10), // 最近10个错误
      health,
      recommendations: health.recommendations,
      generatedAt: new Date()
    }
  }

  /**
   * 重置统计信息
   */
  resetStats() {
    this.errorStats = {
      total: 0,
      byType: {},
      byModule: {},
      recent: []
    }
    this.retryAttempts.clear()
    
    this.logger.info('错误统计已重置')
  }
}

export default ErrorHandler