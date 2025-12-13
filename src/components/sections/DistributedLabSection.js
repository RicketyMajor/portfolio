import React from 'react';
import ScrollReveal from '../ScrollReveal';
import RaftSimulation from '../raft/RaftSimulation';
import DistributedCompute from '../compute/DistributedCompute';
import CollaborationCanvas from '../CollaborationCanvas'; // Importamos el Canvas directamente

const DistributedLabSection = () => {
  return (
    <section id="lab" className="projects-section">
      <ScrollReveal>
        <h2 className="section-title">Laboratorio Distribuido</h2>
        <p className="section-subtitle">
          Experimentos interactivos sobre sistemas distribuidos, consenso y paralelismo.
        </p>
        
        {/* 1. ALGORITMOS DE CONSENSO (RAFT) */}
        <div style={{ marginBottom: '100px' }}>
          <h3 className="section-subtitle" style={{color: 'var(--accent)', marginBottom:'10px'}}>
            01. Consenso & Tolerancia a Fallos
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '800px' }}>
            Visualización del algoritmo <strong>Raft</strong>. Los sistemas distribuidos necesitan ponerse de acuerdo sobre la verdad. 
            Prueba matar al Líder (Click Derecho) y observa cómo el clúster elige uno nuevo.
          </p>
          <RaftSimulation />
        </div>

        {/* 2. COLABORACIÓN (CRDTs) */}
        <div style={{ marginBottom: '100px' }}>
          <h3 className="section-subtitle" style={{color: 'var(--accent)', marginBottom:'10px'}}>
            02. Consistencia Eventual (CRDTs)
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '800px' }}>
            Sincronización de estado en tiempo real sin conflictos usando <strong>Yjs + PartyKit</strong>. 
            Varios usuarios pueden dibujar simultáneamente y el sistema converge matemáticamente al mismo estado.
          </p>
          <CollaborationCanvas />
        </div>

        {/* 3. CÓMPUTO PARALELO (WEB WORKERS) */}
        <div>
          <h3 className="section-subtitle" style={{color: 'var(--accent)', marginBottom:'10px'}}>
            03. Procesamiento Paralelo
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '800px' }}>
            Utilizando <strong>Web Workers</strong> para realizar cálculos matemáticos pesados (Fractales) 
            en hilos secundarios, demostrando cómo el navegador puede actuar como un nodo de procesamiento.
          </p>
          <DistributedCompute />
        </div>
        
      </ScrollReveal>
    </section>
  );
};

export default DistributedLabSection;