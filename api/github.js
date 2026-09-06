// The owner's login is fixed, so there is no reason to spend a round trip on /user discovering it.
// Hardcoding it lets both GitHub calls leave at the same time.
const GITHUB_LOGIN = 'RicketyMajor';

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (!token) {
    return res.status(200).json({
      error: "No Token",
      last_commit: { message: "Token no configurado" }
    });
  }

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json'
  };

  try {
    const [userResponse, eventsResponse] = await Promise.all([
      fetch('https://api.github.com/user', { headers }),
      fetch(`https://api.github.com/users/${GITHUB_LOGIN}/events/public?per_page=5`, { headers })
    ]);

    if (!userResponse.ok) {
      throw new Error(`GitHub User Error: ${userResponse.status}`);
    }
    const userData = await userResponse.json();

    let lastCommitMsg = 'Explorando código...';
    let repoName = 'GitHub';

    // The events feed is decorative: a failure here downgrades the message, it does not fail the
    // request, which is why it is not thrown on the way /user is.
    if (eventsResponse.ok) {
      const eventsData = await eventsResponse.json();

      if (Array.isArray(eventsData)) {
        const pushEvent = eventsData.find(e =>
          e.type === 'PushEvent' && e.payload.commits?.length > 0
        );

        if (pushEvent) {
          const commits = pushEvent.payload.commits;
          lastCommitMsg = commits[commits.length - 1].message;
          repoName = pushEvent.repo.name;
        }
      }
    }

    res.status(200).json({
      followers: userData.followers,
      public_repos: userData.public_repos,
      last_commit: {
        message: lastCommitMsg,
        repo: repoName
      }
    });

  } catch (error) {
    console.error("GitHub API Catch:", error);
    res.status(200).json({
      followers: 0,
      public_repos: 0,
      last_commit: {
        message: "Sistema Distribuido Activo",
        repo: "Localhost"
      }
    });
  }
}
