import ChatTimeline from '../components/ChatTimeline'

const ChatsPage = ({ onNavigate }) => {
  return (
    <div className="chats-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => onNavigate('landing')}>
          ← Back to Home
        </button>
        <h1>💬 Our Special Conversations</h1>
        <p>Moments that made us smile, laugh, and fall deeper in love</p>
      </header>
      
      <main className="page-content">
        <ChatTimeline />
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
          className="nav-dot active" 
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
          className="nav-dot" 
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

        .chats-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
          background: rgba(255, 255, 255, 0.1);
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
          background: linear-gradient(45deg, #ffeb3b, #ff6b9d, #e1bee7);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .page-header p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
        }

        .page-content {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
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

          .nav-dots {
            right: 1rem;
          }

          .nav-dot {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatsPage 