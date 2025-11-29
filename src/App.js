import React from 'react';
import './App.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Importamos los íconos

function App() {
  return (
    <div className="App">
      
      {/* SECCIÓN INICIO (HERO) */}
      <section className="hero-section">
        <div className="hero-content">
          
          {/* 1. Saludo y Nombre */}
          <h2 className="greeting">Hola, soy</h2>
          <h1 className="name">ALONSO [TU APELLIDO]</h1>
          
          {/* 2. Subtítulo Profesional */}
          <h3 className="role">
            Ingeniero Civil en Informática y Telecomunicaciones
          </h3>
          <p className="description">
            Desarrollador de Software enfocado en crear soluciones web modernas y eficientes.
          </p>

          {/* 3. Llamadas a la Acción (Botones) */}
          <div className="hero-buttons">
            <button className="btn btn-primary">Ver mis Proyectos</button>
            <button className="btn btn-secondary">Descargar CV</button>
          </div>

          {/* 4. Redes Sociales */}
          <div className="social-icons">
            <a href="https://github.com/RicketyMajor" target="_blank" rel="noopener noreferrer">
              <FaGithub className="icon" />
            </a>
            <a href="https://linkedin.com/in/TU-USUARIO" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}

export default App;