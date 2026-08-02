/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (12 CLASSES STRUCTURE)
   Includes complete theoretical explanations and full graphical topology simulators for each class
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
            <p>Comprender la transmisión de datos mediante capas independientes utilizando los modelos de referencia estándar OSI y TCP/IP, el flujo de PDU y el proceso de encapsulamiento.</p>

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Encapsulamiento y Topología OSI</h2>
            <p>Utiliza los botones a continuación para simular la transmisión del paquete a través de la topología física:</p>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-primary btn-sm active" onclick="runOSISimulation('encap')"><i class="fa-solid fa-play"></i> 1. Encapsulamiento en Emisor (PC-1 ➔ Red)</button>
                    <button class="btn btn-outline btn-sm" onclick="runOSISimulation('decap')"><i class="fa-solid fa-circle-check"></i> 2. Desencapsulamiento en Servidor</button>
                    <button class="btn btn-secondary btn-sm" onclick="initClase1Sim()"><i class="fa-solid fa-rotate-left"></i> Reiniciar</button>
                </div>
                <div class="vlan-status-banner" id="c1-status">
                    <i class="fa-solid fa-circle-info"></i> Selecciona un escenario arriba para iniciar la simulación animada.
                </div>
                <div class="vlan-topology-stage" id="c1-stage">
                    <svg class="vlan-cables-svg"><line id="c1-c1" class="vlan-cable access-cable-10"/><line id="c1-c2" class="vlan-cable trunk-cable"/><line id="c1-c3" class="vlan-cable access-cable-20"/></svg>
                    <div class="vlan-pcs-row">
                        <div class="vlan-device pc-device vlan10-pc" id="c1-pc1">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-1 (Emisor)</span>
                            <span class="device-ip">192.168.1.10</span>
                        </div>
                        <div class="vlan-device switch-device" id="c1-sw1">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">Switch (SW1)</span>
                            <span class="device-subnet">Capa 2 Enlace</span>
                        </div>
                        <div class="vlan-device router-device" id="c1-r1">
                            <i class="fa-solid fa-route device-icon"></i>
                            <span class="device-name">Router (R1)</span>
                            <span class="device-subnet">Capa 3 Red</span>
                        </div>
                        <div class="vlan-device pc-device vlan20-pc" id="c1-srv">
                            <i class="fa-solid fa-server device-icon"></i>
                            <span class="device-name">Servidor Web</span>
                            <span class="device-ip">10.0.0.5</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c1-packet"><span class="packet-tag" id="c1-packet-tag">PDU</span></div>
                </div>
                <div class="vlan-packet-inspector">
                    <h4><i class="fa-solid fa-magnifying-glass"></i> Inspección de la PDU (Unidad de Datos de Protocolo)</h4>
                    <div class="frame-structure" id="c1-pdu-preview"><span class="pdu-block data-block">DATOS (Mensaje HTTP)</span></div>
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

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Medios de Transmisión y Dirección MAC</h2>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm active" onclick="runMediumSimulation('utp')"><i class="fa-solid fa-bolt"></i> 1. Cobre UTP Cat 6 (Eléctrico)</button>
                    <button class="btn btn-outline btn-sm" onclick="runMediumSimulation('fiber')"><i class="fa-solid fa-lightbulb"></i> 2. Fibra Óptica (Luz Monomodo)</button>
                    <button class="btn btn-outline btn-sm" onclick="runMediumSimulation('wifi')"><i class="fa-solid fa-wifi"></i> 3. Wi-Fi 6 (Radiofrecuencia RF)</button>
                </div>
                <div class="vlan-status-banner" id="c2-status">Selecciona un medio físico de transmisión arriba para observar la señal.</div>
                <div class="vlan-topology-stage" id="c2-stage">
                    <svg class="vlan-cables-svg"><line id="c2-c1" class="vlan-cable access-cable-10"/><line id="c2-c2" class="vlan-cable access-cable-10"/></svg>
                    <div class="vlan-pcs-row">
                        <div class="vlan-device pc-device vlan10-pc" id="c2-pc1">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-1 (Emisor)</span>
                            <span class="vlan-tag-pill vlan10-pill">MAC: 00:1A:2B:44:55:66</span>
                        </div>
                        <div class="vlan-device switch-device" id="c2-sw1">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">Switch (SW1)</span>
                            <span class="device-subnet">Canal de Transmisión</span>
                        </div>
                        <div class="vlan-device pc-device vlan20-pc" id="c2-pc2">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-2 (Receptor)</span>
                            <span class="vlan-tag-pill vlan20-pill">MAC: CC:DD:EE:11:22:33</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c2-packet"><span class="packet-tag">MAC</span></div>
                </div>
                <div class="medium-wave-canvas wave-utp" id="c2-wave">⚡ ⚡ ⚡ [Impulsos Eléctricos +5V / -5V en Pares Trenzados] ⚡ ⚡ ⚡</div>
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
                <li><strong>OUI (Organizationally Unique Identifier):</strong> Primeros 24 bits asignados por la IEEE para identificar al fabricante.</li>
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

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Topología de Subredes IPv4 (FLSM)</h2>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <label style="font-size:0.88rem; font-weight:bold; align-self:center;">Prefijo de Subred:</label>
                    <select id="c3-cidr-select" class="att-status-select" onchange="runSubnetSimulation()">
                        <option value="26">Subred 1 (/26 - 62 Hosts útiles)</option>
                        <option value="27" selected>Subred 2 (/27 - 30 Hosts útiles)</option>
                        <option value="30">Subred 3 (/30 - Enlace WAN Punto a Punto)</option>
                    </select>
                </div>
                <div class="vlan-status-banner" id="c3-status">Selecciona una subred arriba para verificar el enrutamiento.</div>
                <div class="vlan-topology-stage" id="c3-stage">
                    <svg class="vlan-cables-svg"><line id="c3-c1" class="vlan-cable access-cable-10"/><line id="c3-c2" class="vlan-cable access-cable-20"/><line id="c3-c3" class="vlan-cable trunk-cable"/></svg>
                    <div class="vlan-device router-device" id="c3-r1">
                        <i class="fa-solid fa-route device-icon"></i>
                        <span class="device-name">Router (R1)</span>
                        <span class="device-subnet">192.168.1.0/24</span>
                    </div>
                    <div class="vlan-pcs-row" style="margin-top:1rem;">
                        <div class="vlan-device switch-device" id="c3-sw1">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">SW-Ventas (/26)</span>
                            <span class="vlan-tag-pill vlan10-pill">192.168.1.0/26</span>
                        </div>
                        <div class="vlan-device switch-device" id="c3-sw2">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">SW-Finanzas (/27)</span>
                            <span class="vlan-tag-pill vlan20-pill">192.168.1.64/27</span>
                        </div>
                        <div class="vlan-device switch-device" id="c3-sw3">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">SW-WAN (/30)</span>
                            <span class="vlan-tag-pill" style="background:#f59e0b; color:#fff;">10.0.0.0/30</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c3-packet"><span class="packet-tag">IP</span></div>
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
                    <p>Este examen parcial se califica en escala de <strong>0 a 20 puntos</strong>. Mínimo aprobatorio: <strong>10 pts</strong>.</p>
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
                </div>
                <div class="vlan-status-banner" id="vlan-status-text">Selecciona un escenario arriba para iniciar la simulación animada.</div>
                <div class="vlan-topology-stage" id="vlan-stage">
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

                    <div class="vlan-packet hidden" id="vlan-packet">
                        <span class="packet-tag" id="packet-tag-label">VID:10</span>
                    </div>
                </div>
            </div>
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

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Convergencia STP y Falla de Enlace</h2>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-primary btn-sm active" onclick="runSTPSimulation('converge')"><i class="fa-solid fa-play"></i> 1. Convergencia STP (Puerto Bloqueado BLK)</button>
                    <button class="btn btn-outline btn-sm" onclick="runSTPSimulation('failover')"><i class="fa-solid fa-bolt"></i> 2. Simular Falla de Enlace & Reconvergencia</button>
                    <button class="btn btn-secondary btn-sm" onclick="initClase6Sim()"><i class="fa-solid fa-rotate-left"></i> Reiniciar</button>
                </div>
                <div class="vlan-status-banner" id="c6-status">Haz clic en un escenario arriba para evaluar el algoritmo STP.</div>
                <div class="vlan-topology-stage" id="c6-stage">
                    <svg class="vlan-cables-svg"><line id="c6-c1" class="vlan-cable trunk-cable"/><line id="c6-c2" class="vlan-cable trunk-cable"/><line id="c6-c3" class="vlan-cable trunk-cable"/></svg>
                    <div class="vlan-pcs-row">
                        <div class="vlan-device switch-device" id="c6-sw1">
                            <i class="fa-solid fa-crown" style="color:#f59e0b;"></i>
                            <span class="device-name">SW-1 (Root Bridge)</span>
                            <span class="vlan-tag-pill vlan10-pill">BID: 4096</span>
                        </div>
                        <div class="vlan-device switch-device" id="c6-sw2">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">SW-2 (Designated)</span>
                            <span class="vlan-tag-pill vlan20-pill">BID: 32768</span>
                        </div>
                        <div class="vlan-device switch-device" id="c6-sw3">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">SW-3 (Blocked Port)</span>
                            <span class="vlan-tag-pill" style="background:#ef4444; color:#fff;">BLK Port</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c6-packet"><span class="packet-tag">BPDU</span></div>
                </div>
            </div>
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

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Algoritmo Dijkstra OSPFv2 (Área 0)</h2>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm active" onclick="runOSPFSimulation('hello')"><i class="fa-solid fa-handshake"></i> 1. Paquetes Hello (224.0.0.5)</button>
                    <button class="btn btn-primary btn-sm" onclick="runOSPFSimulation('dijkstra')"><i class="fa-solid fa-calculator"></i> 2. Ruta Óptima SPF (Dijkstra)</button>
                    <button class="btn btn-secondary btn-sm" onclick="initClase7Sim()"><i class="fa-solid fa-rotate-left"></i> Reiniciar</button>
                </div>
                <div class="vlan-status-banner" id="c7-status">Selecciona un escenario arriba para evaluar el algoritmo OSPF.</div>
                <div class="vlan-topology-stage" id="c7-stage">
                    <svg class="vlan-cables-svg"><line id="c7-c1" class="vlan-cable access-cable-10"/><line id="c7-c2" class="vlan-cable access-cable-10"/><line id="c7-c3" class="vlan-cable trunk-cable"/><line id="c7-c4" class="vlan-cable trunk-cable"/></svg>
                    <div class="vlan-pcs-row">
                        <div class="vlan-device router-device" id="c7-r1">
                            <i class="fa-solid fa-route device-icon"></i>
                            <span class="device-name">Router R1</span>
                            <span class="vlan-tag-pill vlan10-pill">Gigabit (Costo 10)</span>
                        </div>
                        <div class="vlan-device router-device" id="c7-r2">
                            <i class="fa-solid fa-route device-icon"></i>
                            <span class="device-name">Router R2</span>
                            <span class="vlan-tag-pill vlan10-pill">Gigabit (Costo 10)</span>
                        </div>
                        <div class="vlan-device router-device" id="c7-r3">
                            <i class="fa-solid fa-route device-icon"></i>
                            <span class="device-name">Router R3</span>
                            <span class="vlan-tag-pill" style="background:#ef4444; color:#fff;">Slow (Costo 100)</span>
                        </div>
                        <div class="vlan-device router-device" id="c7-r4">
                            <i class="fa-solid fa-route device-icon"></i>
                            <span class="device-name">Router R4</span>
                            <span class="vlan-tag-pill vlan20-pill">Destino OSPF</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c7-packet"><span class="packet-tag">LSA</span></div>
                </div>
            </div>
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
                        </div>
                        <div class="diag-exp-box"></div>
                    </div>
                </div>
            </div>

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Escala de Calificación Oficial:</h4>
                    <p>Este examen parcial se califica en escala de <strong>0 a 20 puntos</strong>. Mínimo aprobatorio: <strong>10 pts</strong>.</p>
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

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Filtrado de Paquetes ACL 101 (Firewall)</h2>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm active" onclick="runACLSimulation('web')"><i class="fa-solid fa-globe"></i> 1. Tráfico HTTP (Puerto 80 - Permitido)</button>
                    <button class="btn btn-outline btn-sm" onclick="runACLSimulation('ssh')"><i class="fa-solid fa-terminal"></i> 2. Tráfico SSH (Puerto 22 - Denegado)</button>
                    <button class="btn btn-secondary btn-sm" onclick="initClase9Sim()"><i class="fa-solid fa-rotate-left"></i> Reiniciar</button>
                </div>
                <div class="vlan-status-banner" id="c9-status">Selecciona un tipo de paquete de prueba arriba para inspeccionar la ACL.</div>
                <div class="vlan-topology-stage" id="c9-stage">
                    <svg class="vlan-cables-svg"><line id="c9-c1" class="vlan-cable access-cable-10"/><line id="c9-c2" class="vlan-cable access-cable-20"/><line id="c9-c3" class="vlan-cable trunk-cable"/></svg>
                    <div class="vlan-pcs-row">
                        <div class="vlan-device pc-device vlan10-pc" id="c9-pc1">
                            <i class="fa-solid fa-user-shield device-icon"></i>
                            <span class="device-name">PC Admin</span>
                            <span class="vlan-tag-pill vlan10-pill">192.168.1.10</span>
                        </div>
                        <div class="vlan-device pc-device vlan20-pc" id="c9-pc2">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC Invitado</span>
                            <span class="vlan-tag-pill vlan20-pill">192.168.1.50</span>
                        </div>
                        <div class="vlan-device router-device" id="c9-r1">
                            <i class="fa-solid fa-shield-halved device-icon" style="color:var(--danger);"></i>
                            <span class="device-name">Router Firewall</span>
                            <span class="vlan-tag-pill" style="background:var(--danger); color:#fff;">ACL 101</span>
                        </div>
                        <div class="vlan-device pc-device" id="c9-srv">
                            <i class="fa-solid fa-server device-icon"></i>
                            <span class="device-name">Servidor Web/SSH</span>
                            <span class="device-ip">10.0.0.5</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c9-packet"><span class="packet-tag">ACL</span></div>
                </div>
            </div>
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

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Tabla NAT / PAT Overload & IPv6 SLAAC</h2>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm active" onclick="runNATSimulation('pat')"><i class="fa-solid fa-bolt"></i> 1. PAT Overload (Mapeo de Puerto Privado ➔ Público)</button>
                    <button class="btn btn-outline btn-sm" onclick="runNATSimulation('slaac')"><i class="fa-solid fa-network-wired"></i> 2. Autoconfiguración IPv6 SLAAC</button>
                    <button class="btn btn-secondary btn-sm" onclick="initClase10Sim()"><i class="fa-solid fa-rotate-left"></i> Reiniciar</button>
                </div>
                <div class="vlan-status-banner" id="c10-status">Haz clic en un escenario arriba para iniciar la simulación NAT.</div>
                <div class="vlan-topology-stage" id="c10-stage">
                    <svg class="vlan-cables-svg"><line id="c10-c1" class="vlan-cable access-cable-10"/><line id="c10-c2" class="vlan-cable access-cable-10"/><line id="c10-c3" class="vlan-cable trunk-cable"/></svg>
                    <div class="vlan-pcs-row">
                        <div class="vlan-device pc-device vlan10-pc" id="c10-pc1">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-LAN 1</span>
                            <span class="vlan-tag-pill vlan10-pill">192.168.1.10:50123</span>
                        </div>
                        <div class="vlan-device pc-device vlan10-pc" id="c10-pc2">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">PC-LAN 2</span>
                            <span class="vlan-tag-pill vlan10-pill">192.168.1.11:50124</span>
                        </div>
                        <div class="vlan-device router-device" id="c10-r1">
                            <i class="fa-solid fa-route device-icon"></i>
                            <span class="device-name">Router NAT</span>
                            <span class="vlan-tag-pill" style="background:#f59e0b; color:#fff;">IP Pública: 200.1.1.1</span>
                        </div>
                        <div class="vlan-device pc-device vlan20-pc" id="c10-web">
                            <i class="fa-solid fa-cloud device-icon"></i>
                            <span class="device-name">Servidor Internet</span>
                            <span class="device-ip">8.8.8.8</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c10-packet"><span class="packet-tag">NAT</span></div>
                </div>
                <div class="vlan-packet-inspector">
                    <h4><i class="fa-solid fa-table"></i> Tabla de Traducción de Direcciones NAT PAT (Router)</h4>
                    <table class="custom-table" style="margin:0;">
                        <thead><tr><th>Tipo Dirección</th><th>IP : Puerto</th></tr></thead>
                        <tbody id="c10-nat-table"><tr><td>Inside Global</td><td>200.1.1.1:50123</td></tr><tr><td>Inside Local</td><td>192.168.1.10:50123</td></tr></tbody>
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

            <h2><i class="fa-solid fa-play-circle"></i> Simulador Interactivo: Servicios de Red DHCP DORA & DNS</h2>
            <div class="vlan-simulator-container">
                <div class="vlan-controls">
                    <button class="btn btn-outline btn-sm active" onclick="runServicesSimulation('dora')"><i class="fa-solid fa-play"></i> 1. Proceso DHCP DORA (Solicitud de IP)</button>
                    <button class="btn btn-outline btn-sm" onclick="runServicesSimulation('dns')"><i class="fa-solid fa-magnifying-glass"></i> 2. Consulta DNS (Resolución de Nombre)</button>
                    <button class="btn btn-secondary btn-sm" onclick="initClase11Sim()"><i class="fa-solid fa-rotate-left"></i> Reiniciar</button>
                </div>
                <div class="vlan-status-banner" id="c11-status">Haz clic en un escenario arriba para iniciar la animación de servicios.</div>
                <div class="vlan-topology-stage" id="c11-stage">
                    <svg class="vlan-cables-svg"><line id="c11-c1" class="vlan-cable access-cable-10"/><line id="c11-c2" class="vlan-cable trunk-cable"/><line id="c11-c3" class="vlan-cable access-cable-20"/></svg>
                    <div class="vlan-pcs-row">
                        <div class="vlan-device pc-device vlan10-pc" id="c11-pc1">
                            <i class="fa-solid fa-desktop device-icon"></i>
                            <span class="device-name">Cliente PC</span>
                            <span class="device-ip">DHCP Client</span>
                        </div>
                        <div class="vlan-device switch-device" id="c11-sw1">
                            <i class="fa-solid fa-network-wired device-icon"></i>
                            <span class="device-name">Switch (SW1)</span>
                            <span class="device-subnet">Capa 2</span>
                        </div>
                        <div class="vlan-device pc-device" id="c11-dhcp">
                            <i class="fa-solid fa-server device-icon" style="color:var(--primary);"></i>
                            <span class="device-name">Servidor DHCP</span>
                            <span class="device-ip">192.168.1.1</span>
                        </div>
                        <div class="vlan-device pc-device" id="c11-dns">
                            <i class="fa-solid fa-globe device-icon" style="color:var(--accent);"></i>
                            <span class="device-name">Servidor DNS</span>
                            <span class="device-ip">8.8.8.8</span>
                        </div>
                    </div>
                    <div class="vlan-packet hidden" id="c11-packet"><span class="packet-tag">DORA</span></div>
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
