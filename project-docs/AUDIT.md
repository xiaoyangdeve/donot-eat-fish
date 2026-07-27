# 现状审计与剩余风险

审计与治理时间：2026-07-27。

## 当前状态

| 项目 | 当前结果 |
| --- | --- |
| 开发服务 | 已验证成功，HTTP 200 |
| 生产构建 | 成功，59 个 HTML |
| Markdown | 58 个 |
| 普通文章 | 35 篇 |
| 永久链接 | 57 个，重复 0 |
| 源码图片引用 | 167 个，缺失 0 |
| 构建站内引用 | 6,738 个，缺失 0 |
| 时间戳图片副本 | 0 |
| 受控标签 | 89 个，未登记 0 |
| 空标签文章 | 0 篇 |
| Git 跟踪 node_modules | 0，本地依赖仍保留 |
| CI | 已增加检查与构建流水线，不负责部署 |
| npm 漏洞基线 | 188：10 low、85 moderate、78 high、15 critical |

## 已完成治理

### 静态资源

- 校验并恢复 39 个原图片文件名。
- 清除 39 个时间戳副本。
- 修复 `00_mpp_calc_model.png.` 错链。
- 清除 16 个会污染构建产物的 `.DS_Store`。
- 增加源码图片和生产构建引用检查。

### 仓库

- Git 停止跟踪约 47,196 个 `node_modules` 文件。
- 重整 `.gitignore`，覆盖依赖、VuePress 构建、缓存、环境文件和发布临时文件。
- 增加 `.nvmrc`、`engines` 和 `packageManager` 声明。

### 域名与密钥

- 生产地址统一为 `https://xiaoyangdeve.github.io/donot-eat-fish/`。
- VuePress base 固定为 `/donot-eat-fish/`。
- sitemap hostname 调整为 GitHub Pages 默认域名。
- 删除空 `CNAME`。
- 百度 URL 生成默认使用正式地址。
- 明文百度 token 已从当前工作树移除，提交脚本改读 `BAIDU_TOKEN` 环境变量并使用 HTTPS。

### 发布与质量门禁

- `npm run check` 检查内容元数据、图片、域名、密钥和 Git 规则。
- `npm run verify` 执行源码检查、生产构建和构建产物检查。
- `npm run deploy:dry-run` 可在不连接或推送 GitHub 的情况下演练完整发布打包。
- 真实部署要求工作区干净、位于 `main`、源码已推送且远端 `main` 与本地 HEAD 一致。
- `gh-pages` 更新由裸构建产物提交完成，并使用 `--force-with-lease` 防止覆盖并发发布。
- 发布产物会包含 `.nojekyll`，并禁止出现 `CNAME` 和 `.DS_Store`。
- 本地 `main` 已快进到 `origin/main` 的 `4c607228`；远端提交与本地治理重叠部分按本地脚本配置保留。
- 默认 SSH 已成功认证为 `xiaoyangdeve`，并完成 SSH fetch 验证。

## 上线前仍需完成

### 1. 轮换百度 token

旧 token 曾进入 Git 历史，应视为已泄露。本地代码已经不再保存它，但仍需在百度站长平台作废或轮换。Git 历史重写风险较大，不纳入本轮上线阻断项；如果仓库公开且存在合规要求，应单独计划。

### 2. GitHub Pages 设置

仓库 Pages 来源应配置为：

```text
Branch: gh-pages
Folder: /(root)
```

不配置自定义域名。

### 3. 提交、推送和真实发布

2026-07-24 已完成受控 commit、`main` 推送和 `gh-pages` 发布。后续每轮内容治理仍需在本地验证后单独确认远端操作。

### 4. 线上 sitemap

线上 `sitemap.xml` 已切换为 `https://xiaoyangdeve.github.io/donot-eat-fish/`，首页、目录页、文章、图片和 `.nojekyll` 均完成 HTTP 200 验证。

## 非阻断技术债务

### 内容质量

- 部分历史分类值仍可能与当前目录语言不一致，需要在内容治理时逐篇确认。
- 首页仍保留较多主题模板注释和旧主题项目链接。
- 转载内容的来源、版权和 `titleTag` 规范仍需统一。

### 依赖与框架

- VuePress 1、Vue 2 和 webpack 4 已进入遗留维护阶段。
- npm audit 仍有 188 个漏洞，其中 15 个 critical、78 个 high。
- 多套 KaTeX、LaTeX、MathJax 依赖重复或未启用。
- `vuepress-plugin-fulltext-search`、评论和部分数学插件未启用但仍在依赖中。

不要直接执行 `npm audit fix --force`。建议先建立页面截图、永久链接、导航、公式和构建体积回归基线，再分阶段清理依赖或迁移框架。

### 主题与工具

- 根项目使用 npm 安装的 Vdoing；`vdoing/` 本地副本目前不生效。
- 主题的 Frontmatter 自动写回会删除 YAML 双引号，对复杂值不安全。
- 结构化侧边栏使用大编号作为稀疏数组下标。
- `Layout`、`Home`、`ArchivesPage` 的部分窗口事件监听清理不完整。
- `utils/config.yml` 默认指向不存在的目录，`editFm` 暂不适合直接运行。
- `publish`、`updateTheme` 仍依赖 Yarn 和外部 npm 发布，应继续视为受控命令。

## 后续路线

1. 保持源码先推送 `main`、再由本地脚本更新 `gh-pages` 的受控发布流程。
2. 修复历史分类异常并补齐内容版权规范。
3. 删除确认未使用的插件和重复依赖，每次变更执行完整页面回归。
4. 修复主题副作用和 Frontmatter 写回安全性。
5. 单独评估 VuePress 2、VitePress 或其他维护中的静态站点框架，保持现有 permalink 不变。
