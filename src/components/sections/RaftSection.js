import React from 'react';
import ScrollReveal from '../ScrollReveal';
import RaftSimulation from '../raft/RaftSimulation';

const RaftSection = () => {
  return (
    <section id="raft" className="projects-section">
      <ScrollReveal>
        <h2 className="section-title">Algoritmos de Consenso</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '800px' }}>
          Visualización interactiva del algoritmo <strong>Raft</strong>. 
          Los sistemas distribuidos necesitan ponerse de acuerdo sobre la verdad (Log). 
          Aquí simulamos cómo un clúster elige un líder y sobrevive a fallos.
        </p>
        
        <RaftSimulation />
        
      </ScrollReveal>
    </section>
  );
};

export default RaftSection;