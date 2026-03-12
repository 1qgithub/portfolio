/* ========================================
   NeuralEarth AI - 主脚本
   中英文切换 + 交互效果
   ======================================== */

// 多语言配置
const translations = {
    zh: {
        'nav.home': '首页',
        'nav.about': '关于我们',
        'nav.technology': '核心技术',
        'nav.products': '产品服务',
        'nav.contact': '联系我们',
        'nav.demo': '预约演示',
        'nav.start': '立即开始',
        'hero.badge': '下一代人工智能解决方案',
        'hero.title1': '智连全球',
        'hero.title2': '创见未来',
        'hero.description': 'NeuralEarth AI 致力于突破人工智能边界，通过先进的深度学习与神经网络技术，为全球企业提供智能化转型解决方案，引领数字时代的创新浪潮。',
        'hero.explore': '探索更多',
        'hero.watch': '观看介绍',
        'hero.stat1': '全球客户',
        'hero.stat2': '系统可用率',
        'hero.stat3': '国家覆盖',
        'hero.scroll': '向下滚动探索',
        'about.title': '重新定义人工智能的边界',
        'about.subtitle': '我们汇聚全球顶尖AI人才，以突破性技术创新推动产业变革',
        'about.card1.title': '深度学习',
        'about.card1.desc': '基于最新神经网络架构，实现更高效、更精准的模型训练与推理能力',
        'about.card2.title': '全球部署',
        'about.card2.desc': '遍布全球的计算节点，确保毫秒级响应，支持多地域智能调度',
        'about.card3.title': '安全可靠',
        'about.card3.desc': '企业级安全架构，端到端加密，满足金融级数据安全标准',
        'about.card4.title': '无缝集成',
        'about.card4.desc': '丰富的API接口与SDK，快速融入现有业务系统，降低迁移成本',
        'tech.title': '前沿技术，卓越性能',
        'tech.subtitle': '自主研发的核心算法，引领行业技术革新',
        'tech.item1.title': '自注意力机制优化',
        'tech.item1.desc': '创新的稀疏注意力算法，在保持模型性能的同时，大幅降低计算复杂度',
        'tech.item2.title': '多模态融合架构',
        'tech.item2.desc': '统一处理文本、图像、语音等多种数据类型，实现跨模态理解与生成',
        'tech.item3.title': '边缘智能计算',
        'tech.item3.desc': '轻量化模型设计，支持在边缘设备上实现实时AI推理，降低延迟与成本',
        'tech.item4.title': '持续学习框架',
        'tech.item4.desc': '模型在线更新能力，支持增量学习，确保AI系统持续进化优化',
        'products.title': '全场景AI解决方案',
        'products.subtitle': '从基础能力到行业应用，满足多样化智能化需求',
        'products.detail': '了解详情',
        'products.p1.desc': '企业级智能对话引擎，支持多轮对话、情感分析、知识问答，打造智能客服新体验',
        'products.p1.f1': '多语言支持',
        'products.p1.f2': '意图识别',
        'products.p1.f3': '知识图谱',
        'products.p2.desc': '计算机视觉解决方案，覆盖图像识别、目标检测、视频分析等场景',
        'products.p2.f1': '实时检测',
        'products.p2.f2': 'OCR识别',
        'products.p2.f3': '视频理解',
        'products.p3.desc': '智能数据分析平台，自动发现数据价值，生成可视化洞察报告',
        'products.p3.f1': '自动分析',
        'products.p3.f2': '异常检测',
        'products.p3.f3': '预测建模',
        'products.p4.desc': '自动化机器学习平台，无需编码即可训练、部署和管理AI模型',
        'products.p4.f1': '可视化建模',
        'products.p4.f2': '自动调参',
        'products.p4.f3': '一键部署',
        'contact.title': '开启您的AI之旅',
        'contact.subtitle': '无论您是想了解产品详情，还是探讨定制化解决方案，我们都期待与您交流。',
        'contact.email': '邮箱',
        'contact.phone': '电话',
        'contact.address': '地址',
        'contact.addressValue': '北京市海淀区中关村科技园',
        'form.name': '您的姓名',
        'form.email': '电子邮箱',
        'form.company': '公司名称',
        'form.message': '您的需求',
        'form.submit': '发送消息',
        'footer.desc': '智连全球，创见未来。NeuralEarth AI致力于为全球企业提供领先的人工智能解决方案。',
        'footer.products': '产品服务',
        'footer.solutions': '解决方案',
        'footer.sol1': '智能客服',
        'footer.sol2': '智慧零售',
        'footer.sol3': '智能制造',
        'footer.sol4': '金融科技',
        'footer.about': '关于我们',
        'footer.about1': '公司介绍',
        'footer.about2': '新闻动态',
        'footer.about3': '加入我们',
        'footer.about4': '联系我们'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.technology': 'Technology',
        'nav.products': 'Products',
        'nav.contact': 'Contact',
        'nav.demo': 'Book Demo',
        'nav.start': 'Get Started',
        'hero.badge': 'Next-Generation AI Solutions',
        'hero.title1': 'Connect Globally',
        'hero.title2': 'Create the Future',
        'hero.description': 'NeuralEarth AI is dedicated to pushing the boundaries of artificial intelligence. Through advanced deep learning and neural network technologies, we provide intelligent transformation solutions for enterprises worldwide.',
        'hero.explore': 'Explore More',
        'hero.watch': 'Watch Video',
        'hero.stat1': 'Global Clients',
        'hero.stat2': 'System Uptime',
        'hero.stat3': 'Countries',
        'hero.scroll': 'Scroll to Explore',
        'about.title': 'Redefining the Boundaries of AI',
        'about.subtitle': 'Bringing together top AI talents worldwide to drive industry transformation through breakthrough technological innovation',
        'about.card1.title': 'Deep Learning',
        'about.card1.desc': 'Based on the latest neural network architectures, achieving more efficient and accurate model training and inference capabilities',
        'about.card2.title': 'Global Deployment',
        'about.card2.desc': 'Computing nodes distributed worldwide ensure millisecond-level response with intelligent multi-region scheduling',
        'about.card3.title': 'Secure & Reliable',
        'about.card3.desc': 'Enterprise-grade security architecture with end-to-end encryption meeting financial-grade data security standards',
        'about.card4.title': 'Seamless Integration',
        'about.card4.desc': 'Rich API interfaces and SDKs for quick integration into existing business systems with reduced migration costs',
        'tech.title': 'Cutting-Edge Technology, Superior Performance',
        'tech.subtitle': 'Proprietary core algorithms leading industry innovation',
        'tech.item1.title': 'Optimized Self-Attention',
        'tech.item1.desc': 'Innovative sparse attention algorithms that significantly reduce computational complexity while maintaining model performance',
        'tech.item2.title': 'Multi-Modal Fusion',
        'tech.item2.desc': 'Unified processing of text, image, audio and other data types enabling cross-modal understanding and generation',
        'tech.item3.title': 'Edge Intelligence',
        'tech.item3.desc': 'Lightweight model design supporting real-time AI inference on edge devices, reducing latency and costs',
        'tech.item4.title': 'Continuous Learning',
        'tech.item4.desc': 'Online model updating capability supporting incremental learning ensuring continuous AI system optimization',
        'products.title': 'Comprehensive AI Solutions',
        'products.subtitle': 'From foundational capabilities to industry applications, meeting diverse intelligent needs',
        'products.detail': 'Learn More',
        'products.p1.desc': 'Enterprise-grade intelligent dialogue engine supporting multi-turn conversations, sentiment analysis, and knowledge Q&A',
        'products.p1.f1': 'Multi-language',
        'products.p1.f2': 'Intent Recognition',
        'products.p1.f3': 'Knowledge Graph',
        'products.p2.desc': 'Computer vision solutions covering image recognition, object detection, video analysis and more',
        'products.p2.f1': 'Real-time Detection',
        'products.p2.f2': 'OCR Recognition',
        'products.p2.f3': 'Video Understanding',
        'products.p3.desc': 'Intelligent data analysis platform automatically discovering data value and generating visual insight reports',
        'products.p3.f1': 'Auto Analysis',
        'products.p3.f2': 'Anomaly Detection',
        'products.p3.f3': 'Predictive Modeling',
        'products.p4.desc': 'Automated machine learning platform for training, deploying and managing AI models without coding',
        'products.p4.f1': 'Visual Modeling',
        'products.p4.f2': 'Auto Tuning',
        'products.p4.f3': 'One-Click Deploy',
        'contact.title': 'Start Your AI Journey',
        'contact.subtitle': 'Whether you want to learn about product details or explore customized solutions, we look forward to connecting with you.',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.address': 'Address',
        'contact.addressValue': 'Zhongguancun Science Park, Beijing',
        'form.name': 'Your Name',
        'form.email': 'Email Address',
        'form.company': 'Company Name',
        'form.message': 'Your Requirements',
        'form.submit': 'Send Message',
        'footer.desc': 'Connect globally, create the future. NeuralEarth AI is dedicated to providing leading AI solutions for enterprises worldwide.',
        'footer.products': 'Products',
        'footer.solutions': 'Solutions',
        'footer.sol1': 'Smart Customer Service',
        'footer.sol2': 'Smart Retail',
        'footer.sol3': 'Smart Manufacturing',
        'footer.sol4': 'FinTech',
        'footer.about': 'About Us',
        'footer.about1': 'Company',
        'footer.about2': 'News',
        'footer.about3': 'Careers',
        'footer.about4': 'Contact'
    }
};

