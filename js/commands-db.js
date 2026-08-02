/* ==========================================================================
   CLI COMMANDS CHEATSHEET DATABASE
   ========================================================================== */

const ciscoCommandsDatabase = [
    {
        id: "cmd-enable",
        category: "basic",
        mode: "User EXEC (Router>)",
        syntax: "enable",
        description: "Entra al modo Privilegiado (Privileged EXEC mode) para realizar configuraciones o diagnósticos.",
        example: "Router> enable"
    },
    {
        id: "cmd-conf-t",
        category: "basic",
        mode: "Privileged EXEC (Router#)",
        syntax: "configure terminal",
        description: "Entra al modo de Configuración Global desde el modo privilegiado.",
        example: "Router# configure terminal"
    },
    {
        id: "cmd-hostname",
        category: "basic",
        mode: "Global Config",
        syntax: "hostname [NOMBRE]",
        description: "Cambia el nombre único del router o switch en la red.",
        example: "Router(config)# hostname SW-CORE-PISO1"
    },
    {
        id: "cmd-show-ip-int-br",
        category: "basic",
        mode: "Privileged EXEC",
        syntax: "show ip interface brief",
        description: "Muestra la lista resumida de todas las interfaces, direcciones IP asignadas, estado físico y de protocolo (Up/Down).",
        example: "Router# show ip interface brief"
    },
    {
        id: "cmd-show-ip-route",
        category: "routing",
        mode: "Privileged EXEC",
        syntax: "show ip route",
        description: "Muestra la tabla de enrutamiento IP completa del dispositivo (redes directamente conectadas, rutas estáticas y dinámicas OSPF).",
        example: "Router# show ip route"
    },
    {
        id: "cmd-vlan-create",
        category: "vlan",
        mode: "Global Config",
        syntax: "vlan [VLAN-ID]",
        description: "Crea una nueva VLAN en la base de datos de VLANs del switch.",
        example: "Switch(config)# vlan 10\nSwitch(config-vlan)# name VENTAS"
    },
    {
        id: "cmd-switchport-access",
        category: "vlan",
        mode: "Interface Config",
        syntax: "switchport access vlan [VLAN-ID]",
        description: "Asigna un puerto de acceso a una VLAN específica para conectar hosts finales.",
        example: "Switch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 10"
    },
    {
        id: "cmd-switchport-trunk",
        category: "vlan",
        mode: "Interface Config",
        syntax: "switchport mode trunk",
        description: "Configura la interfaz como enlace troncal 802.1Q para transportar múltiples VLANs.",
        example: "Switch(config-if)# switchport mode trunk"
    },
    {
        id: "cmd-router-ospf",
        category: "routing",
        mode: "Global Config",
        syntax: "router ospf [PROCESS-ID]",
        description: "Inicia el proceso del protocolo de enrutamiento dinámico OSPFv2.",
        example: "Router(config)# router ospf 1"
    },
    {
        id: "cmd-ospf-network",
        category: "routing",
        mode: "Router OSPF Config",
        syntax: "network [IP-RED] [MASCARA-WILDCARD] area [AREA-ID]",
        description: "Anuncia una subred en el proceso OSPF y habilita OSPF en las interfaces que coincidan.",
        example: "Router(config-router)# network 192.168.10.0 0.0.0.255 area 0"
    },
    {
        id: "cmd-port-security",
        category: "security",
        mode: "Interface Config",
        syntax: "switchport port-security",
        description: "Habilita la seguridad de puerto en una interfaz de acceso de switch para limitar direcciones MAC.",
        example: "Switch(config-if)# switchport port-security\nSwitch(config-if)# switchport port-security maximum 2\nSwitch(config-if)# switchport port-security mac-address sticky"
    },
    {
        id: "cmd-access-list-std",
        category: "security",
        mode: "Global Config",
        syntax: "access-list [1-99] {permit|deny} [IP-ORIGEN] [WILDCARD]",
        description: "Crea una ACL Estándar que filtra únicamente basándose en la IP de origen.",
        example: "Router(config)# access-list 10 permit 192.168.1.0 0.0.0.255"
    },
    {
        id: "cmd-dhcp-pool",
        category: "services",
        mode: "Global Config",
        syntax: "ip dhcp pool [NOMBRE-POOL]",
        description: "Crea e ingresa a la configuración del pool de direcciones DHCP.",
        example: "Router(config)# ip dhcp pool LAN_RED\nRouter(config-dhcp)# network 192.168.10.0 255.255.255.0"
    },
    {
        id: "cmd-nat-overload",
        category: "services",
        mode: "Global Config",
        syntax: "ip nat inside source list [ACL] interface [INT] overload",
        description: "Configura PAT (Port Address Translation) utilizando la IP pública de la interfaz de salida.",
        example: "Router(config)# ip nat inside source list 1 interface gigabitethernet 0/1 overload"
    },
    {
        id: "cmd-copy-run-start",
        category: "basic",
        mode: "Privileged EXEC",
        syntax: "copy running-config startup-config",
        description: "Guarda la configuración activa en la memoria RAM hacia la memoria NVRAM no volátil.",
        example: "Router# copy running-config startup-config"
    }
];
