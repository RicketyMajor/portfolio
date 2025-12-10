export default function handler(req, res) {
  // OJO: No imprimimos el token completo por seguridad, solo los primeros caracteres
  const ghToken = process.env.GITHUB_TOKEN;
  const wakaKey = process.env.WAKATIME_API_KEY;

  console.log("--- DIAGNÓSTICO DE VARIABLES ---");
  console.log("GITHUB_TOKEN existe:", !!ghToken);
  console.log("WAKATIME_API_KEY existe:", !!wakaKey);
  
  res.status(200).json({
    github_status: ghToken ? `Cargado (${ghToken.substring(0, 4)}...)` : 'MISSING',
    wakatime_status: wakaKey ? `Cargado` : 'MISSING',
    environment: process.env.NODE_ENV
  });
}