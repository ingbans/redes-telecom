/* ==========================================================================
   PORTAL SYSTEM: FIREBASE AUTH, FIRESTORE & WHITELIST SECURITY ENGINE
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
    WHITELIST: 'net_portal_whitelist',
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
let whitelistEmails = JSON.parse(localStorage.getItem(PORTAL_KEYS.WHITELIST) || '[]');

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

    // Realtime Whitelist Sync
    db.collection('config').doc('whitelist').onSnapshot(doc => {
        if (doc.exists) {
            whitelistEmails = doc.data().emails || [];
            localStorage.setItem(PORTAL_KEYS.WHITELIST, JSON.stringify(whitelistEmails));
            if (window.location.hash === '#portal-teacher') renderWhitelistTab();
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

function isEmailWhitelisted(email) {
    if (!email) return false;
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === TEACHER_EMAIL) return true;
    return whitelistEmails.includes(cleanEmail);
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

function saveWhitelistData() {
    localStorage.setItem(PORTAL_KEYS.WHITELIST, JSON.stringify(whitelistEmails));
    if (db) {
        db.collection('config').doc('whitelist').set({ emails: whitelistEmails }).catch(console.error);
    }
}

const TEACHER_EMAIL = "bryann25067@gmail.com";

/* ==========================================================================
   GOOGLE AUTHENTICATION & SESSION MANAGEMENT
   ========================================================================== */
function handleGoogleSignIn(e) {
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
        e.stopPropagation();
    }

    if (typeof firebase === 'undefined' || !firebase.auth) {
        alert("El SDK de Firebase no se ha cargado. Verifica tu conexión a internet.");
        return;
    }

    if (!auth) {
        auth = firebase.auth();
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    auth.signInWithPopup(provider)
        .then((result) => {
            if (result && result.user) {
                processAuthenticatedGoogleUser(result.user);
            }
        })
        .catch((error) => {
            console.error("Error al iniciar sesión con Google:", error);
            
            if (error.code === 'auth/operation-not-allowed') {
                alert(`⚠️ CONFIGURACIÓN PENDIENTE EN FIREBASE:\nDebes habilitar Google en tu consola de Firebase:\n\n1. Ve a console.firebase.google.com\n2. Entra a Authentication > Métodos de inicio de sesión\n3. Haz clic en "Google" -> Habilitar -> Guardar.`);
            } else if (error.code === 'auth/unauthorized-domain') {
                alert(`⚠️ DOMINIO PENDIENTE EN FIREBASE:\nPara permitir el inicio de sesión desde GitHub Pages, debes agregar tu dominio en Firebase:\n\n1. Ve a Authentication > Configuración (Settings)\n2. En "Dominios autorizados", haz clic en Agregar Dominio\n3. Escribe: ingbans.github.io`);
            } else if (error.code === 'auth/popup-blocked') {
                alert("El navegador bloqueó la ventana emergente de Google. Intentando redirección...");
                auth.signInWithRedirect(provider);
            } else if (error.code !== 'auth/popup-closed-by-user') {
                alert(`Error (${error.code || 'Desconocido'}): ${error.message}`);
            }
        });
}

