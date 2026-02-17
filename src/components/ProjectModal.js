import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaGithub, FaExternalLinkAlt, 
  FaCode, FaFileAlt, FaInfoCircle, FaFilePdf, FaLink 
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/projects.css';

const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleContentClick = (e) => e.stopPropagation();

  const hasExtendedData = !!project.extended;
  
  const galleryImages = hasExtendedData && project.extended.gallery 
    ? project.extended.gallery 
    : [{ type: 'image', src: project.image, caption: project.title }];

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: <FaInfoCircle /> },
    ...(hasExtendedData && project.extended.technical ? [{ id: 'technical', label: 'Técnico', icon: <FaCode /> }] : []),
    ...(hasExtendedData && project.extended.documents ? [{ id: 'documents', label: 'Recursos', icon: <FaFileAlt /> }] : [])
  ];

  // Estilo personalizado para el resaltador de código
  const customCodeStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#011627', // Coincide con tu paleta oscura
      borderRadius: '8px',
      margin: 0,
      padding: '1rem',
      fontSize: '0.85rem',
      fontFamily: 'var(--font-code)',
    }
  };

  return (
    <motion.div 
      className="project-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ zIndex: 10000 }}
    >
      <motion.div 
        className="project-modal"
        layoutId={`project-${project.id}`}
        onClick={handleContentClick}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes size={18} />
        </button>

        {/* --- GALLERY SECTION --- */}
        <div className="gallery-container">
          <AnimatePresence mode='wait'>
            <motion.img 
              key={activeImageIndex}
              layoutId={activeImageIndex === 0 ? `image-${project.id}` : undefined}
              src={galleryImages[activeImageIndex].src} 
              alt={galleryImages[activeImageIndex].caption || project.title}
              className="gallery-main-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          
          <div className="gallery-caption">
            {galleryImages[activeImageIndex].caption}
          </div>
        </div>

        {galleryImages.length > 1 && (
          <div className="gallery-thumbs">
            {galleryImages.map((img, idx) => (
              <img 
                key={idx}
                src={img.src}
                alt="thumb"
                className={`gallery-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              />
            ))}
          </div>
        )}

        {hasExtendedData && (
          <div className="modal-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* --- MAIN CONTENT --- */}
        <div className="modal-content">
          
          <div style={{ marginBottom: '20px' }}>
            <motion.h2 className="card-title" style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {project.title}
            </motion.h2>
            <div className="card-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* --- TAB: OVERVIEW (Con Markdown) --- */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              
              {/* AQUÍ ESTÁ EL CAMBIO CLAVE: ReactMarkdown */}
              <div className="markdown-content">
                <ReactMarkdown>
                  {hasExtendedData && project.extended.overview 
                    ? project.extended.overview 
                    : project.description}
                </ReactMarkdown>
              </div>
              
              <div className="card-links" style={{ marginTop: '30px' }}>
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <FaExternalLinkAlt style={{ marginRight: '8px' }}/> Ver Demo Live
                  </a>
                )}
                {project.repoLink && (
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FaGithub style={{ marginRight: '8px' }}/> Ver Repositorio
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* --- TAB: TECHNICAL (Con SyntaxHighlighter) --- */}
          {activeTab === 'technical' && project.extended?.technical && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="section-subtitle">Stack Tecnológico</h3>
              <div className="tech-stack-grid">
                {project.extended.technical.stack.map((group, idx) => (
                  <div key={idx} className="tech-category">
                    <h4>{group.name}</h4>
                    <ul className="tech-list">
                      {group.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              {project.extended.technical.challenges && (
                <div style={{ marginTop: '25px' }}>
                  <h3 className="section-subtitle">Desafíos Clave</h3>
                  <ul className="tech-list challenges">
                    {project.extended.technical.challenges.map((challenge, idx) => (
                      <li key={idx}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.extended.technical.codeSnippets && (
                <div style={{ marginTop: '25px' }}>
                  <h3 className="section-subtitle">Snippets Destacados</h3>
                  {project.extended.technical.codeSnippets.map((snippet, idx) => (
                    <div key={idx} className="code-snippet-wrapper">
                      <div className="code-snippet-header">
                        <span>{snippet.title}</span>
                        <span className="lang-badge">{snippet.language}</span>
                      </div>
                      {/* AQUÍ EL CAMBIO CLAVE: SyntaxHighlighter */}
                      <SyntaxHighlighter 
                        language={snippet.language.toLowerCase()} 
                        style={customCodeStyle}
                        showLineNumbers={true}
                        wrapLongLines={true}
                      >
                        {snippet.code}
                      </SyntaxHighlighter>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* --- TAB: DOCUMENTS --- */}
          {activeTab === 'documents' && project.extended?.documents && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Documentación oficial y recursos descargables.
              </p>
              <div className="documents-grid">
                {project.extended.documents.map((doc, idx) => (
                  <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="doc-card">
                    <div className="doc-icon-wrapper">
                      {doc.type === 'pdf' ? <FaFilePdf /> : <FaLink />}
                    </div>
                    <div className="doc-info">
                      <h5>{doc.title}</h5>
                      <div className="doc-meta">
                        <span className="doc-type">{doc.type}</span>
                        {doc.size && <span className="doc-size">• {doc.size}</span>}
                      </div>
                    </div>
                    <div className="doc-arrow"><FaExternalLinkAlt size={12}/></div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;