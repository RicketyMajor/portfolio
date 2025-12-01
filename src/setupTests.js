// Importamos las extensiones de jest-dom
import '@testing-library/jest-dom';

// --- 1. MOCK ROBUSTO PARA WINDOW.MATCHMEDIA ---
// Esto soluciona los errores en App.test.js (useTheme) y ProjectCard.test.js (Framer Motion)
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// --- 2. MOCK PARA INTERSECTION OBSERVER ---
// Necesario para ScrollReveal y componentes que detectan cuando entran en pantalla
const IntersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
};
window.IntersectionObserver = IntersectionObserverMock;

// --- 3. MOCK PARA RESIZE OBSERVER ---
// Framer Motion a veces lo usa para animaciones de layout (layoutId)
window.ResizeObserver = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
};

// --- 4. MOCK PARA SCROLLTO ---
// Necesario para el botón de "Volver Arriba"
window.scrollTo = jest.fn();