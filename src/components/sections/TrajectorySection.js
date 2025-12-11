import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa'; 
import ScrollReveal from '../ScrollReveal';
import { timeline } from '../../data/portfolioData';

const TrajectorySection = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="trajectory" className="education-section">
      <ScrollReveal>
        <h2 className="section-title">Trayectoria y Experiencia</h2>
        
        <div className="timeline-container">
          {timeline.map((item) => {
            const isOpen = expandedId === item.id;

            return (
              <motion.div 
                key={item.id} 
                className={`timeline-item ${isOpen ? 'active' : ''}`}
                layout 
                onClick={() => toggleExpand(item.id)}
              >
                {/* --- TIMELINE MARKER --- */}
                <div className="timeline-marker">
                  <div className="timeline-icon-bg">{item.icon}</div>
                  <div className="timeline-line"></div>
                </div>

                {/* --- TIMELINE CONTENT --- */}
                <div className="timeline-content" style={{ width: '100%' }}>
                  <div className="timeline-header">
                    <div>
                      <span className="timeline-date">{item.date}</span>
                      <h3 className="timeline-title">{item.title}</h3>
                      <h4 className="timeline-institution">{item.institution}</h4>
                    </div>
                    
                    <div className="accordion-btn">
                      <FaChevronDown className="accordion-icon" />
                    </div>
                  </div>

                  <p className="timeline-description">
                    {item.description}
                  </p>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="timeline-details"
                      >
                        <ul className="detail-list">
                          {item.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TrajectorySection;