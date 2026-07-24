'use strict'

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const DIST_ROOT = path.resolve(ROOT, process.argv[2] || 'docs/.vuepress/dist')
const BASE_PATH = '/donot-eat-fish/'
const SITE_URL = 'https://xiaoyangdeve.github.io/donot-eat-fish/'
const errors = []

function walkFiles(root) {
  if (!fs.existsSync(root)) return []
  const files = []
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name)
    if (entry.isDirectory()) files.push(...walkFiles(fullPath))
    else if (entry.isFile()) files.push(fullPath)
  }
  return files
}

function relative(file) {
  return path.relative(DIST_ROOT, file)
}

function isExternal(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url)
    || /^(?:data|mailto|tel|javascript):/i.test(url)
    || url.startsWith('#')
}

function decodeUrl(url, owner) {
  const clean = url.replace(/&amp;/g, '&').split(/[?#]/, 1)[0]
  try {
    return decodeURIComponent(clean)
  } catch (_error) {
    errors.push(`${relative(owner)} 包含无法解码的地址：${url}`)
    return null
  }
}

function resolveHtmlTarget(url, owner) {
  if (!url || isExternal(url)) return null
  const decoded = decodeUrl(url, owner)
  if (decoded === null || decoded === '') return null

  let target
  if (decoded.startsWith(BASE_PATH)) {
    target = path.join(DIST_ROOT, decoded.slice(BASE_PATH.length))
  } else if (decoded.startsWith('/')) {
    errors.push(`${relative(owner)} 包含越过 base 的站内绝对地址：${url}`)
    return null
  } else {
    target = path.resolve(path.dirname(owner), decoded)
  }

  if (decoded.endsWith('/')) return path.join(target, 'index.html')
  if (fs.existsSync(target)) return target
  if (!path.extname(target)) return path.join(target, 'index.html')
  return target
}

for (const required of ['index.html', 'sitemap.xml']) {
  if (!fs.existsSync(path.join(DIST_ROOT, required))) errors.push(`构建产物缺少 ${required}`)
}

if (fs.existsSync(path.join(DIST_ROOT, 'CNAME'))) {
  errors.push('默认 GitHub Pages 发布产物不应包含 CNAME')
}
if (process.env.REQUIRE_NOJEKYLL === '1' && !fs.existsSync(path.join(DIST_ROOT, '.nojekyll'))) {
  errors.push('发布产物缺少 .nojekyll')
}

const allFiles = walkFiles(DIST_ROOT)
for (const file of allFiles) {
  if (path.basename(file) === '.DS_Store') errors.push(`发布产物包含系统文件：${relative(file)}`)
}

const sitemapPath = path.join(DIST_ROOT, 'sitemap.xml')
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8')
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
  if (!locations.length) errors.push('sitemap.xml 不包含任何页面地址')
  for (const location of locations) {
    if (!location.startsWith(SITE_URL)) errors.push(`sitemap 地址不属于目标站点：${location}`)
  }
}

const htmlFiles = allFiles.filter(file => file.endsWith('.html'))
let checkedReferenceCount = 0
const missingReferences = new Set()

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  const references = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)].map(match => match[1])

  for (const reference of new Set(references)) {
    const target = resolveHtmlTarget(reference, file)
    if (!target) continue
    checkedReferenceCount += 1
    if (!fs.existsSync(target)) missingReferences.add(`${relative(file)} -> ${reference}`)
  }
}

for (const file of allFiles.filter(file => file.endsWith('.css'))) {
  const css = fs.readFileSync(file, 'utf8')
  const references = [...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map(match => match[1])

  for (const reference of new Set(references)) {
    if (!reference || isExternal(reference)) continue
    const decoded = decodeUrl(reference, file)
    if (decoded === null || decoded === '') continue
    checkedReferenceCount += 1
    const target = decoded.startsWith(BASE_PATH)
      ? path.join(DIST_ROOT, decoded.slice(BASE_PATH.length))
      : path.resolve(path.dirname(file), decoded)
    if (!fs.existsSync(target)) missingReferences.add(`${relative(file)} -> ${reference}`)
  }
}

for (const missing of missingReferences) errors.push(`构建引用不存在：${missing}`)
for (const error of errors) console.error(`ERROR ${error}`)

console.log(`检查 ${htmlFiles.length} 个 HTML、${checkedReferenceCount} 个站内构建引用。`)
console.log(`错误 ${errors.length} 项。`)

if (errors.length) process.exit(1)
