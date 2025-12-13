import React, { useEffect, useState } from 'react';
import YPartyKitProvider from "y-partykit/provider";
import * as Y from "yjs";
import randomColor from "randomcolor";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/cursors.css';

const MultiplayerCursors = () => {
  const [awareness, setAwareness] = useState(null);
  const [users, setUsers] = useState({});
  const [myColor] = useState(randomColor());

  useEffect(() => {
    {/* --- CONNECTION TO PARTYKIT SERVER --- */}
    const yDoc = new Y.Doc();
    const partykitHost = process.env.NODE_ENV === 'production'
      ? "alonso-portfolio.ricketymajor.partykit.dev" // <--- TU URL PRODUCCIÓN (sin https://)
      : "127.0.0.1:1999";
    
    const provider = new YPartyKitProvider(
      partykitHost, 
      "portfolio-room",
      yDoc
    );

    {/* --- AWARENESS SETUP --- */}
    const localAwareness = provider.awareness;
    setAwareness(localAwareness);

    localAwareness.setLocalState({
      user: {
        id: Math.random().toString(36).substr(2, 9),
        color: myColor,
        x: 0,
        y: 0,
      }
    });

    {/* --- LISTEN TO OTHER USERS CHANGES --- */}
    localAwareness.on('change', () => {
      const states = localAwareness.getStates();
      const activeUsers = {};
      
      states.forEach((state, clientId) => {
        if (clientId !== yDoc.clientID && state.user) {
          activeUsers[clientId] = state.user;
        }
      });
      
      setUsers(activeUsers);
    });

    return () => {
      provider.disconnect();
      yDoc.destroy();
    };
  }, [myColor]);

  {/* --- HANDLE MY MOUSE MOVEMENT --- */}
useEffect(() => {
    if (!awareness) return;

    let lastUpdate = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();

      if (now - lastUpdate > 60) {
        
        const localState = awareness.getLocalState();
        if (localState) {
          awareness.setLocalState({
            ...localState,
            user: {
              ...localState.user,
              x: e.pageX,
              y: e.pageY
            }
          });
        }
        
        lastUpdate = now; // Actualizamos la marca de tiempo
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [awareness]);

  // Renderizar cursores de OTROS
  return (
    <div className="cursors-layer">
      <AnimatePresence>
        {Object.entries(users).map(([id, user]) => (
          <motion.div
            key={id}
            className="cursor-indicator"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: user.x, 
              y: user.y 
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1, ease: "linear" }} // Movimiento suave
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
          >
            {/* El Cursor (Flecha SVG) */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(-15deg)' }}
            >
              <path
                d="M5.5 3.5L19 10L11.5 12.5L9 19L5.5 3.5Z"
                fill={user.color}
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            
            {/* Etiqueta con nombre/ID */}
            <div 
              className="cursor-label"
              style={{ backgroundColor: user.color }}
            >
              Guest {id.substr(0,4)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MultiplayerCursors;