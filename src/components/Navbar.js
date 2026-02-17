import React, { useState, useEffect } from 'react';
import { Link, scroller } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaTerminal } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import '../App.css';

const Navbar = ({ theme, toggleTheme, openPalette, closeProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // --- REFACTORIZACIÓN LÓGICA: SEPARACIÓN DE RUTAS ---
  
  // Grupo 1: Carta de Presentación (Ruta /)
  const mainLinks = [
    { name: "Proyectos", to: "projects", path: "/" },
    { name: "Skills", to: "skills", path: "/" },
    { name: "Sobre Mí", to: "about", path: "/" },
    { name: "Trayectoria", to: "trajectory", path: "/" },
    { name: "Contacto", to: "contact", path: "/" },
  ];

  // Grupo 2: Entorno Interactivo (Ruta /lab)
  const labLinks = [
    { name: "Laboratorio", to: "lab", path: "/lab" },
    { name: "Arquitectura", to: "architecture", path: "/lab" },
  ];

  const handleLinkClick = () => {
    closeProject();
    setIsOpen(false);
  };

  const handleCrossNav = (path, to) => {
    handleLinkClick();
    navigate(path);
    setTimeout(() => {
      scroller.scrollTo(to, { smooth: true, offset: -80, duration: 500 });
    }, 100);
  };

  // Función auxiliar para renderizar los enlaces (mantiene el código limpio)
  const renderLinkItem = (link, isMobile = false) => {
    const className = isMobile ? "nav-links-mobile-item" : "nav-links";
    
    if (location.pathname === link.path) {
      return (
        <Link
          key={link.name}
          activeClass="active"
          to={link.to}
          spy={true}
          smooth={true}
          offset={isMobile ? -80 : -50}
          duration={400}
          className={className}
          onClick={handleLinkClick}
        >
          {link.name}
        </Link>
      );
    } else {
      return (
        <a 
          key={link.name}
          className={className} 
          onClick={() => handleCrossNav(link.path, link.to)}
          style={{ cursor: 'pointer' }}
        >
          {link.name}
        </a>
      );
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* --- LOGO SECTION --- */}
        <div className="navbar-logo" onClick={openPalette}>
          <span className="logo-prompt">~/AVL</span>
          <span className="logo-cursor">_</span>
          <span className="cmd-k-hint" title="Presiona Cmd+K">
             <FaTerminal size={10} /> Cmd+K
          </span>
        </div>

        {/* --- MOBILE MENU TOGGLE --- */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <ul className="nav-menu">
          {/* Renderizamos Grupo 1 */}
          {mainLinks.map((link) => (
            <li key={link.name} className="nav-item">
              {renderLinkItem(link)}
            </li>
          ))}

          {/* Separador Visual Desktop */}
          <li className="nav-separator"></li>

          {/* Renderizamos Grupo 2 */}
          {labLinks.map((link) => (
            <li key={link.name} className="nav-item">
              {renderLinkItem(link)}
            </li>
          ))}
        </ul>

        {/* --- MOBILE NAVIGATION --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="nav-menu-mobile"
            >
              {/* Renderizamos Grupo 1 Mobile */}
              {mainLinks.map((link) => renderLinkItem(link, true))}

              {/* Separador Visual Mobile con texto descriptivo */}
              <div className="nav-separator-mobile">ZONA INTERACTIVA</div>

              {/* Renderizamos Grupo 2 Mobile */}
              {labLinks.map((link) => renderLinkItem(link, true))}

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