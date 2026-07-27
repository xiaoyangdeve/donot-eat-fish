# 内容维护规范

## 内容分类

当前一级栏目：

| 目录 | 公开目录页 | 内容 |
| --- | --- | --- |
| `10.数据技术` | `/data/` | 数据管理、数据架构、数据应用 |
| `20.AI大模型` | `/ai/` | 大模型、Agent、RAG 与工程实践 |
| `30.项目管理` | `/project-management/` | 预测型项目、敏捷项目 |
| `40.编程语言` | `/programming/` | 当前主要是 Java/JVM |

`10.数据技术` 下使用 `01.数据管理`、`02.数据架构` 和 `03.数据应用` 组织原有内容。`/dm/`、`/data_structure/` 和 `/data_app/` 继续作为兼容目录页保留。

`30.项目管理` 的知识结构：

```text
01.预测型项目/
  01.启动/
  02.规划/
  03.执行/
  04.监控/
  05.收尾/
02.敏捷项目/
  01.原则与思维/
  02.团队与角色/
  03.产品与待办/
  04.迭代与交付/
  05.度量与改进/
```

`00.目录页` 存放栏目入口，不作为普通文章参与首页文章列表。

## 命名与排序规则

Vdoing 的结构化侧边栏要求每一级目录和文章文件都以数字编号开头，并用第一个点分隔标题。

当前惯例：

```text
一级：10.数据技术
二级：03.数据应用
三级：3003.OLAP
文章：300301.事件分析-全流量聚合模型.md
```

规则：

- 同一级编号不能重复，重复项会覆盖并输出警告。
- 非数字或负数编号会被忽略。
- 文章扩展名必须为 `.md`。
- `_posts` 是主题支持的特殊碎片文章目录，但当前项目没有使用。
- 文件移动会改变自动分类与侧边栏位置，但不应改变已发布 `permalink`。

## 推荐 Frontmatter

```yaml
---
title: 示例文章
date: 2026-07-24 10:00:00
permalink: /pages/abcdef/
categories:
  - 数据应用
  - OLAP
tags:
  - OLAP
author:
  name: 不爱吃鱼的bobo
---
```

常用可选字段：

| 字段 | 作用 |
| --- | --- |
| `sticky` | 首页置顶顺序，数值越小越靠前 |
| `titleTag` | 标题旁的短标签，例如“转载” |
| `article: false` | 从普通文章列表、分类和标签统计中排除 |
| `sidebar: false` | 隐藏侧边栏 |
| `sidebar: auto` | 使用当前文章标题自动生成侧边栏 |
| `pageComponent` | 使用主题自定义页面组件 |
| `editLink: false` | 对单页关闭编辑入口 |
| `comment: false` | 对单页关闭评论；当前评论插件整体未启用 |

### 永久链接

- 已发布文章的 `permalink` 是外部稳定标识，不要因重命名或移动文件而改变。
- 新文章可由主题生成随机 `/pages/<id>/`，但运行开发服务前后必须检查 Git diff。
- 不要复制其他文章的永久链接。当前 57 个 permalink 页面没有重复 permalink。

### 分类与标签

- 分类用于侧边栏、目录面包屑和分类页。
- 标签用于标签页、文章底部和首页摘要。
- 每篇普通文章设置 2～4 个标签，依次表达核心主题、技术或方法、关键概念；不要把摘要句、章节名称拆成大量标签。
- 中文概念统一使用中文，产品、框架、标准和行业缩写使用官方名称及大小写，例如 `Spark`、`fastText`、`JVM`、`PMI`。
- 不使用 `技术系列`、`基本原理`、`documents` 等内容属性或内部管理词作为标签。
- 同一概念只保留一个首选名称，例如统一使用 `A/B测试` 和 `敏捷项目管理`，不再并存 `AB实验`、`AB-Test`、`Agile` 等同义标签。
- 当前 35 篇普通文章均已有 2～4 个有效标签，空标签为 0。
- 受控词表、同义词映射和逐篇标签基线见 [TAG_TAXONOMY.md](TAG_TAXONOMY.md)。新增标签前先检查词表，确有新概念时同步更新该文档。
- 自动分类来自目录名称，但已有分类不会被主题覆盖。

## 新增文章流程

