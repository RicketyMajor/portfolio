import React from 'react';
// Importamos los iconos aquí porque se definen dentro de los objetos de datos
import { 
  FaGithub, FaExternalLinkAlt, 
  FaChalkboardTeacher, FaBriefcase, FaTrophy, FaGraduationCap, FaCertificate,
  FaJs, FaReact, FaHtml5, FaCss3, FaNodeJs, FaPython, FaJava, 
  FaGitAlt, FaLinux, FaDocker, FaDatabase 
} from 'react-icons/fa';
import { 
  SiCplusplus, SiOracle, SiPytorch, SiTensorflow 
} from 'react-icons/si';

// 1. DATOS DE PROYECTOS
// ... imports

// 1. DATOS DE PROYECTOS (CON CATEGORÍAS)
export const projects = [
  {
    id: 1,
    title: "PAWS - Ingeniería de Software",
    category: "Desarrollo Web", // <--- NUEVO CAMPO
    description: "Proyecto ganador del 1er Lugar en la Feria EIT 2025 (Team Dots). Solución de software enfocada en la gestión eficiente.",
    image: "https://placehold.co/600x400/112240/64ffda?text=PAWS+Project", 
    technologies: ["Ingeniería de Software", "Trabajo en Equipo", "Gestión de Proyectos"],
    repoLink: "https://github.com/RicketyMajor",
    demoLink: "https://paws-demo.com" // Ejemplo
  },
  {
    id: 2,
    title: "Optimización Gestión de Tickets GLPI",
    category: "Procesos & BD", // <--- NUEVO CAMPO
    description: "Implementación y documentación técnica exhaustiva del sistema GLPI. Integración con Oracle APEX y optimización SQL.",
    image: "https://placehold.co/600x400/112240/64ffda?text=S2T+GLPI+System",
    technologies: ["SQL", "Oracle APEX", "BizAgi", "Documentación Técnica"],
  },
  {
    id: 3,
    title: "Investigación en Computación Distribuida",
    category: "Sistemas", // <--- NUEVO CAMPO
    description: "Exploración académica sobre arquitecturas escalables y sistemas distribuidos, enfocada en el rendimiento.",
    image: "https://placehold.co/600x400/112240/64ffda?text=Distributed+Systems",
    technologies: ["C++", "Linux", "Docker", "Networking"],
    repoLink: "https://github.com/RicketyMajor"
  }
];

// ... resto del archivo igual

// ... (imports anteriores se mantienen igual) ...

// MANTÉN TUS PROYECTOS IGUAL, PERO ASEGÚRATE DE QUE TENGAN ID: 1, 2, 3...

// 2. DATOS DE SKILLS (ENRIQUECIDOS PARA INTERACTIVIDAD)
export const skills = {
  "Inteligencia Artificial & Datos": [
    { 
      name: "Machine Learning", 
      icon: <SiTensorflow />,
      description: "Diseño y entrenamiento de modelos predictivos. Experiencia ajustando hiperparámetros y evaluando métricas de precisión.",
      relatedProjects: [3, 1] // IDs de proyectos donde usaste esto
    },
    { 
      name: "NLP", 
      icon: <SiPytorch />,
      description: "Procesamiento de Lenguaje Natural para análisis de texto y chatbots. Tokenización, Lemmatización y modelos Transformers.",
      relatedProjects: [1]
    },
    { 
      name: "Oracle Cloud AI", 
      icon: <SiOracle />,
      description: "Implementación de servicios cognitivos en la nube de Oracle. Certificado como AI Foundations Associate.",
      relatedProjects: [2]
    },
    { 
      name: "SQL & Bases de Datos", 
      icon: <FaDatabase />,
      description: "Modelado relacional robusto y optimización de consultas complejas (Query Tuning) para grandes volúmenes de datos.",
      relatedProjects: [2]
    },
  ],
  "Lenguajes & Backend": [
    { 
      name: "Python", 
      icon: <FaPython />,
      description: "Mi lenguaje principal para Scripting, IA y Backend rápido. Uso de librerías como Pandas, NumPy y Scikit-learn.",
      relatedProjects: [1, 3]
    },
    { 
      name: "Java", 
      icon: <FaJava />,
      description: "Desarrollo orientado a objetos estricto. Aplicaciones empresariales y comprensión profunda de la JVM.",
      relatedProjects: [1]
    },
    { 
      name: "C++", 
      icon: <SiCplusplus />,
      description: "Lenguaje base para mis estudios en Computación Distribuida. Gestión de memoria manual y optimización de bajo nivel.",
      relatedProjects: [3]
    },
    { 
      name: "Node.js", 
      icon: <FaNodeJs />,
      description: "Arquitectura asíncrona orientada a eventos. Creación de APIs RESTful escalables.",
      relatedProjects: [1]
    },
  ],
  "Herramientas & Procesos": [
    { 
      name: "Git & GitHub", 
      icon: <FaGitAlt />,
      description: "Control de versiones avanzado: Git Flow, resolución de conflictos y CI/CD pipelines básicos.",
      relatedProjects: [1, 3]
    },
    { 
      name: "Docker", 
      icon: <FaDocker />,
      description: "Contenedorización de aplicaciones para asegurar consistencia entre entornos de desarrollo y producción.",
      relatedProjects: [3]
    },
    { 
      name: "Linux", 
      icon: <FaLinux />,
      description: "Administración de sistemas, Bash scripting y configuración de servidores. Mi entorno nativo de desarrollo.",
      relatedProjects: [3]
    },
    { 
      name: "BizAgi / Documentación", 
      icon: <FaBriefcase />,
      description: "Modelado de procesos de negocio (BPMN) y documentación técnica exhaustiva para transferencia de conocimiento.",
      relatedProjects: [2]
    },
  ]
};

