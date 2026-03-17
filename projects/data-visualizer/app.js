// 数据可视化工具 - 主应用逻辑

// 全局状态
let originalData = null;
let currentData = null;
let currentHeaders = [];
let columnTypes = {};
let chartInstance = null;
let currentTheme = 'light';
let selectedChartType = 'bar';

// DOM 元素 - 基础
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const chartCanvas = document.getElementById('chartCanvas');
const loadingOverlay = document.getElementById('loadingOverlay');
const toastContainer = document.getElementById('toastContainer');
const themeToggle = document.getElementById('themeToggle');

const tableInfo = document.getElementById('tableInfo');
const dataTable = document.getElementById('dataTable');

// DOM 元素 - 稡块
const statsGrid = document.getElementById('statsGrid');
const searchInput = document.getElementById('searchInput');
const sortColumn = document.getElementById('sortColumn');
const sortOrder = document.getElementById('sortOrder');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const resetFilterBtn = document.getElementById('resetFilterBtn');
const clearDataBtn = document.getElementById('clearDataBtn');

// DOM 元素 - 聚合
const groupColumn = document.getElementById('groupColumn');
const valueColumn = document.getElementById('valueColumn');
const aggregateFunc = document.getElementById('aggregateFunc');
const applyAggregateBtn = document.getElementById('applyAggregateBtn');

// DOM 元素 - 图表配置
const chartTypeBtns = document.querySelectorAll('.chart-type-btn');
const xAxis = document.getElementById('xAxis');
const chartTitleInput = document.getElementById('chartTitle');
const seriesCheckboxes = document.getElementById('seriesCheckboxes');
const selectAllSeries = document.getElementById('selectAllSeries');
const colorScheme = document.getElementById('colorScheme');
const chartAnimation = document.getElementById('chartAnimation');
const chartLegend = document.getElementById('chartLegend');
const generateChartBtn = document.getElementById('generateChartBtn');

// DOM 元素 - 导出
let exportPreset, exportWidth, exportHeight, exportDpi, exportFormat, exportQuality, qualityValue, exportInfoText, downloadChartBtn, downloadPdfBtn, downloadSvgBtn, exportDataBtn;

// 导航元素
const navItems = document.querySelectorAll('.nav-item');
const sections = {
    upload: document.getElementById('sectionUpload'),
    stats: document.getElementById('sectionStats'),
    data: document.getElementById('sectionData'),
    aggregate: document.getElementById('sectionAggregate'),
    config: document.getElementById('sectionConfig'),
    chart: document.getElementById('sectionChart')
};

const navIds = {
    upload: 'navUpload',
    stats: 'navStats',
    data: 'navData',
    aggregate: 'navAggregate',
    config: 'navConfig',
    chart: 'navChart'
};

