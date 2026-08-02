/* ==========================================================================
   MAIN APPLICATION LOGIC (app.js)
   Single Page Application router, state management, local storage & search
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAppTheme();
    renderSidebarModules();
    initSidebarToggle();
    initAppRouting();
    initGlobalSearch();
    initCLICheatsheet();
    initSubnetCalculator();
    initQuizEngine();
    initPortalSystem();
    updateProgressTracker();
});

// App State
let currentTopicId = "clase-1";
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
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && window.innerWidth <= 992) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }

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

            if (toolName === 'vlan') {
                setTimeout(() => {
                    drawVLANCables();
                    runVLANSimulation('same-vlan');
                }, 150);
            }
        }
    } else if (hash === '#portal-student') {
        renderStudentPortal();
        const view = document.getElementById('view-portal-student');
        if (view) view.classList.add('active');
        const bcCurrent = document.getElementById('bc-current');
        if (bcCurrent) bcCurrent.textContent = 'Mi Portal Estudiante';
    } else if (hash === '#portal-teacher') {
        renderTeacherPanel();
        const view = document.getElementById('view-portal-teacher');
        if (view) view.classList.add('active');
        const bcCurrent = document.getElementById('bc-current');
        if (bcCurrent) bcCurrent.textContent = 'Panel Profesor (Admin)';
    }
}

function getToolTitle(toolName) {
    switch (toolName) {
        case 'vlan': return 'Simulador Animado de VLANs (IEEE 802.1Q)';
        case 'login': return 'Acceso al Portal / Inicio de Sesión';
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

    // Auto-initialize class specific animations
    if (topic.id === 'clase-1') {
        resetOSISimulation();
    } else if (topic.id === 'clase-3') {
        setTimeout(updateSubnetVisualizer, 100);
    } else if (topic.id === 'clase-5') {
        setTimeout(() => {
            drawVLANCables();
            runVLANSimulation('same-vlan');
        }, 150);
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

/* ==========================================================================
   SIDEBAR TOGGLE & COLLAPSE CONTROLLER
   ========================================================================== */