// ... (timeline se mantiene igual) ...

// ... (imports anteriores se mantienen) ...

// --- 3. DATOS DE TRAYECTORIA (ACTUALIZADO CON DETALLES) ---
// --- 3. DATOS DE TRAYECTORIA (ORDEN CRONOLÓGICO: 2021 -> 2025) ---
export const timeline = [
  {
    id: 5, // Mantenemos IDs únicos
    type: "education",
    title: "Ingeniería Civil en Informática",
    institution: "Universidad Diego Portales",
    date: "2022 - 2026 (En curso)",
    description: "Formación integral con enfoque en Ciencias de la Computación.",
    details: [
      "Promedio destacado.",
      "Enfoque en Computación Distribuida y Sistemas Operativos.",
      "Participación activa en ferias tecnológicas y ayudantías."
    ],
    icon: <FaGraduationCap />
  },
  {
    id: 4,
    type: "work",
    title: "Práctica Profesional - S2T",
    institution: "Servicios y Soluciones Tecnológicas S2T",
    date: "Dic 2024 - Feb 2025",
    description: "Documentación técnica exhaustiva y optimización de sistemas.",
    details: [
      "Redacción de manual técnico de 65 páginas para sistema GLPI.",
      "Modelado de flujos de negocio complejos con BizAgi (BPMN).",
      "Optimización de consultas SQL para el área de Finanzas.",
      "Integración de bases de datos con Oracle APEX."
    ],
    icon: <FaBriefcase />
  },
  {
    id: 3,
    type: "certification",
    title: "Certified AI Foundations Associate",
    institution: "Oracle Cloud Infrastructure",
    date: "2025",
    description: "Certificación profesional en IA y servicios Cloud.",
    details: [
      "Fundamentos de Machine Learning y Deep Learning.",
      "Servicios de IA generativa en OCI.",
      "Automatización de procesos mediante IA."
    ],
    icon: <FaCertificate />
  },
  {
    id: 2,
    type: "work",
    title: "Ayudante de Cátedra y Corrector",
    institution: "Universidad Diego Portales",
    date: "Marzo 2025 - Presente",
    description: "Roles docentes en múltiples asignaturas clave de la carrera.",
    details: [
      "Ingeniería de Software: Apoyo en metodologías ágiles y patrones de diseño.",
      "Arquitectura de Computadores: Enseñanza de bajo nivel y ensamblador.",
      "Electricidad y Magnetismo / Química: Refuerzo de ciencias base.",
      "Evaluación y retroalimentación constante a más de 50 alumnos."
    ],
    icon: <FaChalkboardTeacher />
  },
  {
    id: 1,
    type: "award",
    title: "1er Lugar Feria de Proyectos EIT 2025",
    institution: "Universidad Diego Portales - Team DOTS",
    date: "2025",
    description: "Reconocimiento al mejor proyecto del área de Ingeniería de Software.",
    details: [
      "Proyecto: PAWS (Platform for Animal Welfare Support).",
      "Lideré la arquitectura del backend asegurando escalabilidad.",
      "Implementación de buenas prácticas de CI/CD y gestión ágil."
    ],
    icon: <FaTrophy />
  }
];

// --- 4. NUEVO: DATOS "SOBRE MÍ" (PARA PESTAÑAS) ---
export const aboutMeData = {
  bio: {
    title: "Mi Historia",
    content: [
      "Soy Alonso Vera Larach, estudiante de 4to año de Ingeniería Civil en Informática y Telecomunicaciones en la UDP. Me defino como una persona creativa y constante.",
      "He complementado mi formación académica con una fuerte vocación docente, desempeñándome como ayudante en múltiples cátedras, lo que ha reforzado mi capacidad para comunicar conceptos técnicos complejos.",
      "Mi objetivo es convertirme en un referente en la arquitectura de software."
    ]
  },
  philosophy: {
    title: "Enfoque Técnico",
    content: [
      "Creo firmemente que el código debe ser tan legible para humanos como eficiente para las máquinas.",
      "Mi enfoque actual combina la robustez de la Computación Distribuida con la innovación de la Inteligencia Artificial.",
      "Prefiero los sistemas resilientes y modulares sobre las soluciones monolíticas rápidas pero frágiles."
    ]
  },
  interests: {
    title: "Más allá del Código",
    content: [
      "🔭 Investigación: Me apasiona leer papers sobre nuevos algoritmos de consenso y redes neuronales.",
      "🐧 Linux: Disfruto personalizando mi entorno y entendiendo el kernel.",
      "🎮 Estrategia: Me gustan los desafíos que requieren planificación a largo plazo, tanto en ajedrez como en videojuegos.",
      "📚 Aprendizaje Continuo: Siempre estoy haciendo un curso nuevo o probando una tecnología emergente."
    ]
  }
};