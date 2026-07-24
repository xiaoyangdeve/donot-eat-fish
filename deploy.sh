#!/usr/bin/env bash

set -Eeuo pipefail

readonly expected_repository='xiaoyangdeve/donot-eat-fish'
readonly source_branch='main'
readonly push_branch='gh-pages'
readonly dist_path='docs/.vuepress/dist'
readonly dry_run="${DEPLOY_DRY_RUN:-0}"

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

push_addr=$(git remote get-url origin)
case "$push_addr" in
  "git@github.com:${expected_repository}.git"|"https://github.com/${expected_repository}.git") ;;
  *)
    echo "拒绝部署：origin 指向非预期仓库：$push_addr" >&2
    exit 1
    ;;
esac

current_branch=$(git branch --show-current)
source_commit=$(git rev-parse HEAD)

if [[ "$dry_run" != '1' ]]; then
  if [[ "$current_branch" != "$source_branch" ]]; then
    echo "拒绝部署：当前分支为 $current_branch，要求从 $source_branch 发布。" >&2
    exit 1
  fi

  if [[ -n "$(git status --porcelain)" ]]; then
    echo "拒绝部署：工作区不干净。请先检查并提交源码治理变更。" >&2
    exit 1
  fi

  remote_source_commit=$(git ls-remote "$push_addr" "refs/heads/$source_branch" | awk 'NR == 1 {print $1}')
  if [[ "$remote_source_commit" != "$source_commit" ]]; then
    echo "拒绝部署：本地 HEAD 尚未与 origin/$source_branch 对齐，请先推送源码。" >&2
    exit 1
  fi
fi

npm run verify

if [[ ! -f "$dist_path/index.html" ]]; then
  echo "拒绝部署：构建产物缺少 index.html。" >&2
  exit 1
fi

if [[ -e "$dist_path/CNAME" ]]; then
  echo "拒绝部署：默认 GitHub Pages 域名不应包含 CNAME。" >&2
  exit 1
fi

touch "$dist_path/.nojekyll"
REQUIRE_NOJEKYLL=1 node scripts/check-dist.js

publish_dir=$(mktemp -d "${TMPDIR:-/tmp}/donot-eat-fish-deploy.XXXXXX")
cleanup() {
  if [[ -n "${publish_dir:-}" && -d "$publish_dir" ]]; then
    rm -rf -- "$publish_dir"
  fi
}
trap cleanup EXIT

cp -R "$dist_path"/. "$publish_dir"/
git -C "$publish_dir" init --quiet
git -C "$publish_dir" checkout --quiet -b "$push_branch"
git -C "$publish_dir" add --all

author_name=$(git config user.name || true)
author_email=$(git config user.email || true)
author_name=${author_name:-donot-eat-fish deploy}
author_email=${author_email:-deploy@users.noreply.github.com}

git -C "$publish_dir" \
  -c "user.name=$author_name" \
  -c "user.email=$author_email" \
  commit --quiet -m "deploy: ${source_commit}"

if [[ "$dry_run" == '1' ]]; then
  echo "部署演练通过：已生成 gh-pages 提交，但未连接或推送远端。"
  exit 0
fi

remote_publish_commit=$(git ls-remote "$push_addr" "refs/heads/$push_branch" | awk 'NR == 1 {print $1}')
if [[ -n "$remote_publish_commit" ]]; then
  git -C "$publish_dir" push \
    --force-with-lease="refs/heads/${push_branch}:${remote_publish_commit}" \
    "$push_addr" "HEAD:refs/heads/$push_branch"
else
  git -C "$publish_dir" push "$push_addr" "HEAD:refs/heads/$push_branch"
fi

echo "部署完成：https://xiaoyangdeve.github.io/donot-eat-fish/"
