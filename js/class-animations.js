/* ==========================================================================
   CLASS ANIMATIONS & INTERACTIVE SIMULATORS CONTROLLER
   Full Topology Canvas, Animated Packets, Cable Paths & Packet Inspectors
   ========================================================================== */

let activeAnimTimeout = null;

// Universal helper to position and animate packet movement
function animatePacketTo(packetId, stageId, targetDeviceId, duration = 900) {
    return new Promise((resolve) => {
        const packet = document.getElementById(packetId);
        const stage = document.getElementById(stageId);
        const target = document.getElementById(targetDeviceId);

        if (!packet || !stage || !target) return resolve();

        const stageRect = stage.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const topOffset = (targetRect.top - stageRect.top) + (targetRect.height / 2) - 20;
        const leftOffset = (targetRect.left - stageRect.left) + (targetRect.width / 2) - 20;

        packet.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        packet.style.top = `${topOffset}px`;
        packet.style.left = `${leftOffset}px`;
        packet.classList.remove('hidden');

        setTimeout(resolve, duration);
    });
}

// Universal SVG Cable Connector
function drawTopologyCables(stageId, cableIdMap) {
    const stage = document.getElementById(stageId);
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();

    Object.entries(cableIdMap).forEach(([lineId, [dev1Id, dev2Id]]) => {
        const line = document.getElementById(lineId);
        const dev1 = document.getElementById(dev1Id);
        const dev2 = document.getElementById(dev2Id);

        if (line && dev1 && dev2) {
            const r1 = dev1.getBoundingClientRect();
            const r2 = dev2.getBoundingClientRect();

            const x1 = (r1.left - stageRect.left) + r1.width / 2;
            const y1 = (r1.top - stageRect.top) + r1.height / 2;
            const x2 = (r2.left - stageRect.left) + r2.width / 2;
            const y2 = (r2.top - stageRect.top) + r2.height / 2;

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
        }
    });
}

function clearDeviceHighlights(stageId) {
    const stage = document.getElementById(stageId);
    if (!stage) return;
    stage.querySelectorAll('.vlan-device').forEach(d => {
        d.className = d.className.replace(/highlight-\w+/g, '').trim();
    });
}

/* --------------------------------------------------------------------------
   CLASE 1: ENCAPSULAMIENTO OSI / TCP/IP
   -------------------------------------------------------------------------- */
const c1Cables = { 'c1-c1': ['c1-pc1', 'c1-sw1'], 'c1-c2': ['c1-sw1', 'c1-r1'], 'c1-c3': ['c1-r1', 'c1-srv'] };

function initClase1Sim() {
    setTimeout(() => {
        drawTopologyCables('c1-stage', c1Cables);
        runOSISimulation('encap');
    }, 150);
}

