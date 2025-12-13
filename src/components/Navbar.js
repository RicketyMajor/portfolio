import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaTerminal} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
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
    { name: "Laboratorio", to: "lab" },
    { name: "Arquitectura", to: "architecture" },
    { name: "Contacto", to: "contact" },
  ];

  const handleLinkClick = () => {
    closeProject();
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* --- LOGO SECTION --- */}
        <div 
          className="navbar-logo" 
          onClick={openPalette} 
        >
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