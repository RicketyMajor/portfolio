import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaExclamationCircle } from 'react-icons/fa';

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          form.current.reset();
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
          setTimeout(() => setStatus(''), 5000);
      });
  };

  return (
    <div className="contact-form-wrapper">
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        
        <div className="form-group">
          <label htmlFor="user_name">Nombre</label>
          <input type="text" name="user_name" required placeholder="Tu nombre" />
        </div>

        <div className="form-group">
          <label htmlFor="user_email">Email</label>
          <input type="email" name="user_email" required placeholder="tu@email.com" />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea name="message" required rows="5" placeholder="Cuéntame sobre tu proyecto o idea..."></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando...' : (
            <>
               Enviar Mensaje <FaPaperPlane />
            </>
          )}
        </button>

        {/* --- FEEDBACK MESSAGES --- */}
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="form-feedback success"
          >
            <FaCheck /> ¡Mensaje enviado con éxito! Te responderé pronto.
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="form-feedback error"
          >
            <FaExclamationCircle /> Hubo un error. Por favor intenta más tarde o escríbeme directo.
          </motion.div>
        )}

      </form>
    </div>
  );
};

export default ContactForm;