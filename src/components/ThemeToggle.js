import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        color: 'var(--accent)',
        fontSize: '1.2rem'
      }}
      aria-label="Cambiar tema"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }} // Rotación suave al cambiar
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;