import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../App.css';

const ProjectModal = ({ project, onClose }) => {
  // Evita que el clic en el contenido cierre el modal
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <motion.div 
      className="project-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Cierra al hacer clic en el fondo oscuro
    >
      <motion.div 
        className="project-modal"
        layoutId={`project-${project.id}`} // LA MAGIA: Mismo ID que la tarjeta pequeña
        onClick={handleContentClick}
      >
        {/* Botón Cerrar */}
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        {/* Imagen Grande */}
        <div className="modal-image">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            layoutId={`image-${project.id}`} // La imagen también se transforma
          />
        </div>

        {/* Contenido Detallado */}
        <div className="modal-content">
          <motion.h2 className="card-title" style={{ fontSize: '2rem' }}>
            {project.title}
          </motion.h2>
          
          <div className="card-tags" style={{ marginTop: '15px' }}>
            {project.technologies.map((tech, index) => (
              <span key={index} className="tag" style={{ fontSize: '0.9rem', padding: '5px 10px' }}>
                {tech}
              </span>
            ))}
          </div>

          <motion.p className="card-description" style={{ fontSize: '1.1rem', marginTop: '20px' }}>
            {project.description}
          </motion.p>
          
          <p style={{ color: '#8892b0', marginBottom: '30px' }}>
            {/* Aquí podrías agregar más detalles "long text" en tus datos si quisieras.
                Por ahora mostramos la descripción estándar pero más grande. */}
            Este proyecto representa un desafío técnico importante donde apliqué conceptos de {project.technologies.join(", ")}.
          </p>

          <div className="card-links">
             {project.demoLink && (
               <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <FaExternalLinkAlt /> Ver Demo Live
              </a>
             )}
             {project.repoLink && (
               <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaGithub /> Ver Repositorio
              </a>
             )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;