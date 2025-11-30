import React from 'react';
import ScrollReveal from '../ScrollReveal';
import { FaEnvelope, FaWhatsapp, FaGraduationCap } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <ScrollReveal>
        <div className="contact-container">
          <h2 className="section-title">¿Interesado en colaborar?</h2>
          <p className="contact-text">
            Estoy abierto a nuevas oportunidades, proyectos de investigación o simplemente a charlar sobre tecnología. ¡Contáctame!
          </p>
          
          <div className="contact-methods">
            <a href="mailto:alonsoveralarach@gmail.com" className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email Principal</h3>
              <p>alonsoveralarach@gmail.com</p>
            </a>

            <a href="mailto:alonso.vera@mail.udp.cl" className="contact-card">
              <FaGraduationCap className="contact-icon" />
              <h3>Email Institucional</h3>
              <p>alonso.vera@mail.udp.cl</p>
            </a>

            <a href="https://wa.me/56952012548" target="_blank" rel="noopener noreferrer" className="contact-card">
              <FaWhatsapp className="contact-icon" />
              <h3>Teléfono / WhatsApp</h3>
              <p>+56 9 5201 2548</p>
            </a>
          </div>

          <div className="footer-bottom">
            <p>Ubicación: Gran Santiago, Chile</p>
            <p className="copyright">© 2025 Alonso Vera Larach. Construido con React.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ContactSection;