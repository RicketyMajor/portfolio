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
export const projects = [
  {
    id: 1,
    title: "PAWS - Ingeniería de Software",
    description: "Proyecto ganador del 1er Lugar en la Feria EIT 2025 (Team Dots). Solución de software enfocada en la gestión eficiente, demostrando buenas prácticas de ingeniería y trabajo en equipo.",
    image: "https://placehold.co/600x400/112240/64ffda?text=PAWS+Project", 
    technologies: ["Ingeniería de Software", "Trabajo en Equipo", "Gestión de Proyectos"],
    repoLink: "https://github.com/RicketyMajor" 
  },
  {
    id: 2,
    title: "Optimización Gestión de Tickets GLPI",
    description: "Implementación y documentación técnica exhaustiva (65 págs) del sistema GLPI para S2T. Incluyó integración con Oracle APEX, corrección de consultas SQL y modelado de procesos en BizAgi.",
    image: "https://placehold.co/600x400/112240/64ffda?text=S2T+GLPI+System",
    technologies: ["SQL", "Oracle APEX", "BizAgi", "Documentación Técnica"],
  },
  {
    id: 3,
    title: "Investigación en Computación Distribuida",
    description: "Exploración académica sobre arquitecturas escalables y sistemas distribuidos, enfocada en el rendimiento y la tolerancia a fallos.",
    image: "https://placehold.co/600x400/112240/64ffda?text=Distributed+Systems",
    technologies: ["C++", "Linux", "Docker", "Networking"],
    repoLink: "https://github.com/RicketyMajor"
  }
];

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

// 3. DATOS DE TRAYECTORIA
export const timeline = [
  {
    id: 1,
    type: "award",
    title: "1er Lugar Feria de Proyectos EIT 2025",
    institution: "Universidad Diego Portales - Team DOTS",
    date: "2025",
    description: "Reconocimiento al mejor proyecto del área de Ingeniería de Software con el proyecto 'PAWS'.",
    icon: <FaTrophy />
  },
  {
    id: 2,
    type: "work",
    title: "Ayudante de Cátedra y Corrector",
    institution: "Universidad Diego Portales",
    date: "Marzo 2025 - Presente",
    description: "Roles docentes en múltiples asignaturas clave: Ingeniería de Software, Arquitectura de Computadores, Electricidad y Magnetismo, y Química.",
    icon: <FaChalkboardTeacher />
  },
  {
    id: 3,
    type: "certification",
    title: "Certified AI Foundations Associate",
    institution: "Oracle Cloud Infrastructure",
    date: "2025",
    description: "Certificación profesional validando conocimientos fundamentales en Inteligencia Artificial y servicios Cloud de Oracle.",
    icon: <FaCertificate />
  },
  {
    id: 4,
    type: "work",
    title: "Práctica Profesional - Documentación & Desarrollo",
    institution: "Servicios y Soluciones Tecnológicas S2T",
    date: "Dic 2024 - Feb 2025",
    description: "Creación de documentación técnica de 65 páginas para el sistema GLPI, modelado de flujos en BizAgi y optimización de consultas SQL.",
    icon: <FaBriefcase />
  },
  {
    id: 5,
    type: "education",
    title: "Ingeniería Civil en Informática y Telecomunicaciones",
    institution: "Universidad Diego Portales",
    date: "2022 - 2026 (En curso)",
    description: "Formación integral con enfoque en Ciencias de la Computación. Actualmente en 4to año.",
    icon: <FaGraduationCap />
  }
];