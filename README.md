# 🎨 个人作品集网站

> 一个现代化、响应式的个人作品集展示网站

[![在线预览](https://img.shields.io/badge/🌐_在线预览-点击查看-blue?style=for-the-badge)](https://1qgithub.github.io/portfolio)
[![GitHub stars](https://img.shields.io/github/stars/1qgithub/portfolio?style=social)](https://github.com/1qgithub/portfolio)

---

## 🚀 快速预览

<div align="center">

### 👉 [点击这里查看在线演示](https://1qgithub.github.io/portfolio) 👈

**网站地址**: https://1qgithub.github.io/portfolio

</div>

---



## ✨ 特性

- 🎨 **现代化设计** - 渐变色彩、卡片布局、优雅动画
- 📱 **响应式布局** - 完美适配桌面、平板和手机
- 🎭 **平滑动画** - 滚动动画、悬停效果、打字效果
- ⚡ **零依赖** - 纯HTML/CSS/JavaScript，无需框架
- 🎯 **SEO友好** - 语义化HTML结构
- 🔧 **易于定制** - CSS变量主题、模块化代码

---

## 🎯 在线访问

**🔗 网站地址**: [https://1qgithub.github.io/portfolio](https://1qgithub.github.io/portfolio)

### 扫码访问
![QR Code](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://1qgithub.github.io/portfolio)

---

## 🛠️ 本地运行

### 方法1：直接打开
```bash
# 克隆仓库
git clone https://github.com/1qgithub/portfolio.git

# 打开index.html
open portfolio/index.html  # macOS
start portfolio/index.html  # Windows
xdg-open portfolio/index.html  # Linux
```

### 方法2：本地服务器
```bash
# 使用Python
cd portfolio
python -m http.server 8000
# 访问 http://localhost:8000

# 或使用Node.js
npx serve
```

---

## 🎨 自定义指南

### 1. 修改个人信息

编辑 `index.html` 文件，修改以下部分：

**首页标题** (第26-28行)
```html
<h1>你好，我是 <span class="highlight">你的名字</span></h1>
<p class="subtitle">你的职位 | 你的标签</p>
```

**关于我** (第36-63行)
- 个人简介文字
- 统计数据（年经验、项目数等）

**技能列表** (第68-92行)
- 技能名称
- 技能描述
- 图标

**项目作品** (第95-155行)
- 项目名称和描述
- 技术标签
- 项目链接

**联系方式** (第160-175行)
- 邮箱地址
- GitHub链接
- LinkedIn链接

### 2. 修改颜色主题

编辑 `style.css` 文件顶部的CSS变量：

```css
:root {
    --primary-color: #3498db;    /* 主色调 - 蓝色 */
    --secondary-color: #2ecc71;  /* 次要颜色 - 绿色 */
    --dark-color: #2c3e50;       /* 深色 */
    --light-color: #ecf0f1;      /* 浅色 */
}
```

**推荐配色方案**：

```css
/* 科技感 */
--primary-color: #00d4ff;
--secondary-color: #00ff88;

/* 暖色调 */
--primary-color: #ff6b6b;
--secondary-color: #ffd93d;

/* 紫色系 */
--primary-color: #a855f7;
--secondary-color: #ec4899;
```

---

## 📁 项目结构

```
portfolio/
├── index.html              # 主页面文件
├── style.css               # 样式文件
├── script.js               # 交互脚本
├── README.md               # 项目说明（本文件）
└── .github/
    └── workflows/
        └── deploy.yml      # 自动部署配置
```

---

## 🌐 部署到GitHub Pages

### 快速部署

1. Fork或克隆此仓库
2. 进入仓库的 **Settings** → **Pages**
3. **Source** 选择 `main` 分支
4. 点击 **Save**
5. 等待1-2分钟后访问 `https://yourusername.github.io/portfolio`

---

## 💻 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式设计 |
| JavaScript (ES6+) | 交互逻辑 |
| Font Awesome | 图标库 |

---

## 🎯 功能特性

### 页面模块
- ✅ 固定导航栏（平滑滚动）
- ✅ Hero区域（渐变背景+打字效果）
- ✅ 关于我（统计动画）
- ✅ 技能展示（卡片布局）
- ✅ 项目作品（项目卡片）
- ✅ 联系方式（社交媒体链接）
- ✅ 响应式页脚

### 动画效果
- ✅ 平滑滚动
- ✅ 卡片悬停动画
- ✅ 数字递增动画
- ✅ 打字机效果
- ✅ 滚动显示动画

---

## 🔧 浏览器支持

| 浏览器 | 支持情况 |
|--------|---------|
| Chrome | ✅ 推荐 |
| Firefox | ✅ 支持 |
| Safari | ✅ 支持 |
| Edge | ✅ 支持 |

---

## 📝 更新日志

### v1.0.0 (2026-03-11)
- ✨ 初始版本发布
- 🎨 完整的响应式设计
- 🚀 GitHub Pages部署支持

---

## 📄 许可证

MIT License - 可自由使用和修改

---

## 📧 联系方式

如有问题或建议，欢迎：
- 🐛 [提交 Issue](https://github.com/1qgithub/portfolio/issues)
- 💬 [GitHub Discussions](https://github.com/1qgithub/portfolio/discussions)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，欢迎给个星标！**

**[🔝 返回顶部](#-个人作品集网站)**

</div>