function processAuthenticatedGoogleUser(user) {
    const email = user.email.toLowerCase().trim();

    // Check if teacher email
    if (email === TEACHER_EMAIL) {
        currentSession = { role: 'teacher', user: { name: 'Prof. Bryan Navas (Admin)', email: TEACHER_EMAIL } };
        localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));
        closePortalModals();
        renderAuthUI();
        alert("¡Bienvenido Profesor Bryan Navas! Acceso concedido al Panel de Administración.");
        window.location.hash = '#portal-teacher';
        return;
    }

    // Check Whitelist Security for Students
    if (!isEmailWhitelisted(email)) {
        user.delete()
            .then(() => {
                console.warn(`Usuario no autorizado eliminado de Firebase Auth: ${email}`);
            })
            .catch(() => {
                auth.signOut();
            });
        alert(`Su correo electrónico no está autorizado para participar en este curso.`);
        return;
    }

    // Check if student already registered
    const existingStudent = registeredStudents.find(s => s.email === email);

    if (existingStudent) {
        // Already registered — log in directly
        currentSession = { role: 'student', user: existingStudent };
        localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));
        closePortalModals();
        renderAuthUI();
        window.location.hash = '#portal-student';
    } else {
        // New student — ask for personal data
        window._pendingGoogleUser = user;
        closePortalModals();
        document.getElementById('student-data-modal-overlay').classList.remove('hidden');
    }
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
    const addWhitelistForm = document.getElementById('add-whitelist-form');
    if (addWhitelistForm) {
        addWhitelistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputVal = document.getElementById('whitelist-input-emails').value;
            addEmailsToWhitelist(inputVal);
            document.getElementById('whitelist-input-emails').value = '';
        });
    }

    const studentDataForm = document.getElementById('student-data-form');
    if (studentDataForm) {
        studentDataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const googleUser = window._pendingGoogleUser;
            if (!googleUser) return;

            const nombre = document.getElementById('sd-nombre').value.trim();
            const apellido = document.getElementById('sd-apellido').value.trim();
            const cedula = document.getElementById('sd-cedula').value.trim();

            if (!nombre || !apellido || !cedula) {
                alert('Por favor completa todos los campos requeridos.');
                return;
            }

            const fullName = `${nombre} ${apellido}`;
            const email = googleUser.email.toLowerCase().trim();

            const newStudent = {
                id: googleUser.uid,
                name: fullName,
                email: email,
                idNumber: cedula,
                authProvider: 'google'
            };

            registeredStudents.push(newStudent);
            localStorage.setItem(PORTAL_KEYS.STUDENTS, JSON.stringify(registeredStudents));

            if (db) {
                db.collection('students').doc(googleUser.uid).set(newStudent, { merge: true });
            }

            currentSession = { role: 'student', user: newStudent };
            localStorage.setItem(PORTAL_KEYS.SESSION, JSON.stringify(currentSession));

            // Close modal and clean up
            document.getElementById('student-data-modal-overlay').classList.add('hidden');
            window._pendingGoogleUser = null;

            renderAuthUI();
            window.location.hash = '#portal-student';
        });
    }
}

function openLoginModal() {
    document.getElementById('portal-modal-overlay').classList.remove('hidden');
    document.getElementById('modal-box-login').classList.remove('hidden');
}

function closePortalModals() {
    document.getElementById('portal-modal-overlay').classList.add('hidden');
}

/* ==========================================================================
   WHITELIST CONTROL FUNCTIONS (TEACHER)
   ========================================================================== */
function addEmailsToWhitelist(inputString) {
    if (!inputString || !inputString.trim()) return;

    const rawList = inputString.split(/[\n,]+/);
    let addedCount = 0;

    rawList.forEach(rawEmail => {
        const clean = rawEmail.trim().toLowerCase();
        if (clean && clean.includes('@') && !whitelistEmails.includes(clean)) {
            whitelistEmails.push(clean);
            addedCount++;
        }
    });

    if (addedCount > 0) {
        saveWhitelistData();
        renderWhitelistTab();
        alert(`¡Se han añadido ${addedCount} correo(s) a la Lista Blanca con éxito!`);
    } else {
        alert("Los correos ingresados ya estaban en la lista o no tenían un formato válido.");
    }
}

function removeEmailFromWhitelist(emailToRemove) {
    if (confirm(`¿Estás seguro de remover ${emailToRemove} de la Lista Blanca?`)) {
        whitelistEmails = whitelistEmails.filter(e => e !== emailToRemove);
        saveWhitelistData();
        renderWhitelistTab();
    }
}

