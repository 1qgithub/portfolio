#!/bin/bash

# GitHub部署脚本
# 使用方法：bash deploy.sh your_username

# 检查参数
if [ -z "$1" ]; then
    echo "❌ 错误：请提供GitHub用户名"
    echo "使用方法：bash deploy.sh your_username"
    exit 1
fi

USERNAME=$1
REPO_NAME="portfolio"

echo "🚀 开始部署到GitHub..."
echo "📍 GitHub用户: $USERNAME"
echo "📁 仓库名称: $REPO_NAME"
echo ""

# 检查是否已经是git仓库
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
    git branch -m main
fi

# 添加所有文件
echo "📝 添加文件到暂存区..."
git add .

# 检查是否有更改
if git diff --staged --quiet; then
    echo "⚠️  没有需要提交的更改"
else
    # 创建提交
    echo "💾 创建提交..."
    git commit -m "Initial commit: 个人作品集网站"
fi

# 添加远程仓库
echo "🔗 添加远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/$USERNAME/$REPO_NAME.git

# 推送代码
echo "📤 推送代码到GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "📋 下一步操作："
    echo "1. 访问 https://github.com/$USERNAME/$REPO_NAME"
    echo "2. 点击 Settings 标签"
    echo "3. 在左侧菜单找到 Pages"
    echo "4. Source 选择 main 分支，点击 Save"
    echo "5. 等待1-2分钟后访问："
    echo "   https://$USERNAME.github.io/$REPO_NAME"
    echo ""
else
    echo ""
    echo "❌ 推送失败！"
    echo ""
    echo "可能的原因："
    echo "1. 仓库尚未在GitHub上创建"
    echo "   → 访问 https://github.com/new 创建名为 '$REPO_NAME' 的仓库"
    echo ""
    echo "2. 需要GitHub认证"
    echo "   → 使用: git push https://YOUR_TOKEN@github.com/$USERNAME/$REPO_NAME.git main"
    echo ""
fi
