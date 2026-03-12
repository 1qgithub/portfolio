// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动时导航栏效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有卡片添加初始样式和观察器
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// 统计数字动画
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCount();
    });
}

// 当关于我部分进入视口时触发统计动画
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(aboutSection);
}

// 添加打字效果
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // 延迟开始打字效果
    setTimeout(typeWriter, 500);
}

// 项目分类筛选
const categoryBtns = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 更新按钮状态
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // 筛选项目
        projectCards.forEach(card => {
            if (category === 'all') {
                card.classList.remove('hidden');
                card.style.display = '';
            } else if (card.classList.contains(category)) {
                card.classList.remove('hidden');
                card.style.display = '';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

// 项目演示弹窗
const projectDemos = {
    'ai-website': {
        title: 'NeuralEarth AI 官网演示',
        url: 'projects/ai-website/index.html'
    }
};

function openProjectDemo(projectId) {
    const modal = document.getElementById('demo-modal');
    const iframe = document.getElementById('demo-iframe');
    const title = document.getElementById('demo-title');
    const fullscreenBtn = document.getElementById('demo-fullscreen');
    
    const project = projectDemos[projectId];
    
    if (project) {
        title.textContent = project.title;
        iframe.src = project.url;
        fullscreenBtn.href = project.url;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectDemo() {
    const modal = document.getElementById('demo-modal');
    const iframe = document.getElementById('demo-iframe');
    
    modal.classList.remove('active');
    iframe.src = '';
    document.body.style.overflow = '';
}

// 点击弹窗外部关闭
document.getElementById('demo-modal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeProjectDemo();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectDemo();
    }
});

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 项目卡片悬停效果增强
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

console.log('Portfolio website loaded successfully! 🚀');
