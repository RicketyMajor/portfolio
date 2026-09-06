import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useReducedMotion } from "framer-motion";
import { loadSlim } from "@tsparticles/slim"; 

const ParticlesBackground = ({ theme }) => {
  const [init, setInit] = useState(false);
  // tsparticles draws to a canvas, so the CSS reduced-motion block cannot reach it.
  const prefersReducedMotion = useReducedMotion();
  const bgColor = theme === 'dark' ? "#0a192f" : "#f0f4f8";
  const particleColor = theme === 'dark' ? "#64ffda" : "#486581";
  const linksColor = theme === 'dark' ? "#8892b0" : "#bcccdc";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: bgColor,
            },
          },
          fpsLimit: 120,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab",
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
              value: particleColor,
            },
            links: {
              color: linksColor,
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              direction: "none",
              // Particles stay drawn, they just stop drifting. Hover and click stay on: those are
              // user-initiated, not the ambient motion the setting is about.
              enable: !prefersReducedMotion,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
    );
  }

  return null;
};

export default ParticlesBackground;