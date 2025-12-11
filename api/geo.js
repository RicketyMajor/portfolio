export default function handler(req, res) {
  const city = req.headers['x-vercel-ip-city'] || 'Mundo';
  const region = req.headers['x-vercel-ip-region'] || 'Tierra';
  const country = req.headers['x-vercel-ip-country'] || 'GLB';
  
  const serverLocation = process.env.VERCEL_REGION || 'iad1 (Washington, DC)';

  res.status(200).json({
    city,
    region,
    country,
    serverLocation,
    timestamp: Date.now()
  });
}