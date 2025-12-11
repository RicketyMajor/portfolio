import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

const mockProject = {
  id: 1,
  title: "Proyecto de Prueba",
  description: "Esta es una descripción de test",
  image: "test.jpg",
  technologies: ["React", "Jest"],
  demoLink: "http://google.com",
  repoLink: "http://github.com"
};

jest.mock('react-parallax-tilt', () => ({ children }) => <div>{children}</div>);
jest.mock('./SkeletonLoader', () => () => <div>Skeleton</div>);

test('renderiza la información del proyecto correctamente', () => {
  render(<ProjectCard project={mockProject} />);

  expect(screen.getByText("Proyecto de Prueba")).toBeInTheDocument();
  expect(screen.getByText("Esta es una descripción de test")).toBeInTheDocument();
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("Jest")).toBeInTheDocument();
});