import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { 
  FaGithub, FaLinkedin, FaExternalLinkAlt, 
  FaChalkboardTeacher, FaBriefcase, FaTrophy, FaGraduationCap, FaCertificate,
  FaJs, FaReact, FaHtml5, FaCss3, FaNodeJs, FaPython, FaJava, 
  FaGitAlt, FaLinux, FaDocker, FaAws, FaDatabase,
  FaEnvelope, FaWhatsapp, FaMapMarkerAlt
} from 'react-icons/fa';
import { 
  SiCplusplus, SiPostgresql, SiMongodb, SiExpress, SiDjango, SiGnubash, 
  SiOracle, SiPytorch, SiTensorflow 
} from 'react-icons/si';
import profileImage from './perfil.png';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="card-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <div className="card-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tag">{tech}</span>
          ))}
        </div>
        <div className="card-links">
           {project.demoLink && (
             <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn-card demo">
              <FaExternalLinkAlt /> Ver Detalles
            </a>
           )}
           {project.repoLink && (
             <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn-card repo">
              <FaGithub /> Código
            </a>
           )}
        </div>
      </div>
    </div>
  );
};

function App() {
  
  const projects = [
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

  const skills = {
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

  const timeline = [
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

  return (
    <div className="App">
      
      <Navbar />

      <section className="hero-section">
        <div className="hero-content">
          <h2 className="greeting">Hola, soy</h2>
          <h1 className="name">ALONSO VERA LARACH</h1>
          <h3 className="role">Estudiante de Ingeniería Civil en Informática y Telecomunicaciones</h3>
          <p className="description">
            Explorando la arquitectura de <strong>Sistemas Distribuidos</strong> y soluciones de <strong>Inteligencia Artificial</strong>.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">Ver mis Proyectos</a>
            <a href="/Profile.pdf" download className="btn btn-secondary">Descargar CV</a>
          </div>
          <div className="social-icons">
            <a href="https://github.com/RicketyMajor" target="_blank" rel="noopener noreferrer"><FaGithub className="icon" /></a>
            <a href="https://www.linkedin.com/in/alonso-vera-larach-1103542b7" target="_blank" rel="noopener noreferrer"><FaLinkedin className="icon" /></a>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <h2 className="section-title">Proyectos Destacados</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section id="skills" className="skills-section">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <p className="section-subtitle">Competencias enfocadas en Desarrollo de Software, IA y Procesos.</p>
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

      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-image-wrapper">
            <img src={profileImage} alt="Alonso Vera Larach" className="about-image" />
            <div className="image-border"></div>
          </div>
          <div className="about-text">
            <h2 className="section-title">Sobre Mí</h2>
            <p>Soy <strong>Alonso Vera Larach</strong>, estudiante de 4to año de Ingeniería Civil en Informática y Telecomunicaciones en la UDP. Me defino como una persona <strong>creativa y constante</strong>.</p>
            <p>Mi enfoque actual combina la robustez de la <strong>Computación Distribuida</strong> con la innovación de la <strong>Inteligencia Artificial y el Machine Learning</strong>.</p>
            <p>He complementado mi formación académica con una fuerte vocación docente, desempeñándome como ayudante en múltiples cátedras.</p>
          </div>
        </div>
      </section>

      <section id="trajectory" className="education-section">
        <h2 className="section-title">Trayectoria y Experiencia</h2>
        <div className="timeline-container">
          {timeline.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-icon-bg">{item.icon}</div>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-institution">{item.institution}</h4>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN CONTACTO (NUEVA) */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">¿Interesado en colaborar?</h2>
          <p className="contact-text">
            Estoy abierto a nuevas oportunidades, proyectos de investigación o simplemente a charlar sobre tecnología. ¡Contáctame!
          </p>
          
          <div className="contact-methods">
            {/* Correo Principal */}
            <a href="mailto:alonsoveralarach@gmail.com" className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email Principal</h3>
              <p>alonsoveralarach@gmail.com</p>
            </a>

            {/* Correo UDP */}
            <a href="mailto:alonso.vera@mail.udp.cl" className="contact-card">
              <FaGraduationCap className="contact-icon" />
              <h3>Email Institucional</h3>
              <p>alonso.vera@mail.udp.cl</p>
            </a>

            {/* Teléfono / WhatsApp */}
            <a href="https://wa.me/56952012548" target="_blank" rel="noopener noreferrer" className="contact-card">
              <FaWhatsapp className="contact-icon" />
              <h3>Teléfono / WhatsApp</h3>
              <p>+56 9 5201 2548</p>
            </a>
          </div>

          <div className="footer-bottom">
            <p>Ubicación: Gran Santiago, Chile</p>
            <p className="copyright">© 2025 Alonso Vera Larach. Construido con React.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;