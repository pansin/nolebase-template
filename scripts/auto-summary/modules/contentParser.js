import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * 内容解析和元数据提取模块
 * 专门处理markdown文件的解析、元数据提取和内容分析
 */
class ContentParser {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ module: 'ContentParser' })
  }

  /**
   * 解析单个markdown文件
   */
  async parseFile(filePath) {
    try {
      this.logger.debug('开始解析文件', { filePath })

      // 读取文件内容
      const rawContent = await fs.promises.readFile(filePath, 'utf8')
      
      // 解析frontmatter和内容
      const parsed = matter(rawContent)
      
      // 获取文件统计信息
      const stats = await fs.promises.stat(filePath)
      
      // 提取各种元数据
      const metadata = {
        // 基本信息
        filePath,
        relativePath: path.relative(process.cwd(), filePath),
        fileName: path.basename(filePath),
        fileSize: stats.size,
        createdAt: stats.birthtime,
        updatedAt: stats.mtime,
        lastModified: stats.mtime.getTime(),
        
        // 内容信息
        rawContent,
        content: parsed.content,
        frontmatter: parsed.data,
        
        // 提取的元数据
        title: this.extractTitle(parsed, filePath),
        category: this.extractCategory(filePath, parsed.data),
        tags: this.extractTags(parsed.data, parsed.content),
        author: this.extractAuthor(parsed.data),
        description: this.extractDescription(parsed.data, parsed.content),
        
        // 内容分析
        wordCount: this.calculateWordCount(parsed.content),
        readingTime: this.estimateReadingTime(parsed.content),
        headings: this.extractHeadings(parsed.content),
        links: this.extractLinks(parsed.content),
        images: this.extractImages(parsed.content),
        codeBlocks: this.extractCodeBlocks(parsed.content),
        
        // 内容特征
        hasCode: parsed.content.includes('```'),
        hasImages: /!\[.*?\]\(.*?\)/.test(parsed.content),
        hasLinks: /\[.*?\]\(.*?\)/.test(parsed.content),
        hasTables: parsed.content.includes('|'),
        hasMath: parsed.content.includes('$$') || parsed.content.includes('$'),
        
        // 语言检测
        language: this.detectLanguage(parsed.content),
        
        // 内容摘要（简单提取）
        excerpt: this.extractExcerpt(parsed.content),
        
        // 解析时间
        parsedAt: new Date()
      }

      this.logger.debug('文件解析完成', {
        filePath,
        title: metadata.title,
        wordCount: metadata.wordCount,
        category: metadata.category
      })

      return metadata

    } catch (error) {
      this.logger.error('文件解析失败', error, { filePath })
      throw error
    }
  }

  /**
   * 提取标题
   */
  extractTitle(parsed, filePath) {
    // 1. 优先使用frontmatter中的title
    if (parsed.data.title) {
      return parsed.data.title.toString().trim()
    }

    // 2. 使用文件名作为标题（优先级提高）
    const basename = path.basename(filePath, path.extname(filePath))
    const fileTitle = basename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    
    // 如果文件名不是默认格式，直接使用
    if (basename !== 'index' && basename !== 'README' && basename.length > 2) {
      return fileTitle
    }

    // 3. 从内容中提取第一个一级标题
    const h1Match = parsed.content.match(/^#\s+(.+)$/m)
    if (h1Match) {
      return h1Match[1].trim()
    }

    // 4. 从内容中提取第一个任意级别标题
    const headingMatch = parsed.content.match(/^#{1,6}\s+(.+)$/m)
    if (headingMatch) {
      return headingMatch[1].trim()
    }

    // 5. 最后使用文件名
    return fileTitle
  }

  /**
   * 提取分类
   */
  extractCategory(filePath, frontmatter) {
    // 1. 优先使用frontmatter中的category
    if (frontmatter.category) {
      return frontmatter.category.toString().trim()
    }

    // 2. 使用frontmatter中的categories的第一个
    if (frontmatter.categories && Array.isArray(frontmatter.categories)) {
      return frontmatter.categories[0].toString().trim()
    }

    // 3. 从路径推断分类
    const relativePath = path.relative(process.cwd(), filePath)
    const pathParts = relativePath.split(path.sep)
    
    if (pathParts.length > 2 && pathParts[0] === '笔记') {
      return pathParts[1]
    }
    
    // 4. 从文件路径的父目录名推断
    const parentDir = path.basename(path.dirname(filePath))
    if (parentDir !== '.' && parentDir !== '笔记') {
      return parentDir
    }
    
    return '未分类'
  }

  /**
   * 提取标签
   */
  extractTags(frontmatter, content) {
    const tags = new Set()

    // 1. 从frontmatter中提取tags
    if (frontmatter.tags) {
      if (Array.isArray(frontmatter.tags)) {
        frontmatter.tags.forEach(tag => tags.add(tag.toString().trim()))
      } else {
        tags.add(frontmatter.tags.toString().trim())
      }
    }

    // 2. 从frontmatter中提取keywords
    if (frontmatter.keywords) {
      if (Array.isArray(frontmatter.keywords)) {
        frontmatter.keywords.forEach(keyword => tags.add(keyword.toString().trim()))
      }
    }

    // 3. 从内容中自动提取标签
    const autoTags = this.extractAutoTags(content)
    autoTags.forEach(tag => tags.add(tag))

    return Array.from(tags).slice(0, 10) // 限制标签数量
  }

  /**
   * 自动提取标签
   */
  extractAutoTags(content) {
    const tags = []

    // 技术相关标签
    if (content.includes('JavaScript') || content.includes('js')) tags.push('JavaScript')
    if (content.includes('Python') || content.includes('python')) tags.push('Python')
    if (content.includes('React') || content.includes('react')) tags.push('React')
    if (content.includes('Vue') || content.includes('vue')) tags.push('Vue')
    if (content.includes('Node.js') || content.includes('nodejs')) tags.push('Node.js')
    if (content.includes('AI') || content.includes('人工智能')) tags.push('AI')
    if (content.includes('机器学习') || content.includes('Machine Learning')) tags.push('机器学习')
    if (content.includes('深度学习') || content.includes('Deep Learning')) tags.push('深度学习')
    
    // 内容类型标签
    if (content.includes('```')) tags.push('代码')
    if (/!\[.*?\]\(.*?\)/.test(content)) tags.push('图文')
    if (content.includes('TODO') || content.includes('待办')) tags.push('待办')
    if (content.includes('笔记') || content.includes('Note')) tags.push('笔记')
    if (content.includes('教程') || content.includes('Tutorial')) tags.push('教程')
    if (content.includes('总结') || content.includes('Summary')) tags.push('总结')

    return tags
  }

  /**
   * 提取作者
   */
  extractAuthor(frontmatter) {
    return frontmatter.author || frontmatter.creator || null
  }

  /**
   * 提取描述
   */
  extractDescription(frontmatter, content) {
    // 1. 优先使用frontmatter中的description
    if (frontmatter.description) {
      return frontmatter.description.toString().trim()
    }

    // 2. 使用frontmatter中的excerpt
    if (frontmatter.excerpt) {
      return frontmatter.excerpt.toString().trim()
    }

    // 3. 提取第一段文字作为描述
    const firstParagraph = content
      .replace(/^#{1,6}\s+.+$/gm, '') // 移除标题
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
      .split('\n')
      .find(line => line.trim().length > 10)

    if (firstParagraph) {
      return firstParagraph.trim().substring(0, 200) + '...'
    }

    return null
  }

  /**
   * 计算字数
   */
  calculateWordCount(content) {
    // 移除markdown语法
    const plainText = content
      .replace(/```[\s\S]*?```/g, '') // 代码块
      .replace(/`[^`]+`/g, '') // 行内代码
      .replace(/!\[.*?\]\(.*?\)/g, '') // 图片
      .replace(/\[.*?\]\(.*?\)/g, '') // 链接
      .replace(/[#*_~`]/g, '') // markdown符号
      .replace(/\s+/g, ' ') // 多个空白字符
      .trim()

    // 中文字符数 + 英文单词数
    const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
    const englishWords = plainText
      .replace(/[\u4e00-\u9fa5]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0).length
    
    return chineseChars + englishWords
  }

  /**
   * 估算阅读时间（分钟）
   */
  estimateReadingTime(content) {
    const wordCount = this.calculateWordCount(content)
    // 中文阅读速度约300字/分钟，英文约200词/分钟，取平均值250
    return Math.ceil(wordCount / 250)
  }

  /**
   * 提取标题结构
   */
  extractHeadings(content) {
    const headings = []
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        anchor: this.generateAnchor(match[2].trim())
      })
    }

    return headings
  }

  /**
   * 生成锚点
   */
  generateAnchor(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  /**
   * 提取链接
   */
  extractLinks(content) {
    const links = []
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let match

    while ((match = linkRegex.exec(content)) !== null) {
      links.push({
        text: match[1],
        url: match[2],
        isExternal: /^https?:\/\//.test(match[2])
      })
    }

    return links
  }

  /**
   * 提取图片
   */
  extractImages(content) {
    const images = []
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    let match

    while ((match = imageRegex.exec(content)) !== null) {
      images.push({
        alt: match[1] || '',
        src: match[2],
        isExternal: /^https?:\/\//.test(match[2])
      })
    }

    return images
  }

  /**
   * 提取代码块
   */
  extractCodeBlocks(content) {
    const codeBlocks = []
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      codeBlocks.push({
        language: match[1] || 'text',
        code: match[2].trim(),
        lineCount: match[2].split('\n').length
      })
    }

    return codeBlocks
  }

  /**
   * 检测主要语言
   */
  detectLanguage(content) {
    const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
    const totalChars = content.replace(/\s/g, '').length
    
    if (chineseChars / totalChars > 0.3) {
      return 'zh-CN'
    } else {
      return 'en'
    }
  }

  /**
   * 提取摘要
   */
  extractExcerpt(content, maxLength = 200) {
    // 移除markdown语法，提取纯文本
    const plainText = content
      .replace(/^#{1,6}\s+.+$/gm, '') // 移除标题
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/`[^`]+`/g, '') // 移除行内代码
      .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 保留链接文字
      .replace(/[*_~]/g, '') // 移除格式符号
      .replace(/\n+/g, ' ') // 换行转空格
      .replace(/\s+/g, ' ') // 多个空格合并
      .trim()

    if (plainText.length <= maxLength) {
      return plainText
    }

    // 在单词边界截断
    const truncated = plainText.substring(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')
    
    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...'
    }
    
    return truncated + '...'
  }

  /**
   * 批量解析文件
   */
  async parseFiles(filePaths, options = {}) {
    this.logger.info('开始批量解析文件', { count: filePaths.length })

    const results = []
    const batchSize = options.batchSize || 5
    const delay = options.delay || 100

    for (let i = 0; i < filePaths.length; i += batchSize) {
      const batch = filePaths.slice(i, i + batchSize)
      
      this.logger.debug('处理解析批次', { 
        batchIndex: Math.floor(i / batchSize) + 1,
        batchSize: batch.length 
      })

      const batchPromises = batch.map(filePath => this.parseFile(filePath))
      const batchResults = await Promise.allSettled(batchPromises)

      // 处理结果
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        } else {
          this.logger.error('批次解析失败', result.reason, { 
            filePath: batch[index] 
          })
        }
      })

      // 批次间延迟
      if (i + batchSize < filePaths.length && delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    this.logger.info('批量解析完成', { 
      total: results.length,
      successful: results.length 
    })

    return results
  }

  /**
   * 验证文件是否为有效的markdown文件
   */
  async validateMarkdownFile(filePath) {
    try {
      const stats = await fs.promises.stat(filePath)
      
      if (!stats.isFile()) {
        return { valid: false, reason: '不是文件' }
      }

      if (!filePath.endsWith('.md') && !filePath.endsWith('.markdown')) {
        return { valid: false, reason: '不是markdown文件' }
      }

      const content = await fs.promises.readFile(filePath, 'utf8')
      
      if (content.length === 0) {
        return { valid: false, reason: '文件为空' }
      }

      return { valid: true }

    } catch (error) {
      return { valid: false, reason: error.message }
    }
  }
}

export default ContentParser