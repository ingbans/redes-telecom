/* ==========================================================================
   PORTAL SYSTEM: FIREBASE AUTHENTICATION, FIRESTORE DATABASE & SYNC ENGINE
   ========================================================================== */

// Firebase Configuration Keys
const firebaseConfig = {
  apiKey: "AIzaSyCaIIfEIDETVmYey-BW3Y0_QJKhJO3XlrY",
  authDomain: "unefa-redes-telecom.firebaseapp.com",
  projectId: "unefa-redes-telecom",
  storageBucket: "unefa-redes-telecom.firebasestorage.app",
  messagingSenderId: "1085766416677",
  appId: "1:1085766416677:web:952ff24b69cc4c97b202cc",
  measurementId: "G-084WQQBNTM"
};

// Default Data & Keys
const PORTAL_KEYS = {
    STUDENTS: 'net_portal_students',
    CALENDAR: 'net_portal_calendar',
    ATTENDANCE: 'net_portal_attendance',
    GRADES: 'net_portal_grades',
    QUIZZES: 'net_portal_quizzes',
    SESSION: 'net_portal_session',
    TEACHER_PIN: 'net_portal_teacher_pin'
};

const DEFAULT_TEACHER_PIN = "profesor2026";

// Global Portal & Firebase Handles
let db = null;
let auth = null;
let currentSession = JSON.parse(localStorage.getItem(PORTAL_KEYS.SESSION) || 'null');
let registeredStudents = JSON.parse(localStorage.getItem(PORTAL_KEYS.STUDENTS) || '[]');
let classCalendar = JSON.parse(localStorage.getItem(PORTAL_KEYS.CALENDAR) || '{}');
let attendanceRecords = JSON.parse(localStorage.getItem(PORTAL_KEYS.ATTENDANCE) || '{}');
let gradesRecords = JSON.parse(localStorage.getItem(PORTAL_KEYS.GRADES) || '{}');
let quizAttemptsRecords = JSON.parse(localStorage.getItem(PORTAL_KEYS.QUIZZES) || '{}');

function initPortalSystem() {
    initFirebaseService();
    ensureDefaultCalendar();
    renderAuthUI();
    initPortalModals();
    initTeacherPanelEvents();
}

function initFirebaseService() {
    if (typeof firebase !== 'undefined') {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            db = firebase.firestore();
            auth = firebase.auth();
            console.log("🔥 Google Firebase inicializado con éxito.");
            setupFirestoreRealtimeSync();
        } catch (err) {
            console.warn("Error al inicializar Firebase, operando en modo local:", err);
        }
    }
}

function setupFirestoreRealtimeSync() {
    if (!db) return;

    // Realtime Calendar Sync
    db.collection('config').doc('calendar').onSnapshot(doc => {
        if (doc.exists) {
            classCalendar = doc.data();
            localStorage.setItem(PORTAL_KEYS.CALENDAR, JSON.stringify(classCalendar));
            if (window.location.hash === '#portal-teacher') renderCalendarConfigTab();
            if (window.location.hash === '#portal-student') renderStudentPortal();
        }
    });

    // Realtime Students Roster Sync
    db.collection('students').onSnapshot(snapshot => {
        registeredStudents = [];
        snapshot.forEach(doc => {
            registeredStudents.push({ id: doc.id, ...doc.data() });
        });
        localStorage.setItem(PORTAL_KEYS.STUDENTS, JSON.stringify(registeredStudents));
        if (window.location.hash === '#portal-teacher') renderRosterTab();
    });

    // Realtime Attendance Sync
    db.collection('attendance').onSnapshot(snapshot => {
        attendanceRecords = {};
        snapshot.forEach(doc => {
            attendanceRecords[doc.id] = doc.data().status;
        });
        localStorage.setItem(PORTAL_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
        if (window.location.hash === '#portal-student') renderStudentPortal();
    });

    // Realtime Exam Grades Sync
    db.collection('grades').onSnapshot(snapshot => {
        gradesRecords = {};
        snapshot.forEach(doc => {
            gradesRecords[doc.id] = doc.data();
        });
        localStorage.setItem(PORTAL_KEYS.GRADES, JSON.stringify(gradesRecords));
        if (window.location.hash === '#portal-student') renderStudentPortal();
        if (window.location.hash === '#portal-teacher') renderGradesTab();
    });

    // Realtime Quiz Attempts Sync
    db.collection('quizzes').onSnapshot(snapshot => {
        quizAttemptsRecords = {};
        snapshot.forEach(doc => {
            quizAttemptsRecords[doc.id] = doc.data().attempts || [];
        });
        localStorage.setItem(PORTAL_KEYS.QUIZZES, JSON.stringify(quizAttemptsRecords));
    });
}

function ensureDefaultCalendar() {
    if (Object.keys(classCalendar).length === 0) {
        const today = new Date();
        for (let i = 1; i <= 12; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + (i - 1) * 7);
            classCalendar[`clase-${i}`] = nextDate.toISOString().split('T')[0];
        }
        saveCalendarData();
    }
}

