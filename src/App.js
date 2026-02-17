import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; 
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
import Footer from './components/Footer';
import SkeletonLoader from './components/SkeletonLoader'; // Importamos tu loader

// --- LAZY LOADING PARA EL LABORATORIO (Fase 3) ---
// Estas secciones solo se descargarán cuando el usuario visite la ruta /lab
const DistributedLabSection = lazy(() => import('./components/sections/DistributedLabSection'));
const ArchitectureSection = lazy(() => import('./components/sections/ArchitectureSection'));

// --- VISTAS LOCALES ---
const HomeView = ({ selectedProjectId, setSelectedProjectId }) => (
  <>
    <HeroSection />
    <ProjectsSection 
      selectedId={selectedProjectId} 
      setSelectedId={setSelectedProjectId}
    />
    <SkillsSection />
    <AboutSection />
    <TrajectorySection />
    <ContactSection />
  </>
);

// Pantalla de carga (Fallback) mientras se descarga el código del Lab
const LabLoadingScreen = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center'
  }}>
    <h2 style={{ fontFamily: 'var(--font-code)', color: 'var(--accent)', marginBottom: '20px' }}>
       Inicializando Entorno Distribuido...
    </h2>
    <div style={{ width: '100%', maxWidth: '800px', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Reutilizamos tu SkeletonLoader para mantener la coherencia visual */}
      <SkeletonLoader style={{ width: '100%', height: '100%' }} />
    </div>
  </div>
);

const LabView = () => (
  // Suspense "pausa" el renderizado y muestra el Fallback hasta que los Lazy components estén listos
  <Suspense fallback={<LabLoadingScreen />}>
    <DistributedLabSection />
    <ArchitectureSection />
  </Suspense>
);

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const closeProjectModal = () => setSelectedProjectId(null);
  
  return (
    <div className="App">
      {/* --- COMPONENTES GLOBALES PERSISTENTES --- */}
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
      
      {/* El multijugador sigue activo en toda la app sin interrupciones */}
      <MultiplayerCursors />

      {/* --- ENRUTAMIENTO DINÁMICO --- */}
      <Routes>
        <Route path="/" element={
          <HomeView 
            selectedProjectId={selectedProjectId} 
            setSelectedProjectId={setSelectedProjectId} 
          />
        } />
        <Route path="/lab" element={<LabView />} />
      </Routes>

      {/* --- FOOTER GLOBAL --- */}
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;