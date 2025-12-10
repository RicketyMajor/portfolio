import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll';
import { 
  FaSearch, FaProjectDiagram, FaUser, FaHistory, FaEnvelope, 
  FaSun, FaMoon, FaFileDownload, FaCopy, FaCheckCircle, FaArrowRight 
} from 'react-icons/fa';
import '../styles/commandPalette.css';

const CommandPalette = ({ isOpen, setIsOpen, theme, toggleTheme, closeProject }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0); // Para navegar con flechas
  const [toastMsg, setToastMsg] = useState(null); // Para notificaciones

  // Referencia para scroll automático en la lista
  const listRef = useRef(null);

  // Definición de Comandos
  const commands = [
    { 
      id: 'projects', 
      label: 'Ir a Proyectos', 
      icon: <FaProjectDiagram />, 
      action: () => scrollToSection('projects') 
    },
    { 
      id: 'skills', 
      label: 'Ir a Habilidades', 
      icon: <FaUser />, 
      action: () => scrollToSection('skills') 
    },
    { 
      id: 'trajectory', 
      label: 'Ir a Trayectoria', 
      icon: <FaHistory />, 
      action: () => scrollToSection('trajectory') 
    },
    { 
      id: 'contact', 
      label: 'Ir a Contacto', 
      icon: <FaEnvelope />, 
      action: () => scrollToSection('contact') 
    },
    { 
      id: 'theme', 
      label: theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro', 
      icon: theme === 'dark' ? <FaSun /> : <FaMoon />, 
      action: () => { toggleTheme(); showToast("Tema actualizado"); } // No cerramos, solo notificamos
    },
    { 
      id: 'cv', 
      label: 'Descargar Curriculum Vitae', 
      icon: <FaFileDownload />, 
      action: () => { 
        window.open('/Profile.pdf', '_blank'); 
        showToast("Descargando CV...");
        setTimeout(closeModal, 1500);
      } 
    },
    { 
      id: 'email', 
      label: 'Copiar Email al Portapapeles', 
      icon: <FaCopy />, 
      action: () => { 
        navigator.clipboard.writeText('alonsoveralarach@gmail.com'); 
        showToast("Email copiado al portapapeles");
        setTimeout(closeModal, 1500);
      } 
    },
  ];

  // Filtramos comandos
  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Reseteamos el índice cuando cambia la búsqueda
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // ... imports y variables de estado ...

  // NUEVO EFECTO: Auto-scroll al navegar con teclado
  useEffect(() => {
    // Verificamos que la lista exista y tenga elementos
    if (listRef.current && filteredCommands.length > 0) {
      // Obtenemos el elemento HTML correspondiente al índice seleccionado
      const selectedElement = listRef.current.children[selectedIndex];
      
      if (selectedElement) {
        // La magia: hace scroll solo si es necesario para mostrar el elemento
        selectedElement.scrollIntoView({
          block: 'nearest', // 'nearest' evita saltos bruscos, solo scrollea lo necesario
          behavior: 'smooth' // Movimiento suave
        });
      }
    }
  }, [selectedIndex, filteredCommands]); // Se ejecuta cada vez que cambia la selección

  // ... resto del componente ...

  // Manejo de Teclado (Flechas y Enter) dentro del Input
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

const scrollToSection = (section) => {
    // 1. Cerramos el proyecto si hay uno abierto
    closeProject(); 
    
    // 2. Navegamos
    scroller.scrollTo(section, {
      duration: 500,
      smooth: true,
      offset: -80,
    });
    closeModal();
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setToastMsg(null);
  }, [setIsOpen]);

  // Listener Global para abrir/cerrar (Cmd+K / Esc)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [setIsOpen, closeModal]); // <--- AHORA SÍ AGREGAMOS closeModal

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div 
            className="palette-modal"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="palette-search">
              <FaSearch className="palette-icon" />
              <input 
                autoFocus
                type="text" 
                placeholder="¿Qué necesitas?" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <span className="palette-shortcut">ESC</span>
            </div>

            {/* Lista */}
            <ul className="palette-list" ref={listRef}>
              {filteredCommands.map((cmd, index) => (
                <li 
                  key={cmd.id} 
                  className={`palette-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(index)} // Sincroniza mouse con teclado
                >
                  <div className="palette-item-left">
                    <span className={`palette-icon ${index === selectedIndex ? 'active' : ''}`}>
                      {cmd.icon}
                    </span>
                    {cmd.label}
                  </div>
                  {index === selectedIndex && (
                    <motion.span layoutId="enter-icon" className="palette-shortcut-enter">
                      <FaArrowRight size={10} /> Enter
                    </motion.span>
                  )}
                </li>
              ))}
              
              {filteredCommands.length === 0 && (
                <li className="palette-item" style={{justifyContent: 'center', opacity: 0.5}}>
                  No se encontraron comandos.
                </li>
              )}
            </ul>

            {/* TOAST NOTIFICATION (Feedback visual) */}
            <AnimatePresence>
              {toastMsg && (
                <motion.div 
                  className="palette-toast"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <FaCheckCircle /> {toastMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="palette-footer">
              <div style={{display:'flex', gap:'10px'}}>
                <span>↑↓ Navegar</span>
                <span>↵ Seleccionar</span>
              </div>
              <span>Alonso Vera Portfolio CLI v2.0</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;