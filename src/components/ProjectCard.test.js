import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

// Datos de prueba (Dummy Data)
const mockProject = {
  id: 1,
  title: "Proyecto de Prueba",
  description: "Esta es una descripción de test",
  image: "test.jpg",
  technologies: ["React", "Jest"],
  demoLink: "http://google.com",
  repoLink: "http://github.com"
};

// Mockeamos Tilt y Skeleton para aislar la tarjeta
jest.mock('react-parallax-tilt', () => ({ children }) => <div>{children}</div>);
jest.mock('./SkeletonLoader', () => () => <div>Skeleton</div>);

test('renderiza la información del proyecto correctamente', () => {
  // Renderizamos el componente pasándole las props falsas
  render(<ProjectCard project={mockProject} />);

  // 1. Verificar Título
  expect(screen.getByText("Proyecto de Prueba")).toBeInTheDocument();

  // 2. Verificar Descripción
  expect(screen.getByText("Esta es una descripción de test")).toBeInTheDocument();

  // 3. Verificar Tecnologías (Tags)
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("Jest")).toBeInTheDocument();
});