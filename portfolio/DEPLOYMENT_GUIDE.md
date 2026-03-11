# 🚀 GitHub部署指南

## 项目概述

这是一个现代化的个人作品集网站，采用纯前端技术栈实现，可以直接部署到GitHub Pages。

### 项目特点

- **响应式设计**：完美适配桌面、平板和手机
- **动画效果**：平滑滚动、卡片动画、打字效果
- **模块化结构**：HTML、CSS、JavaScript分离，易于维护
- **零依赖**：无需安装任何npm包或框架
- **SEO友好**：语义化HTML结构

## 文件结构

```
portfolio/
├── index.html          # 主页面文件
├── style.css           # 样式文件
├── script.js           # 交互脚本
├── README.md           # 项目说明
├── .gitignore          # Git忽略文件
└── DEPLOYMENT_GUIDE.md # 本文件
```

## 🎯 部署步骤

### 第一步：创建GitHub仓库

#### 选项A：使用GitHub网站

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库信息：
   - Repository name: `portfolio`（或任意名称）
   - Description: 个人作品集网站
   - 选择 `Public`
   - ✅ 勾选 `Add a README file`
4. 点击 `Create repository`

#### 选项B：使用GitHub CLI（推荐）

```bash
# 登录GitHub
gh auth login

# 创建仓库
gh repo create portfolio --public --description "个人作品集网站"
```

### 第二步：推送代码到GitHub

在 `/workspace/portfolio` 目录下执行：

```bash
# 初始化Git（如果还未初始化）
git init

# 将分支重命名为main
git branch -m main

# 添加所有文件
git add .

# 创建首次提交
git commit -m "Initial commit: 个人作品集网站"

# 添加远程仓库（替换yourusername为你的GitHub用户名）
git remote add origin https://github.com/yourusername/portfolio.git

# 推送代码
git push -u origin main
```

### 第三步：启用GitHub Pages

#### 选项A：通过网站界面

1. 进入你的GitHub仓库页面
2. 点击 `Settings` 标签
3. 在左侧菜单找到 `Pages`
4. 在 `Source` 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
5. 点击 `Save`
6. 等待1-2分钟，页面顶部会显示你的网站URL

#### 选项B：使用GitHub CLI

```bash
# 启用GitHub Pages
gh api repos/yourusername/portfolio/pages -X POST -f source='{"branch":"main"}'
```

### 第四步：访问你的网站

部署完成后，你的网站将可通过以下URL访问：

```
https://yourusername.github.io/portfolio
```

## 🎨 自定义指南

### 1. 修改个人信息

编辑 `index.html`，找到以下部分并修改：

**首页标题区域**（约第25-35行）：
```html
<h1>你好，我是 <span class="highlight">你的名字</span></h1>
<p class="subtitle">你的职位 | 你的标签</p>
```

**关于我区域**（约第38-65行）：
- 修改头像图标或添加真实头像图片
- 更新个人描述文字
- 调整统计数据（年经验、项目数等）

**技能区域**（约第68-90行）：
- 修改技能卡片内容
- 添加或删除技能项
- 更换图标（使用Font Awesome图标）

**项目区域**（约第93-150行）：
- 添加你的真实项目
- 更新项目描述和技术标签
- 添加项目链接（GitHub仓库和演示地址）

**联系方式区域**（约第155-170行）：
- 更新邮箱地址
- 添加真实的GitHub和LinkedIn链接

### 2. 修改颜色主题

编辑 `style.css`，在文件顶部找到 `:root` 部分：

```css
:root {
    --primary-color: #3498db;    /* 主题色 - 蓝色 */
    --secondary-color: #2ecc71;  /* 辅助色 - 绿色 */
    --dark-color: #2c3e50;       /* 深色背景 */
    --light-color: #ecf0f1;      /* 浅色背景 */
    --text-color: #333;          /* 文字颜色 */
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

/* 深色模式 */
--background-color: #1a1a2e;
--text-color: #e0e0e0;
```

### 3. 添加真实头像

将你的头像图片放在项目目录下，然后修改HTML：

```html
<div class="about-image">
    <img src="your-avatar.jpg" alt="头像" style="width: 250px; height: 250px; border-radius: 50%; object-fit: cover;">
</div>
```

