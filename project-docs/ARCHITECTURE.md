# 系统架构与运行链路

## 目录职责

| 路径 | 职责 |
| --- | --- |
| `docs/` | 博客内容源，目录结构决定分类与结构化侧边栏 |
| `docs/.vuepress/config.ts` | VuePress 主配置、导航、主题配置、插件和 base |
| `docs/.vuepress/config/` | 百度统计码和自定义 HTML 模块 |
| `docs/.vuepress/public/` | 按原路径复制到构建根目录的静态资源 |
| `docs/.vuepress/styles/` | 对主题变量和全局样式的站点级覆盖 |
| `docs/@pages/` | 分类、标签、归档功能页；主题缺失时会自动创建 |
| `docs/00.目录页/` | 五个栏目目录页，使用 `Catalogue` 组件渲染 |
| `vdoing/` | Vdoing 1.12.8 的本地主题副本，目前不参与站点运行 |
| `utils/` | Frontmatter 批量编辑和百度 URL 文件生成工具 |
| `scripts/` | 源码与构建产物的质量检查脚本 |
| `.github/workflows/ci.yml` | 干净安装、检查和构建验证，不负责部署 |
| `deploy.sh` | 校验源码状态、构建并以 `force-with-lease` 发布 `gh-pages` |
| `baiduPush.sh` | 使用环境变量中的 token 将 `urls.txt` 提交到百度接口 |

## 启动与构建链路

```text
npm run dev / npm run build
        |
        v
VuePress CLI 读取 docs/.vuepress/config.ts
        |
        | bundle-require 编译 TypeScript 配置
        v
加载 npm 包 vuepress-theme-vdoing
        |
        +--> 补齐缺失 Frontmatter（会写回 Markdown）
        +--> 生成结构化 sidebar 数据
        +--> 确保分类、标签、归档页面存在
        +--> 注册主题容器、搜索、进度条等插件
        |
        v
VuePress 解析 Markdown、Frontmatter 和标题
        |
        v
主题 enhanceApp 注入文章列表/分类/标签计算属性
        |
        v
Layout 根据 Frontmatter 选择 Home / Page / Categories / Tags / Archives
        |
        v
webpack 4 生成开发资源或 SSR 静态 HTML
```

### TypeScript 配置加载

VuePress 1.9.5 在 `@vuepress/core/lib/node/loadConfig.js` 中优先检查：

1. `config.yml`
2. `config.ts`
3. `config.toml`
4. `config.js`

本项目命中 `config.ts`，通过 `bundle-require` 编译加载。仓库中遗留的 `config.bundled_*.mjs` 是历史编译产物，已被 `*.mjs` 规则忽略，不是运行时权威配置。

## 主配置

`docs/.vuepress/config.ts` 的关键行为：

- `theme: 'vdoing'`：解析到 `node_modules/vuepress-theme-vdoing`。
- `base: BASE_PATH`：当前值为 `/donot-eat-fish/`，静态资源和公开路由都带此前缀。
- `themeConfig.sidebar: 'structuring'`：侧边栏来自目录结构，不是手写数组。
- `repo: 'xiaoyangdeve/donot-eat-fish'`、`docsBranch: 'main'`：编辑链接指向当前 GitHub 源码仓库。
- `lastUpdated` 使用 Git 时间，并用 `dayjs` 格式化。
- `extraWatchFiles` 监听主配置和 `htmlModules.ts`。
- sitemap hostname 为 `https://xiaoyangdeve.github.io`，插件再自动拼接站点 base。

最终页面 URL 结构为：

```text
https://xiaoyangdeve.github.io/donot-eat-fish/<page-path>
```

### 当前启用的站点插件

- `vuepress-plugin-sitemap`
- `vuepress-plugin-baidu-autopush`
- `vuepress-plugin-baidu-tongji`
- `vuepress-plugin-thirdparty-search`
- `vuepress-plugin-one-click-copy`
- `vuepress-plugin-demo-block`
- `vuepress-plugin-zooming`
- `@vuepress/last-updated`
- `@maginapp/vuepress-plugin-katex`

全文搜索、评论和 MathJax 配置目前被注释。`package.json` 仍保留多套未启用的 KaTeX、LaTeX、MathJax 依赖。

## 主题服务端行为

主题入口为 `vuepress-theme-vdoing/index.js`，本地副本见 `vdoing/index.js`。

### Frontmatter 自动补齐

主题在每次启动和构建时调用 `setFrontmatter`：

- 没有 Frontmatter 的文件会获得标题、文件时间、随机 `/pages/<id>/` 永久链接、分类、标签和默认作者。
- 已有 Frontmatter 但字段缺失时也会写回文件。
- 分类默认由 `docs` 下的目录名称去掉编号后生成。
- `_posts` 目录会采用特殊分类和 `sidebar: auto`。

