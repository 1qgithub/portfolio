/* ========================================
   NeuralEarth AI - Three.js 3D地球
   真实的3D旋转地球效果
   ======================================== */

let scene, camera, renderer, earth, clouds, atmosphere, stars;
let satellites = [];
let mouseX = 0, mouseY = 0;
let isMouseOver = false;

const radius = 200;
const segments = 64;

function init() {
    const canvas = document.getElementById('earth-canvas');
    if (!canvas) return;

    // 场景
    scene = new THREE.Scene();
    
    // 相机
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.z = 600;
    
    // 渲染器
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    createEarth();
    createStars();
    createAtmosphere();
    createSatellites();
    createOrbitRings();
    createDataPoints();
    
    // 光源
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    const cyanLight = new THREE.PointLight(0x00f5ff, 0.5, 1000);
    cyanLight.position.set(-300, 200, 300);
    scene.add(cyanLight);
    
    // 事件
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

function createEarth() {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    
    // 程序化纹理
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // 海洋渐变
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGradient.addColorStop(0, '#0a1520');
    oceanGradient.addColorStop(0.3, '#0d2030');
    oceanGradient.addColorStop(0.5, '#0a1a28');
    oceanGradient.addColorStop(0.7, '#051015');
    oceanGradient.addColorStop(1, '#020508');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 2048, 1024);
    
    // 大陆
    ctx.fillStyle = 'rgba(0, 245, 255, 0.35)';
    
    // 北美
    drawContinent(ctx, 200, 150, 280, 180);
    // 南美  
    drawContinent(ctx, 300, 380, 140, 220);
    // 欧洲
    drawContinent(ctx, 900, 100, 180, 140);
    // 非洲
    drawContinent(ctx, 950, 280, 160, 220);
    // 亚洲
    drawContinent(ctx, 1100, 80, 380, 220);
    // 澳大利亚
    drawContinent(ctx, 1450, 420, 140, 100);
    
    // 经纬网格
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.08)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 18; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 56.9);
        ctx.lineTo(2048, i * 56.9);
        ctx.stroke();
    }
    
    for (let i = 0; i <= 36; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 56.9, 0);
        ctx.lineTo(i * 56.9, 1024);
        ctx.stroke();
    }
    
    // 城市光点
    const cities = [
        {x: 220, y: 180}, {x: 280, y: 200}, {x: 320, y: 160},
        {x: 950, y: 140}, {x: 1000, y: 180}, {x: 1050, y: 160},
        {x: 1150, y: 130}, {x: 1220, y: 160}, {x: 1280, y: 140},
        {x: 1350, y: 170}, {x: 1400, y: 190}, {x: 1480, y: 400},
        {x: 1530, y: 420}, {x: 1580, y: 450}
    ];
    
    cities.forEach(city => {
        const gradient = ctx.createRadialGradient(city.x, city.y, 0, city.x, city.y, 12);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 1)');
        gradient.addColorStop(0.4, 'rgba(0, 245, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(city.x, city.y, 12, 0, Math.PI * 2);
        ctx.fill();
    });
    
    const texture = new THREE.CanvasTexture(canvas);
    
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpScale: 0.05,
        specular: new THREE.Color(0x222222),
        shininess: 5
    });
    
    earth = new THREE.Mesh(geometry, material);
    earth.rotation.x = 0.3;
    scene.add(earth);
    
    // 云层
    const cloudGeometry = new THREE.SphereGeometry(radius * 1.015, segments, segments);
    
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cloudCtx = cloudCanvas.getContext('2d');
    
    cloudCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const w = Math.random() * 80 + 40;
        const h = Math.random() * 25 + 10;
        cloudCtx.beginPath();
        cloudCtx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
        cloudCtx.fill();
    }
    
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.35,
        depthWrite: false
    });
    
    clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
}

function drawContinent(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    const points = 10;
    for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const r = (w / 2) * (0.6 + Math.random() * 0.4);
        const px = x + (w / 2) + Math.cos(angle) * r;
        const py = y + (h / 2) + Math.sin(angle) * r * (h / w);
        ctx.lineTo(px, py);
    }
    
    ctx.closePath();
    ctx.fill();
}