### 4. 添加更多项目

复制项目卡片模板并修改：

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-icon-name"></i>
    </div>
    <div class="project-content">
        <h3>新项目名称</h3>
        <p>项目描述文字</p>
        <div class="project-tags">
            <span>技术1</span>
            <span>技术2</span>
            <span>技术3</span>
        </div>
        <div class="project-links">
            <a href="GitHub仓库链接" class="btn-small" target="_blank">
                <i class="fab fa-github"></i> 代码
            </a>
            <a href="演示链接" class="btn-small" target="_blank">
                <i class="fas fa-external-link-alt"></i> 演示
            </a>
        </div>
    </div>
</div>
```

**图标资源**：
- 使用 [Font Awesome](https://fontawesome.com/icons) 查找图标
- 项目已引入Font Awesome CDN，直接使用图标类名即可

## 🔧 高级功能

### 添加Google Analytics

在 `index.html` 的 `<head>` 部分添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=你的跟踪ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '你的跟踪ID');
</script>
```

### 添加自定义域名

1. 在项目根目录创建 `CNAME` 文件
2. 写入你的域名（例如：`www.yourdomain.com`）
3. 在域名服务商处配置DNS解析

### 添加社交媒体卡片

在 `index.html` 的 `<head>` 部分添加：

```html
<!-- Open Graph / 社交媒体卡片 -->
<meta property="og:title" content="你的名字 - 作品集">
<meta property="og:description" content="全栈开发工程师，热爱创造优雅的Web应用">
<meta property="og:image" content="https://yourusername.github.io/portfolio/preview.png">
<meta property="og:url" content="https://yourusername.github.io/portfolio">
<meta name="twitter:card" content="summary_large_image">
```

## 📱 测试部署

### 本地测试

```bash
# 方法1：使用Python
cd /workspace/portfolio
python3 -m http.server 8000
# 访问 http://localhost:8000

# 方法2：使用Node.js
npx serve
# 访问显示的URL
```

### 检查清单

- [ ] 所有链接可点击且正确
- [ ] 图片正确加载
- [ ] 响应式布局正常
- [ ] 动画效果流畅
- [ ] 文字无拼写错误
- [ ] 联系方式正确

## 🐛 常见问题

### 问题1：GitHub Pages显示404

**解决方案**：
1. 检查仓库是否为Public
2. 确认GitHub Pages已启用
3. 等待1-2分钟让部署完成
4. 清除浏览器缓存

### 问题2：样式不生效

**解决方案**：
1. 检查CSS文件路径是否正确
2. 确认文件名为 `style.css`
3. 清除浏览器缓存后刷新

### 问题3：图标不显示

**解决方案**：
1. 检查网络连接
2. 确认Font Awesome CDN链接可访问
3. 考虑下载图标库到本地

### 问题4：移动端显示异常

**解决方案**：
1. 检查viewport meta标签
2. 使用浏览器开发者工具测试响应式
3. 调整CSS媒体查询

## 📊 性能优化建议

1. **压缩图片**：使用TinyPNG等工具
2. **最小化CSS/JS**：使用在线工具压缩
3. **启用浏览器缓存**：GitHub Pages自动处理
4. **使用CDN**：已使用Font Awesome CDN

## 🔐 安全建议

1. **不要提交敏感信息**：
   - API密钥
   - 密码
   - 私人邮箱（如不想公开）

2. **使用.gitignore**：
   - 已包含常见忽略项
   - 根据需要添加其他项

## 📝 后续维护

### 更新内容

```bash
# 修改文件后
git add .
git commit -m "更新项目信息"
git push
```

### 查看部署状态

1. 进入GitHub仓库
2. 点击Actions标签
3. 查看最近的部署记录

## 💡 推荐资源

- **图标库**：[Font Awesome](https://fontawesome.com/)
- **配色方案**：[Coolors](https://coolors.co/)
- **免费图片**：[Unsplash](https://unsplash.com/)
- **CSS灵感**：[CSS-Tricks](https://css-tricks.com/)
- **GitHub Pages文档**：[官方文档](https://docs.github.com/zh/pages)

---

**祝你部署顺利！🎉**

如有问题，可在GitHub上提Issue或参考官方文档。
