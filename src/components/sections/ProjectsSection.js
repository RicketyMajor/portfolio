import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion'; // Para animar la entrada/salida del modal
import ScrollReveal from '../ScrollReveal';
import ProjectCard from '../ProjectCard';
import ProjectModal from '../ProjectModal'; // Importamos el modal
import { projects } from '../../data/portfolioData';

const ProjectsSection = () => {
  // Estado para saber qué ID está seleccionado (null = ninguno)
  const [selectedId, setSelectedId] = useState(null);

  // Buscamos el objeto completo del proyecto seleccionado
  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="projects" className="projects-section">
      <ScrollReveal>
        <h2 className="section-title">Proyectos Destacados</h2>
        <p style={{ color: '#8892b0', marginBottom: '30px' }}>
            Haz clic en una tarjeta para ver más detalles.
        </p>
        
        {/* Grilla de tarjetas */}
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedId(project.id)} // Seteamos el ID al hacer click
            />
          ))}
        </div>
      </ScrollReveal>

      {/* Renderizado del Modal con Animación */}
      <AnimatePresence>
        {selectedId && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedId(null)} // Cerrar modal
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;