import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useReducedMotion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Terminal from '../Terminal';
import '../../styles/dashboard.css';

// Kept out of the component so the reduced-motion branch can render ROLES[0] without repeating it.
const ROLES = [
  'Estudiante de Ingeniería Civil Informática',
  1000,
  'Futuro Especialista en Sistemas Distribuidos',
  1000,
  'Desarrollador Backend & Cloud',
  1000,
  'Entusiasta de la Inteligencia Artificial',
  1000
];

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="hero-section" className="hero-section">
      
      {/* --- GRID CONTAINER --- */}
      <div className="hero-grid">
        
        {/* --- TEXT COLUMN --- */}
        <div className="hero-text-content">
          <h2 className="greeting">Hola, soy</h2>
          <h1 className="name">ALONSO VERA LARACH</h1>
          <div className="role">
            {prefersReducedMotion ? (
              <span style={{ fontSize: '1em', display: 'inline-block' }}>{ROLES[0]}</span>
            ) : (
              <TypeAnimation
                sequence={ROLES}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em', display: 'inline-block' }}
                repeat={Infinity}
              />
            )}
          </div>
          <p className="description">
            Explorando la arquitectura de <strong>Sistemas Distribuidos</strong> y soluciones de <strong>Inteligencia Artificial</strong>.
          </p>

          <div className="hero-buttons">
            <Link to="projects" smooth={true} offset={-80} duration={500} className="btn btn-primary">
                Ver mis Proyectos
            </Link>
            <a href="/Profile.pdf" download className="btn btn-secondary">Descargar CV</a>
          </div>

          <div className="social-icons">
            <a href="https://github.com/RicketyMajor" target="_blank" rel="noopener noreferrer"><FaGithub className="icon" /></a>
            <a href="https://www.linkedin.com/in/alonso-vera-larach-1103542b7" target="_blank" rel="noopener noreferrer"><FaLinkedin className="icon" /></a>
          </div>
        </div>

        {/* --- VISUAL COLUMN --- */}
        <div className="hero-visual-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
            <Terminal />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;