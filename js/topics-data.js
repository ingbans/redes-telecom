/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (THEORETICAL COURSE - 12 WEEKS)
   ========================================================================== */

const courseTopicsData = [
    {
        id: "w1-osi-tcpip",
        moduleId: "fase1",
        moduleName: "Fase 1: Fundamentos y Capas Física/Enlace",
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
                <li><strong>Bloque 2 (1h 45 min):</strong> Proceso de Encapsulamiento y Desencapsulamiento de PDUs (Datos, Segmento, Paquete, Trama, Bits) y Ejercicios de Asociación de Protocolos por Capa.</li>
            </ul>

            <h2><i class="fa-solid fa-table"></i> Comparativa de Capas OSI vs TCP/IP</h2>
            <div class="custom-table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Capa OSI</th>
                            <th>Nombre Capa OSI</th>
                            <th>Capa TCP/IP</th>
                            <th>PDU (Unidad de Datos)</th>
                            <th>Ejemplos de Protocolos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>7</td><td>Aplicación</td><td rowspan="3">Aplicación</td><td rowspan="3">Datos</td><td>HTTP, HTTPS, DNS, SSH, FTP, DHCP</td></tr>
                        <tr><td>6</td><td>Presentación</td><td>SSL/TLS, JPEG, ASCII, PNG</td></tr>
                        <tr><td>5</td><td>Sesión</td><td>NetBIOS, PPTP, RPC</td></tr>
                        <tr><td>4</td><td>Transporte</td><td>Transporte</td><td>Segmento (TCP) / Datagrama (UDP)</td><td>TCP, UDP, Números de Puerto (80, 443, 22)</td></tr>
                        <tr><td>3</td><td>Red</td><td>Internet</td><td>Paquete</td><td>IPv4, IPv6, ICMP</td></tr>
                        <tr><td>2</td><td>Enlace de Datos</td><td rowspan="2">Acceso a la Red</td><td>Trama (Frame)</td><td>Ethernet 802.3, Wi-Fi 802.11, MAC</td></tr>
                        <tr><td>1</td><td>Física</td><td>Bits</td><td>Cables UTP, Fibra Óptica, Transceivers</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },
    {
        id: "w2-physical-datalink",
        moduleId: "fase1",
        moduleName: "Fase 1: Fundamentos y Capas Física/Enlace",
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

            <h2><i class="fa-solid fa-clock"></i> Estructura de la Clase Teórica (4 Horas)</h2>
            <ul>
                <li><strong>Bloque 1 (2 Horas):</strong> Código de colores T568A/T568B, atenación, fibra monomodo vs multimodo y estándar Wi-Fi 802.11.</li>
                <li><strong>Receso (15 min).</strong></li>
                <li><strong>Bloque 2 (1h 45 min):</strong> Formato de campos de trama Ethernet II, detección de errores (FCS/CRC) y resolución de ejercicios de tablas MAC (CAM Table).</li>
            </ul>
        `
    },
    {
        id: "w3-ipv4-intro",
        moduleId: "fase1",
        moduleName: "Fase 1: Fundamentos y Capas Física/Enlace",
        weekNumber: "Semana 3",
        difficulty: "Principiante",
        title: "Semana 3: Direccionamiento IPv4 Básico y Binario",
        duration: "4 Horas",
        description: "Estructura de 32 bits de IPv4, conversión binario-decimal, clases tradicionales (A, B, C) y máscaras por defecto.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios Prácticos en Pizarra</span>
            </div>

            <h2><i class="fa-solid fa-calculator"></i> Objetivos Teóricos de la Semana 3</h2>
            <p>Dominar la conversión matemática de octetos binarios y diferenciar la porción de red y host en direcciones IPv4 públicas y privadas (RFC 1918).</p>
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
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 1.5h Teoría | 2.5h Taller Intensivo de Subnetting</span>
            </div>

            <h2><i class="fa-solid fa-network-wired"></i> Objetivos Teóricos de la Semana 4</h2>
            <p>Dividir una red principal en subredes iguales para optimizar los dominios de broadcast y calcular rangos válidos.</p>
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
        description: "Segmentación lógica en switches, etiquetado 802.1Q, VLAN nativa y enrutamiento Router-on-a-Stick.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Diseño Lógico</span>
            </div>

            <h2><i class="fa-solid fa-diagram-project"></i> Objetivos Teóricos de la Semana 5</h2>
            <p>Comprender la segmentación lógica de tráfico en la capa de acceso y la necesidad de etiquetado 802.1Q para atravesar enlaces troncales.</p>
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
        description: "Tormentas de broadcast, bucles de capa 2, elección del Root Bridge (BID) y estados de puertos.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo STP | 2h Resolución de Topologías</span>
            </div>

            <h2><i class="fa-solid fa-rotate"></i> Objetivos Teóricos de la Semana 6</h2>
            <p>Analizar el algoritmo determinista de Spanning Tree para calcular qué puerto se bloquea lógicamente ante la redundancia física.</p>
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
        description: "Operación de la tabla de enrutamiento IP, coincidencia de prefijo más largo, rutas estáticas y rutas por defecto.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Selección de Ruta</span>
            </div>

            <h2><i class="fa-solid fa-route"></i> Objetivos Teóricos de la Semana 7</h2>
            <p>Comprender cómo los routers toman decisiones de reenvío examinando la dirección IP destino y la distancia administrativa.</p>
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
        description: "Protocolos Link-State, métrica del costo OSPF, paquetes Hello, adyacencias y algoritmo Dijkstra (SPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo OSPF | 2h Ejercicios de Cálculo de Costo</span>
            </div>

            <h2><i class="fa-solid fa-diagram-next"></i> Objetivos Teóricos de la Semana 8</h2>
            <p>Estudiar la construcción de la base de datos de estado de enlace (LSDB) y el cálculo de mapas de red mediante Dijkstra.</p>
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
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Análisis de Flujo de Traducción NAT</span>
            </div>

            <h2><i class="fa-solid fa-server"></i> Objetivos Teóricos de la Semana 9</h2>
            <p>Comprender los procesos de asignación de direcciones automáticas y la conservación de IPv4 mediante traducción PAT.</p>
        `
    },
    {
        id: "w10-security-acls",
        moduleId: "fase4",
        moduleName: "Fase 4: Seguridad, IPv6 y Tendencias",
        weekNumber: "Semana 10",
        difficulty: "Avanzado",
        title: "Semana 10: Seguridad en Redes y Listas de Control de Acceso (ACLs)",
        duration: "4 Horas",
        description: "Filtrado de paquetes en capas 3 y 4 mediante Listas de Control de Acceso (ACLs Estándar y Extendidas) y Deny Implícito.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría de ACLs | 2h Ejercicios de Lógica de Filtrado</span>
            </div>

            <h2><i class="fa-solid fa-shield-halved"></i> Objetivos Teóricos de la Semana 10</h2>
            <p>Diseñar reglas lógicas de control de acceso evaluando direcciones origen/destino y números de puerto TCP/UDP.</p>
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
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría Hexadecimal | 2h Ejercicios de Compresión de Ceros</span>
            </div>

            <h2><i class="fa-solid fa-globe"></i> Objetivos Teóricos de la Semana 11</h2>
            <p>Dominar la notación hexadecimal de IPv6, reglas de simplificación de ceros y autoconfiguración dinámicamente asistida por ICMPv6.</p>
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
        description: "Separación del Plano de Control y Datos, controladores SDN, formato de datos JSON y automatización básica.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Conceptos SDN | 2h Ejercicios de Análisis JSON</span>
            </div>

            <h2><i class="fa-solid fa-robot"></i> Objetivos Teóricos de la Semana 12</h2>
            <p>Comprender la evolución hacia las redes definidas por software, arquitectura de planos y estructuras de datos jerárquicas.</p>
        `
    }
];
