import React, { useState } from 'react'; // <--- Importar useState
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SkeletonLoader from './SkeletonLoader'; // <--- Importar Skeleton
import '../App.css'; 

const ProjectCard = ({ project }) => {
  // Estado para controlar la carga de la imagen
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={450} className="tilt-card">
      <div className="project-card">
        
        {/* Contenedor de la Imagen */}
        <div className="card-image" style={{ position: 'relative', height: '200px' }}>
          
          {/* 1. Si NO ha cargado, mostramos el Skeleton */}
          {!imageLoaded && (
            <SkeletonLoader style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
          )}

          {/* 2. La imagen real. Se muestra solo cuando imageLoaded es true */}
          <img 
            src={project.image} 
            alt={project.title} 
            onLoad={() => setImageLoaded(true)} // ¡Aquí ocurre la magia!
            style={{ 
              opacity: imageLoaded ? 1 : 0, // Transición suave con opacidad
              transition: 'opacity 0.5s ease'
            }}
          />
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