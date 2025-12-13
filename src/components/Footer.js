import React from 'react';
import { FaServer, FaGithub, FaLinkedin } from 'react-icons/fa'; // Cambiamos Cubo por Server/Rayo
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Alonso Vera. Engineered for the Web.</p>
        
        <div className="social-links">
           {/* Tus redes sociales */}
           <a href="https://github.com/RicketyMajor" target="_blank" rel="noreferrer"><FaGithub /></a>
        </div>

        {/* VERCEL EDGE BADGE */}
        <div className="ipfs-badge active">
          <FaServer />
          <span>
            Deployed on Vercel Edge <br/>
            <span style={{fontSize: '0.6rem', opacity: 0.7}}>Serverless & Global CDN</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;