function renderWhitelistTab() {
    const tbody = document.getElementById('teacher-whitelist-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (whitelistEmails.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center" style="padding:2rem; color:var(--text-muted)">No hay restricciones aún. La Lista Blanca está vacía (Cualquier estudiante puede registrarse). Agrega correos arriba para activar la restricción.</td></tr>`;
        return;
    }

    whitelistEmails.forEach(email => {
        const isRegistered = registeredStudents.some(s => s.email === email);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${email}</strong></td>
            <td>
                ${isRegistered 
                    ? '<span class="status-pill status-present"><i class="fa-solid fa-user-check"></i> Registrado</span>' 
                    : '<span class="status-pill status-pending"><i class="fa-solid fa-clock"></i> Pendiente</span>'}
            </td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="removeEmailFromWhitelist('${email}')">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
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
    renderWhitelistTab();
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
        tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding:2rem; color:var(--text-muted)">No hay estudiantes registrados aún.</td></tr>`;
        return;
    }

    registeredStudents.forEach(std => {
        const stdGrades = gradesRecords[std.id] || { ex1: '', ex2: '', ex3: '', lab: '' };

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${std.name}</strong></td>
            <td><code>${std.idNumber}</code></td>
            <td><input type="number" min="0" max="20" placeholder="0-20" class="grade-input" data-student-id="${std.id}" data-exam="ex1" value="${stdGrades.ex1}"></td>
            <td><input type="number" min="0" max="20" placeholder="0-20" class="grade-input" data-student-id="${std.id}" data-exam="ex2" value="${stdGrades.ex2}"></td>
            <td><input type="number" min="0" max="20" placeholder="0-20" class="grade-input" data-student-id="${std.id}" data-exam="ex3" value="${stdGrades.ex3}"></td>
            <td><input type="number" min="0" max="20" placeholder="0-20" class="grade-input" data-student-id="${std.id}" data-exam="lab" value="${stdGrades.lab}"></td>
            <td><strong class="calculated-avg" id="avg_${std.id}">-</strong></td>
            <td><span class="status-pill" id="status_${std.id}">-</span></td>
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
                val = Number(e.target.value);
            }

            if (!gradesRecords[stdId]) gradesRecords[stdId] = { ex1: '', ex2: '', ex3: '', lab: '' };
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
    const theoryVals = [g.ex1, g.ex2, g.ex3].filter(v => v !== '' && v !== null && v !== undefined);
    const avgEl = document.getElementById(`avg_${studentId}`);
    const statusEl = document.getElementById(`status_${studentId}`);
    if (!avgEl) return;

    if (theoryVals.length > 0) {
        const avg = (theoryVals.reduce((a, b) => Number(a) + Number(b), 0) / theoryVals.length);
        avgEl.textContent = `${avg.toFixed(1)} / 20`;
        avgEl.style.color = avg >= 10 ? 'var(--accent)' : 'var(--danger)';

        // Only show final status if all 4 grades are entered
        if (statusEl && theoryVals.length === 3 && g.lab !== '' && g.lab !== null && g.lab !== undefined) {
            const labVal = Number(g.lab);
            const theoryPass = avg >= 10;
            const labPass = labVal >= 10;

            if (theoryPass && labPass) {
                statusEl.textContent = '✅ Aprobado';
                statusEl.className = 'status-pill status-present';
            } else if (theoryPass && !labPass) {
                statusEl.textContent = '❌ Reprobado (Laboratorio)';
                statusEl.className = 'status-pill status-absent';
            } else if (!theoryPass && labPass) {
                statusEl.textContent = '❌ Reprobado (Teoría)';
                statusEl.className = 'status-pill status-absent';
            } else {
                statusEl.textContent = '❌ Reprobado (Teoría y Laboratorio)';
                statusEl.className = 'status-pill status-absent';
            }
        } else if (statusEl) {
            statusEl.textContent = 'Pendiente';
            statusEl.className = 'status-pill status-pending';
        }
    } else {
        avgEl.textContent = '-';
        avgEl.style.color = 'inherit';
        if (statusEl) { statusEl.textContent = '-'; statusEl.className = 'status-pill'; }
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

function purgeNonWhitelistedStudents() {
    const invalidStudents = registeredStudents.filter(s => !isEmailWhitelisted(s.email));

    if (invalidStudents.length === 0) {
        alert("Todos los alumnos actualmente registrados están autorizados en tu Lista Blanca.");
        return;
    }

    if (confirm(`Se han detectado ${invalidStudents.length} registro(s) de prueba no autorizados en la Lista Blanca. ¿Deseas eliminarlos de la nómina ahora?`)) {
        invalidStudents.forEach(std => {
            registeredStudents = registeredStudents.filter(s => s.id !== std.id);
            if (db) {
                db.collection('students').doc(std.id).delete().catch(console.error);
            }
        });
        localStorage.setItem(PORTAL_KEYS.STUDENTS, JSON.stringify(registeredStudents));
        renderTeacherPanel();
        alert("¡Cuentas no autorizadas eliminadas con éxito!");
    }
}

function exportPortalDataJSON() {
    const exportObj = {
        calendar: classCalendar,
        whitelist: whitelistEmails,
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
