import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { FaGithub, FaServer, FaGlobeAmericas, FaBolt, FaSpotify, FaCode } from 'react-icons/fa';

import '../styles/dashboard.css'; // Crearemos este CSS luego

const fetcher = (url) => fetch(url).then((res) => res.json());

const LiveDashboard = () => {
  // Fetching de datos usando SWR (se revalida automáticamente)
  const { data: geoData } = useSWR('/api/geo', fetcher, { refreshInterval: 0 }); // Geo no cambia
  const { data: githubData } = useSWR('/api/github', fetcher, { refreshInterval: 60000 }); // Cada 1 min
  const { data: spotifyData } = useSWR('/api/spotify', fetcher, { refreshInterval: 10000 }); // Cada 10s
  const { data: wakatimeData } = useSWR('/api/wakatime', fetcher);

  const [latency, setLatency] = useState(null);

  // Calcular latencia aproximada
  useEffect(() => {
    const start = Date.now();
    fetch('/api/geo').then(() => {
      const end = Date.now();
      setLatency(end - start);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h3><FaBolt style={{ color: '#ffbd2e' }} /> System Status</h3>
        <span className="live-indicator">● LIVE</span>
      </div>

      <div className="dashboard-grid">
        
        {/* CARD 1: EDGE AWARENESS */}
        <div className="stat-card">
          <div className="stat-icon"><FaGlobeAmericas /></div>
          <div className="stat-info">
            <h4>Cliente (Tú)</h4>
            <p>{geoData ? `${geoData.city}, ${geoData.country}` : 'Localizando...'}</p>
          </div>
        </div>

        <div className="connection-line">
            <span className="latency-tag">{latency ? `${latency}ms` : '...'}</span>
            <div className="dashed-line"></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaServer /></div>
          <div className="stat-info">
            <h4>Nodo Edge</h4>
            <p>{geoData ? geoData.serverLocation : 'Detectando...'}</p>
          </div>
        </div>

        {/* CARD 3: SPOTIFY (NOW PLAYING) */}
        <div className="stat-card wide" style={{ borderColor: spotifyData?.isPlaying ? '#1db954' : 'transparent' }}>
          <div className="stat-icon"><FaSpotify style={{ color: '#1db954' }} /></div>
          <div className="stat-info">
            <h4>{spotifyData?.isPlaying ? 'Escuchando ahora' : 'Spotify'}</h4>
            {spotifyData?.isPlaying ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                 <img src={spotifyData.albumImageUrl} alt="Album Art" style={{ width: '40px', height: '40px', borderRadius: '4px' }} />
                 <div>
                    <a href={spotifyData.songUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {spotifyData.title}
                    </a>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{spotifyData.artist}</p>
                 </div>
              </div>
            ) : (
              <p>Offline / Pausado</p>
            )}
          </div>
        </div>

        {/* CARD 4: WAKATIME (CODING STATS) */}
        <div className="stat-card">
          <div className="stat-icon"><FaCode style={{ color: '#ff5f56' }} /></div>
          <div className="stat-info">
            <h4>Wakatime (7 días)</h4>
            <p>{wakatimeData ? wakatimeData.hours : 'Calculando...'}</p>
            <small>Top: {wakatimeData ? wakatimeData.language : '...'}</small>
          </div>
        </div>

        {/* CARD 2: GITHUB ACTIVITY */}
        <div className="stat-card wide">
          <div className="stat-icon"><FaGithub /></div>
          <div className="stat-info">
            <h4>Última Actividad</h4>
            <p className="commit-msg">
              {githubData ? `"${githubData.last_commit.message}"` : 'Cargando commits...'}
            </p>
            <small>
              en {githubData ? githubData.last_commit.repo : '...'}
            </small>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveDashboard;