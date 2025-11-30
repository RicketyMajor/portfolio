import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './App.css';

// Importamos Componentes
import Navbar from './components/Navbar';
import ScrollReveal from './components/ScrollReveal';

// Importamos Recursos
import profileImage from './perfil.png';
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaEnvelope, FaWhatsapp, FaGraduationCap } from 'react-icons/fa';

// --- IMPORTAMOS LOS DATOS DESDE EL NUEVO ARCHIVO ---
import { projects, skills, timeline } from './data/portfolioData';

// Componente ProjectCard (Podríamos moverlo a su propio archivo en el futuro, pero por ahora está bien aquí)
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
  return (
    <div className="App">
      
      <Navbar />

      <section id="hero-section" className="hero-section">
        <div className="hero-content">
          <h2 className="greeting">Hola, soy</h2>
          <h1 className="name">ALONSO VERA LARACH</h1>
          <div className="role">
            <TypeAnimation
              sequence={[
                'Estudiante de Ingeniería Civil Informática',
                1000,
                'Futuro Especialista en Sistemas Distribuidos',
                1000,
                'Desarrollador Backend & Cloud',
                1000,
                'Entusiasta de la Inteligencia Artificial',
                1000
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '1em', display: 'inline-block' }}
              repeat={Infinity}
            />
          </div>
          <p className="description">
            Explorando la arquitectura de <strong>Sistemas Distribuidos</strong> y soluciones de <strong>Inteligencia Artificial</strong>.
          </p>

          <div className="hero-buttons">
            <link to="projects" smooth={true} offset={-80} duration={500} className="btn btn-primary">
                Ver mis Proyectos
            </link>
            <a href="/Profile.pdf" download className="btn btn-secondary">Descargar CV</a>
          </div>

          <div className="social-icons">
            <a href="https://github.com/RicketyMajor" target="_blank" rel="noopener noreferrer"><FaGithub className="icon" /></a>
            <a href="https://www.linkedin.com/in/alonso-vera-larach-1103542b7" target="_blank" rel="noopener noreferrer"><FaLinkedin className="icon" /></a>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <ScrollReveal>
          <h2 className="section-title">Proyectos Destacados</h2>
          <div className="projects-grid">
            {/* Usamos la variable 'projects' importada */}
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="skills" className="skills-section">
        <ScrollReveal>
          <h2 className="section-title">Habilidades Técnicas</h2>
          <p className="section-subtitle">Competencias enfocadas en Desarrollo de Software, IA y Procesos.</p>
          
          <motion.div 
            className="skills-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* Usamos la variable 'skills' importada */}
            {Object.entries(skills).map(([category, techList]) => (
              <motion.div 
                key={category} 
                className="skill-category"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                }}
              >
                <h3 className="category-title">{category}</h3>
                <div className="tech-grid">
                  {techList.map((tech, index) => (
                    <div key={index} className="tech-item">
                      <span className="tech-icon">{tech.icon}</span>
                      <span className="tech-name">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </section>

      <section id="about" className="about-section">
        <ScrollReveal>
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
        </ScrollReveal>
      </section>

      <section id="trajectory" className="education-section">
        <ScrollReveal>
          <h2 className="section-title">Trayectoria y Experiencia</h2>
          <div className="timeline-container">
            {/* Usamos la variable 'timeline' importada */}
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
        </ScrollReveal>
      </section>

      <section id="contact" className="contact-section">
        <ScrollReveal>
          <div className="contact-container">
            <h2 className="section-title">¿Interesado en colaborar?</h2>
            <p className="contact-text">
              Estoy abierto a nuevas oportunidades, proyectos de investigación o simplemente a charlar sobre tecnología. ¡Contáctame!
            </p>
            
            <div className="contact-methods">
              <a href="mailto:alonsoveralarach@gmail.com" className="contact-card">
                <FaEnvelope className="contact-icon" />
                <h3>Email Principal</h3>
                <p>alonsoveralarach@gmail.com</p>
              </a>

              <a href="mailto:alonso.vera@mail.udp.cl" className="contact-card">
                <FaGraduationCap className="contact-icon" />
                <h3>Email Institucional</h3>
                <p>alonso.vera@mail.udp.cl</p>
              </a>

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
        </ScrollReveal>
      </section>

    </div>
  );
}

export default App;