# 本地部署与回滚手册

## 发布目标

| 项目 | 值 |
| --- | --- |
| 源码分支 | `main` |
| Pages 分支 | `gh-pages` |
| Pages 目录 | `/(root)` |
| 生产地址 | `https://xiaoyangdeve.github.io/donot-eat-fish/` |
| VuePress base | `/donot-eat-fish/` |
| 自定义域名 | 不使用 |

GitHub 仓库的 Pages 设置必须选择 `gh-pages` 分支根目录。不要配置自定义域名，也不要在 `docs/.vuepress/public` 中恢复 `CNAME`。

## GitHub 身份验证前置条件

当前 `origin` 使用 SSH 地址。2026-07-24 已验证：

- `ssh -T git@github.com` 成功认证为 `xiaoyangdeve`。
- `git fetch --prune origin` 成功。

如果后续更换机器或密钥，应重新确认 SSH key 具有仓库写权限。也可以经人工确认后改用 HTTPS 和系统凭据管理器。

不要把私钥或 Personal Access Token 写入项目文件、脚本、`.env.example` 或 Git 历史。

## 发布原则

源码和线上构建必须对应同一个 Git 提交：

```text
本地治理与验证
  -> 提交源码
  -> 推送 main
  -> 确认远端 main 等于本地 HEAD
  -> npm run deploy
  -> 更新 gh-pages
  -> 验证线上页面
```

部署脚本不会替你提交或推送 `main`，也不会在工作区有变更时继续发布。

## 发布前演练

```bash
npm ci
npm run deploy:dry-run
```

演练不连接或推送 GitHub，但会执行与真实部署相同的内容检查、生产构建、产物检查、`.nojekyll` 生成和临时发布提交。

## 正式发布步骤

### 1. 检查变更

```bash
git status
git diff
git diff --cached
```

确认没有真实密钥、`node_modules`、构建产物、缓存或无关内容。

### 2. 验证源码

```bash
npm ci
npm run verify
```

标签数量不合规、标签重复或使用未登记词都会产生 `ERROR`；部署前必须全部修复。

### 3. 提交并推送源码

本地分支必须先安全整合最新 `origin/main`，再提交治理变更并推送。具体提交和远端同步动作需要人工审查，不由部署脚本自动执行。

推送后确认：

```bash
git status
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

本地 HEAD 与远端 `main` 哈希必须一致。

如果再次出现 `Permission denied (publickey)`，先修复 GitHub 身份验证，不要绕过源码推送直接发布 Pages。

### 4. 发布 Pages

```bash
npm run deploy
```

脚本会：

1. 验证 origin 必须指向 `xiaoyangdeve/donot-eat-fish`。
2. 验证当前位于 `main` 且工作区干净。
3. 验证远端 `main` 等于本地 HEAD。
4. 执行 `npm run verify`。
5. 添加 `.nojekyll`，禁止 `CNAME` 和 `.DS_Store`。
6. 在临时目录创建只含构建产物的 `gh-pages` 提交。
7. 使用 `--force-with-lease` 更新远端 `gh-pages`。

`force-with-lease` 仍会替换发布分支历史，但如果其他人同时更新过 `gh-pages`，操作会失败而不是静默覆盖。

## 上线验证

GitHub Pages 发布可能需要数十秒。至少检查：

- <https://xiaoyangdeve.github.io/donot-eat-fish/>
- 首页静态资源请求均为 200。
- 任意文章直达和浏览器刷新正常。
- 分类、标签、归档和栏目目录页正常。
- 修复过的 OLAP、数据湖、时间序列、JVM、OneID 图片正常显示。
- <https://xiaoyangdeve.github.io/donot-eat-fish/sitemap.xml> 中地址正确。

## 回滚

推荐采用源码回滚，保持 `main` 与线上构建可追溯：

1. 在 `main` 上对问题提交执行 `git revert`，不要重写共享分支历史。
2. 本地执行 `npm ci` 和 `npm run verify`。
3. 推送新的回滚提交到 `main`。
4. 再次执行 `npm run deploy`。
5. 验证线上恢复。

不要直接手工修改 `gh-pages`，否则线上内容会与 `main` 源码脱节。

## 发布失败处理

- 工作区不干净：先审查、提交或移走本地变更。
- 远端 `main` 不一致：先获取远端变化并人工解决冲突，再重新验证和推送。
- `force-with-lease` 失败：说明 `gh-pages` 在部署期间被其他人更新，先确认对方发布内容，不要改成无条件 `--force`。
- 构建或引用检查失败：修复源码后重新运行，不要绕过门禁手工推送 dist。
- GitHub Pages 404：检查 Pages 来源是否为 `gh-pages /(root)`，并确认分支中存在根级 `index.html` 和 `.nojekyll`。

## 外部动作状态

截至 2026-07-27，最新目录、首页、项目管理知识库和标签治理已完成 `main` 推送与真实 `npm run deploy`，线上默认 GitHub Pages 地址验证正常。