function saveCalendarData() {
    localStorage.setItem(PORTAL_KEYS.CALENDAR, JSON.stringify(classCalendar));
    if (db) {
        db.collection('config').doc('calendar').set(classCalendar, { merge: true }).catch(console.error);
    }
}

/* ==========================================================================
   GOOGLE AUTHENTICATION & SESSION MANAGEMENT
   ========================================================================== */
function handleGoogleSignIn() {
    if (!auth) {
        alert("El servicio de Google Firebase no está cargado. Revisa tu conexión a internet.");
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            let existingStudent = registeredStudents.find(s => s.email === user.email.toLowerCase());

            if (!existingStudent) {
                // Auto create student profile from Google User
                existingStudent = {
                    id: user.uid,
                    name: user.displayName || 'Estudiante Google',
                    email: user.email.toLowerCase(),
                    idNumber: 'Google Account',
                    authProvider: 'google'
                };
                registeredStudents.push(existingStudent);
                if (db) {
                    db.collection('students').doc(user.uid).set(existingStudent, { merge: true });
                }
            }

            currentSession = { role: 'student', user: existingStudent };
            localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));

            closePortalModals();
            renderAuthUI();
            alert(`¡Bienvenido ${existingStudent.name}! Has iniciado sesión con Google.`);
            window.location.hash = '#portal-student';
        })
        .catch((error) => {
            console.error("Error Google Auth:", error);
            alert(`Error al iniciar sesión con Google: ${error.message}`);
        });
}

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
    if (auth && auth.currentUser) {
        auth.signOut().catch(console.error);
    }
    renderAuthUI();
    window.location.hash = '#topic/clase-1';
}

/* ==========================================================================
   MODAL & FORM HANDLERS
   ========================================================================== */
function initPortalModals() {
    // Modal Register
    const registerForm = document.getElementById('student-register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim().toLowerCase();
            const idNumber = document.getElementById('reg-id').value.trim();
            const password = document.getElementById('reg-password').value;

            performStudentRegistration(name, email, idNumber, password);
        });
    }

    // Modal Login
    const loginForm = document.getElementById('portal-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.querySelector('input[name="login-role"]:checked').value;
            performUserLogin(role, 'modal');
        });
    }

    // Full Page Login
    const pageLoginForm = document.getElementById('page-login-form');
    if (pageLoginForm) {
        pageLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.querySelector('input[name="page-login-role"]:checked').value;
            performUserLogin(role, 'page');
        });
    }

    // Full Page Register
    const pageRegisterForm = document.getElementById('page-register-form');
    if (pageRegisterForm) {
        pageRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('page-reg-name').value.trim();
            const email = document.getElementById('page-reg-email').value.trim().toLowerCase();
            const idNumber = document.getElementById('page-reg-id').value.trim();
            const password = document.getElementById('page-reg-password').value;

            performStudentRegistration(name, email, idNumber, password);
        });
    }
}

function performStudentRegistration(name, email, idNumber, password) {
    if (registeredStudents.some(s => s.email === email || s.idNumber === idNumber)) {
        alert('Ya existe un estudiante registrado con este correo o número de Cédula/Carnet.');
        return;
    }

    const stdId = 'std_' + Date.now();
    const newStudent = {
        id: stdId,
        name,
        email,
        idNumber,
        password,
        authProvider: 'email'
    };

    registeredStudents.push(newStudent);
    localStorage.setItem(PORTAL_KEYS.STUDENTS, JSON.stringify(registeredStudents));

    if (db) {
        db.collection('students').doc(stdId).set(newStudent).catch(console.error);
    }

    currentSession = { role: 'student', user: newStudent };
    localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));

    closePortalModals();
    renderAuthUI();
    alert(`¡Registro exitoso en la nube! Bienvenido ${name}.`);
    window.location.hash = '#portal-student';
}