// 配色方案
const colorSchemes = {
    default: {
        backgrounds: [
            'rgba(79, 70, 229, 0.7)', 'rgba(236, 72, 153, 0.7)', 'rgba(34, 197, 94, 0.7)',
            'rgba(245, 158, 11, 0.7)', 'rgba(59, 130, 246, 0.7)', 'rgba(168, 85, 247, 0.7)',
            'rgba(239, 68, 68, 0.7)', 'rgba(20, 184, 166, 0.7)', 'rgba(251, 146, 60, 0.7)',
            'rgba(99, 102, 241, 0.7)'
        ],
        borders: [
            'rgba(79, 70, 229, 1)', 'rgba(236, 72, 153, 1)', 'rgba(34, 197, 94, 1)',
            'rgba(245, 158, 11, 1)', 'rgba(59, 130, 246, 1)', 'rgba(168, 85, 247, 1)',
            'rgba(239, 68, 68, 1)', 'rgba(20, 184, 166, 1)', 'rgba(251, 146, 60, 1)',
            'rgba(99, 102, 241, 1)'
        ]
    },
    pastel: {
        backgrounds: [
            'rgba(199, 210, 254, 0.8)', 'rgba(251, 207, 232, 0.8)', 'rgba(187, 247, 208, 0.8)',
            'rgba(254, 240, 138, 0.8)', 'rgba(191, 219, 254, 0.8)', 'rgba(221, 214, 254, 0.8)',
            'rgba(254, 202, 202, 0.8)', 'rgba(187, 242, 238, 0.8)', 'rgba(254, 215, 170, 0.8)',
            'rgba(199, 226, 254, 0.8)'
        ],
        borders: [
            'rgba(165, 180, 252, 1)', 'rgba(244, 176, 219, 1)', 'rgba(134, 239, 172, 1)',
            'rgba(250, 204, 21, 1)', 'rgba(147, 197, 253, 1)', 'rgba(167, 139, 250, 1)',
            'rgba(252, 165, 165, 1)', 'rgba(153, 246, 228, 1)', 'rgba(253, 186, 116, 1)',
            'rgba(163, 194, 244, 1)'
        ]
    },
    vibrant: {
        backgrounds: [
            'rgba(67, 56, 202, 0.9)', 'rgba(219, 39, 119, 0.9)', 'rgba(22, 163, 74, 0.9)',
            'rgba(217, 119, 6, 0.9)', 'rgba(37, 99, 235, 0.9)', 'rgba(139, 92, 246, 0.9)',
            'rgba(220, 38, 38, 0.9)', 'rgba(13, 148, 136, 0.9)', 'rgba(234, 88, 12, 0.9)',
            'rgba(79, 70, 229, 0.9)'
        ],
        borders: [
            'rgba(55, 48, 163, 1)', 'rgba(190, 24, 93, 1)', 'rgba(21, 128, 61, 1)',
            'rgba(180, 83, 9, 1)', 'rgba(29, 78, 216, 1)', 'rgba(124, 58, 237, 1)',
            'rgba(185, 28, 28, 1)', 'rgba(15, 118, 110, 1)', 'rgba(194, 65, 12, 1)',
            'rgba(67, 56, 202, 1)'
        ]
    },
    cool: {
        backgrounds: [
            'rgba(59, 130, 246, 0.7)', 'rgba(99, 102, 241, 0.7)', 'rgba(139, 92, 246, 0.7)',
            'rgba(6, 182, 212, 0.7)', 'rgba(20, 184, 166, 0.7)', 'rgba(79, 70, 229, 0.7)',
            'rgba(67, 56, 202, 0.7)', 'rgba(124, 58, 237, 0.7)', 'rgba(37, 99, 235, 0.7)',
            'rgba(14, 165, 233, 0.7)'
        ],
        borders: [
            'rgba(37, 99, 235, 1)', 'rgba(79, 70, 229, 1)', 'rgba(124, 58, 237, 1)',
            'rgba(8, 145, 178, 1)', 'rgba(13, 148, 136, 1)', 'rgba(67, 56, 202, 1)',
            'rgba(55, 48, 163, 1)', 'rgba(109, 40, 217, 1)', 'rgba(29, 78, 216, 1)',
            'rgba(2, 132, 199, 1)'
        ]
    },
    warm: {
        backgrounds: [
            'rgba(239, 68, 68, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(249, 115, 22, 0.7)',
            'rgba(236, 72, 153, 0.7)', 'rgba(251, 146, 60, 0.7)', 'rgba(220, 38, 38, 0.7)',
            'rgba(217, 119, 6, 0.7)', 'rgba(234, 88, 12, 0.7)', 'rgba(219, 39, 119, 0.7)',
            'rgba(253, 186, 116, 0.7)'
        ],
        borders: [
            'rgba(185, 28, 28, 1)', 'rgba(180, 83, 9, 1)', 'rgba(194, 65, 12, 1)',
            'rgba(190, 24, 93, 1)', 'rgba(234, 88, 12, 1)', 'rgba(153, 27, 27, 1)',
            'rgba(146, 64, 14, 1)', 'rgba(172, 53, 9, 1)', 'rgba(168, 13, 69, 1)',
            'rgba(247, 150, 81, 1)'
        ]
    },
    monochrome: {
        backgrounds: [
            'rgba(79, 70, 229, 0.9)', 'rgba(79, 70, 229, 0.75)', 'rgba(79, 70, 229, 0.6)',
            'rgba(79, 70, 229, 0.45)', 'rgba(79, 70, 229, 0.8)', 'rgba(79, 70, 229, 0.65)',
            'rgba(79, 70, 229, 0.5)', 'rgba(79, 70, 229, 0.35)', 'rgba(79, 70, 229, 0.7)',
            'rgba(79, 70, 229, 0.55)'
        ],
        borders: [
            'rgba(67, 56, 202, 1)', 'rgba(67, 56, 202, 0.85)', 'rgba(67, 56, 202, 0.7)',
            'rgba(67, 56, 202, 0.55)', 'rgba(67, 56, 202, 0.9)', 'rgba(67, 56, 202, 0.75)',
            'rgba(67, 56, 202, 0.6)', 'rgba(67, 56, 202, 0.45)', 'rgba(67, 56, 202, 0.8)',
            'rgba(67, 56, 202, 0.65)'
        ]
    }
};

// 初始化
function init() {
    // 检查必要的库是否加载
    if (typeof Chart === 'undefined') {
        console.error('Chart.js 未能加载');
        alert('图表库加载失败，请刷新页面重试');
        return;
    }
    if (typeof XLSX === 'undefined') {
        console.error('SheetJS 未能加载');
        alert('Excel解析库加载失败，请刷新页面重试');
        return;
    }
    
    // 初始化导出相关 DOM 元素
    exportPreset = document.getElementById('exportPreset');
    exportWidth = document.getElementById('exportWidth');
    exportHeight = document.getElementById('exportHeight');
    exportDpi = document.getElementById('exportDpi');
    exportFormat = document.getElementById('exportFormat');
    exportQuality = document.getElementById('exportQuality');
    qualityValue = document.getElementById('qualityValue');
    exportInfoText = document.getElementById('exportInfoText');
    downloadChartBtn = document.getElementById('downloadChartBtn');
    downloadPdfBtn = document.getElementById('downloadPdfBtn');
    downloadSvgBtn = document.getElementById('downloadSvgBtn');
    exportDataBtn = document.getElementById('exportDataBtn');
    
    setupEventListeners();
    loadTheme();
    updateExportInfo();
    console.log('数据可视化工具初始化完成');
}

