# 治理实施记录

## 2026-07-24：发布前工程治理

### 背景

项目最初存在开发启动兼容问题、批量图片文件名异常、`node_modules` 被 Git 跟踪、域名配置分裂、明文百度 token 和高风险强制发布脚本。目标是在不迁移框架的前提下恢复可维护、可检查、可本地发布的 GitHub Pages 工程。

### 已执行

- 使用 `npm ci` 恢复依赖，解决缺失模块问题。
- 为 webpack 4 增加 OpenSSL 3 兼容参数，恢复 Node 22 下的开发与构建。
- 校验并恢复 39 个原图片文件名，清除全部时间戳副本。
- 修复 `00_mpp_calc_model.png.` 错链。
- 清除 16 个 `.DS_Store`。
- 停止 Git 跟踪 47,196 个 `node_modules` 文件，本地依赖保留。
- 重整 `.gitignore`。
- 固定 Node 22.22.2、npm 10.9.7，并声明支持范围。
- 统一生产地址、VuePress base、sitemap、GitHub 仓库链接和百度 URL 默认值。
- 删除空 `CNAME`。
- 从当前工作树移除明文百度 token，改为 `BAIDU_TOKEN` 环境变量和 HTTPS 接口。
- 增加 `check`、`check:dist`、`verify`、`deploy:dry-run` 命令。
- 重构 `deploy.sh`，增加仓库、分支、工作区、远端源码一致性和并发发布保护。
- 增加 `.nojekyll` 发布处理。
- 增加只做验证、不自动部署的 GitHub Actions CI。
- 补充项目总览、架构、内容、运维、部署回滚和风险文档。

### 验收证据

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 41 个 Markdown、32 篇文章、158 个图片引用；0 错误、18 个空标签警告 |
| `npm run build` | 客户端和服务端编译成功，生成 42 个 HTML |
| `npm run check:dist` | 检查 4,074 个站内构建引用，0 错误 |
| `npm ci` | 从锁文件重新安装 1,531 个包成功 |
| `npm run deploy:dry-run` | 完整发布演练成功，未连接或推送远端 |
| `npm run dev` | 编译成功；首页、文章页和已恢复图片均返回 HTTP 200 |
| sitemap | 42 个目标 GitHub Pages URL |
| Git 跟踪 node_modules | 0 |
| 时间戳图片副本 | 0 |
| 构建产物 CNAME | 0 |
| 构建产物 `.DS_Store` | 0 |

### 未执行

- 未创建 Git commit。
- 未推送 `main` 或任何其他分支。
- 未执行真实 `npm run deploy`。
- 未执行百度 URL 推送。
- 未执行 npm 主题发布。
- 未重写 Git 历史或轮换百度平台 token。
- 未执行 VuePress/Vue/webpack 大版本迁移。

### 外部只读核对

- 公开 HTTPS 查询确认远端 `main` 为 `4c607228`、`gh-pages` 为 `f13c8e76`。
- 当前线上首页和抽查图片返回 HTTP 200。
- 当前线上 sitemap 仍引用旧自定义域名，需要真实部署本地新构建后更新。
- 完成 SSH 配置后，默认 `ssh -T git@github.com` 和 `git fetch --prune origin` 均验证成功。

### 分支对齐

- 本地 `main` 从 `21f22ad2` 快进到远端 `4c607228`，当前与 `origin/main` 差异为 `0/0`。
- 远端唯一变更是 `package.json` 的 OpenSSL 兼容配置。
- 重叠配置按用户要求保留本地治理版本；未冲突的远端提交历史已纳入本地 `main`。
- 对齐过程未覆盖本地工作区文件，`node_modules` 取消跟踪状态已重新建立。

### 待办

1. 审查本轮工作区 diff。
2. 在百度站长平台轮换旧 token。
3. 确认 GitHub Pages 来源为 `gh-pages /(root)`。
4. 经用户单独确认后提交、推送 `main` 并执行真实部署。
5. 后续补齐 18 篇文章标签，并规划依赖清理与框架迁移。
