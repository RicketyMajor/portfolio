import React from 'react';
import { motion } from 'framer-motion';

const RaftNode = ({ id, state, x, y, term, onKill }) => {
  const colors = {
    follower: "#ffffff",
    candidate: "#ffbd2e",
    leader: "#27c93f",
    dead: "#ff5f56"
  };

  const currentColor = colors[state] || colors.follower;
  const isDead = state === 'dead';

  return (
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onContextMenu={(e) => { e.preventDefault(); onKill(id); }}
      style={{ cursor: 'pointer' }}
    >
      {/* --- OUTER CIRCLE (AURA) --- */}
      <circle cx={x} cy={y} r="35" fill={currentColor} opacity="0.2" />
      
      {/* --- MAIN CIRCLE --- */}
      <circle 
        cx={x} 
        cy={y} 
        r="25" 
        fill={isDead ? '#112240' : currentColor} 
        stroke={currentColor}
        strokeWidth="3"
      />

      {/* --- ID TEXT --- */}
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

      {/* --- TERM TEXT --- */}
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