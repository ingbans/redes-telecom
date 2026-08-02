/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (EXACTLY 12 TOTAL WEEKS WITH 3 EXAMS)
   ========================================================================== */

const courseTopicsData = [
    {
        id: "w1-osi-tcpip",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Semanas 1-4)",
        weekNumber: "Semana 1",
        difficulty: "Principiante",
        title: "Semana 1: Arquitecturas de Red (OSI vs TCP/IP)",
        duration: "4 Horas",
        description: "Fundamentos de telecomunicaciones, pila de protocolos de 7 y 4 capas, unidades de datos (PDU) y encapsulamiento.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios Conceptuales</span>
            </div>

            <h2><i class="fa-solid fa-layer-group"></i> Objetivos Teóricos de la Semana 1</h2>
            <p>Comprender cómo los datos se transmiten a través de una red dividiendo las funciones en capas independientes según los modelos de referencia de la industria.</p>
        `
    },
    {
        id: "w2-physical-datalink",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Semanas 1-4)",
        weekNumber: "Semana 2",
        difficulty: "Principiante",
        title: "Semana 2: Medios de Transmisión y Capa de Enlace",
        duration: "4 Horas",
        description: "Cables UTP (Categorías), Fibra Óptica, enlaces Wi-Fi y trama Ethernet con direccionamiento MAC.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Análisis</span>
            </div>

            <h2><i class="fa-solid fa-cable-car"></i> Objetivos Teóricos de la Semana 2</h2>
            <p>Identificar las propiedades físicas de los medios guiados y no guiados, y analizar la estructura de la dirección física de 48 bits (Dirección MAC).</p>
        `
    },
    {
        id: "w3-ipv4-subnetting",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Semanas 1-4)",
        weekNumber: "Semana 3",
        difficulty: "Intermedio",
        title: "Semana 3: Direccionamiento IPv4 y Subnetting FLSM",
        duration: "4 Horas",
        description: "Estructura IPv4 de 32 bits, conversión binaria, clases A/B/C, máscaras CIDR (/24 a /30) y cálculo de subredes.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 1.5h Teoría | 2.5h Taller Intensivo de Subnetting</span>
            </div>

            <h2><i class="fa-solid fa-calculator"></i> Objetivos Teóricos de la Semana 3</h2>
            <p>Dominar la conversión matemática binaria y calcular la dirección de Red, Broadcast y rango útil de hosts por subred.</p>
        `
    },
    {
        id: "w4-examen-1",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Semanas 1-4)",
        weekNumber: "Semana 4",
        difficulty: "Evaluación",
        title: "Semana 4: 📝 PRIMER EXAMEN PARCIAL",
        duration: "4 Horas",
        description: "Evaluación teórica y ejercicios escritos correspondientes a los contenidos de las Semanas 1, 2 y 3.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.2); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Parcial 1</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-file-pen"></i> Contenido del Examen 1</h2>
            <p>Evaluación de conceptos OSI/TCP-IP, tramas Ethernet, direcciones MAC y ejercicios de cálculo de Subnetting IPv4.</p>
        `
    },
    {
        id: "w5-vlans-routing",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Semanas 5-8)",
        weekNumber: "Semana 5",
        difficulty: "Intermedio",
        title: "Semana 5: VLANs, Troncales 802.1Q e Inter-VLAN Routing",
        duration: "4 Horas",
        description: "Segmentación lógica en switches, etiquetado 802.1Q, VLAN nativa y enrutamiento Router-on-a-Stick.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Diseño Lógico</span>
            </div>

            <h2><i class="fa-solid fa-diagram-project"></i> Objetivos Teóricos de la Semana 5</h2>
            <p>Comprender la segmentación lógica de tráfico y la necesidad de etiquetado 802.1Q para atravesar enlaces troncales.</p>
        `
    },
    {
        id: "w6-stp-static-routes",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Semanas 5-8)",
        weekNumber: "Semana 6",
        difficulty: "Intermedio",
        title: "Semana 6: Spanning Tree Protocol (STP) y Rutas Estáticas",
        duration: "4 Horas",
        description: "Prevención de bucles de Capa 2, elección de Root Bridge (BID) y operación de la tabla de enrutamiento estático.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h STP / Rutas Estáticas | 2h Ejercicios</span>
            </div>

            <h2><i class="fa-solid fa-rotate"></i> Objetivos Teóricos de la Semana 6</h2>
            <p>Analizar la prevención de bucles en capa 2 y las reglas de selección de ruta por el prefijo más largo (LPM).</p>
        `
    },
    {
        id: "w7-ospf-dynamic",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Semanas 5-8)",
        weekNumber: "Semana 7",
        difficulty: "Avanzado",
        title: "Semana 7: Enrutamiento Dinámico OSPFv2 (Área 0)",
        duration: "4 Horas",
        description: "Protocolos Link-State, métrica de costo OSPF, paquetes Hello, adyacencias y algoritmo Dijkstra (SPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo OSPF | 2h Ejercicios de Métrica de Costo</span>
            </div>

            <h2><i class="fa-solid fa-diagram-next"></i> Objetivos Teóricos de la Semana 7</h2>
            <p>Estudiar la construcción de la base de datos de estado de enlace (LSDB) y el cálculo de rutas más cortas.</p>
        `
    },
    {
        id: "w8-examen-2",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Semanas 5-8)",
        weekNumber: "Semana 8",
        difficulty: "Evaluación",
        title: "Semana 8: 📝 SEGUNDO EXAMEN PARCIAL",
        duration: "4 Horas",
        description: "Evaluación teórica correspondiente a los contenidos de las Semanas 5, 6 y 7 (VLANs, STP, Rutas Estáticas y OSPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.2); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Parcial 2</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-file-pen"></i> Contenido del Examen 2</h2>
            <p>Evaluación de conceptos de VLANs, troncales 802.1Q, algoritmos de Spanning Tree, enrutamiento estático y métrica de costo OSPF.</p>
        `
    },
    {
        id: "w9-services-security",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad, IPv6 y SDN (Semanas 9-12)",
        weekNumber: "Semana 9",
        difficulty: "Intermedio",
        title: "Semana 9: Servicios IP (DHCP, NAT/PAT) y Seguridad con ACLs",
        duration: "4 Horas",
        description: "Asignación dinámica DHCP (DORA), traducción PAT (NAT overload) y filtrado de paquetes con ACLs Estándar y Extendidas.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Lógica de ACLs</span>
            </div>

            <h2><i class="fa-solid fa-shield-halved"></i> Objetivos Teóricos de la Semana 9</h2>
            <p>Comprender la traducción de direcciones PAT y el diseño de reglas de control de acceso en Capas 3 y 4.</p>
        `
    },
    {
        id: "w10-ipv6-fundamentals",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad, IPv6 y SDN (Semanas 9-12)",
        weekNumber: "Semana 10",
        difficulty: "Avanzado",
        title: "Semana 10: Fundamentos de IPv6 y Autoconfiguración SLAAC",
        duration: "4 Horas",
        description: "Estructura de 128 bits en hexadecimal, direcciones Global Unicast vs Link-Local y autoconfiguración SLAAC.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría Hexadecimal | 2h Ejercicios de Compresión de Ceros</span>
            </div>

            <h2><i class="fa-solid fa-globe"></i> Objetivos Teóricos de la Semana 10</h2>
            <p>Dominar la notación hexadecimal de IPv6, reglas de simplificación de ceros y autoconfiguración asistida por ICMPv6.</p>
        `
    },
    {
        id: "w11-sdn-json",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad, IPv6 y SDN (Semanas 9-12)",
        weekNumber: "Semana 11",
        difficulty: "Avanzado",
        title: "Semana 11: Arquitectura SDN, APIs REST y Formato JSON",
        duration: "4 Horas",
        description: "Separación del Plano de Control y Datos, controladores SDN, arquitectura de APIs REST y parsing de datos JSON.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Conceptos SDN | 2h Ejercicios de Análisis JSON</span>
            </div>

            <h2><i class="fa-solid fa-robot"></i> Objetivos Teóricos de la Semana 11</h2>
            <p>Comprender la evolución hacia las redes definidas por software y la estructura de datos jerárquica en formato JSON.</p>
        `
    },
    {
        id: "w12-examen-final",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad, IPv6 y SDN (Semanas 9-12)",
        weekNumber: "Semana 12",
        difficulty: "Evaluación",
        title: "Semana 12: 🎓 TERCER EXAMEN PARCIAL / EXAMEN FINAL",
        duration: "4 Horas",
        description: "Evaluación final integradora (Semanas 9, 10 y 11 + Caso Teórico Sintético) y cierre de actas.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.25); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Final Integrador</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-graduation-cap"></i> Contenido del Examen Final</h2>
            <p>Evaluación de Servicios IP, ACLs, IPv6, SDN y caso teórico integrador de diseño de redes de telecomunicaciones.</p>
        `
    }
];
