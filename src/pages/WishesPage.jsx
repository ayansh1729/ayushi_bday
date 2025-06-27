const WishesPage = ({ onNavigate }) => {
  return (
    <div className="wishes-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => onNavigate('landing')}>
          ← Back to Home
        </button>
        <h1>🌟 Birthday Wishes & Dreams</h1>
        <p>Messages from the heart for your special day</p>
      </header>
      
      <main className="page-content">
        <div className="wishes-container">
          <div className="wish-card main-wish">
            <div className="wish-icon">🎂</div>
            <h2>My Birthday Wish for You</h2>
            <p>
              As you turn 26, I wish you all the happiness in the world. 
              May this new year of your life be filled with adventure, love, 
              laughter, and all the beautiful moments you deserve. 
              YThank you for being there with me my love. I love you ummaaaahhhh !
            </p>
          </div>

          <div className="wish-card">
            <div className="wish-icon">💕</div>
            <h2>Our Future Together</h2>
            <p>
              Hehe To be honest mujhe na pata humara future kya hoga but I can
              assure you one thing.I'll fight till the end for our love. Baaki
              sab to govind aur Radha Rani pe hai. Radhe Radhe !!
            </p>
          </div>

          <div className="wish-card">
            <div className="wish-icon">✨</div>
            <h2>What Makes You Special</h2>
            <p>
              Everything about you is just sooo damn special. Like i can just not 
              Imagine any girl other than you. The way you laugh, the way you talk,
              The way you fight, the way you love, The way you act. I just love every
              every single bit of it.
            </p>
          </div>

          <div className="wish-card">
            <div className="wish-icon">🌙</div>
            <h2>Under the Stars</h2>
            <p>
              I don't know in this life or the next one. One day we would be laying beisde
              on the grass under somewhere in very clear sky. Going throught our journey in flashbacks.
              I saw this in my dream. I know it would come true.
            </p>
          </div>
        </div>

        <div className="final-message">
          <h2>Happy 26th Birthday, Ayushi!</h2>
          <p>🎉 I love you soooo damn much bacchu.
             Ye jo smile abhi tere chehre pe hai na never loose it.🎉</p>
        </div>
      </main>

      {/* Navigation Dots */}
      <nav className="nav-dots">
        <button 
          className="nav-dot" 
          onClick={() => onNavigate('landing')}
          title="Home"
        >
          🏠
        </button>
        <button 
          className="nav-dot" 
          onClick={() => onNavigate('photos')}
          title="Photos"
        >
          📸
        </button>
        <button 
          className="nav-dot" 
          onClick={() => onNavigate('chats')}
          title="Chats"
        >
          💬
        </button>
        <button 
          className="nav-dot" 
          onClick={() => onNavigate('videos')}
          title="Videos"
        >
          🎥
        </button>
        <button 
          className="nav-dot" 
          onClick={() => onNavigate('special')}
          title="Special"
        >
          💕
        </button>
        <button 
          className="nav-dot active" 
          onClick={() => onNavigate('wishes')}
          title="Wishes"
        >
          🌟
        </button>
      </nav>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .wishes-page {
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
        }

        .page-header p {
          font-size: 1.3rem;
          color: #b39ddb;
          max-width: 600px;
          margin: 0 auto;
        }

        .page-content {
          padding: 1rem 2rem 3rem 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .wishes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .wish-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .wish-card:nth-child(1) { animation-delay: 0.1s; }
        .wish-card:nth-child(2) { animation-delay: 0.3s; }
        .wish-card:nth-child(3) { animation-delay: 0.5s; }
        .wish-card:nth-child(4) { animation-delay: 0.7s; }

        .wish-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          border-color: #ffeb3b;
        }

        .main-wish {
          grid-column: 1 / -1;
          text-align: center;
        }

        .wish-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .wish-card h2 {
          color: #ffeb3b;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          font-weight: 400;
        }

        .wish-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .final-message {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 235, 59, 0.1);
          border-radius: 30px;
          border: 2px solid rgba(255, 235, 59, 0.3);
          backdrop-filter: blur(20px);
        }

        .final-message h2 {
          font-size: 2.5rem;
          color: #ffeb3b;
          margin-bottom: 1rem;
          animation: glow 2s ease-in-out infinite alternate;
        }

        .final-message p {
          font-size: 1.4rem;
          color: white;
          font-weight: 300;
        }

        .nav-dots {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 1000;
        }

        .nav-dot {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 235, 59, 0.3);
        }

        .nav-dot:hover, .nav-dot.active {
          background: #ffeb3b;
          color: #333;
          transform: scale(1.1);
          border-color: #ffeb3b;
          box-shadow: 0 5px 15px rgba(255, 235, 59, 0.3);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(255, 235, 59, 0.5); }
          100% { text-shadow: 0 0 30px rgba(255, 235, 59, 0.8), 0 0 40px rgba(255, 235, 59, 0.4); }
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
            padding: 1rem 1rem 2rem 1rem;
          }

          .wishes-container {
            grid-template-columns: 1fr;
          }

          .main-wish {
            grid-column: 1;
          }

          .nav-dots {
            right: 1rem;
          }

          .nav-dot {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
          }

          .final-message h2 {
            font-size: 2rem;
          }

          .final-message p {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default WishesPage 