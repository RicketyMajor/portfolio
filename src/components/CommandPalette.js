import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll'; // Para navegar
import { 
  FaSearch, FaProjectDiagram, FaUser, FaHistory, FaEnvelope, 
  FaSun, FaMoon, FaFileDownload, FaCopy 
} from 'react-icons/fa';
import '../styles/commandPalette.css';

const CommandPalette = ({ isOpen, setIsOpen, theme, toggleTheme }) => {
  const [query, setQuery] = useState("");

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
      action: () => { toggleTheme(); closeModal(); } 
    },
    { 
      id: 'cv', 
      label: 'Descargar Curriculum Vitae', 
      icon: <FaFileDownload />, 
      action: () => { window.open('/Profile.pdf', '_blank'); closeModal(); } 
    },
    { 
      id: 'email', 
      label: 'Copiar Email al Portapapeles', 
      icon: <FaCopy />, 
      action: () => { 
        navigator.clipboard.writeText('alonsoveralarach@gmail.com'); 
        alert("Email copiado!"); 
        closeModal(); 
      } 
    },
  ];

  // Filtramos comandos según lo que escribe el usuario
  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 500,
      smooth: true,
      offset: -80,
    });
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setQuery(""); // Reseteamos búsqueda
  };

  // Listener de Teclado (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Abrir con Cmd+K o Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Evita que el navegador enfoque la barra de url
        setIsOpen((prev) => !prev);
      }
      // Cerrar con Escape
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal} // Cerrar al click fuera
        >
          <motion.div 
            className="palette-modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Evitar cierre al click dentro
          >
            {/* Input */}
            <div className="palette-search">
              <FaSearch className="palette-icon" />
              <input 
                autoFocus
                type="text" 
                placeholder="Escribe un comando..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="palette-shortcut">ESC</span>
            </div>

            {/* Lista */}
            <ul className="palette-list">
              {filteredCommands.map((cmd) => (
                <li 
                  key={cmd.id} 
                  className="palette-item"
                  onClick={cmd.action}
                >
                  <div className="palette-item-left">
                    <span className="palette-icon">{cmd.icon}</span>
                    {cmd.label}
                  </div>
                  <span className="palette-shortcut">↵</span>
                </li>
              ))}
              
              {filteredCommands.length === 0 && (
                <li className="palette-item" style={{justifyContent: 'center', opacity: 0.5}}>
                  No se encontraron comandos.
                </li>
              )}
            </ul>

            {/* Footer */}
            <div className="palette-footer">
              <span>Usa las flechas para navegar (Pdt: Próxima mejora)</span>
              <span>Alonso Vera Portfolio CLI v1.0</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;