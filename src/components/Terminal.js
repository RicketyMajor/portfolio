import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../App.css'; // Usaremos estilos globales o específicos

const Terminal = () => {
  return (
    <div className="terminal-window">
      {/* Barra de título de la ventana */}
      <div className="terminal-header">
        <div className="terminal-button red"></div>
        <div className="terminal-button yellow"></div>
        <div className="terminal-button green"></div>
        <div className="terminal-title">alonso@udp-server: ~</div>
      </div>
      
      {/* Cuerpo de la terminal */}
      <div className="terminal-body">
        <TypeAnimation
          sequence={[
            500, // Espera inicial
            '> systemctl start alonso-profile.service\n',
            1000,
            '> Loading modules...\n',
            500,
            '> [OK] Loaded: Distributed_Systems\n> [OK] Loaded: Artificial_Intelligence\n> [OK] Loaded: Backend_Architecture\n',
            800,
            '> Fetching status...\n',
            1000,
            '> Current_Role: Student @ UDP\n> Focus: Cloud Computing & C++\n> Status: Ready to collaborate.\n\n> _', // Cursor final
            5000, // Pausa larga antes de reiniciar (o puedes dejarlo infinito)
          ]}
          wrapper="span"
          speed={70} // Velocidad de escritura tipo "hacker"
          style={{ 
            fontFamily: 'var(--font-code)', 
            fontSize: '0.9rem', 
            whiteSpace: 'pre-line', // Permite saltos de línea \n
            display: 'block' 
          }}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Terminal;