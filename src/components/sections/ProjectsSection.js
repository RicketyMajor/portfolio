import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import ScrollReveal from '../ScrollReveal';
import ProjectCard from '../ProjectCard';
import ProjectModal from '../ProjectModal';
import { projects } from '../../data/portfolioData';

const ProjectsSection = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('Todos'); // Estado del filtro

  // 1. Obtener categorías únicas de tus proyectos + "Todos"
  const categories = ['Todos', ...new Set(projects.map(p => p.category))];

  // 2. Filtrar el array de proyectos
  const filteredProjects = projects.filter(project => 
    filter === 'Todos' || project.category === filter
  );

  const selectedProject = projects.find(p => p.id === selectedId);

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

        {/* GRILLA DE PROYECTOS (Con Layout Animation) */}
        <motion.div 
          className="projects-grid"
          layout // ESTA PROP ES MÁGICA: Anima el reordenamiento
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedId(project.id)} 
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