import { onConnect } from "y-partykit";

export default {
  async onConnect(conn, room, context) {
    return onConnect(conn, room, context);
  },
};