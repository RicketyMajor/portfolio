import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Agregamos useLocation
import { FaArrowUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import '../App.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  // EFECTO NUEVO: Cuando cambie la ruta, forzamos la vista al tope inmediatamente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // EFECTO ORIGINAL: Mostrar el botón al hacer scroll
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
      duration: 600,
      smooth: true,
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