// 设置事件监听器
function setupEventListeners() {
    // 文件上传
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);

    // 清除数据
    clearDataBtn.addEventListener('click', clearData);

    // 筛选和排序
    applyFilterBtn.addEventListener('click', applyFilters);
    resetFilterBtn.addEventListener('click', resetFilters);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    // 聚合
    applyAggregateBtn.addEventListener('click', applyAggregation);

    // 图表类型选择
    chartTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chartTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedChartType = btn.dataset.type;
            updateChartConfig();
        });
    });

    // 多系列选择
    selectAllSeries.addEventListener('click', toggleSelectAllSeries);

    // X轴变化时更新标题
    xAxis.addEventListener('change', updateChartTitle);

    // 生成图表
    generateChartBtn.addEventListener('click', generateChart);

    // 导出功能
    downloadChartBtn.addEventListener('click', exportHighResChart);
    downloadPdfBtn.addEventListener('click', exportToPDF);
    downloadSvgBtn.addEventListener('click', exportToSVG);
    exportDataBtn.addEventListener('click', exportData);
    
    // 格式变化时显示/隐藏质量滑块
    exportFormat.addEventListener('change', () => {
        const format = exportFormat.value;
        const qualityGroup = exportQuality.closest('.export-group');
        if (qualityGroup) {
            qualityGroup.style.display = (format === 'jpeg') ? 'flex' : 'none';
        }
    });
    
    // 导出设置事件
    exportPreset.addEventListener('change', handlePresetChange);
    exportWidth.addEventListener('input', updateExportInfo);
    exportHeight.addEventListener('input', updateExportInfo);
    exportDpi.addEventListener('change', updateExportInfo);
    exportQuality.addEventListener('input', () => {
        qualityValue.textContent = exportQuality.value + '%';
    });

    // 主题切换
    themeToggle.addEventListener('click', toggleTheme);
    
    // 导航切换
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
        });
    });
}

// 切换模块
function switchSection(sectionName) {
    // 更新导航状态
    navItems.forEach(item => {
        if (item.dataset.section === sectionName) {
            item.classList.add('active');
    } else {
        item.classList.remove('active');
    }
    });
    
    // 切换内容区域
    Object.keys(sections).forEach(key => {
        if (key === sectionName) {
        sections[key].classList.add('active');
    } else {
        sections[key].classList.remove('active');
    }
    });
}

// 启用导航项
function enableNavItem(sectionName) {
    const navItem = document.getElementById(navIds[sectionName]);
    if (navItem) {
        navItem.classList.remove('disabled');
    }
}

// 独占导航项
function disableNavItem(sectionName) {
    const navItem = document.getElementById(navIds[sectionName]);
    if (navItem) {
        navItem.classList.add('disabled');
    }
}

// 拖拽悬停
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add('dragover');
}

// 拖拽离开
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('dragover');
}

// 文件拖放
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// 文件选择
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// 处理文件
function processFile(file) {
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
        showToast('请上传 Excel (.xlsx, .xls) 或 CSV 文件', 'error');
        return;
    }

    showLoading(true);

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = e.target.result;
            let workbook;

            if (fileExtension === '.csv') {
                workbook = XLSX.read(data, { type: 'string', codepage: 65001 });
            } else {
                workbook = XLSX.read(data, { type: 'binary' });
            }

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (jsonData.length < 2) {
                showToast('文件数据不足，请确保文件包含表头和数据', 'error');
                showLoading(false);
                return;
            }

            currentHeaders = jsonData[0].map(h => String(h).trim());
            originalData = jsonData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== ''));
            currentData = [...originalData];

            if (currentData.length === 0) {
                showToast('未找到有效数据', 'error');
                showLoading(false);
                return;
            }

            // 分析列类型
            analyzeColumnTypes();

            // 显示所有区域
            displayStats();
            displayData();
            setupChartConfig();
            setupFilterConfig();
            setupAggregateConfig();
            
            // 启用导航项
            enableNavItem('stats');
            enableNavItem('data');
            enableNavItem('aggregate');
            enableNavItem('config');

            showLoading(false);
            
            // 切换到统计模块
            switchSection('stats');
            showToast(`成功加载 ${currentData.length} 行数据`, 'success');

        } catch (error) {
            console.error('文件解析错误:', error);
            showToast('文件解析失败，请检查文件格式是否正确', 'error');
            showLoading(false);
        }
    };

    reader.onerror = function() {
        showToast('文件读取失败', 'error');
        showLoading(false);
    };

    if (fileExtension === '.csv') {
        reader.readAsText(file);
    } else {
        reader.readAsBinaryString(file);
    }
}

