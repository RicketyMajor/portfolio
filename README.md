# Portafolio Web

Portafolio interactivo desarrollado con **React 19** que presenta mis proyectos, habilidades técnicas, trayectoria profesional y enfoque en **Sistemas Distribuidos**.

> Estudiante de Ingeniería Civil en Informática y Telecomunicaciones | UDP

---

## Características Principales

- **Tema Dinámico**: Alternancia entre modo oscuro y claro con persistencia en localStorage
- **Command Palette**: Navegación rápida mediante paleta de comandos (Cmd/Ctrl + K)
- **Live Dashboard**: Panel en tiempo real con datos de geolocalización, GitHub, Spotify y WakaTime
- **Animaciones Fluidas**: Efectos visuales con Framer Motion y TypeAnimation
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Scroll Reveal**: Animaciones de entrada al hacer scroll en elementos clave
- **Partículas Interactivas**: Fondo animado dinámico con Tsparticles
- **Modal de Proyectos**: Visualización detallada de proyectos con links a repositorios
- **Secciones Interactivas**: Tabs dinámicos en About, Timeline expandible en Trayectoria
- **Colaboración en Tiempo Real**: Canvas colaborativo con sincronización CRDT (Yjs + PartyKit)
- **Cursores Multiplayer**: Visualización de cursores de otros usuarios en la aplicación
- **Raft Consensus Visualization**: Simulación interactiva del algoritmo de consenso Raft con máquinas de estado (xstate)
- **Formulario de Contacto**: Integración con EmailJS para envío de emails
- **Accesibilidad**: Semántica HTML correcta y navegación por teclado

---

## Arquitectura del Proyecto

### Estructura de Directorios

```
src/
├── components/              # Componentes reutilizables
│   ├── sections/           # Componentes de secciones principales
│   │   ├── HeroSection.js        # Sección de inicio con terminal interactiva
│   │   ├── ProjectsSection.js    # Galería de proyectos
│   │   ├── SkillsSection.js      # Habilidades técnicas categorizadas
│   │   ├── AboutSection.js       # Información personal con tabs
│   │   ├── TrajectorySection.js  # Trayectoria educativa y profesional expandible
│   │   ├── ContactSection.js     # Formulario de contacto
│   │   └── CollaborationSection.js # Sección de colaboración en tiempo real
│   ├── CommandPalette.js        # Paleta de comandos rápidos
│   ├── Navbar.js                # Barra de navegación principal
│   ├── Terminal.js              # Emulador de terminal ASCII
│   ├── ThemeToggle.js           # Botón de alternancia de tema
│   ├── ParticlesBackground.js   # Fondo de partículas animadas
│   ├── ProjectCard.js           # Tarjeta individual de proyecto
│   ├── ProjectModal.js          # Modal para detalles de proyectos
│   ├── ContactForm.js           # Formulario de contacto
│   ├── SkeletonLoader.js        # Componente de carga
│   ├── ScrollReveal.js          # HOC para animaciones de scroll
│   ├── ScrollToTop.js           # Botón flotante de scroll al inicio
│   ├── LiveDashboard.js         # Panel en tiempo real de estadísticas
│   ├── CollaborationCanvas.js   # Canvas colaborativo con Yjs
│   ├── MultiplayerCursors.js    # Visualización de cursores multiplayer
│   ├── raft/                    # Componentes para simulación de consenso Raft
│   │   ├── RaftSimulation.js    # Componente principal de la simulación
│   │   ├── RaftNode.js          # Representación visual de nodos del clúster
│   │   └── clusterMachine.js    # Máquina de estado xstate para lógica de Raft
│   └── sections/
│       ├── RaftSection.js       # Sección para visualización de algoritmo Raft
├── data/
│   └── portfolioData.js         # Datos centralizados de proyectos, skills, timeline, etc.
├── hooks/
│   └── useTheme.js              # Hook personalizado para gestión de tema
├── styles/
│   ├── global.css               # Estilos globales y variables CSS
│   ├── variables.css            # Paleta de colores y tipografía
│   ├── components.css           # Estilos compartidos de componentes
│   ├── sections.css             # Estilos de secciones
│   ├── navbar.css               # Estilos de navegación
│   ├── projects.css             # Estilos de proyectos
│   ├── commandPalette.css       # Estilos de la paleta de comandos
│   ├── dashboard.css            # Estilos del Live Dashboard
│   ├── collaboration.css        # Estilos del canvas colaborativo
│   ├── cursors.css              # Estilos de cursores multiplayer
│   └── raft.css                 # Estilos de la simulación Raft
├── App.js                       # Componente raíz
└── index.js                     # Punto de entrada

api/
├── geo.js                       # Endpoint: Geolocalización del usuario (Vercel)
├── github.js                    # Endpoint: Último commit y actividad de GitHub
├── spotify.js                   # Endpoint: Canción actual reproduciendo
└── wakatime.js                  # Endpoint: Estadísticas de productividad (si aplica)

party/
└── server.js                    # Servidor PartyKit para sincronización CRDT

public/
├── index.html                   # HTML base
├── manifest.json                # Configuración PWA
└── robots.txt                   # Directivas para bots de búsqueda

partykit.json                     # Configuración de PartyKit
```

