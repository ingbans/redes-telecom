/* ==========================================================================
   CLASS ANIMATIONS & INTERACTIVE SIMULATORS CONTROLLER
   Provides interactive animations and simulations for all 12 classes
   ========================================================================== */

/* --------------------------------------------------------------------------
   CLASE 1: SIMULADOR DE ENCAPSULAMIENTO OSI vs TCP/IP
   -------------------------------------------------------------------------- */
let osiAnimTimeout = null;

function resetOSISimulation() {
    if (osiAnimTimeout) clearTimeout(osiAnimTimeout);
    const status = document.getElementById('osi-status-text');
    if (status) status.innerHTML = '<i class="fa-solid fa-circle-info"></i> Haz clic en "Iniciar Encapsulamiento" para observar la construcción de la PDU en cada capa.';
    
    document.querySelectorAll('.osi-layer-box').forEach(b => b.classList.remove('active', 'success'));
    const pdu = document.getElementById('osi-pdu-preview');
    if (pdu) pdu.innerHTML = '<span class="pdu-block data-block">DATOS (Mensaje HTTP)</span>';
}

function runOSISimulation() {
    resetOSISimulation();
    const status = document.getElementById('osi-status-text');
    const pdu = document.getElementById('osi-pdu-preview');

    const layers = [
        { id: 'osi-l7', name: '7. Aplicación', desc: 'Añade cabecera HTTP/HTTPS. PDU: Datos.', html: '<span class="pdu-block data-block">DATOS HTTP</span>' },
        { id: 'osi-l4', name: '4. Transporte', desc: 'Añade puertos Origen:54120 y Destino:80 (TCP). PDU: Segmento.', html: '<span class="pdu-block header-block l4">TCP Port 80</span><span class="pdu-block data-block">DATOS HTTP</span>' },
        { id: 'osi-l3', name: '3. Red', desc: 'Añade Direcciones IP Origen:192.168.1.10 y Destino:8.8.8.8. PDU: Paquete.', html: '<span class="pdu-block header-block l3">IP 192.168.1.10 ➔ 8.8.8.8</span><span class="pdu-block header-block l4">TCP</span><span class="pdu-block data-block">DATOS</span>' },
        { id: 'osi-l2', name: '2. Enlace de Datos', desc: 'Añade Direcciones MAC y FCS (detección de errores). PDU: Trama.', html: '<span class="pdu-block header-block l2">MAC AA:BB:CC...</span><span class="pdu-block header-block l3">IP</span><span class="pdu-block header-block l4">TCP</span><span class="pdu-block data-block">DATOS</span><span class="pdu-block trailer-block">FCS (CRC)</span>' },
        { id: 'osi-l1', name: '1. Física', desc: 'Convierte la trama completa en una secuencia continua de Bits (0s y 1s).', html: '<span class="pdu-block bits-block">01001000 01100101 01101100 01101100 01101111 00100001 (Pulsos de Señal)</span>' }
    ];

    let step = 0;
    function nextStep() {
        if (step < layers.length) {
            const current = layers[step];
            document.querySelectorAll('.osi-layer-box').forEach(b => b.classList.remove('active'));
            const el = document.getElementById(current.id);
            if (el) el.classList.add('active', 'success');

            status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Capa ${current.name}:</strong> ${current.desc}`;
            pdu.innerHTML = current.html;
            step++;
            osiAnimTimeout = setTimeout(nextStep, 1400);
        } else {
            status.innerHTML = `✅ <strong>Encapsulamiento Completado:</strong> La trama fue convertida a impulsos físicos y transmitida por el medio físico.`;
        }
    }
    nextStep();
}

/* --------------------------------------------------------------------------
   CLASE 2: SIMULADOR DE MEDIOS DE TRANSMISIÓN Y DESGLOSE MAC
   -------------------------------------------------------------------------- */
function updateMediumSimulation(medium) {
    const status = document.getElementById('medium-status');
    const wave = document.getElementById('medium-wave');
    if (!status || !wave) return;

    if (medium === 'utp') {
        status.innerHTML = `<strong>Cobre UTP (Cat 6):</strong> Transmisión mediante impulsos eléctricos continuos de voltaje diferencial.`;
        wave.className = 'medium-wave-canvas wave-utp';
        wave.innerHTML = '⚡ ⚡ ⚡ [Impulsos Eléctricos +5V / -5V] ⚡ ⚡ ⚡';
    } else if (medium === 'fiber') {
        status.innerHTML = `<strong>Fibra Óptica (Monomodo):</strong> Transmisión por pulsos de luz láser a 300,000 km/s por reflexión interna total.`;
        wave.className = 'medium-wave-canvas wave-fiber';
        wave.innerHTML = '💡 💡 💡 [Pulsos Fotónicos de Luz Monomodo] 💡 💡 💡';
    } else if (medium === 'wifi') {
        status.innerHTML = `<strong>Inalámbrico Wi-Fi (802.11ax):</strong> Propagación por ondas electromagnéticas de radiofrecuencia (2.4 / 5 / 6 GHz).`;
        wave.className = 'medium-wave-canvas wave-wifi';
        wave.innerHTML = '📡 📡 📡 [Modulación de Radiofrecuencia RF] 📡 📡 📡';
    }
}

/* --------------------------------------------------------------------------
   CLASE 3: SIMULADOR INTERACTIVO DE SUBNETTING IPv4 (FLSM)
   -------------------------------------------------------------------------- */
function updateSubnetVisualizer() {
    const cidrSelect = document.getElementById('vsubnet-cidr');
    if (!cidrSelect) return;
    const cidr = parseInt(cidrSelect.value);

    const hostBits = 32 - cidr;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : totalHosts - 2;
    const maskOctet = 256 - Math.pow(2, 8 - (cidr % 8 === 0 ? 8 : cidr % 8));

    document.getElementById('vsubnet-mask').textContent = getMaskFromCIDR(cidr);
    document.getElementById('vsubnet-hosts').textContent = usableHosts.toLocaleString();
    document.getElementById('vsubnet-bits').textContent = `${32 - hostBits} Bits Red | ${hostBits} Bits Host`;
    
    // Update visual blocks
    const grid = document.getElementById('vsubnet-blocks-grid');
    if (grid) {
        grid.innerHTML = '';
        const numSubnets = Math.min(Math.pow(2, cidr - 24), 16); // cap preview to 16
        const subSize = 256 / numSubnets;
        for (let i = 0; i < numSubnets; i++) {
            const block = document.createElement('div');
            block.className = 'subnet-visual-block';
            block.innerHTML = `
                <strong>Subred ${i + 1}</strong>
                <span>192.168.10.${Math.round(i * subSize)} /${cidr}</span>
                <small>${usableHosts} Hosts útiles</small>
            `;
            grid.appendChild(block);
        }
    }
}

function getMaskFromCIDR(cidr) {
    let mask = [];
    for (let i = 0; i < 4; i++) {
        const n = Math.min(Math.max(cidr - i * 8, 0), 8);
        mask.push(256 - Math.pow(2, 8 - n));
    }
    return mask.join('.');
}

/* --------------------------------------------------------------------------
   CLASES 4, 8, 12: SIMULADOR DE EVALUACIONES DIAGNÓSTICAS
   -------------------------------------------------------------------------- */
function checkDiagnosticAnswer(btn, isCorrect, explanation) {
    const parent = btn.closest('.diag-question');
    if (!parent) return;

    parent.querySelectorAll('.diag-opt-btn').forEach(b => {
        b.disabled = true;
        b.classList.remove('selected-correct', 'selected-wrong');
    });

    const expBox = parent.querySelector('.diag-exp-box');
    if (isCorrect) {
        btn.classList.add('selected-correct');
        expBox.innerHTML = `✅ <strong>¡Correcto!</strong> ${explanation}`;
        expBox.className = 'diag-exp-box exp-success';
    } else {
        btn.classList.add('selected-wrong');
        expBox.innerHTML = `❌ <strong>Incorrecto.</strong> ${explanation}`;
        expBox.className = 'diag-exp-box exp-danger';
    }
}

/* --------------------------------------------------------------------------
   CLASE 6: SIMULADOR DE SPANNING TREE PROTOCOL (STP)
   -------------------------------------------------------------------------- */
let stpAnimTimeout = null;

function runSTPSimulation() {
    clearTimeout(stpAnimTimeout);
    const status = document.getElementById('stp-status-text');
    const b1 = document.getElementById('stp-sw1');
    const b2 = document.getElementById('stp-sw2');
    const b3 = document.getElementById('stp-sw3');

    if (!status || !b1 || !b2 || !b3) return;

    status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <strong>Fase 1:</strong> Intercambio de BPDUs (Bridge Protocol Data Units)...`;
    b1.className = 'vlan-device switch-device';
    b2.className = 'vlan-device switch-device';
    b3.className = 'vlan-device switch-device';

    stpAnimTimeout = setTimeout(() => {
        // SW1 has lowest BID (4096)
        b1.classList.add('highlight-success');
        status.innerHTML = `<i class="fa-solid fa-crown" style="color:#f59e0b"></i> <strong>Elección de Root Bridge:</strong> SW-1 gana por tener la menor Prioridad (BID: 4096 < 32768). Todos sus puertos pasan a <strong>Designated (DP)</strong>.`;

        stpAnimTimeout = setTimeout(() => {
            b2.classList.add('highlight-active');
            b3.classList.add('highlight-blocked');
            status.innerHTML = `🔒 <strong>Prevención de Bucles:</strong> El puerto entre SW-2 y SW-3 pasa a estado <strong>Blocking (BLK)</strong> para romper el bucle infinito de Capa 2.`;
        }, 1500);
    }, 1500);
}

/* --------------------------------------------------------------------------
   CLASE 7: SIMULADOR DE ALGORITMO DIJKSTRA OSPF
   -------------------------------------------------------------------------- */
function runOSPFSimulation() {
    const status = document.getElementById('ospf-status-text');
    const path = document.getElementById('ospf-path-info');
    if (!status) return;

    status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Calculando algoritmo SPF (Dijkstra) desde R1 hasta R4...`;

    setTimeout(() => {
        status.innerHTML = `✅ <strong>Ruta Más Corta Calculada:</strong> R1 ➔ R2 ➔ R4 (Costo Total: 10 + 10 = <strong>20</strong>).`;
        if (path) path.innerHTML = `<strong>Enlace directo R1 ➔ R3 ➔ R4:</strong> Costo 100 + 100 = 200 (Descartado por menor ancho de banda).`;
    }, 1200);
}

/* --------------------------------------------------------------------------
   CLASE 9: SIMULADOR DE FILTRADO ACL
   -------------------------------------------------------------------------- */
function testACLPacket(type) {
    const status = document.getElementById('acl-status-text');
    if (!status) return;

    if (type === 'web') {
        status.innerHTML = `✅ <strong>Permitido (ACE 10):</strong> Paquete TCP Puerto 80 hacia Servidor Web coincide con regla <code>permit tcp any host 10.0.0.5 eq 80</code>.`;
        status.style.borderLeftColor = 'var(--accent)';
    } else if (type === 'ssh') {
        status.innerHTML = `⛔ <strong>Denegado (ACE 20):</strong> Paquete TCP Puerto 22 (SSH) no autorizado coincide con regla <code>deny tcp any any eq 22</code>. Paquete descartado en el router.`;
        status.style.borderLeftColor = 'var(--danger)';
    } else if (type === 'icmp') {
        status.innerHTML = `⛔ <strong>Denegado por Implicit Deny:</strong> Tráfico ICMP Ping descartado por la regla implícita final <code>deny ip any any</code>.`;
        status.style.borderLeftColor = 'var(--danger)';
    }
}

/* --------------------------------------------------------------------------
   CLASE 10: SIMULADOR DE NAT / PAT (OVERLOAD)
   -------------------------------------------------------------------------- */
function runNATSimulation() {
    const status = document.getElementById('nat-status-text');
    const table = document.getElementById('nat-table-body');
    if (!status || !table) return;

    status.innerHTML = `<i class="fa-solid fa-bolt"></i> Traduciendo paquete privado <code>192.168.1.10:50422</code> a IP Pública <code>200.1.1.1:50422</code>...`;

    setTimeout(() => {
        table.innerHTML = `
            <tr><td>Inside Global</td><td>200.1.1.1:50422</td></tr>
            <tr><td>Inside Local</td><td>192.168.1.10:50422</td></tr>
            <tr><td>Outside Local</td><td>8.8.8.8:80</td></tr>
            <tr><td>Outside Global</td><td>8.8.8.8:80</td></tr>
        `;
        status.innerHTML = `✅ <strong>Traducción Exitosa:</strong> El router guardó la entrada en la tabla NAT PAT (Overload). La respuesta del servidor web será redirigida a la PC interna correspondiente.`;
    }, 1200);
}

/* --------------------------------------------------------------------------
   CLASE 11: SIMULADOR DE SERVICIOS DHCP DORA & DNS
   -------------------------------------------------------------------------- */
function runDORASimulation() {
    const status = document.getElementById('dhcp-status-text');
    if (!status) return;

    const steps = [
        "1. <strong>DHCP Discover:</strong> El cliente transmite un Broadcast (255.255.255.255) buscando un servidor DHCP.",
        "2. <strong>DHCP Offer:</strong> El servidor responde ofreciendo la IP 192.168.1.50/24 y Gateway 192.168.1.1.",
        "3. <strong>DHCP Request:</strong> El cliente acepta formalmente la IP ofrecida.",
        "4. <strong>DHCP Acknowledgment (ACK):</strong> El servidor confirma la concesión (Lease) por 8 días."
    ];

    let index = 0;
    function nextDorasStep() {
        if (index < steps.length) {
            status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${steps[index]}`;
            index++;
            setTimeout(nextDorasStep, 1200);
        } else {
            status.innerHTML = `✅ <strong>Proceso DORA Completado:</strong> Cliente configurado con IP 192.168.1.50, DNS 8.8.8.8 y Gateway 192.168.1.1.`;
        }
    }
    nextDorasStep();
}
