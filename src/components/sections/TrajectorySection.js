import React from 'react';
import ScrollReveal from '../ScrollReveal';
import { timeline } from '../../data/portfolioData';

const TrajectorySection = () => {
  return (
    <section id="trajectory" className="education-section">
      <ScrollReveal>
        <h2 className="section-title">Trayectoria y Experiencia</h2>
        <div className="timeline-container">
          {timeline.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-icon-bg">{item.icon}</div>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-institution">{item.institution}</h4>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TrajectorySection;