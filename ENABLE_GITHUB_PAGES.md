#!/bin/bash
# GitHub Pages 自动启用脚本
# 使用 gh CLI (如果可用)

echo "🚀 正在尝试启用 GitHub Pages..."

# 方法1: 使用 gh CLI
if command -v gh &> /dev/null; then
    echo "使用 gh CLI 启用 Pages..."
    gh api repos/1qgithub/portfolio/pages -X POST -f source='{"branch":"main"}' 2>&1
else
    echo "gh CLI 不可用"
fi

# 方法2: 使用 curl + API
echo ""
echo "使用 GitHub API 启用 Pages..."
source /root/.codebuddy/skills/github-connector/scripts/get_token.sh github

curl -X POST \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://api.github.com/repos/1qgithub/portfolio/pages" \
  -d '{"source":{"branch":"main"}}' 2>&1

echo ""
echo "✅ 如果显示成功，请访问: https://1qgithub.github.io/portfolio"
