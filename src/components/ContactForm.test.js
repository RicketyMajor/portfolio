import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

test('renderiza los campos del formulario de contacto', () => {
  render(<ContactForm />);

  // 1. Verificar que existe el campo de Nombre
  // getByPlaceholderText busca por el atributo placeholder="..."
  const nameInput = screen.getByPlaceholderText(/Tu nombre/i);
  expect(nameInput).toBeInTheDocument();
  // Verificamos que sea obligatorio
  expect(nameInput).toBeRequired();

  // 2. Verificar campo de Email
  const emailInput = screen.getByPlaceholderText(/tu@email.com/i);
  expect(emailInput).toBeInTheDocument();

  // 3. Verificar campo de Mensaje
  const messageInput = screen.getByPlaceholderText(/Cuéntame sobre tu proyecto/i);
  expect(messageInput).toBeInTheDocument();

  // 4. Verificar el botón de enviar
  const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});