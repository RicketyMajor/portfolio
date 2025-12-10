import React, { useState } from 'react'; // <--- Importar useStateimport './App.css';
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
import CommandPalette from './components/CommandPalette'; // <--- Importar Componente
import './styles/commandPalette.css'; // <--- AGREGAR ESTO
import MultiplayerCursors from './components/MultiplayerCursors';
import CollaborationSection from './components/sections/CollaborationSection'; // Importar

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const closeProjectModal = () => setSelectedProjectId(null);
  return (
    <div className="App">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        openPalette={() => setIsPaletteOpen(true)} 
        closeProject={closeProjectModal}
      />
      <CommandPalette 
        isOpen={isPaletteOpen} 
        setIsOpen={setIsPaletteOpen} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        closeProject={closeProjectModal}
      />
      <ParticlesBackground theme={theme} />
      <MultiplayerCursors /> {/* Agregar el componente de cursores */}
      <HeroSection />
      <ProjectsSection 
        selectedId={selectedProjectId} 
        setSelectedId={setSelectedProjectId}
      />
      <SkillsSection />
      <AboutSection />
      <TrajectorySection />
      <CollaborationSection />
      <ContactSection />
      <ScrollToTop />
      

    </div>
  );
}

export default App;