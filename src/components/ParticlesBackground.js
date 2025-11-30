import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // Inicialización del motor (Sintaxis v3)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    // Puedes usar esto para debuggear si es necesario
    console.log(container);
  };

  // Solo renderiza las partículas cuando el motor esté listo
  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0a192f", // Color de fondo base
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab", // Efecto de red al pasar el mouse
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            color: {
              value: "#64ffda", // Tu color Cian
            },
            links: {
              color: "#8892b0", // Enlaces grises
              distance: 150,
              enable: true,
              opacity: 0.4, // Aumenté un poco la opacidad para que se note
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5, // Un pelín más rápido para que notes que se mueven
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80, // Un poco más de densidad
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        // ESTILOS CRÍTICOS PARA QUE SE VEA
        style={{
          position: "fixed", // Fijo en la pantalla (no absoluto)
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Detrás del contenido
        }}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;