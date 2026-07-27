# 首页栏目图片规范

## 当前资源

| 栏目 | 文件 | 表达重点 |
| --- | --- | --- |
| 数据技术 | `docs/.vuepress/public/img/home/data-technology.jpg` | 数据管理、数据架构、数据应用之间的数据流转 |
| AI大模型 | `docs/.vuepress/public/img/home/ai-large-models.jpg` | 模型推理、知识连接、检索和智能体协作 |
| 项目管理 | `docs/.vuepress/public/img/home/project-management.jpg` | 预测型路线、敏捷迭代、团队协作和反馈 |
| 编程语言 | `docs/.vuepress/public/img/home/programming-languages.jpg` | 源码、编译、运行时和模块连接 |

四张图片均为 1200×800 JPG，用于 `docs/index.md` 首页卡片和对应目录页。生成方式为 Codex 内置图像生成工具，原始 PNG 在转换和验收后已删除，仓库只保留网页优化版本。

## 共享生成规格

```text
Use case: stylized-concept
Asset type: homepage feature card for a Chinese technical knowledge blog
Style: sophisticated isometric 3D editorial illustration
Composition: landscape 3:2, centered subject, generous safe padding
Backdrop: deep navy-to-slate gradient with subtle abstract grid depth
Palette: navy, cyan, teal, restrained violet and warm amber accents
Constraints: no text, letters, numbers, logos, brand marks, watermark or UI labels
```

栏目主题分别补充以下主体描述：

- 数据技术：连接数据流、数据库、湖仓存储、分析节点和可视化输出的统一数据平台。
- AI大模型：连接知识图谱、检索记忆模块和多个智能体节点的抽象模型核心。
- 项目管理：同时呈现里程碑路线、计划时间线、迭代循环、任务看板和团队协作。
- 编程语言：源码结构经过编译转换后连接运行时模块、接口和服务组件。

## 替换原则

- 不在图片中生成栏目标题，文字由页面负责渲染。
- 四张图应作为同一系列维护，不单独引入明显冲突的摄影或卡通风格。
- 保持 3:2 比例，建议输出宽度不低于 1200 像素。
- 优先使用 JPG 或 WebP，将单张体积控制在 300 KB 左右。
- 新版本使用新文件名，确认所有引用和构建检查通过后再清理旧文件。
- 修改后执行 `npm run verify`，并抽查桌面端与移动端卡片裁切效果。
