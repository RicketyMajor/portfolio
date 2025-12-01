import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll'; // Importamos el Link inteligente
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // Para animaciones suaves
import ThemeToggle from './ThemeToggle';
import '../App.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lógica para cambiar el fondo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Configuración de los enlaces para no repetir código
  const navLinks = [
    { name: "Proyectos", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Sobre Mí", to: "about" },
    { name: "Trayectoria", to: "trajectory" },
    { name: "Contacto", to: "contact" },
  ];

  return (
    // La clase cambia dinámicamente si 'scrolled' es true
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* Logo que te lleva arriba del todo */}
        <div className="navbar-logo">
          <Link to="hero-section" smooth={true} duration={500} offset={-80} style={{cursor: 'pointer'}}>
            AV.
          </Link>
        </div>

        {/* Icono de Menú Móvil */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="theme-toggle-wrapper" style={{ marginLeft: '20px', zIndex: 1001 }}>
       <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Menú Desktop */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link
                activeClass="active" // Clase que pone react-scroll automáticamente
                to={link.to}
                spy={true} // Activa el "ScrollSpy"
                smooth={true}
                offset={-80} // Compensa la altura de la navbar (80px)
                duration={500}
                className="nav-links"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Menú Móvil Animado con Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }} // Empieza fuera a la derecha
              animate={{ x: 0 }}      // Entra
              exit={{ x: '100%' }}    // Sale a la derecha
              transition={{ type: "spring", stiffness: 80, damping: 15 }} // Efecto físico
              className="nav-menu-mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  activeClass="active"
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="nav-links-mobile-item"
                  onClick={toggleMenu} // Cierra el menú al hacer click
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;