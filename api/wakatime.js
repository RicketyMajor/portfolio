export default async function handler(req, res) {
  const api_key = process.env.WAKATIME_API_KEY;
  
  // Usamos btoa para base64 en entornos modernos de Node/Edge
  const basic = Buffer.from(api_key).toString('base64');

  const response = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
    headers: {
      Authorization: `Basic ${basic}`
    }
  });

  const data = await response.json();

  res.status(200).json({
    hours: data.data.human_readable_total,
    language: data.data.languages[0].name, // Lenguaje más usado
    status: 'Coding'
  });
}