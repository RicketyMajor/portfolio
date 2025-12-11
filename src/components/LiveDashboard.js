import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { FaGithub, FaServer, FaGlobeAmericas, FaBolt, FaSpotify } from 'react-icons/fa';
import '../styles/dashboard.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

const LiveDashboard = () => {
  const { data: geoData } = useSWR('/api/geo', fetcher, { refreshInterval: 0 }); 
  
  const { data: githubData } = useSWR('/api/github', fetcher, { refreshInterval: 300000 });
  
  const { data: spotifyData } = useSWR('/api/spotify', fetcher, { refreshInterval: 10000 }); 

  const [latency, setLatency] = useState(null);

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
        
        {/* --- LOCATION AND NETWORK --- */}
        <div className="stat-card">
          <div className="stat-icon"><FaGlobeAmericas /></div>
          <div className="stat-info">
            <h4>Cliente</h4>
            <p>{geoData ? `${geoData.city}, ${geoData.country}` : '...'}</p>
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
            <p>{geoData ? geoData.serverLocation : '...'}</p>
          </div>
        </div>

        {/* --- SPOTIFY --- */}
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

        {/* --- GITHUB STATS --- */}
        <div className="stat-card wide">
          <div className="stat-icon"><FaGithub /></div>
          <div className="stat-info">
            <h4>GitHub Activity</h4>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {githubData?.public_repos || '-'}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Repositorios</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                   {githubData?.last_commit?.message !== 'Explorando código...' ? 'Active' : 'Contributor'}
                 </span>
                 <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Status</span>
              </div>

            </div>
            
            <small style={{ marginTop: '8px', display: 'block', opacity: 0.6 }}>
               Open Source & Distribuidos
            </small>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveDashboard;