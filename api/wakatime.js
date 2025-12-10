export default async function handler(req, res) {
  const api_key = process.env.WAKATIME_API_KEY;

  if (!api_key) {
    console.error("❌ Wakatime Error: No API KEY found in .env");
    return res.status(500).json({ error: "No API Key" });
  }

  try {
    const basic = Buffer.from(api_key).toString('base64');
    
    // Usamos el endpoint de "stats" que suele ser más robusto
    const response = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        Authorization: `Basic ${basic}`
      }
    });

    if (!response.ok) {
      console.error(`❌ Wakatime API Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error("Response body:", text);
      return res.status(response.status).json({ hours: 'Error', language: '...' });
    }

    const data = await response.json();

    // Verificación defensiva
    const hours = data.data?.human_readable_total || '0 mins';
    const language = data.data?.languages?.[0]?.name || 'Unknown';

    res.status(200).json({
      hours,
      language,
      status: 'Coding'
    });

  } catch (error) {
    console.error("❌ Wakatime Server Error:", error);
    res.status(500).json({ hours: 'Error', language: '...' });
  }
}