async function runOSISimulation(mode) {
    if (activeAnimTimeout) clearTimeout(activeAnimTimeout);
    clearDeviceHighlights('c1-stage');

    const status = document.getElementById('c1-status');
    const tag = document.getElementById('c1-packet-tag');
    const pdu = document.getElementById('c1-pdu-preview');

    if (mode === 'encap') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Escenario 1: Encapsulamiento en Emisor (PC-1).</strong> Generando datos HTTP...`;
        document.getElementById('c1-pc1').classList.add('highlight-active');
        tag.textContent = 'DATOS';
        pdu.innerHTML = `<span class="pdu-block data-block">DATOS HTTP</span>`;

        await animatePacketTo('c1-packet', 'c1-stage', 'c1-pc1', 100);
        await animatePacketTo('c1-packet', 'c1-stage', 'c1-sw1', 1100);
        document.getElementById('c1-sw1').classList.add('highlight-active');
        status.innerHTML = `<i class="fa-solid fa-layer-group"></i> <strong>Capa 4 + Capa 3:</strong> Añadiendo cabeceras TCP (Puerto 80) e IP (192.168.1.10 ➔ 10.0.0.5)...`;
        tag.textContent = 'TCP/IP';
        pdu.innerHTML = `<span class="pdu-block header-block l3">IP 192.168.1.10</span><span class="pdu-block header-block l4">TCP 80</span><span class="pdu-block data-block">DATOS</span>`;

        await animatePacketTo('c1-packet', 'c1-stage', 'c1-r1', 1100);
        document.getElementById('c1-r1').classList.add('highlight-active');
        status.innerHTML = `<i class="fa-solid fa-network-wired"></i> <strong>Capa 2 + Capa 1:</strong> Añadiendo cabecera MAC de Trama Ethernet II y enviando bits por medio físico...`;
        tag.textContent = 'TRAMA';
        pdu.innerHTML = `<span class="pdu-block header-block l2">MAC AA:BB:CC</span><span class="pdu-block header-block l3">IP</span><span class="pdu-block header-block l4">TCP</span><span class="pdu-block data-block">DATOS</span><span class="pdu-block trailer-block">FCS</span>`;

        await animatePacketTo('c1-packet', 'c1-stage', 'c1-srv', 1100);
        document.getElementById('c1-srv').classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Resultado:</strong> PDU entregada al Servidor Web. El servidor desencapsula el mensaje HTTP recibido.`;

    } else if (mode === 'decap') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Escenario 2: Desencapsulamiento en Servidor.</strong> Recibiendo Trama física...`;
        document.getElementById('c1-srv').classList.add('highlight-active');
        tag.textContent = 'TRAMA';

        await animatePacketTo('c1-packet', 'c1-stage', 'c1-srv', 100);
        status.innerHTML = `<i class="fa-solid fa-check-double"></i> 1. Capa 2 verifica FCS (CRC sin errores) y remueve cabecera MAC.`;
        pdu.innerHTML = `<span class="pdu-block header-block l3">IP 192.168.1.10</span><span class="pdu-block header-block l4">TCP 80</span><span class="pdu-block data-block">DATOS</span>`;

        await new Promise(r => setTimeout(r, 1200));
        status.innerHTML = `<i class="fa-solid fa-check-double"></i> 2. Capa 3 verifica IP Destino y remueve cabecera IP. Capa 4 entrega al proceso Web (Port 80).`;
        pdu.innerHTML = `<span class="pdu-block data-block">DATOS HTTP (GET /index.html)</span>`;
        document.getElementById('c1-srv').classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Desencapsulamiento Éxito:</strong> Aplicación HTTP procesó el mensaje original recibido.`;
    }
}

/* --------------------------------------------------------------------------
   CLASE 2: MEDIOS DE TRANSMISIÓN Y ANÁLISIS MAC
   -------------------------------------------------------------------------- */
const c2Cables = { 'c2-c1': ['c2-pc1', 'c2-sw1'], 'c2-c2': ['c2-sw1', 'c2-pc2'] };

function initClase2Sim() {
    setTimeout(() => {
        drawTopologyCables('c2-stage', c2Cables);
        runMediumSimulation('utp');
    }, 150);
}

async function runMediumSimulation(medium) {
    if (activeAnimTimeout) clearTimeout(activeAnimTimeout);
    clearDeviceHighlights('c2-stage');

    const status = document.getElementById('c2-status');
    const wave = document.getElementById('c2-wave');
    const c1 = document.getElementById('c2-c1');
    const c2 = document.getElementById('c2-c2');

    document.getElementById('c2-pc1').classList.add('highlight-active');

    if (medium === 'utp') {
        status.innerHTML = `<strong>Medio: Cobre UTP Cat 6.</strong> Transmisión mediante impulsos eléctricos continuos de voltaje (+5V / -5V) en pares trenzados.`;
        wave.className = 'medium-wave-canvas wave-utp';
        wave.innerHTML = '⚡ ⚡ ⚡ [Impulsos Eléctricos de Cobre UTP - 1 Gbps] ⚡ ⚡ ⚡';
        if (c1) c1.className = 'vlan-cable access-cable-10';
        if (c2) c2.className = 'vlan-cable access-cable-10';
    } else if (medium === 'fiber') {
        status.innerHTML = `<strong>Medio: Fibra Óptica Monomodo.</strong> Transmisión fotónica mediante pulsos de luz láser a 300,000 km/s por reflexión interna total.`;
        wave.className = 'medium-wave-canvas wave-fiber';
        wave.innerHTML = '💡 💡 💡 [Pulsos de Luz Monomodo SMF - 10 Gbps] 💡 💡 💡';
        if (c1) c1.className = 'vlan-cable trunk-cable';
        if (c2) c2.className = 'vlan-cable trunk-cable';
    } else if (medium === 'wifi') {
        status.innerHTML = `<strong>Medio: Inalámbrico Wi-Fi 6 (802.11ax).</strong> Propagación mediante modulación de radiofrecuencia (bandas de 2.4 GHz, 5 GHz y 6 GHz).`;
        wave.className = 'medium-wave-canvas wave-wifi';
        wave.innerHTML = '📡 📡 📡 [Ondas de Radiofrecuencia RF 5GHz] 📡 📡 📡';
        if (c1) c1.className = 'vlan-cable access-cable-20';
        if (c2) c2.className = 'vlan-cable access-cable-20';
    }

    await animatePacketTo('c2-packet', 'c2-stage', 'c2-pc1', 100);
    await animatePacketTo('c2-packet', 'c2-stage', 'c2-sw1', 900);
    document.getElementById('c2-sw1').classList.add('highlight-active');
    await animatePacketTo('c2-packet', 'c2-stage', 'c2-pc2', 900);
    document.getElementById('c2-pc2').classList.add('highlight-success');
}

