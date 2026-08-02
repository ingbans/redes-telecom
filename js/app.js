/* ==========================================================================
   MAIN APPLICATION LOGIC (app.js)
   Single Page Application router, state management, local storage & search
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAppTheme();
    renderSidebarModules();
    initAppRouting();
    initGlobalSearch();
    initCLICheatsheet();
    initSubnetCalculator();
    initQuizEngine();
    updateProgressTracker();
});

// App State
let currentTopicId = "m1-osi-tcpip";
let completedTopics = JSON.parse(localStorage.getItem('ccna_completed_topics') || '[]');

/* ==========================================================================
   THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initAppTheme() {
    const savedTheme = localStorage.getItem('ccna_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ccna_theme', newTheme);
            updateThemeToggleUI(newTheme);
        });
    }
}

function updateThemeToggleUI(theme) {
    const themeText = document.querySelector('.theme-text');
    if (themeText) {
        themeText.textContent = theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
    }
}

/* ==========================================================================
   SIDEBAR MODULES TREE RENDERING
   ========================================================================== */
function renderSidebarModules() {
    const container = document.getElementById('modules-tree');
    if (!container) return;

    // Group topics by module
    const modulesMap = {};
    courseTopicsData.forEach(t => {
        if (!modulesMap[t.moduleId]) {
            modulesMap[t.moduleId] = {
                id: t.moduleId,
                name: t.moduleName,
                topics: []
            };
        }
        modulesMap[t.moduleId].topics.push(t);
    });

    container.innerHTML = '';

    Object.values(modulesMap).forEach((mod, index) => {
        const groupEl = document.createElement('div');
        groupEl.className = `module-group ${index === 0 ? 'open' : ''}`;
        
        const headerEl = document.createElement('div');
        headerEl.className = 'module-header';
        headerEl.innerHTML = `
            <div class="mod-title-box">
                <i class="fa-solid fa-folder"></i>
                <span>${mod.name}</span>
            </div>
            <i class="fa-solid fa-chevron-right chevron-icon"></i>
        `;

        headerEl.addEventListener('click', () => {
            groupEl.classList.toggle('open');
        });

        const topicsListEl = document.createElement('ul');
        topicsListEl.className = 'module-topics-list';

        mod.topics.forEach(t => {
            const isDone = completedTopics.includes(t.id);
            const itemEl = document.createElement('li');
            itemEl.innerHTML = `
                <a href="#topic/${t.id}" class="topic-nav-link ${t.id === currentTopicId ? 'active' : ''} ${isDone ? 'completed' : ''}" data-topic-id="${t.id}">
                    <span>${t.title}</span>
                    <i class="fa-solid fa-circle-check topic-check-icon"></i>
                </a>
            `;
            topicsListEl.appendChild(itemEl);
        });

        groupEl.appendChild(headerEl);
        groupEl.appendChild(topicsListEl);
        container.appendChild(groupEl);
    });

    // Mobile sidebar handlers
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');

    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', () => sidebar.classList.add('open'));
    }
    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('open'));
    }
}

/* ==========================================================================
   SPA ROUTING
   ========================================================================== */
function initAppRouting() {
    window.addEventListener('hashchange', handleHashChange);
    // Initial load
    if (!window.location.hash) {
        window.location.hash = `#topic/${currentTopicId}`;
    } else {
        handleHashChange();
    }

    // Complete topic button handler
    const markBtn = document.getElementById('mark-complete-btn');
    if (markBtn) {
        markBtn.addEventListener('click', toggleCurrentTopicCompleted);
    }

    // Topic quiz button handler
    const topicQuizBtn = document.getElementById('topic-quiz-btn');
    if (topicQuizBtn) {
        topicQuizBtn.addEventListener('click', () => {
            const topic = courseTopicsData.find(t => t.id === currentTopicId);
            window.location.hash = '#tool-quiz';
            if (topic) {
                setTimeout(() => startQuizSession(topic.moduleId), 100);
            }
        });
    }

    // Prev / Next Topic Navigation
    document.getElementById('prev-topic-btn').addEventListener('click', () => navigateTopicOffset(-1));
    document.getElementById('next-topic-btn').addEventListener('click', () => navigateTopicOffset(1));
}

function windowAppNav(toolName) {
    window.location.hash = `#tool-${toolName}`;
}

