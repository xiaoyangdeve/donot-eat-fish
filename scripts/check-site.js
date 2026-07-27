'use strict'

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const DOCS_ROOT = path.join(ROOT, 'docs')
const PUBLIC_ROOT = path.join(DOCS_ROOT, '.vuepress', 'public')
const CONFIG_FILE = path.join(DOCS_ROOT, '.vuepress', 'config.ts')
const TAG_TAXONOMY_FILE = path.join(ROOT, 'project-docs', 'TAG_TAXONOMY.md')
const BASE_PATH = '/donot-eat-fish/'
const SITE_HOSTNAME = 'xiaoyangdeve.github.io'

const errors = []
const warnings = []

function walkFiles(root, shouldSkip = () => false) {
  const files = []

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name)
    if (shouldSkip(fullPath, entry)) continue

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath, shouldSkip))
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

function relative(file) {
  return path.relative(ROOT, file)
}

function readFrontmatter(markdown, file) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) {
    errors.push(`${relative(file)} 缺少有效 Frontmatter`)
    return null
  }
  return match[1]
}

function hasField(frontmatter, field) {
  return new RegExp(`^${field}:`, 'm').test(frontmatter)
}

function scalarField(frontmatter, field) {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*["']?([^\\r\\n"']+)["']?\\s*$`, 'm'))
  return match ? match[1].trim() : null
}

function unquoteYamlScalar(value) {
  const trimmed = value.trim()
  if (trimmed.length >= 2 && trimmed[0] === trimmed[trimmed.length - 1]
    && (trimmed[0] === '"' || trimmed[0] === "'")) {
    return trimmed.slice(1, -1).trim()
  }
  return trimmed
}

function extractTags(frontmatter) {
  const inline = frontmatter.match(/^tags:[ \t]*(.*)$/m)
  if (!inline) return []

  const inlineValue = inline[1].trim()
  if (inlineValue) {
    if (/^\[\s*\]$/.test(inlineValue)) return []
    if (inlineValue.startsWith('[') && inlineValue.endsWith(']')) {
      return inlineValue.slice(1, -1).split(',')
        .map(unquoteYamlScalar)
        .filter(Boolean)
    }
    return [unquoteYamlScalar(inlineValue)].filter(Boolean)
  }

  const afterTags = frontmatter.slice(inline.index + inline[0].length)
  const tags = []

  for (const line of afterTags.split(/\r?\n/)) {
    if (!line.trim()) continue
    const item = line.match(/^[ \t]+-[ \t]*(.*?)\s*$/)
    if (!item) break
    const value = unquoteYamlScalar(item[1])
    if (value) tags.push(value)
  }

  return tags
}

function extractImageUrls(markdown) {
  const urls = []
  const markdownImage = /!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))/g
  const htmlImage = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi
  let match

  while ((match = markdownImage.exec(markdown))) urls.push(match[1] || match[2])
  while ((match = htmlImage.exec(markdown))) urls.push(match[1])

  return urls
}

function resolveLocalImage(url, markdownFile) {
  if (!url) return null
  const trimmed = url.trim()
  if (/^(?:[a-z]+:)?\/\//i.test(trimmed) || /^(?:data|mailto|javascript):/i.test(trimmed)) return null
  if (trimmed.startsWith('#') || trimmed.includes('{{') || trimmed.includes('$withBase')) return null

  const withoutQuery = trimmed.split(/[?#]/, 1)[0]
  let decoded
  try {
    decoded = decodeURIComponent(withoutQuery)
  } catch (_error) {
    errors.push(`${relative(markdownFile)} 包含无法解码的图片地址：${url}`)
    return null
  }

  if (decoded.startsWith(BASE_PATH)) {
    return path.join(PUBLIC_ROOT, decoded.slice(BASE_PATH.length))
  }
  if (decoded.startsWith('/')) {
    return path.join(PUBLIC_ROOT, decoded.slice(1))
  }
  return path.resolve(path.dirname(markdownFile), decoded)
}

const markdownFiles = walkFiles(DOCS_ROOT, (fullPath, entry) =>
  entry.isDirectory() && fullPath === path.join(DOCS_ROOT, '.vuepress')
).filter(file => file.endsWith('.md'))

let allowedTags = new Set()
if (!fs.existsSync(TAG_TAXONOMY_FILE)) {
  errors.push(`缺少标签词表：${relative(TAG_TAXONOMY_FILE)}`)
} else {
  const taxonomy = fs.readFileSync(TAG_TAXONOMY_FILE, 'utf8')
  const controlledSection = taxonomy.match(/## 当前受控词表([\s\S]*?)## 逐篇标签基线/)
  if (!controlledSection) {
    errors.push(`${relative(TAG_TAXONOMY_FILE)} 缺少“当前受控词表”章节`)
  } else {
    allowedTags = new Set([...controlledSection[1].matchAll(/`([^`]+)`/g)].map(match => match[1]))
  }
}