这意味着 `npm run dev` 不是严格只读操作。新增文章应先检查 Git 状态，运行后复核自动写入的元数据。

实现使用 `json2yaml.stringify(...).replace(/"/g, "")` 重新序列化，复杂字符串中的引号、冒号或特殊字符存在被破坏的风险。

### 结构化侧边栏

`getSidebarData` 遍历 `docs` 一级目录，排除 `.vuepress` 和 `@pages`。文件与目录名称必须以非负整数和点号开头，例如：

```text
30.数据应用/
  3003.OLAP/
    300301.事件分析-全流量聚合模型.md
```

编号被直接当作数组下标，再通过 `filter` 压缩，因此能够排序，但当前六位编号会形成大型稀疏数组。这在内容继续增长时可能增加启动成本，后续可改为对象收集后按编号排序。

目录页同时利用侧边栏数据生成目录树。`sidebar.catalogue` 保存一级栏目名称到目录页永久链接的映射，用于面包屑跳转。

### 自动功能页

主题保证以下文件存在：

- `docs/@pages/categoriesPage.md`
- `docs/@pages/tagsPage.md`
- `docs/@pages/archivesPage.md`

关闭对应主题功能时，主题也可能删除这些文件。

## 客户端页面架构

### 总入口

`layouts/Layout.vue` 是页面总调度器：

- 首页：`Home.vue`
- 分类页：`CategoriesPage.vue`
- 标签页：`TagsPage.vue`
- 归档页：`ArchivesPage.vue`
- 普通文章或自定义页：`Page.vue`

它还统一管理导航栏、侧边栏、页脚、主题模式、返回顶部按钮、背景图和自定义 HTML 插槽。

### 文章与索引数据

主题 `enhanceApp.js` 注册全局 `postsMixin`，从 `$site.pages` 派生：

- `$filterPosts`：排除首页、目录页和 `article: false` 页面。
- `$sortPosts`：按 `sticky` 后按日期倒序。
- `$sortPostsByDate`：纯日期倒序。
- `$groupPosts`：按分类和标签分组。
- `$categoriesAndTags`：生成分类、标签和计数。

首页、分类页、标签页、归档页和最近更新组件都依赖这组计算结果。

### 普通文章页

`Page.vue` 组合：

- `ArticleInfo`：作者、日期、分类和目录面包屑。
- `RightMenu`：从 Markdown 标题生成右侧大纲。
- VuePress `Content`：文章正文。
- `PageEdit`：标签、最后更新时间和可选编辑链接。
- `PageNav`：上一篇、下一篇。
- `UpdateArticle`：最近更新文章。

`pageComponent.name: Catalogue` 的目录页会改为渲染 `Catalogue.vue`。

### 首页

`Home.vue` 从 `docs/index.md` Frontmatter 读取标题、标语、栏目卡片和文章列表模式。桌面端显示栏目卡片，移动端使用 BetterScroll Slide。默认显示详细文章列表，每页 10 篇。

### 主题模式与样式

浅色、深色、阅读和跟随系统模式保存在浏览器本地存储。主题基础样式来自 npm 主题；站点级样式覆盖位于 `docs/.vuepress/styles/`。

当前站点的 `palette.styl` 基本全部注释，实际沿用主题默认变量；`index.styl` 主要覆盖评论区、QQ 徽章、Demo 模块和搜索框。

## 本地主题副本与 npm 主题

当前配置使用 npm 主题，本地 `vdoing/` 不生效。两者版本号都是 1.12.8，核心入口一致，但至少存在以下差异：

- `CategoriesBar.vue` 的间距、计数位置和字号不同。
- `CategoriesPage.vue` 的分类栏间距不同。
- 本地 `package.json` 声明 `node >=14.17.0`，安装包没有该字段。

修改 `vdoing/` 不会改变当前网站。若要调试本地主题，需要将配置切换到：

```ts
theme: resolve(__dirname, '../../vdoing')
```

切换前应单独评审，因为 `publish` 与 `updateTheme` 脚本围绕该副本设计，且包含外部发布和删除依赖目录的动作。

## 已观察到的前端维护风险

- `Layout`、`Home` 和 `ArchivesPage` 注册了匿名窗口事件监听，但没有完整移除逻辑；频繁路由切换可能累积监听器。
- 目录生成和 Frontmatter 写回混在主题初始化阶段，构建不具备纯函数特性。
- 目录编号作为稀疏数组下标，编号越大，扫描成本越高。
- 当前 base 被硬编码进大量 Markdown 图片 URL，未来改变部署路径需要同步迁移内容。
