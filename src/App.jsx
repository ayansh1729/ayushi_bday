import { useState, useRef, useEffect } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import PhotosPage from './pages/PhotosPage'
import VideosPage from './pages/VideosPage'
import ChatsPage from './pages/ChatsPage'
import SpecialPage from './pages/SpecialPage'
import WishesPage from './pages/WishesPage'
import birthdayMusic from './assets/happy-birthday-357371.mp3'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    // Add click listener to start music on first user interaction
    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      }
      // Remove listener after first successful interaction
      document.removeEventListener('click', handleFirstClick)
    }

    document.addEventListener('click', handleFirstClick)

    // Try to start music immediately
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      }
    }, 500)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleFirstClick)
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />
      case 'photos':
        return <PhotosPage onNavigate={handleNavigation} />
      case 'chats':
        return <ChatsPage onNavigate={handleNavigation} />
      case 'videos':
        return <VideosPage onNavigate={handleNavigation} />
      case 'special':
        return <SpecialPage onNavigate={handleNavigation} />
      case 'wishes':
        return <WishesPage onNavigate={handleNavigation} />
      default:
        return <LandingPage onNavigate={handleNavigation} />
    }
  }

  return (
    <div className="App">
      {/* Background Birthday Music */}
      <audio 
        ref={audioRef}
        src={birthdayMusic}
        loop
        preload="auto"
        autoPlay
      />

      {/* Mute Button */}
      <button 
        className={`mute-btn ${isMuted ? 'muted' : 'unmuted'}`}
        onClick={toggleMute}
        title={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {renderPage()}

      <style jsx>{`
        .mute-btn {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border: 2px solid #ffeb3b;
          color: #ffeb3b;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .mute-btn:hover {
          background: #ffeb3b;
          color: #333;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 235, 59, 0.5);
        }

        .mute-btn.muted {
          background: rgba(255, 107, 157, 0.8);
          border-color: #ff6b9d;
          color: #ff6b9d;
        }

        .mute-btn.muted:hover {
          background: #ff6b9d;
          color: white;
        }

        @media (max-width: 768px) {
          .mute-btn {
            bottom: 15px;
            left: 15px;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default App
