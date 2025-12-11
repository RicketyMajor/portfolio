import '@testing-library/jest-dom';

// --- WINDOW.MATCHMEDIA MOCK ---
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// --- INTERSECTION OBSERVER MOCK ---
const IntersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
};
window.IntersectionObserver = IntersectionObserverMock;

// --- RESIZE OBSERVER MOCK ---
window.ResizeObserver = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
};

// --- SCROLL TO MOCK ---
window.scrollTo = jest.fn();