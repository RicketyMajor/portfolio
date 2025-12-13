import React, { useState } from 'react';
import './App.css';
import { useTheme } from './hooks/useTheme';

import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollToTop from './components/ScrollToTop';
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import TrajectorySection from './components/sections/TrajectorySection';
import ContactSection from './components/sections/ContactSection';
import CommandPalette from './components/CommandPalette';
import './styles/commandPalette.css';
import MultiplayerCursors from './components/MultiplayerCursors';
import DistributedLabSection from './components/sections/DistributedLabSection';
import Footer from './components/Footer';

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
      <MultiplayerCursors />
      <HeroSection />
      <ProjectsSection 
        selectedId={selectedProjectId} 
        setSelectedId={setSelectedProjectId}
      />
      <SkillsSection />
      <AboutSection />
      <TrajectorySection />
      <DistributedLabSection />
      <ContactSection />
      <ScrollToTop />
      <Footer />
      

    </div>
  );
}

export default App;