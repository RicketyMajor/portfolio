import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { clusterMachine } from './clusterMachine';
import RaftNode from './RaftNode';
import '../../styles/raft.css';

const RaftSimulation = () => {
  const [state, send] = useMachine(clusterMachine);
  const nodes = state.context.nodes || [];
  const packets = state.context.packets || []; // <-- Capturamos los paquetes

  useEffect(() => { send({ type: 'INIT_NODES' }); }, [send]);
  useEffect(() => {
    const interval = setInterval(() => { send({ type: 'TICK' }); }, 20); // 50 FPS
    return () => clearInterval(interval);
  }, [send]);

  // CONFIGURACIÓN VISUAL
  const centerX = 300;
  const centerY = 200;
  const radius = 140;

  // Mapa de posiciones para búsqueda rápida
  const posMap = {};
  const nodePositions = nodes.map((node, index) => {
    const angle = (index * 2 * Math.PI) / nodes.length - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    posMap[node.id] = { x, y }; // Guardamos para usarlo en paquetes
    return { ...node, x, y };
  });

  // Conexiones estáticas
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

  // Colores de paquetes
  const getPacketColor = (type) => {
    if (type === 'HEARTBEAT') return '#27c93f'; // Verde (Líder)
    if (type === 'VOTE_REQ') return '#ffbd2e';  // Amarillo (Solicitud)
    if (type === 'VOTE_ACK') return '#64ffda';  // Cian (Voto concedido)
    return '#fff';
  };

  return (
    <div className="raft-container">
      <div className="raft-controls">
        <h3>Simulación de Consenso Raft</h3>
        <p>Click derecho en un nodo para <strong>matarlo</strong> o <strong>revivirlo</strong>.</p>
        <div style={{marginTop: 5, fontSize: '0.8rem', opacity: 0.7, fontFamily: 'monospace'}}>
          Packets In-Flight: {packets.length} | Term: {nodes.length > 0 ? Math.max(...nodes.map(n => n.term)) : 1}
        </div>
      </div>

      <svg width="600" height="400" viewBox="0 0 600 400" className="raft-svg">
        
        {/* LÍNEAS DE CONEXIÓN */}
        {connections.map(conn => (
          <line
            key={conn.id}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="rgba(136, 146, 176, 0.1)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}

        {/* PAQUETES (MENSAJES) VIAJANDO */}
        {packets.map(pkt => {
          const start = posMap[pkt.from];
          const end = posMap[pkt.to];
          if (!start || !end) return null;

          // Interpolación Lineal (Lerp)
          const currentX = start.x + (end.x - start.x) * (pkt.progress / 100);
          const currentY = start.y + (end.y - start.y) * (pkt.progress / 100);

          return (
            <circle 
              key={pkt.id}
              cx={currentX}
              cy={currentY}
              r="4"
              fill={getPacketColor(pkt.type)}
              className="raft-packet"
            />
          );
        })}

        {/* NODOS */}
        {nodePositions.map(node => (
          <RaftNode
            key={node.id}
            id={node.id}
            state={node.state}
            x={node.x}
            y={node.y}
            term={node.term}
            
            // --- LÓGICA DE TOGGLE ---
            onKill={(id) => {
              if (node.state === 'dead') {
                send({ type: 'REVIVE_NODE', id });
              } else {
                send({ type: 'KILL_NODE', id });
              }
            }} 
          />
        ))}

      </svg>
    </div>
  );
};

export default RaftSimulation;