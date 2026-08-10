// Smart Scheduler App Logic

document.addEventListener('DOMContentLoaded', () => {
  // Constants & State
  const DATE_KEYS = ['8/10', '8/11', '8/12', '8/13', '8/14', '8/15', '8/16'];
  let tasks = [];
  let currentTheme = 'light';

  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const tableBody = document.getElementById('tableBody');
  const totalTasksCount = document.getElementById('totalTasksCount');
  const completedTasksCount = document.getElementById('completedTasksCount');
  const pendingTasksCount = document.getElementById('pendingTasksCount');
  const completionRateText = document.getElementById('completionRateText');
  const completionProgressBar = document.getElementById('completionProgressBar');
  
  // Filters
  const searchKeyword = document.getElementById('searchKeyword');
  const filterPart = document.getElementById('filterPart');
  const filterCategory = document.getElementById('filterCategory');
  const filterManager = document.getElementById('filterManager');
  const filterStatus = document.getElementById('filterStatus');

  // Modals & Forms
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');
  const modalTitle = document.getElementById('modalTitle');
  const editTaskId = document.getElementById('editTaskId');
  const taskPart = document.getElementById('taskPart');
  const taskCategory = document.getElementById('taskCategory');
  const taskName = document.getElementById('taskName');
  const taskManager = document.getElementById('taskManager');
  const taskContractor = document.getElementById('taskContractor');
  const taskPeriod = document.getElementById('taskPeriod');
  const btnDeleteTask = document.getElementById('btnDeleteTask');

  // Buttons
  const btnAddTask = document.getElementById('btnAddTask');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const modalClose = document.getElementById('modalClose');
  const btnReset = document.getElementById('btnReset');
  const btnSave = document.getElementById('btnSave');
  const btnExport = document.getElementById('btnExport');
  const btnImport = document.getElementById('btnImport');
  const importFile = document.getElementById('importFile');

  // --- Initial Setup ---
  initTheme();
  loadData();
  renderApp();
  fetchWeather();

  // --- Theme Management ---
  function initTheme() {
    const savedTheme = localStorage.getItem('scheduler_theme_v2') || 'light';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('scheduler_theme_v2', theme);
    
    // Update Theme Toggle Icon
    if (theme === 'light') {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  themeToggle.addEventListener('click', () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // --- Data Loading & Persistence ---
  function loadData() {
    const saved = localStorage.getItem('smart_scheduler_tasks');
    if (saved) {
      try {
        tasks = JSON.parse(saved);
        // Name migration for existing users
        let migrated = false;
        tasks.forEach(t => {
          if (t.manager === '임주환') {
            t.manager = '양우빈';
            migrated = true;
          }
          if (t.manager === '박명록') {
            t.manager = '박병옥';
            migrated = true;
          }
          if (t.manager === '고강식') {
            t.manager = '고강석';
            migrated = true;
          }
          
          // Contractor migrations
          if (t.contractor === '디에이치피코리아' || t.contractor === '이에이치피이엔지') {
            t.contractor = '디에이치피이엔지';
            migrated = true;
          }
          if (t.contractor === '동은이앤지' || t.contractor === '동문이앤지') {
            t.contractor = '동문이엔지';
            migrated = true;
          }
          if (t.contractor === '호민합섬') {
            t.contractor = '호반함석';
            migrated = true;
          }
          if (t.contractor === '동포기계기술') {
            t.contractor = '용호기계기술';
            migrated = true;
          }
          if (t.contractor === '정마산업(속 동은이앤지)' || t.contractor === '청마산업(&동문이앤지)') {
            t.contractor = '청마산업(&동문이엔지)';
            migrated = true;
            if (t.schedules['8/14'] && t.schedules['8/14'].text.includes('정마산업 입회')) {
              t.schedules['8/14'].text = t.schedules['8/14'].text.replace('정마산업 입회', '청마산업 입회');
            }
          }
          if (t.contractor === '광우기업(성주 도급업체)') {
            t.contractor = '강우기업(상주 도급업체)';
            migrated = true;
          }
          if (t.contractor === '가이아엔지니어링') {
            t.contractor = '가야엔지니어링';
            migrated = true;
          }
          if (t.contractor === '업체 선정중') {
            t.contractor = '경방이엔씨';
            migrated = true;
          }
          if (t.contractor === '오제이컨트롤') {
            t.contractor = '경방이엔씨';
            migrated = true;
          }
          
          // Task Name migrations
          if (t.taskName === '작업자 휴게실 천막 및 CDC실 사이 도로 차양막 설치') {
            t.taskName = '작업자 휴게실 천막 및 차양막 설치';
            migrated = true;
            if (t.schedules['8/10'] && t.schedules['8/10'].text === '작업자 휴게실 천막 및 CDC실 사이 도로 차양막 설치(중장비)') {
              t.schedules['8/10'].text = '작업자 휴게실 천막 및 차양막 설치(중장비)';
            }
          }
          if (t.taskName === '6-510 -> 2S-510 이설 관련 계장품, EHT 이설 공사' || t.taskName === '6-510 -> 2S-510 이설 관련 계장품, EHT 이설공사') {
            t.taskName = 'S-510 → 2S-510 이설관련 계장품, EHT 이설공사';
            migrated = true;
          }
          if (t.taskName === 'S1 TW 배관배관 절단을 위한 공사 및 복구') {
            t.taskName = 'S1 TW 매립배관 절단을 위한 굴착 및 복구';
            migrated = true;
          }
          if (t.taskName === 'S12 PCM Flushing공사(1,2S-510) 이설') {
            t.taskName = 'S1,2 PCM Flushing조(1,2S-510) 이설';
            migrated = true;
          }
          if (t.taskName === 'S2 신세정 교반조의 Glass Lined Shaft 교체(투자)') {
            t.taskName = 'S2 산세정 교반조의 Glass Lined Shaft 교체(투자)';
            migrated = true;
          }
          if (t.taskName === 'S2 CD Plate 열교환기 세정 공사') {
            t.taskName = 'S2 CO Plate 열교환기 세정 공사';
            migrated = true;
          }
          if (t.taskName.startsWith('자체작업_')) {
            t.taskName = t.taskName.replace('자체작업_', '') + '(자체작업)';
            migrated = true;
          }
          
          // Specific task 2 migration
          if (t.id === 2) {
            let textUpdated = false;
            DATE_KEYS.forEach(d => {
              if (t.schedules[d] && t.schedules[d].text.includes('보전태클러')) {
                t.schedules[d].text = t.schedules[d].text.replace('보전태클러', '보전미처리');
                textUpdated = true;
              }
            });
            if (t.period === '8/11(화)~8/14(금)') {
              t.period = '8/11(화)~8/15(토)';
              // Update (X/4) to (X/5)
              for (let i = 1; i <= 4; i++) {
                const dateKey = `8/${10 + i}`;
                if (t.schedules[dateKey]) {
                  t.schedules[dateKey].text = t.schedules[dateKey].text.replace('(1/4)', '(1/5)').replace('(2/4)', '(2/5)').replace('(3/4)', '(3/5)').replace('(4/4)', '(4/5)');
                }
              }
              t.schedules['8/15'] = { text: '보전미처리 및 정지시 작업 가능 배관 보수 진행 (5/5)', completed: false };
              textUpdated = true;
            }
            if (textUpdated) {
              migrated = true;
            }
          }
          
          // Migrate task 16 schedule text
          if (t.id === 16 && t.schedules['8/11'] && (t.schedules['8/11'].text.includes('I/L8 전자밸브 20ea 교체') || t.schedules['8/11'].text.includes('I/L8 전자밸브 20ea'))) {
            t.schedules['8/11'].text = 'S2 CO I/L용 전자변 20EA 교체';
            migrated = true;
          }
          
          // Migrate task 15 schedule text (3 days -> 2 days)
          if (t.id === 15 && t.schedules['8/12'] && t.schedules['8/12'].text.includes('EHT 취부 (1/3)')) {
            t.schedules['8/12'].text = '';
            t.schedules['8/13'].text = '2S-510 계장품/EHT 취부 (1/2)';
            t.schedules['8/14'].text = '2S-510 계장품/EHT 취부 (2/2)';
            migrated = true;
          }
          // Migrate task 10 (휀교체 -> 변판교체)
          if (t.id === 10 && t.taskName.includes('휀교체')) {
            t.taskName = '자체작업_2C-231, 241 변판교체';
            if (t.schedules['8/13'] && t.schedules['8/13'].text === '휀교체') t.schedules['8/13'].text = '변판교체';
            if (t.schedules['8/14'] && t.schedules['8/14'].text === '휀교체') t.schedules['8/14'].text = '변판교체';
            migrated = true;
          }
          // Migrate task 9 (remove newline)
          if (t.id === 9 && t.schedules['8/13'] && t.schedules['8/13'].text.includes('Shaft 교체,\n상판 취부')) {
            t.schedules['8/13'].text = t.schedules['8/13'].text.replace('Shaft 교체,\n상판 취부', 'Shaft 교체, 상판 취부');
            migrated = true;
          }
          
          // Migrate task 6 schedule text
          if (t.id === 6 && t.schedules['8/14'] && t.schedules['8/14'].text.includes('기압 Test - KGS 입회(오후)')) {
            t.schedules['8/14'].text = t.schedules['8/14'].text.replace('기압 Test - KGS 입회(오후)', '가압Test - KGS입회(오후)');
            migrated = true;
          }
          // Migrate task 5 schedule text (remove 8/11 and change period)
          if (t.id === 5 && t.period === '8/11(화)~8/16(일)') {
            t.period = '8/12(수)~8/16(일)';
            t.schedules['8/11'].text = '';
            migrated = true;
          }
          // Migrate (협조) -> (입조)
          DATE_KEYS.forEach(d => {
            if (t.schedules[d] && t.schedules[d].text.includes('협조')) {
              t.schedules[d].text = t.schedules[d].text.replace(/협조/g, '입조');
              migrated = true;
            }
          });
        });
        if (migrated) {
          saveData();
        }
      } catch (e) {
        tasks = [...window.INITIAL_DATA];
      }
    } else {
      tasks = [...window.INITIAL_DATA];
    }
  }

  function saveData() {
    localStorage.setItem('smart_scheduler_tasks', JSON.stringify(tasks));
  }

  function resetData() {
    const pw = prompt('데이터를 초기화하려면 비밀번호를 입력해주세요:');
    if (pw === '2800') {
      tasks = JSON.parse(JSON.stringify(window.INITIAL_DATA));
      saveData();
      populateManagerFilter();
      renderApp();
      showToast('성공적으로 데이터를 초기화했습니다.', 'success');
    } else if (pw !== null) {
      showToast('비밀번호가 올바르지 않습니다.', 'danger');
    }
  }

  function renderApp() {
    populateManagerFilter();
    renderStats();
    renderTable();
  }

  // --- Weather Widget ---
  async function fetchWeather() {
    const weatherEl = document.getElementById('weatherWidget');
    if (!weatherEl) return;
    
    weatherEl.innerHTML = `
      <div class="weather-badge">
        <span class="weather-loc">📍 전주시</span>
        <span class="weather-desc">날씨 로드 중...</span>
      </div>
    `;

    try {
      const response = await fetch('https://wttr.in/Jeonju?format=j1');
      if (response.ok) {
        const data = await response.json();
        const current = data.current_condition[0];
        const temp = current.temp_C;
        const desc = (current.lang_ko && current.lang_ko[0]) 
          ? current.lang_ko[0].value 
          : current.weatherDesc[0].value;
        const weatherCode = current.weatherCode;
        const emoji = getWeatherEmoji(weatherCode);
        
        weatherEl.innerHTML = `
          <div class="weather-badge" title="전주시 날씨 상세: 습도 ${current.humidity}%, 풍속 ${current.windspeedKmph}km/h">
            <span class="weather-loc">📍 전주시</span>
            <span class="weather-emoji">${emoji}</span>
            <span class="weather-temp">${temp}°C</span>
            <span class="weather-desc">${desc}</span>
          </div>
        `;
      } else {
        fetchSimplerWeather(weatherEl);
      }
    } catch (e) {
      fetchSimplerWeather(weatherEl);
    }
  }

  async function fetchSimplerWeather(weatherEl) {
    try {
      const response = await fetch('https://wttr.in/Jeonju?format=%c+%t&lang=ko');
      if (response.ok) {
        const text = await response.text();
        weatherEl.innerHTML = `
          <div class="weather-badge">
            <span class="weather-loc">📍 전주시</span>
            <span>${text.trim()}</span>
          </div>
        `;
      } else {
        weatherEl.innerHTML = '';
      }
    } catch (e) {
      weatherEl.innerHTML = '';
    }
  }

  function getWeatherEmoji(code) {
    const codes = {
      '113': '☀️',
      '116': '⛅',
      '119': '☁️',
      '122': '☁️',
      '143': '🌫️',
      '176': '🌦️',
      '200': '⛈️',
      '263': '🌧️',
      '266': '🌧️',
      '296': '🌧️',
      '302': '🌧️',
      '308': '🌧️',
      '353': '🌦️',
      '356': '🌧️',
      '389': '⛈️',
    };
    return codes[code] || '🌡️';
  }

  function populateManagerFilter() {
    const managers = [...new Set(tasks.map(t => t.manager.trim()))].filter(Boolean).sort();
    const currentVal = filterManager.value;
    
    // Reset and build options
    filterManager.innerHTML = '<option value="all">전체 담당자</option>';
    managers.forEach(mgr => {
      const option = document.createElement('option');
      option.value = mgr;
      option.textContent = mgr;
      filterManager.appendChild(option);
    });
    
    // Restore selection if still valid
    if (managers.includes(currentVal)) {
      filterManager.value = currentVal;
    }
  }

  function renderStats() {
    let totalScheduledCount = 0;
    let completedScheduledCount = 0;

    tasks.forEach(task => {
      DATE_KEYS.forEach(date => {
        const sched = task.schedules[date];
        if (sched && sched.text && sched.text.trim()) {
          totalScheduledCount++;
          if (sched.completed || task.completed) {
            completedScheduledCount++;
          }
        }
      });
    });

    const completionPercent = totalScheduledCount > 0 
      ? Math.round((completedScheduledCount / totalScheduledCount) * 100) 
      : 100;

    // Update UI elements
    totalTasksCount.textContent = tasks.length;
    completedTasksCount.textContent = `${completedScheduledCount} / ${totalScheduledCount}`;
    pendingTasksCount.textContent = totalScheduledCount - completedScheduledCount;
    completionRateText.textContent = `${completionPercent}%`;
    completionProgressBar.style.width = `${completionPercent}%`;
  }

  function renderTable() {
    tableBody.innerHTML = '';
    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="14">
            <div class="table-empty-state">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div>조건에 일치하는 작업 일정이 없습니다.</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    const today = new Date();
    const todayStr = `${today.getMonth() + 1}/${today.getDate()}`; // "8/10"

    filteredTasks.forEach((task, index) => {
      const tr = document.createElement('tr');
      if (task.completed) {
        tr.classList.add('row-completed');
      }

      // Check if task name needs custom highlighting (e.g. underline/red)
      const taskNameClass = task.highlight ? 'task-name-cell highlighted-task' : 'task-name-cell';

      // 1. NO & Edit Trigger
      let rowHtml = `
        <td class="no-col" title="클릭 시 전체 행 완료 토글" data-id="${task.id}">${task.id}</td>
        <td class="part-col"><span class="part-badge">${escapeHtml(task.part)}</span></td>
        <td class="cat-col"><span class="cat-badge">${escapeHtml(task.category)}</span></td>
        <td class="${taskNameClass}" data-edit-task="${task.id}" title="더블 클릭하여 편집">${escapeHtml(task.taskName)}</td>
        <td class="manager-col">${escapeHtml(task.manager)}</td>
        <td class="contractor-col" data-edit-task="${task.id}" title="더블 클릭하여 편집">${escapeHtml(task.contractor)}</td>
        <td class="period-col">${escapeHtml(task.period)}</td>
      `;

      // 2. Add the 7 Schedule columns
      DATE_KEYS.forEach(date => {
        const sched = task.schedules[date] || { text: '', completed: false };
        const hasText = sched.text && sched.text.trim();
        const isCellCompleted = sched.completed || task.completed;
        
        let cellClass = 'date-cell';
        if (!hasText) {
          cellClass += ' cell-empty';
        } else if (isCellCompleted) {
          cellClass += ' cell-completed';
        } else if (date === todayStr) {
          cellClass += ' today-active-pulse';
        }

        const formattedText = formatScheduleText(sched.text);
        
        rowHtml += `
          <td class="${cellClass}" data-task-id="${task.id}" data-date="${date}">
            <div class="date-cell-inner">${formattedText}</div>
          </td>
        `;
      });

      tr.innerHTML = rowHtml;
      tableBody.appendChild(tr);
    });

    attachTableEvents();
    highlightTodayHeader(todayStr);
  }

  function highlightTodayHeader(todayStr) {
    const headers = document.querySelectorAll('#scheduleTable th.date-col');
    headers.forEach(th => {
      th.classList.remove('today-header-highlight');
      if (th.textContent.startsWith(todayStr)) {
        th.classList.add('today-header-highlight');
      }
    });
  }

  // --- Filtering Logic ---
  function getFilteredTasks() {
    const keyword = searchKeyword.value.toLowerCase().trim();
    const part = filterPart.value;
    const cat = filterCategory.value;
    const manager = filterManager.value;
    const status = filterStatus.value;

    return tasks.filter(task => {
      // 1. Keyword search (TaskName, Manager, Contractor, schedules)
      if (keyword) {
        const matchesName = task.taskName.toLowerCase().includes(keyword);
        const matchesManager = task.manager.toLowerCase().includes(keyword);
        const matchesContractor = task.contractor.toLowerCase().includes(keyword);
        
        let matchesSchedules = false;
        for (const date of DATE_KEYS) {
          if (task.schedules[date] && task.schedules[date].text.toLowerCase().includes(keyword)) {
            matchesSchedules = true;
            break;
          }
        }

        if (!matchesName && !matchesManager && !matchesContractor && !matchesSchedules) {
          return false;
        }
      }

      // 2. Part Filter
      if (part !== 'all' && task.part !== part) return false;

      // 3. Category Filter
      if (cat !== 'all' && task.category !== cat) return false;

      // 4. Manager Filter
      if (manager !== 'all' && task.manager !== manager) return false;

      // 5. Completion Status Filter
      if (status !== 'all') {
        const hasScheduledItems = Object.values(task.schedules).some(s => s.text && s.text.trim());
        if (!hasScheduledItems) {
          // If no active schedules, task completed depends on main row status
          const isFinished = task.completed;
          if (status === 'completed' && !isFinished) return false;
          if (status === 'active' && isFinished) return false;
        } else {
          // Check scheduled item completeness
          const allCompleted = Object.values(task.schedules).every(s => !s.text || s.completed || task.completed);
          if (status === 'completed' && !allCompleted) return false;
          if (status === 'active' && allCompleted) return false;
        }
      }

      return true;
    });
  }

  // --- Event Handling for Table Interactivity ---
  function attachTableEvents() {
    // A. Toggle entire row on NO. column click
    document.querySelectorAll('.no-col').forEach(cell => {
      cell.addEventListener('click', (e) => {
        const taskId = parseInt(e.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
          // Synchronize individual schedules to match row state if completed
          if (task.completed) {
            DATE_KEYS.forEach(date => {
              if (task.schedules[date]) task.schedules[date].completed = true;
            });
          } else {
            // Unmarking entire row marks all cells as uncompleted
            DATE_KEYS.forEach(date => {
              if (task.schedules[date]) task.schedules[date].completed = false;
            });
          }
          saveData();
          renderStats();
          renderTable();
          showToast(`작업 #${taskId}의 완료 상태가 변경되었습니다.`, 'info');
        }
      });
    });

    // B. Toggle single cell schedule completion on click
    document.querySelectorAll('.date-cell:not(.cell-empty)').forEach(cell => {
      cell.addEventListener('click', (e) => {
        // Find nearest cell element (in case child was clicked)
        const cellEl = e.target.closest('.date-cell');
        const taskId = parseInt(cellEl.dataset.taskId);
        const date = cellEl.dataset.date;

        const task = tasks.find(t => t.id === taskId);
        if (task && task.schedules[date]) {
          const sched = task.schedules[date];
          sched.completed = !sched.completed;

          // If all individual scheduled items are completed, mark row completed.
          // If any is uncompleted, make sure row is active.
          const scheduleList = Object.values(task.schedules).filter(s => s.text && s.text.trim());
          const allDone = scheduleList.every(s => s.completed);
          
          if (allDone) {
            task.completed = true;
          } else {
            task.completed = false;
          }

          saveData();
          renderStats();
          renderTable();
        }
      });
    });

    // C. Double-click to open edit modal
    document.querySelectorAll('[data-edit-task]').forEach(cell => {
      cell.addEventListener('dblclick', (e) => {
        const taskId = parseInt(e.target.dataset.editTask);
        openEditTaskModal(taskId);
      });
    });
  }

  // --- Modal Logic ---
  function openAddTaskModal() {
    modalTitle.textContent = '새 작업 추가';
    editTaskId.value = '';
    taskForm.reset();
    btnDeleteTask.style.display = 'none';
    btnSubmitModal.textContent = '추가하기';
    taskModal.classList.add('active');
  }

  function openEditTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    modalTitle.textContent = `작업 #${task.id} 편집`;
    editTaskId.value = task.id;
    taskPart.value = task.part;
    taskCategory.value = task.category;
    taskName.value = task.taskName;
    taskManager.value = task.manager;
    taskContractor.value = task.contractor;
    taskPeriod.value = task.period;

    // Fill daily schedules
    DATE_KEYS.forEach(date => {
      const sanitizedDate = date.replace('/', '_');
      const input = document.getElementById(`day_${sanitizedDate}`);
      if (input) {
        input.value = task.schedules[date] ? task.schedules[date].text : '';
      }
    });

    btnDeleteTask.style.display = 'block';
    btnSubmitModal.textContent = '저장하기';
    taskModal.classList.add('active');
  }

  function closeModal() {
    taskModal.classList.remove('active');
  }

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = editTaskId.value;
    
    const partVal = taskPart.value;
    const categoryVal = taskCategory.value;
    const nameVal = taskName.value.trim();
    const managerVal = taskManager.value.trim();
    const contractorVal = taskContractor.value.trim();
    const periodVal = taskPeriod.value.trim();

    // Collect daily schedules
    const schedulesVal = {};
    DATE_KEYS.forEach(date => {
      const sanitizedDate = date.replace('/', '_');
      const inputVal = document.getElementById(`day_${sanitizedDate}`).value.trim();
      
      // If we are editing, preserve previous completion state if text didn't change,
      // or set completed to false for new entries.
      let isCompleted = false;
      if (idVal) {
        const existingTask = tasks.find(t => t.id === parseInt(idVal));
        if (existingTask && existingTask.schedules[date]) {
          isCompleted = existingTask.schedules[date].completed;
        }
      }
      
      schedulesVal[date] = {
        text: inputVal,
        completed: inputVal ? isCompleted : false
      };
    });

    if (idVal) {
      // Edit mode
      const taskIndex = tasks.findIndex(t => t.id === parseInt(idVal));
      if (taskIndex !== -1) {
        const existingTask = tasks[taskIndex];
        
        // Update values
        existingTask.part = partVal;
        existingTask.category = categoryVal;
        existingTask.taskName = nameVal;
        existingTask.manager = managerVal;
        existingTask.contractor = contractorVal;
        existingTask.period = periodVal;
        existingTask.schedules = schedulesVal;

        // If the task name matches highlight keywords, flag it
        existingTask.highlight = nameVal.includes('Leak') || nameVal.includes('PCM') || nameVal.includes('Glass Lined') || nameVal.includes('펌프');

        // Check overall completion state
        const scheduleList = Object.values(existingTask.schedules).filter(s => s.text && s.text.trim());
        if (scheduleList.length > 0) {
          existingTask.completed = scheduleList.every(s => s.completed);
        }

        showToast(`작업 #${idVal}이 수정되었습니다.`, 'success');
      }
    } else {
      // Add mode
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      const isHighlighted = nameVal.includes('Leak') || nameVal.includes('PCM') || nameVal.includes('Glass Lined') || nameVal.includes('펌프');
      
      const newTask = {
        id: newId,
        part: partVal,
        category: categoryVal,
        taskName: nameVal,
        manager: managerVal,
        contractor: contractorVal,
        period: periodVal,
        schedules: schedulesVal,
        completed: false,
        highlight: isHighlighted
      };

      tasks.push(newTask);
      showToast('새 작업이 성공적으로 추가되었습니다.', 'success');
    }

    saveData();
    closeModal();
    renderApp();
  });

  btnDeleteTask.addEventListener('click', () => {
    const idVal = parseInt(editTaskId.value);
    if (!idVal) return;

    if (confirm(`정말로 작업 #${idVal}을 삭제하시겠습니까?`)) {
      tasks = tasks.filter(t => t.id !== idVal);
      saveData();
      closeModal();
      renderApp();
      showToast(`작업 #${idVal}이 삭제되었습니다.`, 'info');
    }
  });

  // Modal Triggers
  btnAddTask.addEventListener('click', openAddTaskModal);
  btnCancelModal.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);

  // Close modal when clicking outside
  taskModal.addEventListener('click', (e) => {
    if (e.target === taskModal) {
      closeModal();
    }
  });

  // --- Reset/Backup/Restore Events ---
  btnReset.addEventListener('click', resetData);
  btnSave.addEventListener('click', () => {
    saveData();
    renderStats();
    showToast('현재 변경 사항이 성공적으로 저장되었습니다.', 'success');
  });

  btnExport.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `schedule_backup_${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
    showToast('일정 백업 파일이 다운로드되었습니다.', 'success');
  });

  btnImport.addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const importedData = JSON.parse(evt.target.result);
        if (Array.isArray(importedData)) {
          tasks = importedData;
          saveData();
          renderApp();
          showToast('데이터가 성공적으로 복원되었습니다.', 'success');
        } else {
          showToast('유효하지 않은 백업 형식입니다.', 'danger');
        }
      } catch (err) {
        showToast('파일을 읽는 중 오류가 발생했습니다.', 'danger');
      }
    };
    reader.readAsText(file);
  });

  // --- Filters Events ---
  [searchKeyword, filterPart, filterCategory, filterManager, filterStatus].forEach(filterEl => {
    filterEl.addEventListener('input', () => {
      renderTable();
    });
  });

  // --- Toast Manager ---
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') {
      icon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    } else if (type === 'danger') {
      icon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      `;
    } else {
      icon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }

    toast.innerHTML = `${icon} <span>${escapeHtml(message)}</span>`;
    document.getElementById('toastContainer').appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Helper Functions ---
  function escapeHtml(str) {
    if (!str) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatScheduleText(text) {
    if (!text) return '';
    let html = escapeHtml(text);
    
    // Highlight (중장비) / (중장비, 입조) / (중장비, 협조)
    html = html.replace(/(\(중장비(?:,\s*(?:입조|협조))?\))/g, '<span class="tag-urgent">$1</span>');
    
    // Highlight (협조) / (입조)
    html = html.replace(/(\((협조|입조)\))/g, '<span style="color: var(--color-warning); font-weight: 600;">$1</span>');
    
    // Highlight KGS입회(오후) (Red)
    html = html.replace(/(KGS\s*입회\s*\(오후\))/g, '<span class="tag-urgent">$1</span>');

    // Highlight KGS 입회 / 정마산업 입회 (Blue)
    html = html.replace(/(\([^)]*입회[^)]*\))/g, '<span style="color: var(--color-primary); font-weight: 600;">$1</span>');
    
    // Highlight (폭염 및 필요성으로...)
    html = html.replace(/(\(폭염[^)]*\))/g, '<span class="tag-info">$1</span>');
    
    return html;
  }
});
