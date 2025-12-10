import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll'; // Importamos el Link inteligente
import { FaBars, FaTimes, FaTerminal} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // Para animaciones suaves
import ThemeToggle from './ThemeToggle';
import '../App.css';

const Navbar = ({ theme, toggleTheme, openPalette, closeProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Proyectos", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Sobre Mí", to: "about" },
    { name: "Trayectoria", to: "trajectory" },
    { name: "Contacto", to: "contact" },
  ];

  const handleLinkClick = () => {
    closeProject(); // <--- ESTO CIERRA EL MODAL SI ESTÁ ABIERTO
    setIsOpen(false); // Cierra el menú móvil si está abierto
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* LOGO AV. AHORA ABRE LA PALETA */}
        <div 
          className="navbar-logo" 
          onClick={openPalette} 
        >
          <span className="logo-prompt">~/AV</span>
          <span className="logo-cursor">_</span> {/* Cursor parpadeante */}
          
          <span className="cmd-k-hint" title="Presiona Cmd+K">
             <FaTerminal size={10} /> Cmd+K
          </span>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link
                activeClass="active"
                to={link.to}
                spy={true}
                smooth={true}
                offset={-60}
                duration={400}
                className="nav-links"
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* MENÚ MÓVIL */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="nav-menu-mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  duration={400}
                  className="nav-links-mobile-item"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              ))}

              {/* En móvil SI dejamos el Toggle porque no hay teclado para Cmd+K */}
              <div style={{ marginTop: '20px' }}>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;