### Patrones de Diseño Utilizados

| Patrón                           | Descripción                            | Ubicación               |
| -------------------------------- | -------------------------------------- | ----------------------- |
| **Container/Presentational**     | Separación entre lógica y presentación | Secciones modulares     |
| **Custom Hooks**                 | Reutilización de lógica (tema, scroll) | `hooks/useTheme.js`     |
| **Composición**                  | Componentes pequeños y combinables     | `components/`           |
| **Data Centralization**          | Fuente única de verdad para datos      | `data/portfolioData.js` |
| **HOC (Higher-Order Component)** | Wrapping para animaciones              | `ScrollReveal.js`       |

---

## Secciones Principales

### 1. **Hero Section** (`HeroSection.js`)

Sección de bienvenida que incluye:

- Presentación con animación de tipeo (TypeAnimation)
- Terminal interactiva ASCII emulada con efecto hacker
- Botones de acción: "Ver Proyectos" y descargar CV
- Enlaces a redes sociales (GitHub, LinkedIn)

```javascript
// Secuencia de animación en la terminal
> systemctl start alonso-profile.service
> Loading modules...
> [OK] Loaded: Distributed_Systems
> Current_Role: Student @ UDP
```

### 2. **Projects Section** (`ProjectsSection.js`)

Galería interactiva de proyectos con:

- Filtrado por categoría (Desarrollo Web, Procesos & BD, Sistemas)
- Cards con efecto parallax (react-parallax-tilt)
- Modal detallado al hacer clic
- Links a repositorios GitHub y demos en vivo

**Proyectos destacados:**

- PAWS - Proyecto ganador EIT 2025
- Optimización GLPI con Oracle APEX
- Investigación en Computación Distribuida

### 3. **Skills Section** (`SkillsSection.js`)

Habilidades técnicas organizadas por categorías:

- Inteligencia Artificial & Datos (TensorFlow, PyTorch, Oracle AI)
- Lenguajes & Backend (Python, Java, C++)
- Frontend & Web (React, JavaScript, HTML/CSS)
- Cloud & DevOps (Docker, Linux, Git)

Cada skill incluye descripción y proyectos relacionados.

### 4. **About Section** (`AboutSection.js`)

Información sobre quién soy con navegación por tabs:

- Biografía personal
- Filosofía y valores
- Intereses técnicos principales
- Transiciones animadas entre pestañas

### 5. **Trajectory Section** (`TrajectorySection.js`)

Línea de tiempo educativa y profesional expandible:

- Educación (UDP - Ingeniería Civil Informática)
- Experiencia laboral con detalles técnicos
- Certificaciones profesionales
- Premios y reconocimientos
- Interactividad: Expandir/colapsar items para ver detalles

### 6. **Raft Consensus Section** (`RaftSection.js`)

Visualización interactiva del algoritmo **Raft** para consenso distribuido:

- Simulación de un clúster de 5 nodos
- Cambios de estado (Follower → Candidate → Leader)
- Visualización de heartbeats del líder
- Solicitudes y respuestas de votación
- Capacidad de simular fallos (matar/revivir nodos)
- Detección automática de nuevos líderes
- Colores visuales para tipos de paquetes de red

