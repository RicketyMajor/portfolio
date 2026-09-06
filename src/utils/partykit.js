// PartyKit serves a deployed project at <project>.<username>.partykit.dev. The bare project name
// has no DNS record, which is why the guestbook never connected in production while the cursor
// layer did. One constant, so the two consumers cannot drift apart again.
export const PARTYKIT_HOST =
  process.env.REACT_APP_PARTYKIT_HOST ||
  (process.env.NODE_ENV === 'production'
    ? 'alonso-portfolio.ricketymajor.partykit.dev'
    : '127.0.0.1:1999');
