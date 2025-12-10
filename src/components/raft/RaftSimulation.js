import React, { useState } from 'react';
import RaftNode from './RaftNode';
import '../../styles/raft.css'; // Crearemos este CSS

const RaftSimulation = () => {
  const [nodes, setNodes] = useState([
    { id: 1, state: 'follower', term: 1, isDead: false },
    { id: 2, state: 'follower', term: 1, isDead: false },
    { id: 3, state: 'leader',   term: 1, isDead: false }, // Un líder inicial para probar
    { id: 4, state: 'follower', term: 1, isDead: false },
    { id: 5, state: 'candidate',term: 2, isDead: false }, // Un candidato para probar
  ]);

  // CONFIGURACIÓN VISUAL
  const centerX = 300;
  const centerY = 200;
  const radius = 140;

  // Calculamos posiciones en círculo
  const nodePositions = nodes.map((node, index) => {
    const angle = (index * 2 * Math.PI) / nodes.length - Math.PI / 2; // -PI/2 para empezar arriba
    return {
      ...node,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  // Generamos las conexiones (Todos con todos, pero sin duplicar líneas)
  const connections = [];
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      connections.push({
        from: nodePositions[i],
        to: nodePositions[j],
        id: `${nodePositions[i].id}-${nodePositions[j].id}`
      });
    }
  }

  // Función simulada para matar nodo
  const handleKill = (id) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, state: 'dead', isDead: true } : n));
  };

  return (
    <div className="raft-container">
      <div className="raft-controls">
        <h3>Raft Consensus Simulator</h3>
        <p>Click derecho en un nodo para "matarlo". (Lógica real en progreso...)</p>
      </div>

      <svg width="600" height="400" viewBox="0 0 600 400" className="raft-svg">
        
        {/* 1. DIBUJAR CONEXIONES (LÍNEAS) */}
        {connections.map(conn => (
          <line
            key={conn.id}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="rgba(136, 146, 176, 0.2)"
            strokeWidth="2"
            strokeDasharray="5,5" // Línea punteada sutil
          />
        ))}

        {/* 2. DIBUJAR NODOS */}
        {nodePositions.map(node => (
          <RaftNode
            key={node.id}
            id={node.id}
            state={node.state}
            x={node.x}
            y={node.y}
            term={node.term}
            onKill={handleKill}
          />
        ))}

      </svg>
    </div>
  );
};

export default RaftSimulation;