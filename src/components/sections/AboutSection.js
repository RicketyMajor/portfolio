import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../ScrollReveal';
import profileImage from '../../perfil.png';
import SkeletonLoader from '../SkeletonLoader';
import { aboutMeData } from '../../data/portfolioData'; 

const AboutSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <section id="about" className="about-section">
      <ScrollReveal>
        {/* CAMBIO 1: El título ahora está FUERA del container grid */}
        <h2 className="section-title">Sobre Mí</h2>

        <div className="about-container">
          
          {/* COLUMNA IMAGEN */}
          <div className="about-image-wrapper">
            {!imageLoaded && (
               <SkeletonLoader style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }} />
            )}
            <img 
              src={profileImage} 
              alt="Alonso Vera Larach" 
              className="about-image"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
            <div className="image-border"></div>
          </div>

          {/* COLUMNA DERECHA (Ahora solo tiene Tabs y Contenido) */}
          <div className="about-text">
            
            {/* Navegación de Pestañas */}
            <div className="about-tabs">
              {['bio', 'philosophy', 'interests'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'bio' && 'Biografía'}
                  {tab === 'philosophy' && 'Filosofía'}
                  {tab === 'interests' && 'Intereses'}
                  
                  {activeTab === tab && (
                    <motion.div layoutId="active-line" className="active-line" />
                  )}
                </button>
              ))}
            </div>

            {/* Contenido Dinámico */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content" // Esta clase controlará la altura mínima
              >
                {aboutMeData && aboutMeData[activeTab] ? (
                  <>
                    <h3>{aboutMeData[activeTab].title}</h3>
                    {aboutMeData[activeTab].content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </>
                ) : (
                  <p>Cargando información...</p>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;