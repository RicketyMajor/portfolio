import React from 'react';
// Mantenemos los imports originales y agregamos algunos útiles para la nueva estructura si fuera necesario en el futuro
import { 
  FaChalkboardTeacher, FaBriefcase, FaTrophy, FaGraduationCap, FaCertificate,
  FaNodeJs, FaPython, FaJava, FaGitAlt, FaLinux, FaDocker, FaDatabase, FaFilePdf, FaCode
} from 'react-icons/fa';
import { 
  SiCplusplus, SiOracle, SiPytorch, SiTensorflow, SiReact, SiJavascript 
} from 'react-icons/si';

{/* --- PROJECTS DATA --- */}
// ESTRATEGIA FASE 1:
// 1. Mantenemos campos 'legacy' (title, description, image) para compatibilidad con ProjectCard.
// 2. Agregamos campos 'extended' (longDescription, gallery, technical) para el futuro Modal avanzado.

export const projects = [
  {
    id: 1,
    title: "PAWS - Ingeniería de Software",
    category: "Desarrollo Web",
    // Campo Legacy (usado en Card):
    description: "Proyecto ganador del 1er Lugar en la Feria EIT 2025 (Team Dots). Solución de software enfocada en la gestión eficiente.",
    // Campo Legacy (Thumbnail principal):
    image: "https://placehold.co/600x400/112240/64ffda?text=PAWS+Project", 
    technologies: ["Ingeniería de Software", "Trabajo en Equipo", "Gestión de Proyectos"],
    repoLink: "https://github.com/RicketyMajor",
    demoLink: "https://paws-demo.com",
    
    // --- NUEVOS DATOS EXTENDIDOS (Fase 2 Ready) ---
    extended: {
      // Descripción completa que soportará Markdown
      overview: `
        PAWS (Platform for Animal Welfare Support) nació como respuesta a la necesidad de modernizar la gestión de refugios de animales.
        
        Como líder del equipo backend, diseñé una arquitectura modular que permite:
        * Gestión de expedientes médicos digitales.
        * Seguimiento de adopciones en tiempo real.
        * Control de inventario de medicamentos y alimentos.
        
        El proyecto fue galardonado por su impacto social y calidad técnica.
      `,
      // Galería Multimedia (Imágenes extra, diagramas, videos)
      gallery: [
        { 
          type: "image", 
          src: "https://placehold.co/800x450/1d2d50/64ffda?text=PAWS+Dashboard", 
          caption: "Dashboard Administrativo Principal" 
        },
        { 
          type: "image", 
          src: "https://placehold.co/800x450/1d2d50/64ffda?text=Mobile+View", 
          caption: "Diseño Responsive para Voluntarios en Terreno" 
        }
        // Futuro: Podríamos agregar { type: "video", src: "..." }
      ],
      // Pestaña Técnica
      technical: {
        stack: [
          { name: "Frontend", items: ["React", "TailwindCSS", "Framer Motion"] },
          { name: "Backend", items: ["Node.js", "Express", "PostgreSQL"] },
          { name: "DevOps", items: ["Docker", "GitHub Actions"] }
        ],
        challenges: [
          "Implementación de actualizaciones en tiempo real para el estado de adopciones.",
          "Diseño de base de datos relacional normalizada para manejar historiales médicos complejos."
        ]
      }
    }
  },
  {
    id: 2,
    title: "Optimización Gestión de Tickets GLPI",
    category: "Procesos & BD",
    description: "Implementación y documentación técnica exhaustiva del sistema GLPI. Integración con Oracle APEX y optimización SQL.",
    image: "https://placehold.co/600x400/112240/64ffda?text=S2T+GLPI+System",
    technologies: ["SQL", "Oracle APEX", "BizAgi", "Documentación Técnica"],
    
    extended: {
      overview: `
        Durante mi práctica profesional en S2T, lideré la optimización del sistema de mesa de ayuda GLPI.
        
        El desafío principal no fue solo técnico, sino de procesos: el sistema existía pero carecía de flujos definidos y documentación.
        Mi intervención logró reducir el tiempo de resolución de tickets en un 30% mediante la automatización de asignaciones y la creación de una base de conocimiento estructurada.
      `,
      gallery: [
        { 
          type: "image", 
          src: "https://placehold.co/800x450/233554/64ffda?text=BPMN+Diagram", 
          caption: "Modelado del Flujo de Atención (BizAgi)" 
        },
        { 
          type: "image", 
          src: "https://placehold.co/800x450/233554/64ffda?text=Oracle+Apex+Panel", 
          caption: "Panel de Métricas integrado en Oracle APEX" 
        }
      ],
      technical: {
        stack: [
          { name: "Base de Datos", items: ["MySQL (GLPI)", "Oracle DB"] },
          { name: "Herramientas", items: ["BizAgi Modeler", "Oracle APEX"] }
        ],
        challenges: [
          "Optimización de consultas SQL legacy que tardaban +10s en generar reportes.",
          "Integración de autenticación LDAP para 500+ usuarios."
        ]
      },
      // Pestaña de Documentación (Nueva funcionalidad clave)
      documents: [
        { title: "Manual Técnico de Implementación", type: "pdf", size: "65 Páginas", url: "#" },
        { title: "Diagramas de Flujo BPMN", type: "link", url: "#" }
      ]
    }
  },
  {
    id: 3,
    title: "Investigación en Computación Distribuida",
    category: "Sistemas",
    description: "Exploración académica sobre arquitecturas escalables y sistemas distribuidos, enfocada en el rendimiento.",
    image: "https://placehold.co/600x400/112240/64ffda?text=Distributed+Systems",
    technologies: ["C++", "Linux", "Docker", "Networking"],
    repoLink: "https://github.com/RicketyMajor",
    
    extended: {
      overview: `
        Investigación profunda sobre algoritmos de consenso y paralelismo. Este proyecto sirvió como base para el "Laboratorio Distribuido" que ves en este portafolio.
        
        Analicé el comportamiento de algoritmos como Raft y Paxos bajo condiciones de red inestables simuladas en contenedores Docker.
      `,
      gallery: [
        { 
          type: "image", 
          src: "https://placehold.co/800x450/0a192f/64ffda?text=Consensus+Sim", 
          caption: "Simulación de Nodos y Latencia de Red" 
        }
      ],
      technical: {
        stack: [
          { name: "Core", items: ["C++17", "Threads/Mutex", "Sockets"] },
          { name: "Infraestructura", items: ["Docker Compose", "Bash Scripts"] }
        ],
        // Snippets de código para mostrar calidad técnica
        codeSnippets: [
          {
            language: "cpp",
            title: "Implementación de Leader Election (Fragmento)",
            code: `void RaftNode::startElection() {
  state = CANDIDATE;
  currentTerm++;
  votedFor = id;
  voteCount = 1;
  // Broadcast RequestVote RPC
  for (const auto& peer : peers) {
    sendRequestVote(peer);
  }
}`
          }
        ]
      }
    }
  }
];

{/* --- SKILLS DATA (Sin cambios, se mantiene igual) --- */}
export const skills = {
  "Inteligencia Artificial & Datos": [
    { 
      name: "Machine Learning", 
      icon: <SiTensorflow />,
      description: "Diseño y entrenamiento de modelos predictivos. Experiencia ajustando hiperparámetros y evaluando métricas de precisión.",
      relatedProjects: [3, 1]
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

{/* --- TIMELINE DATA (Sin cambios) --- */}
export const timeline = [
  {
    id: 5,
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

// --- 4. DATOS "SOBRE MÍ" (Sin cambios) ---
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