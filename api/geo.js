export default function handler(req, res) {
  // Vercel inyecta estos headers automáticamente en sus funciones
  const city = req.headers['x-vercel-ip-city'] || 'Mundo';
  const region = req.headers['x-vercel-ip-region'] || 'Tierra';
  const country = req.headers['x-vercel-ip-country'] || 'GLB';
  
  // Simulamos la ubicación del servidor (Vercel suele usar AWS us-east-1 por defecto en funciones standard)
  const serverLocation = process.env.VERCEL_REGION || 'iad1 (Washington, DC)';

  res.status(200).json({
    city,
    region,
    country,
    serverLocation,
    timestamp: Date.now()
  });
}