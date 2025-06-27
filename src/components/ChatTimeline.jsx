import { useState, useEffect } from 'react'

const ChatTimeline = () => {
  const [chatImages, setChatImages] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChatImages = async () => {
      try {
        // This will be populated when chat screenshots are added to the assets/chats folder
        const chatModules = import.meta.glob('../assets/chats/*.(jpg|jpeg|png|gif|webp)', { eager: true })
        const chatList = Object.entries(chatModules).map(([path, module]) => ({
          src: module.default,
          name: path.split('/').pop().split('.')[0],
          title: `Sweet conversation moment`
        }))
        setChatImages(chatList)
      } catch (error) {
        console.log('No chat screenshots found yet, please add them to src/assets/chats/')
      }
      setLoading(false)
    }

    loadChatImages()
  }, [])

  const openChatModal = (chat) => {
    setSelectedChat(chat)
  }

  const closeChatModal = () => {
    setSelectedChat(null)
  }

  if (loading) {
    return (
      <div className="chat-timeline">
        <div className="chat-placeholder">
          <p>🔄 Loading your beautiful conversations...</p>
        </div>
      </div>
    )
  }

  if (chatImages.length === 0) {
    return (
      <div className="chat-timeline">
        <div className="chat-placeholder">
          <div className="upload-instruction">
            <h3>💕 Ready for Your Sweet Conversations! 💕</h3>
            <p>To add chat screenshots:</p>
            <ol>
              <li>Copy your chat screenshots to: <code>ayushi/src/assets/chats/</code></li>
              <li>Supported formats: JPG, JPEG, PNG, GIF, WEBP</li>
              <li>Screenshots will automatically appear here!</li>
            </ol>
            <p>💬 Can't wait to see your beautiful conversations! 💬</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="chat-timeline">
        {chatImages.map((chat, index) => (
          <div 
            key={index} 
            className={`chat-item ${index % 2 === 0 ? 'left' : 'right'}`}
            onClick={() => openChatModal(chat)}
          >
            <div className="chat-content">
              <div className="chat-image">
                <img src={chat.src} alt={chat.title} />
                <div className="chat-overlay">
                  <span className="view-text">Click to view full conversation</span>
                </div>
              </div>
              <div className="chat-info">
                <h3>{chat.name}</h3>
                <p>One of our sweet conversation moments</p>
                <div className="chat-date">
                  <span>A beautiful memory 💕</span>
                </div>
              </div>
            </div>
            <div className="timeline-connector"></div>
          </div>
        ))}
      </div>

      {/* Chat Modal */}
      {selectedChat && (
        <div className="chat-modal" onClick={closeChatModal}>
          <div className="chat-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="chat-close" onClick={closeChatModal}>×</button>
            <img src={selectedChat.src} alt={selectedChat.title} />
            <div className="chat-caption">
              <h3>{selectedChat.name}</h3>
              <p>Another sweet moment in our conversation history 💬</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .chat-timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .chat-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, var(--primary-pink), var(--secondary-gold), var(--accent-purple));
          border-radius: 2px;
          transform: translateX(-50%);
        }

        .chat-item {
          position: relative;
          margin: 3rem 0;
          opacity: 0;
          animation: slideInTimeline 0.6s ease-out forwards;
        }

        .chat-item.left {
          padding-right: 50%;
        }

        .chat-item.right {
          padding-left: 50%;
        }

        .chat-item:nth-child(1) { animation-delay: 0.1s; }
        .chat-item:nth-child(2) { animation-delay: 0.2s; }
        .chat-item:nth-child(3) { animation-delay: 0.3s; }
        .chat-item:nth-child(4) { animation-delay: 0.4s; }
        .chat-item:nth-child(5) { animation-delay: 0.5s; }

        .chat-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
          position: relative;
        }

        .chat-item.left .chat-content {
          margin-right: 2rem;
        }

        .chat-item.right .chat-content {
          margin-left: 2rem;
        }

        .chat-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          border-color: var(--primary-pink);
        }

        .chat-image {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .chat-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .chat-content:hover .chat-image img {
          transform: scale(1.05);
        }

        .chat-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .chat-content:hover .chat-overlay {
          opacity: 1;
        }

        .view-text {
          color: white;
          font-size: 1.1rem;
          text-align: center;
          padding: 0.5rem;
        }

        .chat-info h3 {
          color: var(--secondary-gold);
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          text-transform: capitalize;
        }

        .chat-info p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        .chat-date {
          font-size: 0.9rem;
          color: var(--primary-pink);
        }

        .timeline-connector {
          position: absolute;
          width: 20px;
          height: 20px;
          background: var(--secondary-gold);
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          border: 4px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .chat-item.left .timeline-connector {
          right: -60px;
        }

        .chat-item.right .timeline-connector {
          left: -60px;
        }

        .chat-modal {
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

        .chat-modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .chat-modal-content img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 10px;
        }

        .chat-close {
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

        .chat-close:hover {
          background: var(--primary-pink);
          transform: scale(1.1);
        }

        .chat-caption {
          margin-top: 1rem;
          text-align: center;
          color: white;
        }

        .chat-caption h3 {
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

        @keyframes slideInTimeline {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .chat-timeline::before {
            left: 30px;
          }
          
          .chat-item {
            padding-left: 60px !important;
            padding-right: 0 !important;
          }
          
          .chat-content {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .timeline-connector {
            left: 20px !important;
            right: auto !important;
          }
          
          .chat-modal-content {
            max-width: 95%;
          }
        }
      `}</style>
    </>
  )
}

export default ChatTimeline 