// 分析列类型
function analyzeColumnTypes() {
    columnTypes = {};
    currentHeaders.forEach((_, index) => {
        let numericCount = 0;
        let dateCount = 0;
        let totalValid = 0;

        currentData.forEach(row => {
            const value = row[index];
            if (value !== undefined && value !== null && value !== '') {
                totalValid++;
                if (!isNaN(parseFloat(value))) {
                    numericCount++;
                }
                if (!isNaN(Date.parse(value))) {
                    dateCount++;
                }
            }
        });

        if (totalValid > 0) {
            if (numericCount / totalValid > 0.8) {
                columnTypes[index] = 'numeric';
            } else if (dateCount / totalValid > 0.8) {
                columnTypes[index] = 'date';
            } else {
                columnTypes[index] = 'text';
            }
        } else {
            columnTypes[index] = 'text';
        }
    });
}

// 显示统计信息
function displayStats() {
    const numericColumns = Object.entries(columnTypes).filter(([_, type]) => type === 'numeric');
    
    let statsHtml = `
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-database"></i></div>
            <div class="stat-value">${currentData.length}</div>
            <div class="stat-label">数据行数</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-columns"></i></div>
            <div class="stat-value">${currentHeaders.length}</div>
            <div class="stat-label">数据列数</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-hashtag"></i></div>
            <div class="stat-value">${numericColumns.length}</div>
            <div class="stat-label">数值列</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-font"></i></div>
            <div class="stat-value">${currentHeaders.length - numericColumns.length}</div>
            <div class="stat-label">文本列</div>
        </div>
    `;

    // 如果有数值列，显示一些统计
    if (numericColumns.length > 0) {
        const [colIndex] = numericColumns[0];
        const values = currentData.map(row => parseFloat(row[colIndex])).filter(v => !isNaN(v));
        if (values.length > 0) {
            const sum = values.reduce((a, b) => a + b, 0);
            const avg = sum / values.length;
            statsHtml += `
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-calculator"></i></div>
                    <div class="stat-value">${avg.toFixed(2)}</div>
                    <div class="stat-label">${currentHeaders[colIndex]} 平均值</div>
                </div>
            `;
        }
    }

    statsGrid.innerHTML = statsHtml;
}

