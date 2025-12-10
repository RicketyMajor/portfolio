import React from 'react';
import { motion } from 'framer-motion';

const RaftNode = ({ id, state, x, y, term, onKill }) => {
  // Mapeo de colores según estado (Basado en tu idea)
  const colors = {
    follower: "#ffffff",  // Blanco
    candidate: "#ffbd2e", // Amarillo
    leader: "#27c93f",    // Verde
    dead: "#ff5f56"       // Rojo
  };

  const currentColor = colors[state] || colors.follower;
  const isDead = state === 'dead';

  return (
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onContextMenu={(e) => { e.preventDefault(); onKill(id); }} // Click derecho para matar
      style={{ cursor: 'pointer' }}
    >
      {/* Círculo Exterior (Aura) */}
      <circle cx={x} cy={y} r="35" fill={currentColor} opacity="0.2" />
      
      {/* Círculo Principal */}
      <circle 
        cx={x} 
        cy={y} 
        r="25" 
        fill={isDead ? '#112240' : currentColor} 
        stroke={currentColor}
        strokeWidth="3"
      />

      {/* Texto ID */}
      <text 
        x={x} 
        y={y - 4} 
        textAnchor="middle" 
        fill={isDead ? currentColor : "#0a192f"} 
        fontSize="12" 
        fontWeight="bold"
        pointerEvents="none"
      >
        N{id}
      </text>

      {/* Texto Term (Término actual) */}
      <text 
        x={x} 
        y={y + 12} 
        textAnchor="middle" 
        fill={isDead ? currentColor : "#0a192f"} 
        fontSize="10" 
        pointerEvents="none"
      >
        T:{term}
      </text>
    </motion.g>
  );
};

export default RaftNode;