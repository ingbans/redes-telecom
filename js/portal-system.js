/* ==========================================================================
   PORTAL SYSTEM: AUTHENTICATION, ATTENDANCE & GRADEBOOK ENGINE
   ========================================================================== */

// Default Data & Initial State
const PORTAL_KEYS = {
    STUDENTS: 'net_portal_students',
    CALENDAR: 'net_portal_calendar',
    ATTENDANCE: 'net_portal_attendance',
    GRADES: 'net_portal_grades',
    SESSION: 'net_portal_session',
    TEACHER_PIN: 'net_portal_teacher_pin'
};

const DEFAULT_TEACHER_PIN = "profesor2026";

// App Portal State
let currentSession = JSON.parse(localStorage.getItem(PORTAL_KEYS.SESSION) || 'null'); // { role: 'student'|'teacher', user: object|null }
let registeredStudents = JSON.parse(localStorage.getItem(PORTAL_KEYS.STUDENTS) || '[]');
let classCalendar = JSON.parse(localStorage.getItem(PORTAL_KEYS.CALENDAR) || '{}'); // { "clase-1": "2026-09-15", ... }
let attendanceRecords = JSON.parse(localStorage.getItem(PORTAL_KEYS.ATTENDANCE) || '{}'); // { "studentId_claseId": "presente"|"ausente"|"justificado" }
let gradesRecords = JSON.parse(localStorage.getItem(PORTAL_KEYS.GRADES) || '{}'); // { "studentId": { ex1: 18, ex2: 16, ex3: 19 } }

function initPortalSystem() {
    ensureDefaultCalendar();
    renderAuthUI();
    initPortalModals();
    initTeacherPanelEvents();
}

function ensureDefaultCalendar() {
    if (Object.keys(classCalendar).length === 0) {
        // Set initial default dates for 12 classes
        const today = new Date();
        for (let i = 1; i <= 12; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + (i - 1) * 7);
            classCalendar[`clase-${i}`] = nextDate.toISOString().split('T')[0];
        }
        localStorage.setItem(PORTAL_KEYS.CALENDAR, JSON.stringify(classCalendar));
    }
}

/* ==========================================================================
   AUTHENTICATION & SESSION MANAGEMENT
   ========================================================================== */
function renderAuthUI() {
    const userContainer = document.getElementById('navbar-user-area');
    if (!userContainer) return;

    if (currentSession) {
        const isTeacher = currentSession.role === 'teacher';
        const displayName = isTeacher ? 'Profesor (Admin)' : currentSession.user.name;
        const badgeClass = isTeacher ? 'badge-teacher' : 'badge-student';

        userContainer.innerHTML = `
            <div class="user-session-box">
                <span class="user-badge ${badgeClass}"><i class="fa-solid ${isTeacher ? 'fa-user-tie' : 'fa-user-graduate'}"></i> ${displayName}</span>
                <button class="btn btn-outline btn-sm" onclick="handleLogout()"><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
            </div>
        `;
    } else {
        userContainer.innerHTML = `
            <button class="btn btn-primary btn-sm" onclick="openLoginModal()">
                <i class="fa-solid fa-right-to-bracket"></i> Ingresar / Registrarse
            </button>
        `;
    }
    updatePortalViewsAccess();
}

function updatePortalViewsAccess() {
    const studentNavItem = document.getElementById('nav-item-student');
    const teacherNavItem = document.getElementById('nav-item-teacher');

    if (currentSession) {
        if (currentSession.role === 'student') {
            if (studentNavItem) studentNavItem.classList.remove('hidden');
            if (teacherNavItem) teacherNavItem.classList.add('hidden');
        } else if (currentSession.role === 'teacher') {
            if (studentNavItem) studentNavItem.classList.remove('hidden');
            if (teacherNavItem) teacherNavItem.classList.remove('hidden');
        }
    } else {
        if (studentNavItem) studentNavItem.classList.add('hidden');
        if (teacherNavItem) teacherNavItem.classList.add('hidden');
    }
}

function handleLogout() {
    currentSession = null;
    localStorage.removeItem(PORTAL_KEYS.SESSION);
    renderAuthUI();
    window.location.hash = '#topic/clase-1';
}

/* ==========================================================================
   MODAL HANDLERS
   ========================================================================== */