const permalinkOwners = new Map()
const usedTags = new Set()
let articleCount = 0
let checkedImageCount = 0

for (const file of markdownFiles) {
  const markdown = fs.readFileSync(file, 'utf8')
  const frontmatter = readFrontmatter(markdown, file)

  if (frontmatter) {
    const isArticle = !/^article:\s*false\s*$/m.test(frontmatter)
      && !/^home:\s*true\s*$/m.test(frontmatter)
      && !/^pageComponent:/m.test(frontmatter)

    if (isArticle) {
      articleCount += 1
      for (const field of ['title', 'date', 'permalink', 'categories', 'tags']) {
        if (!hasField(frontmatter, field)) errors.push(`${relative(file)} 缺少 ${field} 字段`)
      }
      const tags = extractTags(frontmatter)
      if (tags.length < 2 || tags.length > 4) {
        errors.push(`${relative(file)} 应设置 2～4 个标签，当前为 ${tags.length} 个`)
      }
      if (new Set(tags).size !== tags.length) {
        errors.push(`${relative(file)} 包含重复标签`)
      }
      for (const tag of tags) {
        usedTags.add(tag)
        if (!allowedTags.has(tag)) {
          errors.push(`${relative(file)} 使用未登记标签：${tag}`)
        }
      }
    }

    const permalink = scalarField(frontmatter, 'permalink')
    if (permalink) {
      if (!permalink.startsWith('/') || !permalink.endsWith('/')) {
        errors.push(`${relative(file)} 的 permalink 必须以 / 开头和结尾：${permalink}`)
      }
      if (permalinkOwners.has(permalink)) {
        errors.push(`permalink 重复：${permalink}（${permalinkOwners.get(permalink)}、${relative(file)}）`)
      } else {
        permalinkOwners.set(permalink, relative(file))
      }
    }
  }

  for (const imageUrl of new Set(extractImageUrls(markdown))) {
    const target = resolveLocalImage(imageUrl, file)
    if (!target) continue
    checkedImageCount += 1
    if (!fs.existsSync(target)) {
      errors.push(`${relative(file)} 引用不存在的图片：${imageUrl}`)
    }
  }
}

const timestampPattern = / \d{2}-\d{2}-\d{2}-\d{3}\.[^/]+$/
for (const file of walkFiles(PUBLIC_ROOT)) {
  if (timestampPattern.test(file)) errors.push(`发现时间戳副本：${relative(file)}`)
  if (path.basename(file) === '.DS_Store') errors.push(`发现系统文件：${relative(file)}`)
}

if (fs.existsSync(path.join(PUBLIC_ROOT, 'CNAME'))) {
  errors.push('默认 GitHub Pages 域名不应提交 docs/.vuepress/public/CNAME')
}

const config = fs.readFileSync(CONFIG_FILE, 'utf8')
if (!config.includes(`const DOMAIN_NAME = '${SITE_HOSTNAME}'`)) {
  errors.push(`站点域名必须配置为 ${SITE_HOSTNAME}`)
}
if (!config.includes(`const BASE_PATH = '${BASE_PATH}'`) || !config.includes('base: BASE_PATH')) {
  errors.push(`VuePress base 必须配置为 ${BASE_PATH}`)
}

const sourceFiles = walkFiles(ROOT, (fullPath, entry) => {
  if (!entry.isDirectory()) return false
  return ['.git', 'node_modules', 'dist', '.cache', '.temp'].includes(entry.name)
}).filter(file => /\.(?:sh|js|ts|json|ya?ml|md)$/.test(file))

const baiduTokenPattern = /data\.zz\.baidu\.com\/urls\?[^\s"'`]*token=([A-Za-z0-9_-]{8,})/g
for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf8')
  let match
  while ((match = baiduTokenPattern.exec(content))) {
    errors.push(`${relative(file)} 包含疑似明文百度 token`)
  }
}

const trackedNodeModules = execFileSync('git', ['ls-files', 'node_modules'], {
  cwd: ROOT,
  encoding: 'utf8',
}).trim()
if (trackedNodeModules) errors.push('Git 仍在跟踪 node_modules')

for (const warning of warnings) console.warn(`WARN  ${warning}`)
for (const error of errors) console.error(`ERROR ${error}`)

console.log(`检查 ${markdownFiles.length} 个 Markdown、${articleCount} 篇文章、${usedTags.size} 个受控标签、${checkedImageCount} 个本地图片引用。`)
console.log(`警告 ${warnings.length} 项，错误 ${errors.length} 项。`)

if (errors.length) process.exit(1)