// 显示数据表格
function displayData() {
    const thead = dataTable.querySelector('thead');
    const tbody = dataTable.querySelector('tbody');

    thead.innerHTML = '';
    tbody.innerHTML = '';

    // 创建表头
    const headerRow = document.createElement('tr');
    currentHeaders.forEach((header, index) => {
        const th = document.createElement('th');
        th.innerHTML = `
            ${header}
            <span class="data-type-badge ${columnTypes[index]}">${columnTypes[index] === 'numeric' ? '数值' : columnTypes[index] === 'date' ? '日期' : '文本'}</span>
        `;
        th.addEventListener('click', () => sortTableByColumn(index));
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // 创建数据行（最多显示前100行）
    updateTableBody();

    updateTableInfo();
}

// 更新表格内容
function updateTableBody() {
    const tbody = dataTable.querySelector('tbody');
    tbody.innerHTML = '';

    const displayRows = currentData.slice(0, 100);
    displayRows.forEach(row => {
        const tr = document.createElement('tr');
        currentHeaders.forEach((_, index) => {
            const td = document.createElement('td');
            const value = row[index];
            td.textContent = value !== undefined ? value : '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    if (currentData.length > 100) {
        const infoRow = document.createElement('tr');
        const infoTd = document.createElement('td');
        infoTd.colSpan = currentHeaders.length;
        infoTd.textContent = `... 还有 ${currentData.length - 100} 行数据未显示`;
        infoTd.style.textAlign = 'center';
        infoTd.style.color = 'var(--text-secondary)';
        infoTd.style.fontStyle = 'italic';
        infoRow.appendChild(infoTd);
        tbody.appendChild(infoRow);
    }
}

// 更新表格信息
function updateTableInfo() {
    tableInfo.textContent = `显示 ${Math.min(currentData.length, 100)} / ${originalData.length} 行`;
}

// 设置筛选配置
function setupFilterConfig() {
    sortColumn.innerHTML = '<option value="">选择列</option>';
    currentHeaders.forEach((header, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = header;
        sortColumn.appendChild(option);
    });
}

// 设置聚合配置
function setupAggregateConfig() {
    groupColumn.innerHTML = '<option value="">选择分组列</option>';
    valueColumn.innerHTML = '<option value="">选择值列</option>';

    currentHeaders.forEach((header, index) => {
        const groupOption = document.createElement('option');
        groupOption.value = index;
        groupOption.textContent = header;
        groupColumn.appendChild(groupOption);

        const valueOption = document.createElement('option');
        valueOption.value = index;
        valueOption.textContent = header;
        valueColumn.appendChild(valueOption);
    });
}

// 设置图表配置
function setupChartConfig() {
    xAxis.innerHTML = '';
    seriesCheckboxes.innerHTML = '';

    currentHeaders.forEach((header, index) => {
        // X轴选项
        const xOption = document.createElement('option');
        xOption.value = index;
        xOption.textContent = header;
        xAxis.appendChild(xOption);

        // Y轴复选框（仅数值列默认勾选）
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'series-checkbox';
        checkboxDiv.innerHTML = `
            <input type="checkbox" id="yAxis${index}" value="${index}" ${columnTypes[index] === 'numeric' ? 'checked' : ''}>
            <label for="yAxis${index}">${header}</label>
        `;
        seriesCheckboxes.appendChild(checkboxDiv);
    });

    // 默认选中第一项
    if (currentHeaders.length >= 1) {
        xAxis.selectedIndex = 0;
    }

    // 设置默认标题
    const numericCols = Object.entries(columnTypes).filter(([_, type]) => type === 'numeric');
    if (numericCols.length > 0) {
        chartTitleInput.value = `${currentHeaders[0]} 数据分析`;
    } else {
        chartTitleInput.value = currentHeaders[0];
    }
}

// 更新图表标题
function updateChartTitle() {
    const xIndexVal = parseInt(xAxis.value);
    if (isNaN(xIndexVal)) return;
    
    const selectedY = getSelectedYAxes();
    if (selectedY.length > 0) {
        chartTitleInput.value = `${currentHeaders[xIndexVal]} vs ${selectedY.map(i => currentHeaders[i]).join(', ')}`;
    } else {
        chartTitleInput.value = currentHeaders[xIndexVal] || '数据图表';
    }
}

// 更新图表配置（根据图表类型）
function updateChartConfig() {
    const isPieChart = ['pie', 'doughnut', 'polarArea'].includes(selectedChartType);
    
    // 饼图类只允许选择一个Y轴
    if (isPieChart) {
        const checkboxes = seriesCheckboxes.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb, index) => {
            if (index > 0) {
                cb.checked = false;
                cb.disabled = true;
            } else {
                cb.checked = true;
            }
        });
    } else {
        const checkboxes = seriesCheckboxes.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.disabled = false;
        });
    }
}

// 获取选中的Y轴
function getSelectedYAxes() {
    const checkboxes = seriesCheckboxes.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
    return Array.from(checkboxes).map(cb => parseInt(cb.value));
}

// 切换全选系列
function toggleSelectAllSeries() {
    const checkboxes = seriesCheckboxes.querySelectorAll('input[type="checkbox"]:not(:disabled)');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
}

// 应用筛选
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortCol = sortColumn.value;
    const order = sortOrder.value;

    // 先筛选
    if (searchTerm) {
        currentData = originalData.filter(row => 
            row.some(cell => String(cell).toLowerCase().includes(searchTerm))
        );
    } else {
        currentData = [...originalData];
    }

    // 再排序
    if (sortCol !== '') {
        const colIndex = parseInt(sortCol);
        currentData.sort((a, b) => {
            const aVal = a[colIndex];
            const bVal = b[colIndex];
            
            // 数值排序
            const aNum = parseFloat(aVal);
            const bNum = parseFloat(bVal);
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return order === 'asc' ? aNum - bNum : bNum - aNum;
            }
            
            // 文本排序
            const aStr = String(aVal || '');
            const bStr = String(bVal || '');
            return order === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
        });
    }

    updateTableBody();
    updateTableInfo();
    showToast(`筛选完成，共 ${currentData.length} 行数据`, 'success');
}

// 重置筛选
function resetFilters() {
    searchInput.value = '';
    sortColumn.value = '';
    sortOrder.value = 'asc';
    currentData = [...originalData];
    updateTableBody();
    updateTableInfo();
    showToast('已重置筛选条件', 'success');
}

// 按列排序
function sortTableByColumn(colIndex) {
    sortColumn.value = String(colIndex);
    if (sortOrder.value === 'asc') {
        sortOrder.value = 'desc';
    } else {
        sortOrder.value = 'asc';
    }
    applyFilters();
}