function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < 8000; i++) {
        const x = (Math.random() - 0.5) * 4000;
        const y = (Math.random() - 0.5) * 4000;
        const z = (Math.random() - 0.5) * 4000;
        positions.push(x, y, z);
        
        // 随机颜色
        const color = Math.random() > 0.8 ? 
            new THREE.Color(0x00f5ff) : 
            new THREE.Color(0xffffff);
        colors.push(color.r, color.g, color.b);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        size: 1.2,
        transparent: true,
        opacity: 0.9,
        vertexColors: true
    });
    
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

function createAtmosphere() {
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.15, segments, segments);
    
    const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                gl_FragColor = vec4(0.0, 0.96, 1.0, 1.0) * intensity;
            }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });
    
    atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
}

function createSatellites() {
    const satelliteData = [
        { radius: 320, speed: 0.002, color: 0x00f5ff, tilt: 0.3 },
        { radius: 380, speed: 0.0015, color: 0x00ff88, tilt: -0.2 },
        { radius: 420, speed: 0.001, color: 0xff6b6b, tilt: 0.5 }
    ];
    
    satelliteData.forEach((data, index) => {
        const group = new THREE.Group();
        
        // 卫星本体
        const satGeometry = new THREE.SphereGeometry(4, 16, 16);
        const satMaterial = new THREE.MeshPhongMaterial({
            color: data.color,
            emissive: data.color,
            emissiveIntensity: 0.6
        });
        const satellite = new THREE.Mesh(satGeometry, satMaterial);
        group.add(satellite);
        
        // 发光效果
        const glowGeometry = new THREE.SphereGeometry(6, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: data.color,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);
        
        scene.add(group);
        
        satellites.push({
            group: group,
            radius: data.radius,
            speed: data.speed,
            angle: index * (Math.PI * 2 / 3),
            tilt: data.tilt
        });
    });
}

function createOrbitRings() {
    const ringRadii = [320, 380, 420];
    
    ringRadii.forEach((r, index) => {
        const ringGeometry = new THREE.TorusGeometry(r, 0.3, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x00f5ff,
            transparent: true,
            opacity: 0.15 - index * 0.03,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);
    });
    
    // 外层光晕环
    const glowRingGeometry = new THREE.TorusGeometry(radius * 1.8, 2, 16, 100);
    const glowRingMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide
    });
    const glowRing = new THREE.Mesh(glowRingGeometry, glowRingMaterial);
    glowRing.rotation.x = Math.PI / 2;
    scene.add(glowRing);
}

function createDataPoints() {
    // 在地球表面添加动态数据点
    const dataPointsGeometry = new THREE.BufferGeometry();
    const positions = [];
    
    for (let i = 0; i < 100; i++) {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        
        const x = radius * 1.01 * Math.sin(theta) * Math.cos(phi);
        const y = radius * 1.01 * Math.cos(theta);
        const z = radius * 1.01 * Math.sin(theta) * Math.sin(phi);
        
        positions.push(x, y, z);
    }
    
    dataPointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    const dataPointsMaterial = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 3,
        transparent: true,
        opacity: 0.6
    });
    
    const dataPoints = new THREE.Points(dataPointsGeometry, dataPointsMaterial);
    scene.add(dataPoints);
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // 地球自转
    if (earth) {
        earth.rotation.y += 0.001;
        
        // 鼠标交互
        const targetX = 0.3 + mouseY * 0.2;
        earth.rotation.x += (targetX - earth.rotation.x) * 0.02;
    }
    
    // 云层
    if (clouds) {
        clouds.rotation.y += 0.0003;
        clouds.rotation.x = earth ? earth.rotation.x : clouds.rotation.x;
    }
    
    // 卫星
    satellites.forEach(sat => {
        sat.angle += sat.speed;
        sat.group.position.x = Math.cos(sat.angle) * sat.radius;
        sat.group.position.z = Math.sin(sat.angle) * sat.radius;
        sat.group.position.y = Math.sin(sat.angle * 3) * 20 + sat.tilt * 50;
    });
    
    // 星空
    if (stars) {
        stars.rotation.y += 0.00005;
    }
    
    renderer.render(scene, camera);
}

// 初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
