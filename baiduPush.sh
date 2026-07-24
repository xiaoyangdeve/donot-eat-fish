#!/usr/bin/env bash

set -Eeuo pipefail

readonly site_url="${SITE_URL:-https://xiaoyangdeve.github.io/donot-eat-fish}"
readonly urls_file="${BAIDU_URLS_FILE:-urls.txt}"

if [[ -z "${BAIDU_TOKEN:-}" ]]; then
  echo "缺少 BAIDU_TOKEN。请先在当前终端导出新的百度推送 token。" >&2
  exit 1
fi

if [[ ! -s "$urls_file" ]]; then
  echo "推送文件不存在或为空：$urls_file" >&2
  exit 1
fi

curl --fail --show-error --silent \
  -H 'Content-Type:text/plain' \
  --data-binary "@$urls_file" \
  "https://data.zz.baidu.com/urls?site=${site_url}&token=${BAIDU_TOKEN}"

echo
echo "百度链接推送完成。"
