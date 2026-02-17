import React, { useState, useEffect } from 'react';
import { Link, scroller } from 'react-scroll'; // Agregamos scroller
import { useLocation, useNavigate } from 'react-router-dom'; // Rutas
import { FaBars, FaTimes, FaTerminal} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import '../App.css';

const Navbar = ({ theme, toggleTheme, openPalette, closeProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Hooks de enrutamiento
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

  // Mapeo inteligente: ahora cada link sabe cuál es su ruta madre
  const navLinks = [
    { name: "Proyectos", to: "projects", path: "/" },
    { name: "Skills", to: "skills", path: "/" },
    { name: "Sobre Mí", to: "about", path: "/" },
    { name: "Trayectoria", to: "trajectory", path: "/" },
    { name: "Laboratorio", to: "lab", path: "/lab" },
    { name: "Arquitectura", to: "architecture", path: "/lab" },
    { name: "Contacto", to: "contact", path: "/" },
  ];

  const handleLinkClick = () => {
    closeProject();
    setIsOpen(false);
  };

  // Función híbrida para navegación cruzada entre páginas
  const handleCrossNav = (path, to) => {
    handleLinkClick();
    navigate(path);
    // Esperamos 100ms para que el DOM de la nueva ruta se renderice antes de hacer scroll
    setTimeout(() => {
      scroller.scrollTo(to, { smooth: true, offset: -80, duration: 500 });
    }, 100);
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
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              {location.pathname === link.path ? (
                /* Si estamos en la misma ruta, usamos el scroll normal con "spy" */
                <Link
                  activeClass="active"
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={400}
                  className="nav-links"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              ) : (
                /* Si vamos a otra ruta, usamos la función híbrida (etiqueta a con cursor) */
                <a 
                  className="nav-links" 
                  onClick={() => handleCrossNav(link.path, link.to)}
                  style={{ cursor: 'pointer' }}
                >
                  {link.name}
                </a>
              )}
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
              {navLinks.map((link) => (
                location.pathname === link.path ? (
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
                ) : (
                  <a 
                    key={link.name}
                    className="nav-links-mobile-item" 
                    onClick={() => handleCrossNav(link.path, link.to)}
                    style={{ cursor: 'pointer' }}
                  >
                    {link.name}
                  </a>
                )
              ))}

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