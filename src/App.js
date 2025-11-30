import React from 'react';
import './App.css';

// Componentes Estructurales
import Navbar from './components/Navbar';

// Componentes de Sección (Modularizados)
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import TrajectorySection from './components/sections/TrajectorySection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <TrajectorySection />
      <ContactSection />
    </div>
  );
}

export default App;