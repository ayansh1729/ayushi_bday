import { useState, useEffect } from 'react'

const VideoGallery = () => {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        // This will be populated when videos are added to the assets/videos folder
        const videoModules = import.meta.glob('../assets/videos/*.(mp4|webm|mov|avi)', { eager: true })
        const videoList = Object.entries(videoModules).map(([path, module]) => ({
          src: module.default,
          name: path.split('/').pop().split('.')[0],
          title: `Beautiful moment with Ayushi`
        }))
        setVideos(videoList)
      } catch (error) {
        console.log('No videos found yet, please add videos to src/assets/videos/')
      }
      setLoading(false)
    }

    loadVideos()
  }, [])

  const openVideoModal = (video) => {
    setSelectedVideo(video)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  if (loading) {
    return (
      <div className="videos-grid">
        <div className="video-placeholder">
          <p>🔄 Loading your amazing videos...</p>
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="videos-grid">
        <div className="video-placeholder">
          <div className="upload-instruction">
            <h3>🎬 Ready for Your Amazing Videos! 🎬</h3>
            <p>To add videos:</p>
            <ol>
              <li>Copy your videos to: <code>ayushi/src/assets/videos/</code></li>
              <li>Supported formats: MP4, WEBM, MOV, AVI</li>
              <li>Videos will automatically appear here!</li>
            </ol>
            <p>🎥 Can't wait to see your beautiful moments in motion! 🎥</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="videos-grid">
        {videos.map((video, index) => (
          <div 
            key={index} 
            className="video-item"
            onClick={() => openVideoModal(video)}
          >
            <div className="video-thumbnail">
              <video muted>
                <source src={video.src} type="video/mp4" />
              </video>
              <div className="play-overlay">
                <div className="play-button">▶</div>
              </div>
            </div>
            <div className="video-info">
              <h3>{video.name}</h3>
              <p>Click to play this beautiful memory</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close" onClick={closeVideoModal}>×</button>
            <video 
              controls 
              autoPlay 
              className="modal-video"
              onEnded={closeVideoModal}
            >
              <source src={selectedVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-caption">
              <h3>{selectedVideo.name}</h3>
              <p>Another beautiful moment captured in time 🎬</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .video-item {
          background: var(--soft-white);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .video-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .video-thumbnail {
          position: relative;
          height: 250px;
          overflow: hidden;
          background: #000;
        }

        .video-thumbnail video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .video-item:hover .play-overlay {
          background: rgba(0,0,0,0.5);
        }

        .play-button {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: var(--primary-pink);
          transition: all 0.3s ease;
        }

        .video-item:hover .play-button {
          transform: scale(1.1);
          background: var(--primary-pink);
          color: white;
        }

        .video-info {
          padding: 1.5rem;
        }

        .video-info h3 {
          color: var(--accent-purple);
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          text-transform: capitalize;
        }

        .video-info p {
          color: #666;
          font-size: 0.9rem;
        }

        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .video-modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .modal-video {
          max-width: 100%;
          max-height: 70vh;
          border-radius: 10px;
        }

        .video-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: none;
          color: white;
          font-size: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .video-close:hover {
          background: var(--primary-pink);
          transform: scale(1.1);
        }

        .video-caption {
          margin-top: 1rem;
          text-align: center;
          color: white;
        }

        .video-caption h3 {
          color: var(--secondary-gold);
          margin-bottom: 0.5rem;
          text-transform: capitalize;
        }

        .upload-instruction {
          text-align: left;
          color: white;
        }

        .upload-instruction ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .upload-instruction li {
          margin: 0.5rem 0;
        }

        .upload-instruction code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .videos-grid {
            grid-template-columns: 1fr;
          }
          
          .video-modal-content {
            max-width: 95%;
          }
          
          .modal-video {
            max-height: 60vh;
          }
        }
      `}</style>
    </>
  )
}

export default VideoGallery 