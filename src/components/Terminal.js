import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import useSWR from 'swr';
import { FaGithub, FaServer, FaGlobeAmericas, FaSpotify, FaClock, FaStopwatch, FaNetworkWired } from 'react-icons/fa';
import '../styles/components.css'; 
import '../styles/dashboard.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Terminal = () => {
  const { data: geoData } = useSWR('/api/geo', fetcher); 
  const { data: githubData } = useSWR('/api/github', fetcher, { refreshInterval: 300000 });
  const { data: spotifyData } = useSWR('/api/spotify', fetcher, { refreshInterval: 10000 }); 

  const [loaded, setLoaded] = useState(false);
  const [latency, setLatency] = useState(null);
  const [time, setTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 800);
    const start = Date.now();
    fetch('/api/geo').then(() => setLatency(Date.now() - start));

    const timer = setInterval(() => {
      setTime(new Date());
      setUptime(p => p + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="terminal-window">
      {/* --- HEADER --- */}
      <div className="terminal-header">
        <div style={{display:'flex', gap:'8px'}}>
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
        <div className="terminal-title">alonso@portfolio: ~ (System Monitor)</div>
      </div>

      <div className="terminal-body" style={{ padding: '25px' }}>
        
        {/* --- PROMPT --- */}
        <div className="prompt-line">
          <div>
            <span className="prompt-user">alonso@portfolio</span>:
            <span className="prompt-path">~</span>$ 
            <span> ./dashboard.sh --grid</span>
          </div>
          {loaded && <span className="live-indicator">● LIVE</span>}
        </div>

        {loaded && (
          <div className="dashboard-grid fade-in">
            
            {/* --- NETWORK TOPOLOGY --- */}
            <div className="stat-card">
              <div className="card-label"><FaNetworkWired /> Network Topology</div>
              <div className="network-flow">
                {/* Client */}
                <div className="network-node">
                  <FaGlobeAmericas className="node-icon" />
                  <span className="node-text">{geoData ? geoData.city : 'Locating'}</span>
                  <span className="node-subtext">{geoData ? geoData.country : '...'}</span>
                </div>
                {/* Arrow */}
                <div className="network-arrow">
                  <span className="latency-badge">{latency ? `${latency}ms` : '-'}</span>
                  <div className="arrow-line"></div>
                </div>
                {/* Server */}
                <div className="network-node">
                  <FaServer className="node-icon" />
                  <span className="node-text">{geoData ? geoData.serverLocation.split(' ')[0] : 'Edge'}</span>
                  <span className="node-subtext">Vercel</span>
                </div>
              </div>
            </div>

            {/* --- CHRONOMETRY --- */}
            <div className="stat-card">
              <div className="card-label"><FaClock /> System Chronometry</div>
              <div className="chrono-grid">
                <div className="chrono-item">
                  <span className="chrono-value">{time.toISOString().split('T')[1].split('.')[0]}</span>
                  <span className="node-subtext">UTC Standard</span>
                </div>
                <div className="chrono-item" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="chrono-value">{formatUptime(uptime)}</span>
                  <span className="node-subtext">Session Uptime</span>
                </div>
              </div>
            </div>

            {/* --- SPOTIFY --- */}
            <div className="stat-card" style={{ borderColor: spotifyData?.isPlaying ? '#1db954' : 'rgba(136,146,176,0.1)' }}>
              <div className="card-label">
                <FaSpotify style={{ color: spotifyData?.isPlaying ? '#1db954' : 'inherit' }} /> 
                Spotify Daemon
              </div>
              
              <div className="app-content">
                {spotifyData?.isPlaying ? (
                  <>
                    <img 
                       src={spotifyData.albumImageUrl} 
                       alt="Art" 
                       style={{ width: '40px', height: '40px', borderRadius: '4px' }} 
                    />
                    <div className="app-text">
                      <a href={spotifyData.songUrl} target="_blank" rel="noreferrer" className="app-title">
                        {spotifyData.title}
                      </a>
                      <span className="app-subtitle">{spotifyData.artist}</span>
                    </div>
                  </>
                ) : (
                  <span className="node-subtext">Process Idling (Music Paused)</span>
                )}
              </div>
            </div>

            {/* --- GITHUB --- */}
            <div className="stat-card">
              <div className="card-label"><FaGithub /> GitHub Module</div>
              <div className="app-content" style={{ justifyContent: 'space-between', width: '100%' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                   <span className="app-title" style={{fontSize: '1.2rem'}}>
                     {githubData?.public_repos || '-'}
                   </span>
                   <span className="app-subtitle">Repositories</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                   <span 
                     className="app-title" 
                     style={{ color: githubData?.last_commit?.message !== 'Explorando código...' ? '#27c93f' : '#ffbd2e' }}
                   >
                     {githubData?.last_commit?.message !== 'Explorando código...' ? 'Active' : 'Idle'}
                   </span>
                   <span className="app-subtitle">Dev Status</span>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* --- LOGS --- */}
        {loaded && (
          <div className="terminal-logs">
            <div className="prompt-line">
              <span className="prompt-user">alonso@portfolio</span>:
              <span className="prompt-path">~</span>$ 
              <span> tail -f /dev/thoughts</span>
            </div>
            <span style={{ color: 'var(--text-primary)' }}>{'>'} </span>
            <TypeAnimation
              sequence={[
                'Arquitecto de Sistemas Distribuidos.', 2000,
                'Apasionado por la Inteligencia Artificial.', 2000,
                'Resolviendo problemas complejos con código limpio.', 2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Terminal;