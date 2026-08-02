# 🌐 Plataforma del Curso de Redes de Telecomunicaciones (CCNA 200-301)

¡Bienvenido! Esta es la plataforma web interactiva diseñada para el curso universitario de **Redes de Telecomunicaciones**, alineada con el temario oficial de la certificación **Cisco CCNA 200-301**.

---

## ✨ Características Principales

1. **Temario Completo CCNA 200-301 (6 Módulos)**:
   - **Módulo 1**: Fundamentos de Redes, Modelo OSI vs TCP/IP y Subnetting IPv4/VLSM.
   - **Módulo 2**: Acceso a la Red, VLANs, Trunking 802.1Q y Spanning Tree (STP/RSTP).
   - **Módulo 3**: Conectividad IP y Enrutamiento Dinámico OSPFv2 Single/Multi-Area.
   - **Módulo 4**: Servicios IP (DHCP, NAT/PAT, NTP, SSH y QoS).
   - **Módulo 5**: Fundamentos de Seguridad y ACLs Estándar/Extendidas.
   - **Módulo 6**: Automatización, Arquitecturas SDN, APIs REST y JSON.

2. **Herramientas Interactivas para Estudiantes**:
   - 🧮 **Calculadora de Subnetting IPv4 & IPv6** integrada.
   - 💻 **Cheatsheet y Buscador de Comandos Cisco IOS CLI** con botón para copiar comandos.
   - 🧪 **Simulador de Quizzes / Cuestionarios** por módulo con explicaciones de respuestas.
   - 📈 **Rastreador de Progreso del Alumno** guardado en el navegador (`localStorage`).
   - 🌓 **Modo Oscuro / Modo Claro** con diseño Glassmorphism Cyber-Telecom.

---

## 🚀 Pasos para Publicar en GitHub Pages (Gratis)

El proyecto está diseñado con tecnología **Zero-Build (Vanilla HTML5, CSS3, JavaScript ES6)**, por lo que **no necesita instalar Node.js ni compilar nada**.

### Opción A: Desde la Terminal (Recomendada)
Abre la terminal o PowerShell dentro de esta carpeta (`c:\Users\Bryan Navas\OneDrive\Documentos\IA Servidores\Universidad`) y ejecuta:

```bash
# 1. Inicializar repositorio local
git init

# 2. Agregar todos los archivos y realizar primer commit
git add .
git commit -m "Publicación inicial de la plataforma de Redes CCNA"

# 3. Renombrar rama a main y enlazar tu repositorio remoto de GitHub
git branch -M main
git remote add origin https://github.com/TU-USUARIO/redes-telecomunicaciones-ccna.git

# 4. Subir archivos a GitHub
git push -u origin main
```

### Opción B: Activar GitHub Pages en GitHub.com
1. Entra a tu repositorio en GitHub.
2. Ve a la pestaña **Settings** (Configuración) > **Pages**.
3. En la sección **Build and deployment**:
   - **Source**: Selecciona `Deploy from a branch`.
   - **Branch**: Selecciona `main` y en la carpeta elige `/ (root)`.
4. Haz clic en **Save** (Guardar).
5. En 1-2 minutos tu sitio estará en vivo en:  
   `https://tu-usuario.github.io/redes-telecomunicaciones-ccna/`

---

## ✏️ Cómo Personalizar Contenidos

- **Agregar o modificar temas**: Edita el archivo `js/topics-data.js`.
- **Agregar comandos de Cisco CLI**: Edita el archivo `js/commands-db.js`.
- **Agregar preguntas al Quiz**: Edita el archivo `js/quiz-engine.js`.

---
*Desarrollado para la enseñanza universitaria de Redes y Telecomunicaciones.*
