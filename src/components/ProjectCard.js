import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SkeletonLoader from './SkeletonLoader';
import '../App.css'; 

const ProjectCard = ({ project, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div 
      layoutId={`project-${project.id}`} 
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={450} className="tilt-card">
        <div className="project-card">
          
          <div className="card-image" style={{ position: 'relative', height: '200px' }}>
            {!imageLoaded && (
              <SkeletonLoader style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            )}
            <motion.img 
              layoutId={`image-${project.id}`}
              src={project.image} 
              alt={project.title} 
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
            />
          </div>

          <div className="card-content">
            <h3 className="card-title">{project.title}</h3>
            <p className="card-description">
              {project.description.length > 100 
                ? project.description.substring(0, 100) + "..." 
                : project.description}
            </p>
            <div className="card-tags">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="tag">{tech}</span>
              ))}
              {project.technologies.length > 3 && <span className="tag">+{project.technologies.length - 3}</span>}
            </div>
            
            <div className="card-links">
               {project.demoLink && (
                 <a 
                   href={project.demoLink} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="btn-card demo"
                   onClick={(e) => e.stopPropagation()} 
                 >
                  <FaExternalLinkAlt /> Demo
                </a>
               )}
               {project.repoLink && (
                 <a 
                   href={project.repoLink} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="btn-card repo"
                   onClick={(e) => e.stopPropagation()}
                 >
                  <FaGithub /> Código
                </a>
               )}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default ProjectCard;