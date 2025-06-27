import { useState, useEffect } from 'react'

const LandingPage = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [showCelebration, setShowCelebration] = useState(false)
  const [moonPosition, setMoonPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showSurprise, setShowSurprise] = useState(false)
  const [moonClicks, setMoonClicks] = useState(0)

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const difference = midnight - now
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setShowCelebration(true)
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Moon interaction handlers
  const handleMoonMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - moonPosition.x,
      y: e.clientY - moonPosition.y
    })
  }

  const handleMoonMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // Keep moon within bounds
      const boundedX = Math.max(-50, Math.min(50, newX))
      const boundedY = Math.max(-50, Math.min(50, newY))
      
      setMoonPosition({ x: boundedX, y: boundedY })
      
      // Check if moon is dragged far enough to trigger surprise
      if (Math.abs(boundedX) > 30 || Math.abs(boundedY) > 30) {
        setShowSurprise(true)
      }
    }
  }

  const handleMoonMouseUp = () => {
    setIsDragging(false)
    // Slowly return moon to original position
    setTimeout(() => {
      setMoonPosition({ x: 0, y: 0 })
    }, 1000)
  }

  const handleMoonClick = () => {
    setMoonClicks(prev => prev + 1)
    if (moonClicks >= 2) {
      setShowSurprise(true)
    }
  }

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMoonMouseMove)
      document.addEventListener('mouseup', handleMoonMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMoonMouseMove)
        document.removeEventListener('mouseup', handleMoonMouseUp)
      }
    }
  }, [isDragging, dragStart, moonPosition])

  return (
    <div className="landing-page">
      {/* Animated Stars Background */}
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

      {/* Falling Stars */}
      <div className="falling-stars">
        {Array.from({length: 8}, (_, i) => (
          <div 
            key={i} 
            className="falling-star" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Interactive Moon */}
      <div 
        className={`moon ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translate(${moonPosition.x}px, ${moonPosition.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMoonMouseDown}
        onClick={handleMoonClick}
        title="Drag me or click me! 🌙"
      >
        <div className="moon-crater crater1"></div>
        <div className="moon-crater crater2"></div>
        <div className="moon-crater crater3"></div>
        <div className="moon-glow"></div>
        {moonClicks > 0 && !showSurprise && (
          <div className="moon-hint">✨ Try dragging me! ✨</div>
        )}
      </div>

      {/* Surprise Message */}
      {showSurprise && (
        <div className="surprise-message">
          <div className="surprise-content">
            <h2>🎭 You found the secret! 🎭</h2>
            <p>The moon is beautiful isn't it bacchu?.</p>
            <p>A Very Happy Birthday to you bacchu. I lovee you. 💫</p>
            <button 
              className="surprise-btn"
              onClick={() => setShowSurprise(false)}
            >
              🌙 Beautiful! 🌙
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="landing-content">
        <div className="magic-circle">
          <h1 className="main-title">
            <span className="line1">Happy 26th Birthday</span>
            <span className="line2">Beautiful Ayushi</span>
            <span className="heart">💕</span>
          </h1>
          
          {!showCelebration ? (
            <div className="countdown-section">
              <h2 className="countdown-subtitle">Your magical day begins in:</h2>
              <div className="time-display">
                <div className="time-card">
                  <span className="time-number">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-card">
                  <span className="time-number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="time-label">Minutes</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-card">
                  <span className="time-number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="time-label">Seconds</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="celebration-message">
              <h2 className="celebration-title">🎉 IT'S YOUR BIRTHDAY! 🎉</h2>
              <p className="celebration-subtitle">The stars aligned just for you tonight!</p>
            </div>
          )}
          
          <button 
            className="explore-btn"
            onClick={() => onNavigate('photos')}
          >
            <span>✨ Enter Your Magical World ✨</span>
          </button>
        </div>
      </div>

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
            className="nav-star active" 
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

        .landing-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0c0c1e 0%, #1a1a2e 50%, #16213e 100%);
          overflow: auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin: 0;
          padding: 1rem 0;
          z-index: 1;
          box-sizing: border-box;
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

        .falling-stars {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .falling-star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          animation: fall infinite linear;
          box-shadow: 0 0 8px #fff;
        }

        .falling-star::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-75px) translateY(2px);
        }

        @keyframes fall {
          0% {
            transform: translateY(-100vh) translateX(0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(-100px) rotate(45deg);
            opacity: 0;
          }
        }

        .moon {
          position: absolute;
          top: 8%;
          right: 8%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle at 30% 30%, #f5f5dc, #e6e6d3);
          border-radius: 50%;
          box-shadow: 0 0 40px rgba(245, 245, 220, 0.4);
          animation: moonFloat 6s ease-in-out infinite;
          cursor: grab;
          user-select: none;
          transition: all 0.3s ease;
          z-index: 100;
        }

        .moon:hover {
          transform: scale(1.1);
          box-shadow: 0 0 60px rgba(245, 245, 220, 0.6);
        }

        .moon.dragging {
          cursor: grabbing;
          animation: none;
          transform: scale(1.15);
          box-shadow: 0 0 80px rgba(245, 245, 220, 0.8);
          z-index: 200;
        }

        .moon-crater {
          position: absolute;
          background: #d4d4be;
          border-radius: 50%;
          box-shadow: inset 2px 2px 4px rgba(0,0,0,0.2);
        }

        .crater1 {
          width: 12px;
          height: 12px;
          top: 25px;
          left: 35px;
        }

        .crater2 {
          width: 8px;
          height: 8px;
          top: 55px;
          left: 65px;
        }

        .crater3 {
          width: 15px;
          height: 15px;
          top: 75px;
          left: 25px;
        }

        .moon-glow {
          position: absolute;
          top: -30px;
          left: -30px;
          right: -30px;
          bottom: -30px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 245, 220, 0.1) 0%, transparent 70%);
        }

        @keyframes moonFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .moon-hint {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 235, 59, 0.9);
          color: #333;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          animation: bounce 1s ease-in-out infinite;
          white-space: nowrap;
          font-family: 'Brush Script MT', cursive;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }

        .surprise-message {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.5s ease-out;
        }

        .surprise-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 2.5rem 3rem;
          text-align: center;
          border: 2px solid rgba(255, 235, 59, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          animation: scaleIn 0.5s ease-out;
        }

        .surprise-content h2 {
          color: #ffeb3b;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-family: 'Brush Script MT', cursive;
          animation: glow 2s ease-in-out infinite alternate;
        }

        .surprise-content p {
          color: white;
          font-size: 1.2rem;
          margin: 1rem 0;
          font-family: 'Brush Script MT', cursive;
          font-style: italic;
        }

        .surprise-btn {
          background: linear-gradient(45deg, #ffeb3b, #ffd700);
          color: #333;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.3s ease;
          font-family: 'Brush Script MT', cursive;
        }

        .surprise-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 235, 59, 0.3);
        }

        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .landing-content {
          text-align: center;
          z-index: 10;
          position: relative;
          width: 100%;
          max-width: 800px;
          padding: 2rem;
          margin-top: 2rem;
          min-height: calc(100vh - 4rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .magic-circle {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 2.5rem 3rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 25px 45px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          margin: 1rem auto;
          max-width: 90vw;
        }

        .main-title {
          font-family: 'Brush Script MT', cursive, 'Dancing Script', 'Lobster', serif;
          font-weight: 400;
          color: #fff;
          margin-bottom: 1.5rem;
          margin-top: 0;
          line-height: 1.1;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          letter-spacing: 2px;
          padding-top: 0.5rem;
        }

        .line1 {
          display: block;
          font-size: 2.2rem;
          color: #e8eaf6;
          opacity: 0.9;
          font-family: 'Brush Script MT', cursive, 'Dancing Script', serif;
          font-style: italic;
        }

        .line2 {
          display: block;
          font-size: 3.5rem;
          color: #ffeb3b;
          font-weight: 400;
          margin: 0.5rem 0;
          animation: glow 2s ease-in-out infinite alternate;
          font-family: 'Brush Script MT', cursive, 'Dancing Script', serif;
          font-style: italic;
        }

        .heart {
          display: block;
          font-size: 2.5rem;
          margin-top: 1rem;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(255, 235, 59, 0.5); }
          100% { text-shadow: 0 0 30px rgba(255, 235, 59, 0.8), 0 0 40px rgba(255, 235, 59, 0.4); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .countdown-section {
          margin: 2.5rem 0;
        }

        .countdown-subtitle {
          color: #b39ddb;
          font-size: 1.3rem;
          margin-bottom: 2rem;
          font-weight: 300;
          letter-spacing: 0.5px;
          font-family: 'Brush Script MT', cursive;
          font-style: italic;
        }

        .time-display {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .time-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 1.5rem 1.2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-width: 90px;
          transition: all 0.3s ease;
        }

        .time-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .time-number {
          display: block;
          font-size: 2.5rem;
          font-weight: bold;
          color: #ffeb3b;
          text-shadow: 0 0 15px rgba(255, 235, 59, 0.6);
          font-family: 'Courier New', monospace;
        }

        .time-label {
          display: block;
          color: #e8eaf6;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 0.5rem;
          opacity: 0.8;
        }

        .time-separator {
          color: #ffeb3b;
          font-size: 2rem;
          font-weight: bold;
          opacity: 0.7;
        }

        .celebration-message {
          margin: 2.5rem 0;
        }

        .celebration-title {
          color: #ffeb3b;
          font-size: 2.8rem;
          margin-bottom: 1rem;
          animation: celebrationPulse 1.5s ease-in-out infinite;
          font-family: 'Brush Script MT', cursive;
        }

        .celebration-subtitle {
          color: #b39ddb;
          font-size: 1.4rem;
          font-style: italic;
          font-family: 'Brush Script MT', cursive;
        }

        @keyframes celebrationPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .explore-btn {
          background: linear-gradient(45deg, #7c4dff, #3f51b5, #2196f3);
          background-size: 200% 200%;
          color: white;
          border: none;
          padding: 1.3rem 2.8rem;
          font-size: 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 15px 35px rgba(124, 77, 255, 0.3);
          margin-top: 2.5rem;
          animation: gradientShift 3s ease infinite;
          font-weight: 500;
          letter-spacing: 0.5px;
          font-family: 'Brush Script MT', cursive;
        }

        .explore-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(124, 77, 255, 0.4);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .constellation-nav {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
        }

        .constellation-container {
          position: relative;
          width: 80px;
          height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }

        .constellation-lines {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.6;
        }

        .constellation-line {
          animation: constellationPulse 3s ease-in-out infinite;
        }

        @keyframes constellationPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .nav-star {
          position: relative;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .star-core {
          width: 12px;
          height: 12px;
          background: #ffd700;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
          box-shadow: 0 0 10px #ffd700;
        }

        .star-glow {
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .star-rays {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .star-rays::before,
        .star-rays::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffd700, transparent);
          transform: translate(-50%, -50%);
        }

        .star-rays::before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .star-rays::after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .nav-star:hover .star-core,
        .nav-star.active .star-core {
          width: 16px;
          height: 16px;
          background: #ffeb3b;
          box-shadow: 0 0 20px #ffeb3b, 0 0 30px #ffd700;
        }

        .nav-star:hover .star-glow,
        .nav-star.active .star-glow {
          opacity: 1;
          width: 35px;
          height: 35px;
        }

        .nav-star:hover .star-rays,
        .nav-star.active .star-rays {
          opacity: 1;
          animation: starRotate 2s linear infinite;
        }

        .nav-star::after {
          content: attr(data-label);
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: #ffd700;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-family: 'Brush Script MT', cursive;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .nav-star:hover::after {
          opacity: 1;
          right: 55px;
        }

        .nav-star.active .star-core {
          animation: activePulse 1.5s ease-in-out infinite;
        }

        @keyframes starRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes activePulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }

        @media (max-width: 768px) {
          .landing-page {
            padding: 0.5rem 0;
          }

          .moon {
            width: 80px;
            height: 80px;
            top: 3%;
            right: 5%;
          }

          .crater1 { width: 8px; height: 8px; top: 15px; left: 25px; }
          .crater2 { width: 6px; height: 6px; top: 35px; left: 45px; }
          .crater3 { width: 10px; height: 10px; top: 50px; left: 15px; }

          .landing-content {
            padding: 1rem;
            margin-top: 1rem;
          }

          .magic-circle {
            padding: 1.5rem;
            margin: 0.5rem auto;
          }

          .main-title {
            margin-bottom: 1rem;
            padding-top: 0;
          }

          .line1 {
            font-size: 1.6rem;
          }

          .line2 {
            font-size: 2.5rem;
          }

          .time-display {
            gap: 1rem;
            justify-content: center;
          }

          .time-card {
            min-width: 70px;
            padding: 1rem 0.8rem;
          }

          .time-number {
            font-size: 2rem;
          }

          .time-separator {
            font-size: 1.5rem;
          }

          .constellation-nav {
            right: 1rem;
          }

          .constellation-container {
            width: 60px;
            height: 300px;
          }

          .nav-star {
            width: 35px;
            height: 35px;
          }

          .nav-star::after {
            font-size: 0.8rem;
            right: 45px;
          }

          .explore-btn {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .landing-page {
            padding: 0.25rem 0;
          }

          .landing-content {
            padding: 0.5rem;
            margin-top: 0.5rem;
          }

          .magic-circle {
            padding: 1rem;
          }

          .main-title {
            margin-bottom: 0.8rem;
          }

          .time-display {
            flex-direction: column;
            gap: 0.8rem;
          }

          .time-separator {
            display: none;
          }

          .line1 {
            font-size: 1.4rem;
          }

          .line2 {
            font-size: 2rem;
          }

          .moon {
            top: 2%;
            width: 70px;
            height: 70px;
          }

          .countdown-subtitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default LandingPage 