/* --------------------------------------------------------------------------
   CLASE 3: SUBNETTING IPv4 FLSM
   -------------------------------------------------------------------------- */
const c3Cables = { 'c3-c1': ['c3-r1', 'c3-sw1'], 'c3-c2': ['c3-r1', 'c3-sw2'], 'c3-c3': ['c3-r1', 'c3-sw3'] };

function initClase3Sim() {
    setTimeout(() => {
        drawTopologyCables('c3-stage', c3Cables);
        runSubnetSimulation();
    }, 150);
}

async function runSubnetSimulation() {
    clearDeviceHighlights('c3-stage');
    const cidrSelect = document.getElementById('c3-cidr-select');
    if (!cidrSelect) return;
    const cidr = parseInt(cidrSelect.value);

    const status = document.getElementById('c3-status');
    const hostBits = 32 - cidr;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : totalHosts - 2;

    status.innerHTML = `<strong>Máscara /${cidr}:</strong> ${usableHosts} Hosts Útiles por Subred | ${Math.pow(2, cidr - 24)} Subredes Creadas.`;

    document.getElementById('c3-r1').classList.add('highlight-active');
    await animatePacketTo('c3-packet', 'c3-stage', 'c3-r1', 100);

    if (cidr === 26) {
        await animatePacketTo('c3-packet', 'c3-stage', 'c3-sw1', 900);
        document.getElementById('c3-sw1').classList.add('highlight-success');
    } else if (cidr === 27) {
        await animatePacketTo('c3-packet', 'c3-stage', 'c3-sw2', 900);
        document.getElementById('c3-sw2').classList.add('highlight-success');
    } else {
        await animatePacketTo('c3-packet', 'c3-stage', 'c3-sw3', 900);
        document.getElementById('c3-sw3').classList.add('highlight-success');
    }
}

/* --------------------------------------------------------------------------
   CLASE 6: SPANNING TREE PROTOCOL (STP)
   -------------------------------------------------------------------------- */
const c6Cables = {
    'c6-c1': ['c6-sw1', 'c6-sw2'],
    'c6-c2': ['c6-sw2', 'c6-sw3'],
    'c6-c3': ['c6-sw3', 'c6-sw1']
};

function initClase6Sim() {
    setTimeout(() => {
        drawTopologyCables('c6-stage', c6Cables);
        runSTPSimulation('converge');
    }, 150);
}