function initSidebarToggle() {
    const toggleBtn = document.getElementById('toggle-sidebar-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.querySelector('.main-wrapper');

    let overlay = document.getElementById('sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay';
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    function toggleSidebar() {
        if (!sidebar) return;
        const isMobile = window.innerWidth <= 992;
        if (isMobile) {
            const isOpen = sidebar.classList.contains('open');
            if (isOpen) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            } else {
                sidebar.classList.add('open');
                overlay.classList.add('active');
            }
        } else {
            const isCollapsed = sidebar.classList.contains('collapsed');
            if (isCollapsed) {
                sidebar.classList.remove('collapsed');
                if (mainWrapper) mainWrapper.classList.remove('sidebar-collapsed');
            } else {
                sidebar.classList.add('collapsed');
                if (mainWrapper) mainWrapper.classList.add('sidebar-collapsed');
            }
        }
    }

    function closeSidebar() {
        if (!sidebar) return;
        const isMobile = window.innerWidth <= 992;
        if (isMobile) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        } else {
            sidebar.classList.add('collapsed');
            if (mainWrapper) mainWrapper.classList.add('sidebar-collapsed');
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeSidebar();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
}

/* ==========================================================================
   VLAN INTERACTIVE ANIMATION CONTROLLER
   ========================================================================== */
let vlanAnimTimeout = null;

function resetVLANSimulation() {
    if (vlanAnimTimeout) clearTimeout(vlanAnimTimeout);

    const statusEl = document.getElementById('vlan-status-text');
    if (statusEl) {
        statusEl.innerHTML = `<i class="fa-solid fa-circle-info"></i> Selecciona un escenario arriba para iniciar la animación interactiva.`;
        statusEl.style.borderLeftColor = 'var(--primary)';
    }

    document.querySelectorAll('.vlan-device').forEach(d => {
        d.className = d.className.replace(/highlight-\w+/g, '').trim();
    });

    const packet = document.getElementById('vlan-packet');
    if (packet) {
        packet.classList.add('hidden');
        packet.style.transform = 'none';
        packet.style.top = 'auto';
        packet.style.left = 'auto';
    }

    const tagField = document.getElementById('inspector-tag-field');
    if (tagField) {
        tagField.textContent = 'IEEE 802.1Q (Sin Etiqueta / Access)';
        tagField.style.backgroundColor = 'var(--bg-tertiary)';
        tagField.style.color = 'var(--text-secondary)';
    }
}

function runVLANSimulation(mode) {
    resetVLANSimulation();

    document.querySelectorAll('.vlan-controls .btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(mode)) {
            btn.classList.add('active');
        }
    });

    const statusEl = document.getElementById('vlan-status-text');
    const packet = document.getElementById('vlan-packet');
    const tagLabel = document.getElementById('packet-tag-label');
    const tagField = document.getElementById('inspector-tag-field');

    const pc1 = document.getElementById('device-pc1');
    const pc2 = document.getElementById('device-pc2');
    const pc3 = document.getElementById('device-pc3');
    const pc4 = document.getElementById('device-pc4');
    const switchDev = document.getElementById('device-switch');
    const routerDev = document.getElementById('device-router');

    if (!pc1 || !switchDev) return;

    if (mode === 'same-vlan') {
        statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Escenario 1:</strong> PC-1 emite un Broadcast ARP en <strong>VLAN 10</strong>...`;
        pc1.classList.add('highlight-active');

        positionPacketAtDevice(packet, pc1);
        packet.classList.remove('hidden');
        tagLabel.textContent = 'VLAN10';

        vlanAnimTimeout = setTimeout(() => {
            statusEl.innerHTML = `<i class="fa-solid fa-bolt"></i> Switch evalúa tabla de VLANs: Puerto asignado a <strong>Access VLAN 10</strong>.`;
            positionPacketAtDevice(packet, switchDev);
            switchDev.classList.add('highlight-active');

            tagField.textContent = 'IEEE 802.1Q (VLAN 10 Tagged)';
            tagField.style.backgroundColor = 'rgba(14, 165, 233, 0.2)';
            tagField.style.color = '#0ea5e9';

            vlanAnimTimeout = setTimeout(() => {
                positionPacketAtDevice(packet, pc2);
                pc2.classList.add('highlight-success');
                if (pc3) pc3.classList.add('highlight-blocked');
                if (pc4) pc4.classList.add('highlight-blocked');

                statusEl.innerHTML = `✅ <strong>Resultado:</strong> Paquete entregado únicamente a <strong>PC-2 (VLAN 10)</strong>. PC-3 y PC-4 (VLAN 20) quedan totalmente aisladas de la inundación de broadcast.`;
            }, 1200);
        }, 1200);

    } else if (mode === 'cross-vlan-block') {
        statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Escenario 2:</strong> PC-1 (VLAN 10) intenta enviar un paquete directo a PC-3 (VLAN 20)...`;
        pc1.classList.add('highlight-active');

        positionPacketAtDevice(packet, pc1);
        packet.classList.remove('hidden');
        tagLabel.textContent = 'VLAN10';

        vlanAnimTimeout = setTimeout(() => {
            statusEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:var(--danger)"></i> Switch verifica VLAN ID del puerto de salida...`;
            positionPacketAtDevice(packet, switchDev);
            switchDev.classList.add('highlight-blocked');

            vlanAnimTimeout = setTimeout(() => {
                packet.classList.add('hidden');
                if (pc3) pc3.classList.add('highlight-blocked');

                statusEl.innerHTML = `⛔ <strong>Bloqueado en Capa 2:</strong> El switch rechaza el envío directo porque PC-1 (VLAN 10) y PC-3 (VLAN 20) pertenecen a dominios de broadcast lógicos separados. Para comunicarse se requiere un Router (Capa 3).`;
                statusEl.style.borderLeftColor = 'var(--danger)';
            }, 1200);
        }, 1200);

    } else if (mode === 'router-on-stick') {
        statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Escenario 3:</strong> PC-1 envía paquete al Default Gateway para alcanzar la subred de <strong>VLAN 20</strong>...`;
        pc1.classList.add('highlight-active');

        positionPacketAtDevice(packet, pc1);
        packet.classList.remove('hidden');
        tagLabel.textContent = 'VID:10';

        vlanAnimTimeout = setTimeout(() => {
            statusEl.innerHTML = `<i class="fa-solid fa-arrow-up"></i> Switch inserta cabecera <strong>IEEE 802.1Q (VID=10)</strong> y reenvía por enlace Troncal hacia el Router...`;
            positionPacketAtDevice(packet, switchDev);
            switchDev.classList.add('highlight-active');

            tagField.textContent = 'IEEE 802.1Q (VID = 10 Header Inserted)';
            tagField.style.backgroundColor = 'rgba(14, 165, 233, 0.2)';
            tagField.style.color = '#0ea5e9';

            vlanAnimTimeout = setTimeout(() => {
                statusEl.innerHTML = `<i class="fa-solid fa-route"></i> Router recibe en subinterfaz <strong>Gi0/0.10</strong>, enruta a subinterfaz <strong>Gi0/0.20</strong> y re-etiqueta a <strong>VID=20</strong>.`;
                positionPacketAtDevice(packet, routerDev);
                routerDev.classList.add('highlight-success');
                tagLabel.textContent = 'VID:20';

                tagField.textContent = 'IEEE 802.1Q (VID = 20 Header Re-tagged)';
                tagField.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
                tagField.style.color = '#a855f7';

                vlanAnimTimeout = setTimeout(() => {
                    positionPacketAtDevice(packet, switchDev);

                    vlanAnimTimeout = setTimeout(() => {
                        positionPacketAtDevice(packet, pc3);
                        if (pc3) pc3.classList.add('highlight-success');
                        statusEl.innerHTML = `✅ <strong>Éxito Inter-VLAN:</strong> Paquete enrutado en Capa 3 y entregado a <strong>PC-3 (VLAN 20)</strong> a través del esquema Router-on-a-Stick.`;
                        statusEl.style.borderLeftColor = 'var(--accent)';
                    }, 1000);
                }, 1000);
            }, 1200);
        }, 1200);
    }
}

function positionPacketAtDevice(packetEl, deviceEl) {
    if (!packetEl || !deviceEl) return;
    const stage = document.querySelector('.vlan-topology-stage');
    if (!stage) return;

    const stageRect = stage.getBoundingClientRect();
    const devRect = deviceEl.getBoundingClientRect();

    const topOffset = (devRect.top - stageRect.top) + (devRect.height / 2) - 22;
    const leftOffset = (devRect.left - stageRect.left) + (devRect.width / 2) - 22;

    packetEl.style.top = `${topOffset}px`;
    packetEl.style.left = `${leftOffset}px`;
}

function drawVLANCables() {
    const stage = document.getElementById('vlan-stage');
    if (!stage) return;

    const router = document.getElementById('device-router');
    const switchDev = document.getElementById('device-switch');
    const pc1 = document.getElementById('device-pc1');
    const pc2 = document.getElementById('device-pc2');
    const pc3 = document.getElementById('device-pc3');
    const pc4 = document.getElementById('device-pc4');

    if (!router || !switchDev || !pc1 || !pc2 || !pc3 || !pc4) return;

    const connect = (lineId, el1, el2) => {
        const line = document.getElementById(lineId);
        if (!line) return;
        const stageRect = stage.getBoundingClientRect();
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();

        const x1 = (r1.left - stageRect.left) + r1.width / 2;
        const y1 = (r1.top - stageRect.top) + r1.height / 2;
        const x2 = (r2.left - stageRect.left) + r2.width / 2;
        const y2 = (r2.top - stageRect.top) + r2.height / 2;

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
    };

    connect('cable-r1-sw1', router, switchDev);
    connect('cable-sw1-pc1', switchDev, pc1);
    connect('cable-sw1-pc2', switchDev, pc2);
    connect('cable-sw1-pc3', switchDev, pc3);
    connect('cable-sw1-pc4', switchDev, pc4);
}

window.addEventListener('resize', () => {
    if (currentTopicId === 'clase-5') {
        drawVLANCables();
    }
});
