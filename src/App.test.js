import { render, screen } from '@testing-library/react';
import App from './App';

// --- MOCKS ---
jest.mock('./components/ParticlesBackground', () => () => <div data-testid="particles">Particles</div>);
jest.mock('react-type-animation', () => ({
  TypeAnimation: () => <div>Typing Animation</div>
}));

test('renderiza la aplicación sin crashear y muestra el nombre', () => {
  render(<App />);
  
  // 1. Verificamos el Nombre (Usando getByRole para ser precisos)
  const nameElement = screen.getByRole('heading', { 
    name: /ALONSO VERA LARACH/i, 
    level: 1 
  });
  expect(nameElement).toBeInTheDocument();

  // 2. Verificamos que el Navbar existe
  // SOLUCIÓN: Usamos ^ y $ para decir "Solo quiero el texto que sea exactamente 'Proyectos'"
  // Esto ignora "Ver mis Proyectos" y "Proyectos Destacados".
  const navLink = screen.getByText(/^Proyectos$/i); 
  
  expect(navLink).toBeInTheDocument();
});