/* ==========================================================================
   QUIZ SIMULATOR ENGINE (SELF-ASSESSMENT ONLY)
   ========================================================================== */

const quizBankData = [
    {
        id: "q1",
        moduleId: "m1",
        question: "¿Cuál es la PDU (Unidad de Datos de Protocolo) correspondiente a la Capa 3 (Red) del modelo OSI?",
        options: [
            "Trama (Frame)",
            "Paquete (Packet)",
            "Segmento (Segment)",
            "Bits"
        ],
        correct: 1,
        explanation: "En la Capa 3 (Red), la PDU se denomina Paquete. En Capa 2 es Trama, en Capa 4 es Segmento y en Capa 1 son Bits."
    },
    {
        id: "q2",
        moduleId: "m1",
        question: "¿Cuántas direcciones de host útiles proporciona una subred IPv4 con máscara /28?",
        options: [
            "14",
            "16",
            "30",
            "62"
        ],
        correct: 0,
        explanation: "Una subred /28 deja 4 bits para hosts (32 - 28 = 4). El cálculo es 2^4 - 2 = 16 - 2 = 14 hosts útiles."
    },
    {
        id: "q3",
        moduleId: "m2",
        question: "¿Qué protocolo estándar IEEE se utiliza para el etiquetado (tagging) de tramas en enlaces troncales VLAN?",
        options: [
            "802.11ac",
            "802.3u",
            "802.1Q",
            "802.1X"
        ],
        correct: 2,
        explanation: "El estándar IEEE 802.1Q añade una etiqueta de 4 bytes a la trama Ethernet para identificar el VLAN ID."
    },
    {
        id: "q4",
        moduleId: "m3",
        question: "¿Cómo calcula OSPF la métrica del costo de una interfaz por defecto en routers de red?",
        options: [
            "Conteo de saltos (Hop Count)",
            "100 Mbps / Ancho de Banda de la Interfaz",
            "Retardo + Ancho de banda acumulado",
            "Carga de la línea y confiabilidad"
        ],
        correct: 1,
        explanation: "OSPF calcula el costo dividiendo el ancho de banda de referencia (100 Mbps por defecto) entre el ancho de banda de la interfaz."
    },
    {
        id: "q5",
        moduleId: "m4",
        question: "¿Cuál es la función principal de PAT (Port Address Translation / NAT overload)?",
        options: [
            "Asignar automáticamente la puerta de enlace predeterminada a los clientes",
            "Traducir direcciones MAC a nombres de dominio DNS",
            "Mapear múltiples direcciones IP privadas hacia una sola dirección IP pública utilizando puertos",
            "Cifrar el tráfico de red de punto a punto"
        ],
        correct: 2,
        explanation: "PAT (NAT con sobrecarga) permite que cientos de dispositivos privados compartan una IP pública asignando un número de puerto único a cada sesión."
    },
    {
        id: "q6",
        moduleId: "m5",
        question: "¿Qué sucede al final de cualquier Lista de Control de Acceso (ACL) si un paquete no coincide con ninguna regla explícita?",
        options: [
            "El paquete es permitido por defecto (permit ip any any)",
            "El paquete es reenviado a la VLAN nativa",
            "El paquete es descartado por la regla implícita (deny ip any any)",
            "El paquete se envía a la interfaz de administración"
        ],
        correct: 2,
        explanation: "Al final de toda ACL existe un 'deny ip any any' implícito invisible que descarta cualquier tráfico no permitido explícitamente."
    }
];

let currentQuizState = {
    activeQuestions: [],
    currentIndex: 0,
    score: 0,
    selectedOption: null,
    answersLog: []
};

function initQuizEngine() {
    const setupContainer = document.getElementById('quiz-setup');
    const moduleSelector = document.getElementById('quiz-module-selector');
    const startBtn = document.getElementById('start-quiz-btn');

    if (!moduleSelector || !startBtn) return;

    // Render module options
    moduleSelector.innerHTML = `
        <div class="info-alert" style="margin-bottom: 1.5rem; background-color: rgba(14, 165, 233, 0.1); border-left: 4px solid var(--primary); padding: 1rem; border-radius: 8px;">
            <i class="fa-solid fa-circle-info" style="font-size: 1.2rem; color: var(--primary);"></i>
            <span><strong>Nota Importante:</strong> Este quiz es una herramienta de autoevaluación formativa para medir tus capacidades y <strong>NO tiene ninguna influencia sobre la nota oficial del examen</strong>. Puedes realizarlo cuantas veces quieras.</span>
        </div>
        <div class="quiz-mod-option selected" data-mod="all">
            <i class="fa-solid fa-layer-group"></i>
            <div>
                <strong>Examen General de Redes</strong>
                <small style="display:block; color:var(--text-muted)">Preguntas combinadas de todos los temas</small>
            </div>
        </div>
    `;

    startBtn.addEventListener('click', () => {
        startQuizSession('all');
    });

    document.getElementById('next-question-btn').addEventListener('click', nextQuizQuestion);
    document.getElementById('restart-quiz-btn').addEventListener('click', resetQuizView);
}