async function runSTPSimulation(mode) {
    if (activeAnimTimeout) clearTimeout(activeAnimTimeout);
    clearDeviceHighlights('c6-stage');

    const status = document.getElementById('c6-status');
    const blkCable = document.getElementById('c6-c2');
    const sw1 = document.getElementById('c6-sw1');
    const sw2 = document.getElementById('c6-sw2');
    const sw3 = document.getElementById('c6-sw3');

    if (mode === 'converge') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Fase 1: Intercambio de BPDUs.</strong> Evaluando Prioridad Bridge ID (BID)...`;
        sw1.classList.add('highlight-active');
        sw2.classList.add('highlight-active');
        sw3.classList.add('highlight-active');

        await animatePacketTo('c6-packet', 'c6-stage', 'c6-sw1', 100);
        await animatePacketTo('c6-packet', 'c6-stage', 'c6-sw2', 800);
        await animatePacketTo('c6-packet', 'c6-stage', 'c6-sw3', 800);

        sw1.className = 'vlan-device switch-device highlight-success';
        sw2.className = 'vlan-device switch-device';
        sw3.className = 'vlan-device switch-device highlight-blocked';

        if (blkCable) blkCable.style.stroke = '#ef4444';
        status.innerHTML = `👑 <strong>Root Bridge Electo: SW-1</strong> (BID Menor: 4096). 🔒 <strong>Puerto Bloqueado (BLK) en SW-3</strong> para prevenir bucles de Capa 2.`;

    } else if (mode === 'failover') {
        status.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:var(--danger)"></i> <strong>Simulando Falla de Enlace SW1-SW2.</strong> Recalculando topología STP...`;
        document.getElementById('c6-c1').style.stroke = '#ef4444';

        await new Promise(r => setTimeout(r, 1200));
        if (blkCable) blkCable.style.stroke = '#10b981';
        sw3.className = 'vlan-device switch-device highlight-success';
        status.innerHTML = `✅ <strong>Reconvergencia Exitosa:</strong> El puerto previamente bloqueado (BLK) en SW-3 pasa a estado <strong>Forwarding (FWD)</strong> restableciendo conectividad.`;
    }
}

/* --------------------------------------------------------------------------
   CLASE 7: ENRUTAMIENTO DINÁMICO OSPFv2 (ÁREA 0)
   -------------------------------------------------------------------------- */
const c7Cables = {
    'c7-c1': ['c7-r1', 'c7-r2'],
    'c7-c2': ['c7-r2', 'c7-r4'],
    'c7-c3': ['c7-r1', 'c7-r3'],
    'c7-c4': ['c7-r3', 'c7-r4']
};

function initClase7Sim() {
    setTimeout(() => {
        drawTopologyCables('c7-stage', c7Cables);
        runOSPFSimulation('dijkstra');
    }, 150);
}

async function runOSPFSimulation(mode) {
    clearDeviceHighlights('c7-stage');
    const status = document.getElementById('c7-status');
    const r1 = document.getElementById('c7-r1');
    const r2 = document.getElementById('c7-r2');
    const r3 = document.getElementById('c7-r3');
    const r4 = document.getElementById('c7-r4');

    if (mode === 'hello') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando paquetes Hello a dirección Multicast <strong>224.0.0.5</strong>...`;
        r1.classList.add('highlight-active');
        await animatePacketTo('c7-packet', 'c7-stage', 'c7-r1', 100);
        await animatePacketTo('c7-packet', 'c7-stage', 'c7-r2', 700);
        r2.classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Adyacencia OSPF Formada:</strong> Estado <strong>FULL/DR</strong> establecido entre R1 y R2.`;

    } else if (mode === 'dijkstra') {
        status.innerHTML = `<i class="fa-solid fa-calculator"></i> Ejecuación Algoritmo Dijkstra (SPF): Evaluando métricas de ancho de banda...`;
        r1.classList.add('highlight-active');
        await animatePacketTo('c7-packet', 'c7-stage', 'c7-r1', 100);
        await animatePacketTo('c7-packet', 'c7-stage', 'c7-r2', 700);
        r2.classList.add('highlight-active');
        await animatePacketTo('c7-packet', 'c7-stage', 'c7-r4', 700);
        r4.classList.add('highlight-success');
        r3.classList.add('highlight-blocked');

        status.innerHTML = `✅ <strong>Ruta Óptima Seleccionada:</strong> R1 ➔ R2 ➔ R4 (Costo 10 + 10 = <strong>20</strong>). La ruta por R3 tiene costo 200 (descartada).`;
    }
}

/* --------------------------------------------------------------------------
   CLASE 9: LISTAS DE CONTROL DE ACCESO (ACLs IPv4)
   -------------------------------------------------------------------------- */