**Componentes internos**:
- `RaftSimulation.js`: Renderizador principal de la simulación
- `RaftNode.js`: Representación visual de cada nodo
- `clusterMachine.js`: Máquina de estado xstate para la lógica

**Caso de uso educativo**: Entender cómo los sistemas distribuidos llegan a consenso sin autoridad central.

### 7. **Contact Section** (`ContactSection.js`)

Formulario de contacto con múltiples canales:

- Validación de campos con feedback visual
- Integración con EmailJS para envío seguro
- Métodos de contacto directo (WhatsApp, email)
- Mensajes de error/éxito animados
- Información de contacto centralizada

### 8. **Collaboration Section** (`CollaborationSection.js`)

Sección experimental de colaboración en tiempo real:

- Canvas colaborativo donde múltiples usuarios pueden dejar marcas simultáneamente
- Sincronización sin conflictos mediante CRDTs (Yjs)
- Persistencia de datos mediante PartyKit
- Explicación educativa sobre consistencia eventual
- Interacción simple: hacer clic para marcar

---

## Funcionalidades Interactivas

### Colaboración en Tiempo Real (`CollaborationCanvas.js` + PartyKit)

Sistema distribuido de sincronización de estado:

- **CRDTs con Yjs**: Estructura de datos que resuelve conflictos automáticamente sin necesidad de servidor central
- **PartyKit Provider**: Conecta múltiples clientes al mismo "room" para sincronización
- **Persistencia**: Los datos se mantienen entre sesiones
- **Sin latencia crítica**: Cada usuario ve cambios locales instantáneamente; cambios remotos se sincronizan cuando llegan
- **Escalabilidad**: Demostra arquitectura distribuida sin conflictos

**Tecnología detrás**:
```javascript
// Yjs gestiona conflictos automáticamente
yDotsRef.current.push([newDot]);  // Se propaga sin conflictos
```

### Cursores Multiplayer (`MultiplayerCursors.js`)

Visualización de presencia de otros usuarios:

- Muestra cursores de otros usuarios en tiempo real
- Colores únicos por usuario
- Movimiento suave del mouse
- Integración con Awareness (protocolo de PartyKit)
- Desaparición automática cuando el usuario se desconecta

### Algoritmos de Consenso - Raft (`RaftSection.js` + `raft/`)

Visualización interactiva del algoritmo **Raft** para consenso distribuido:

- **RaftSimulation.js**: Componente principal que renderiza la simulación
- **RaftNode.js**: Representación visual de cada nodo del clúster (líder, seguidor, candidato)
- **clusterMachine.js**: Máquina de estado xstate que implementa la lógica de Raft

**Características**:
- Simulación de 5 nodos en clúster
- Cambios de estado: Follower → Candidate → Leader
- Visualización de heartbeats (latidos del líder)
- Solicitudes de voto (VOTE_REQ) y respuestas (VOTE_ACK)
- Capacidad de matar/revivir nodos para simular fallos
- Detección automática de nuevos líderes cuando uno falla
- Colores visuales para diferenciar tipos de paquetes de red

**Tecnología**:
- **xstate**: Máquina de estado determinista para la lógica de Raft
- **@xstate/react**: Hook `useMachine` para integración con React
- **SVG**: Renderización de nodos y paquetes de red
- **Animaciones**: Transiciones suaves con CSS

### APIs Serverless (Vercel Functions)

APIs implementadas en `/api` que proveen datos en tiempo real:

**`/api/geo.js`** - Geolocalización del usuario
- Extrae ubicación del cliente desde headers de Vercel
- Retorna ciudad, región, país
- Simula latencia de conexión entre cliente y servidor

**`/api/github.js`** - Actividad de GitHub
- Obtiene datos del perfil (followers, repos públicos)
- Extrae último commit del usuario
- Cachea respuesta para optimizar API calls
- Fallback elegante si GitHub API no está disponible

