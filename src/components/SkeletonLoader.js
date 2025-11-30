import React from 'react';
import '../App.css'; // Para acceder a los estilos de animación

const SkeletonLoader = ({ style }) => {
  return (
    <div className="skeleton-loader" style={style}></div>
  );
};

export default SkeletonLoader;