const c9Cables = {
    'c9-c1': ['c9-pc1', 'c9-r1'],
    'c9-c2': ['c9-pc2', 'c9-r1'],
    'c9-c3': ['c9-r1', 'c9-srv']
};

function initClase9Sim() {
    setTimeout(() => {
        drawTopologyCables('c9-stage', c9Cables);
        runACLSimulation('web');
    }, 150);
}

async function runACLSimulation(trafficType) {
    clearDeviceHighlights('c9-stage');
    const status = document.getElementById('c9-status');
    const r1 = document.getElementById('c9-r1');
    const srv = document.getElementById('c9-srv');

    if (trafficType === 'web') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> PC Admin enviando tráfico HTTP Web (Puerto 80)...`;
        document.getElementById('c9-pc1').classList.add('highlight-active');
        await animatePacketTo('c9-packet', 'c9-stage', 'c9-pc1', 100);
        await animatePacketTo('c9-packet', 'c9-stage', 'c9-r1', 800);
        r1.classList.add('highlight-active');

        await animatePacketTo('c9-packet', 'c9-stage', 'c9-srv', 800);
        srv.classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Permitido (ACE 10):</strong> <code>access-list 101 permit tcp any host 10.0.0.5 eq 80</code> autorizó la conexión.`;
        status.style.borderLeftColor = 'var(--accent)';

    } else if (trafficType === 'ssh') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> PC Invitado intentando conexión SSH (Puerto 22)...`;
        document.getElementById('c9-pc2').classList.add('highlight-active');
        await animatePacketTo('c9-packet', 'c9-stage', 'c9-pc2', 100);
        await animatePacketTo('c9-packet', 'c9-stage', 'c9-r1', 800);
        r1.classList.add('highlight-blocked');
        document.getElementById('c9-packet').classList.add('hidden');

        status.innerHTML = `⛔ <strong>Denegado (ACE 20):</strong> <code>access-list 101 deny tcp any any eq 22</code> descartó el paquete en el router.`;
        status.style.borderLeftColor = 'var(--danger)';
    }
}

/* --------------------------------------------------------------------------
   CLASE 10: TRADUCCIÓN NAT / PAT & IPv6 SLAAC
   -------------------------------------------------------------------------- */
const c10Cables = {
    'c10-c1': ['c10-pc1', 'c10-r1'],
    'c10-c2': ['c10-pc2', 'c10-r1'],
    'c10-c3': ['c10-r1', 'c10-web']
};

function initClase10Sim() {
    setTimeout(() => {
        drawTopologyCables('c10-stage', c10Cables);
        runNATSimulation('pat');
    }, 150);
}

async function runNATSimulation(mode) {
    clearDeviceHighlights('c10-stage');
    const status = document.getElementById('c10-status');
    const table = document.getElementById('c10-nat-table');
    const r1 = document.getElementById('c10-r1');
    const web = document.getElementById('c10-web');

    if (mode === 'pat') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> PC-LAN1 (192.168.1.10:50123) enviando paquete hacia Internet...`;
        document.getElementById('c10-pc1').classList.add('highlight-active');
        await animatePacketTo('c10-packet', 'c10-stage', 'c10-pc1', 100);
        await animatePacketTo('c10-packet', 'c10-stage', 'c10-r1', 800);
        r1.classList.add('highlight-active');

        if (table) {
            table.innerHTML = `
                <tr><td>Inside Global</td><td>200.1.1.1:50123</td></tr>
                <tr><td>Inside Local</td><td>192.168.1.10:50123</td></tr>
                <tr><td>Outside Global</td><td>8.8.8.8:80</td></tr>
            `;
        }

        await animatePacketTo('c10-packet', 'c10-stage', 'c10-web', 800);
        web.classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Traducción PAT Exitosa:</strong> IP Privada traducida a IP Pública <code>200.1.1.1:50123</code>.`;

    } else if (mode === 'slaac') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Router R1 enviando ICMPv6 Router Advertisement (RA)...`;
        r1.classList.add('highlight-active');
        await animatePacketTo('c10-packet', 'c10-stage', 'c10-r1', 100);
        await animatePacketTo('c10-packet', 'c10-stage', 'c10-pc1', 800);
        document.getElementById('c10-pc1').classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Autoconfiguración SLAAC:</strong> PC-1 generó su IP IPv6 <code>2001:db8:acad:1::a8b2/64</code> automáticamente.`;
    }
}

/* --------------------------------------------------------------------------
   CLASE 11: SERVICIOS DE RED (DHCP DORA, DNS, SDN)
   -------------------------------------------------------------------------- */
const c11Cables = {
    'c11-c1': ['c11-pc1', 'c11-sw1'],
    'c11-c2': ['c11-sw1', 'c11-dhcp'],
    'c11-c3': ['c11-sw1', 'c11-dns']
};

function initClase11Sim() {
    setTimeout(() => {
        drawTopologyCables('c11-stage', c11Cables);
        runServicesSimulation('dora');
    }, 150);
}

async function runServicesSimulation(service) {
    clearDeviceHighlights('c11-stage');
    const status = document.getElementById('c11-status');
    const pc1 = document.getElementById('c11-pc1');
    const dhcp = document.getElementById('c11-dhcp');
    const dns = document.getElementById('c11-dns');
    const sw1 = document.getElementById('c11-sw1');

    if (service === 'dora') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 1. <strong>DHCP Discover:</strong> Cliente emite Broadcast buscando servidor DHCP...`;
        pc1.classList.add('highlight-active');
        await animatePacketTo('c11-packet', 'c11-stage', 'c11-pc1', 100);
        await animatePacketTo('c11-packet', 'c11-stage', 'c11-sw1', 700);
        await animatePacketTo('c11-packet', 'c11-stage', 'c11-dhcp', 700);
        dhcp.classList.add('highlight-active');

        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 2. <strong>DHCP Offer & Request:</strong> Servidor ofrece IP 192.168.1.100 y Cliente confirma aceptarla...`;
        await animatePacketTo('c11-packet', 'c11-stage', 'c11-pc1', 800);
        pc1.classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Proceso DORA Completado:</strong> Cliente configurado con IP <code>192.168.1.100</code>, DNS <code>8.8.8.8</code> y Gateway <code>192.168.1.1</code>.`;

    } else if (service === 'dns') {
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Consulta DNS: Resolviendo nombre de dominio <code>www.unefa.edu.ve</code>...`;
        pc1.classList.add('highlight-active');
        await animatePacketTo('c11-packet', 'c11-stage', 'c11-pc1', 100);
        await animatePacketTo('c11-packet', 'c11-stage', 'c11-sw1', 700);
        await animatePacketTo('c11-packet', 'c11-stage', 'c11-dns', 700);
        dns.classList.add('highlight-success');
        status.innerHTML = `✅ <strong>Respuesta DNS:</strong> Nombre <code>www.unefa.edu.ve</code> resuelto a dirección IP <code>200.10.5.2</code>.`;
    }
}

/* --------------------------------------------------------------------------
   RESIZE WINDOW EVENT LISTENER
   -------------------------------------------------------------------------- */
if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
        if (typeof currentTopicId !== 'undefined') {
            if (currentTopicId === 'clase-1') drawTopologyCables('c1-stage', c1Cables);
            else if (currentTopicId === 'clase-2') drawTopologyCables('c2-stage', c2Cables);
            else if (currentTopicId === 'clase-3') drawTopologyCables('c3-stage', c3Cables);
            else if (currentTopicId === 'clase-5') drawTopologyCables('vlan-stage', { 'cable-r1-sw1': ['device-router', 'device-switch'], 'cable-sw1-pc1': ['device-switch', 'device-pc1'], 'cable-sw1-pc2': ['device-switch', 'device-pc2'], 'cable-sw1-pc3': ['device-switch', 'device-pc3'], 'cable-sw1-pc4': ['device-switch', 'device-pc4'] });
            else if (currentTopicId === 'clase-6') drawTopologyCables('c6-stage', c6Cables);
            else if (currentTopicId === 'clase-7') drawTopologyCables('c7-stage', c7Cables);
            else if (currentTopicId === 'clase-9') drawTopologyCables('c9-stage', c9Cables);
            else if (currentTopicId === 'clase-10') drawTopologyCables('c10-stage', c10Cables);
            else if (currentTopicId === 'clase-11') drawTopologyCables('c11-stage', c11Cables);
        }
    });
}
