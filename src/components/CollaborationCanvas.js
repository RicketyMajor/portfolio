import React, { useEffect, useState, useRef } from 'react';
import YPartyKitProvider from "y-partykit/provider";
import * as Y from "yjs";
import randomColor from "randomcolor";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import '../styles/collaboration.css'; // Crearemos este CSS luego

const CollaborationCanvas = () => {
  const [dots, setDots] = useState([]); // Estado local para renderizar
  const yDotsRef = useRef(null); // Referencia al array de Yjs
  const [myColor] = useState(randomColor({ luminosity: 'bright' }));
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Conectar a la misma sala 'portfolio-room'
    const yDoc = new Y.Doc();
    const provider = new YPartyKitProvider(
      "127.0.0.1:1999", 
      "portfolio-room", 
      yDoc
    );

    // 2. Obtener el Array compartido 'guestbook'
    const yDots = yDoc.getArray('guestbook');
    yDotsRef.current = yDots;

    // 3. Sincronizar estado inicial
    setDots(yDots.toArray());
    setIsConnected(true);

    // 4. Escuchar cambios (cuando otros agregan puntos)
    yDots.observe(() => {
      setDots(yDots.toArray());
    });

    return () => {
      provider.disconnect();
      yDoc.destroy();
    };
  }, []);

  // Función para agregar un punto
  const handleCanvasClick = (e) => {
    if (!yDotsRef.current) return;

    // Obtenemos coordenadas relativas al contenedor
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newDot = {
      id: Date.now() + Math.random(), // ID único
      x,
      y,
      color: myColor,
      user: 'Guest',
      timestamp: Date.now()
    };

    // MAGIA CRDT: Solo hacemos push. Yjs se encarga de distribuirlo.
    yDotsRef.current.push([newDot]);
    
    // Opcional: Limitar a los últimos 50 puntos para no saturar
    if (yDotsRef.current.length > 50) {
      yDotsRef.current.delete(0, 1); // Borra el más antiguo
    }
  };

  // Función para limpiar (Demo purpose)
  const handleClear = (e) => {
    e.stopPropagation(); // Evitar poner un punto al hacer click en borrar
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
        
        {/* Placeholder text */}
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