import os from 'os'
import process from 'process'

/**
 * 系统监控模块
 * 监控系统资源使用情况和运行状态
 */
class SystemMonitor {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ module: 'SystemMonitor' })
    this.startTime = new Date()
    this.metrics = {
      requests: 0,
      successes: 0,
      failures: 0,
      avgResponseTime: 0,
      totalResponseTime: 0
    }
    this.isMonitoring = false
    this.monitorInterval = null
  }

  /**
   * 开始监控
   */
  startMonitoring(intervalMs = 60000) {
    if (this.isMonitoring) {
      this.logger.warn('监控已在运行中')
      return
    }

    this.isMonitoring = true
    this.logger.info('开始系统监控', { intervalMs })

    // 定期收集系统指标
    this.monitorInterval = setInterval(() => {
      this.collectMetrics()
    }, intervalMs)

    // 收集初始指标
    this.collectMetrics()
  }

  /**
   * 停止监控
   */
  stopMonitoring() {
    if (!this.isMonitoring) {
      return
    }

    this.isMonitoring = false
    
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval)
      this.monitorInterval = null
    }

    this.logger.info('系统监控已停止')
  }

  /**
   * 收集系统指标
   */
  collectMetrics() {
    try {
      const metrics = {
        timestamp: new Date(),
        system: this.getSystemMetrics(),
        process: this.getProcessMetrics(),
        application: this.getApplicationMetrics()
      }

      this.logger.debug('系统指标收集完成', {
        cpu: metrics.system.cpu.usage,
        memory: metrics.process.memory.usage,
        uptime: metrics.process.uptime
      })

      return metrics
    } catch (error) {
      this.logger.error('收集系统指标失败', error)
      return null
    }
  }

  /**
   * 获取系统指标
   */
  getSystemMetrics() {
    const cpus = os.cpus()
    const loadAvg = os.loadavg()
    
    return {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      cpu: {
        count: cpus.length,
        model: cpus[0]?.model || 'unknown',
        usage: this.getCpuUsage(),
        loadAverage: {
          '1min': loadAvg[0],
          '5min': loadAvg[1],
          '15min': loadAvg[2]
        }
      },
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem(),
        usage: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2)
      },
      uptime: os.uptime()
    }
  }

  /**
   * 获取进程指标
   */
  getProcessMetrics() {
    const memUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage()
    
    return {
      pid: process.pid,
      uptime: process.uptime(),
      memory: {
        rss: memUsage.rss,
        heapTotal: memUsage.heapTotal,
        heapUsed: memUsage.heapUsed,
        external: memUsage.external,
        usage: ((memUsage.heapUsed / memUsage.heapTotal) * 100).toFixed(2)
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      }
    }
  }

  /**
   * 获取应用指标
   */
  getApplicationMetrics() {
    const uptime = Date.now() - this.startTime.getTime()
    
    return {
      startTime: this.startTime,
      uptime,
      requests: this.metrics.requests,
      successes: this.metrics.successes,
      failures: this.metrics.failures,
      successRate: this.metrics.requests > 0 
        ? ((this.metrics.successes / this.metrics.requests) * 100).toFixed(2)
        : 0,
      avgResponseTime: this.metrics.avgResponseTime
    }
  }

  /**
   * 获取CPU使用率（简化版本）
   */
  getCpuUsage() {
    const cpus = os.cpus()
    let totalIdle = 0
    let totalTick = 0

    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type]
      }
      totalIdle += cpu.times.idle
    })

    const idle = totalIdle / cpus.length
    const total = totalTick / cpus.length
    const usage = 100 - ~~(100 * idle / total)

    return usage
  }

  /**
   * 记录请求指标
   */
  recordRequest(success = true, responseTime = 0) {
    this.metrics.requests++
    
    if (success) {
      this.metrics.successes++
    } else {
      this.metrics.failures++
    }

    if (responseTime > 0) {
      this.metrics.totalResponseTime += responseTime
      this.metrics.avgResponseTime = this.metrics.totalResponseTime / this.metrics.requests
    }
  }

  /**
   * 检查系统资源状态
   */
  checkResourceStatus() {
    const metrics = this.collectMetrics()
    if (!metrics) {
      return { status: 'unknown', message: '无法获取系统指标' }
    }

    const warnings = []
    const errors = []

    // 检查内存使用
    const memoryUsage = parseFloat(metrics.system.memory.usage)
    if (memoryUsage > 90) {
      errors.push(`系统内存使用率过高: ${memoryUsage}%`)
    } else if (memoryUsage > 80) {
      warnings.push(`系统内存使用率较高: ${memoryUsage}%`)
    }

    // 检查进程内存使用
    const processMemoryUsage = parseFloat(metrics.process.memory.usage)
    if (processMemoryUsage > 90) {
      errors.push(`进程内存使用率过高: ${processMemoryUsage}%`)
    } else if (processMemoryUsage > 80) {
      warnings.push(`进程内存使用率较高: ${processMemoryUsage}%`)
    }

    // 检查CPU负载
    const loadAvg1min = metrics.system.cpu.loadAverage['1min']
    const cpuCount = metrics.system.cpu.count
    if (loadAvg1min > cpuCount * 2) {
      errors.push(`CPU负载过高: ${loadAvg1min.toFixed(2)} (CPU数: ${cpuCount})`)
    } else if (loadAvg1min > cpuCount) {
      warnings.push(`CPU负载较高: ${loadAvg1min.toFixed(2)} (CPU数: ${cpuCount})`)
    }

    // 检查成功率
    const successRate = parseFloat(metrics.application.successRate)
    if (successRate < 80 && metrics.application.requests > 10) {
      errors.push(`请求成功率过低: ${successRate}%`)
    } else if (successRate < 90 && metrics.application.requests > 10) {
      warnings.push(`请求成功率较低: ${successRate}%`)
    }

    // 确定整体状态
    let status = 'healthy'
    let message = '系统运行正常'

    if (errors.length > 0) {
      status = 'critical'
      message = errors.join('; ')
    } else if (warnings.length > 0) {
      status = 'warning'
      message = warnings.join('; ')
    }

    return {
      status,
      message,
      warnings,
      errors,
      metrics,
      timestamp: new Date()
    }
  }

  /**
   * 生成系统报告
   */
  generateSystemReport() {
    const resourceStatus = this.checkResourceStatus()
    const metrics = resourceStatus.metrics

    return {
      summary: {
        status: resourceStatus.status,
        uptime: metrics.application.uptime,
        requests: metrics.application.requests,
        successRate: metrics.application.successRate
      },
      system: {
        platform: metrics.system.platform,
        cpu: {
          count: metrics.system.cpu.count,
          usage: metrics.system.cpu.usage,
          loadAverage: metrics.system.cpu.loadAverage
        },
        memory: {
          total: this.formatBytes(metrics.system.memory.total),
          used: this.formatBytes(metrics.system.memory.used),
          usage: metrics.system.memory.usage + '%'
        }
      },
      process: {
        pid: metrics.process.pid,
        uptime: this.formatDuration(metrics.process.uptime * 1000),
        memory: {
          heapUsed: this.formatBytes(metrics.process.memory.heapUsed),
          heapTotal: this.formatBytes(metrics.process.memory.heapTotal),
          usage: metrics.process.memory.usage + '%'
        }
      },
      application: {
        startTime: metrics.application.startTime,
        uptime: this.formatDuration(metrics.application.uptime),
        requests: metrics.application.requests,
        successes: metrics.application.successes,
        failures: metrics.application.failures,
        successRate: metrics.application.successRate + '%',
        avgResponseTime: metrics.application.avgResponseTime.toFixed(2) + 'ms'
      },
      status: resourceStatus,
      generatedAt: new Date()
    }
  }

  /**
   * 格式化字节数
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  /**
   * 格式化持续时间
   */
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days}天 ${hours % 24}小时 ${minutes % 60}分钟`
    } else if (hours > 0) {
      return `${hours}小时 ${minutes % 60}分钟`
    } else if (minutes > 0) {
      return `${minutes}分钟 ${seconds % 60}秒`
    } else {
      return `${seconds}秒`
    }
  }

  /**
   * 获取监控状态
   */
  getMonitoringStatus() {
    return {
      isMonitoring: this.isMonitoring,
      startTime: this.startTime,
      uptime: Date.now() - this.startTime.getTime()
    }
  }

  /**
   * 重置应用指标
   */
  resetMetrics() {
    this.metrics = {
      requests: 0,
      successes: 0,
      failures: 0,
      avgResponseTime: 0,
      totalResponseTime: 0
    }
    
    this.logger.info('应用指标已重置')
  }
}

export default SystemMonitor