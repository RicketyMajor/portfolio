import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

test('renderiza los campos del formulario de contacto', () => {
  render(<ContactForm />);

  const nameInput = screen.getByPlaceholderText(/Tu nombre/i);
  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toBeRequired();

  const emailInput = screen.getByPlaceholderText(/tu@email.com/i);
  expect(emailInput).toBeInTheDocument();

  const messageInput = screen.getByPlaceholderText(/Cuéntame sobre tu proyecto/i);
  expect(messageInput).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});