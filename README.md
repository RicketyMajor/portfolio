# Portafolio Web

Portafolio interactivo desarrollado con **React 19** que presenta mis proyectos, habilidades técnicas, trayectoria profesional y enfoque en **Sistemas Distribuidos**.

> 🎓 Estudiante de Ingeniería Civil Informática | UDP | Especialización en Computación Distribuida y Cloud Computing

---

## ✨ Características Principales

- **Tema Dinámico**: Alternancia entre modo oscuro y claro con persistencia en localStorage
- **Command Palette**: Navegación rápida mediante paleta de comandos (Cmd/Ctrl + K)
- **Animaciones Fluidas**: Efectos visuales con Framer Motion y TypeAnimation
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Scroll Reveal**: Animaciones de entrada al hacer scroll en elementos clave
- **Partículas Interactivas**: Fondo animado dinámico con Tsparticles
- **Modal de Proyectos**: Visualización detallada de proyectos con links a repositorios
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
│   │   ├── AboutSection.js       # Información personal
│   │   ├── TrajectorySection.js  # Trayectoria educativa y profesional
│   │   └── ContactSection.js     # Formulario de contacto
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
│   └── ScrollToTop.js           # Botón flotante de scroll al inicio
├── data/
│   └── portfolioData.js         # Datos centralizados de proyectos, skills, etc.
├── hooks/
│   └── useTheme.js              # Hook personalizado para gestión de tema
├── styles/
│   ├── global.css               # Estilos globales y variables CSS
│   ├── variables.css            # Paleta de colores y tipografía
│   ├── components.css           # Estilos compartidos de componentes
│   ├── sections.css             # Estilos de secciones
│   ├── navbar.css               # Estilos de navegación
│   ├── projects.css             # Estilos de proyectos
│   └── commandPalette.css       # Estilos de la paleta de comandos
├── App.js                       # Componente raíz
└── index.js                     # Punto de entrada

public/
├── index.html                   # HTML base
├── manifest.json                # Configuración PWA
└── robots.txt                   # Directivas para bots de búsqueda
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

Información sobre quién soy:

- Resumen profesional
- Valores y motivación
- Intereses técnicos principales

### 5. **Trajectory Section** (`TrajectorySection.js`)

Línea de tiempo educativa y profesional:

- Educación (UDP - Ingeniería Civil Informática)
- Experiencia laboral y proyectos destacados
- Certificaciones (Oracle Cloud AI Foundations)

### 6. **Contact Section** (`ContactSection.js`)

Formulario de contacto con:

- Validación de campos
- Integración con EmailJS para envío seguro
- Mensajes de error/éxito
- Envío de datos al correo personal

---

## ⚙️ Funcionalidades Interactivas

### Command Palette (Cmd/Ctrl + K)

Paleta de comandos rápida que permite:

- Navegar a secciones específicas.
- Cambiar tema (claro/oscuro).
- Descargar CV.
- Copiar email al portapapeles.
- Búsqueda fuzzy de comandos.

Características técnicas:

- Navegación por flechas (↑/↓).
- Ejecución con Enter.
- Cierre con Esc.
- Notificaciones Toast.

### Theme Toggle (`useTheme.js` Hook)

- Respeta preferencia del sistema operativo.
- Persiste la selección en localStorage.
- Variables CSS dinámicas para cambio de colores instantáneo.
- Compatible con reducción de movimiento (prefers-reduced-motion).

### Scroll Reveal (`ScrollReveal.js`)

HOC que anima elementos cuando:

- Entran en el viewport.
- Usa Intersection Observer para eficiencia.
- Soporta variaciones de animación.

### Partículas Interactivas (`ParticlesBackground.js`)

- Fondo animado con @tsparticles.
- Se adapta al tema actual.
- Efecto parallax con movimiento del ratón.
- Configuración responsive.

---

## Stack Tecnológico

### Frontend

```json
{
  "React": "19.2.0", // UI Framework
  "Framer Motion": "12.23.24", // Animaciones
  "React Icons": "5.5.0", // Iconografía
  "React Scroll": "1.9.3", // Smooth scrolling
  "React Type Animation": "3.2.0", // Animación de tipeo
  "React Parallax Tilt": "1.7.314", // Efecto 3D en cards
  "Tsparticles": "3.9.1" // Partículas animadas
}
```

### Email & Comunicación

```json
{
  "EmailJS": "4.4.1" // Envío de emails desde el cliente
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

3. **Configurar variables de entorno** (si aplica)
   Crear archivo `.env.local`:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Iniciar servidor de desarrollo**

```bash
npm start
```

Abrirá automáticamente [http://localhost:3000](http://localhost:3000)

---

## Scripts Disponibles

| Script         | Comando         | Descripción                                       |
| -------------- | --------------- | ------------------------------------------------- |
| **Desarrollo** | `npm start`     | Inicia servidor en modo desarrollo con hot reload |
| **Build**      | `npm run build` | Compila para producción en carpeta `build/`       |
| **Testing**    | `npm test`      | Ejecuta tests en modo watch                       |
| **Eject**      | `npm run eject` | Expone configuración de Webpack (irreversible)    |

### Modo Desarrollo

```bash
npm start
# Puerto: 3000
# Hot reload habilitado
# Source maps para debugging
```

### Build para Producción

```bash
npm run build
# Minificado y optimizado
# Listo para deploy a Vercel, Netlify, etc.
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

Editar `/src/data/portfolioData.js`:

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

- Code splitting automático con React.lazy().
- Lazy loading de imágenes.
- Memoización de componentes (React.memo).
- Debouncing en event listeners.
- PWA optimizado (manifest.json).

**Métricas (Web Vitals):**

```bash
npm run build  # Genera reporte en build/
```

---

## Seguridad

- Sanitización de inputs en formularios
- EmailJS para envío seguro (sin exponer endpoint backend)
- HTTPS recomendado para producción
- CSP headers en servidor (Vercel/Netlify automático)
- Dependencies auditadas regularmente

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

- **Email**: [Tu email]
- **GitHub**: [@RicketyMajor](https://github.com/RicketyMajor)
- **LinkedIn**: [Tu perfil LinkedIn](https://www.linkedin.com/in/alonso-vera-larach-1103542b7)
- **Portafolio Live**: [Aquí](https://tu-dominio.com)

---

## Recursos Útiles

- [React Documentation](https://react.dev)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Tsparticles Demo](https://particles.js.org)

---

## Agradecimientos

Inspirado en portafolios modernos y buenas prácticas en desarrollo web. Gracias a la comunidad open-source por las herramientas utilizadas.

---

**Última actualización**: Diciembre 2025  
**Versión**: 1.0.0  
**Estado**: En desarrollo activo 🚀
