import fs from 'fs'
import path from 'path'
import ChatGLMClient from './chatglmClient.js'
import ContentParser from './contentParser.js'

/**
 * 摘要生成器
 * 整合内容解析和AI摘要生成功能
 */
class SummaryGenerator {
  constructor(config, logger, options = {}) {
    this.config = config
    this.logger = logger.child({ module: 'SummaryGenerator' })
    this.cache = new Map() // 简单的内存缓存
    this.testMode = options.testMode || false
    
    // 创建内容解析器
    this.contentParser = new ContentParser(config, logger)
    
    // 只有在非测试模式且有API密钥时才创建ChatGLM客户端
    if (!this.testMode && config.chatglm?.apiKey) {
      this.chatglmClient = new ChatGLMClient(config, logger)
    } else {
      this.chatglmClient = null
      if (!this.testMode) {
        this.logger.warn('ChatGLM客户端未初始化：API密钥未配置')
      }
    }
  }

  /**
   * 为单个文件生成摘要
   */
  async generateForFile(filePath) {
    try {
      this.logger.info('开始为文件生成摘要', { filePath })

      // 使用ContentParser提取文件元数据
      const metadata = await this.contentParser.parseFile(filePath)
      
      // 检查缓存
      const cacheKey = this.getCacheKey(filePath, metadata.lastModified)
      if (this.cache.has(cacheKey)) {
        this.logger.debug('使用缓存的摘要', { filePath })
        return this.cache.get(cacheKey)
      }

      // 生成摘要
      let aiSummary
      if (this.chatglmClient) {
        aiSummary = await this.chatglmClient.generateSummary(
          metadata.title,
          metadata.content,
          {
            summaryLength: this.config.content.summaryLength,
            maxTokens: this.config.chatglm.maxTokens
          }
        )
      } else {
        // 测试模式或无API密钥时使用模拟摘要
        aiSummary = this.generateMockSummary(metadata.title, metadata.content)
      }

      // 构建完整的摘要对象
      const summary = this.buildSummaryObject(metadata, aiSummary)

      // 缓存结果
      this.cache.set(cacheKey, summary)

      this.logger.info('文件摘要生成完成', { 
        filePath, 
        title: summary.title,
        descriptionLength: summary.description.length 
      })

      return summary

    } catch (error) {
      this.logger.error('文件摘要生成失败', error, { filePath })
      
      // 返回默认摘要
      return this.createFallbackSummary(filePath, error)
    }
  }



  /**
   * 构建摘要对象
   */
  buildSummaryObject(metadata, aiSummary) {
    // 合并标签，去重并限制数量
    const allTags = [
      ...(metadata.tags || []),
      ...(aiSummary.tags || [])
    ]
    const uniqueTags = [...new Set(allTags)].slice(0, 8)

    return {
      id: this.generateId(metadata.filePath),
      title: metadata.title,
      description: aiSummary.description,
      excerpt: metadata.excerpt, // 使用ContentParser提取的摘要
      tags: uniqueTags,
      category: aiSummary.category || metadata.category,
      keyPoints: aiSummary.keyPoints || [],
      
      // 文件信息
      filePath: metadata.filePath,
      relativePath: metadata.relativePath,
      fileName: metadata.fileName,
      fileSize: metadata.fileSize,
      
      // 内容信息
      wordCount: metadata.wordCount,
      readingTime: metadata.readingTime,
      language: metadata.language,
      
      // 媒体内容
      thumbnail: metadata.images?.[0]?.src || null,
      hasImages: metadata.hasImages,
      hasCode: metadata.hasCode,
      hasLinks: metadata.hasLinks,
      hasTables: metadata.hasTables,
      hasMath: metadata.hasMath,
      
      // 结构信息
      headings: metadata.headings,
      links: metadata.links,
      images: metadata.images,
      codeBlocks: metadata.codeBlocks,
      
      // 时间信息
      createdAt: metadata.createdAt,
      updatedAt: metadata.updatedAt,
      lastModified: metadata.lastModified,
      
      // AI生成信息
      confidence: aiSummary.confidence || 0.8,
      generatedAt: new Date(),
      
      // 作者信息
      author: metadata.author
    }
  }

