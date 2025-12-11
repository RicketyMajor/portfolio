import { render, screen } from '@testing-library/react';
import App from './App';

{/* --- MOCKS --- */}
jest.mock('./components/ParticlesBackground', () => () => <div data-testid="particles">Particles</div>);
jest.mock('react-type-animation', () => ({
  TypeAnimation: () => <div>Typing Animation</div>
}));

test('renderiza la aplicación sin crashear y muestra el nombre', () => {
  render(<App />);
  
  const nameElement = screen.getByRole('heading', { 
    name: /ALONSO VERA LARACH/i, 
    level: 1 
  });
  expect(nameElement).toBeInTheDocument();

  const navLink = screen.getByText(/^Proyectos$/i); 
  
  expect(navLink).toBeInTheDocument();
});