function startQuizSession(modId) {
    let questions = [...quizBankData];

    currentQuizState = {
        activeQuestions: questions,
        currentIndex: 0,
        score: 0,
        selectedOption: null,
        answersLog: []
    };

    document.getElementById('quiz-setup').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-active').classList.remove('hidden');

    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    const q = currentQuizState.activeQuestions[currentQuizState.currentIndex];
    const total = currentQuizState.activeQuestions.length;

    document.getElementById('quiz-question-num').textContent = `Pregunta ${currentQuizState.currentIndex + 1} de ${total}`;
    document.getElementById('quiz-question-text').textContent = q.question;

    const optionsBox = document.getElementById('quiz-options');
    optionsBox.innerHTML = '';

    const feedbackBox = document.getElementById('quiz-feedback');
    feedbackBox.classList.add('hidden');

    const nextBtn = document.getElementById('next-question-btn');
    nextBtn.disabled = true;

    q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<i class="fa-regular fa-circle"></i> <span>${optText}</span>`;
        btn.addEventListener('click', () => handleOptionSelection(idx));
        optionsBox.appendChild(btn);
    });
}

function handleOptionSelection(optionIndex) {
    const q = currentQuizState.activeQuestions[currentQuizState.currentIndex];
    const optionsBox = document.getElementById('quiz-options');
    const optionBtns = optionsBox.querySelectorAll('.quiz-option-btn');

    // Disable all options
    optionBtns.forEach(btn => btn.disabled = true);

    const isCorrect = (optionIndex === q.correct);
    if (isCorrect) {
        currentQuizState.score++;
        optionBtns[optionIndex].classList.add('correct');
        optionBtns[optionIndex].querySelector('i').className = 'fa-solid fa-circle-check';
    } else {
        optionBtns[optionIndex].classList.add('wrong');
        optionBtns[optionIndex].querySelector('i').className = 'fa-solid fa-circle-xmark';
        
        // Highlight correct answer
        optionBtns[q.correct].classList.add('correct');
        optionBtns[q.correct].querySelector('i').className = 'fa-solid fa-circle-check';
    }

    // Show feedback
    const feedbackBox = document.getElementById('quiz-feedback');
    const statusText = document.getElementById('feedback-status');
    const explanation = document.getElementById('feedback-explanation');

    feedbackBox.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}`;
    statusText.textContent = isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta';
    explanation.textContent = q.explanation;
    feedbackBox.classList.remove('hidden');

    document.getElementById('next-question-btn').disabled = false;
}

function nextQuizQuestion() {
    currentQuizState.currentIndex++;

    if (currentQuizState.currentIndex < currentQuizState.activeQuestions.length) {
        renderCurrentQuestion();
    } else {
        finishQuizSession();
    }
}

function finishQuizSession() {
    document.getElementById('quiz-active').classList.add('hidden');
    const resultCard = document.getElementById('quiz-result');
    resultCard.classList.remove('hidden');

    const total = currentQuizState.activeQuestions.length;
    const percent = Math.round((currentQuizState.score / total) * 100);

    document.getElementById('result-score-percent').textContent = `${percent}%`;
    document.getElementById('result-score-text').textContent = `Respondiste correctamente ${currentQuizState.score} de ${total} preguntas. (Autoevaluación formativa sin peso en exámenes).`;

    const iconCircle = document.getElementById('result-icon-circle');
    const title = document.getElementById('result-title');

    if (percent >= 70) {
        title.textContent = "¡Excelente Trabajo en tu Práctica!";
        iconCircle.style.background = "linear-gradient(135deg, #10b981, #059669)";
    } else {
        title.textContent = "Sigue Practicando con los Quizzes";
        iconCircle.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
    }

    // Record quiz attempt for student if logged in
    if (typeof recordStudentQuizAttempt === 'function' && currentSession && currentSession.role === 'student') {
        recordStudentQuizAttempt(percent);
    }
}

function resetQuizView() {
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-setup').classList.remove('hidden');
}
