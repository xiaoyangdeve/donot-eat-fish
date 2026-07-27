# 开发、检查与构建手册

## 环境

项目运行环境已经固化：

```text
Node 22.22.2
npm 10.9.7
```

版本来源：

- `.nvmrc` 固定 Node。
- `package.json#packageManager` 固定 npm。
- `package.json#engines` 允许 Node 20—22、npm 10。

推荐初始化：

```bash
nvm use
npm ci
```

Git 已停止跟踪 `node_modules`。`npm ci` 会重建本地依赖，但不应再制造依赖目录的 Git diff。

不要执行 `npm audit fix --force`。项目依赖 VuePress 1、Vue 2 和 webpack 4，强制升级可能直接破坏主题、插件和生产构建。

## 开发服务

```bash
npm run dev
```

访问：<http://localhost:8080/donot-eat-fish/>

脚本通过 `NODE_OPTIONS=--openssl-legacy-provider` 兼容 webpack 4 使用的 MD4 哈希。常见非阻断警告包括：

- Node `punycode` 弃用警告。
- Browserslist 数据过期。
- 遗留依赖的 deprecated 提示。

Vdoing 主题可能在启动或构建时补齐并写回 Markdown Frontmatter，因此每次运行后都应复核 `git diff`。

## 源码检查

```bash
npm run check
```

检查范围：

- 文章 Frontmatter 核心字段。
- 标签数量、重复值以及是否登记在受控词表中。
- permalink 格式和唯一性。
- Markdown 中的本地图片引用。
- 时间戳图片副本和 `.DS_Store`。
- 默认域名、VuePress base 和 CNAME 规则。
- 百度推送 URL 中的疑似明文 token。
- Git 是否重新跟踪了 `node_modules`。

普通文章必须使用 2～4 个标签；空标签、重复标签或未登记标签都会输出 `ERROR` 并阻断构建。

## 生产构建与产物检查

```bash
npm run build
npm run check:dist
```

完整验证推荐直接执行：

```bash
npm run verify
```

`verify` 的顺序是：

1. `npm run check`
2. `npm run build`
3. `npm run check:dist`

产物目录：`docs/.vuepress/dist`。产物检查会验证：

- `index.html` 和 `sitemap.xml` 存在。
- sitemap 全部属于目标 GitHub Pages 地址。
- HTML 和 CSS 中的站内资源与页面引用存在。
- 不出现越过 `/donot-eat-fish/` 的站内绝对路径。
- 不包含 `CNAME` 和 `.DS_Store`。

2026-07-27 最新验证结果：47 个 HTML、5,204 个站内构建引用、0 个错误。

## CI

`.github/workflows/ci.yml` 在以下事件执行：

- 推送到 `main`。
- Pull Request。

流水线使用 `.nvmrc`、`npm ci` 和 `npm run verify`。它只验证源码，不部署 GitHub Pages，因此仍保留本地 `npm run deploy` 模式。

## 发布演练

```bash
npm run deploy:dry-run
```

演练会完成检查、构建、`.nojekyll` 生成和临时 `gh-pages` 提交，但不会执行 `git ls-remote` 或 `git push`。临时目录退出时自动删除，构建产物保留在本地以便检查。

真实发布见 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 域名与 SEO

当前唯一生产地址：

```text
https://xiaoyangdeve.github.io/donot-eat-fish/
```

配置对应关系：

| 配置 | 值 |
| --- | --- |
| GitHub Pages hostname | `https://xiaoyangdeve.github.io` |
| VuePress base | `/donot-eat-fish/` |
| sitemap 页面前缀 | `https://xiaoyangdeve.github.io/donot-eat-fish/` |
| CNAME | 不存在 |
| 百度 URL 默认地址 | `https://xiaoyangdeve.github.io/donot-eat-fish` |

## 百度推送

旧 token 曾明文进入仓库，应先在百度侧作废或轮换。新 token 只能通过环境变量提供：

```bash
export BAIDU_TOKEN='替换为新 token'
npm run baiduPush
```

可选覆盖站点地址：

```bash
export SITE_URL='https://xiaoyangdeve.github.io/donot-eat-fish'
```

该命令会：

1. 生成被 `.gitignore` 忽略的 `urls.txt`。
2. 使用 HTTPS 向百度接口提交 URL。
3. 保留 `urls.txt` 便于核对；需要时可手工删除。

百度推送不是 GitHub Pages 发布流程的一部分，也不会在 CI 中执行。

## 批量 Frontmatter 工具

```bash
npm run editFm
```

该工具会批量重写文件，并可能改变 YAML 格式或删除双引号。`utils/config.yml` 默认路径目前故意保持为不存在的 `docs/04.更多`，防止误运行覆盖正式内容。

使用前必须：

1. 确保工作区干净。
2. 将路径缩小到单个测试目录。
3. 备份或提交现有内容。
4. 运行后逐行审查 diff。

## 本地主题命令

根配置实际使用 npm 包 `vuepress-theme-vdoing`，不是 `vdoing/` 本地副本。

以下命令仍属于高风险受控操作：

- `npm run publish`：尝试发布 npm 主题包。
- `npm run updateTheme`：依赖 Yarn，并删除、重装整个 `node_modules`。

当前项目没有 `yarn.lock`，不要把它们作为日常维护命令。主题升级应改为 npm 单包升级并单独回归。

## 故障排查

### `Cannot find module './js-yaml/loader'`

本地依赖不完整：

```bash
npm ci
```

### `ERR_OSSL_EVP_UNSUPPORTED`

确认使用 `package.json` 中的 npm scripts，不要绕过脚本直接调用旧 webpack/VuePress CLI。

### 构建成功但线上图片缺失

先运行：

```bash
npm run verify
```

检查 URL 是否带 `/donot-eat-fish/`、源文件是否位于 `docs/.vuepress/public`，以及文件是否再次被同步工具改成带时间戳的副本。

### 编辑链接错误

当前配置应指向 `xiaoyangdeve/donot-eat-fish` 的 `main/docs`。如果仓库转移或默认分支变化，需要同步更新 `repo`、`docsBranch` 和 `docsDir`。
