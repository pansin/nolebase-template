import fs from 'fs'
import path from 'path'

/**
 * 摘要管理器
 * 负责摘要的存储、排序、去重和管理
 */
class SummaryManager {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ module: 'SummaryManager' })
    this.summaries = new Map() // 使用Map存储摘要，key为文件路径
    this.maxSummaries = config.content.maxSummaries || 10
    this.dataFile = path.join(process.cwd(), 'scripts/auto-summary/data/summaries.json')
    
    // 确保数据目录存在
    this.ensureDataDirectory()
    
    // 加载已存在的摘要
    this.loadSummaries()
  }

  /**
   * 确保数据目录存在
   */
  ensureDataDirectory() {
    const dataDir = path.dirname(this.dataFile)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
      this.logger.info('创建数据目录', { dataDir })
    }
  }

  /**
   * 加载已存在的摘要
   */
  loadSummaries() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf8')
        const summariesArray = JSON.parse(data)
        
        // 转换为Map结构
        summariesArray.forEach(summary => {
          this.summaries.set(summary.filePath, summary)
        })
        
        this.logger.info('加载已存在的摘要', { count: this.summaries.size })
      }
    } catch (error) {
      this.logger.warn('加载摘要数据失败', error)
      this.summaries.clear()
    }
  }

  /**
   * 保存摘要到文件
   */
  async saveSummaries() {
    try {
      const summariesArray = Array.from(this.summaries.values())
      const data = JSON.stringify(summariesArray, null, 2)
      
      await fs.promises.writeFile(this.dataFile, data, 'utf8')
      this.logger.debug('摘要数据已保存', { count: summariesArray.length })
    } catch (error) {
      this.logger.error('保存摘要数据失败', error)
      throw error
    }
  }

  /**
   * 添加或更新摘要
   */
  async addSummary(summary) {
    try {
      // 验证摘要对象
      this.validateSummary(summary)
      
      // 检查是否已存在
      const existing = this.summaries.get(summary.filePath)
      if (existing) {
        this.logger.debug('更新现有摘要', { 
          filePath: summary.filePath,
          title: summary.title 
        })
      } else {
        this.logger.info('添加新摘要', { 
          filePath: summary.filePath,
          title: summary.title 
        })
      }

      // 添加到集合中
      this.summaries.set(summary.filePath, summary)
      
      // 维护最大数量限制
      await this.maintainMaxCount()
      
      // 保存到文件
      await this.saveSummaries()
      
      return true
    } catch (error) {
      this.logger.error('添加摘要失败', error, { 
        filePath: summary?.filePath 
      })
      throw error
    }
  }

  /**
   * 验证摘要对象
   */
  validateSummary(summary) {
    const required = ['id', 'title', 'description', 'filePath', 'generatedAt']
    
    for (const field of required) {
      if (!summary[field]) {
        throw new Error(`摘要对象缺少必需字段: ${field}`)
      }
    }

    if (typeof summary.wordCount !== 'number' || summary.wordCount < 0) {
      throw new Error('字数统计必须是非负数')
    }

    if (!Array.isArray(summary.tags)) {
      throw new Error('标签必须是数组')
    }
  }

  /**
   * 维护最大数量限制
   */
  async maintainMaxCount() {
    if (this.summaries.size <= this.maxSummaries) {
      return
    }

    // 按生成时间排序，保留最新的
    const summariesArray = Array.from(this.summaries.values())
    summariesArray.sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt))
    
    // 保留最新的maxSummaries个
    const toKeep = summariesArray.slice(0, this.maxSummaries)
    const toRemove = summariesArray.slice(this.maxSummaries)
    
    // 清空并重新添加
    this.summaries.clear()
    toKeep.forEach(summary => {
      this.summaries.set(summary.filePath, summary)
    })
    
    if (toRemove.length > 0) {
      this.logger.info('移除旧摘要以维持数量限制', { 
        removed: toRemove.length,
        kept: toKeep.length 
      })
    }
  }

  /**
   * 删除摘要
   */
  async removeSummary(filePath) {
    try {
      const summary = this.summaries.get(filePath)
      if (summary) {
        this.summaries.delete(filePath)
        await this.saveSummaries()
        
        this.logger.info('删除摘要', { 
          filePath,
          title: summary.title 
        })
        return true
      }
      
      return false
    } catch (error) {
      this.logger.error('删除摘要失败', error, { filePath })
      throw error
    }
  }

  /**
   * 获取摘要
   */
  getSummary(filePath) {
    return this.summaries.get(filePath)
  }

  /**
   * 获取所有摘要，按指定顺序排序
   */
  getAllSummaries(sortBy = 'generatedAt', order = 'desc') {
    const summariesArray = Array.from(this.summaries.values())
    
    summariesArray.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      // 处理日期类型
      if (sortBy.includes('At') || sortBy === 'lastModified') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }
      
      // 处理字符串类型
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (order === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      }
    })
    
    return summariesArray
  }

  /**
   * 获取最新的摘要
   */
  getLatestSummaries(count = this.maxSummaries) {
    return this.getAllSummaries('generatedAt', 'desc').slice(0, count)
  }

  /**
   * 按分类获取摘要
   */
  getSummariesByCategory(category) {
    return Array.from(this.summaries.values())
      .filter(summary => summary.category === category)
      .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt))
  }

  /**
   * 按标签获取摘要
   */
  getSummariesByTag(tag) {
    return Array.from(this.summaries.values())
      .filter(summary => summary.tags.includes(tag))
      .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt))
  }

  /**
   * 搜索摘要
   */
  searchSummaries(query, options = {}) {
    const {
      fields = ['title', 'description', 'tags'],
      caseSensitive = false,
      limit = 20
    } = options

    const searchTerm = caseSensitive ? query : query.toLowerCase()
    const results = []

    for (const summary of this.summaries.values()) {
      let score = 0
      
      // 在指定字段中搜索
      for (const field of fields) {
        let fieldValue = summary[field]
        
        if (!fieldValue) continue
        
        if (Array.isArray(fieldValue)) {
          fieldValue = fieldValue.join(' ')
        }
        
        if (!caseSensitive) {
          fieldValue = fieldValue.toLowerCase()
        }
        
        if (fieldValue.includes(searchTerm)) {
          // 标题匹配权重更高
          score += field === 'title' ? 10 : field === 'description' ? 5 : 1
        }
      }
      
      if (score > 0) {
        results.push({ summary, score })
      }
    }
    
    // 按分数排序
    results.sort((a, b) => b.score - a.score)
    
    return results.slice(0, limit).map(result => result.summary)
  }

  /**
   * 获取统计信息
   */
  getStats() {
    const summaries = Array.from(this.summaries.values())
    
    if (summaries.length === 0) {
      return {
        total: 0,
        categories: {},
        tags: {},
        languages: {},
        averageWordCount: 0,
        totalWordCount: 0
      }
    }

    const stats = {
      total: summaries.length,
      categories: {},
      tags: {},
      languages: {},
      totalWordCount: 0
    }

    summaries.forEach(summary => {
      // 分类统计
      stats.categories[summary.category] = (stats.categories[summary.category] || 0) + 1
      
      // 标签统计
      summary.tags.forEach(tag => {
        stats.tags[tag] = (stats.tags[tag] || 0) + 1
      })
      
      // 语言统计
      stats.languages[summary.language] = (stats.languages[summary.language] || 0) + 1
      
      // 字数统计
      stats.totalWordCount += summary.wordCount || 0
    })

    stats.averageWordCount = Math.round(stats.totalWordCount / summaries.length)

    return stats
  }

  /**
   * 检查摘要是否需要更新
   */
  needsUpdate(filePath, lastModified) {
    const summary = this.summaries.get(filePath)
    if (!summary) {
      return true // 不存在，需要生成
    }
    
    // 比较文件修改时间
    return summary.lastModified < lastModified
  }

  /**
   * 清理无效摘要（对应文件不存在）
   */
  async cleanupInvalidSummaries() {
    const toRemove = []
    
    for (const [filePath, summary] of this.summaries) {
      try {
        await fs.promises.access(filePath)
      } catch (error) {
        // 文件不存在
        toRemove.push(filePath)
      }
    }
    
    if (toRemove.length > 0) {
      toRemove.forEach(filePath => {
        this.summaries.delete(filePath)
      })
      
      await this.saveSummaries()
      
      this.logger.info('清理无效摘要', { 
        removed: toRemove.length 
      })
    }
    
    return toRemove.length
  }

  /**
   * 导出摘要数据
   */
  exportSummaries(format = 'json') {
    const summaries = this.getAllSummaries()
    
    switch (format) {
      case 'json':
        return JSON.stringify(summaries, null, 2)
      
      case 'csv':
        if (summaries.length === 0) return ''
        
        const headers = ['title', 'category', 'wordCount', 'readingTime', 'generatedAt', 'filePath']
        const csvRows = [headers.join(',')]
        
        summaries.forEach(summary => {
          const row = headers.map(header => {
            const value = summary[header] || ''
            return `"${value.toString().replace(/"/g, '""')}"`
          })
          csvRows.push(row.join(','))
        })
        
        return csvRows.join('\n')
      
      default:
        throw new Error(`不支持的导出格式: ${format}`)
    }
  }

  /**
   * 获取摘要数量
   */
  getCount() {
    return this.summaries.size
  }

  /**
   * 清空所有摘要
   */
  async clearAll() {
    this.summaries.clear()
    await this.saveSummaries()
    this.logger.info('清空所有摘要')
  }
}

export default SummaryManager