1. 在正确栏目中选择目录，并按现有编号体系确定下一个不重复编号。
2. 创建 Markdown，优先手工写完整 Frontmatter。
3. 永久链接使用新的、稳定且唯一的值。
4. 图片放入 `docs/.vuepress/public/img/<业务目录>/`。
5. 执行 `npm run dev`。
6. 检查终端是否出现编号、侧边栏或 Frontmatter 警告。
7. 检查 `git diff`，确认主题没有产生意外元数据改写。
8. 验证目录页、侧边栏、分类页、标签页和图片。
9. 在隔离输出目录运行生产构建。

## 图片与静态资源

### 两种路径约定

Vue 组件和 Frontmatter 中的主题图片使用 `$withBase`，因此通常写：

```yaml
imgUrl: /img/data_analysis/data_analysis.jpeg
```

现有 Markdown 正文大量直接写死部署 base：

```markdown
![示例](/donot-eat-fish/img/data_analysis/example.png)
```

这在当前 GitHub Pages 子路径下可用，但将站点改为根域名或修改 `base` 时必须批量迁移。

### 已治理的图片故障

2026-07-24 曾发现 39 个原图片文件在工作树中消失，同时出现带时间戳的副本，例如：

```text
原路径：img/data_analysis/olap/00_clickhouse_tech_struct.png
副本：  img/data_analysis/olap/00_clickhouse_tech_struct.png 11-20-28-699.png
```

39 个副本的 Git blob 均与索引中的原文件一致，说明内容未损坏，只是文件名异常。当时静态构建确认 37 个唯一图片 URL 会 404，影响 8 篇文章：

| 文章 | 缺失引用数 |
| --- | ---: |
| 初识数仓开发和维度建模 | 3 |
| 数据湖 CDC 能力分析调研 | 7 |
| OneID 生成技术方案 | 1 |
| OLAP 知识地图 | 5 |
| 事件分析-全流量聚合模型 | 4 |
| OLAP 优化调研报告 | 10 |
| 时间序列短期预测分析 | 4 |
| JVM 垃圾回收 | 4 |

治理后已经：

- 将 39 个副本无损恢复为原文件名。
- 删除全部时间戳副本。
- 修复 `OLAP知识地图.md` 中 `00_mpp_calc_model.png.` 的尾部多点。
- 通过 158 个源码图片引用检查和 4,074 个构建引用检查。

后续新增或移动资源后必须执行：

```bash
npm run verify
```

项目管理文章附件统一放在：

```text
docs/.vuepress/public/img/project-management/
  predictive/  # 预测型项目
  agile/       # 敏捷项目
```

文件名使用可读的英文小写短横线格式。Markdown 正文按当前部署方式引用 `/donot-eat-fish/img/project-management/...`，不得保留下载目录绝对路径、文章旁的 `assets/` 或 `images/` 临时目录。

## 目录页

栏目入口位于 `docs/00.目录页`，关键配置：

```yaml
pageComponent:
  name: Catalogue
  data:
    path: 10.数据技术
    imgUrl: /img/home/data-technology.jpg
    description: 栏目说明
article: false
sidebar: false
```

`data.path` 必须准确匹配 `docs` 下的目录名称。目录内容来自结构化侧边栏数据，不需要手工维护文章列表。

例外是 `/data/`：合并后的数据目录深度超过旧版 `Catalogue` 组件的渲染能力，因此 `0001.数据技术.md` 使用普通 Markdown 手工连接三个兼容目录页。修改数据栏目名称或永久链接时，需要同步更新该文件。

## 首页

`docs/index.md` 的 Frontmatter 控制首页：

- `home: true`
- `heroText`、`tagline`
- `features` 栏目卡片
- `postList` 和分页模式

首页卡片顺序固定为数据技术、AI大模型、项目管理、编程语言。对应图片统一位于 `docs/.vuepress/public/img/home/`，不得在图片内嵌栏目文字、品牌标志或水印。更换图片时保持 3:2 比例，并同步检查首页和目录页引用。

首页正文当前大部分位于 HTML 注释中，不参与渲染和有效链接检查。

## 内容检查清单

- Frontmatter 五个核心字段是否齐全。
- permalink 是否唯一且未改变。
- 文件与目录编号是否有效且不重复。
- 导航和目录页是否能到达新文章。
- 图片 URL 是否包含正确 base，目标文件是否存在。
- 分类是否与目录一致，标签是否为空。
- 转载内容是否设置 `titleTag: 转载` 并保留必要来源信息。
- `npm run dev` 后是否出现非预期 Markdown 修改。
- `npm run verify` 是否完成且没有 `ERROR`。