function handleHashChange() {
    const hash = window.location.hash || '#topic/m1-osi-tcpip';
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    // Highlight sidebar nav item
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    if (hash.startsWith('#topic/')) {
        const topicId = hash.replace('#topic/', '');
        renderTopicView(topicId);
        document.getElementById('view-topic').classList.add('active');
    } else if (hash.startsWith('#tool-')) {
        const toolName = hash.replace('#tool-', '');
        const targetView = document.getElementById(`view-tool-${toolName}`);
        if (targetView) {
            targetView.classList.add('active');
            const navLink = document.querySelector(`.nav-item[data-tool="${toolName}"]`);
            if (navLink) navLink.classList.add('active');

            // Update breadcrumb
            const bcCurrent = document.getElementById('bc-current');
            if (bcCurrent) bcCurrent.textContent = getToolTitle(toolName);
        }
    }
}

function getToolTitle(toolName) {
    switch (toolName) {
        case 'subnet': return 'Calculadora Subnetting';
        case 'cli': return 'Cheatsheet Cisco CLI';
        case 'quiz': return 'Simulador de Quizzes';
        default: return 'Recurso';
    }
}

function renderTopicView(topicId) {
    const topic = courseTopicsData.find(t => t.id === topicId) || courseTopicsData[0];
    currentTopicId = topic.id;

    // Header info
    document.getElementById('topic-module-badge').textContent = topic.moduleName;
    document.getElementById('topic-time-badge').innerHTML = `<i class="fa-regular fa-clock"></i> ${topic.duration}`;
    document.getElementById('topic-title').textContent = topic.title;
    document.getElementById('topic-description').textContent = topic.description;

    // Body content
    document.getElementById('topic-body-content').innerHTML = topic.content;

    // Update Mark Complete button
    updateMarkCompleteBtnState();

    // Breadcrumb
    document.getElementById('bc-current').textContent = topic.title;

    // Update active state in sidebar
    document.querySelectorAll('.topic-nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-topic-id') === topic.id);
    });

    // Prev / Next button labels
    const currentIndex = courseTopicsData.findIndex(t => t.id === topic.id);
    const prevTopic = courseTopicsData[currentIndex - 1];
    const nextTopic = courseTopicsData[currentIndex + 1];

    const prevBtn = document.getElementById('prev-topic-btn');
    const nextBtn = document.getElementById('next-topic-btn');

    if (prevTopic) {
        prevBtn.style.visibility = 'visible';
        document.getElementById('prev-topic-title').textContent = prevTopic.title;
    } else {
        prevBtn.style.visibility = 'hidden';
    }

    if (nextTopic) {
        nextBtn.style.visibility = 'visible';
        document.getElementById('next-topic-title').textContent = nextTopic.title;
    } else {
        nextBtn.style.visibility = 'hidden';
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateTopicOffset(offset) {
    const currentIndex = courseTopicsData.findIndex(t => t.id === currentTopicId);
    const targetTopic = courseTopicsData[currentIndex + offset];
    if (targetTopic) {
        window.location.hash = `#topic/${targetTopic.id}`;
    }
}

function toggleCurrentTopicCompleted() {
    const index = completedTopics.indexOf(currentTopicId);
    if (index === -1) {
        completedTopics.push(currentTopicId);
    } else {
        completedTopics.splice(index, 1);
    }
    localStorage.setItem('ccna_completed_topics', JSON.stringify(completedTopics));

    updateMarkCompleteBtnState();
    updateProgressTracker();
    renderSidebarModules();
}

function updateMarkCompleteBtnState() {
    const isDone = completedTopics.includes(currentTopicId);
    const btn = document.getElementById('mark-complete-btn');
    const btnText = document.getElementById('mark-complete-text');
    const icon = btn.querySelector('i');

    if (isDone) {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        icon.className = 'fa-solid fa-circle-check';
        icon.style.color = 'var(--accent)';
        btnText.textContent = 'Completado';
    } else {
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        icon.className = 'fa-regular fa-circle-check';
        icon.style.color = 'inherit';
        btnText.textContent = 'Marcar como Completado';
    }
}

function updateProgressTracker() {
    const total = courseTopicsData.length;
    const count = completedTopics.length;
    const percent = Math.round((count / total) * 100);

    const fill = document.getElementById('sidebar-progress-fill');
    const text = document.getElementById('sidebar-progress-percent');

    if (fill) fill.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}%`;
}

/* ==========================================================================
   GLOBAL SEARCH ENGINE
   ========================================================================== */
function initGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('search-clear-btn');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 0) {
            clearBtn.classList.remove('hidden');
            performGlobalSearch(query);
        } else {
            clearBtn.classList.add('hidden');
            handleHashChange();
        }
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        handleHashChange();
    });
}

function performGlobalSearch(query) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const resultsView = document.getElementById('view-search-results');
    resultsView.classList.add('active');

    document.getElementById('search-query-display').textContent = `Mostrando resultados para: "${query}"`;

    const resultsList = document.getElementById('search-results-list');
    resultsList.innerHTML = '';

    // Search in Topics
    const topicMatches = courseTopicsData.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query) ||
        t.content.toLowerCase().includes(query)
    );

    // Search in CLI Commands
    const commandMatches = ciscoCommandsDatabase.filter(c =>
        c.syntax.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
    );

    if (topicMatches.length === 0 && commandMatches.length === 0) {
        resultsList.innerHTML = `
            <div class="calc-card text-center" style="padding: 3rem;">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>No se encontraron coincidencias</h3>
                <p style="color: var(--text-secondary)">Prueba buscando términos como "VLAN", "OSPF", "Subnetting", "ACL" o comandos de red.</p>
            </div>
        `;
        return;
    }

    // Render topic matches
    topicMatches.forEach(t => {
        const card = document.createElement('div');
        card.className = 'command-card';
        card.style.marginBottom = '1rem';
        card.innerHTML = `
            <div>
                <span class="cmd-mode-badge">${t.moduleName}</span>
                <h3 style="margin: 0.5rem 0; color: var(--primary)">${t.title}</h3>
                <p class="cmd-desc">${t.description}</p>
            </div>
            <a href="#topic/${t.id}" class="btn btn-outline btn-block mt-2">Ir al Tema <i class="fa-solid fa-arrow-right"></i></a>
        `;
        resultsList.appendChild(card);
    });

    // Render command matches
    commandMatches.forEach(c => {
        const card = document.createElement('div');
        card.className = 'command-card';
        card.style.marginBottom = '1rem';
        card.innerHTML = `
            <div>
                <span class="cmd-mode-badge">Comando CLI</span>
                <div class="cmd-syntax" style="margin-top:0.4rem;">${c.syntax}</div>
                <p class="cmd-desc">${c.description}</p>
            </div>
            <a href="#tool-cli" class="btn btn-secondary btn-block mt-2">Ver en Cheatsheet CLI</a>
        `;
        resultsList.appendChild(card);
    });
}

/* ==========================================================================
   CLI CHEATSHEET UI HANDLER
   ========================================================================== */
function initCLICheatsheet() {
    const grid = document.getElementById('commands-grid');
    const searchInput = document.getElementById('cli-search-input');
    const chipsContainer = document.getElementById('cli-category-chips');

    if (!grid) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function renderCommands() {
        grid.innerHTML = '';

        const filtered = ciscoCommandsDatabase.filter(cmd => {
            const matchesCat = (activeCategory === 'all' || cmd.category === activeCategory);
            const matchesQuery = (
                cmd.syntax.toLowerCase().includes(searchQuery) ||
                cmd.description.toLowerCase().includes(searchQuery)
            );
            return matchesCat && matchesQuery;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted);">No se encontraron comandos con los filtros aplicados.</p>`;
            return;
        }

        filtered.forEach(cmd => {
            const card = document.createElement('div');
            card.className = 'command-card';
            card.innerHTML = `
                <div>
                    <div class="cmd-card-header">
                        <span class="cmd-mode-badge">${cmd.mode}</span>
                    </div>
                    <div class="cmd-syntax">${cmd.syntax}</div>
                    <p class="cmd-desc">${cmd.description}</p>
                </div>
                <div class="code-block-wrapper" style="margin: 0.5rem 0 0 0;">
                    <div class="code-header">
                        <span>Ejemplo</span>
                        <button class="btn-copy-code" data-copy="${cmd.example}">
                            <i class="fa-regular fa-copy"></i> Copiar
                        </button>
                    </div>
                    <pre><code>${cmd.example}</code></pre>
                </div>
            `;
            grid.appendChild(card);
        });

        // Add copy event listener
        grid.querySelectorAll('.btn-copy-code').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.getAttribute('data-copy');
                navigator.clipboard.writeText(text);
                btn.innerHTML = `<i class="fa-solid fa-check"></i> ¡Copiado!`;
                setTimeout(() => {
                    btn.innerHTML = `<i class="fa-regular fa-copy"></i> Copiar`;
                }, 2000);
            });
        });
    }

    if (chipsContainer) {
        chipsContainer.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeCategory = chip.getAttribute('data-cat');
                renderCommands();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            renderCommands();
        });
    }

    renderCommands();
}
