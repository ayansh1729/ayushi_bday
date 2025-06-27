import { useState, useEffect } from 'react'

const PhotosPage = ({ onNavigate }) => {
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openEnvelopes, setOpenEnvelopes] = useState(new Set())

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photoModules = import.meta.glob('../assets/photos/*.(jpg|jpeg|png|gif|webp)', { eager: true })
        const photoList = Object.entries(photoModules).map(([path, module], index) => ({
          id: index,
          src: module.default,
          name: path.split('/').pop().split('.')[0],
          alt: `Beautiful photo of Ayushi`
        }))
        setPhotos(photoList)
      } catch (error) {
        console.log('No photos found yet, please add photos to src/assets/photos/')
      }
      setLoading(false)
    }

    loadPhotos()
  }, [])

  const handleEnvelopeClick = (photoId) => {
    setOpenEnvelopes(prev => new Set([...prev, photoId]))
  }

  const openLightbox = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
    const nextIndex = (currentIndex + 1) % photos.length
    setSelectedPhoto(photos[nextIndex])
  }

  const prevPhoto = () => {
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[prevIndex])
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedPhoto) return
      
      switch(e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevPhoto()
          break
        case 'ArrowRight':
          nextPhoto()
          break
      }
    }

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedPhoto])

  return (
    <div className="photos-page">
      {/* Starry Background */}
      <div className="stars-container">
        {Array.from({length: 40}, (_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <header className="page-header">
        <button className="back-btn" onClick={() => onNavigate('landing')}>
          ✨ Return to Magic ✨
        </button>
        <h1>💌 Memory Envelopes</h1>
        <p>Each envelope holds a precious moment waiting to be revealed...</p>
      </header>
      
      <main className="page-content">
        {loading ? (
          <div className="loading-message">
            <div className="envelope-loading">
              <div className="envelope-back"></div>
              <div className="envelope-front"></div>
              <div className="envelope-seal">💌</div>
            </div>
            <p>Preparing your beautiful memories...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="empty-gallery">
            <div className="empty-envelope">
              <div className="envelope-back"></div>
              <div className="envelope-front"></div>
              <div className="envelope-seal">✨</div>
            </div>
            <h3>Waiting for Your Beautiful Photos</h3>
            <div className="upload-instructions">
              <p>To fill these magical envelopes:</p>
              <ol>
                <li>Copy your photos to: <code>ayushi/src/assets/photos/</code></li>
                <li>Supported formats: JPG, JPEG, PNG, GIF, WEBP</li>
                <li>Watch as they appear in beautiful envelopes!</li>
              </ol>
              <p>💕 Ready to hold your precious memories 💕</p>
            </div>
          </div>
        ) : (
          <div className="envelopes-grid">
            {photos.map((photo, index) => (
              <div key={photo.id} className="envelope-container">
                <div 
                  className={`envelope ${openEnvelopes.has(photo.id) ? 'opened' : ''}`}
                  onClick={() => !openEnvelopes.has(photo.id) && handleEnvelopeClick(photo.id)}
                >
                  <div className="envelope-back"></div>
                  <div className="envelope-front"></div>
                  <div className="envelope-seal">{index % 2 === 0 ? '💕' : '✨'}</div>
                  
                  {!openEnvelopes.has(photo.id) && (
                    <div className="envelope-label">
                      Memory #{index + 1}
                    </div>
                  )}
                </div>
                
                {openEnvelopes.has(photo.id) && (
                  <div 
                    className="photo-reveal"
                    onClick={() => openLightbox(photo)}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      loading="lazy"
                    />
                    <div className="photo-overlay">
                      <span className="view-text">Click to view ✨</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox for full photo view */}
      {selectedPhoto && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            
            <div className="lightbox-main">
              <button className="lightbox-prev" onClick={prevPhoto}>‹</button>
              
              <div className="lightbox-image-container">
                <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
              </div>
              
              <button className="lightbox-next" onClick={nextPhoto}>›</button>
            </div>
            
            <div className="lightbox-caption">
              <h3>{selectedPhoto.name}</h3>
              <p>A beautiful memory captured forever 💕</p>
              <div className="lightbox-controls-hint">
                <span>Use ← → keys to navigate • ESC to close</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Constellation Navigation */}
      <nav className="constellation-nav">
        <div className="constellation-container">
          <svg className="constellation-lines" viewBox="0 0 200 400">
            <defs>
              <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#ffeb3b" />
              </linearGradient>
            </defs>
            <path 
              d="M 100 40 L 100 80 L 100 120 L 100 160 L 100 200 L 100 240" 
              stroke="url(#starGradient)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="5,5"
              className="constellation-line"
            />
          </svg>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('landing')}
            title="Home - Where magic begins"
            data-label="Home"
          >
            <div className="star-core"></div>
            <div className="star-glow"></div>
            <div className="star-rays"></div>
          </button>
          
          <button 
            className="nav-star active" 
            onClick={() => onNavigate('photos')}
            title="Photos - Beautiful moments captured"
            data-label="Photos"
          >
            <div className="star-core"></div>
            <div className="star-glow"></div>
            <div className="star-rays"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('chats')}
            title="Chats - Our sweet conversations"
            data-label="Chats"
          >
            <div className="star-core"></div>
            <div className="star-glow"></div>
            <div className="star-rays"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('videos')}
            title="Videos - Moving memories"
            data-label="Videos"
          >
            <div className="star-core"></div>
            <div className="star-glow"></div>
            <div className="star-rays"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('special')}
            title="Special - Why you're amazing"
            data-label="Special"
          >
            <div className="star-core"></div>
            <div className="star-glow"></div>
            <div className="star-rays"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('wishes')}
            title="Wishes - Birthday dreams"
            data-label="Wishes"
          >
            <div className="star-core"></div>
            <div className="star-glow"></div>
            <div className="star-rays"></div>
          </button>
        </div>
      </nav>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .photos-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0c0c1e 0%, #1a1a2e 50%, #16213e 100%);
          padding: 0;
          margin: 0;
          overflow-y: auto;
          z-index: 1;
        }

        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle infinite;
        }

        .star:nth-child(3n) {
          background: #fff;
          box-shadow: 0 0 6px #fff;
        }

        .star:nth-child(3n+1) {
          background: #ffeb3b;
          box-shadow: 0 0 6px #ffeb3b;
        }

        .star:nth-child(3n+2) {
          background: #e1bee7;
          box-shadow: 0 0 6px #e1bee7;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .page-header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: relative;
          color: white;
        }

        .back-btn {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 235, 59, 0.1);
          border: 2px solid #ffeb3b;
          color: #ffeb3b;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-family: 'Brush Script MT', cursive;
        }

        .back-btn:hover {
          background: #ffeb3b;
          color: #333;
          transform: translateY(-50%) translateX(-5px);
        }

        .page-header h1 {
          font-size: 3rem;
          background: linear-gradient(45deg, #ffeb3b, #ffd700, #ff6b9d);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          font-family: 'Brush Script MT', cursive;
        }

        .page-header p {
          font-size: 1.3rem;
          color: #b39ddb;
          max-width: 600px;
          margin: 0 auto;
          font-family: 'Brush Script MT', cursive;
          font-style: italic;
        }

        .page-content {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .loading-message, .empty-gallery {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          color: white;
          text-align: center;
        }

        .envelope-loading, .empty-envelope {
          position: relative;
          width: 120px;
          height: 80px;
          margin-bottom: 2rem;
        }

        .envelope-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f5dc 0%, #daa520 100%);
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .envelope-front {
          position: absolute;
          width: 100%;
          height: 50%;
          background: linear-gradient(135deg, #f5f5dc 0%, #daa520 100%);
          top: 50%;
          clip-path: polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%);
          border-radius: 0 0 8px 8px;
        }

        .envelope-seal {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          z-index: 2;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        .loading-message p, .empty-gallery h3 {
          font-family: 'Brush Script MT', cursive;
          font-size: 1.5rem;
          color: #ffeb3b;
          margin-bottom: 1rem;
        }

        .upload-instructions {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 15px;
          max-width: 500px;
          margin-top: 2rem;
        }

        .upload-instructions p {
          font-family: 'Brush Script MT', cursive;
          font-size: 1.2rem;
          color: #b39ddb;
          margin-bottom: 1rem;
        }

        .upload-instructions ol {
          text-align: left;
          color: white;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .upload-instructions code {
          background: rgba(255, 235, 59, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          color: #ffeb3b;
        }

        .envelopes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .envelope-container {
          position: relative;
          height: 300px;
          perspective: 1000px;
        }

        .envelope {
          position: absolute;
          width: 200px;
          height: 130px;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          transition: all 0.5s ease;
          transform-style: preserve-3d;
        }

        .envelope:hover {
          transform: translateX(-50%) translateY(-5px) rotateY(5deg);
        }

        .envelope.opened {
          pointer-events: none;
          opacity: 0.7;
          transform: translateX(-50%) translateY(-20px) rotateX(-10deg);
        }

        .envelope .envelope-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f5dc 0%, #daa520 100%);
          border-radius: 8px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          border: 2px solid #daa520;
        }

        .envelope .envelope-front {
          position: absolute;
          width: 100%;
          height: 50%;
          background: linear-gradient(135deg, #f5f5dc 0%, #daa520 100%);
          top: 50%;
          clip-path: polygon(0 0, 50% 70%, 100% 0, 100% 100%, 0 100%);
          border-radius: 0 0 8px 8px;
          transition: transform 0.5s ease;
        }

        .envelope.opened .envelope-front {
          transform: rotateX(-180deg);
          transform-origin: bottom;
        }

        .envelope .envelope-seal {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.8rem;
          z-index: 3;
          color: #ff6b9d;
          text-shadow: 0 0 10px rgba(255, 107, 157, 0.5);
        }

        .envelope-label {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          color: #ffeb3b;
          font-family: 'Brush Script MT', cursive;
          font-size: 1.2rem;
          text-align: center;
          width: 100%;
        }

        .photo-reveal {
          position: absolute;
          top: 140px;
          left: 50%;
          transform: translateX(-50%);
          width: 250px;
          height: 200px;
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
          animation: slideOut 0.8s ease-out;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          border: 3px solid #ffeb3b;
        }

        @keyframes slideOut {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px) rotateX(20deg);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) rotateX(0deg);
          }
        }

        .photo-reveal img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .photo-reveal:hover img {
          transform: scale(1.1);
        }

        .photo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 60%, rgba(255, 235, 59, 0.9));
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .photo-reveal:hover .photo-overlay {
          opacity: 1;
        }

        .view-text {
          color: #333;
          font-family: 'Brush Script MT', cursive;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 95vw;
          max-height: 95vh;
          position: relative;
        }

        .lightbox-close {
          position: absolute;
          top: -60px;
          right: 0px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 235, 59, 0.5);
          color: #ffeb3b;
          font-size: 2rem;
          cursor: pointer;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          border-radius: 50%;
          font-weight: 300;
          line-height: 1;
        }

        .lightbox-close:hover {
          background: rgba(255, 235, 59, 0.9);
          color: #000;
          border-color: #ffeb3b;
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 0 15px rgba(255, 235, 59, 0.5);
        }

        .lightbox-main {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          margin-bottom: 30px;
        }

        .lightbox-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
          border: 3px solid rgba(255, 235, 59, 0.3);
        }

        .lightbox-image-container img {
          max-width: 70vw;
          max-height: 70vh;
          display: block;
          border-radius: 12px;
        }

        .lightbox-prev, .lightbox-next {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 235, 59, 0.5);
          color: #ffeb3b;
          font-size: 2rem;
          cursor: pointer;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
          font-weight: bold;
          flex-shrink: 0;
        }

        .lightbox-prev:hover, .lightbox-next:hover {
          background: rgba(255, 235, 59, 0.9);
          color: #000;
          border-color: #ffeb3b;
          transform: scale(1.15);
          box-shadow: 0 0 20px rgba(255, 235, 59, 0.5);
        }

        .lightbox-prev:hover {
          transform: scale(1.15) translateX(-5px);
        }

        .lightbox-next:hover {
          transform: scale(1.15) translateX(5px);
        }

        .lightbox-caption {
          text-align: center;
          color: white;
          width: 100%;
          margin-top: 20px;
        }

        .lightbox-caption h3 {
          font-family: 'Brush Script MT', cursive;
          font-size: 1.5rem;
          color: #ffeb3b;
          margin-bottom: 0.5rem;
        }

        .lightbox-caption p {
          font-family: 'Brush Script MT', cursive;
          font-size: 1.1rem;
          color: #b39ddb;
        }

        .lightbox-controls-hint {
          margin-top: 1rem;
          opacity: 0.7;
        }

        .lightbox-controls-hint span {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.9rem;
          color: #888;
          background: rgba(0, 0, 0, 0.5);
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          backdrop-filter: blur(5px);
        }

        .constellation-nav {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
        }

        .constellation-container {
          position: relative;
          width: 200px;
          height: 400px;
        }

        .constellation-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .constellation-line {
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .nav-star {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-star:nth-child(2) { top: 25px; }
        .nav-star:nth-child(3) { top: 65px; }
        .nav-star:nth-child(4) { top: 105px; }
        .nav-star:nth-child(5) { top: 145px; }
        .nav-star:nth-child(6) { top: 185px; }
        .nav-star:nth-child(7) { top: 225px; }

        .star-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #ffd700;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .star-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #ffd700 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .star-rays {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .star-rays::before,
        .star-rays::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #ffd700;
        }

        .star-rays::before {
          width: 2px;
          height: 25px;
        }

        .star-rays::after {
          width: 25px;
          height: 2px;
        }

        .nav-star:hover .star-core {
          width: 12px;
          height: 12px;
          background: #ffeb3b;
        }

        .nav-star:hover .star-glow {
          width: 30px;
          height: 30px;
          opacity: 0.8;
        }

        .nav-star:hover .star-rays {
          opacity: 1;
          animation: rotate 2s linear infinite;
        }

        .nav-star.active .star-core {
          width: 14px;
          height: 14px;
          background: #ff6b9d;
          animation: pulse 2s infinite;
        }

        .nav-star.active .star-glow {
          width: 35px;
          height: 35px;
          background: radial-gradient(circle, #ff6b9d 0%, transparent 70%);
          opacity: 1;
        }

        .nav-star.active .star-rays {
          opacity: 1;
          animation: rotate 3s linear infinite;
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .nav-star::before {
          content: attr(data-label);
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: #ffeb3b;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-family: 'Brush Script MT', cursive;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          border: 1px solid #ffd700;
        }

        .nav-star:hover::before {
          opacity: 1;
          right: 55px;
        }

        @media (max-width: 768px) {
          .page-header {
            padding: 1.5rem;
          }

          .back-btn {
            position: static;
            transform: none;
            margin-bottom: 1rem;
          }

          .page-header h1 {
            font-size: 2.5rem;
          }

          .page-content {
            padding: 2rem 1rem;
          }

          .envelopes-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .envelope-container {
            height: 350px;
          }

          .envelope {
            width: 180px;
            height: 120px;
          }

          .photo-reveal {
            width: 220px;
            height: 180px;
          }

          .constellation-nav {
            right: 15px;
          }

          .constellation-container {
            width: 150px;
            height: 350px;
          }

          .nav-star {
            width: 35px;
            height: 35px;
          }

          .nav-star::before {
            font-size: 0.8rem;
            right: 45px;
          }

          .nav-star:hover::before {
            right: 50px;
          }

          .lightbox-wrapper {
            max-width: 98vw;
            max-height: 98vh;
          }

          .lightbox-close {
            top: -50px;
            right: 10px;
            width: 45px;
            height: 45px;
            font-size: 1.8rem;
          }

          .lightbox-main {
            gap: 20px;
            margin-bottom: 20px;
            flex-direction: row;
            align-items: center;
          }

          .lightbox-image-container img {
            max-width: 60vw;
            max-height: 60vh;
          }

          .lightbox-prev, .lightbox-next {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .lightbox-prev:hover {
            transform: scale(1.1) translateX(-3px);
          }

          .lightbox-next:hover {
            transform: scale(1.1) translateX(3px);
          }

          .lightbox-caption {
            margin-top: 15px;
          }

          .lightbox-caption h3 {
            font-size: 1.3rem;
          }

          .lightbox-caption p {
            font-size: 1rem;
          }

          .lightbox-controls-hint span {
            font-size: 0.8rem;
            padding: 0.2rem 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .lightbox-main {
            flex-direction: column;
            gap: 20px;
            align-items: center;
          }

          .lightbox-image-container {
            order: 1;
          }

          .lightbox-image-container img {
            max-width: 90vw;
            max-height: 55vh;
          }

          .lightbox-prev, .lightbox-next {
            order: 2;
            position: static;
            width: 55px;
            height: 55px;
            font-size: 1.6rem;
          }

          .lightbox-prev {
            order: 2;
            margin-right: 20px;
          }

          .lightbox-next {
            order: 3;
            margin-left: 20px;
          }

          .lightbox-close {
            top: -40px;
            right: 5px;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default PhotosPage 