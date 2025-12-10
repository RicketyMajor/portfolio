export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  
  // 1. Obtenemos tu usuario
  const userResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `token ${token}` }
  });
  const userData = await userResponse.json();

  // 2. Obtenemos tus eventos recientes (commits, push, etc)
  const eventsResponse = await fetch(`https://api.github.com/users/${userData.login}/events/public`, {
    headers: { Authorization: `token ${token}` }
  });
  const eventsData = await eventsResponse.json();

  // Filtramos el último Push
  const lastPush = eventsData.find(e => e.type === 'PushEvent');

  const hasCommits = lastPush && lastPush.payload.commits && lastPush.payload.commits.length > 0;

  res.status(200).json({
    followers: userData.followers,
    public_repos: userData.public_repos,
    last_commit: {
      // Usamos la variable de control hasCommits
      message: hasCommits ? lastPush.payload.commits[0].message : 'No recent commit message',
      repo: lastPush ? lastPush.repo.name : 'Unknown',
      date: lastPush ? lastPush.created_at : null
    }
  });
}