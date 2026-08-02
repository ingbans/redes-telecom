/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (15 WEEKS WITH 3 PARCIAL EXAMS)
   ========================================================================== */

const courseTopicsData = [
    {
        id: "w1-osi-tcpip",
        moduleId: "corte1",
        moduleName: "Corte 1: Fundamentos y Subnetting (Semanas 1-5)",
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

            <h2><i class="fa-solid fa-clock"></i> Estructura de la Clase Teórica (4 Horas)</h2>
            <ul>
                <li><strong>Bloque 1 (2 Horas):</strong> Introducción a redes LAN/WAN, Modelo OSI (Capas 1-7) y Modelo TCP/IP.</li>
                <li><strong>Receso (15 min).</strong></li>
                <li><strong>Bloque 2 (1h 45 min):</strong> Proceso de Encapsulamiento de PDUs (Datos, Segmento, Paquete, Trama, Bits) y Ejercicios de Asociación.</li>
            </ul>
        `
    },
    {
        id: "w2-physical-datalink",
        moduleId: "corte1",
        moduleName: "Corte 1: Fundamentos y Subnetting (Semanas 1-5)",
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
        id: "w3-ipv4-intro",
        moduleId: "corte1",
        moduleName: "Corte 1: Fundamentos y Subnetting (Semanas 1-5)",
        weekNumber: "Semana 3",
        difficulty: "Principiante",
        title: "Semana 3: Direccionamiento IPv4 Básico y Binario",
        duration: "4 Horas",
        description: "Estructura de 32 bits de IPv4, conversión binario-decimal, clases tradicionales (A, B, C) y máscaras por defecto.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios en Pizarra</span>
            </div>

            <h2><i class="fa-solid fa-calculator"></i> Objetivos Teóricos de la Semana 3</h2>
            <p>Dominar la conversión matemática de octetos binarios y diferenciar la porción de red y host en direcciones IPv4 públicas y privadas (RFC 1918).</p>
        `
    },
    {
        id: "w4-subnetting-flsm",
        moduleId: "corte1",
        moduleName: "Corte 1: Fundamentos y Subnetting (Semanas 1-5)",
        weekNumber: "Semana 4",
        difficulty: "Intermedio",
        title: "Semana 4: Subnetting IPv4 de Longitud Fija (FLSM)",
        duration: "4 Horas",
        description: "Subdivisión de redes IP, préstamos de bits, cálculo de broadcast, primera y última IP útil con notación CIDR.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 1.5h Teoría | 2.5h Taller de Subnetting</span>
            </div>

            <h2><i class="fa-solid fa-network-wired"></i> Objetivos Teóricos de la Semana 4</h2>
            <p>Dividir una red principal en subredes iguales para optimizar los dominios de broadcast y calcular rangos válidos.</p>
        `
    },
    {
        id: "w5-examen-1",
        moduleId: "corte1",
        moduleName: "Corte 1: Fundamentos y Subnetting (Semanas 1-5)",
        weekNumber: "Semana 5",
        difficulty: "Evaluación",
        title: "Semana 5: 📝 PRIMER EXAMEN PARCIAL (Evaluación 1)",
        duration: "4 Horas",
        description: "Evaluación teórica y práctica escrita correspondiente a los contenidos de las Semanas 1 a 4.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.2); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Parcial Scored</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-file-pen"></i> Estructura del Primer Examen Parcial</h2>
            <ul>
                <li><strong>Parte A (40%):</strong> Selección Múltiple y Preguntas Teóricas sobre Modelo OSI/TCP-IP, Capa Física y Enlace.</li>
                <li><strong>Parte B (60%):</strong> Ejercicios Teóricos de Subnetting IPv4 (FLSM), conversión binaria y cálculo de direcciones de red/broadcast.</li>
            </ul>
        `
    },
    {
        id: "w6-vlans-trunking",
        moduleId: "corte2",
        moduleName: "Corte 2: Conmutación, Enrutamiento y Servicios (Semanas 6-10)",
        weekNumber: "Semana 6",
        difficulty: "Intermedio",
        title: "Semana 6: VLANs, Troncales 802.1Q e Inter-VLAN Routing",
        duration: "4 Horas",
        description: "Segmentación lógica en switches, etiquetado 802.1Q, VLAN nativa y enrutamiento Router-on-a-Stick.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Diseño Lógico</span>
            </div>

            <h2><i class="fa-solid fa-diagram-project"></i> Objetivos Teóricos de la Semana 6</h2>
            <p>Comprender la segmentación lógica de tráfico en la capa de acceso y la necesidad de etiquetado 802.1Q para atravesar enlaces troncales.</p>
        `
    },
    {
        id: "w7-stp-spanning-tree",
        moduleId: "corte2",
        moduleName: "Corte 2: Conmutación, Enrutamiento y Servicios (Semanas 6-10)",
        weekNumber: "Semana 7",
        difficulty: "Intermedio",
        title: "Semana 7: Prevención de Bucles con Spanning Tree (STP)",
        duration: "4 Horas",
        description: "Tormentas de broadcast, bucles de capa 2, elección del Root Bridge (BID) y estados de puertos.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo STP | 2h Análisis de Topologías</span>
            </div>

            <h2><i class="fa-solid fa-rotate"></i> Objetivos Teóricos de la Semana 7</h2>
            <p>Analizar el algoritmo determinista de Spanning Tree para calcular qué puerto se bloquea lógicamente ante la redundancia física.</p>
        `
    },
    {
        id: "w8-static-routing",
        moduleId: "corte2",
        moduleName: "Corte 2: Conmutación, Enrutamiento y Servicios (Semanas 6-10)",
        weekNumber: "Semana 8",
        difficulty: "Intermedio",
        title: "Semana 8: Tabla de Enrutamiento y Rutas Estáticas",
        duration: "4 Horas",
        description: "Operación de la tabla de enrutamiento IP, coincidencia de prefijo más largo, rutas estáticas y rutas por defecto.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Selección de Ruta</span>
            </div>

            <h2><i class="fa-solid fa-route"></i> Objetivos Teóricos de la Semana 8</h2>
            <p>Comprender cómo los routers toman decisiones de reenvío examinando la dirección IP destino y la distancia administrativa.</p>
        `
    },
    {
        id: "w9-ospf-dynamic",
        moduleId: "corte2",
        moduleName: "Corte 2: Conmutación, Enrutamiento y Servicios (Semanas 6-10)",
        weekNumber: "Semana 9",
        difficulty: "Avanzado",
        title: "Semana 9: Enrutamiento Dinámico OSPFv2 (Área 0)",
        duration: "4 Horas",
        description: "Protocolos Link-State, métrica del costo OSPF, paquetes Hello, adyacencias y algoritmo Dijkstra (SPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo OSPF | 2h Ejercicios de Métrica de Costo</span>
            </div>

            <h2><i class="fa-solid fa-diagram-next"></i> Objetivos Teóricos de la Semana 9</h2>
            <p>Estudiar la construcción de la base de datos de estado de enlace (LSDB) y el cálculo de mapas de red mediante Dijkstra.</p>
        `
    },
    {
        id: "w10-examen-2",
        moduleId: "corte2",
        moduleName: "Corte 2: Conmutación, Enrutamiento y Servicios (Semanas 6-10)",
        weekNumber: "Semana 10",
        difficulty: "Evaluación",
        title: "Semana 10: 📝 SEGUNDO EXAMEN PARCIAL (Evaluación 2)",
        duration: "4 Horas",
        description: "Evaluación escrita correspondiente a los contenidos de las Semanas 6 a 9 (VLANs, STP, Enrutamiento Estático y OSPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.2); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Parcial Scored</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-file-pen"></i> Estructura del Segundo Examen Parcial</h2>
            <ul>
                <li><strong>Parte A (40%):</strong> Preguntas Teóricas sobre VLANs, etiquetado 802.1Q, algoritmos de STP y conceptos de OSPF.</li>
                <li><strong>Parte B (60%):</strong> Ejercicios prácticos de análisis de tablas de enrutamiento, determinación de bloqueos STP y cálculo de métricas OSPF.</li>
            </ul>
        `
    },
    {
        id: "w11-dhcp-nat-services",
        moduleId: "corte3",
        moduleName: "Corte 3: Servicios, Seguridad, IPv6 y SDN (Semanas 11-15)",
        weekNumber: "Semana 11",
        difficulty: "Intermedio",
        title: "Semana 11: Servicios IP (DHCP, NAT/PAT y SSH)",
        duration: "4 Horas",
        description: "Servidor y cliente DHCP (DORA), traducción de direcciones NAT/PAT con sobrecarga y administración remota SSH.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Análisis de Flujo NAT/PAT</span>
            </div>

            <h2><i class="fa-solid fa-server"></i> Objetivos Teóricos de la Semana 11</h2>
            <p>Comprender los procesos de asignación de direcciones automáticas y la conservación de IPv4 mediante traducción PAT.</p>
        `
    },
    {
        id: "w12-security-acls",
        moduleId: "corte3",
        moduleName: "Corte 3: Servicios, Seguridad, IPv6 y SDN (Semanas 11-15)",
        weekNumber: "Semana 12",
        difficulty: "Avanzado",
        title: "Semana 12: Seguridad en Redes y Listas de Control de Acceso (ACLs)",
        duration: "4 Horas",
        description: "Filtrado de paquetes en capas 3 y 4 mediante Listas de Control de Acceso (ACLs Estándar y Extendidas) y Deny Implícito.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría ACLs | 2h Ejercicios de Lógica de Filtrado</span>
            </div>

            <h2><i class="fa-solid fa-shield-halved"></i> Objetivos Teóricos de la Semana 12</h2>
            <p>Diseñar reglas lógicas de control de acceso evaluando direcciones origen/destino y números de puerto TCP/UDP.</p>
        `
    },
    {
        id: "w13-ipv6-fundamentals",
        moduleId: "corte3",
        moduleName: "Corte 3: Servicios, Seguridad, IPv6 y SDN (Semanas 11-15)",
        weekNumber: "Semana 13",
        difficulty: "Avanzado",
        title: "Semana 13: Fundamentos de IPv6 y Autoconfiguración",
        duration: "4 Horas",
        description: "Estructura de 128 bits en hexadecimal, tipos de direcciones (Global Unicast, Link-Local) y autoconfiguración SLAAC.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría Hexadecimal | 2h Ejercicios de Compresión de Ceros</span>
            </div>

            <h2><i class="fa-solid fa-globe"></i> Objetivos Teóricos de la Semana 13</h2>
            <p>Dominar la notación hexadecimal de IPv6, reglas de simplificación de ceros y autoconfiguración dinámicamente asistida por ICMPv6.</p>
        `
    },
    {
        id: "w14-sdn-automation",
        moduleId: "corte3",
        moduleName: "Corte 3: Servicios, Seguridad, IPv6 y SDN (Semanas 11-15)",
        weekNumber: "Semana 14",
        difficulty: "Avanzado",
        title: "Semana 14: Arquitectura SDN, APIs REST y JSON",
        duration: "4 Horas",
        description: "Separación del Plano de Control y Datos, controladores SDN, formato de datos JSON y automatización básica.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Conceptos SDN | 2h Ejercicios de Análisis JSON</span>
            </div>

            <h2><i class="fa-solid fa-robot"></i> Objetivos Teóricos de la Semana 14</h2>
            <p>Comprender la evolución hacia las redes definidas por software, arquitectura de planos y estructuras de datos jerárquicas.</p>
        `
    },
    {
        id: "w15-examen-final",
        moduleId: "corte3",
        moduleName: "Corte 3: Servicios, Seguridad, IPv6 y SDN (Semanas 11-15)",
        weekNumber: "Semana 15",
        difficulty: "Evaluación",
        title: "Semana 15: 🎓 TERCER EXAMEN PARCIAL / EXAMEN FINAL",
        duration: "4 Horas",
        description: "Evaluación acumulativa final escrita (Corte 3 y conceptos acumulados del semestre) y entrega de calificaciones finales.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.25); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Final Integrador</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-graduation-cap"></i> Estructura del Examen Final</h2>
            <ul>
                <li><strong>Parte A (30%):</strong> Reactivos teóricos sobre Servicios IP, ACLs, IPv6 y SDN.</li>
                <li><strong>Parte B (70%):</strong> Caso Integrador Teórico global que abarca desde diseño de Subnetting hasta filtrado de seguridad en la red.</li>
            </ul>
        `
    }
];
