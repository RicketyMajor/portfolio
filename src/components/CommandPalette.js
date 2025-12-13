import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll';
import { 
  FaSearch, FaProjectDiagram, FaUser, FaHistory, FaEnvelope, 
  FaSun, FaMoon, FaFileDownload, FaCopy, FaCheckCircle, FaArrowRight, FaNetworkWired, FaFlask
} from 'react-icons/fa';
import '../styles/commandPalette.css';


const CommandPalette = ({ isOpen, setIsOpen, theme, toggleTheme, closeProject }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);

  const listRef = useRef(null);

  // --- COMMANDS DEFINITION ---
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
      id: 'lab', 
      label: 'Ir al Laboratorio Distribuido', 
      icon: <FaFlask />, 
      action: () => scrollToSection('lab') 
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
      action: () => { toggleTheme(); showToast("Tema actualizado"); }
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
    { 
      id: 'ping', 
      label: 'Ping (Latency Check)', 
      icon: <FaNetworkWired />, 
      action: () => { 
        const start = Date.now();
        fetch('/api/geo').then(() => {
          const latency = Date.now() - start;
          showToast(`Pong! 🏓 Latency: ${latency}ms`);
        });
      } 
    },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // --- AUTO-SCROLL ON KEYBOARD NAVIGATION ---
  useEffect(() => {
    if (listRef.current && filteredCommands.length > 0) {
      const selectedElement = listRef.current.children[selectedIndex];
      
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex, filteredCommands]);

  // --- KEYBOARD NAVIGATION (ARROWS, ENTER) ---
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
    closeProject(); 
    
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

  // --- GLOBAL KEYBOARD SHORTCUTS (CMD+K / ESC) ---
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
  }, [setIsOpen, closeModal]);

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
            {/* --- SEARCH INPUT --- */}
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

            {/* --- COMMANDS LIST --- */}
            <ul className="palette-list" ref={listRef}>
              {filteredCommands.map((cmd, index) => (
                <li 
                  key={cmd.id} 
                  className={`palette-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
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

            {/* --- TOAST NOTIFICATION --- */}
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

            {/* --- FOOTER --- */}
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