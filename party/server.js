import { onConnect } from "y-partykit";

export default {
  async onConnect(conn, room, context) {
    // Esta función maneja automáticamente la sincronización de documentos Yjs
    // y la "Awareness" (presencia de usuarios/cursores).
    return onConnect(conn, room, context);
  },
};