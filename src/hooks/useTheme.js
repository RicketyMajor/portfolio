import { useState, useEffect } from 'react';

export const useTheme = () => {
  // 1. Verificar preferencia guardada o preferencia del sistema
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // Si no hay guardado, miramos la preferencia del sistema operativo
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPreference ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // 2. Efecto para aplicar el cambio al DOM
  useEffect(() => {
    // Agregamos el atributo al tag <html> (root)
    document.documentElement.setAttribute('data-theme', theme);
    // Guardamos en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. Función para alternar
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};