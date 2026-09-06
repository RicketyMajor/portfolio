import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import ScrollReveal from '../ScrollReveal';
import ProjectCard from '../ProjectCard';
import { projects } from '../../data/portfolioData';

// The modal drags in react-markdown and react-syntax-highlighter, which are only needed
// once a card is opened. Keep them out of the landing bundle.
const loadProjectModal = () => import('../ProjectModal');
const ProjectModal = lazy(loadProjectModal);

const ProjectsSection = ({ selectedId, setSelectedId }) => {
  const [filter, setFilter] = React.useState('Todos'); // El filtro sí puede quedarse local

  const categories = ['Todos', ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(project => 
    filter === 'Todos' || project.category === filter
  );

  const selectedProject = projects.find(p => p.id === selectedId);

  // No scrolling on open: .project-overlay is fixed and covers the viewport, so the page position
  // behind it is invisible. Scrolling here only animated the background under a translucent blur
  // and moved the card while framer-motion was measuring it for the shared layout transition.
  const handleCardClick = (id) => setSelectedId(id);

return (
    <section id="projects" className="projects-section">
      <ScrollReveal>
        <h2 className="section-title">Proyectos Destacados</h2>
        
        {/* --- FILTERS BAR --- */}
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

        {/* --- GRID --- */}
        {/* Warm the modal chunk on approach so opening a card does not wait on a download */}
        <motion.div
          className="projects-grid"
          layout
          onMouseEnter={loadProjectModal}
          onFocus={loadProjectModal}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleCardClick(project.id)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </ScrollReveal>

      <Suspense fallback={null}>
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedId(null)} 
            />
          )}
        </AnimatePresence>
      </Suspense>
    </section>
  );
};

export default ProjectsSection;