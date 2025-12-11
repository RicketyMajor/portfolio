import React from 'react';
import '../App.css'; 

const SkeletonLoader = ({ style }) => {
  return (
    <div className="skeleton-loader" style={style}></div>
  );
};

export default SkeletonLoader;