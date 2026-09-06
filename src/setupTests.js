import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// --- TEXTENCODER POLYFILL ---
// react-router 7 reaches for TextEncoder at import time. The jsdom environment Jest 27 ships with
// does not expose it, though Node has had it for years. Drop this once the project is off CRA.
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

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