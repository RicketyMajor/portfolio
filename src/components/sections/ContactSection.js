import React from 'react';
import ScrollReveal from '../ScrollReveal';
import { FaEnvelope, FaWhatsapp, FaGraduationCap } from 'react-icons/fa';
import ContactForm from '../ContactForm'; // Importar formulario

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <ScrollReveal>
        <div className="contact-container">
          <h2 className="section-title">¿Interesado en colaborar?</h2>
          <p className="contact-text">
            Estoy abierto a nuevas oportunidades, proyectos de investigación o simplemente a charlar sobre tecnología. ¡Envíame un mensaje directo!
          </p>
          
          {/* NUEVO LAYOUT GRID */}
          <div className="contact-content-grid">
            
            {/* Columna Izquierda: Métodos Directos */}
            <div className="contact-methods-column">
              <h3 style={{color: 'var(--text-primary)', marginBottom: '20px', textAlign: 'left'}}>
                Información de Contacto
              </h3>
              
              <div className="contact-methods" style={{flexDirection: 'column', gap: '20px'}}>
                <a href="mailto:alonsoveralarach@gmail.com" className="contact-card" style={{width: '100%'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <FaEnvelope className="contact-icon" style={{marginBottom: 0, fontSize: '1.5rem'}} />
                    <div style={{textAlign: 'left'}}>
                      <h3 style={{margin: 0, fontSize: '1rem'}}>Email Principal</h3>
                      <p style={{margin: 0, fontSize: '0.9rem'}}>alonsoveralarach@gmail.com</p>
                    </div>
                  </div>
                </a>

                <a href="mailto:alonso.vera@mail.udp.cl" className="contact-card" style={{width: '100%'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                     <FaGraduationCap className="contact-icon" style={{marginBottom: 0, fontSize: '1.5rem'}} />
                     <div style={{textAlign: 'left'}}>
                        <h3 style={{margin: 0, fontSize: '1rem'}}>Email Institucional</h3>
                        <p style={{margin: 0, fontSize: '0.9rem'}}>alonso.vera@mail.udp.cl</p>
                     </div>
                  </div>
                </a>

                <a href="https://wa.me/56952012548" target="_blank" rel="noopener noreferrer" className="contact-card" style={{width: '100%'}}>
                   <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                      <FaWhatsapp className="contact-icon" style={{marginBottom: 0, fontSize: '1.5rem'}} />
                      <div style={{textAlign: 'left'}}>
                        <h3 style={{margin: 0, fontSize: '1rem'}}>WhatsApp</h3>
                        <p style={{margin: 0, fontSize: '0.9rem'}}>+56 9 5201 2548</p>
                      </div>
                   </div>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Formulario */}
            <div className="contact-form-column">
               <ContactForm />
            </div>

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