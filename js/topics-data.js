/* ==========================================================================
   TOPICS DATA DATABASE (CCNA 200-301)
   Complete educational material for Telecom Networks course
   ========================================================================== */

const courseTopicsData = [
    {
        id: "m1-osi-tcpip",
        moduleId: "m1",
        moduleName: "Módulo 1: Fundamentos de Redes",
        title: "Modelo OSI vs TCP/IP y Arquitecturas de Red",
        duration: "25 min",
        description: "Comprende la pila de protocolos fundamental, el proceso de encapsulamiento y cómo se estructuran las redes modernas.",
        content: `
            <h2><i class="fa-solid fa-layer-group"></i> Introducción a los Modelos de Red</h2>
            <p>En telecomunicaciones, las redes de datos se diseñan siguiendo arquitecturas en capas para garantizar la interoperabilidad entre diferentes fabricantes de hardware y software. Los dos modelos de referencia principales son el <strong>Modelo OSI (Open Systems Interconnection)</strong> de 7 capas y el <strong>Modelo TCP/IP</strong> de 4 capas.</p>

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-lightbulb"></i></div>
                <div class="callout-content">
                    <h4>Punto Clave para el Examen CCNA:</h4>
                    <p>Mientras que OSI es un modelo teórico de 7 capas utilizado principalmente para enseñanza y estandarización, TCP/IP es la suite de protocolos práctica utilizada en el Internet real.</p>
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
                            <th>Ejemplos de Protocolos / Dispositivos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>7</td>
                            <td>Aplicación</td>
                            <td rowspan="3">Aplicación</td>
                            <td rowspan="3">Datos</td>
                            <td>HTTP, HTTPS, DNS, SSH, FTP, DHCP</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Presentación</td>
                            <td>SSL/TLS, JPEG, ASCII, PNG</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Sesión</td>
                            <td>NetBIOS, PPTP, RPC</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Transporte</td>
                            <td>Transporte</td>
                            <td>Segmento (TCP) / Datagrama (UDP)</td>
                            <td>TCP, UDP, Números de Puerto (80, 443, 22)</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Red</td>
                            <td>Internet</td>
                            <td>Paquete</td>
                            <td>IPv4, IPv6, ICMP, Routers (Encaminadores)</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Enlace de Datos</td>
                            <td rowspan="2">Acceso a la Red</td>
                            <td>Trama (Frame)</td>
                            <td>Ethernet 802.3, Wi-Fi 802.11, Switches L2, MAC</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Física</td>
                            <td>Bits</td>
                            <td>Cables UTP, Fibra Óptica, Hubs, Transceivers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2><i class="fa-solid fa-boxes-packing"></i> El Proceso de Encapsulamiento de Datos</h2>
            <p>A medida que los datos descienden por la pila de protocolos desde la Capa de Aplicación hasta la Capa Física en el emisor, cada capa añade su propia cabecera (Header) con información de control. Este proceso se conoce como <strong>Encapsulamiento</strong>.</p>
            
            <ul>
                <li><strong>Segmento:</strong> Capa de Transporte (añade puertos origen/destino y control de secuencia TCP).</li>
                <li><strong>Paquete:</strong> Capa de Red (añade direcciones IP origen y destino).</li>
                <li><strong>Trama:</strong> Capa de Enlace de Datos (añade direcciones MAC origen/destino y tráiler FCS para detección de errores).</li>
            </ul>

            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Formato de Trama Ethernet II</span>
                </div>
                <pre><code>[ Preamble (8B) ] [ MAC Destino (6B) ] [ MAC Origen (6B) ] [ Type (2B) ] [ Data (IP Packet) ] [ FCS (4B) ]</code></pre>
            </div>
        `
    },
    {
        id: "m1-ipv4-subnetting",
        moduleId: "m1",
        moduleName: "Módulo 1: Fundamentos de Redes",
        title: "Direccionamiento IPv4 y Subnetting VLSM",
        duration: "35 min",
        description: "Domina la estructura de direcciones IPv4, máscaras de subred, cálculo de rangos y subdivisión VLSM.",
        content: `
            <h2><i class="fa-solid fa-network-wired"></i> Estructura de una Dirección IPv4</h2>
            <p>Una dirección IPv4 consta de <strong>32 bits</strong> expresados en formato decimal punteado divididos en 4 octetos (ejemplo: <code>192.168.1.100</code>). Cada dirección contiene dos partes fundamentales:</p>
            <ul>
                <li><strong>Porción de Red:</strong> Identifica el segmento de red al que pertenece el dispositivo.</li>
                <li><strong>Porción de Host:</strong> Identifica al dispositivo individual dentro de esa red.</li>
            </ul>

            <h2><i class="fa-solid fa-calculator"></i> Subnetting y VLSM (Variable Length Subnet Mask)</h2>
            <p>El subnetting consiste en dividir una red IP grande en subredes más pequeñas para reducir el dominio de broadcast y optimizar la asignación de direcciones. La técnica <strong>VLSM</strong> permite usar máscaras de longitud variable adaptadas exactamente a la cantidad de hosts necesarios en cada segmento.</p>

            <div class="callout callout-tip">
                <div class="callout-icon"><i class="fa-solid fa-gears"></i></div>
                <div class="callout-content">
                    <h4>Fórmula Mágica del Subnetting:</h4>
                    <p><strong>Hosts Utiles por Subred:</strong> <code>2^(bits de host) - 2</code> (se restan 2 para la Dirección de Red y la Dirección de Broadcast).</p>
                </div>
            </div>

            <div class="custom-table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Prefijo CIDR</th>
                            <th>Máscara de Subred</th>
                            <th>Bits de Host</th>
                            <th>Hosts Usables</th>
                            <th>Salto de Red (Bloque)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>/24</td><td>255.255.255.0</td><td>8</td><td>254</td><td>256</td></tr>
                        <tr><td>/25</td><td>255.255.255.128</td><td>7</td><td>126</td><td>128</td></tr>
                        <tr><td>/26</td><td>255.255.255.192</td><td>6</td><td>62</td><td>64</td></tr>
                        <tr><td>/27</td><td>255.255.255.224</td><td>5</td><td>30</td><td>32</td></tr>
                        <tr><td>/28</td><td>255.255.255.240</td><td>4</td><td>14</td><td>16</td></tr>
                        <tr><td>/29</td><td>255.255.255.248</td><td>3</td><td>6</td><td>8</td></tr>
                        <tr><td>/30</td><td>255.255.255.252</td><td>2</td><td>2 (Ideal para enlaces WAN Punto a Punto)</td><td>4</td></tr>
                    </tbody>
                </table>
            </div>

            <p>💡 Puedes practicar cálculos instantáneos usando nuestra <strong><a href="#tool-subnet" onclick="window.appNav('subnet')">Calculadora de Subnetting</a></strong> del curso.</p>
        `
    },
    {
        id: "m2-vlans-trunking",
        moduleId: "m2",
        moduleName: "Módulo 2: Acceso a la Red",
        title: "VLANs, Trunking 802.1Q y DTP",
        duration: "30 min",
        description: "Configuración de Redes Locales Virtuales, enlaces troncales mediante etiquetado IEEE 802.1Q y negociación DTP.",
        content: `
            <h2><i class="fa-solid fa-diagram-project"></i> ¿Qué es una VLAN (Virtual LAN)?</h2>
            <p>Una VLAN permite segmentar lógicamente una red física en múltiples dominios de broadcast independientes. Los beneficios incluyen mayor seguridad, reducción de tráfico broadcast y flexibilidad organizativa por departamentos (ej. Ventas, Ingeniería, Servidores).</p>

            <h2><i class="fa-solid fa-code"></i> Configuración de VLANs en Cisco IOS</h2>
            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Cisco CLI - Crear VLANs y Asignar Puertos</span>
                </div>
                <pre><code><span class="cli-prompt">Switch#</span> <span class="cli-cmd">configure terminal</span>
<span class="cli-prompt">Switch(config)#</span> <span class="cli-cmd">vlan 10</span>
<span class="cli-prompt">Switch(config-vlan)#</span> <span class="cli-cmd">name VENTAS</span>
<span class="cli-prompt">Switch(config-vlan)#</span> <span class="cli-cmd">exit</span>

<span class="cli-comment">! Asignar interfaz FastEthernet0/1 a la VLAN 10</span>
<span class="cli-prompt">Switch(config)#</span> <span class="cli-cmd">interface fastethernet 0/1</span>
<span class="cli-prompt">Switch(config-if)#</span> <span class="cli-cmd">switchport mode access</span>
<span class="cli-prompt">Switch(config-if)#</span> <span class="cli-cmd">switchport access vlan 10</span></code></pre>
            </div>

            <h2><i class="fa-solid fa-link"></i> Enlaces Troncales (Trunk) y Etiquetado IEEE 802.1Q</h2>
            <p>Un enlace troncal transporta tráfico de múltiples VLANs a través de un solo cable físico entre dos switches o entre un switch y un router. El protocolo estándar <strong>IEEE 802.1Q</strong> inserta una etiqueta (Tag) de 4 bytes en la trama Ethernet que contiene el <strong>VLAN ID (VID)</strong>.</p>

            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Cisco CLI - Configurar Enlace Troncal (Trunk)</span>
                </div>
                <pre><code><span class="cli-prompt">Switch(config)#</span> <span class="cli-cmd">interface gigabitethernet 0/1</span>
<span class="cli-prompt">Switch(config-if)#</span> <span class="cli-cmd">switchport trunk encapsulation dot1q</span> <span class="cli-comment">! (Requerido en switches 3560/3750)</span>
<span class="cli-prompt">Switch(config-if)#</span> <span class="cli-cmd">switchport mode trunk</span>
<span class="cli-prompt">Switch(config-if)#</span> <span class="cli-cmd">switchport trunk allowed vlan 10,20,30</span></code></pre>
            </div>
        `
    },
    {
        id: "m2-stp-rstp",
        moduleId: "m2",
        moduleName: "Módulo 2: Acceso a la Red",
        title: "Spanning Tree Protocol (STP y Rapid PVST+)",
        duration: "30 min",
        description: "Evita bucles de capa 2 en topologías redundantes mediante la selección del Root Bridge y estados de puertos.",
        content: `
            <h2><i class="fa-solid fa-rotate"></i> La Necesidad de STP en Redes Conmutadas</h2>
            <p>Para prevenir puntos únicos de falla, las redes LAN incorporan enlaces redundantes entre switches. Sin embargo, sin un protocolo de control, las tramas de broadcast circulan infinitamente creando <strong>Tormentas de Broadcast</strong> y duplicación de tramas que colapsan la red.</p>

            <h2><i class="fa-solid fa-crown"></i> Selección del Root Bridge (Puente Raíz)</h2>
            <p>STP asigna a un switch central como el <strong>Root Bridge</strong> de la topología. La selección se basa en la <strong>Bridge ID (BID)</strong> más baja:</p>
            <p><code>Bridge ID = Prioridad del Switch (por defecto 32768) + Dirección MAC del Switch</code></p>

            <h2><i class="fa-solid fa-code"></i> Ajuste de Prioridad STP en Cisco IOS</h2>
            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Cisco CLI - Forzar Switch como Root Bridge Primario</span>
                </div>
                <pre><code><span class="cli-prompt">Switch(config)#</span> <span class="cli-cmd">spanning-tree mode rapid-pvst</span>
<span class="cli-prompt">Switch(config)#</span> <span class="cli-cmd">spanning-tree vlan 10 root primary</span>
<span class="cli-comment">! O asignando la prioridad manualmente (múltiplos de 4096)</span>
<span class="cli-prompt">Switch(config)#</span> <span class="cli-cmd">spanning-tree vlan 10 priority 4096</span></code></pre>
            </div>
        `
    },
    {
        id: "m3-routing-ospf",
        moduleId: "m3",
        moduleName: "Módulo 3: Conectividad IP y Enrutamiento",
        title: "Enrutamiento Dinámico OSPFv2 (Single & Multi-Area)",
        duration: "40 min",
        description: "Configuración, métrica del costo, adyacencias de vecinos y operación del protocolo Link-State OSPFv2.",
        content: `
            <h2><i class="fa-solid fa-route"></i> Fundamentos de OSPFv2 (Open Shortest Path First)</h2>
            <p>OSPF es un protocolo de enrutamiento dinámico de <strong>Estado de Enlace (Link-State)</strong> de estándar abierto que utiliza el algoritmo de Dijkstra (SPF) para calcular la ruta más corta sin bucles hacia cada red destino.</p>

            <div class="callout callout-info">
                <div class="callout-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="callout-content">
                    <h4>Métrica de OSPF (Costo):</h4>
                    <p>El costo de una interfaz en OSPF se calcula como: <code>Costo = Ancho de Banda de Referencia (100 Mbps por defecto) / Ancho de Banda de la Interfaz</code>.</p>
                </div>
            </div>

            <h2><i class="fa-solid fa-code"></i> Configuración de OSPFv2 Single-Area (Área 0)</h2>
            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Cisco CLI - Habilitar OSPFv2 en Router</span>
                </div>
                <pre><code><span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">router ospf 1</span>
<span class="cli-prompt">Router(config-router)#</span> <span class="cli-cmd">router-id 1.1.1.1</span> <span class="cli-comment">! Asignar Router ID explícito</span>
<span class="cli-prompt">Router(config-router)#</span> <span class="cli-cmd">network 192.168.10.0 0.0.0.255 area 0</span>
<span class="cli-prompt">Router(config-router)#</span> <span class="cli-cmd">network 10.0.0.0 0.0.0.3 area 0</span>
<span class="cli-prompt">Router(config-router)#</span> <span class="cli-cmd">passive-interface g0/0</span> <span class="cli-comment">! No enviar hellos a redes LAN de usuarios</span></code></pre>
            </div>

            <h2><i class="fa-solid fa-terminal"></i> Verificación de Adyacencias OSPF</h2>
            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Comandos de Verificación</span>
                </div>
                <pre><code><span class="cli-prompt">Router#</span> <span class="cli-cmd">show ip ospf neighbor</span>
<span class="cli-prompt">Router#</span> <span class="cli-cmd">show ip route ospf</span>
<span class="cli-prompt">Router#</span> <span class="cli-cmd">show ip ospf interface brief</span></code></pre>
            </div>
        `
    },
    {
        id: "m4-ip-services-nat-dhcp",
        moduleId: "m4",
        moduleName: "Módulo 4: Servicios IP y Gestión",
        title: "Servicios IP: DHCP, NAT/PAT y SSH",
        duration: "30 min",
        description: "Implementación de servidores DHCP en routers, traducción de direcciones NAT/PAT y gestión segura vía SSH.",
        content: `
            <h2><i class="fa-solid fa-server"></i> DHCP (Dynamic Host Configuration Protocol)</h2>
            <p>DHCP automatiza la asignación de direcciones IP, máscaras de subred, puerta de enlace predeterminada y servidores DNS a los clientes finales mediante el proceso <strong>DORA</strong> (Discover, Offer, Request, Acknowledge).</p>

            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Cisco CLI - Configurar Servidor DHCP en Router</span>
                </div>
                <pre><code><span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">ip dhcp excluded-address 192.168.10.1 192.168.10.10</span>
<span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">ip dhcp pool LAN_USUARIOS</span>
<span class="cli-prompt">Router(config-dhcp)#</span> <span class="cli-cmd">network 192.168.10.0 255.255.255.0</span>
<span class="cli-prompt">Router(config-dhcp)#</span> <span class="cli-cmd">default-router 192.168.10.1</span>
<span class="cli-prompt">Router(config-dhcp)#</span> <span class="cli-cmd">dns-server 8.8.8.8 8.8.4.4</span></code></pre>
            </div>

            <h2><i class="fa-solid fa-globe"></i> NAT y PAT (Port Address Translation)</h2>
            <p>PAT (NAT con sobrecarga) permite que cientos de dispositivos en una red privada con direcciones IPv4 RFC 1918 compartan una única dirección IP pública para navegar en Internet mediante la multiplexación de números de puertos TCP/UDP.</p>

            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Cisco CLI - Configurar PAT (NAT overload)</span>
                </div>
                <pre><code><span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">access-list 1 permit 192.168.10.0 0.0.0.255</span>
<span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">ip nat inside source list 1 interface gigabitethernet 0/1 overload</span>
<span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">interface g0/0</span>
<span class="cli-prompt">Router(config-if)#</span> <span class="cli-cmd">ip nat inside</span>
<span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">interface g0/1</span>
<span class="cli-prompt">Router(config-if)#</span> <span class="cli-cmd">ip nat outside</span></code></pre>
            </div>
        `
    },
    {
        id: "m5-security-acls",
        moduleId: "m5",
        moduleName: "Módulo 5: Fundamentos de Seguridad",
        title: "Listas de Control de Acceso (ACLs Estándar y Extendidas)",
        duration: "35 min",
        description: "Filtrado de tráfico en capas 3 y 4 mediante ACLs numéricas y nombradas para protección de red.",
        content: `
            <h2><i class="fa-solid fa-shield-halved"></i> ¿Qué es una ACL (Access Control List)?</h2>
            <p>Una ACL es una lista de reglas de permiso (permit) o denegación (deny) aplicadas a las interfaces de un router para inspeccionar el paquete entrante (inbound) o saliente (outbound).</p>

            <div class="callout callout-warning">
                <div class="callout-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div class="callout-content">
                    <h4>Regla de Oro en ACLs: Deny Implicit final</h4>
                    <p>Al final de CUALQUIER lista de control de acceso existe una regla invisible <code>deny ip any any</code>. Si un paquete no coincide con ninguna regla explícita, se descartará por defecto.</p>
                </div>
            </div>

            <h2><i class="fa-solid fa-code"></i> ACL Extendida Nombrada (Ejemplo Práctico)</h2>
            <p>Bloquear acceso HTTP/HTTPS desde la red de pruebas hacia la red de servidores, permitiendo el resto del tráfico.</p>

            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Cisco CLI - Configurar ACL Extendida Nombrada</span>
                </div>
                <pre><code><span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">ip access-list extended FILTRO_SERVIDORES</span>
<span class="cli-prompt">Router(config-ext-nacl)#</span> <span class="cli-cmd">deny tcp 192.168.20.0 0.0.0.255 host 10.0.0.50 eq 80</span>
<span class="cli-prompt">Router(config-ext-nacl)#</span> <span class="cli-cmd">deny tcp 192.168.20.0 0.0.0.255 host 10.0.0.50 eq 443</span>
<span class="cli-prompt">Router(config-ext-nacl)#</span> <span class="cli-cmd">permit ip any any</span>

<span class="cli-comment">! Aplicar la ACL a la interfaz de entrada</span>
<span class="cli-prompt">Router(config)#</span> <span class="cli-cmd">interface g0/0</span>
<span class="cli-prompt">Router(config-if)#</span> <span class="cli-cmd">ip access-group FILTRO_SERVIDORES in</span></code></pre>
            </div>
        `
    },
    {
        id: "m6-automation-sdn",
        moduleId: "m6",
        moduleName: "Módulo 6: Automatización y Redes del Futuro",
        title: "Arquitectura SDN, APIs REST, JSON y Python en Redes",
        duration: "30 min",
        description: "Transformación digital de la administración de redes: Controladores SDN (Cisco DNA Center), formatos de datos JSON/YAML y APIs REST.",
        content: `
            <h2><i class="fa-solid fa-robot"></i> De CLI Tradicional a Redes Definidas por Software (SDN)</h2>
            <p>Las redes tradicionales basan su control en la administración manual dispositivo por dispositivo. SDN separa el <strong>Plano de Control (Control Plane)</strong> del <strong>Plano de Datos (Data Plane)</strong> centralizándolo en un controlador lógico (como Cisco DNA Center / Catalyst Center).</p>

            <h2><i class="fa-solid fa-code"></i> Formatos de Datos Estructurados: JSON</h2>
            <p>Las APIs REST de los controladores SDN intercambian información en formato JSON para la automatización mediante scripts de Python o Ansible.</p>

            <div class="code-block-wrapper">
                <div class="code-header">
                    <div class="code-header-dots">
                        <span class="dot dot-red"></span>
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-green"></span>
                    </div>
                    <span>Ejemplo de Estructura JSON de Dispositivo de Red</span>
                </div>
                <pre><code>{
  "hostname": "Router-Core-01",
  "ip_address": "192.168.1.1",
  "vendor": "Cisco",
  "interfaces": [
    { "name": "GigabitEthernet0/0", "status": "up", "vlan": 10 },
    { "name": "GigabitEthernet0/1", "status": "up", "vlan": 20 }
  ]
}</code></pre>
            </div>

            <h2><i class="fa-solid fa-cubes"></i> Verbos de HTTP en APIs REST</h2>
            <div class="custom-table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Verbo HTTP</th>
                            <th>Acción CRUD</th>
                            <th>Descripción en Automatización de Redes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>GET</td><td>Read (Leer)</td><td>Obtener estado de interfaces o inventario del controlador.</td></tr>
                        <tr><td>POST</td><td>Create (Crear)</td><td>Crear una nueva VLAN o política de seguridad en el controlador.</td></tr>
                        <tr><td>PUT / PATCH</td><td>Update (Actualizar)</td><td>Modificar la configuración existente de un dispositivo.</td></tr>
                        <tr><td>DELETE</td><td>Delete (Eliminar)</td><td>Eliminar un recurso o subred configurada.</td></tr>
                    </tbody>
                </table>
            </div>
        `
    }
];
