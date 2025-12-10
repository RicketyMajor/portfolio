import React from 'react';
import ScrollReveal from '../ScrollReveal';
import CollaborationCanvas from '../CollaborationCanvas';

const CollaborationSection = () => {
  return (
    <section id="collaboration" className="projects-section" style={{ minHeight: 'auto', marginBottom: '100px' }}>
      <ScrollReveal>
        <h2 className="section-title">Colaboración en Tiempo Real</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '30px' }}>
          Este lienzo es un experimento de <strong>Consistencia Eventual</strong>. 
          Utiliza <strong>CRDTs (Yjs)</strong> para sincronizar el estado entre todos los visitantes sin conflictos, 
          incluso si hay latencia de red. Haz clic para dejar una marca persistente.
        </p>
        
        <CollaborationCanvas />
        
      </ScrollReveal>
      
    </section>
    
  );
};

export default CollaborationSection;