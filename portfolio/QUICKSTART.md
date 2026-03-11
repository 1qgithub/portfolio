# 🎯 快速开始指南

## 方法一：使用GitHub网站（推荐新手）

### 第一步：在GitHub上创建仓库

1. 打开浏览器，访问 [GitHub](https://github.com)
2. 登录你的账号
3. 点击右上角 `+` 号，选择 `New repository`
4. 填写信息：
   - Repository name: `portfolio`
   - Description: `个人作品集网站`
   - 选择 `Public`（公开）
   - ❌ **不要**勾选 "Add a README file"
5. 点击 `Create repository`

### 第二步：推送代码

创建仓库后，GitHub会显示一些命令。**忽略它们**，在终端执行：

```bash
# 进入项目目录
cd /workspace/portfolio

# 初始化Git（如果还没有）
git init
git branch -m main

# 添加所有文件
git add .

# 创建提交
git commit -m "Initial commit: 个人作品集网站"

# 添加远程仓库（替换 YOUR_USERNAME 为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# 推送代码
git push -u origin main
```

**如果需要认证**，使用以下格式的URL：
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 第三步：启用GitHub Pages

1. 访问你的仓库页面：`https://github.com/YOUR_USERNAME/portfolio`
2. 点击 `Settings` 标签
3. 在左侧菜单找到 `Pages`
4. 在 `Source` 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
5. 点击 `Save`
6. 等待1-2分钟，页面顶部会显示你的网站URL

### 第四步：访问你的网站

网站地址：`https://YOUR_USERNAME.github.io/portfolio`

---

## 方法二：使用部署脚本

```bash
# 进入项目目录
cd /workspace/portfolio

# 运行部署脚本（替换 YOUR_USERNAME）
bash deploy.sh YOUR_USERNAME
```

---

## 自定义你的网站

### 必须修改的内容

打开 `index.html` 文件，修改以下部分：

1. **第26-28行**：你的名字和职位
```html
<h1>你好，我是 <span class="highlight">你的名字</span></h1>
<p class="subtitle">你的职位 | 你的标签</p>
```

2. **第36-40行**：关于我部分的个人简介

3. **第54-63行**：你的统计数据（年经验、项目数等）

4. **第68-92行**：你的技能列表

5. **第95-155行**：你的项目作品

6. **第160-175行**：你的联系方式和社交媒体链接

### 修改颜色主题

打开 `style.css` 文件，修改第10-16行的颜色变量：

```css
:root {
    --primary-color: #3498db;    /* 主色调 */
    --secondary-color: #2ecc71;  /* 次要颜色 */
    --dark-color: #2c3e50;       /* 深色 */
    --light-color: #ecf0f1;      /* 浅色 */
}
```

---

## 本地预览

在推送之前，你可以本地预览网站：

```bash
# 方法1：使用Python
cd /workspace/portfolio
python3 -m http.server 8000
# 然后访问 http://localhost:8000

# 方法2：直接打开文件
# 在浏览器中打开 index.html 文件
```

---

## 常见问题

### Q1: 推送代码时提示需要认证

**解决方案**：使用带Token的URL

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 选择 `repo` 权限
4. 生成Token并复制
5. 使用以下命令推送：

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Q2: GitHub Pages显示404

**解决方案**：

1. 检查仓库是否为Public
2. 确认GitHub Pages已启用
3. 等待1-2分钟让部署完成
4. 清除浏览器缓存

### Q3: 样式不显示或图片不加载

**解决方案**：

1. 检查文件路径是否正确
2. 确认所有文件都已推送到GitHub
3. 清除浏览器缓存后刷新

---

## 项目文件说明

```
portfolio/
├── index.html           # 主页面（修改个人信息）
├── style.css            # 样式文件（修改颜色主题）
├── script.js            # 交互脚本（无需修改）
├── README.md            # 项目说明
├── DEPLOYMENT_GUIDE.md  # 详细部署指南
├── QUICKSTART.md        # 本文件
├── deploy.sh            # 自动部署脚本
└── .gitignore           # Git忽略配置
```

---

## 需要帮助？

- 查看 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) 获取详细说明
- 访问 [GitHub Pages文档](https://docs.github.com/zh/pages)
- 提交 [Issue](https://github.com) 反馈问题

---

**祝你部署顺利！🎉**
