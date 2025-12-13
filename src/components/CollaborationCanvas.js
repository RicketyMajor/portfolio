import React, { useEffect, useState, useRef } from 'react';
import YPartyKitProvider from "y-partykit/provider";
import * as Y from "yjs";
import randomColor from "randomcolor";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import '../styles/collaboration.css';

const CollaborationCanvas = () => {
  const [dots, setDots] = useState([]);
  const yDotsRef = useRef(null);
  const [myColor] = useState(randomColor({ luminosity: 'bright' }));
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    {/* --- CONNECT TO PARTYKIT ROOM --- */}
    const yDoc = new Y.Doc();
    const partykitHost = process.env.NODE_ENV === 'production'
      ? "alonso-portfolio.partykit.dev" // <--- PEGA AQUÍ TU URL DE PARTYKIT (sin https://)
      : "127.0.0.1:1999";
    const provider = new YPartyKitProvider(
      partykitHost, 
      "portfolio-room", 
      yDoc
    );

    {/* --- GET SHARED ARRAY --- */}
    const yDots = yDoc.getArray('guestbook');
    yDotsRef.current = yDots;

    {/* --- SYNC INITIAL STATE --- */}
    setDots(yDots.toArray());
    setIsConnected(true);

    {/* --- LISTEN TO CHANGES --- */}
    yDots.observe(() => {
      setDots(yDots.toArray());
    });

    return () => {
      provider.disconnect();
      yDoc.destroy();
    };
  }, []);

  const handleCanvasClick = (e) => {
    if (!yDotsRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newDot = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: myColor,
      user: 'Guest',
      timestamp: Date.now()
    };

    yDotsRef.current.push([newDot]);
    
    if (yDotsRef.current.length > 50) {
      yDotsRef.current.delete(0, 1);
    }
  };

  {/* --- CLEAR CANVAS --- */}
  const handleClear = (e) => {
    e.stopPropagation();
    if (yDotsRef.current) {
      yDotsRef.current.delete(0, yDotsRef.current.length);
    }
  };

  return (
    <div className="collaboration-wrapper">
      <div className="collab-header">
        <div className="collab-status">
          <span className={`status-dot ${isConnected ? 'online' : ''}`}></span>
          {isConnected ? 'Sincronizado vía CRDTs' : 'Conectando...'}
        </div>
        <button className="clear-btn" onClick={handleClear} title="Limpiar lienzo">
          <FaTrashAlt />
        </button>
      </div>

      <div className="canvas-container" onClick={handleCanvasClick}>
        
        {dots.length === 0 && (
          <div className="canvas-placeholder">
            <p>Haz clic para dejar tu huella en el sistema distribuido.</p>
          </div>
        )}

        <AnimatePresence>
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className="collab-dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                left: dot.x,
                top: dot.y,
                backgroundColor: dot.color,
                boxShadow: `0 0 10px ${dot.color}`
              }}
            />
          ))}
        </AnimatePresence>
        
        {/* Info técnica flotante */}
        <div className="tech-badge">
          <FaInfoCircle /> Powered by Yjs + PartyKit
        </div>
      </div>
    </div>
  );
};

export default CollaborationCanvas;