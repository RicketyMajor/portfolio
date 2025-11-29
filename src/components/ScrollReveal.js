import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, width = "100%" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }} // Empieza invisible y 75px abajo
      whileInView={{ opacity: 1, y: 0 }} // Al verse, se vuelve visible y sube
      viewport={{ once: true }} // Solo se anima una vez (no cada vez que subes y bajas)
      transition={{ duration: 0.8, ease: "easeOut" }} // Duración y suavidad
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;