import React, { useEffect } from 'react'; // Importar useEffect
import { useMachine } from '@xstate/react'; // Importar useMachine
import { clusterMachine } from './clusterMachine'; // Importar la máquina
import RaftNode from './RaftNode';
import '../../styles/raft.css';

const RaftSimulation = () => {
  // Inicializamos la máquina
  const [state, send] = useMachine(clusterMachine);
  // Defensa contra undefined:
  const nodes = state.context.nodes || [];

  // 1. Inicializar nodos al montar
  useEffect(() => {
    send({ type: 'INIT_NODES' });
  }, [send]);

  // 2. El Reloj Maestro (Game Loop)
  useEffect(() => {
    const interval = setInterval(() => {
      send({ type: 'TICK' });
    }, 20); // 50 ticks por segundo (fluido)

    return () => clearInterval(interval);
  }, [send]);

  // CONFIGURACIÓN VISUAL (Misma de antes)
  const centerX = 300;
  const centerY = 200;
  const radius = 140;

  // Si nodes está vacío (primer render), no dibujamos nada aún
  if (!nodes || nodes.length === 0) return null;

  // Calculamos posiciones (igual que antes)
  const nodePositions = nodes.map((node, index) => {
    const angle = (index * 2 * Math.PI) / nodes.length - Math.PI / 2;
    return {
      ...node,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  // Conexiones (igual que antes)
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

  return (
    <div className="raft-container">
      <div className="raft-controls">
        <h3>Raft Consensus Simulator</h3>
        <p>Estado actual: Todos los nodos inician como Followers. Espera el Timeout...</p>
        <div style={{marginTop: 10, fontSize: '0.8rem', opacity: 0.7}}>
          Nodos: {nodes.filter(n => n.state !== 'dead').length} Vivos | Term: {Math.max(...nodes.map(n => n.term))}
        </div>
      </div>

      <svg width="600" height="400" viewBox="0 0 600 400" className="raft-svg">
        
        {/* LÍNEAS */}
        {connections.map(conn => (
          <line
            key={conn.id}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="rgba(136, 146, 176, 0.2)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        ))}

        {/* NODOS */}
        {nodePositions.map(node => (
          <RaftNode
            key={node.id}
            id={node.id}
            state={node.state}
            x={node.x}
            y={node.y}
            term={node.term}
            // Conectamos el evento KILL a la máquina
            onKill={(id) => send({ type: 'KILL_NODE', id })} 
          />
        ))}

      </svg>
    </div>
  );
};

export default RaftSimulation;