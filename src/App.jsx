import React, { useState, useEffect } from 'react'
import ChatInterface from './components/ChatInterface'
import ApiKeyModal from './components/ApiKeyModal'

export default function App() {
  const [apiKey, setApiKey] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check for API key in env or localStorage
    const envKey = import.meta.env.VITE_GROQ_API_KEY
    const storedKey = localStorage.getItem('groq_api_key')
    
    if (envKey) {
      // Use environment variable key (no modal needed)
      setApiKey(envKey)
      setShowModal(false)
    } else if (storedKey) {
      // Use stored key from previous session
      setApiKey(storedKey)
      setShowModal(false)
    } else {
      // No key available, show modal
      setShowModal(true)
    }
  }, [])

  const handleApiKeySubmit = (key) => {
    setApiKey(key)
    localStorage.setItem('groq_api_key', key)
    setShowModal(false)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Kelly</h1>
        <p>AI Scientist Chatbot - Skeptical Analysis in Verse</p>
        <button 
          className="settings-btn"
          onClick={() => setShowModal(true)}
          title="Update API Key"
        >
          ⚙️
        </button>
      </header>
      
      {apiKey ? (
        <ChatInterface apiKey={apiKey} />
      ) : (
        <div className="waiting-message">
          <p>Please configure your API key to begin.</p>
        </div>
      )}

      {showModal && (
        <ApiKeyModal 
          onSubmit={handleApiKeySubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}