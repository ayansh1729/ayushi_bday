import { useState, useEffect } from 'react'

const VideosPage = ({ onNavigate }) => {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videoModules = import.meta.glob('../assets/videos/*.(mp4|webm|mov|avi)', { eager: true })
        const videoList = Object.entries(videoModules).map(([path, module], index) => ({
          id: index,
          src: module.default,
          name: path.split('/').pop().split('.')[0],
          alt: `Beautiful video of Ayushi`,
          size: getRandomSize(index) // Assign random sizes for collage effect
        }))
        setVideos(videoList)
      } catch (error) {
        console.log('No videos found yet, please add videos to src/assets/videos/')
      }
      setLoading(false)
    }

    loadVideos()
  }, [])

  // Function to assign different sizes for collage effect
  const getRandomSize = (index) => {
    const sizes = ['small', 'medium', 'large', 'wide', 'tall']
    const patterns = [
      'large', 'small', 'medium', 'wide', 'small', 'tall', 'medium', 'small', 'large', 'small',
      'medium', 'wide', 'small', 'small', 'tall', 'medium', 'large', 'small', 'wide', 'medium'
    ]
    return patterns[index % patterns.length]
  }

  const openVideoModal = (video) => {
    setSelectedVideo(video)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="videos-page">
      {/* Starry Background */}
      <div className="stars-container">
        {Array.from({length: 50}, (_, i) => (
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
        <h1>🎬 Moving Memories</h1>
        <p>A collage of beautiful moments that bring life to our story...</p>
      </header>
      
      <main className="page-content">
        {loading ? (
          <div className="loading-message">
            <div className="loading-spinner">
              <div className="film-strip">
                <div className="film-hole"></div>
                <div className="film-hole"></div>
                <div className="film-hole"></div>
                <div className="film-hole"></div>
              </div>
            </div>
            <p>Loading your beautiful memories...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="empty-gallery">
            <div className="empty-camera">
              <div className="camera-body">
                <div className="camera-lens">🎥</div>
                <div className="camera-light"></div>
              </div>
            </div>
            <h3>Waiting for Your Beautiful Videos</h3>
            <div className="upload-instructions">
              <p>To create this magical collage:</p>
              <ol>
                <li>Copy your videos to: <code>ayushi/src/assets/videos/</code></li>
                <li>Supported formats: MP4, WEBM, MOV, AVI</li>
                <li>Watch them come alive in this collage!</li>
              </ol>
              <p>💕 Ready to showcase your moving memories 💕</p>
            </div>
          </div>
        ) : (
          <div className="video-collage">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className={`video-item ${video.size}`}
                onClick={() => openVideoModal(video)}
              >
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="collage-video"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                  <div className="play-icon">▶️</div>
                  <span className="video-name">{video.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVideoModal}>×</button>
            <video 
              controls 
              autoPlay 
              className="modal-video"
              key={selectedVideo.id}
            >
              <source src={selectedVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="modal-caption">
              <h3>{selectedVideo.name}</h3>
              <p>A beautiful moment captured in motion 💕</p>
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
            className="nav-star" 
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
            className="nav-star active" 
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

        .videos-page {
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

        .star:nth-child(4n) {
          background: #fff;
          box-shadow: 0 0 6px #fff;
        }

        .star:nth-child(4n+1) {
          background: #ffeb3b;
          box-shadow: 0 0 6px #ffeb3b;
        }

        .star:nth-child(4n+2) {
          background: #e1bee7;
          box-shadow: 0 0 6px #e1bee7;
        }

        .star:nth-child(4n+3) {
          background: #81c784;
          box-shadow: 0 0 6px #81c784;
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
          max-width: 1400px;
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

        .loading-spinner {
          margin-bottom: 2rem;
        }

        .film-strip {
          width: 100px;
          height: 20px;
          background: #333;
          border-radius: 4px;
          position: relative;
          animation: filmroll 2s linear infinite;
        }

        .film-hole {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #666;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }

        .film-hole:nth-child(1) { left: 10px; }
        .film-hole:nth-child(2) { left: 30px; }
        .film-hole:nth-child(3) { left: 50px; }
        .film-hole:nth-child(4) { left: 70px; }

        @keyframes filmroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(20px); }
        }

        .empty-camera {
          margin-bottom: 2rem;
        }

        .camera-body {
          position: relative;
          width: 100px;
          height: 60px;
          background: #333;
          border-radius: 10px;
          margin: 0 auto;
        }

        .camera-lens {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
        }

        .camera-light {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: #ff6b9d;
          border-radius: 50%;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
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

        .video-collage {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-auto-rows: 150px;
          gap: 15px;
          padding: 20px 0;
        }

        .video-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .video-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(255, 235, 59, 0.3);
        }

        .video-item.small {
          grid-row: span 1;
          grid-column: span 1;
        }

        .video-item.medium {
          grid-row: span 2;
          grid-column: span 1;
        }

        .video-item.large {
          grid-row: span 2;
          grid-column: span 2;
        }

        .video-item.wide {
          grid-row: span 1;
          grid-column: span 2;
        }

        .video-item.tall {
          grid-row: span 3;
          grid-column: span 1;
        }

        .collage-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .video-item:hover .collage-video {
          transform: scale(1.05);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 60%, rgba(255, 235, 59, 0.8));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          padding: 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-item:hover .video-overlay {
          opacity: 1;
        }

        .play-icon {
          font-size: 2rem;
          margin-bottom: auto;
          margin-top: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }

        .video-name {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-family: 'Brush Script MT', cursive;
          backdrop-filter: blur(5px);
        }

        .video-modal {
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

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .modal-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 235, 59, 0.2);
          border: 2px solid #ffeb3b;
          color: #ffeb3b;
          font-size: 2rem;
          cursor: pointer;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border-radius: 50%;
          font-weight: 300;
        }

        .modal-close:hover {
          background: #ffeb3b;
          color: #333;
          transform: scale(1.1) rotate(90deg);
        }

        .modal-video {
          max-width: 80vw;
          max-height: 70vh;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
          border: 3px solid rgba(255, 235, 59, 0.3);
        }

        .modal-caption {
          text-align: center;
          color: white;
          margin-top: 20px;
        }

        .modal-caption h3 {
          font-family: 'Brush Script MT', cursive;
          font-size: 1.5rem;
          color: #ffeb3b;
          margin-bottom: 0.5rem;
        }

        .modal-caption p {
          font-family: 'Brush Script MT', cursive;
          font-size: 1.1rem;
          color: #b39ddb;
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

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
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

          .video-collage {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-auto-rows: 120px;
            gap: 10px;
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

          .modal-video {
            max-width: 95vw;
            max-height: 60vh;
          }

          .modal-close {
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

export default VideosPage 