  /**
   * 生成唯一ID
   */
  generateId(filePath) {
    return Buffer.from(filePath).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)
  }

  /**
   * 创建备用摘要（当AI生成失败时）
   */
  async createFallbackSummary(filePath, error) {
    try {
      // 尝试使用ContentParser解析基本信息
      let metadata
      try {
        metadata = await this.contentParser.parseFile(filePath)
      } catch (parseError) {
        // 如果解析也失败，使用最基本的信息
        metadata = {
          title: path.basename(filePath, path.extname(filePath)),
          category: '未分类',
          filePath,
          relativePath: path.relative(process.cwd(), filePath),
          wordCount: 0,
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }

      return {
        id: this.generateId(filePath),
        title: metadata.title,
        description: `无法生成AI摘要：${error.message}。${metadata.excerpt || '请检查文件内容或API配置。'}`,
        excerpt: metadata.excerpt || null,
        tags: [...(metadata.tags || []), '错误', '待处理'].slice(0, 5),
        category: metadata.category,
        keyPoints: ['生成失败', '需要人工处理'],
        
        // 文件信息
        filePath: metadata.filePath,
        relativePath: metadata.relativePath,
        fileName: metadata.fileName || path.basename(filePath),
        fileSize: metadata.fileSize || 0,
        
        // 内容信息
        wordCount: metadata.wordCount || 0,
        readingTime: metadata.readingTime || 0,
        language: metadata.language || 'unknown',
        
        // 媒体内容
        thumbnail: null,
        hasImages: metadata.hasImages || false,
        hasCode: metadata.hasCode || false,
        hasLinks: metadata.hasLinks || false,
        hasTables: metadata.hasTables || false,
        hasMath: metadata.hasMath || false,
        
        // 时间信息
        createdAt: metadata.createdAt || new Date(),
        updatedAt: metadata.updatedAt || new Date(),
        lastModified: metadata.lastModified || Date.now(),
        
        // AI生成信息
        confidence: 0,
        generatedAt: new Date(),
        error: error.message
      }
    } catch (fallbackError) {
      this.logger.error('创建备用摘要失败', fallbackError)
      throw fallbackError
    }
  }

  /**
   * 获取缓存键
   */
  getCacheKey(filePath, lastModified) {
    return `${filePath}:${lastModified}`
  }

  /**
   * 批量生成摘要
   */
  async generateBatch(filePaths, options = {}) {
    this.logger.info('开始批量生成摘要', { count: filePaths.length })

    const results = []
    const batchSize = options.batchSize || 3
    const delay = options.delay || 1000

    for (let i = 0; i < filePaths.length; i += batchSize) {
      const batch = filePaths.slice(i, i + batchSize)
      
      this.logger.debug('处理批次', { 
        batchIndex: Math.floor(i / batchSize) + 1,
        batchSize: batch.length 
      })

      const batchPromises = batch.map(filePath => this.generateForFile(filePath))
      const batchResults = await Promise.allSettled(batchPromises)

      // 处理结果
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        } else {
          this.logger.error('批次项目失败', result.reason, { 
            filePath: batch[index] 
          })
          results.push(this.createFallbackSummary(batch[index], result.reason))
        }
      })

      // 批次间延迟
      if (i + batchSize < filePaths.length) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    this.logger.info('批量摘要生成完成', { 
      total: results.length,
      successful: results.filter(r => !r.error).length 
    })

    return results
  }

  /**
   * 清理缓存
   */
  clearCache() {
    this.cache.clear()
    this.logger.info('摘要缓存已清理')
  }

  /**
   * 生成模拟摘要（用于测试或无API密钥时）
   */
  generateMockSummary(title, content) {
    const contentLength = content.length
    const hasCode = content.includes('```')
    const hasImages = content.includes('![')
    
    let description = `这是对"${title}"的模拟摘要。`
    
    if (contentLength > 1000) {
      description += '这是一篇较长的文章，'
    } else if (contentLength > 500) {
      description += '这是一篇中等长度的文章，'
    } else {
      description += '这是一篇简短的文章，'
    }
    
    if (hasCode) {
      description += '包含代码示例，'
    }
    
    if (hasImages) {
      description += '包含图片内容，'
    }
    
    description += `内容长度约${contentLength}字符。`
    
    // 从内容中提取一些关键词作为标签
    const tags = ['模拟生成']
    if (hasCode) tags.push('技术')
    if (hasImages) tags.push('图文')
    if (content.includes('AI') || content.includes('人工智能')) tags.push('AI')
    if (content.includes('技术') || content.includes('开发')) tags.push('开发')
    
    return {
      description,
      tags: tags.slice(0, 5),
      category: '模拟分类',
      keyPoints: ['模拟要点1', '模拟要点2'],
      confidence: 0.5
    }
  }

  /**
   * 获取缓存统计
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }

  /**
   * 测试摘要生成
   */
  async test() {
    try {
      this.logger.info('测试摘要生成功能')
      
      // 测试API连接
      const connectionTest = await this.chatglmClient.testConnection()
      if (!connectionTest.success) {
        throw new Error(`API连接测试失败: ${connectionTest.error}`)
      }

      this.logger.info('摘要生成器测试通过')
      return { success: true }

    } catch (error) {
      this.logger.error('摘要生成器测试失败', error)
      return { success: false, error: error.message }
    }
  }
}

export default SummaryGenerator