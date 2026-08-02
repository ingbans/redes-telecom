/* ==========================================================================
   ACADEMIC SYLLABUS DATA - TELECOM NETWORKS (12 CLASSES STRUCTURE)
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
            <p>Comprender la transmisión de datos mediante capas independientes utilizando los modelos de referencia estándar OSI y TCP/IP.</p>

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
            <p>Analizar los medios de transmisión físicos (guiados y no guiados) y el formato de la trama Ethernet junto a las direcciones MAC de 48 bits.</p>

            <h2><i class="fa-solid fa-network-wired"></i> Medios de Transmisión</h2>
            <ul>
                <li><strong>Cables de Cobre UTP:</strong> Categorías 5e, 6 y 6A. Normas T568A y T568B. Reducción de diafonía (Crosstalk) mediante pares trenzados.</li>
                <li><strong>Fibra Óptica:</strong> Monomodo (SMF - Larga distancia, núcleo pequeño) y Multimodo (MMF - Distancias cortas en LAN/Datacenters, núcleo mayor).</li>
                <li><strong>Inalámbrico (Wi-Fi 802.11):</strong> Propagación por radiofrecuencia (2.4 GHz, 5 GHz y 6 GHz).</li>
            </ul>

            <h2><i class="fa-solid fa-barcode"></i> Estructura de la Dirección MAC</h2>
            <p>Una dirección física MAC consta de 48 bits (6 bytes) expresados en notación hexadecimal:</p>
            <ul>
                <li><strong>OUI (Organizationally Unique Identifier):</strong> Primeros 24 bits asignados por la IEEE para identificar al fabricante.</li>
                <li><strong>Identificador de Dispositivo:</strong> Últimos 24 bits asignados de forma única por el fabricante.</li>
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
            <p>Dominar la estructura de 32 bits de las direcciones IPv4 y el cálculo matemático de subredes IP mediante préstamos de bits en notación CIDR.</p>

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

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Escala de Calificación Oficial:</h4>
                    <p>Este examen parcial se califica estrictamente en una escala de <strong>0 a 20 puntos</strong>.</p>
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
                <div class="vlan-topology-stage">
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
            <p>Analizar la elección del Root Bridge en STP y la regla de selección de ruta por el prefijo más largo (Longest Prefix Match) en routers.</p>

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
            <p>Estudiar la construcción de la base de datos de estado de enlace (LSDB) y el cálculo de mapas de red mediante el algoritmo Dijkstra (SPF).</p>

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

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Escala de Calificación Oficial:</h4>
                    <p>Este examen parcial se califica estrictamente en una escala de <strong>0 a 20 puntos</strong>.</p>
                </div>
            </div>
        `
    },
    {
        id: "clase-9",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 9",
        title: "Clase 9: Servicios IP (DHCP, NAT/PAT) y Seguridad con ACLs",
        duration: "4 Horas",
        description: "Asignación dinámica DHCP (DORA), traducción PAT (NAT overload) y filtrado de paquetes con ACLs Estándar y Extendidas.",
        content: `
            <h2><i class="fa-solid fa-shield-halved"></i> Objetivos Teóricos de la Clase 9</h2>
            <p>Comprender la traducción de direcciones PAT y el diseño de reglas de control de acceso en Capas 3 y 4.</p>

            <h2><i class="fa-solid fa-filter"></i> Regla del Deny Implícito en ACLs</h2>
            <p>Al final de toda Lista de Control de Acceso existe una regla invisible de denegación implícita que descarta todo paquete que no haya coincidido con ninguna regla previa.</p>
        `
    },
    {
        id: "clase-10",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 10",
        title: "Clase 10: Fundamentos de IPv6 y Autoconfiguración SLAAC",
        duration: "4 Horas",
        description: "Estructura de 128 bits en hexadecimal, direcciones Global Unicast vs Link-Local y autoconfiguración SLAAC.",
        content: `
            <h2><i class="fa-solid fa-globe"></i> Objetivos Teóricos de la Clase 10</h2>
            <p>Dominar la notación hexadecimal de 128 bits de IPv6, reglas de simplificación de ceros y autoconfiguración asistida por ICMPv6 (SLAAC).</p>
        `
    },
    {
        id: "clase-11",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 11",
        title: "Clase 11: Arquitectura SDN, APIs REST y Formato JSON",
        duration: "4 Horas",
        description: "Separación del Plano de Control y Datos, controladores SDN, arquitectura de APIs REST y parsing de datos JSON.",
        content: `
            <h2><i class="fa-solid fa-robot"></i> Objetivos Teóricos de la Clase 11</h2>
            <p>Comprender la evolución hacia las redes definidas por software (SDN) y la estructura de datos jerárquica en formato JSON.</p>
        `
    },
    {
        id: "clase-12",
        moduleId: "bloque3",
        moduleName: "Bloque 3: Servicios, Seguridad e IPv6 (Clases 9 a 12)",
        weekNumber: "Clase 12",
        title: "Clase 12: 🎓 TERCER EXAMEN PARCIAL / EXAMEN FINAL",
        duration: "4 Horas",
        description: "Evaluación final integradora (Clases 9, 10 y 11 + Caso Teórico Integrador) y cierre de actas.",
        content: `
            <h2><i class="fa-solid fa-graduation-cap"></i> Contenido Evaluado en el Examen Final</h2>
            <p>Evaluación teórica integradora sobre Servicios IP, ACLs, IPv6, SDN y caso sintético global de diseño de redes de telecomunicaciones.</p>

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Escala de Calificación Oficial:</h4>
                    <p>Este examen final se califica estrictamente en una escala de <strong>0 a 20 puntos</strong>.</p>
                </div>
            </div>
        `
    }
];
