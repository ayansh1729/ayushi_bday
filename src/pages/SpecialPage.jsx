import { useState, useEffect } from 'react'

const SpecialPage = ({ onNavigate }) => {
  const [revealedReasons, setRevealedReasons] = useState(new Set())
  const [autoReveal, setAutoReveal] = useState(false)

  const reasons = [
    { id: 1, title: "Wild", text: "Your wild spirit that makes life an adventure every single day", emoji: "🌪️" },
    { id: 2, title: "Lovely", text: "So lovely in every way, from your gentle touch to your warm presence", emoji: "🌸" },
    { id: 3, title: "Gorgeous", text: "Absolutely gorgeous inside and out, a beauty that takes my breath away", emoji: "✨" },
    { id: 4, title: "Understands Me", text: "You understand me like no one else ever has or ever will", emoji: "💫" },
    { id: 5, title: "Adventurous", text: "Your adventurous heart that's always ready for new experiences", emoji: "🎪" },
    { id: 6, title: "Compassionate", text: "Your compassionate soul that feels deeply for everyone around you", emoji: "💖" },
    { id: 7, title: "Intelligent", text: "Your brilliant mind that amazes me with its depth and wisdom", emoji: "🧠" },
    { id: 8, title: "Funny", text: "Your amazing sense of humor that fills our days with laughter", emoji: "😂" },
    { id: 9, title: "Caring", text: "The way you care for everyone with such genuine love and kindness", emoji: "🤗" },
    { id: 10, title: "Beautiful Smile", text: "Your smile that lights up the darkest corners of my world", emoji: "😊" },
    { id: 11, title: "Kind Heart", text: "Your incredibly kind heart that makes the world a better place", emoji: "💝" },
    { id: 12, title: "Strong", text: "Your inner strength that inspires me to be better every day", emoji: "💪" },
    { id: 13, title: "Creative", text: "Your creative mind that sees beauty and possibility everywhere", emoji: "🎨" },
    { id: 14, title: "Supportive", text: "How you support my dreams and believe in me unconditionally", emoji: "🤝" },
    { id: 15, title: "Brave", text: "Your courage to face challenges with grace and determination", emoji: "🦁" },
    { id: 16, title: "Magical", text: "The magical way you make ordinary moments feel extraordinary", emoji: "🔮" },
    { id: 17, title: "Inspiring", text: "How you inspire me to reach for the stars and never give up", emoji: "🌟" },
    { id: 18, title: "Unique", text: "Your unique soul that's unlike anyone else in this universe", emoji: "🦄" },
    { id: 19, title: "Passionate", text: "Your passionate spirit that brings fire to everything you do", emoji: "🔥" },
    { id: 20, title: "Gentle", text: "Your gentle nature that brings peace to my restless heart", emoji: "🕊️" },
    { id: 21, title: "Amazing Laugh", text: "Your infectious laugh that's like music to my soul", emoji: "🎵" },
    { id: 22, title: "Thoughtful", text: "How thoughtful you are with every gesture, word, and action", emoji: "💭" },
    { id: 23, title: "Radiant", text: "Your radiant energy that brightens every space you enter", emoji: "☀️" },
    { id: 24, title: "Dreamer", text: "Your beautiful dreams that paint our future with hope and love", emoji: "🌙" },
    { id: 25, title: "Perfect", text: "Perfect just the way you are, with all your quirks and wonder", emoji: "👑" },
    { id: 26, title: "My Everything", text: "You are my everything, my whole world, my forever and always", emoji: "♾️" }
  ]

  const handleReasonClick = (reasonId, event) => {
    event.preventDefault()
    event.stopPropagation()
    setRevealedReasons(prev => new Set([...prev, reasonId]))
  }

  const handleRevealAll = () => {
    setAutoReveal(true)
    const revealSequentially = (index = 0) => {
      if (index < reasons.length) {
        setTimeout(() => {
          setRevealedReasons(prev => new Set([...prev, reasons[index].id]))
          revealSequentially(index + 1)
        }, 200)
      }
    }
    revealSequentially()
  }

  const handleResetAll = () => {
    setRevealedReasons(new Set())
    setAutoReveal(false)
  }

  return (
    <div className="special-page">
      {/* Starry Background */}
      <div className="stars-container">
        {Array.from({length: 100}, (_, i) => (
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
        <h1>💕 26 Reasons You're My Universe</h1>
        <p>Click each star to discover why you're absolutely extraordinary...</p>
        
        <div className="control-buttons">
          <button className="reveal-btn" onClick={handleRevealAll}>
            ✨ Reveal All Stars ✨
          </button>
          <button className="reset-btn" onClick={handleResetAll}>
            🌙 Reset Journey 🌙
          </button>
        </div>
      </header>
      
      <main className="page-content">
        <div className="constellation-container">
          {reasons.map((reason, index) => (
            <div 
              key={reason.id} 
              className={`reason-star ${revealedReasons.has(reason.id) ? 'revealed' : ''}`}
              style={{
                left: `${8 + (index % 6) * 14}%`,
                top: `${8 + Math.floor(index / 6) * 18}%`,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={(e) => handleReasonClick(reason.id, e)}
            >
              <div className="star-core">
                <span className="star-number">{reason.id}</span>
              </div>
              <div className="star-glow"></div>
              <div className="star-rays"></div>
              
              {revealedReasons.has(reason.id) && (
                <div 
                  className={`reason-popup ${Math.floor(index / 6) < 2 ? 'popup-below' : 'popup-above'}`}
                >
                  <div className="popup-emoji">{reason.emoji}</div>
                  <h3 className="popup-title">{reason.title}</h3>
                  <p className="popup-text">{reason.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="progress-indicator">
          <div className="progress-text">
            {revealedReasons.size} of 26 reasons discovered
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(revealedReasons.size / 26) * 100}%` }}
            ></div>
          </div>
        </div>
      </main>

      {/* Constellation Navigation */}
      <nav className="constellation-nav">
        <div className="constellation-container-nav">
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
            <div className="star-core-nav"></div>
            <div className="star-glow-nav"></div>
            <div className="star-rays-nav"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('photos')}
            title="Photos - Beautiful moments captured"
            data-label="Photos"
          >
            <div className="star-core-nav"></div>
            <div className="star-glow-nav"></div>
            <div className="star-rays-nav"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('chats')}
            title="Chats - Our sweet conversations"
            data-label="Chats"
          >
            <div className="star-core-nav"></div>
            <div className="star-glow-nav"></div>
            <div className="star-rays-nav"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('videos')}
            title="Videos - Moving memories"
            data-label="Videos"
          >
            <div className="star-core-nav"></div>
            <div className="star-glow-nav"></div>
            <div className="star-rays-nav"></div>
          </button>
          
          <button 
            className="nav-star active" 
            onClick={() => onNavigate('special')}
            title="Special - Why you're amazing"
            data-label="Special"
          >
            <div className="star-core-nav"></div>
            <div className="star-glow-nav"></div>
            <div className="star-rays-nav"></div>
          </button>
          
          <button 
            className="nav-star" 
            onClick={() => onNavigate('wishes')}
            title="Wishes - Birthday dreams"
            data-label="Wishes"
          >
            <div className="star-core-nav"></div>
            <div className="star-glow-nav"></div>
            <div className="star-rays-nav"></div>
          </button>
        </div>
      </nav>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .special-page {
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
          background: #ff6b9d;
          box-shadow: 0 0 6px #ff6b9d;
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
          margin: 0 auto 2rem;
          font-family: 'Brush Script MT', cursive;
          font-style: italic;
        }

        .control-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .reveal-btn, .reset-btn {
          background: rgba(255, 235, 59, 0.1);
          border: 2px solid #ffeb3b;
          color: #ffeb3b;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-family: 'Brush Script MT', cursive;
        }

        .reveal-btn:hover, .reset-btn:hover {
          background: #ffeb3b;
          color: #333;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 235, 59, 0.3);
        }

        .page-content {
          padding: 3rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          min-height: 80vh;
        }

        .constellation-container {
          position: relative;
          width: 100%;
          height: 750px;
          margin: 2rem 0;
        }

        .reason-star {
          position: absolute;
          cursor: pointer;
          width: 70px;
          height: 70px;
          transition: all 0.3s ease;
          animation: starAppear 0.8s ease-out;
          z-index: 10;
        }

        @keyframes starAppear {
          0% {
            opacity: 0;
            transform: scale(0) rotate(180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .reason-star:hover {
          transform: scale(1.2);
          filter: brightness(1.3);
        }

        .reason-star:hover .star-core {
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
        }

        .star-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: #ffd700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffeb3b;
          transition: all 0.3s ease;
        }

        .star-number {
          font-size: 0.8rem;
          font-weight: bold;
          color: #333;
        }

        .star-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0.6;
          animation: pulse 2s infinite;
        }

        .star-rays {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
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
          height: 40px;
        }

        .star-rays::after {
          width: 40px;
          height: 2px;
        }

        .reason-star:hover .star-rays {
          opacity: 1;
          animation: rotate 2s linear infinite;
        }

        .reason-star.revealed .star-core {
          background: #ff6b9d;
          border-color: #ff6b9d;
          width: 25px;
          height: 25px;
          box-shadow: 0 0 20px rgba(255, 107, 157, 0.5);
        }

        .reason-star.revealed .star-glow {
          background: radial-gradient(circle, rgba(255, 107, 157, 0.6) 0%, transparent 70%);
          animation: pulse 1.5s infinite;
        }

        .reason-popup {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          border: 2px solid #ffeb3b;
          border-radius: 15px;
          padding: 1rem;
          min-width: 280px;
          max-width: 320px;
          text-align: center;
          animation: popupAppear 0.5s ease-out;
          z-index: 100;
        }

        .popup-above {
          top: -140px;
        }

        .popup-below {
          top: 80px;
        }

        @keyframes popupAppear {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        .popup-emoji {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .popup-title {
          color: #ffeb3b;
          font-size: 1.2rem;
          font-family: 'Brush Script MT', cursive;
          margin-bottom: 0.5rem;
        }

        .popup-text {
          color: #b39ddb;
          font-size: 0.9rem;
          line-height: 1.4;
          font-family: 'Brush Script MT', cursive;
        }

        .progress-indicator {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-radius: 25px;
          border: 2px solid #ffeb3b;
          text-align: center;
          z-index: 1000;
        }

        .progress-text {
          color: #ffeb3b;
          font-family: 'Brush Script MT', cursive;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .progress-bar {
          width: 200px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffeb3b, #ff6b9d);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .constellation-nav {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
        }

        .constellation-container-nav {
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

        .star-core-nav {
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

        .star-glow-nav {
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

        .star-rays-nav {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .star-rays-nav::before,
        .star-rays-nav::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #ffd700;
        }

        .star-rays-nav::before {
          width: 2px;
          height: 25px;
        }

        .star-rays-nav::after {
          width: 25px;
          height: 2px;
        }

        .nav-star:hover .star-core-nav {
          width: 12px;
          height: 12px;
          background: #ffeb3b;
        }

        .nav-star:hover .star-glow-nav {
          width: 30px;
          height: 30px;
          opacity: 0.8;
        }

        .nav-star:hover .star-rays-nav {
          opacity: 1;
          animation: rotate 2s linear infinite;
        }

        .nav-star.active .star-core-nav {
          width: 14px;
          height: 14px;
          background: #ff6b9d;
          animation: pulse 2s infinite;
        }

        .nav-star.active .star-glow-nav {
          width: 35px;
          height: 35px;
          background: radial-gradient(circle, #ff6b9d 0%, transparent 70%);
          opacity: 1;
        }

        .nav-star.active .star-rays-nav {
          opacity: 1;
          animation: rotate 3s linear infinite;
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

          .control-buttons {
            flex-direction: column;
            align-items: center;
          }

          .page-content {
            padding: 2rem 1rem;
          }

          .constellation-container {
            height: 650px;
          }

          .reason-star {
            width: 60px;
            height: 60px;
          }

          .star-core {
            width: 18px;
            height: 18px;
          }

          .reason-popup {
            min-width: 220px;
            max-width: 280px;
            padding: 0.8rem;
          }

          .popup-above {
            top: -120px;
          }

          .popup-below {
            top: 70px;
          }

          .popup-title {
            font-size: 1.1rem;
          }

          .popup-text {
            font-size: 0.8rem;
          }

          .progress-indicator {
            bottom: 10px;
            padding: 0.8rem 1.5rem;
          }

          .progress-bar {
            width: 150px;
            height: 6px;
          }

          .constellation-nav {
            right: 15px;
          }

          .constellation-container-nav {
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
        }
      `}</style>
    </div>
  )
}

export default SpecialPage 