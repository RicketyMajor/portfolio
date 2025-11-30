import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll'; // Usamos react-scroll que ya instalamos
import '../App.css'; // Asegúrate de importar estilos si usas clases CSS globales

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botón solo si bajamos más de 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 100, // Tiempo en milisegundos (100ms es muy rápido, casi instantáneo)
      smooth: true,  // Mantiene la suavidad pero a alta velocidad
      spy: true
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop} className="scroll-btn">
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;