import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaProjectDiagram } from 'react-icons/fa';
import ScrollReveal from '../ScrollReveal';
import { skills, projects } from '../../data/portfolioData';

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (tech) => {
    if (selectedSkill?.name === tech.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(tech);
    }
  };

  const getRelatedProjects = (projectIds) => {
    if (!projectIds) return [];
    return projectIds.map(id => projects.find(p => p.id === id)).filter(Boolean);
  };

  return (
    <section id="skills" className="skills-section">
      <ScrollReveal>
        <h2 className="section-title">Habilidades Técnicas</h2>
        <p className="section-subtitle">
          Haz clic en una tecnología para ver cómo la aplico en mis proyectos.
        </p>
        
        <div className="skills-wrapper">
          
          {/* --- DETAIL PANEL --- */}
          <AnimatePresence mode="wait">
            {selectedSkill && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="skill-detail-panel"
              >
                <button 
                  className="close-skill-btn" 
                  onClick={() => setSelectedSkill(null)}
                  aria-label="Cerrar detalles"
                >
                  <FaTimes />
                </button>

                <div className="skill-detail-header">
                  <span style={{ fontSize: '2rem' }}>{selectedSkill.icon}</span>
                  <h3>{selectedSkill.name}</h3>
                </div>

                <p className="skill-detail-description">
                  {selectedSkill.description}
                </p>

                {/* --- RELATED PROJECTS --- */}
                {selectedSkill.relatedProjects && selectedSkill.relatedProjects.length > 0 && (
                  <div>
                    <h4 className="related-projects-title">Implementado en:</h4>
                    <div className="related-projects-list">
                      {getRelatedProjects(selectedSkill.relatedProjects).map((proj) => (
                        <div key={proj.id} className="related-project-tag">
                          <FaProjectDiagram size={12} /> {proj.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- SKILLS GRID --- */}
          <motion.div 
            className="skills-container"
            layout
          >
            {Object.entries(skills).map(([category, techList]) => (
              <div key={category} className="skill-category">
                <h3 className="category-title">{category}</h3>
                <div className="tech-grid">
                  {techList.map((tech, index) => {
                    const isSelected = selectedSkill?.name === tech.name;
                    const isInactive = selectedSkill && !isSelected;

                    return (
                      <motion.div 
                        key={index} 
                        className={`tech-item ${isSelected ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                        onClick={() => handleSkillClick(tech)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        layout
                      >
                        <span className="tech-icon">{tech.icon}</span>
                        <span className="tech-name">{tech.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </ScrollReveal>
    </section>
  );
};

export default SkillsSection;