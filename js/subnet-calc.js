/* ==========================================================================
   SUBNETTING CALCULATOR ENGINE
   ========================================================================== */

function initSubnetCalculator() {
    const cidrSelect = document.getElementById('cidr-select');
    const form = document.getElementById('subnet-form');

    if (!cidrSelect || !form) return;

    // Populate CIDR dropdown (/8 to /30)
    cidrSelect.innerHTML = '';
    for (let prefix = 8; prefix <= 30; prefix++) {
        const maskStr = getSubnetMaskFromCIDR(prefix);
        const option = document.createElement('option');
        option.value = prefix;
        option.textContent = `/${prefix} - (${maskStr})`;
        if (prefix === 24) option.selected = true;
        cidrSelect.appendChild(option);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateSubnet();
    });

    // Run initial calculation
    calculateSubnet();
}

function getSubnetMaskFromCIDR(prefix) {
    let mask = 0xffffffff << (32 - prefix);
    return [
        (mask >>> 24) & 255,
        (mask >>> 16) & 255,
        (mask >>> 8) & 255,
        mask & 255
    ].join('.');
}

function calculateSubnet() {
    const ipInput = document.getElementById('ip-address-input').value.trim();
    const prefix = parseInt(document.getElementById('cidr-select').value, 10);

    // Validate IP format
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ipInput)) {
        alert('Por favor, ingresa una dirección IPv4 válida (ej. 192.168.10.45).');
        return;
    }

    const ipOctets = ipInput.split('.').map(Number);
    const ipNum = ((ipOctets[0] << 24) >>> 0) + (ipOctets[1] << 16) + (ipOctets[2] << 8) + ipOctets[3];

    const maskNum = (0xffffffff << (32 - prefix)) >>> 0;
    const wildcardNum = (~maskNum) >>> 0;

    const netNum = (ipNum & maskNum) >>> 0;
    const broadNum = (netNum | wildcardNum) >>> 0;

    const totalHosts = Math.pow(2, 32 - prefix) - 2;

    const firstIpNum = prefix === 31 || prefix === 32 ? netNum : netNum + 1;
    const lastIpNum = prefix === 31 || prefix === 32 ? broadNum : broadNum - 1;

    // Render results
    document.getElementById('res-net-addr').textContent = numToIp(netNum);
    document.getElementById('res-broad-addr').textContent = numToIp(broadNum);
    document.getElementById('res-first-ip').textContent = numToIp(firstIpNum);
    document.getElementById('res-last-ip').textContent = numToIp(lastIpNum);
    document.getElementById('res-netmask').textContent = numToIp(maskNum);
    document.getElementById('res-wildcard').textContent = numToIp(wildcardNum);
    document.getElementById('res-hosts-count').textContent = totalHosts > 0 ? totalHosts.toLocaleString() : 0;

    // Binary string rendering
    const binaryStr = ipOctets.map(oct => oct.toString(2).padStart(8, '0')).join('.');
    document.getElementById('res-binary').textContent = binaryStr;
}

function numToIp(num) {
    return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
    ].join('.');
}
