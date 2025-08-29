import fs from 'fs'
import path from 'path'

/**
 * 内容管理模块
 * 负责管理摘要列表的增删改查，更新index.md文件
 */
class ContentManager {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ module: 'ContentManager' })
    this.indexFilePath = config.content.indexFilePath || '笔记/index.md'
    this.maxSummaries = config.content.maxSummaries || 10
    
    // 模板配置
    this.templates = {
      summaryCard: this.loadTemplate('summary-card'),
      indexHeader: this.loadTemplate('index-header')
    }
  }

  /**
   * 加载模板
   */
  loadTemplate(templateName) {
    try {
      const templatePath = path.join(process.cwd(), 'scripts/auto-summary/templates', `${templateName}.md`)
      if (fs.existsSync(templatePath)) {
        return fs.readFileSync(templatePath, 'utf8')
      }
    } catch (error) {
      this.logger.warn('模板加载失败', error, { templateName })
    }
    
    // 返回默认模板
    return this.getDefaultTemplate(templateName)
  }

  /**
   * 获取默认模板
   */
  getDefaultTemplate(templateName) {
    const templates = {
      'summary-card': `## 📝 [{{title}}]({{relativePath}})

**分类**: {{category}} | **创建时间**: {{createdDate}} | **字数**: {{wordCount}} | **阅读时间**: {{readingTime}}分钟

{{description}}

**标签**: {{tags}}

---`,
      'index-header': `# 📒 笔记

## 志诚AI笔记

志诚AI笔记 [PansiNote](https://Pansinote.netlify.app)，这里是 📒 笔记分区

## 📋 最新笔记摘要

以下是最新添加的{{count}}篇笔记摘要：

`
    }
    
    return templates[templateName] || ''
  }

  /**
   * 更新index.md文件
   */
  async updateIndexFile(summaries) {
    try {
      this.logger.info('开始更新index.md文件', { 
        summariesCount: summaries.length,
        indexFilePath: this.indexFilePath 
      })

      // 确保目录存在
      const indexDir = path.dirname(this.indexFilePath)
      if (!fs.existsSync(indexDir)) {
        fs.mkdirSync(indexDir, { recursive: true })
        this.logger.info('创建目录', { indexDir })
      }

      // 读取现有内容（如果存在）
      let existingContent = ''
      let preservedContent = ''
      
      if (fs.existsSync(this.indexFilePath)) {
        existingContent = await fs.promises.readFile(this.indexFilePath, 'utf8')
        preservedContent = this.extractPreservedContent(existingContent)
      }

      // 生成新内容
      const newContent = await this.generateIndexContent(summaries, preservedContent)

      // 原子性写入
      await this.atomicWrite(this.indexFilePath, newContent)

      this.logger.info('index.md文件更新完成', {
        contentLength: newContent.length,
        summariesCount: summaries.length
      })

      return true
    } catch (error) {
      this.logger.error('更新index.md文件失败', error)
      throw error
    }
  }

  /**
   * 提取需要保留的内容
   */
  extractPreservedContent(content) {
    // 查找摘要区域的开始和结束标记
    const summaryStartMarker = '## 📋 最新笔记摘要'
    const summaryEndMarker = '## 想要自己部署和在本地启动强大的 Nólëbase 知识库'
    
    const startIndex = content.indexOf(summaryStartMarker)
    const endIndex = content.indexOf(summaryEndMarker)
    
    if (startIndex === -1 || endIndex === -1) {
      // 如果没有找到标记，保留整个内容的后半部分
      const lines = content.split('\n')
      const headerEndIndex = lines.findIndex(line => line.includes('笔记分区'))
      
      if (headerEndIndex !== -1 && headerEndIndex < lines.length - 1) {
        return lines.slice(headerEndIndex + 1).join('\n')
      }
      
      return content
    }
    
    // 返回摘要区域之后的内容
    return content.substring(endIndex)
  }

  /**
   * 生成index.md内容
   */
  async generateIndexContent(summaries, preservedContent = '') {
    const limitedSummaries = summaries.slice(0, this.maxSummaries)
    
    // 生成头部
    const header = this.renderTemplate(this.templates.indexHeader, {
      count: limitedSummaries.length
    })

    // 生成摘要卡片
    const summaryCards = limitedSummaries.map(summary => 
      this.renderSummaryCard(summary)
    ).join('\n\n')

    // 组合内容
    const content = [
      header,
      summaryCards,
      '',
      preservedContent.trim()
    ].filter(Boolean).join('\n')

    return content
  }

  /**
   * 渲染摘要卡片
   */
  renderSummaryCard(summary) {
    // 处理链接路径，确保正确的VitePress链接格式
    let linkPath = summary.relativePath
    
    // 移除.md扩展名
    if (linkPath.endsWith('.md')) {
      linkPath = linkPath.slice(0, -3)
    }
    
    // 确保链接以/开头（绝对路径）
    if (!linkPath.startsWith('/')) {
      linkPath = '/' + linkPath
    }
    
    // URL编码处理中文字符
    linkPath = linkPath.split('/').map(segment => {
      // 对每个路径段进行URL编码，但保留斜杠
      return encodeURIComponent(segment)
    }).join('/')
    
    const templateData = {
      title: this.escapeMarkdown(summary.title),
      relativePath: linkPath,
      category: summary.category || '未分类',
      createdDate: this.formatDate(summary.createdAt),
      wordCount: summary.wordCount || 0,
      readingTime: summary.readingTime || Math.ceil((summary.wordCount || 0) / 250),
      description: this.truncateDescription(summary.description, 150),
      tags: this.formatTags(summary.tags || []),
      author: summary.author || '',
      confidence: summary.confidence || 0
    }

    return this.renderTemplate(this.templates.summaryCard, templateData)
  }

  /**
   * 渲染模板
   */
  renderTemplate(template, data) {
    let result = template
    
    for (const [key, value] of Object.entries(data)) {
      const placeholder = new RegExp(`{{${key}}}`, 'g')
      result = result.replace(placeholder, value || '')
    }
    
    return result
  }

  /**
   * 转义Markdown特殊字符
   */
  escapeMarkdown(text) {
    if (!text) return ''
    
    // 转义常见的markdown字符，但保留一些格式
    return text
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
  }

  /**
   * 格式化日期
   */
  formatDate(date) {
    if (!date) return '未知'
    
    const d = new Date(date)
    if (isNaN(d.getTime())) return '未知'
    
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  /**
   * 截断描述
   */
  truncateDescription(description, maxLength = 150) {
    if (!description) return '暂无描述'
    
    if (description.length <= maxLength) {
      return description
    }
    
    // 在单词边界截断
    const truncated = description.substring(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')
    const lastPunctuation = Math.max(
      truncated.lastIndexOf('。'),
      truncated.lastIndexOf('！'),
      truncated.lastIndexOf('？'),
      truncated.lastIndexOf('.')
    )
    
    if (lastPunctuation > maxLength * 0.8) {
      return truncated.substring(0, lastPunctuation + 1)
    }
    
    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...'
    }
    
    return truncated + '...'
  }

  /**
   * 格式化标签
   */
  formatTags(tags) {
    if (!Array.isArray(tags) || tags.length === 0) {
      return '无标签'
    }
    
    return tags.slice(0, 5).map(tag => `#${tag}`).join(' ')
  }

  /**
   * 原子性写入文件
   */
  async atomicWrite(filePath, content) {
    const tempPath = `${filePath}.tmp`
    const backupPath = `${filePath}.backup`
    
    try {
      // 如果原文件存在，创建备份
      if (fs.existsSync(filePath)) {
        await fs.promises.copyFile(filePath, backupPath)
      }
      
      // 写入临时文件
      await fs.promises.writeFile(tempPath, content, 'utf8')
      
      // 原子性重命名
      await fs.promises.rename(tempPath, filePath)
      
      // 删除备份文件
      if (fs.existsSync(backupPath)) {
        await fs.promises.unlink(backupPath)
      }
      
      this.logger.debug('文件原子性写入成功', { filePath })
      
    } catch (error) {
      // 恢复备份
      if (fs.existsSync(backupPath)) {
        try {
          await fs.promises.rename(backupPath, filePath)
          this.logger.info('已从备份恢复文件', { filePath })
        } catch (restoreError) {
          this.logger.error('备份恢复失败', restoreError)
        }
      }
      
      // 清理临时文件
      if (fs.existsSync(tempPath)) {
        try {
          await fs.promises.unlink(tempPath)
        } catch (cleanupError) {
          this.logger.warn('临时文件清理失败', cleanupError)
        }
      }
      
      throw error
    }
  }

  /**
   * 验证index.md文件
   */
  async validateIndexFile() {
    try {
      if (!fs.existsSync(this.indexFilePath)) {
        return { valid: false, reason: '文件不存在' }
      }

      const content = await fs.promises.readFile(this.indexFilePath, 'utf8')
      
      if (content.length === 0) {
        return { valid: false, reason: '文件为空' }
      }

      // 检查基本结构
      const hasHeader = content.includes('# 📒 笔记')
      const hasSummarySection = content.includes('## 📋 最新笔记摘要')
      
      if (!hasHeader) {
        return { valid: false, reason: '缺少主标题' }
      }

      return { 
        valid: true, 
        hasHeader, 
        hasSummarySection,
        contentLength: content.length 
      }

    } catch (error) {
      return { valid: false, reason: error.message }
    }
  }

  /**
   * 获取当前index.md中的摘要数量
   */
  async getCurrentSummaryCount() {
    try {
      if (!fs.existsSync(this.indexFilePath)) {
        return 0
      }

      const content = await fs.promises.readFile(this.indexFilePath, 'utf8')
      
      // 计算摘要卡片数量（以## 📝开头的行）
      const summaryMatches = content.match(/^## 📝/gm)
      return summaryMatches ? summaryMatches.length : 0

    } catch (error) {
      this.logger.warn('获取摘要数量失败', error)
      return 0
    }
  }

  /**
   * 备份index.md文件
   */
  async backupIndexFile() {
    try {
      if (!fs.existsSync(this.indexFilePath)) {
        return null
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = `${this.indexFilePath}.backup-${timestamp}`
      
      await fs.promises.copyFile(this.indexFilePath, backupPath)
      
      this.logger.info('index.md文件已备份', { backupPath })
      return backupPath

    } catch (error) {
      this.logger.error('备份文件失败', error)
      throw error
    }
  }

  /**
   * 从备份恢复index.md文件
   */
  async restoreFromBackup(backupPath) {
    try {
      if (!fs.existsSync(backupPath)) {
        throw new Error(`备份文件不存在: ${backupPath}`)
      }

      await fs.promises.copyFile(backupPath, this.indexFilePath)
      
      this.logger.info('已从备份恢复index.md文件', { backupPath })
      return true

    } catch (error) {
      this.logger.error('从备份恢复失败', error)
      throw error
    }
  }

  /**
   * 清理旧备份文件
   */
  async cleanupOldBackups(maxBackups = 5) {
    try {
      const indexDir = path.dirname(this.indexFilePath)
      const indexBasename = path.basename(this.indexFilePath)
      
      if (!fs.existsSync(indexDir)) {
        return 0
      }

      const files = await fs.promises.readdir(indexDir)
      const backupFiles = files
        .filter(file => file.startsWith(`${indexBasename}.backup-`))
        .map(file => ({
          name: file,
          path: path.join(indexDir, file),
          stat: fs.statSync(path.join(indexDir, file))
        }))
        .sort((a, b) => b.stat.mtime - a.stat.mtime)

      if (backupFiles.length <= maxBackups) {
        return 0
      }

      const filesToDelete = backupFiles.slice(maxBackups)
      
      for (const file of filesToDelete) {
        await fs.promises.unlink(file.path)
      }

      this.logger.info('清理旧备份文件', { 
        deleted: filesToDelete.length,
        kept: maxBackups 
      })

      return filesToDelete.length

    } catch (error) {
      this.logger.warn('清理备份文件失败', error)
      return 0
    }
  }

  /**
   * 获取内容管理统计信息
   */
  async getStats() {
    try {
      const validation = await this.validateIndexFile()
      const summaryCount = await this.getCurrentSummaryCount()
      
      return {
        indexFileExists: fs.existsSync(this.indexFilePath),
        indexFileValid: validation.valid,
        currentSummaryCount: summaryCount,
        maxSummaries: this.maxSummaries,
        indexFilePath: this.indexFilePath,
        contentLength: validation.contentLength || 0
      }
    } catch (error) {
      this.logger.error('获取统计信息失败', error)
      return {
        indexFileExists: false,
        indexFileValid: false,
        currentSummaryCount: 0,
        maxSummaries: this.maxSummaries,
        indexFilePath: this.indexFilePath,
        error: error.message
      }
    }
  }
}

export default ContentManager