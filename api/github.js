export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  
  try {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}` }
    });
    const userData = await userResponse.json();

    const eventsResponse = await fetch(`https://api.github.com/users/${userData.login}/events/public?per_page=10`, {
      headers: { Authorization: `token ${token}` }
    });
    const eventsData = await eventsResponse.json();

    // LÓGICA MEJORADA: Buscamos el primer evento que sea un Push Y tenga commits
    const pushEvent = eventsData.find(e => 
      e.type === 'PushEvent' && 
      e.payload.commits && 
      e.payload.commits.length > 0
    );

    let lastCommitMsg = 'No recent commits';
    let repoName = '...';
    let date = null;

    if (pushEvent) {
      // Tomamos el último commit de ese push (el array suele estar invertido, el [0] es el más viejo del push, el último es el más nuevo)
      // Pero en la API de eventos, payload.commits suele listar los del push.
      const commits = pushEvent.payload.commits;
      const latestCommit = commits[commits.length - 1]; // El último de la lista del push

      lastCommitMsg = latestCommit.message;
      repoName = pushEvent.repo.name;
      date = pushEvent.created_at;
    }

    res.status(200).json({
      followers: userData.followers,
      public_repos: userData.public_repos,
      last_commit: {
        message: lastCommitMsg,
        repo: repoName,
        date: date
      }
    });

  } catch (error) {
    console.error("Github API Error:", error);
    res.status(500).json({ error: "Failed to fetch github data" });
  }
}