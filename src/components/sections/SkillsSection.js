import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../ScrollReveal';
import { skills } from '../../data/portfolioData';

const SkillsSection = () => {
  return (
    <section id="skills" className="skills-section">
      <ScrollReveal>
        <h2 className="section-title">Habilidades Técnicas</h2>
        <p className="section-subtitle">Competencias enfocadas en Desarrollo de Software, IA y Procesos.</p>
        
        <motion.div 
          className="skills-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {Object.entries(skills).map(([category, techList]) => (
            <motion.div 
              key={category} 
              className="skill-category"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
              }}
            >
              <h3 className="category-title">{category}</h3>
              <div className="tech-grid">
                {techList.map((tech, index) => (
                  <div key={index} className="tech-item">
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollReveal>
    </section>
  );
};

export default SkillsSection;