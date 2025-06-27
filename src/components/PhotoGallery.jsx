import { useState, useEffect } from 'react'

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Function to dynamically import all images from the photos folder
    const loadPhotos = async () => {
      try {
        // This will be populated when photos are added to the assets/photos folder
        const photoModules = import.meta.glob('../assets/photos/*.(jpg|jpeg|png|gif|webp)', { eager: true })
        const photoList = Object.entries(photoModules).map(([path, module]) => ({
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

  const openLightbox = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const currentIndex = photos.findIndex(p => p.src === selectedPhoto.src)
    const nextIndex = (currentIndex + 1) % photos.length
    setSelectedPhoto(photos[nextIndex])
  }

  const prevPhoto = () => {
    const currentIndex = photos.findIndex(p => p.src === selectedPhoto.src)
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[prevIndex])
  }

  if (loading) {
    return (
      <div className="photos-grid">
        <div className="photo-placeholder">
          <p>🔄 Loading your beautiful memories...</p>
        </div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="photos-grid">
        <div className="photo-placeholder">
          <div className="upload-instruction">
            <h3>✨ Ready for Your Beautiful Photos! ✨</h3>
            <p>To add photos:</p>
            <ol>
              <li>Copy your photos to: <code>ayushi/src/assets/photos/</code></li>
              <li>Supported formats: JPG, JPEG, PNG, GIF, WEBP</li>
              <li>The photos will automatically appear here!</li>
            </ol>
            <p>💕 Can't wait to showcase your beautiful memories! 💕</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="photos-grid">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="photo-item"
            onClick={() => openLightbox(photo)}
          >
            <img 
              src={photo.src} 
              alt={photo.alt}
              loading="lazy"
            />
            <div className="photo-overlay">
              <span className="photo-title">{photo.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-prev" onClick={prevPhoto}>‹</button>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <button className="lightbox-next" onClick={nextPhoto}>›</button>
            <div className="lightbox-caption">
              <h3>{selectedPhoto.name}</h3>
              <p>Another beautiful moment captured 📸</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .photo-item {
          position: relative;
          cursor: pointer;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .photo-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .photo-item img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .photo-item:hover img {
          transform: scale(1.1);
        }

        .photo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: white;
          padding: 2rem 1rem 1rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .photo-item:hover .photo-overlay {
          transform: translateY(0);
        }

        .photo-title {
          font-size: 1.1rem;
          font-weight: bold;
          text-transform: capitalize;
        }

        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-content img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 10px;
        }

        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
          position: absolute;
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

        .lightbox-close {
          top: -60px;
          right: 0;
        }

        .lightbox-prev {
          left: -60px;
          top: 50%;
          transform: translateY(-50%);
        }

        .lightbox-next {
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
        }

        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
          background: var(--primary-pink);
          transform: scale(1.1);
        }

        .lightbox-prev:hover {
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-next:hover {
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-caption {
          margin-top: 1rem;
          text-align: center;
          color: white;
        }

        .lightbox-caption h3 {
          color: var(--secondary-gold);
          margin-bottom: 0.5rem;
          text-transform: capitalize;
        }

        .upload-instruction {
          text-align: left;
        }

        .upload-instruction ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .upload-instruction li {
          margin: 0.5rem 0;
        }

        .upload-instruction code {
          background: rgba(255, 107, 157, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .photos-grid {
            grid-template-columns: 1fr;
          }
          
          .lightbox-prev,
          .lightbox-next {
            position: static;
            margin: 1rem;
          }
          
          .lightbox-content {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </>
  )
}

export default PhotoGallery 