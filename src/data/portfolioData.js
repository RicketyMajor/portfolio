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

// 2. DATOS DE SKILLS
export const skills = {
  "Inteligencia Artificial & Datos": [
    { name: "Machine Learning", icon: <SiTensorflow /> },
    { name: "NLP", icon: <SiPytorch /> },
    { name: "Oracle Cloud AI", icon: <SiOracle /> },
    { name: "SQL & Bases de Datos", icon: <FaDatabase /> },
  ],
  "Lenguajes & Backend": [
    { name: "Python", icon: <FaPython /> },
    { name: "Java", icon: <FaJava /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "Node.js", icon: <FaNodeJs /> },
  ],
  "Herramientas & Procesos": [
    { name: "Git & GitHub", icon: <FaGitAlt /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "Linux", icon: <FaLinux /> },
    { name: "BizAgi / Documentación", icon: <FaBriefcase /> },
  ]
};

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