# 项目接管总览

本文档集用于持续维护 `donot-eat-fish`。结论基于 2026-07-24 对源码、配置、主题、内容、构建产物、发布脚本和 Git 状态的审查与治理。

## 一句话定位

这是一个以结构化 Markdown 目录为内容源、由 VuePress 1 和 Vdoing 主题生成的静态知识博客。目录编号决定侧边栏顺序，Frontmatter 永久链接决定公开 URL，本地 `npm run deploy` 将生产构建发布到 GitHub Pages 的 `gh-pages` 分支。

## 当前技术基线

| 项目 | 当前值 |
| --- | --- |
| Node | `.nvmrc` 固定为 22.22.2 |
| npm | `packageManager` 固定为 10.9.7 |
| VuePress | 1.9.5 |
| Vue / Vue Template Compiler | 2.7.14 |
| webpack | 4.46.0 |
| 主题 | `vuepress-theme-vdoing` 1.12.8 |
| 配置入口 | `docs/.vuepress/config.ts` |
| 生产地址 | `https://xiaoyangdeve.github.io/donot-eat-fish/` |
| 站点 base | `/donot-eat-fish/` |
| 默认构建目录 | `docs/.vuepress/dist` |
| 内容规模 | 58 个 Markdown，其中 35 篇普通文章，其余为首页、目录页和知识索引 |
| 静态构建结果 | 59 个 HTML、6,738 个站内引用，构建检查通过 |

## 文档阅读顺序

1. [ARCHITECTURE.md](ARCHITECTURE.md)：配置、主题、内容和页面的运行关系。
2. [CONTENT_GUIDE.md](CONTENT_GUIDE.md)：文章目录、Frontmatter 和资源规范。
3. [TAG_TAXONOMY.md](TAG_TAXONOMY.md)：标签词表、命名规则和逐篇标签基线。
4. [OPERATIONS.md](OPERATIONS.md)：安装、开发、检查、构建和辅助脚本。
5. [DEPLOYMENT.md](DEPLOYMENT.md)：本地发布、线上验证和回滚流程。
6. [HOMEPAGE_ASSETS.md](HOMEPAGE_ASSETS.md)：首页栏目图片、生成语义和替换规范。
7. [AUDIT.md](AUDIT.md)：剩余风险、技术债务和后续治理路线。
8. [GOVERNANCE_LOG.md](GOVERNANCE_LOG.md)：已经执行的治理动作和验收证据。

## 日常命令边界

可以日常执行：

- `npm ci`
- `npm run dev`
- `npm run check`
- `npm run verify`
- `npm run deploy:dry-run`

执行前必须再次确认：

- `npm run deploy`：会更新远端 `gh-pages`。
- `npm run baiduPush`：会向百度接口提交 URL，需要外部 token。
- `npm run editFm`：会批量重写文章 Frontmatter。
- `npm run publish`：会尝试发布本地主题包。
- `npm run updateTheme`：会调用 Yarn 并删除本地依赖目录。

## 当前仓库状态要点

- Git 已停止跟踪约 47,196 个 `node_modules` 文件，本地依赖目录仍然保留。
- 39 个时间戳图片副本已无损恢复为原路径，独立 `.png.` 错链已修复。
- 默认域名、VuePress base、sitemap、百度 URL 生成和仓库链接已经统一。
- 空 `CNAME` 和 16 个 `.DS_Store` 已移除。
- 明文百度 token 已从当前工作树删除，但历史中的 token 必须在百度侧作废或轮换。
- `main` 和 `gh-pages` 已于 2026-07-24 完成受控推送与发布，线上默认 GitHub Pages 地址验证正常。
- 当前目录与首页治理变更仍处于本地工作区，未执行 commit、push、deploy、百度推送或 npm 发布。

## 已建立的质量门禁

- `npm run check`：检查 Frontmatter、受控标签、permalink、图片、时间戳副本、CNAME、域名、明文百度 token 和 `node_modules` 跟踪状态。
- `npm run check:dist`：检查 sitemap、HTML/CSS 站内引用、错误 base、CNAME 和系统文件。
- `npm run verify`：依次执行源码检查、生产构建和构建产物检查。
- `.github/workflows/ci.yml`：在 `main` 推送和 Pull Request 上执行干净安装与完整验证，不负责部署。

## 维护原则

- 已发布的 permalink 不随文件移动或标题修改而改变。
- 不提交 `node_modules`、构建产物、缓存、`.DS_Store`、`urls.txt` 或真实密钥。
- 源码先推送到 `main`，再由本地部署脚本发布相同提交的构建结果。
- VuePress 1 的安全升级和框架迁移必须作为独立项目处理。
