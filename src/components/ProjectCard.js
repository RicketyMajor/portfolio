import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../App.css'; // Importamos los estilos (los pondremos en App.css para simplificar)

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {/* Imagen del proyecto */}
      <div className="card-image">
        <img src={project.image} alt={project.title} />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        
        {/* Etiquetas de Tecnologías */}
        <div className="card-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tag">{tech}</span>
          ))}
        </div>

        {/* Botones de Acción */}
        <div className="card-links">
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn-card demo">
            <FaExternalLinkAlt /> Ver Demo
          </a>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn-card repo">
            <FaGithub /> Ver Código
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;