// 应用聚合
function applyAggregation() {
    const groupCol = groupColumn.value;
    const valCol = valueColumn.value;
    const func = aggregateFunc.value;

    if (groupCol === '' || valCol === '') {
        showToast('请选择分组列和值列', 'warning');
        return;
    }

    const groupIndex = parseInt(groupCol);
    const valueIndex = parseInt(valCol);

    // 分组聚合
    const groups = {};
    currentData.forEach(row => {
        const key = row[groupIndex];
        const value = parseFloat(row[valueIndex]);
        
        if (!isNaN(value)) {
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(value);
        }
    });

    // 计算聚合结果
    const result = [];
    Object.entries(groups).forEach(([key, values]) => {
        let aggValue;
        switch (func) {
            case 'sum':
                aggValue = values.reduce((a, b) => a + b, 0);
                break;
            case 'avg':
                aggValue = values.reduce((a, b) => a + b, 0) / values.length;
                break;
            case 'count':
                aggValue = values.length;
                break;
            case 'max':
                aggValue = Math.max(...values);
                break;
            case 'min':
                aggValue = Math.min(...values);
                break;
            default:
                aggValue = values.reduce((a, b) => a + b, 0);
        }
        result.push({ key, value: aggValue });
    });

    // 更新数据
    currentHeaders = [currentHeaders[groupIndex], `${currentHeaders[valueIndex]}_${func}`];
    currentData = result.map(r => [r.key, r.value]);
    columnTypes = { 0: 'text', 1: 'numeric' };

    displayData();
    setupChartConfig();
    
    showToast(`聚合完成，共 ${currentData.length} 个分组`, 'success');
}

