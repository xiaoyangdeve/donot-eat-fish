# 内容维护规范

## 内容分类

当前一级栏目：

| 目录 | 公开目录页 | 内容 |
| --- | --- | --- |
| `10.数据管理` | `/dm/` | 数字化转型、数据治理 |
| `20.数据架构` | `/data_structure/` | 数据中台、数据平台、数据湖仓 |
| `30.数据应用` | `/data_app/` | 用户画像、AB 实验、OLAP、数据分析、机器学习 |
| `40.编程语言` | `/programming/` | 当前主要是 Java/JVM |
| `50.AIBigModel` | `/ai/` | 当前主要是 Agent/LangChain |

`00.目录页` 存放栏目入口，不作为普通文章参与首页文章列表。

## 命名与排序规则

Vdoing 的结构化侧边栏要求每一级目录和文章文件都以数字编号开头，并用第一个点分隔标题。

当前惯例：

```text
一级：30.数据应用
二级：3003.OLAP
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
- 不要复制其他文章的永久链接。当前 41 个页面没有重复 permalink。

### 分类与标签

- 分类用于侧边栏、目录面包屑和分类页。
- 标签用于标签页、文章底部和首页摘要。
- 当前 32 篇文章中有 18 篇的 `tags` 数组为空，属于待补充的内容质量问题。
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

## 目录页

栏目入口位于 `docs/00.目录页`，关键配置：

```yaml
pageComponent:
  name: Catalogue
  data:
    path: 30.数据应用
    imgUrl: /img/more.png
    description: 栏目说明
article: false
sidebar: false
```

`data.path` 必须准确匹配 `docs` 下的目录名称。目录内容来自结构化侧边栏数据，不需要手工维护文章列表。

## 首页

`docs/index.md` 的 Frontmatter 控制首页：

- `home: true`
- `heroText`、`tagline`
- `features` 栏目卡片
- `postList` 和分页模式

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
