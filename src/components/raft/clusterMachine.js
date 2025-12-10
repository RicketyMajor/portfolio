import { createMachine, assign } from 'xstate';

// Configuración de tiempos (en Ticks)
const FOLLOWER_TIMEOUT_MIN = 150;
const FOLLOWER_TIMEOUT_MAX = 300;
const HEARTBEAT_INTERVAL = 50;

// Helper para generar tiempo aleatorio (evita elecciones divididas)
const getRandomTimeout = () => 
  Math.floor(Math.random() * (FOLLOWER_TIMEOUT_MAX - FOLLOWER_TIMEOUT_MIN + 1)) + FOLLOWER_TIMEOUT_MIN;

export const clusterMachine = createMachine({
  id: 'raftCluster',
  initial: 'running',
  context: {
    nodes: [], // Aquí vivirán nuestros 5 nodos
    packets: [], // Mensajes viajando (Fase 3.3)
  },
  states: {
    running: {
      on: {
        // EVENTO PRINCIPAL: El reloj del sistema (se ejecuta muchas veces por segundo)
        TICK: {
          actions: ['updateTimeouts', 'checkStateTransitions']
        },
        // INTERACCIÓN DEL USUARIO
        KILL_NODE: {
          actions: 'killNode'
        },
        REVIVE_NODE: { // Opcional por si quieres revivirlos luego
          actions: 'reviveNode'
        },
        // INICIALIZACIÓN
        INIT_NODES: {
          actions: 'initializeNodes'
        }
      }
    }
  }
}, {
  actions: {
    initializeNodes: assign({
      nodes: () => {
        // Creamos 5 nodos iniciales como FOLLOWERS
        return [1, 2, 3, 4, 5].map(id => ({
          id,
          state: 'follower', // follower | candidate | leader | dead
          term: 1,
          timer: getRandomTimeout(), // Cuenta regresiva personal
          votedFor: null,
          votesReceived: 0
        }));
      }
    }),

    killNode: assign({
      nodes: ({ context, event }) => {
        return context.nodes.map(node => 
          node.id === event.id 
            ? { ...node, state: 'dead', timer: 0 } 
            : node
        );
      }
    }),

    updateTimeouts: assign({
      nodes: ( {context} ) => {
        return context.nodes.map(node => {
          if (node.state === 'dead') return node;
          if (node.state === 'leader') {
             // El líder usa el timer para saber cuándo mandar el próximo heartbeat
             const newTimer = node.timer - 1;
             return newTimer <= 0 
               ? { ...node, timer: HEARTBEAT_INTERVAL } // Reset timer (aquí enviaría msg en Fase 3.3)
               : { ...node, timer: newTimer };
          }
          // Followers y Candidates disminuyen su cuenta regresiva de paciencia
          return { ...node, timer: node.timer - 1 };
        });
      }
    }),

    checkStateTransitions: assign({
      nodes: ({ context }) => {
        return context.nodes.map(node => {
          if (node.state === 'dead') return node;

          // REGLA 1: Si un Follower pierde la paciencia (timeout <= 0) -> CANDIDATE
          if (node.state === 'follower' && node.timer <= 0) {
            console.log(`Node ${node.id} timed out! Becoming Candidate.`);
            return {
              ...node,
              state: 'candidate',
              term: node.term + 1, // Incrementa término
              votedFor: node.id,   // Se vota a sí mismo
              votesReceived: 1,
              timer: getRandomTimeout() // Reinicia timer para elección
            };
          }

          // REGLA 2: Si un Candidate agota su tiempo sin ganar -> Reinicia elección
          if (node.state === 'candidate' && node.timer <= 0) {
             return {
               ...node,
               term: node.term + 1,
               timer: getRandomTimeout()
             };
          }

          return node;
        });
      }
    })
  }
});