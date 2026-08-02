/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (12 WEEKS INSTRUCTION + 3 WEEKS EVALUATION)
   ========================================================================== */

const courseTopicsData = [
    {
        id: "w1-osi-tcpip",
        moduleId: "fase1",
        moduleName: "Fase 1: Fundamentos y Capa Física/Enlace",
        weekNumber: "Semana 1",
        difficulty: "Principiante",
        title: "Semana 1: Arquitecturas de Red (OSI vs TCP/IP)",
        duration: "4 Horas",
        description: "Fundamentos de telecomunicaciones, pila de protocolos de 7 y 4 capas, unidades de datos (PDU) y encapsulamiento.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Laboratorio</span>
            </div>

            <h2><i class="fa-solid fa-layer-group"></i> Objetivos de la Semana 1</h2>
            <p>Comprender cómo los datos se transmiten a través de una red dividiendo las funciones en capas independientes según los modelos de referencia de la industria.</p>

            <h2><i class="fa-solid fa-clock"></i> Estructura de la Clase (4 Horas)</h2>
            <ul>
                <li><strong>Bloque 1 (90 min):</strong> Introducción a redes LAN/WAN, Modelo OSI (Capas 1-7) y Modelo TCP/IP.</li>
                <li><strong>Receso (15 min).</strong></li>
                <li><strong>Bloque 2 (45 min):</strong> Proceso de Encapsulamiento y Desencapsulamiento de PDUs (Datos, Segmento, Paquete, Trama, Bits).</li>
                <li><strong>Bloque 3 (90 min - Lab):</strong> Captura de paquetes en vivo con Wireshark para analizar tramas Ethernet e IP.</li>
            </ul>
        `
    },
    {
        id: "w2-physical-datalink",
        moduleId: "fase1",
        moduleName: "Fase 1: Fundamentos y Capa Física/Enlace",
        weekNumber: "Semana 2",
        difficulty: "Principiante",
        title: "Semana 2: Medios de Transmisión y Capa de Enlace",
        duration: "4 Horas",
        description: "Cables UTP (Categorías), Fibra Óptica, enlaces Wi-Fi y trama Ethernet con direccionamiento MAC.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Práctica Cableado/CLI</span>
            </div>

            <h2><i class="fa-solid fa-cable-car"></i> Objetivos de la Semana 2</h2>
            <p>Identificar las propiedades físicas de los medios guiados y no guiados, y analizar el direccionamiento físico de 48 bits (Dirección MAC).</p>

            <h2><i class="fa-solid fa-clock"></i> Estructura de la Clase (4 Horas)</h2>
            <ul>
                <li><strong>Bloque 1 (90 min):</strong> Código de colores T568A/T568B, fibra monomodo vs multimodo, estándar Wi-Fi 802.11.</li>
                <li><strong>Receso (15 min).</strong></li>
                <li><strong>Bloque 2 (45 min):</strong> Formato de trama Ethernet II y tabla MAC (CAM Table) de los switches.</li>
                <li><strong>Bloque 3 (90 min - Lab):</strong> Configuración inicial de hostname y passwords en la CLI de un switch.</li>
            </ul>
        `
    },
    {
        id: "w3-ipv4-intro",
        moduleId: "fase1",
        moduleName: "Fase 1: Fundamentos y Capa Física/Enlace",
        weekNumber: "Semana 3",
        difficulty: "Principiante",
        title: "Semana 3: Direccionamiento IPv4 Básico y Binario",
        duration: "4 Horas",
        description: "Estructura de 32 bits de IPv4, conversión binario-decimal, clases tradicionales (A, B, C) y máscaras por defecto.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2.5h Matemática Binaria | 1.5h Lab IP</span>
            </div>

            <h2><i class="fa-solid fa-calculator"></i> Objetivos de la Semana 3</h2>
            <p>Dominar la conversión matemática de 8 octetos binarios y diferenciar la porción de red y host en direcciones IPv4 públicas y privadas (RFC 1918).</p>
        `
    },
    {
        id: "w4-subnetting-flsm",
        moduleId: "fase2",
        moduleName: "Fase 2: Subnetting y Conmutación en Capa 2",
        weekNumber: "Semana 4",
        difficulty: "Intermedio",
        title: "Semana 4: Subnetting IPv4 de Longitud Fija (FLSM)",
        duration: "4 Horas",
        description: "Subdivisión de redes IP, préstamos de bits, cálculo de broadcast, primera y última IP útil con notación CIDR.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Ejercicios en Pizarra | 2h Lab Subredes</span>
            </div>

            <h2><i class="fa-solid fa-network-wired"></i> Objetivos de la Semana 4</h2>
            <p>Dividir una red principal en subredes iguales para optimizar los dominios de broadcast y prevenir la saturación de tráfico.</p>
        `
    },
    {
        id: "w5-vlans-trunking",
        moduleId: "fase2",
        moduleName: "Fase 2: Subnetting y Conmutación en Capa 2",
        weekNumber: "Semana 5",
        difficulty: "Intermedio",
        title: "Semana 5: VLANs, Troncales 802.1Q e Inter-VLAN Routing",
        duration: "4 Horas",
        description: "Segmentación lógica en switches, etiquetado 802.1Q, VLAN nativa y enrutamiento con subinterfaces (Router-on-a-Stick).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 1.5h Teoría | 2.5h Lab de VLANs en CLI</span>
            </div>

            <h2><i class="fa-solid fa-diagram-project"></i> Objetivos de la Semana 5</h2>
            <p>Crear y aislar departamentos mediante VLANs en switches de capa 2 y permitir comunicación mediante un router central.</p>
        `
    },
    {
        id: "w6-stp-spanning-tree",
        moduleId: "fase2",
        moduleName: "Fase 2: Subnetting y Conmutación en Capa 2",
        weekNumber: "Semana 6",
        difficulty: "Intermedio",
        title: "Semana 6: Prevención de Bucles con Spanning Tree (STP)",
        duration: "4 Horas",
        description: "Tormentas de broadcast, bucles de capa 2, elección del Root Bridge (BID) y estados de puertos (Blocking, Forwarding).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo STP | 2h Lab Redundancia</span>
            </div>

            <h2><i class="fa-solid fa-rotate"></i> Objetivos de la Semana 6</h2>
            <p>Comprender cómo STP mantiene la redundancia física entre switches mientras bloquea rutas lógicas redundantes para evitar bucles.</p>
        `
    },
    {
        id: "w7-static-routing",
        moduleId: "fase3",
        moduleName: "Fase 3: Enrutamiento IP y Servicios de Red",
        weekNumber: "Semana 7",
        difficulty: "Intermedio",
        title: "Semana 7: Tabla de Enrutamiento y Rutas Estáticas",
        duration: "4 Horas",
        description: "Operación de la tabla de enrutamiento IP, coincidencia de prefijo más largo, rutas estáticas por defecto y flotantes.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 1.5h Conceptos | 2.5h Lab Enrutamiento</span>
            </div>

            <h2><i class="fa-solid fa-route"></i> Objetivos de la Semana 7</h2>
            <p>Configurar manualmente rutas estáticas en routers para interconectar múltiples redes distantes en la CLI.</p>
        `
    },
    {
        id: "w8-ospf-dynamic",
        moduleId: "fase3",
        moduleName: "Fase 3: Enrutamiento IP y Servicios de Red",
        weekNumber: "Semana 8",
        difficulty: "Avanzado",
        title: "Semana 8: Enrutamiento Dinámico OSPFv2 (Área 0)",
        duration: "4 Horas",
        description: "Protocolo Link-State OSPFv2, métrica del costo, paquetes Hello, adyacencia de vecinos y algoritmo Dijkstra (SPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo OSPF | 2h Lab Multi-Router</span>
            </div>

            <h2><i class="fa-solid fa-diagram-next"></i> Objetivos de la Semana 8</h2>
            <p>Implementar enrutamiento dinámico automatizado entre múltiples routers mediante el protocolo estándar abierto OSPFv2.</p>
        `
    },
    {
        id: "w9-dhcp-nat-services",
        moduleId: "fase3",
        moduleName: "Fase 3: Enrutamiento IP y Servicios de Red",
        weekNumber: "Semana 9",
        difficulty: "Intermedio",
        title: "Semana 9: Servicios IP (DHCP, NAT/PAT y SSH)",
        duration: "4 Horas",
        description: "Servidor y cliente DHCP (DORA), traducción de direcciones NAT/PAT con sobrecarga y administración remota SSH.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 1.5h Teoría | 2.5h Lab Servicios IP</span>
            </div>

            <h2><i class="fa-solid fa-server"></i> Objetivos de la Semana 9</h2>
            <p>Asignar direcciones dinámicas a usuarios finales y habilitar traducción PAT para permitir salida a Internet de redes privadas.</p>
        `
    },
    {
        id: "w10-security-acls",
        moduleId: "fase4",
        moduleName: "Fase 4: Seguridad, IPv6 y Tendencias",
        weekNumber: "Semana 10",
        difficulty: "Avanzado",
        title: "Semana 10: Seguridad en Redes y ACLs",
        duration: "4 Horas",
        description: "Filtrado de paquetes en capa 3 y 4 mediante Listas de Control de Acceso (ACLs Estándar y Extendidas) y Deny Implícito.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Lógica ACLs | 2h Lab Filtrado</span>
            </div>

            <h2><i class="fa-solid fa-shield-halved"></i> Objetivos de la Semana 10</h2>
            <p>Crear reglas de seguridad para restringir accesos no autorizados a puertos específicos (HTTP/SSH/ICMP) en la red.</p>
        `
    },
    {
        id: "w11-ipv6-fundamentals",
        moduleId: "fase4",
        moduleName: "Fase 4: Seguridad, IPv6 y Tendencias",
        weekNumber: "Semana 11",
        difficulty: "Avanzado",
        title: "Semana 11: Fundamentos de IPv6 y Autoconfiguración",
        duration: "4 Horas",
        description: "Estructura de 128 bits en hexadecimal, tipos de direcciones (Global Unicast, Link-Local) y autoconfiguración SLAAC.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Notación Hex | 2h Lab Direccionamiento IPv6</span>
            </div>

            <h2><i class="fa-solid fa-globe"></i> Objetivos de la Semana 11</h2>
            <p>Comprender la transición a IPv6, abreviación de ceros contiguos y asignación de direcciones Link-Local.</p>
        `
    },
    {
        id: "w12-sdn-automation",
        moduleId: "fase4",
        moduleName: "Fase 4: Seguridad, IPv6 y Tendencias",
        weekNumber: "Semana 12",
        difficulty: "Avanzado",
        title: "Semana 12: Arquitectura SDN, APIs REST y JSON",
        duration: "4 Horas",
        description: "Separación del Plano de Control y Datos, controladores SDN, formato de datos JSON y automatización básica con scripts.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Conceptos SDN/JSON | 2h Demostración API</span>
            </div>

            <h2><i class="fa-solid fa-robot"></i> Objetivos de la Semana 12</h2>
            <p>Introducir la evolución de las redes programables, consumo de APIs REST y parsing de respuestas JSON.</p>
        `
    }
];