**`/api/spotify.js`** - Canción actual reproduciendo
- Usa OAuth 2.0 con Spotify API
- Obtiene canción actual en tiempo real
- Incluye cover del álbum, artista, link a Spotify
- Detecta cuando no hay música reproduciendo

**`/api/wakatime.js`** - Estadísticas de productividad (opcional)
- Integración con WakaTime para tracking de código
- Muestra horas de código y lenguaje top

### Live Dashboard (`LiveDashboard.js`)

Panel dinámico que muestra datos en tiempo real:

- Geolocalización del usuario con latencia de conexión
- Último commit de GitHub y actividad reciente
- Canción actual reproduciéndose en Spotify
- Estadísticas de productividad desde WakaTime
- Revalidación automática de datos con SWR

### Command Palette (Cmd/Ctrl + K)

Paleta de comandos rápida que permite:

- Navegar a secciones específicas
- Cambiar tema (claro/oscuro)
- Descargar CV
- Copiar email al portapapeles
- Búsqueda fuzzy de comandos

Características técnicas:

- Navegación por flechas (↑/↓)
- Ejecución con Enter
- Cierre con Esc
- Notificaciones Toast con confirmación visual

### Tabs Dinámicos en About Section

- Sistema de pestañas reutilizable con transiciones animadas
- Contenido contextual que cambia según la pestaña activa
- Layout automático y responsive
- Indicador visual de pestaña activa

### Timeline Expandible en Trajectory Section

- Items de trayectoria interactivos (educación, trabajo, certificaciones, premios)
- Expansión/colapso con animación smooth
- Detalles enriquecidos en cada item
- Orden cronológico descendente

### Theme Toggle (`useTheme.js` Hook)

- Respeta preferencia del sistema operativo
- Persiste la selección en localStorage
- Variables CSS dinámicas para cambio de colores instantáneo
- Compatible con reducción de movimiento (prefers-reduced-motion)

### Scroll Reveal (`ScrollReveal.js`)

HOC que anima elementos cuando:

- Entran en el viewport
- Usa Intersection Observer para eficiencia
- Soporta variaciones de animación

### Partículas Interactivas (`ParticlesBackground.js`)

- Fondo animado con @tsparticles
- Se adapta al tema actual
- Efecto parallax con movimiento del ratón
- Configuración responsive

---

## Stack Tecnológico

### Frontend Framework & UI

```json
{
  "React": "19.2.0",                      // UI Framework
  "Framer Motion": "12.23.24",            // Animaciones y transiciones
  "React Icons": "5.5.0",                 // Librería de iconos
  "React Scroll": "1.9.3",                // Smooth scrolling entre secciones
  "React Type Animation": "3.2.0",        // Animaciones de tipeo
  "React Parallax Tilt": "1.7.314",       // Efectos 3D en tarjetas
  "Tsparticles": "3.9.1"                  // Partículas animadas interactivas
}
```

### Colaboración y Estado Distribuido

```json
{
  "Yjs": "13.6.27",                       // CRDT para sincronización sin conflictos
  "PartyKit": "0.0.115",                  // Servidor WebSocket para room-based sync
  "Y-PartyKit": "0.0.33",                 // Provider de Yjs para PartyKit
  "PartySocket": "1.1.6"                  // Cliente WebSocket persistente
}
```

### Máquinas de Estado & Sistemas Distribuidos

```json
{
  "xstate": "5.24.0",                     // State machine para lógica determinista
  "@xstate/react": "6.0.0"                // Integración de xstate con React (useMachine)
}
```

### Data Fetching & Estado

```json
{
  "SWR": "2.3.7",                         // Fetching de datos con revalidación automática
  "QueryString": "0.2.1"                  // Parsing de query parameters
}
```

### Email & Comunicación

```json
{
  "EmailJS": "4.4.1"                      // Envío de emails desde cliente (sin backend)
}
```

### Utilidades

```json
{
  "RandomColor": "0.6.2"                  // Generación de colores aleatorios para usuarios
}
```

### Testing

```json
{
  "@testing-library/react": "16.3.0", // Test unitarios
  "@testing-library/jest-dom": "6.9.1", // Matchers DOM
  "jest": "built-in" // Test runner
}
```

