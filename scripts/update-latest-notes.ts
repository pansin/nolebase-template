#!/usr/bin/env tsx
/**
 * 自动更新首页"最新笔记"列表
 * 基于 git 提交记录，提取最近新增/修改的笔记文件，生成首页摘要区域
 */
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import Git from 'simple-git'

const DIR_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const INDEX_PATH = resolve(DIR_ROOT, '笔记/index.md')
const NOTE_DIR = '笔记/'
const MAX_NOTES = 10

// 标记：用于定位自动生成区域
const MARKER_START = '<!-- AUTO_LATEST_NOTES_START -->'
const MARKER_END = '<!-- AUTO_LATEST_NOTES_END -->'

const git = Git(DIR_ROOT)

interface NoteInfo {
  filePath: string
  title: string
  date: string
  wordCount: number
  category: string
}

/**
 * 获取最近修改的笔记文件
 */
async function getRecentNotes(): Promise<NoteInfo[]> {
  // 获取最近的 git 日志，找出修改过的 .md 文件
  const log = await git.log({
    maxCount: 200,
    '--diff-filter': 'AM', // Added 或 Modified
    '--name-only': null,
  })

  const seen = new Set<string>()
  const notes: NoteInfo[] = []

  for (const commit of log.all) {
    // simple-git 将文件名放在 diff.files 或 body 中
    // 使用 raw 命令更可靠
    const files = await git.raw([
      'diff-tree', '--no-commit-id', '--name-only', '-r',
      '--diff-filter=AM', commit.hash,
    ])

    for (const file of files.trim().split('\n')) {
      if (!file) continue
      if (!file.startsWith(NOTE_DIR)) continue
      if (!file.endsWith('.md')) continue
      if (file.endsWith('index.md')) continue
      if (seen.has(file)) continue

      seen.add(file)

      // 检查文件是否仍然存在
      const fullPath = resolve(DIR_ROOT, file)
      if (!await fs.pathExists(fullPath)) continue

      try {
        const content = await fs.readFile(fullPath, 'utf-8')
        const title = extractTitle(content, file)
        const wordCount = countWords(content)
        const category = extractCategory(file)

        notes.push({
          filePath: file,
          title,
          date: commit.date.slice(0, 10),
          wordCount,
          category,
        })
      }
      catch {
        continue
      }

      if (notes.length >= MAX_NOTES) break
    }

    if (notes.length >= MAX_NOTES) break
  }

  return notes
}

/**
 * 从内容中提取标题（优先取第一个 # 标题，否则用文件名）
 */
function extractTitle(content: string, filePath: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  return basename(filePath, '.md')
}

/**
 * 统计中文+英文字数
 */
function countWords(content: string): number {
  // 移除 frontmatter
  const cleaned = content.replace(/^---[\s\S]*?---/, '').trim()
  // 中文字符数 + 英文单词数
  const chinese = (cleaned.match(/[\u4e00-\u9fff]/g) || []).length
  const english = (cleaned.match(/[a-zA-Z]+/g) || []).length
  return chinese + english
}

/**
 * 从文件路径提取分类（笔记/下的第一级目录）
 */
function extractCategory(filePath: string): string {
  const parts = filePath.replace(NOTE_DIR, '').split('/')
  return parts.length > 1 ? parts[0] : '未分类'
}

/**
 * 生成 Markdown 内容
 */
function generateMarkdown(notes: NoteInfo[]): string {
  const lines: string[] = []
  lines.push(MARKER_START)
  lines.push('')
  lines.push('## 📋 最新笔记')
  lines.push('')
  lines.push(`> 以下是最近更新的 ${notes.length} 篇笔记（基于 Git 提交记录自动生成）`)
  lines.push('')

  for (const note of notes) {
    const linkPath = `/${note.filePath.replace(/\.md$/, '')}`
    const encodedPath = encodeURI(linkPath)
    const readTime = Math.max(1, Math.ceil(note.wordCount / 250))

    lines.push(`### 📝 [${note.title}](${encodedPath})`)
    lines.push('')
    lines.push(`**分类**: ${note.category} | **更新日期**: ${note.date} | **字数**: ${note.wordCount} | **阅读时间**: ${readTime}分钟`)
    lines.push('')
    lines.push('---')
    lines.push('')
  }

  lines.push(MARKER_END)
  return lines.join('\n')
}

/**
 * 更新 index.md
 */
async function updateIndex(notes: NoteInfo[]) {
  let content = await fs.readFile(INDEX_PATH, 'utf-8')
  const newSection = generateMarkdown(notes)

  const startIdx = content.indexOf(MARKER_START)
  const endIdx = content.indexOf(MARKER_END)

  if (startIdx !== -1 && endIdx !== -1) {
    // 替换已有的自动生成区域
    content = content.slice(0, startIdx) + newSection + content.slice(endIdx + MARKER_END.length)
  }
  else {
    // 首次运行：查找旧的摘要区域并替换
    const oldSectionStart = content.indexOf('## 📋 最新笔记摘要')
    if (oldSectionStart === -1) {
      // 找不到旧区域，在文件开头的标题后插入
      const firstHeadingEnd = content.indexOf('\n', content.indexOf('# '))
      content = content.slice(0, firstHeadingEnd + 1) + '\n' + newSection + '\n' + content.slice(firstHeadingEnd + 1)
    }
    else {
      // 找到旧的摘要区域，定位其结束位置（下一个非摘要的 ## 标题）
      const lines = content.split('\n')
      let sectionStartLine = -1
      let sectionEndLine = lines.length

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('## 📋 最新笔记摘要')) {
          sectionStartLine = i
        }
        else if (sectionStartLine !== -1 && i > sectionStartLine && lines[i].startsWith('## ') && !lines[i].startsWith('## 📝')) {
          sectionEndLine = i
          break
        }
      }

      const before = lines.slice(0, sectionStartLine).join('\n')
      const after = lines.slice(sectionEndLine).join('\n')
      content = before + '\n' + newSection + '\n' + after
    }
  }

  await fs.writeFile(INDEX_PATH, content, 'utf-8')
}

async function run() {
  console.log('正在获取最新笔记列表...')
  const notes = await getRecentNotes()
  console.log(`找到 ${notes.length} 篇最近更新的笔记`)

  await updateIndex(notes)
  console.log('已更新 笔记/index.md')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
