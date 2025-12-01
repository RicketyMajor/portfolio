import React from 'react';
import './App.css';
import { useTheme } from './hooks/useTheme';

// Componentes Estructurales
import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground'; // <--- Importar
import ScrollToTop from './components/ScrollToTop';

// Componentes de Sección (Modularizados)
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import TrajectorySection from './components/sections/TrajectorySection';
import ContactSection from './components/sections/ContactSection';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="App">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <ParticlesBackground theme={theme} />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <TrajectorySection />
      <ContactSection />
      <ScrollToTop />
    </div>
  );
}

export default App;