### Herramientas de Desarrollo

- **React Scripts 5.0.1**: Build tool basado en Webpack
- **ESLint**: Linting de código
- **Jest**: Test runner integrado

---

## Instalación y Configuración

### Requisitos Previos

- **Node.js** 16.x o superior
- **npm** 7.x o superior (o yarn/pnpm)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/RicketyMajor/portfolio.git
cd portfolio
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno** (importante para APIs)

Crear archivo `.env.local`:

```env
# EmailJS
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# GitHub (para api/github.js)
GITHUB_TOKEN=your_github_token

# Spotify (para api/spotify.js)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# PartyKit (local dev)
PARTYKIT_HOST=127.0.0.1:1999
```

4. **Iniciar servidor de desarrollo**

Para desarrollo local con PartyKit:

```bash
npm run dev
# Puerto: 3000 (React)
# PartyKit: 1999 (server.js)
```

O solo React sin PartyKit:

```bash
npm start
# Puerto: 3000
# PartyKit estará disponible en modo producción
```

---

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm start` | Inicia React en puerto 3000 (sin PartyKit local) |
| **Dev PartyKit** | `npm run dev` | Inicia React + PartyKit dev server |
| **Build** | `npm run build` | Compila para producción en carpeta `build/` |
| **Testing** | `npm test` | Ejecuta tests en modo watch |
| **Eject** | `npm run eject` | Expone configuración de Webpack (irreversible) |

### Modo Desarrollo con PartyKit

Para testear colaboración en tiempo real localmente:

```bash
npm run dev
# Puerto React: 3000
# Puerto PartyKit: 1999
# Abre múltiples pestañas en http://localhost:3000 para ver sincronización
```

### Modo Desarrollo React Only

```bash
npm start
# Puerto: 3000
# PartyKit estará disponible una vez deployado a producción
```

### Build para Producción

```bash
npm run build
# Minificado y optimizado
# Listo para deploy a Vercel (con APIs serverless en /api)
# Carpeta generada: /build
```

---

## Testing

El proyecto incluye tests unitarios para componentes críticos:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests de un archivo específico
npm test ContactForm.test.js

# Cobertura de tests
npm test -- --coverage
```

**Archivos de test incluidos:**

- `ContactForm.test.js` - Validación del formulario
- `ProjectCard.test.js` - Renderizado de tarjetas
- `App.test.js` - Pruebas de integración

---

## Personalización

### Modificar Datos

Editar `/src/data/portfolioData.js` (centralizado):

**Proyectos**:

```javascript
export const projects = [
  {
    id: 1,
    title: "Mi Proyecto",
    category: "Desarrollo Web",
    description: "Descripción del proyecto",
    image: "URL de imagen",
    technologies: ["React", "Node.js"],
    repoLink: "URL del repo",
    demoLink: "URL de demo",
  },
];
```

**Timeline (Educación, Trabajo, Certificaciones)**:

Modifica el array `timeline` en `portfolioData.js` con estructura:

```javascript
export const timeline = [
  {
    id: 1,
    type: "education|work|certification|award",
    title: "Título del evento",
    institution: "Institución",
    date: "Fecha",
    description: "Descripción breve",
    details: ["Detalle 1", "Detalle 2"],
    icon: <FaIcon />,
  },
];
```

**About Section Tabs**:

Modifica `aboutMeData` en `portfolioData.js` para personalizar biografía, filosofía e intereses.

### Conectar Live Dashboard

Configura endpoints en `LiveDashboard.js`:

- `/api/geo` - Geolocalización
- `/api/github` - Datos de GitHub
- `/api/spotify` - Canción actual
- `/api/wakatime` - Estadísticas de código

### Configurar Colaboración en Tiempo Real

Para habilitar la colaboración multiplayer con Yjs y PartyKit:

1. **Localmente**: Asegúrate de que `npm run dev` esté ejecutándose
2. **Producción**: PartyKit debe estar deployado (configurado en `partykit.json`)
3. **PARTYKIT_HOST** debe apuntar al servidor correcto

### Cambiar Colores

Editar `/src/styles/variables.css`:

