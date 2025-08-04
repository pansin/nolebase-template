import ApiClient from '../utils/apiClient.js'

/**
 * ChatGLM4.5 API客户端
 * 专门用于与ChatGLM API交互，生成笔记摘要
 */
class ChatGLMClient {
  constructor(config, logger) {
    this.config = config.chatglm
    this.logger = logger.child({ module: 'ChatGLMClient' })
    this.apiClient = new ApiClient(this.config, logger)
    
    // 验证配置
    this.validateConfig()
  }

  /**
   * 验证配置
   */
  validateConfig() {
    if (!this.config.apiKey) {
      throw new Error('ChatGLM API密钥未配置')
    }
    
    if (!this.config.endpoint) {
      throw new Error('ChatGLM API端点未配置')
    }

    this.logger.info('ChatGLM配置验证通过', {
      endpoint: this.config.endpoint,
      model: this.config.model,
      maxTokens: this.config.maxTokens
    })
  }

  /**
   * 生成笔记摘要
   */
  async generateSummary(title, content, options = {}) {
    try {
      this.logger.info('开始生成摘要', { 
        title, 
        contentLength: content.length,
        options 
      })

      // 构建提示词
      const prompt = this.buildPrompt(title, content, options)
      
      // 构建请求数据
      const requestData = {
        model: this.config.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || this.config.maxTokens,
        temperature: options.temperature || this.config.temperature,
        top_p: 0.9,
        stream: false
      }

      // 发送API请求
      const response = await this.apiClient.post(
        this.config.endpoint,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`
          },
          timeout: this.config.timeout,
          retryAttempts: this.config.retryAttempts
        }
      )

      // 解析响应
      const summary = this.parseResponse(response)
      
      this.logger.info('摘要生成成功', {
        title,
        summaryLength: summary.description?.length || 0,
        tagsCount: summary.tags?.length || 0
      })

      return summary

    } catch (error) {
      this.logger.error('摘要生成失败', error, { title })
      throw error
    }
  }

  /**
   * 构建提示词
   */
  buildPrompt(title, content, options = {}) {
    const summaryLength = options.summaryLength || 100
    const includeCode = content.includes('```')
    const includeImages = content.includes('![')

    let prompt = `请为以下笔记内容生成一个简洁的摘要：

标题：${title}
内容：${content.substring(0, 2000)}${content.length > 2000 ? '...' : ''}

要求：
1. 摘要长度控制在${summaryLength}字以内
2. 突出核心观点和关键信息
3. 提取3-5个相关标签
4. 使用简洁明了的语言`

    if (includeCode) {
      prompt += '\n5. 如果包含技术内容，请说明应用场景和技术要点'
    }

    if (includeImages) {
      prompt += '\n6. 如果包含图片，请简要描述图片内容的作用'
    }

    prompt += `

请以JSON格式返回，格式如下：
{
  "description": "摘要内容",
  "tags": ["标签1", "标签2", "标签3"],
  "category": "内容分类",
  "keyPoints": ["要点1", "要点2"]
}`

    return prompt
  }

  /**
   * 解析API响应
   */
  parseResponse(response) {
    try {
      if (!response.choices || response.choices.length === 0) {
        throw new Error('API响应格式错误：缺少choices字段')
      }

      const content = response.choices[0].message?.content
      if (!content) {
        throw new Error('API响应格式错误：缺少content字段')
      }

      // 尝试解析JSON
      let parsedContent
      try {
        // 提取JSON部分（可能包含在代码块中）
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                         content.match(/\{[\s\S]*\}/)
        
        if (jsonMatch) {
          parsedContent = JSON.parse(jsonMatch[1] || jsonMatch[0])
        } else {
          // 如果没有找到JSON，尝试直接解析
          parsedContent = JSON.parse(content)
        }
      } catch (parseError) {
        this.logger.warn('JSON解析失败，使用文本解析', { content })
        parsedContent = this.parseTextResponse(content)
      }

      // 验证和标准化响应
      return this.normalizeResponse(parsedContent)

    } catch (error) {
      this.logger.error('响应解析失败', error, { response })
      throw new Error(`响应解析失败: ${error.message}`)
    }
  }

  /**
   * 解析文本响应（当JSON解析失败时的备用方案）
   */
  parseTextResponse(content) {
    const lines = content.split('\n').filter(line => line.trim())
    
    return {
      description: lines[0] || '无法生成摘要',
      tags: ['AI生成', '文本解析'],
      category: '未分类',
      keyPoints: lines.slice(1, 3)
    }
  }

  /**
   * 标准化响应格式
   */
  normalizeResponse(parsed) {
    return {
      description: parsed.description || '无法生成摘要',
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : ['AI生成'],
      category: parsed.category || '未分类',
      keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints.slice(0, 3) : [],
      confidence: parsed.confidence || 0.8
    }
  }

  /**
   * 批量生成摘要
   */
  async generateBatchSummaries(items, options = {}) {
    const results = []
    const batchSize = options.batchSize || 3
    const delay = options.delay || 2000

    this.logger.info('开始批量生成摘要', { 
      itemCount: items.length, 
      batchSize 
    })

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize)
      
      this.logger.debug('处理批次', { 
        batchIndex: Math.floor(i / batchSize) + 1,
        batchSize: batch.length 
      })

      const batchPromises = batch.map(async (item) => {
        try {
          const summary = await this.generateSummary(item.title, item.content, options)
          return { ...item, summary, success: true }
        } catch (error) {
          this.logger.error('批次项目处理失败', error, { title: item.title })
          return { ...item, error: error.message, success: false }
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // 批次间延迟，避免API限流
      if (i + batchSize < items.length) {
        this.logger.debug('批次间延迟', { delay })
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    const successCount = results.filter(r => r.success).length
    this.logger.info('批量摘要生成完成', { 
      total: results.length, 
      success: successCount, 
      failed: results.length - successCount 
    })

    return results
  }

  /**
   * 测试API连接
   */
  async testConnection() {
    try {
      this.logger.info('测试ChatGLM API连接')
      
      const testSummary = await this.generateSummary(
        '测试标题',
        '这是一个测试内容，用于验证API连接是否正常。',
        { maxTokens: 100 }
      )

      this.logger.info('API连接测试成功', { testSummary })
      return { success: true, summary: testSummary }

    } catch (error) {
      this.logger.error('API连接测试失败', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取API使用统计
   */
  getUsageStats() {
    // 这里可以添加API使用统计逻辑
    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0
    }
  }

  /**
   * 更新配置
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig }
    this.apiClient.updateConfig(this.config)
    this.validateConfig()
  }
}

export default ChatGLMClient