import React from 'react';
import Tilt from 'react-parallax-tilt'; // Importamos la librería
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../App.css'; 

const ProjectCard = ({ project }) => {
  return (
    // Envolvemos la tarjeta en Tilt
    // tiltMaxAngleX/Y controla cuánto se inclina (sutil es mejor)
    // scale hace un pequeño zoom al hacer hover
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={450} className="tilt-card">
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
    </Tilt>
  );
};

export default ProjectCard;