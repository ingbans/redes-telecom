/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (12 CLASSES STRUCTURE)
   ========================================================================== */

const courseTopicsData = [
    {
        id: "clase-1",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 1",
        difficulty: "Principiante",
        title: "Clase 1: Arquitecturas de Red (Modelo OSI vs TCP/IP)",
        duration: "4 Horas",
        description: "Fundamentos de telecomunicaciones, pila de protocolos de 7 y 4 capas, unidades de datos (PDU), encapsulamiento y ejercicios de asociación.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios Conceptuales</span>
            </div>

            <h2><i class="fa-solid fa-layer-group"></i> Objetivos Teóricos de la Clase 1</h2>
            <p>Comprender la transmisión de datos mediante capas independientes utilizando los modelos de referencia estándar OSI y TCP/IP.</p>

            <h2><i class="fa-solid fa-clock"></i> Distribución de la Clase (4 Horas)</h2>
            <ul>
                <li><strong>Bloque 1 (2 Horas):</strong> Introducción a redes LAN/WAN, Modelo OSI (Capas 1-7) y Modelo TCP/IP.</li>
                <li><strong>Receso (15 min).</strong></li>
                <li><strong>Bloque 2 (1h 45 min):</strong> Encapsulamiento de PDUs (Datos, Segmento, Paquete, Trama, Bits) y Taller de Ejercicios de Asociación de Protocolos.</li>
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
                        <tr><td>4</td><td>Transporte</td><td>Transporte</td><td>Segmento (TCP) / Datagrama (UDP)</td><td>TCP, UDP, Puertos (80, 443, 22)</td></tr>
                        <tr><td>3</td><td>Red</td><td>Internet</td><td>Paquete</td><td>IPv4, IPv6, ICMP</td></tr>
                        <tr><td>2</td><td>Enlace de Datos</td><td rowspan="2">Acceso a la Red</td><td>Trama (Frame)</td><td>Ethernet 802.3, Wi-Fi 802.11, MAC</td></tr>
                        <tr><td>1</td><td>Física</td><td>Bits</td><td>Cables UTP, Fibra Óptica, Transceivers</td></tr>
                    </tbody>
                </table>
            </div>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 1</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 1.1: Identificación de PDUs</h4>
                    <p>Un usuario solicita una página web por HTTPS. Indica cuál es el nombre de la PDU en la Capa 4, Capa 3 y Capa 2 durante el proceso de encapsulamiento.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-2",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 2",
        difficulty: "Principiante",
        title: "Clase 2: Medios de Transmisión y Capa de Enlace",
        duration: "4 Horas",
        description: "Cables UTP (Categorías), Fibra Óptica, enlaces Wi-Fi, trama Ethernet II y direccionamiento MAC (48 bits).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(14,165,233,0.15); color:var(--primary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Principiante</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Análisis</span>
            </div>

            <h2><i class="fa-solid fa-cable-car"></i> Objetivos Teóricos de la Clase 2</h2>
            <p>Analizar los medios de transmisión físicos (guiados y no guiados) y el formato de la trama Ethernet junto a las direcciones MAC de 48 bits.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 2</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 2.1: Análisis de Direcciones MAC</h4>
                    <p>Dada la dirección MAC <code>00:1A:2B:3C:4D:5E</code>, identifica cuáles son los 24 bits correspondientes al OUI (Identificador de Fabricante) y cuáles asigna el fabricante al dispositivo.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-3",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 3",
        difficulty: "Intermedio",
        title: "Clase 3: Direccionamiento IPv4 y Subnetting FLSM",
        duration: "4 Horas",
        description: "Estructura IPv4 de 32 bits, conversión binaria, clases A/B/C, máscaras CIDR (/24 a /30) y cálculo de subredes.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 1.5h Teoría | 2.5h Taller Intensivo de Subnetting</span>
            </div>

            <h2><i class="fa-solid fa-calculator"></i> Objetivos Teóricos de la Clase 3</h2>
            <p>Dominar el cálculo matemático de subredes IP mediante préstamos de bits en notación CIDR.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 3</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 3.1: Subnetting FLSM</h4>
                    <p>Dada la red <code>192.168.10.0/24</code>, divídela en 4 subredes iguales. Indica la nueva máscara de subred, el salto de red, la dirección de red de la 3ª subred y su dirección de broadcast.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-4",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 4",
        difficulty: "Evaluación",
        title: "Clase 4: 📝 PRIMER EXAMEN PARCIAL",
        duration: "4 Horas",
        description: "Evaluación teórica y ejercicios escritos correspondientes a los contenidos de las Clases 1, 2 y 3.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.2); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Parcial 1</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-file-pen"></i> Contenido del Examen 1</h2>
            <p>Evaluación escrita que abarca reactivos de selección múltiple, análisis de modelos de red y desarrollo de ejercicios prácticos de Subnetting IPv4.</p>
        `
    },
    {
        id: "clase-5",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 5",
        difficulty: "Intermedio",
        title: "Clase 5: VLANs, Troncales 802.1Q e Inter-VLAN Routing",
        duration: "4 Horas",
        description: "Segmentación lógica en switches, etiquetado 802.1Q, VLAN nativa y enrutamiento Router-on-a-Stick.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Diseño Lógico</span>
            </div>

            <h2><i class="fa-solid fa-diagram-project"></i> Objetivos Teóricos de la Clase 5</h2>
            <p>Comprender el aislamiento de dominios de broadcast mediante VLANs y la inclusión del tag 802.1Q en enlaces troncales.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 5</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 5.1: Análisis de Enlaces Troncales</h4>
                    <p>Explica qué sucede con una trama sin etiqueta (untagged) cuando ingresa a un puerto de enlace troncal configurado con la VLAN Nativa 99.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-6",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 6",
        difficulty: "Intermedio",
        title: "Clase 6: Spanning Tree Protocol (STP) y Rutas Estáticas",
        duration: "4 Horas",
        description: "Prevención de bucles de Capa 2, elección de Root Bridge (BID), estados de puertos y operación de rutas estáticas.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h STP / Rutas Estáticas | 2h Ejercicios</span>
            </div>

            <h2><i class="fa-solid fa-rotate"></i> Objetivos Teóricos de la Clase 6</h2>
            <p>Analizar la elección del Root Bridge en STP y la regla de selección de ruta por el prefijo más largo (LPM) en routers.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 6</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 6.1: Elección de Root Bridge</h4>
                    <p>Dados 3 switches con prioridades 32768, 4096 y 32768, determina cuál será elegido como Root Bridge y explica la razón.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-7",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 7",
        difficulty: "Avanzado",
        title: "Clase 7: Enrutamiento Dinámico OSPFv2 (Área 0)",
        duration: "4 Horas",
        description: "Protocolos Link-State, métrica de costo OSPF, paquetes Hello, adyacencias y algoritmo Dijkstra (SPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Algoritmo OSPF | 2h Ejercicios de Métrica de Costo</span>
            </div>

            <h2><i class="fa-solid fa-diagram-next"></i> Objetivos Teóricos de la Clase 7</h2>
            <p>Estudiar la construcción de la base de datos de estado de enlace (LSDB) y el cálculo de mapas de red mediante Dijkstra.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 7</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 7.1: Cálculo de Métrica OSPF</h4>
                    <p>Un enlace atraviesa una interfaz FastEthernet (100 Mbps) y una GigabitEthernet (1 Gbps). Dado un ancho de banda de referencia por defecto de 100 Mbps, calcula el costo total OSPF de la ruta.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-8",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 8",
        difficulty: "Evaluación",
        title: "Clase 8: 📝 SEGUNDO EXAMEN PARCIAL",
        duration: "4 Horas",
        description: "Evaluación teórica correspondiente a los contenidos de las Clases 5, 6 y 7 (VLANs, STP, Rutas Estáticas y OSPF).",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.2); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Parcial 2</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-file-pen"></i> Contenido del Examen 2</h2>
            <p>Evaluación escrita sobre conceptos de VLANs, troncales 802.1Q, algoritmos de Spanning Tree, enrutamiento estático y métrica OSPF.</p>
        `
    },
    {
        id: "clase-9",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 9",
        difficulty: "Intermedio",
        title: "Clase 9: Servicios IP (DHCP, NAT/PAT) y Seguridad con ACLs",
        duration: "4 Horas",
        description: "Asignación dinámica DHCP (DORA), traducción PAT (NAT overload) y filtrado de paquetes con ACLs Estándar y Extendidas.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(245,158,11,0.15); color:var(--warning); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Intermedio</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría | 2h Ejercicios de Lógica de ACLs</span>
            </div>

            <h2><i class="fa-solid fa-shield-halved"></i> Objetivos Teóricos de la Clase 9</h2>
            <p>Comprender la traducción de direcciones PAT y el diseño de reglas de control de acceso en Capas 3 y 4.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 9</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 9.1: Evaluación de Regla ACL</h4>
                    <p>Dada la regla de ACL <code>deny tcp 192.168.1.0 0.0.0.255 host 10.0.0.5 eq 80</code>, determina si un paquete con IP origen <code>192.168.1.15</code> e IP destino <code>10.0.0.5</code> hacia el puerto <code>443 (HTTPS)</code> será bloqueado por esta regla.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-10",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 10",
        difficulty: "Avanzado",
        title: "Clase 10: Fundamentos de IPv6 y Autoconfiguración SLAAC",
        duration: "4 Horas",
        description: "Estructura de 128 bits en hexadecimal, direcciones Global Unicast vs Link-Local y autoconfiguración SLAAC.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Teoría Hexadecimal | 2h Ejercicios de Compresión de Ceros</span>
            </div>

            <h2><i class="fa-solid fa-globe"></i> Objetivos Teóricos de la Clase 10</h2>
            <p>Dominar la notación hexadecimal de IPv6, reglas de simplificación de ceros y autoconfiguración asistida por ICMPv6.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 10</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 10.1: Compresión de IPv6</h4>
                    <p>Comprime al máximo la siguiente dirección IPv6 aplicando las dos reglas estándar: <code>2001:0db8:0000:0000:0000:0000:0000:0001</code>.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-11",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 11",
        difficulty: "Avanzado",
        title: "Clase 11: Arquitectura SDN, APIs REST y Formato JSON",
        duration: "4 Horas",
        description: "Separación del Plano de Control y Datos, controladores SDN, arquitectura de APIs REST y parsing de datos JSON.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.15); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Dificultad: Avanzado</span>
                <span class="module-badge" style="background:rgba(16,185,129,0.15); color:var(--accent); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Distribución: 2h Conceptos SDN | 2h Ejercicios de Análisis JSON</span>
            </div>

            <h2><i class="fa-solid fa-robot"></i> Objetivos Teóricos de la Clase 11</h2>
            <p>Comprender la evolución hacia las redes definidas por software y la estructura de datos jerárquica en formato JSON.</p>

            <h2><i class="fa-solid fa-pen-to-square"></i> Ejercicios Teóricos de la Clase 11</h2>
            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                <div class="callout-content">
                    <h4>Ejercicio 11.1: Lectura de Estructura JSON</h4>
                    <p>Dado un objeto JSON que representa una interfaz de red, identifica la clave del estado (status) y el valor de su VLAN asociada.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-12",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 12",
        difficulty: "Evaluación",
        title: "Clase 12: 🎓 TERCER EXAMEN PARCIAL / EXAMEN FINAL",
        duration: "4 Horas",
        description: "Evaluación final integradora (Clases 9, 10 y 11 + Caso Teórico Integrador) y cierre de actas.",
        content: `
            <div class="topic-meta-bar" style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <span class="module-badge" style="background:rgba(239,68,68,0.25); color:var(--danger); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Tipo: Examen Final Integrador</span>
                <span class="module-badge" style="background:rgba(99,102,241,0.15); color:var(--secondary); padding:0.3rem 0.8rem; border-radius:20px; font-weight:700;">Duración: 4 Horas</span>
            </div>

            <h2><i class="fa-solid fa-graduation-cap"></i> Contenido del Examen Final</h2>
            <p>Evaluación teórica integradora sobre Servicios IP, ACLs, IPv6, SDN y caso sintético global de diseño de redes.</p>
        `
    }
];
