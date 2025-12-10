import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { scroller } from 'react-scroll';
import ScrollReveal from '../ScrollReveal';
import ProjectCard from '../ProjectCard';
import ProjectModal from '../ProjectModal';
import { projects } from '../../data/portfolioData';

const ProjectsSection = ({ selectedId, setSelectedId }) => {
  const [filter, setFilter] = React.useState('Todos'); // El filtro sí puede quedarse local

  const categories = ['Todos', ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(project => 
    filter === 'Todos' || project.category === filter
  );

  const selectedProject = projects.find(p => p.id === selectedId);

  const handleCardClick = (id) => {
    // 1. Forzamos el scroll hacia la sección de proyectos
    scroller.scrollTo('projects', {
      duration: 500,
      smooth: true,
      offset: -80, // Ajuste para que no quede tapado por el navbar
    });

    // 2. Abrimos el modal
    setSelectedId(id);
  };

return (
    <section id="projects" className="projects-section">
      <ScrollReveal>
        <h2 className="section-title">Proyectos Destacados</h2>
        
        {/* BARRA DE FILTROS */}
        <div className="project-filter">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLA */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                // Usamos nuestra nueva función manejadora
                onClick={() => handleCardClick(project.id)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </ScrollReveal>

      <AnimatePresence>
        {selectedId && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;