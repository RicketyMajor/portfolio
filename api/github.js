export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  
  // Headers estándar para evitar caché agresivo de Vercel en la API
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (!token) {
    return res.status(200).json({ 
      error: "No Token", 
      last_commit: { message: "Token no configurado" } 
    });
  }

  try {
    // 1. Obtener Datos del Usuario (Esto suele funcionar siempre si el token es válido)
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub User Error: ${userResponse.status}`);
    }
    const userData = await userResponse.json();

    // 2. Obtener Eventos (Esto es lo que suele fallar con tokens nuevos)
    const eventsResponse = await fetch(`https://api.github.com/users/${userData.login}/events/public?per_page=5`, {
      headers: { 
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    let lastCommitMsg = 'Explorando código...';
    let repoName = 'GitHub';

    // Solo procesamos eventos si la respuesta fue OK
    if (eventsResponse.ok) {
      const eventsData = await eventsResponse.json();
      
      // Verificamos que sea un array (a veces GitHub devuelve un objeto de error)
      if (Array.isArray(eventsData)) {
        const pushEvent = eventsData.find(e => 
          e.type === 'PushEvent' && e.payload.commits?.length > 0
        );
        
        if (pushEvent) {
          const commits = pushEvent.payload.commits;
          // El último commit del array suele ser el más reciente en la API de eventos
          lastCommitMsg = commits[commits.length - 1].message;
          repoName = pushEvent.repo.name;
        }
      }
    }

    // Devolvemos lo que tengamos (Datos de usuario + Commit o mensaje por defecto)
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
    // En caso de error total, devolvemos un JSON válido para que el frontend no muestre "Error" feo
    res.status(200).json({
      followers: 0,
      public_repos: 0,
      last_commit: {
        message: "Sistema Distribuido Activo", // Mensaje "placeholder" técnico
        repo: "Localhost"
      }
    });
  }
}