import { createMachine, assign } from 'xstate';

const FOLLOWER_TIMEOUT_MIN = 150;
const FOLLOWER_TIMEOUT_MAX = 300;
const HEARTBEAT_INTERVAL = 60;
const PACKET_SPEED = 2; 

const getRandomTimeout = () => 
  Math.floor(Math.random() * (FOLLOWER_TIMEOUT_MAX - FOLLOWER_TIMEOUT_MIN + 1)) + FOLLOWER_TIMEOUT_MIN;

export const clusterMachine = createMachine({
  id: 'raftCluster',
  initial: 'running',
  context: {
    nodes: [],
    packets: [], 
  },
  states: {
    running: {
      on: {
        TICK: { actions: ['tickSimulation'] },
        KILL_NODE: { actions: 'killNode' },
        
        // --- NUEVO EVENTO ---
        REVIVE_NODE: { actions: 'reviveNode' },
        
        INIT_NODES: { actions: 'initializeNodes' }
      }
    }
  }
}, {
  actions: {
    initializeNodes: assign({
      nodes: () => [1, 2, 3, 4, 5].map(id => ({
        id,
        state: 'follower',
        term: 1,
        timer: getRandomTimeout(),
        votedFor: null,
        votesReceived: 0
      }))
    }),

    killNode: assign({
      nodes: ({ context, event }) => context.nodes.map(n => 
        n.id === event.id ? { ...n, state: 'dead', timer: 0 } : n
      )
    }),

    // --- NUEVA ACCIÓN: REVIVIR ---
    reviveNode: assign({
      nodes: ({ context, event }) => context.nodes.map(n => 
        n.id === event.id 
          ? { 
              ...n, 
              state: 'follower', // Siempre revive como seguidor
              timer: getRandomTimeout(), // Reinicia paciencia
              votedFor: null,
              votesReceived: 0
              // Mantenemos el 'term' que tenía al morir (simulando persistencia)
            } 
          : n
      )
    }),

    tickSimulation: assign(({ context }) => {
      let nextNodes = [...context.nodes];
      let nextPackets = [...context.packets];

      // 1. MOVER PAQUETES
      nextPackets = nextPackets.map(p => ({ ...p, progress: p.progress + PACKET_SPEED }));
      const arrivedPackets = nextPackets.filter(p => p.progress >= 100);
      nextPackets = nextPackets.filter(p => p.progress < 100);

      // 2. PROCESAR PAQUETES
      arrivedPackets.forEach(packet => {
        const targetNode = nextNodes.find(n => n.id === packet.to);
        
        if (!targetNode || targetNode.state === 'dead') return; // Muertos no procesan

        // A. VOTE REQUEST
        if (packet.type === 'VOTE_REQ') {
          if (targetNode.term <= packet.term && (targetNode.votedFor === null || targetNode.votedFor === packet.from)) {
             targetNode.votedFor = packet.from;
             targetNode.term = packet.term;
             targetNode.timer = getRandomTimeout(); 
             nextPackets.push({ 
               id: Math.random(), from: targetNode.id, to: packet.from, type: 'VOTE_ACK', progress: 0, term: targetNode.term 
             });
          }
        }

        // B. VOTE ACK
        if (packet.type === 'VOTE_ACK') {
          if (targetNode.state === 'candidate' && targetNode.term === packet.term) {
            targetNode.votesReceived += 1;
            if (targetNode.votesReceived >= 3) {
              targetNode.state = 'leader';
              targetNode.timer = 0; 
              nextPackets = nextPackets.filter(p => p.from !== targetNode.id);
            }
          }
        }

        // C. HEARTBEAT
        if (packet.type === 'HEARTBEAT') {
          // Si recibo heartbeat de alguien con término mayor o igual, me someto
          if (packet.term >= targetNode.term) {
            targetNode.state = 'follower';
            targetNode.term = packet.term; // Actualizo mi término al del líder
            targetNode.votedFor = null;
            targetNode.votesReceived = 0;
            targetNode.timer = getRandomTimeout(); 
          }
        }
      });

      // 3. ACTUALIZAR ESTADOS
      nextNodes = nextNodes.map(node => {
        if (node.state === 'dead') return node;

        if (node.state === 'leader') {
          node.timer -= 1;
          if (node.timer <= 0) {
            node.timer = HEARTBEAT_INTERVAL;
            nextNodes.forEach(other => {
              if (other.id !== node.id) {
                nextPackets.push({
                  id: Math.random(), from: node.id, to: other.id, type: 'HEARTBEAT', progress: 0, term: node.term
                });
              }
            });
          }
          return node;
        }

        node.timer -= 1;
        if (node.timer <= 0) {
          node.state = 'candidate';
          node.term += 1;
          node.votedFor = node.id;
          node.votesReceived = 1;
          node.timer = getRandomTimeout();
          nextNodes.forEach(other => {
            if (other.id !== node.id) {
              nextPackets.push({
                id: Math.random(), from: node.id, to: other.id, type: 'VOTE_REQ', progress: 0, term: node.term
              });
            }
          });
        }
        return node;
      });

      return { nodes: nextNodes, packets: nextPackets };
    })
  }
});