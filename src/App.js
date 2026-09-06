import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import { useTheme } from './hooks/useTheme';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import TrajectorySection from './components/sections/TrajectorySection';
import ContactSection from './components/sections/ContactSection';
import CommandPalette from './components/CommandPalette';
import './styles/commandPalette.css';
import Footer from './components/Footer';
import SkeletonLoader from './components/SkeletonLoader'; // Importamos tu loader

// --- LAZY LOADING PARA EL LABORATORIO (Fase 3) ---
// Estas secciones solo se descargarán cuando el usuario visite la ruta /lab
const DistributedLabSection = lazy(() => import('./components/sections/DistributedLabSection'));
const ArchitectureSection = lazy(() => import('./components/sections/ArchitectureSection'));
// Yjs and the PartyKit provider are the heaviest dependency in the tree. The cursors stay global,
// but they load and connect only once the browser is idle, so they never compete with first paint.
const MultiplayerCursors = lazy(() => import('./components/MultiplayerCursors'));
// tsparticles is the second heaviest dependency and paints decoration only. The body already
// carries the same background colour, so nothing is missing while it loads.
const ParticlesBackground = lazy(() => import('./components/ParticlesBackground'));

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
  const [isIdle, setIsIdle] = useState(false);
  const closeProjectModal = () => setSelectedProjectId(null);

  useEffect(() => {
    // requestIdleCallback is still missing on older Safari; fall back to a plain timeout there,
    // otherwise these layers would never mount on those browsers.
    if (typeof window.requestIdleCallback !== 'function') {
      const timer = setTimeout(() => setIsIdle(true), 2000);
      return () => clearTimeout(timer);
    }
    const handle = window.requestIdleCallback(() => setIsIdle(true), { timeout: 3000 });
    return () => window.cancelIdleCallback(handle);
  }, []);
  
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
      {/* Decoration and multiplayer both wait for the browser to go idle, so neither competes
          with first paint */}
      <Suspense fallback={null}>
        {isIdle && (
          <>
            <ParticlesBackground theme={theme} />
            <MultiplayerCursors />
          </>
        )}
      </Suspense>

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