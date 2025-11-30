import React, { useState } from 'react'; // <--- Importar useState
import ScrollReveal from '../ScrollReveal';
import profileImage from '../../perfil.png';
import SkeletonLoader from '../SkeletonLoader'; // <--- Importar Skeleton

const AboutSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="about" className="about-section">
      <ScrollReveal>
        <div className="about-container">
          
          <div className="about-image-wrapper">
            {/* Skeleton mientras carga */}
            {!imageLoaded && (
               <SkeletonLoader style={{ 
                 position: 'absolute', 
                 top: 0, 
                 left: 0, 
                 width: '100%', 
                 height: '100%', 
                 zIndex: 3 // Encima del borde decorativo
               }} />
            )}

            <img 
              src={profileImage} 
              alt="Alonso Vera Larach" 
              className="about-image"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }} // Transición de opacidad
            />
            
            <div className="image-border"></div>
          </div>

          <div className="about-text">
             {/* ... (resto del código igual) ... */}
            <h2 className="section-title">Sobre Mí</h2>
            <p>Soy <strong>Alonso Vera Larach</strong>, estudiante de 4to año de Ingeniería Civil en Informática y Telecomunicaciones en la UDP. Me defino como una persona <strong>creativa y constante</strong>.</p>
            <p>Mi enfoque actual combina la robustez de la <strong>Computación Distribuida</strong> con la innovación de la <strong>Inteligencia Artificial y el Machine Learning</strong>.</p>
            <p>He complementado mi formación académica con una fuerte vocación docente, desempeñándome como ayudante en múltiples cátedras.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;