// 当前语言
let currentLang = localStorage.getItem('language') || 'zh';

// 切换语言
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 应用保存的语言
    switchLanguage(currentLang);
    
    // 语言切换按钮
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    // 导航栏滚动效果
    initNavbar();
    
    // 数字增长动画
    initCountUp();
    
    // 滚动动画
    initScrollAnimations();
    
    // 表单效果
    initFormEffects();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 移动端菜单
    initMobileMenu();
});

// 导航栏
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 导航链接激活
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// 数字增长动画
function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.dataset.target);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = target * easeOutQuart;
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 滚动动画
function initScrollAnimations() {
    const elements = document.querySelectorAll('.about-card, .tech-item, .product-card, .section-header');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// 表单效果
function initFormEffects() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        const sendingText = currentLang === 'zh' ? '发送中...' : 'Sending...';
        const successText = currentLang === 'zh' ? '发送成功!' : 'Sent Successfully!';
        
        btn.innerHTML = `<span>${sendingText}</span><i class="fas fa-spinner fa-spin"></i>`;
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = `<span>${successText}</span><i class="fas fa-check"></i>`;
            btn.style.background = '#00ff88';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 移动端菜单
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (!hamburger) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <div class="mobile-menu-content">
                    ${navLinks ? navLinks.outerHTML : ''}
                    ${navCta ? navCta.outerHTML : ''}
                </div>
            `;
            document.body.appendChild(mobileMenu);
            
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.98);
                    backdrop-filter: blur(20px);
                    z-index: 999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                .mobile-menu.active {
                    opacity: 1;
                    visibility: visible;
                }
                .mobile-menu-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    gap: 30px;
                }
                .mobile-menu .nav-links {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 25px;
                }
                .mobile-menu .nav-links a {
                    font-size: 1.5rem;
                }
                .mobile-menu .nav-cta {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            mobileMenu.classList.toggle('active');
        }, 10);
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    });
}

console.log('🌍 NeuralEarth AI Website Loaded');
