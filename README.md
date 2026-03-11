# 个人作品集网站

一个优雅的个人作品集网站，用于展示你的项目、技能和联系方式。

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## 特性

- 响应式设计，适配各种设备
- 平滑滚动和动画效果
- 现代化的UI设计
- 纯前端实现，无需后端
- 可轻松自定义

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. 本地预览

直接在浏览器中打开 `index.html` 文件，或使用本地服务器：

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx serve
```

然后访问 `http://localhost:8000`

### 3. 自定义内容

编辑 `index.html` 文件，修改以下内容：

- 个人信息和简介
- 技能列表
- 项目展示
- 联系方式

## 部署到GitHub Pages

### 方法1：通过GitHub界面

1. 将代码推送到GitHub仓库
2. 进入仓库的 **Settings**
3. 找到 **Pages** 选项
4. 在 **Source** 下选择 `main` 分支
5. 点击 **Save**
6. 等待几分钟后，你的网站将在 `https://yourusername.github.io/portfolio` 上线

### 方法2：使用GitHub CLI

```bash
# 创建GitHub仓库
gh repo create portfolio --public

# 推送代码
git push -u origin main

# 启用GitHub Pages
gh api repos/yourusername/portfolio/pages -X POST -f source='{"branch":"main"}'
```

## 文件结构

```
portfolio/
│
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # JavaScript脚本
└── README.md       # 项目说明
```

## 自定义指南

### 修改颜色主题

在 `style.css` 文件顶部找到 `:root` 变量，修改颜色值：

```css
:root {
    --primary-color: #3498db;    /* 主色调 */
    --secondary-color: #2ecc71;  /* 次要颜色 */
    --dark-color: #2c3e50;       /* 深色 */
    --light-color: #ecf0f1;      /* 浅色 */
}
```

### 添加新项目

在 `index.html` 的项目部分添加新的项目卡片：

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-your-icon"></i>
    </div>
    <div class="project-content">
        <h3>项目名称</h3>
        <p>项目描述</p>
        <div class="project-tags">
            <span>技术1</span>
            <span>技术2</span>
        </div>
        <div class="project-links">
            <a href="项目链接" class="btn-small">
                <i class="fab fa-github"></i> 代码
            </a>
        </div>
    </div>
</div>
```

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome 图标

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License - 可自由使用和修改

## 联系方式

如有问题或建议，欢迎：
- 提交 Issue
- 发送邮件至 your.email@example.com

---

⭐ 如果这个项目对你有帮助，欢迎给个星标！