function initPortalModals() {
    // Student Register Form
    const registerForm = document.getElementById('student-register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim().toLowerCase();
            const idNumber = document.getElementById('reg-id').value.trim();
            const password = document.getElementById('reg-password').value;

            if (registeredStudents.some(s => s.email === email || s.idNumber === idNumber)) {
                alert('Ya existe un estudiante registrado con este correo o número de Cédula/Carnet.');
                return;
            }

            const newStudent = {
                id: 'std_' + Date.now(),
                name,
                email,
                idNumber,
                password
            };

            registeredStudents.push(newStudent);
            localStorage.setItem(PORTAL_KEYS.STUDENTS, JSON.stringify(registeredStudents));

            // Auto login as student
            currentSession = { role: 'student', user: newStudent };
            localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));

            closePortalModals();
            renderAuthUI();
            alert(`¡Registro exitoso! Bienvenido ${name}.`);
            window.location.hash = '#portal-student';
        });
    }

    // Login Form (Student or Teacher)
    const loginForm = document.getElementById('portal-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.querySelector('input[name="login-role"]:checked').value;

            if (role === 'teacher') {
                const pinInput = document.getElementById('login-teacher-pin').value;
                const savedPin = localStorage.getItem(PORTAL_KEYS.TEACHER_PIN) || DEFAULT_TEACHER_PIN;

                if (pinInput === savedPin) {
                    currentSession = { role: 'teacher', user: { name: 'Profesor de Telecomunicaciones' } };
                    localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));
                    closePortalModals();
                    renderAuthUI();
                    window.location.hash = '#portal-teacher';
                } else {
                    alert('Clave de Profesor/Administrador incorrecta.');
                }
            } else {
                const email = document.getElementById('login-email').value.trim().toLowerCase();
                const password = document.getElementById('login-password').value;

                const student = registeredStudents.find(s => s.email === email && s.password === password);
                if (student) {
                    currentSession = { role: 'student', user: student };
                    localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));
                    closePortalModals();
                    renderAuthUI();
                    window.location.hash = '#portal-student';
                } else {
                    alert('Correo o contraseña de estudiante incorrecta.');
                }
            }
        });
    }
}

function openLoginModal() {
    document.getElementById('portal-modal-overlay').classList.remove('hidden');
    document.getElementById('modal-box-login').classList.remove('hidden');
    document.getElementById('modal-box-register').classList.add('hidden');
}

function openRegisterModal() {
    document.getElementById('portal-modal-overlay').classList.remove('hidden');
    document.getElementById('modal-box-login').classList.add('hidden');
    document.getElementById('modal-box-register').classList.remove('hidden');
}

function closePortalModals() {
    document.getElementById('portal-modal-overlay').classList.add('hidden');
}

/* ==========================================================================
   STUDENT PORTAL RENDERING
   ========================================================================== */
