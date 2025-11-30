import React from 'react';
import ScrollReveal from '../ScrollReveal';
import ProjectCard from '../ProjectCard'; // Importamos la tarjeta individual
import { projects } from '../../data/portfolioData'; // Importamos los datos

const ProjectsSection = () => {
  return (
    <section id="projects" className="projects-section">
      <ScrollReveal>
        <h2 className="section-title">Proyectos Destacados</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ProjectsSection;