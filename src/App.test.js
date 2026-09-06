import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mocks
jest.mock('./components/ParticlesBackground', () => () => <div data-testid="particles">Particles</div>);
jest.mock('react-type-animation', () => ({
  TypeAnimation: () => <div>Typing Animation</div>
}));

test('renderiza la aplicación sin crashear y muestra el nombre', () => {
  // App reads useLocation through the Navbar, so it needs a Router the way index.js gives it one.
  render(<App />, { wrapper: MemoryRouter });
  
  const nameElement = screen.getByRole('heading', { 
    name: /ALONSO VERA LARACH/i, 
    level: 1 
  });
  expect(nameElement).toBeInTheDocument();

  const navLink = screen.getByText(/^Proyectos$/i); 
  
  expect(navLink).toBeInTheDocument();
});