# donot-eat-fish

个人大数据、数据架构、数据应用与 AI 学习博客。项目基于 VuePress 1、Vue 2 和 `vuepress-theme-vdoing` 构建，发布到：

<https://xiaoyangdeve.github.io/donot-eat-fish/>

## 本地运行

```bash
nvm use
npm ci
npm run dev
```

开发地址：<http://localhost:8080/donot-eat-fish/>

## 检查与构建

```bash
# Frontmatter、permalink、图片、密钥和仓库规则检查
npm run check

# 完整检查、生产构建及构建产物链接审计
npm run verify

# 完整模拟发布，但不连接或推送 GitHub
npm run deploy:dry-run
```

`npm run check` 当前会提示 18 篇文章标签为空，但该项属于非阻断内容债务。出现任何 `ERROR` 时会返回非零状态。

## 发布

真实发布命令：

```bash
npm run deploy
```

发布脚本只将 `docs/.vuepress/dist` 发布到 `gh-pages`。它要求：

- 当前位于 `main`。
- 工作区完全干净。
- 当前 HEAD 已经推送并与远端 `main` 一致。
- 内容、图片、生产构建和构建产物检查全部通过。
- 远端仓库必须是 `xiaoyangdeve/donot-eat-fish`。

发布会更新远端 `gh-pages`，执行前请阅读 [本地部署与回滚手册](project-docs/DEPLOYMENT.md)。

## 项目文档

- [项目接管总览](project-docs/README.md)
- [系统架构与运行链路](project-docs/ARCHITECTURE.md)
- [内容维护规范](project-docs/CONTENT_GUIDE.md)
- [开发、构建与发布手册](project-docs/OPERATIONS.md)
- [本地部署与回滚手册](project-docs/DEPLOYMENT.md)
- [现状审计与剩余风险](project-docs/AUDIT.md)
- [治理实施记录](project-docs/GOVERNANCE_LOG.md)

## 技术债务提示

项目仍基于已停止主流维护的 VuePress 1、Vue 2 和 webpack 4。不要直接执行 `npm audit fix --force`；依赖升级和框架迁移需要单独建立回归基线后处理。
