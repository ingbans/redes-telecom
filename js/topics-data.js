/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (12 CLASSES STRUCTURE)
   Includes complete theoretical explanations and interactive animations for each class
   ========================================================================== */

const courseTopicsData = [
    {
        id: "clase-1",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 1",
        title: "Clase 1: Arquitecturas de Red (Modelo OSI vs TCP/IP)",
        duration: "4 Horas",
        description: "Fundamentos de telecomunicaciones, pila de protocolos de 7 y 4 capas, unidades de datos (PDU) y proceso de encapsulamiento.",
        content: `
            <h2><i class="fa-solid fa-layer-group"></i> Objetivos Teóricos de la Clase 1</h2>
            <p>Comprender la transmisión de datos mediante capas independientes utilizando los modelos de referencia estándar OSI y TCP/IP, el flujo de PDU y las funciones específicas de cada nivel.</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Proceso de Encapsulamiento OSI</h2>
            <p>Observa paso a paso cómo cada capa envuelve el mensaje agregando su propia información de control (Encabezado/PDU):</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-primary btn-sm" onclick="runOSISimulation()"><i class="fa-solid fa-play"></i> Iniciar Encapsulamiento</button>
                    <button class="btn btn-secondary btn-sm" onclick="resetOSISimulation()"><i class="fa-solid fa-rotate-left"></i> Reiniciar</button>
                </div>
                <div class="vlan-status-banner" id="osi-status-text">
                    <i class="fa-solid fa-circle-info"></i> Haz clic en "Iniciar Encapsulamiento" para observar la construcción de la PDU en cada capa.
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;" id="osi-layers-row">
                    <div class="osi-layer-box" id="osi-l7">7. Aplicación</div>
                    <div class="osi-layer-box" id="osi-l4">4. Transporte</div>
                    <div class="osi-layer-box" id="osi-l3">3. Red</div>
                    <div class="osi-layer-box" id="osi-l2">2. Enlace</div>
                    <div class="osi-layer-box" id="osi-l1">1. Física</div>
                </div>
                <div class="vlan-packet-inspector">
                    <h4><i class="fa-solid fa-magnifying-glass"></i> Inspección de la PDU (Unidad de Datos de Protocolo)</h4>
                    <div class="frame-structure" id="osi-pdu-preview">
                        <span class="pdu-block data-block">DATOS (Mensaje HTTP)</span>
                    </div>
                </div>
            </div>

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

            <h2><i class="fa-solid fa-boxes-packing"></i> El Proceso de Encapsulamiento de Datos</h2>
            <p>A medida que los datos descienden por la pila de protocolos desde la Capa de Aplicación hasta la Capa Física en el emisor, cada capa añade su propia cabecera (Header) con información de control.</p>
            <ul>
                <li><strong>Segmento:</strong> Capa de Transporte (añade puertos origen/destino y control de secuencia TCP).</li>
                <li><strong>Paquete:</strong> Capa de Red (añade direcciones IP origen y destino).</li>
                <li><strong>Trama:</strong> Capa de Enlace de Datos (añade direcciones MAC origen/destino y tráiler FCS para detección de errores).</li>
            </ul>
        `
    },
    {
        id: "clase-2",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 2",
        title: "Clase 2: Medios de Transmisión y Capa de Enlace",
        duration: "4 Horas",
        description: "Cables UTP (Categorías), Fibra Óptica, enlaces Wi-Fi, trama Ethernet II y direccionamiento MAC (48 bits).",
        content: `
            <h2><i class="fa-solid fa-cable-car"></i> Objetivos Teóricos de la Clase 2</h2>
            <p>Analizar los medios de transmisión físicos (guiados y no guiados), la física de propagación de señales y el formato de la trama Ethernet II junto a la estructura de la dirección MAC de 48 bits.</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Propagación en Medios y Desglose MAC</h2>
            <p>Selecciona un medio físico de transmisión para observar el canal y la naturaleza de las señales en tiempo real:</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm active" onclick="updateMediumSimulation('utp')"><i class="fa-solid fa-bolt"></i> Cobre UTP (Eléctrico)</button>
                    <button class="btn btn-outline btn-sm" onclick="updateMediumSimulation('fiber')"><i class="fa-solid fa-lightbulb"></i> Fibra Óptica (Luz)</button>
                    <button class="btn btn-outline btn-sm" onclick="updateMediumSimulation('wifi')"><i class="fa-solid fa-wifi"></i> Wi-Fi (Radiofrecuencia)</button>
                </div>
                <div class="vlan-status-banner" id="medium-status">
                    <strong>Cobre UTP (Cat 6):</strong> Transmisión mediante impulsos eléctricos continuos de voltaje diferencial.
                </div>
                <div class="medium-wave-canvas wave-utp" id="medium-wave">
                    ⚡ ⚡ ⚡ [Impulsos Eléctricos +5V / -5V en Pares Trenzados] ⚡ ⚡ ⚡
                </div>
            </div>

            <h2><i class="fa-solid fa-network-wired"></i> Medios de Transmisión</h2>
            <ul>
                <li><strong>Cables de Cobre UTP:</strong> Categorías 5e, 6 y 6A. Normas T568A y T568B. Reducción de diafonía (Crosstalk) mediante pares trenzados.</li>
                <li><strong>Fibra Óptica:</strong> Monomodo (SMF - Larga distancia, núcleo de 9 µm) y Multimodo (MMF - Distancias cortas en LAN/Datacenters, núcleo de 50/62.5 µm).</li>
                <li><strong>Inalámbrico (Wi-Fi 802.11):</strong> Propagación por radiofrecuencia (bandas de 2.4 GHz, 5 GHz y 6 GHz).</li>
            </ul>

            <h2><i class="fa-solid fa-barcode"></i> Estructura de la Dirección MAC</h2>
            <p>Una dirección física MAC consta de 48 bits (6 bytes) expresados en notación hexadecimal:</p>
            <ul>
                <li><strong>OUI (Organizationally Unique Identifier):</strong> Primeros 24 bits asignados por la IEEE para identificar al fabricante (Ej. 00:1A:2B).</li>
                <li><strong>Identificador de Dispositivo:</strong> Últimos 24 bits asignados de forma única por el fabricante para la tarjeta NIC.</li>
            </ul>
        `
    },
    {
        id: "clase-3",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 3",
        title: "Clase 3: Direccionamiento IPv4 y Subnetting FLSM",
        duration: "4 Horas",
        description: "Estructura IPv4 de 32 bits, conversión binaria, clases A/B/C, máscaras CIDR (/24 a /30) y cálculo de subredes.",
        content: `
            <h2><i class="fa-solid fa-calculator"></i> Objetivos Teóricos de la Clase 3</h2>
            <p>Dominar la estructura matemática de 32 bits de las direcciones IPv4, las máscaras de longitud fija FLSM y el cálculo exacto de subredes mediante préstamos de bits CIDR.</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Visual: División de Subredes IPv4 (CIDR /24 a /30)</h2>
            <p>Cambia el prefijo de máscara CIDR para observar en tiempo real la cantidad de subredes generadas y hosts útiles por subred:</p>
            <div class="vlan-simulator-container">
                <div class="form-group" style="max-width:320px; margin-bottom:1rem;">
                    <label>Prefijo CIDR:</label>
                    <select id="vsubnet-cidr" class="att-status-select" onchange="updateSubnetVisualizer()">
                        <option value="24">/24 - 255.255.255.0 (1 Subred de 254 Hosts)</option>
                        <option value="25">/25 - 255.255.255.128 (2 Subredes de 126 Hosts)</option>
                        <option value="26">/26 - 255.255.255.192 (4 Subredes de 62 Hosts)</option>
                        <option value="27" selected>/27 - 255.255.255.224 (8 Subredes de 30 Hosts)</option>
                        <option value="28">/28 - 255.255.255.240 (16 Subredes de 14 Hosts)</option>
                        <option value="30">/30 - 255.255.255.252 (64 Subredes de 2 Hosts)</option>
                    </select>
                </div>
                <div class="vlan-status-banner">
                    <strong>Máscara de Subred:</strong> <span id="vsubnet-mask">255.255.255.224</span> | 
                    <strong>Hosts Útiles por Subred:</strong> <span id="vsubnet-hosts">30</span> | 
                    <strong>Distribución de Bits:</strong> <span id="vsubnet-bits">27 Bits Red | 5 Bits Host</span>
                </div>
                <div class="subnet-blocks-grid" id="vsubnet-blocks-grid">
                    <!-- Rendered dynamically -->
                </div>
            </div>

            <h2><i class="fa-solid fa-table-cells"></i> Máscaras de Subred y Rangos Usables</h2>
            <div class="custom-table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Prefijo CIDR</th>
                            <th>Máscara de Subred</th>
                            <th>Bits de Host</th>
                            <th>Hosts Útiles por Subred</th>
                            <th>Uso Típico</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>/24</td><td>255.255.255.0</td><td>8</td><td>254</td><td>Redes LAN Estándar</td></tr>
                        <tr><td>/25</td><td>255.255.255.128</td><td>7</td><td>126</td><td>Subredes Medias</td></tr>
                        <tr><td>/26</td><td>255.255.255.192</td><td>6</td><td>62</td><td>Departamentos de 50 hosts</td></tr>
                        <tr><td>/27</td><td>255.255.255.224</td><td>5</td><td>30</td><td>Salas de Servidores</td></tr>
                        <tr><td>/28</td><td>255.255.255.240</td><td>4</td><td>14</td><td>Subredes Pequeñas</td></tr>
                        <tr><td>/29</td><td>255.255.255.248</td><td>3</td><td>6</td><td>Enlaces de gestión</td></tr>
                        <tr><td>/30</td><td>255.255.255.252</td><td>2</td><td>2</td><td>Enlaces Punto a Punto WAN</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },
    {
        id: "clase-4",
        moduleId: "bloque1",
        moduleName: "Bloque 1: Fundamentos y Subnetting (Clases 1 a 4)",
        weekNumber: "Clase 4",
        title: "Clase 4: 📝 PRIMER EXAMEN PARCIAL",
        duration: "4 Horas",
        description: "Evaluación teórica y ejercicios escritos correspondientes a los contenidos de las Clases 1, 2 y 3.",
        content: `
            <h2><i class="fa-solid fa-file-pen"></i> Contenido Evaluado en el Examen 1</h2>
            <p>Evaluación escrita que abarca reactivos de selección múltiple, análisis de modelos de red (OSI vs TCP/IP), tramas Ethernet, direcciones MAC y desarrollo escrito de cálculos de Subnetting IPv4.</p>

            <h2><i class="fa-solid fa-circle-question"></i> Simulador Interactivo: Diagnóstico Rápido Pre-Examen 1</h2>
            <p>Responde las siguientes preguntas de práctica antes de presentar el examen escrito:</p>
            <div class="vlan-simulator-container">
                <div class="diag-quiz-box">
                    <div class="diag-question">
                        <p><strong>Pregunta 1:</strong> ¿En qué capa del Modelo OSI opera el protocolo IP?</p>
                        <div class="diag-opts">
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, false, 'Capa 2 (Enlace) maneja direcciones MAC y tramas.')">Capa 2 (Enlace de Datos)</button>
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, true, 'La Capa 3 (Red) gestiona el direccionamiento lógico IP y el enrutamiento.')">Capa 3 (Red)</button>
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, false, 'Capa 4 (Transporte) gestiona puertos TCP/UDP.')">Capa 4 (Transporte)</button>
                        </div>
                        <div class="diag-exp-box"></div>
                    </div>
                </div>
            </div>

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Escala de Calificación Oficial:</h4>
                    <p>Este examen parcial se califica estrictamente en una escala de <strong>0 a 20 puntos</strong>. Mínimo aprobatorio: <strong>10 pts</strong>.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-5",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 5",
        title: "Clase 5: VLANs, Troncales 802.1Q e Inter-VLAN Routing",
        duration: "4 Horas",
        description: "Segmentación lógica en switches, etiquetado 802.1Q, VLAN nativa y enrutamiento Router-on-a-Stick.",
        content: `
            <h2><i class="fa-solid fa-diagram-project"></i> Objetivos Teóricos de la Clase 5</h2>
            <p>Comprender el aislamiento de dominios de broadcast mediante VLANs, la inclusión del tag IEEE 802.1Q en enlaces troncales y el enrutamiento Inter-VLAN (Router-on-a-Stick).</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Operación de VLANs y Tag 802.1Q</h2>
            <p>Utiliza los botones a continuación para observar cómo el switch aísla el tráfico entre VLANs y cómo el Router interconecta ambas VLANs en Capa 3:</p>

            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm active" onclick="runVLANSimulation('same-vlan')">
                        <i class="fa-solid fa-bullhorn"></i> 1. Broadcast en Misma VLAN (VLAN 10)
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="runVLANSimulation('cross-vlan-block')">
                        <i class="fa-solid fa-ban"></i> 2. Bloqueo Capa 2 (VLAN 10 ➔ VLAN 20)
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="runVLANSimulation('router-on-stick')">
                        <i class="fa-solid fa-route"></i> 3. Inter-VLAN Routing (802.1Q Trunk)
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="resetVLANSimulation()">
                        <i class="fa-solid fa-rotate-left"></i> Reiniciar
                    </button>
                </div>

                <!-- Status Box -->
                <div class="vlan-status-banner" id="vlan-status-text">
                    <i class="fa-solid fa-circle-info"></i> Selecciona un escenario arriba para iniciar la animación interactiva.
                </div>

                <!-- Graphical Topology Canvas -->
                <div class="vlan-topology-stage" id="vlan-stage">
                    <!-- SVG Cables Layer -->
                    <svg class="vlan-cables-svg" id="vlan-cables-svg">
                        <line id="cable-r1-sw1" class="vlan-cable trunk-cable" />
                        <line id="cable-sw1-pc1" class="vlan-cable access-cable-10" />
                        <line id="cable-sw1-pc2" class="vlan-cable access-cable-10" />
                        <line id="cable-sw1-pc3" class="vlan-cable access-cable-20" />
                        <line id="cable-sw1-pc4" class="vlan-cable access-cable-20" />
                    </svg>
                    <div class="vlan-device router-device" id="device-router">
                        <i class="fa-solid fa-route device-icon"></i>
                        <span class="device-name">Router (R1)</span>
                        <span class="device-subnet">Subinterfaces .10 y .20</span>
                    </div>

                    <div class="vlan-device switch-device" id="device-switch">
                        <i class="fa-solid fa-network-wired device-icon"></i>
                        <span class="device-name">Switch (SW1)</span>
                        <span class="device-subnet">Tabla de MACs & VLANs</span>
                    </div>

                    <div class="vlan-pcs-row">
                        <div class="vlan-device pc-device vlan10-pc" id="device-pc1">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-1 (Ventas)</span>
                            <span class="vlan-tag-pill vlan10-pill">VLAN 10</span>
                            <span class="device-ip">192.168.10.10</span>
                        </div>

                        <div class="vlan-device pc-device vlan10-pc" id="device-pc2">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-2 (Ventas)</span>
                            <span class="vlan-tag-pill vlan10-pill">VLAN 10</span>
                            <span class="device-ip">192.168.10.11</span>
                        </div>

                        <div class="vlan-device pc-device vlan20-pc" id="device-pc3">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-3 (Finanzas)</span>
                            <span class="vlan-tag-pill vlan20-pill">VLAN 20</span>
                            <span class="device-ip">192.168.20.10</span>
                        </div>

                        <div class="vlan-device pc-device vlan20-pc" id="device-pc4">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-4 (Finanzas)</span>
                            <span class="vlan-tag-pill vlan20-pill">VLAN 20</span>
                            <span class="device-ip">192.168.20.11</span>
                        </div>
                    </div>

                    <!-- Animated Data Packet Dot -->
                    <div class="vlan-packet hidden" id="vlan-packet">
                        <span class="packet-tag" id="packet-tag-label">VID:10</span>
                    </div>
                </div>

                <!-- Packet Inspector Panel -->
                <div class="vlan-packet-inspector" id="vlan-inspector">
                    <h4><i class="fa-solid fa-magnifying-glass"></i> Inspección de Encabezado Ethernet (802.1Q Tag)</h4>
                    <div class="frame-structure">
                        <span class="frame-field">Destino: FF:FF:FF:FF:FF:FF</span>
                        <span class="frame-field">Origen: MAC-PC1</span>
                        <span class="frame-field tag-field" id="inspector-tag-field">IEEE 802.1Q (Sin Etiqueta / Access)</span>
                        <span class="frame-field">Datos IP: 192.168.10.0/24</span>
                    </div>
                </div>
            </div>

            <h2><i class="fa-solid fa-link"></i> Enlaces Troncales y Etiquetado IEEE 802.1Q</h2>
            <p>Un enlace troncal (Trunk) transporta tráfico de múltiples VLANs a través de un único enlace físico. El protocolo estándar <strong>IEEE 802.1Q</strong> inserta un campo de encabezado de 4 bytes en la trama Ethernet que incluye el <strong>VLAN ID (VID)</strong> de 12 bits (permitiendo hasta 4,096 VLANs).</p>
        `
    },
    {
        id: "clase-6",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 6",
        title: "Clase 6: Spanning Tree Protocol (STP) y Rutas Estáticas",
        duration: "4 Horas",
        description: "Prevención de bucles de Capa 2, elección de Root Bridge (BID), estados de puertos y operación de rutas estáticas.",
        content: `
            <h2><i class="fa-solid fa-rotate"></i> Objetivos Teóricos de la Clase 6</h2>
            <p>Analizar la prevención de bucles de conmutación en Capa 2 mediante el algoritmo de Spanning Tree Protocol (IEEE 802.1D) y la regla de selección de ruta por el prefijo más largo (Longest Prefix Match) en la tabla de enrutamiento IP.</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Elección Root Bridge y Bloqueo de Bucles (STP)</h2>
            <p>Simula la convergencia del algoritmo Spanning Tree en una topología en triángulo de 3 switches:</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-primary btn-sm" onclick="runSTPSimulation()"><i class="fa-solid fa-play"></i> Iniciar Algoritmo STP</button>
                </div>
                <div class="vlan-status-banner" id="stp-status-text">
                    <i class="fa-solid fa-circle-info"></i> Haz clic en "Iniciar Algoritmo STP" para calcular el Root Bridge (menor Prioridad/BID) y el puerto bloqueado (BLK).
                </div>
                <div class="vlan-pcs-row" style="margin-top:1rem;">
                    <div class="vlan-device switch-device" id="stp-sw1">
                        <i class="fa-solid fa-crown" style="color:#f59e0b;"></i>
                        <span class="device-name">SW-1 (Prioridad 4096)</span>
                        <span class="device-subnet">Root Bridge Ganador</span>
                    </div>
                    <div class="vlan-device switch-device" id="stp-sw2">
                        <i class="fa-solid fa-network-wired device-icon"></i>
                        <span class="device-name">SW-2 (Prioridad 32768)</span>
                        <span class="device-subnet">Designated Switch</span>
                    </div>
                    <div class="vlan-device switch-device" id="stp-sw3">
                        <i class="fa-solid fa-network-wired device-icon"></i>
                        <span class="device-name">SW-3 (Prioridad 32768)</span>
                        <span class="device-subnet">Puerto Bloqueado (BLK)</span>
                    </div>
                </div>
            </div>

            <h2><i class="fa-solid fa-route"></i> Operación de la Tabla de Enrutamiento</h2>
            <p>La tabla de enrutamiento IP contiene las rutas conocidas por el router. Cuando un paquete ingresa, el router busca la entrada con el prefijo de máscara más específico (Longest Prefix Match) para determinar el siguiente salto (Next-Hop).</p>
        `
    },
    {
        id: "clase-7",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 7",
        title: "Clase 7: Enrutamiento Dinámico OSPFv2 (Área 0)",
        duration: "4 Horas",
        description: "Protocolos Link-State, métrica de costo OSPF, paquetes Hello, adyacencias y algoritmo Dijkstra (SPF).",
        content: `
            <h2><i class="fa-solid fa-diagram-next"></i> Objetivos Teóricos de la Clase 7</h2>
            <p>Estudiar la construcción de la base de datos de estado de enlace (LSDB), la formación de adyacencias mediante paquetes Hello y el cálculo de la ruta óptima mediante el algoritmo Dijkstra (SPF).</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Enrutamiento Dinámico OSPFv2 (Dijkstra SPF)</h2>
            <p>Calcula la mejor ruta basada en la métrica acumulada de costo de ancho de banda:</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-primary btn-sm" onclick="runOSPFSimulation()"><i class="fa-solid fa-calculator"></i> Calcular Ruta Más Corta (Dijkstra)</button>
                </div>
                <div class="vlan-status-banner" id="ospf-status-text">
                    <i class="fa-solid fa-circle-info"></i> Haz clic en "Calcular Ruta Más Corta" para evaluar la métrica de costo OSPF basadas en ancho de banda.
                </div>
                <div class="vlan-packet-inspector" id="ospf-path-info">
                    <strong>Métrica de Costo OSPF:</strong> Costo = 100 Mbps / Ancho de Banda del Enlace.
                </div>
            </div>

            <h2><i class="fa-solid fa-gears"></i> Métrica del Costo OSPF</h2>
            <p>OSPF calcula el costo de cada interfaz según la relación: <code>Costo = Ancho de Banda de Referencia (100 Mbps) / Ancho de Banda de la Interfaz</code>.</p>
        `
    },
    {
        id: "clase-8",
        moduleId: "bloque2",
        moduleName: "Bloque 2: Conmutación y Enrutamiento (Clases 5 a 8)",
        weekNumber: "Clase 8",
        title: "Clase 8: 📝 SEGUNDO EXAMEN PARCIAL",
        duration: "4 Horas",
        description: "Evaluación teórica correspondiente a los contenidos de las Clases 5, 6 y 7 (VLANs, STP, Rutas Estáticas y OSPF).",
        content: `
            <h2><i class="fa-solid fa-file-pen"></i> Contenido Evaluado en el Examen 2</h2>
            <p>Evaluación escrita sobre conceptos de VLANs, troncales 802.1Q, algoritmos de Spanning Tree, enrutamiento estático y métrica OSPF.</p>

            <h2><i class="fa-solid fa-circle-question"></i> Simulador Interactivo: Diagnóstico Rápido Pre-Examen 2</h2>
            <div class="vlan-simulator-container">
                <div class="diag-quiz-box">
                    <div class="diag-question">
                        <p><strong>Pregunta:</strong> ¿Qué campo agrega el encabezado 802.1Q para identificar la VLAN?</p>
                        <div class="diag-opts">
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, true, 'El campo VLAN ID (VID) de 12 bits identifica la VLAN de la trama.')">VLAN ID (VID) de 12 bits</button>
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, false, 'El campo TTL pertenece a la cabecera IP de Capa 3.')">Time To Live (TTL)</button>
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, false, 'El campo FCS está al final de la trama para errores.')">Frame Check Sequence (FCS)</button>
                        </div>
                        <div class="diag-exp-box"></div>
                    </div>
                </div>
            </div>

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Escala de Calificación Oficial:</h4>
                    <p>Este examen parcial se califica estrictamente en una escala de <strong>0 a 20 puntos</strong>. Mínimo aprobatorio: <strong>10 pts</strong>.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-9",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 9",
        title: "Clase 9: Listas de Control de Acceso (ACLs IPv4)",
        duration: "4 Horas",
        description: "Filtrado de paquetes en routers con ACLs Estándar (1-99) y Extendidas (100-199), coincidencia de reglas y denegación implícita.",
        content: `
            <h2><i class="fa-solid fa-shield-halved"></i> Objetivos Teóricos de la Clase 9</h2>
            <p>Comprender el funcionamiento de las Listas de Control de Acceso (ACL) para inspección y filtrado de paquetes IP en Capa 3 y Capa 4 (puertos TCP/UDP).</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Evaluación de Reglas de Filtrado ACL</h2>
            <p>Prueba diferentes tipos de tráfico para observar el comportamiento de las sentencias Permit / Deny:</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm" onclick="testACLPacket('web')"><i class="fa-solid fa-globe"></i> Probar Tráfico Web (Port 80)</button>
                    <button class="btn btn-outline btn-sm" onclick="testACLPacket('ssh')"><i class="fa-solid fa-terminal"></i> Probar SSH (Port 22)</button>
                    <button class="btn btn-outline btn-sm" onclick="testACLPacket('icmp')"><i class="fa-solid fa-wifi"></i> Probar Ping (ICMP)</button>
                </div>
                <div class="vlan-status-banner" id="acl-status-text">
                    <i class="fa-solid fa-circle-info"></i> Selecciona un paquete de prueba arriba para pasarlo a través de la lista de acceso.
                </div>
            </div>

            <h2><i class="fa-solid fa-filter"></i> Regla del Deny Implícito en ACLs</h2>
            <p>Al final de toda Lista de Control de Acceso existe una regla invisible de denegación implícita (<code>deny ip any any</code>) que descarta todo paquete que no haya coincidido con ninguna regla previa.</p>
        `
    },
    {
        id: "clase-10",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 10",
        title: "Clase 10: Traducción de Direcciones NAT/PAT y Fundamentos de IPv6",
        duration: "4 Horas",
        description: "Traducción PAT (NAT overload), direcciones IPv6 de 128 bits en hexadecimal, Global Unicast vs Link-Local y autoconfiguración SLAAC.",
        content: `
            <h2><i class="fa-solid fa-globe"></i> Objetivos Teóricos de la Clase 10</h2>
            <p>Dominar la conservación de direcciones lógicas mediante NAT/PAT Overload y la estructura de 128 bits en hexadecimal de IPv6 junto a la autoconfiguración SLAAC.</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Tabla de Traducción NAT PAT (Overload)</h2>
            <p>Envía peticiones desde clientes internos con IP privada para observar la tabla de mapeo dinámico NAT:</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-primary btn-sm" onclick="runNATSimulation()"><i class="fa-solid fa-bolt"></i> Enviar Petición HTTP desde PC Interna</button>
                </div>
                <div class="vlan-status-banner" id="nat-status-text">
                    <i class="fa-solid fa-circle-info"></i> Haz clic para enviar un paquete desde la LAN privada hacia Internet.
                </div>
                <div class="custom-table-container" style="margin-top:1rem;">
                    <table class="custom-table">
                        <thead>
                            <tr><th>Tipo de Dirección NAT</th><th>Dirección IP : Puerto</th></tr>
                        </thead>
                        <tbody id="nat-table-body">
                            <tr><td>Inside Global</td><td>Esperando tráfico...</td></tr>
                            <tr><td>Inside Local</td><td>Esperando tráfico...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    },
    {
        id: "clase-11",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 11",
        title: "Clase 11: Servicios de Red (DHCP, DNS) y Arquitectura SDN",
        duration: "4 Horas",
        description: "Asignación dinámica DHCP (Proceso DORA), resolución de nombres DNS, arquitectura SDN y automatización de red.",
        content: `
            <h2><i class="fa-solid fa-server"></i> Objetivos Teóricos de la Clase 11</h2>
            <p>Comprender la autoconfiguración IP cliente mediante el proceso DORA de DHCP, la resolución jerárquica de nombres DNS y la arquitectura SDN con separación de planos de control y datos.</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Proceso DORA en DHCP</h2>
            <p>Simula el intercambio de 4 mensajes para obtener una dirección IP dinámica:</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-primary btn-sm" onclick="runDORASimulation()"><i class="fa-solid fa-play"></i> Iniciar Proceso DORA</button>
                </div>
                <div class="vlan-status-banner" id="dhcp-status-text">
                    <i class="fa-solid fa-circle-info"></i> Haz clic en "Iniciar Proceso DORA" para simular la asignación dinámica de dirección IP.
                </div>
            </div>
        `
    },
    {
        id: "clase-12",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 12",
        title: "Clase 12: 🎓 TERCER EXAMEN PARCIAL / EXAMEN FINAL Y LABORATORIO",
        duration: "4 Horas",
        description: "Evaluación final integradora teórica y práctica (Clases 9, 10 y 11 + Caso Teórico Integrador) y cierre de actas.",
        content: `
            <h2><i class="fa-solid fa-graduation-cap"></i> Contenido Evaluado en el Examen Final</h2>
            <p>Evaluación teórica integradora sobre Servicios IP, ACLs, IPv6, SDN y caso sintético global de diseño de redes de telecomunicaciones.</p>

            <h2><i class="fa-solid fa-circle-question"></i> Simulador Interactivo: Diagnóstico Integrador Final</h2>
            <div class="vlan-simulator-container">
                <div class="diag-quiz-box">
                    <div class="diag-question">
                        <p><strong>Pregunta Final:</strong> En el esquema Router-on-a-Stick, ¿dónde se configuran las direcciones IP de cada VLAN?</p>
                        <div class="diag-opts">
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, true, 'Correcto: Se configuran en las Subinterfaces del Router (Ej. Gi0/0.10 y Gi0/0.20) con encapsulamiento dot1Q.')">En las Subinterfaces del Router</button>
                            <button class="diag-opt-btn" onclick="checkDiagnosticAnswer(this, false, 'Los puertos access del switch no llevan IP de enrutamiento.')">En los puertos Access del Switch</button>
                        </div>
                        <div class="diag-exp-box"></div>
                    </div>
                </div>
            </div>

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Escala de Calificación Oficial:</h4>
                    <p>Este examen final y laboratorio se califica en escala de <strong>0 a 20 puntos</strong>. Mínimo aprobatorio: <strong>10 pts</strong>.</p>
                </div>
            </div>
        `
    }
];
