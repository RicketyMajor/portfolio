import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaServer, FaGlobe, FaUsers, FaBolt } from 'react-icons/fa';
import ScrollReveal from '../ScrollReveal';
import '../../styles/architecture.css'; // Crearemos este CSS

const ArchitectureSection = () => {
  const [activeNode, setActiveNode] = useState(null);

  // Definición de Nodos
  const nodes = [
    { id: 'client', label: 'Browser Client', icon: <FaGlobe />, x: 150, y: 300, color: '#64ffda', desc: 'React 18, Web Workers & Zustand.' },
    { id: 'vercel', label: 'Vercel Edge', icon: <FaServer />, x: 150, y: 100, color: '#fff', desc: 'Hosting estático, Serverless Functions & GeoIP.' },
    { id: 'party', label: 'PartyKit Cloud', icon: <FaUsers />, x: 450, y: 300, color: '#ffbd2e', desc: 'Servidor WebSocket Stateful para Multiplayer (CRDTs).' },
    { id: 'apis', label: 'External APIs', icon: <FaBolt />, x: 450, y: 100, color: '#ff5f56', desc: 'Spotify, GitHub & REST Data Sources.' },
  ];

  // Definición de Conexiones
  const edges = [
    { from: 'client', to: 'vercel', label: 'HTTPS / Fetch', dashed: false },
    { from: 'client', to: 'party', label: 'WebSocket (WSS)', dashed: true },
    { from: 'vercel', to: 'apis', label: 'API Gateway', dashed: false },
    { from: 'client', to: 'client', label: 'Web Worker Thread', loop: true }, // Auto-conexión (simulada)
  ];

  return (
    <section id="architecture" className="projects-section">
      <ScrollReveal>
        <h2 className="section-title">Arquitectura del Sistema</h2>
        <p className="section-subtitle">
          Este portafolios no es solo una web estática. Es una aplicación distribuida híbrida 
          que combina <strong>Serverless</strong> para escalabilidad y <strong>Stateful Edge</strong> para tiempo real.
        </p>

        <div className="arch-container">
          <svg width="600" height="400" viewBox="0 0 600 400" className="arch-svg">
            
            {/* CONEXIONES (LÍNEAS) */}
            {edges.map((edge, i) => {
              const start = nodes.find(n => n.id === edge.from);
              const end = nodes.find(n => n.id === edge.to);
              
              if (edge.loop) return null; // Omitimos el loop visual por simplicidad

              return (
                <g key={i}>
                  <motion.line 
                    x1={start.x} y1={start.y} 
                    x2={end.x} y2={end.y} 
                    stroke="rgba(136, 146, 176, 0.2)" 
                    strokeWidth="2"
                    strokeDasharray={edge.dashed ? "5,5" : "0"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  {/* Etiqueta en la línea */}
                  <text 
                    x={(start.x + end.x) / 2} 
                    y={(start.y + end.y) / 2 - 10} 
                    fill="var(--text-secondary)" 
                    fontSize="10" 
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* NODOS INTERACTIVOS */}
            {nodes.map((node) => (
              <motion.g 
                key={node.id}
                onHoverStart={() => setActiveNode(node.id)}
                onHoverEnd={() => setActiveNode(null)}
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.1 }}
              >
                {/* Aura */}
                <circle cx={node.x} cy={node.y} r="40" fill={node.color} opacity="0.1" />
                {/* Borde */}
                <circle cx={node.x} cy={node.y} r="30" fill="#0a192f" stroke={node.color} strokeWidth="2" />
                
                {/* Icono (Centrado aprox) */}
                <foreignObject x={node.x - 15} y={node.y - 15} width="30" height="30">
                  <div style={{ color: node.color, fontSize: '24px', display:'flex', justifyContent:'center' }}>
                    {node.icon}
                  </div>
                </foreignObject>

                {/* Etiqueta */}
                <text x={node.x} y={node.y + 50} textAnchor="middle" fill={node.color} fontSize="12" fontWeight="bold">
                  {node.label}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* PANEL DE DETALLES (FLOTANTE) */}
          <div className="arch-details">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="detail-card"
                >
                  <h4 style={{ color: nodes.find(n => n.id === activeNode).color }}>
                    {nodes.find(n => n.id === activeNode).label}
                  </h4>
                  <p>{nodes.find(n => n.id === activeNode).desc}</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="detail-placeholder"
                >
                  <p>Pasa el mouse sobre los nodos para ver la tecnología.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
};

export default ArchitectureSection;