import React from 'react';
import './App.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ProjectCard from './components/ProjectCard'; 
import { 
  FaJs, FaReact, FaHtml5, FaCss3, FaNodeJs, FaPython, FaJava, 
  FaGitAlt, FaLinux, FaDocker, FaAws 
} from 'react-icons/fa';
import { 
  SiCplusplus, SiPostgresql, SiMongodb, SiExpress, SiDjango, SiGnubash 
} from 'react-icons/si';

function App() {
  
  // AQUÍ ESTÁN TUS PROYECTOS (Puedes editar esto fácilmente)
  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "Panel de administración para una tienda online con gráficos en tiempo real y gestión de inventario.",
      image: "https://placehold.co/600x400/1a1a1a/white?text=E-commerce+Project", // Imagen de ejemplo
      technologies: ["React", "Node.js", "Chart.js"],
      demoLink: "https://google.com",
      repoLink: "https://github.com"
    },
    {
      id: 2,
      title: "Task Manager App",
      description: "Aplicación de gestión de tareas con funcionalidad drag-and-drop y autenticación de usuarios.",
      image: "https://placehold.co/600x400/1a1a1a/white?text=Task+Manager", // Imagen de ejemplo
      technologies: ["React", "Firebase", "Tailwind"],
      demoLink: "https://google.com",
      repoLink: "https://github.com"
    },
    {
      id: 3,
      title: "Portfolio Personal",
      description: "Este mismo sitio web, diseñado para mostrar mis habilidades y proyectos de forma interactiva.",
      image: "https://placehold.co/600x400/1a1a1a/white?text=Portfolio", // Imagen de ejemplo
      technologies: ["React", "CSS3", "Git"],
      demoLink: "#",
      repoLink: "https://github.com"
    }
  ];

  // DATOS DE SKILLS
  // Nota: Como te interesa la Computación Distribuida, C++, Linux y Docker son tus joyas aquí.
  const skills = {
    "Lenguajes de Programación": [
      { name: "JavaScript", icon: <FaJs /> },
      { name: "Python", icon: <FaPython /> },
      { name: "Java", icon: <FaJava /> },
      { name: "C++", icon: <SiCplusplus /> }, // Clave para sistemas distribuidos
    ],
    "Frontend": [
      { name: "React", icon: <FaReact /> },
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3 /> },
    ],
    "Backend": [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Django", icon: <SiDjango /> },
    ],
    "Bases de Datos": [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MongoDB", icon: <SiMongodb /> }, // NoSQL es vital en sistemas distribuidos
    ],
    "Herramientas & Sistemas": [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "Docker", icon: <FaDocker /> }, // Indispensable para microservicios
      { name: "Linux", icon: <FaLinux /> },   // El sistema operativo de la nube
      { name: "Bash Scripting", icon: <SiGnubash /> },
      { name: "AWS (Básico)", icon: <FaAws /> },
    ]
  };

  return (
    <div className="App">
      
      {/* SECCIÓN INICIO (HERO) - (Ya la tenías) */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="greeting">Hola, soy</h2>
          <h1 className="name">Alonso Vera Larach</h1>
          <h3 className="role">Estudiante de Ingeniería Civil en Informática y Telecomunicaciones</h3>
          <p className="description">
            Actualmente curso el 4to año de Ingeniería Civil en Informática y Telecomunicaciones. Mi verdadera pasión no es solo escribir código, sino entender cómo sistemas complejos interactúan entre sí. Me encuentro explorando el mundo de la Computación Distribuida, con el objetivo de diseñar arquitecturas de software que sean robustas, escalables y eficientes. Busco desafíos que me permitan investigar y aplicar estos conceptos en el mundo real.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">Ver mis Proyectos</a>
            <button className="btn btn-secondary">Descargar CV</button>
          </div>
          <div className="social-icons">
            <a href="https://github.com/RicketyMajor" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: PROYECTOS */}
      <section id="projects" className="projects-section">
        <h2 className="section-title">Mis Proyectos</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
{/* SECCIÓN SKILLS */}
      <section className="skills-section">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <p className="section-subtitle">
          Stack tecnológico enfocado en el desarrollo de software y sistemas escalables.
        </p>
        
        <div className="skills-container">
          {Object.entries(skills).map(([category, techList]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="tech-grid">
                {techList.map((tech, index) => (
                  <div key={index} className="tech-item">
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* SECCIÓN SOBRE MÍ */}
      <section id="about" className="about-section">
        <div className="about-container">
          
          {/* Columna Imagen */}
          <div className="about-image-wrapper">
            {/* Cambia la URL por tu foto real más adelante. Ej: "/perfil.jpg" */}
            <img 
              src="https://placehold.co/400x400/112240/64ffda?text=Alonso+Vera" 
              alt="Foto de perfil de Alonso Vera" 
              className="about-image"
            />
            {/* Marco decorativo */}
            <div className="image-border"></div>
          </div>

          {/* Columna Texto */}
          <div className="about-text">
            <h2 className="section-title">Sobre Mí</h2>
            <p>
              Hola, soy Alonso. Actualmente curso el 4to año de <strong>Ingeniería Civil en Informática y Telecomunicaciones</strong>.
            </p>
            <p>
              Mi verdadera pasión va más allá de escribir código; me fascina entender cómo sistemas complejos interactúan y se comunican entre sí.
            </p>
            <p>
              Hoy me encuentro profundizando en el mundo de la <strong>Computación Distribuida</strong>, con el objetivo de diseñar arquitecturas de software que sean robustas, escalables y eficientes. Busco desafíos que me permitan investigar, aprender y aplicar estos conceptos para resolver problemas reales.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;