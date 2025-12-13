// Detecta si estamos corriendo en local, Vercel o IPFS
export const getApiUrl = (endpoint) => {
  const host = window.location.hostname;

  // 1. Desarrollo Local
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return endpoint; // Usa rutas relativas (/api/...)
  }

  // 2. Producción en Vercel (Tu dominio principal)
  // Cambia esto cuando tengas tu URL definitiva de Vercel
  if (host.includes('vercel.app')) {
    return endpoint; 
  }

  // 3. Entorno IPFS / Fleek (Aquí necesitamos ruta absoluta a Vercel)
  // IMPORTANTE: Reemplaza esto con tu URL real de Vercel cuando despliegues
  // Ejemplo: https://alonso-portfolio.vercel.app
  const VERCEL_BACKEND = 'https://alonso-portfolio.vercel.app'; 
  
  return `${VERCEL_BACKEND}${endpoint}`;
};