// 生成图表
function generateChart() {
    try {
        // 检查 Chart.js 是否已加载
        if (typeof Chart === 'undefined') {
            showToast('图表库未加载，请刷新页面重试', 'error');
            return;
        }
        
        if (!currentData || currentData.length === 0) {
            showToast('请先上传数据', 'warning');
            return;
        }

        const xIndexVal = xAxis.value;
        if (xIndexVal === '' || xIndexVal === null || xIndexVal === undefined) {
            showToast('请选择X轴数据', 'warning');
            return;
        }
        
        const xIndex = parseInt(xIndexVal);
        if (isNaN(xIndex)) {
            showToast('X轴数据选择无效', 'warning');
            return;
        }
        
        const yIndices = getSelectedYAxes();
        const title = chartTitleInput.value || '数据图表';
        const scheme = colorSchemes[colorScheme.value] || colorSchemes.default;

        if (yIndices.length === 0) {
            showToast('请至少选择一个Y轴数据', 'warning');
            return;
        }

        // 准备数据
        const labels = currentData.map(row => row[xIndex] !== undefined ? String(row[xIndex]) : '');

    // 销毁旧图表
    if (chartInstance) {
        chartInstance.destroy();
    }

    // 动画配置
    let animationConfig;
    switch (chartAnimation.value) {
        case 'fast':
            animationConfig = { duration: 300 };
            break;
        case 'slow':
            animationConfig = { duration: 2000 };
            break;
        case 'none':
            animationConfig = false;
            break;
        default:
            animationConfig = { duration: 1000 };
    }

    // 图例位置
    const legendConfig = chartLegend.value === 'none' ? { display: false } : { display: true, position: chartLegend.value };

    // 准备数据集
    const isPieChart = ['pie', 'doughnut', 'polarArea'].includes(selectedChartType);
    const isScatter = selectedChartType === 'scatter';
    const isArea = selectedChartType === 'area';

    let datasets;
    let chartTypeToUse = isArea ? 'line' : selectedChartType;

    if (isScatter) {
        const yIndex = yIndices[0];
        const scatterData = currentData.map(row => {
            const xVal = parseFloat(row[xIndex]);
            const yVal = parseFloat(row[yIndex]);
            return (!isNaN(xVal) && !isNaN(yVal)) ? { x: xVal, y: yVal } : null;
        }).filter(d => d !== null);

        datasets = [{
            label: currentHeaders[yIndex],
            data: scatterData,
            backgroundColor: scheme.backgrounds[0],
            borderColor: scheme.borders[0],
            pointRadius: 5,
            pointHoverRadius: 8
        }];
    } else if (isPieChart) {
        const yIndex = yIndices[0];
        const values = currentData.map(row => {
            const val = parseFloat(row[yIndex]);
            return isNaN(val) ? 0 : val;
        });

        datasets = [{
            data: values,
            backgroundColor: scheme.backgrounds.slice(0, values.length),
            borderColor: scheme.borders.slice(0, values.length),
            borderWidth: 2
        }];
    } else {
        datasets = yIndices.map((yIndex, i) => {
            const values = currentData.map(row => {
                const val = parseFloat(row[yIndex]);
                return isNaN(val) ? 0 : val;
            });

            return {
                label: currentHeaders[yIndex],
                data: values,
                backgroundColor: scheme.backgrounds[i % scheme.backgrounds.length],
                borderColor: scheme.borders[i % scheme.borders.length],
                borderWidth: 2,
                fill: isArea,
                tension: (selectedChartType === 'line' || isArea) ? 0.4 : 0
            };
        });
    }

    // 图表配置
    const config = {
        type: chartTypeToUse,
        data: {
            labels: isScatter ? undefined : labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: animationConfig,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: { size: 18, weight: 'bold' },
                    padding: 20,
                    color: currentTheme === 'dark' ? '#f9fafb' : '#111827'
                },
                legend: legendConfig,
                tooltip: {
                    mode: isScatter ? 'nearest' : 'index',
                    intersect: isScatter,
                    backgroundColor: currentTheme === 'dark' ? '#374151' : 'rgba(0, 0, 0, 0.8)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: isPieChart || selectedChartType === 'radar' ? {} : {
                x: {
                    display: true,
                    title: {
                        display: !isScatter,
                        text: currentHeaders[xIndex],
                        font: { weight: 'bold' },
                        color: currentTheme === 'dark' ? '#f9fafb' : '#111827'
                    },
                    grid: { color: currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
                    ticks: { color: currentTheme === 'dark' ? '#9ca3af' : '#6b7280' }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: isScatter ? currentHeaders[yIndices[0]] : '数值',
                        font: { weight: 'bold' },
                        color: currentTheme === 'dark' ? '#f9fafb' : '#111827'
                    },
                    grid: { color: currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
                    ticks: { color: currentTheme === 'dark' ? '#9ca3af' : '#6b7280' }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    };

    // 散点图特殊处理
    if (isScatter) {
        config.scales.x.title.text = currentHeaders[xIndex];
        config.scales.x.type = 'linear';
        config.scales.x.position = 'bottom';
    }

    // 创建图表
    chartInstance = new Chart(chartCanvas, config);

    // 显示图表区域
    enableNavItem('chart');
    switchSection('chart');

    showToast('图表生成成功', 'success');
    } catch (error) {
        console.error('图表生成错误:', error);
        showToast('图表生成失败: ' + error.message, 'error');
    }
}

// 下载图表 - 高质量导出
function exportHighResChart() {
    if (!chartInstance) {
        showToast('请先生成图表', 'warning');
        return;
    }

    const format = exportFormat ? exportFormat.value : 'png';
    
    // 根据格式选择导出方式
    if (format === 'pdf') {
        exportToPDF();
    } else if (format === 'svg') {
        exportToSVG();
    } else {
        exportToImage(format);
    }
}

// 导出为图片 (PNG/JPG)
function exportToImage(format) {
    try {
        const width = parseInt(exportWidth.value) || 1920;
        const height = parseInt(exportHeight.value) || 1080;
        const dpi = parseInt(exportDpi.value) || 150;
        const quality = exportQuality ? (parseInt(exportQuality.value) / 100) : 0.95;

        const scale = dpi / 72;
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width * scale;
        tempCanvas.height = height * scale;
        const ctx = tempCanvas.getContext('2d');
        
        ctx.fillStyle = currentTheme === 'dark' ? '#1f2937' : '#ffffff';
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        ctx.scale(scale, scale);
        ctx.drawImage(chartCanvas, 0, 0, chartCanvas.width, chartCanvas.height, 0, 0, width, height);
        
        const link = document.createElement('a');
        const extension = format === 'jpeg' ? 'jpg' : 'png';
        const printWidthCm = (width / dpi * 2.54).toFixed(1);
        const printHeightCm = (height / dpi * 2.54).toFixed(1);
        
        link.download = `chart_${width}x${height}_${dpi}dpi_${new Date().getTime()}.${extension}`;
        link.href = tempCanvas.toDataURL(format === 'jpeg' ? 'image/jpeg' : 'image/png', format === 'jpeg' ? quality : 1);
        link.click();
        
        showToast(`已导出 ${width}×${height}px @${dpi}DPI`, 'success');
    } catch (error) {
        console.error('导出错误:', error);
        showToast('导出失败: ' + error.message, 'error');
    }
}

// 导出为 PDF
function exportToPDF() {
    try {
        const width = parseInt(exportWidth.value) || 1920;
        const height = parseInt(exportHeight.value) || 1080;
        const dpi = parseInt(exportDpi.value) || 150;
        
        // 创建高分辨率 canvas
        const scale = dpi / 72;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width * scale;
        tempCanvas.height = height * scale;
        const ctx = tempCanvas.getContext('2d');
        
        ctx.fillStyle = currentTheme === 'dark' ? '#1f2937' : '#ffffff';
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(chartCanvas, 0, 0, chartCanvas.width, chartCanvas.height, 0, 0, width, height);
        
        // 使用 jsPDF 生成 PDF
        const { jsPDF } = window.jspdf;
        
        // 根据 DPI 计算页面尺寸（毫米）
        const pageWidth = width / dpi * 25.4;
        const pageHeight = height / dpi * 25.4;
        
        // 创建 PDF（自定义尺寸）
        const pdf = new jsPDF({
            orientation: pageWidth > pageHeight ? 'landscape' : 'portrait',
            unit: 'mm',
            format: [pageWidth, pageHeight]
        });
        
        // 添加图表图片
        const imgData = tempCanvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        
        // 下载 PDF
        pdf.save(`chart_${width}x${height}_${dpi}dpi_${new Date().getTime()}.pdf`);
        
        showToast(`已导出PDF (${width}×${height}px @${dpi}DPI)`, 'success');
    } catch (error) {
        console.error('PDF导出错误:', error);
        showToast('PDF导出失败: ' + error.message, 'error');
    }
}

// 导出为 SVG（矢量图）
function exportToSVG() {
    try {
        const width = parseInt(exportWidth.value) || 1920;
        const height = parseInt(exportHeight.value) || 1080;
        const bgColor = currentTheme === 'dark' ? '#1f2937' : '#ffffff';
        
        // 获取图表配置
        const chartConfig = chartInstance.config;
        
        // 生成 SVG 内容
        let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .chart-title { font: bold 18px Arial, sans-serif; fill: ${currentTheme === 'dark' ? '#f9fafb' : '#111827'}; }
      .chart-label { font: 12px Arial, sans-serif; fill: ${currentTheme === 'dark' ? '#9ca3af' : '#6b7280'}; }
      .chart-legend { font: 12px Arial, sans-serif; }
    </style>
  </defs>
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <g transform="translate(60, 60)">
    <text class="chart-title" x="${width/2 - 60}" y="0" text-anchor="middle">${chartConfig.options.plugins?.title?.text || '数据图表'}</text>
    <g transform="translate(0, 30)">
      <image href="${chartCanvas.toDataURL('image/png', 1.0)}" width="${width - 120}" height="${height - 150}"/>
    </g>
  </g>
</svg>`;
        
        // 创建 Blob 并下载
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `chart_${width}x${height}_${new Date().getTime()}.svg`;
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
        showToast(`已导出SVG矢量图 (${width}×${height}px)`, 'success');
    } catch (error) {
        console.error('SVG导出错误:', error);
        showToast('SVG导出失败: ' + error.message, 'error');
    }
}

// 处理预设变更
function handlePresetChange() {
    const preset = exportPreset.value;
    
    const presets = {
        '1080p': { width: 1920, height: 1080, dpi: 96 },
        '2k': { width: 2560, height: 1440, dpi: 96 },
        '4k': { width: 3840, height: 2160, dpi: 96 }
    };
    
    if (presets[preset]) {
        exportWidth.value = presets[preset].width;
        exportHeight.value = presets[preset].height;
        exportDpi.value = presets[preset].dpi;
    }
    
    updateExportInfo();
}

// 更新导出信息显示
function updateExportInfo() {
    const width = parseInt(exportWidth.value) || 1920;
    const height = parseInt(exportHeight.value) || 1080;
    const dpi = parseInt(exportDpi.value) || 150;
    
    // 计算打印尺寸（厘米）
    const printWidthCm = (width / dpi * 2.54).toFixed(1);
    const printHeightCm = (height / dpi * 2.54).toFixed(1);
    
    // 计算文件大小估算
    const pixels = width * height;
    const estimatedMB = (pixels * 4 / 1024 / 1024).toFixed(1); // RGBA 4字节
    
    exportInfoText.textContent = `输出: ${width} × ${height} px | DPI: ${dpi} | 打印: ${printWidthCm} × ${printHeightCm} cm`;
}

// 导出数据
function exportData() {
    if (!currentData || currentData.length === 0) {
        showToast('没有数据可导出', 'warning');
        return;
    }

    // 创建工作簿
    const wb = XLSX.utils.book_new();
    const wsData = [currentHeaders, ...currentData];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, '数据');

    // 下载
    XLSX.writeFile(wb, `data_export_${new Date().getTime()}.xlsx`);
    showToast('数据已导出为 Excel 文件', 'success');
}

// 清除数据
function clearData() {
    originalData = null;
    currentData = null;
    currentHeaders = [];
    columnTypes = {};

    fileInput.value = '';

    // 禁用导航项
    disableNavItem('stats');
    disableNavItem('data');
    disableNavItem('aggregate');
    disableNavItem('config');
    disableNavItem('chart');

    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }

    const thead = dataTable.querySelector('thead');
    const tbody = dataTable.querySelector('tbody');
    thead.innerHTML = '';
    tbody.innerHTML = '';

    searchInput.value = '';
    sortColumn.innerHTML = '<option value="">选择列</option>';
    xAxis.innerHTML = '';
    seriesCheckboxes.innerHTML = '';
    chartTitleInput.value = '';
    
    // 切换到上传模块
    switchSection('upload');

    showToast('数据已清除', 'success');
}

// 显示/隐藏加载
function showLoading(show) {
    loadingOverlay.classList.toggle('hidden', !show);
}

// 显示消息提示
function showToast(message, type = 'success') {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 切换主题
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = `<i class="fas fa-${currentTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
    localStorage.setItem('theme', currentTheme);

    // 更新图表颜色
    if (chartInstance) {
        generateChart();
    }
}

// 加载主题
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = `<i class="fas fa-${currentTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);
