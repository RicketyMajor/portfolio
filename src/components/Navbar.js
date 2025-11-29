import React, { useState } from 'react';
import '../App.css'; 
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="#">AV.</a>
        </div>

        {/* Ícono Móvil */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menú Principal */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="#projects" className="nav-links" onClick={toggleMenu}>Proyectos</a>
          </li>
          <li className="nav-item">
            <a href="#skills" className="nav-links" onClick={toggleMenu}>Skills</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-links" onClick={toggleMenu}>Sobre Mí</a>
          </li>
          <li className="nav-item">
            <a href="#trajectory" className="nav-links" onClick={toggleMenu}>Trayectoria</a>
          </li>
          {/* Ahora Contacto es un link normal más en la lista */}
          <li className="nav-item">
            <a href="#contact" className="nav-links" onClick={toggleMenu}>Contacto</a>
          </li>
        </ul>
        
        {/* Eliminamos el div "nav-btn" que contenía el botón duplicado */}

      </div>
    </nav>
  );
};

export default Navbar;