function renderStudentPortal() {
    if (!currentSession) {
        openLoginModal();
        return;
    }

    const student = currentSession.user;
    const isTeacherPreview = currentSession.role === 'teacher';

    document.getElementById('std-profile-name').textContent = student.name || 'Vista previa del Profesor';
    document.getElementById('std-profile-id').textContent = `Cédula/Carnet: ${student.idNumber || 'ADMIN'}`;

    // Attendance summary
    let presentCount = 0;
    let totalClasses = 12;

    const attendanceTbody = document.getElementById('std-attendance-tbody');
    attendanceTbody.innerHTML = '';

    courseTopicsData.forEach(topic => {
        const dateStr = classCalendar[topic.id] || 'Sin fecha asignada';
        const key = `${student.id}_${topic.id}`;
        const status = attendanceRecords[key] || 'pendiente';

        if (status === 'presente') presentCount++;

        let badgeHtml = '';
        if (status === 'presente') {
            badgeHtml = '<span class="status-pill status-present"><i class="fa-solid fa-check"></i> Presente</span>';
        } else if (status === 'ausente') {
            badgeHtml = '<span class="status-pill status-absent"><i class="fa-solid fa-xmark"></i> Ausente</span>';
        } else if (status === 'justificado') {
            badgeHtml = '<span class="status-pill status-justified"><i class="fa-solid fa-info"></i> Justificado</span>';
        } else {
            badgeHtml = '<span class="status-pill status-pending">Pendiente</span>';
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${topic.weekNumber}</strong></td>
            <td>${topic.title}</td>
            <td><code>${formatDateDisplay(dateStr)}</code></td>
            <td>${badgeHtml}</td>
        `;
        attendanceTbody.appendChild(tr);
    });

    const attendPercent = Math.round((presentCount / totalClasses) * 100);
    document.getElementById('std-attendance-percent').textContent = `${attendPercent}% (${presentCount}/12 Clases)`;

    // Grades summary
    const stdGrades = gradesRecords[student.id] || { ex1: null, ex2: null, ex3: null };
    
    document.getElementById('std-grade-ex1').textContent = stdGrades.ex1 !== null ? `${stdGrades.ex1} / 20` : 'Pendiente';
    document.getElementById('std-grade-ex2').textContent = stdGrades.ex2 !== null ? `${stdGrades.ex2} / 20` : 'Pendiente';
    document.getElementById('std-grade-ex3').textContent = stdGrades.ex3 !== null ? `${stdGrades.ex3} / 20` : 'Pendiente';

    // Calculate final average
    const validGrades = [stdGrades.ex1, stdGrades.ex2, stdGrades.ex3].filter(g => g !== null && g !== undefined);
    let avg = 0;
    if (validGrades.length > 0) {
        avg = (validGrades.reduce((a, b) => Number(a) + Number(b), 0) / validGrades.length).toFixed(1);
    }

    const avgEl = document.getElementById('std-grade-avg');
    avgEl.textContent = validGrades.length > 0 ? `${avg} / 20` : '-';
    
    const statusText = document.getElementById('std-grade-status');
    if (validGrades.length === 0) {
        statusText.textContent = 'En curso';
        statusText.style.color = 'var(--text-muted)';
    } else if (avg >= 10) {
        statusText.textContent = 'Aprobando';
        statusText.style.color = 'var(--accent)';
    } else {
        statusText.textContent = 'Reprobando';
        statusText.style.color = 'var(--danger)';
    }
}

/* ==========================================================================
   TEACHER PANEL RENDERING & CONTROL
   ========================================================================== */
function initTeacherPanelEvents() {
    // Tab Switching
    document.querySelectorAll('.teacher-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.teacher-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.teacher-tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function renderTeacherPanel() {
    if (!currentSession || currentSession.role !== 'teacher') {
        alert('Acceso exclusivo para el Profesor Administrador.');
        openLoginModal();
        return;
    }

    renderCalendarConfigTab();
    renderAttendanceTab();
    renderGradesTab();
    renderRosterTab();
}

function renderCalendarConfigTab() {
    const container = document.getElementById('teacher-calendar-list');
    if (!container) return;

    container.innerHTML = '';
    courseTopicsData.forEach(topic => {
        const currentDate = classCalendar[topic.id] || '';
        const card = document.createElement('div');
        card.className = 'calendar-config-row';
        card.innerHTML = `
            <div class="cal-title">
                <strong>${topic.weekNumber}</strong>: ${topic.title}
            </div>
            <div class="cal-input-wrapper">
                <label>Fecha asignada:</label>
                <input type="date" value="${currentDate}" data-topic-id="${topic.id}" class="cal-date-input">
            </div>
        `;
        container.appendChild(card);
    });

    // Event listener to save dates
    container.querySelectorAll('.cal-date-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const topicId = e.target.getAttribute('data-topic-id');
            classCalendar[topicId] = e.target.value;
            localStorage.setItem(PORTAL_KEYS.CALENDAR, JSON.stringify(classCalendar));
        });
    });
}

function renderAttendanceTab() {
    const selectClass = document.getElementById('att-class-select');
    const tbody = document.getElementById('teacher-att-tbody');
    if (!selectClass || !tbody) return;

    // Populate dropdown if empty
    if (selectClass.children.length === 0) {
        courseTopicsData.forEach(topic => {
            const dateStr = classCalendar[topic.id] || '';
            const option = document.createElement('option');
            option.value = topic.id;
            option.textContent = `${topic.weekNumber} (${dateStr ? formatDateDisplay(dateStr) : 'Sin fecha'})`;
            selectClass.appendChild(option);
        });

        selectClass.addEventListener('change', () => renderAttendanceForSelectedClass());
    }

    renderAttendanceForSelectedClass();
}

function renderAttendanceForSelectedClass() {
    const topicId = document.getElementById('att-class-select').value;
    const tbody = document.getElementById('teacher-att-tbody');
    tbody.innerHTML = '';

    if (registeredStudents.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding:2rem; color:var(--text-muted)">No hay estudiantes registrados aún.</td></tr>`;
        return;
    }

    registeredStudents.forEach(std => {
        const key = `${std.id}_${topicId}`;
        const currentStatus = attendanceRecords[key] || 'pendiente';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${std.name}</strong></td>
            <td><code>${std.idNumber}</code></td>
            <td>
                <select class="att-status-select" data-student-id="${std.id}" data-topic-id="${topicId}">
                    <option value="pendiente" ${currentStatus === 'pendiente' ? 'selected' : ''}>-- Seleccionar --</option>
                    <option value="presente" ${currentStatus === 'presente' ? 'selected' : ''}>✅ Presente</option>
                    <option value="ausente" ${currentStatus === 'ausente' ? 'selected' : ''}>❌ Ausente</option>
                    <option value="justificado" ${currentStatus === 'justificado' ? 'selected' : ''}>⚠️ Justificado</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.att-status-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const stdId = e.target.getAttribute('data-student-id');
            const topId = e.target.getAttribute('data-topic-id');
            const newStatus = e.target.value;

            attendanceRecords[`${stdId}_${topId}`] = newStatus;
            localStorage.setItem(PORTAL_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
        });
    });
}

function renderGradesTab() {
    const tbody = document.getElementById('teacher-grades-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (registeredStudents.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding:2rem; color:var(--text-muted)">No hay estudiantes registrados aún.</td></tr>`;
        return;
    }

    registeredStudents.forEach(std => {
        const stdGrades = gradesRecords[std.id] || { ex1: '', ex2: '', ex3: '' };

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${std.name}</strong></td>
            <td><code>${std.idNumber}</code></td>
            <td><input type="number" min="0" max="20" class="grade-input" data-student-id="${std.id}" data-exam="ex1" value="${stdGrades.ex1}"></td>
            <td><input type="number" min="0" max="20" class="grade-input" data-student-id="${std.id}" data-exam="ex2" value="${stdGrades.ex2}"></td>
            <td><input type="number" min="0" max="20" class="grade-input" data-student-id="${std.id}" data-exam="ex3" value="${stdGrades.ex3}"></td>
            <td><strong class="calculated-avg" id="avg_${std.id}">-</strong></td>
        `;
        tbody.appendChild(tr);
        updateLiveStudentAvg(std.id);
    });

    tbody.querySelectorAll('.grade-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
            const stdId = e.target.getAttribute('data-student-id');
            const examKey = e.target.getAttribute('data-exam');
            const val = e.target.value !== '' ? Number(e.target.value) : '';

            if (!gradesRecords[stdId]) gradesRecords[stdId] = { ex1: '', ex2: '', ex3: '' };
            gradesRecords[stdId][examKey] = val;

            localStorage.setItem(PORTAL_KEYS.GRADES, JSON.stringify(gradesRecords));
            updateLiveStudentAvg(stdId);
        });
    });
}

function updateLiveStudentAvg(studentId) {
    const g = gradesRecords[studentId] || {};
    const vals = [g.ex1, g.ex2, g.ex3].filter(v => v !== '' && v !== null && v !== undefined);
    const avgEl = document.getElementById(`avg_${studentId}`);
    if (!avgEl) return;

    if (vals.length > 0) {
        const avg = (vals.reduce((a, b) => Number(a) + Number(b), 0) / vals.length).toFixed(1);
        avgEl.textContent = `${avg} / 20`;
        avgEl.style.color = avg >= 10 ? 'var(--accent)' : 'var(--danger)';
    } else {
        avgEl.textContent = '-';
        avgEl.style.color = 'inherit';
    }
}

function renderRosterTab() {
    const tbody = document.getElementById('teacher-roster-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    registeredStudents.forEach(std => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${std.name}</strong></td>
            <td>${std.email}</td>
            <td><code>${std.idNumber}</code></td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="deleteStudent('${std.id}')">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteStudent(studentId) {
    if (confirm('¿Estás seguro de eliminar a este estudiante de la nómina?')) {
        registeredStudents = registeredStudents.filter(s => s.id !== studentId);
        localStorage.setItem(PORTAL_KEYS.STUDENTS, JSON.stringify(registeredStudents));
        renderTeacherPanel();
    }
}

function exportPortalDataJSON() {
    const exportObj = {
        calendar: classCalendar,
        students: registeredStudents,
        attendance: attendanceRecords,
        grades: gradesRecords,
        exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Respaldos_Redes_Telecom_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function formatDateDisplay(isoDateStr) {
    if (!isoDateStr) return 'Sin fecha';
    const parts = isoDateStr.split('-');
    if (parts.length !== 3) return isoDateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