```css
:root[data-theme="dark"] {
  --color-primary: #64ffda; /* Color primario */
  --color-background: #0a0e27; /* Fondo */
  --color-text: #e6f1ff; /* Texto */
}
```

### Añadir Nueva Sección

1. Crear componente en `src/components/sections/`
2. Importar en `src/App.js`
3. Agregar en JSX antes de `<ScrollToTop />`

---

## Performance

Optimizaciones implementadas:

- Code splitting automático con React.lazy()
- Lazy loading de imágenes con SkeletonLoader
- Memoización de componentes (React.memo)
- Debouncing en event listeners
- SWR para caching inteligente de datos
- PWA optimizado (manifest.json)
- Revalidación eficiente en Live Dashboard
- **CRDTs (Yjs)**: Sincronización sin conflictos sin round-trips al servidor
- **WebSockets (PartyKit)**: Comunicación bidireccional en tiempo real sin polling
- **Eventual Consistency**: Optimista updates en CollaborationCanvas
- **Awareness Protocol**: Presencia de usuarios con bajo overhead

**Métricas (Web Vitals)**:

```bash
npm run build  # Genera reporte en build/
```

**Nota CRDT**: Los CRDTs garantizan eventual consistency sin necesidad de locking central. Esto permite colaboración offline-first y hace que la arquitectura sea escalable sin cuello de botella en el servidor.

---

## Seguridad

- Sanitización de inputs en formularios
- EmailJS para envío seguro (sin exponer endpoint backend)
- HTTPS recomendado para producción
- CSP headers en servidor (Vercel/Netlify automático)
- Dependencies auditadas regularmente
- **WebSocket Security**: PartyKit usa WSS (WebSocket Secure) en producción
- **API Keys**: Almacenadas en variables de entorno (.env.local), nunca en el repositorio
- **CORS**: Vercel serverless functions actúan como proxy para requests a APIs externas
- **Rate Limiting**: Implementar en PartyKit server para prevenir abuse en colaboración
- **Secrets Management**: GitHub Secrets para CI/CD, Vercel Environment Variables para producción

```bash
npm audit           # Ver vulnerabilidades
npm audit fix       # Aplicar parches
```

---

## Despliegue

### Opción 1: Vercel (Recomendado)

```bash
npm install -g vercel
vercel
# Sigue las instrucciones interactivas
```

### Opción 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Opción 3: GitHub Pages

```bash
# Agregar a package.json:
"homepage": "https://ricketymajor.github.io/portfolio"

npm run build
npm install --save-dev gh-pages

# Agregar scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

npm run deploy
```

---

## Contribuciones

Este es un portafolio personal. Si encuentras bugs o tienes sugerencias:

1. Abre un **Issue** describiendo el problema
2. Haz un **Fork** del proyecto
3. Crea una rama: `git checkout -b feature/mejora`
4. Commit: `git commit -m 'feat: descripción'`
5. Push: `git push origin feature/mejora`
6. Abre un **Pull Request**

---

## Licencia

Proyecto personal sin licencia específica. Siéntete libre de usar como referencia, pero respeta la autoría del contenido original.

---

## Contacto

- **Email**: alonsoveralarach@gmail.com
- **Email Institucional**: alonso.vera@mail.udp.cl
- **GitHub**: [@RicketyMajor](https://github.com/RicketyMajor)
- **LinkedIn**: [Alonso Vera Larach](https://www.linkedin.com/in/alonso-vera-larach-1103542b7)
- **Portafolio Live**: [En Proceso](https://alonso-vera-larach.com)

---

## Recursos Útiles

- [React Documentation](https://react.dev)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Tsparticles Demo](https://particles.js.org)
- [SWR Documentation](https://swr.vercel.app)
- [Yjs Documentation](https://docs.yjs.dev) - CRDT Library
- [PartyKit Documentation](https://docs.partykit.io) - WebSocket Server
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)

---

## Agradecimientos

Inspirado en portafolios modernos y buenas prácticas en desarrollo web. Gracias a la comunidad open-source por las herramientas utilizados.

---

**Última actualización**: Enero 2025  
**Versión**: 1.2.0  
**Estado**: En desarrollo activo