function performUserLogin(role, sourcePrefix) {
    if (role === 'teacher') {
        const pinInput = document.getElementById(sourcePrefix === 'modal' ? 'login-teacher-pin' : 'page-login-teacher-pin').value;
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
        const email = document.getElementById(sourcePrefix === 'modal' ? 'login-email' : 'page-login-email').value.trim().toLowerCase();
        const password = document.getElementById(sourcePrefix === 'modal' ? 'login-password' : 'page-login-password').value;

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
}

function switchPageAuthMode(mode) {
    const loginForm = document.getElementById('page-login-form');
    const regForm = document.getElementById('page-register-form');
    const tabLogin = document.getElementById('page-tab-login');
    const tabReg = document.getElementById('page-tab-register');

    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        regForm.classList.add('hidden');
        tabLogin.className = 'btn btn-primary';
        tabReg.className = 'btn btn-outline';
    } else {
        loginForm.classList.add('hidden');
        regForm.classList.remove('hidden');
        tabLogin.className = 'btn btn-outline';
        tabReg.className = 'btn btn-primary';
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
   QUIZ ATTEMPTS RECORDING (SELF-ASSESSMENT)
   ========================================================================== */
function recordStudentQuizAttempt(percentScore) {
    if (!currentSession || currentSession.role !== 'student') return;
    const stdId = currentSession.user.id;
    if (!quizAttemptsRecords[stdId]) quizAttemptsRecords[stdId] = [];

    const newAttempt = {
        score: percentScore,
        date: new Date().toISOString()
    };
    quizAttemptsRecords[stdId].push(newAttempt);

    localStorage.setItem(PORTAL_KEYS.QUIZZES, JSON.stringify(quizAttemptsRecords));

    if (db) {
        db.collection('quizzes').doc(stdId).set({ attempts: quizAttemptsRecords[stdId] }, { merge: true }).catch(console.error);
    }
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

    // Official Exam Grades summary (Strictly 0 to 20 points scale)
    const stdGrades = gradesRecords[student.id] || { ex1: null, ex2: null, ex3: null };
    
    document.getElementById('std-grade-ex1').textContent = stdGrades.ex1 !== null ? `${stdGrades.ex1} / 20 pts` : 'Pendiente';
    document.getElementById('std-grade-ex2').textContent = stdGrades.ex2 !== null ? `${stdGrades.ex2} / 20 pts` : 'Pendiente';
    document.getElementById('std-grade-ex3').textContent = stdGrades.ex3 !== null ? `${stdGrades.ex3} / 20 pts` : 'Pendiente';

    // Calculate final average
    const validGrades = [stdGrades.ex1, stdGrades.ex2, stdGrades.ex3].filter(g => g !== null && g !== undefined && g !== '');
    let avg = 0;
    if (validGrades.length > 0) {
        avg = (validGrades.reduce((a, b) => Number(a) + Number(b), 0) / validGrades.length).toFixed(1);
    }

    const avgEl = document.getElementById('std-grade-avg');
    avgEl.textContent = validGrades.length > 0 ? `${avg} / 20 pts` : '-';
    
    const statusText = document.getElementById('std-grade-status');
    if (validGrades.length === 0) {
        statusText.textContent = 'En curso';
        statusText.style.color = 'var(--text-muted)';
    } else if (avg >= 10) {
        statusText.textContent = 'Aprobando (Min. 10 pts)';
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

    container.querySelectorAll('.cal-date-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const topicId = e.target.getAttribute('data-topic-id');
            classCalendar[topicId] = e.target.value;
            saveCalendarData();
        });
    });
}

function renderAttendanceTab() {
    const selectClass = document.getElementById('att-class-select');
    const tbody = document.getElementById('teacher-att-tbody');
    if (!selectClass || !tbody) return;

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
            const docKey = `${stdId}_${topId}`;

            attendanceRecords[docKey] = newStatus;
            localStorage.setItem(PORTAL_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));

            if (db) {
                db.collection('attendance').doc(docKey).set({ studentId: stdId, topicId: topId, status: newStatus }).catch(console.error);
            }
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
            <td><input type="number" min="0" max="20" placeholder="0-20" class="grade-input" data-student-id="${std.id}" data-exam="ex1" value="${stdGrades.ex1}"></td>
            <td><input type="number" min="0" max="20" placeholder="0-20" class="grade-input" data-student-id="${std.id}" data-exam="ex2" value="${stdGrades.ex2}"></td>
            <td><input type="number" min="0" max="20" placeholder="0-20" class="grade-input" data-student-id="${std.id}" data-exam="ex3" value="${stdGrades.ex3}"></td>
            <td><strong class="calculated-avg" id="avg_${std.id}">-</strong></td>
        `;
        tbody.appendChild(tr);
        updateLiveStudentAvg(std.id);
    });

    tbody.querySelectorAll('.grade-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
            const stdId = e.target.getAttribute('data-student-id');
            const examKey = e.target.getAttribute('data-exam');
            let val = e.target.value !== '' ? Number(e.target.value) : '';

            if (val !== '' && (val < 0 || val > 20)) {
                alert('La calificación debe estar comprendida estrictamente entre 0 y 20 puntos.');
                e.target.value = val > 20 ? 20 : 0;
                val = e.target.value;
            }

            if (!gradesRecords[stdId]) gradesRecords[stdId] = { ex1: '', ex2: '', ex3: '' };
            gradesRecords[stdId][examKey] = val;

            localStorage.setItem(PORTAL_KEYS.GRADES, JSON.stringify(gradesRecords));

            if (db) {
                db.collection('grades').doc(stdId).set(gradesRecords[stdId], { merge: true }).catch(console.error);
            }
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
        avgEl.textContent = `${avg} / 20 pts`;
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
        const stdQuizLogs = quizAttemptsRecords[std.id] || [];
        const quizCount = stdQuizLogs.length;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${std.name}</strong></td>
            <td>${std.email}</td>
            <td><code>${std.idNumber}</code></td>
            <td><span class="status-pill status-present"><i class="fa-solid fa-vial"></i> ${quizCount} Prácticas</span></td>
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

        if (db) {
            db.collection('students').doc(studentId).delete().catch(console.error);
        }
        renderTeacherPanel();
    }
}

function exportPortalDataJSON() {
    const exportObj = {
        calendar: classCalendar,
        students: registeredStudents,
        attendance: attendanceRecords,
        grades: gradesRecords,
        quizzes: quizAttemptsRecords,
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
