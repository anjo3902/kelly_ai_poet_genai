import React, { useState } from 'react'
import { Key, X } from 'lucide-react'

export default function ApiKeyModal({ onSubmit, onClose }) {
  const [key, setKey] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (key.trim()) {
      onSubmit(key.trim())
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <Key size={48} />
          <h2>Configure API Key</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>API Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your API key..."
              required
            />
            <small>
              Get your free API key from{' '}
              <a 
                href="https://console.groq.com/keys" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Groq Console
              </a>
            </small>
          </div>

          <button type="submit" className="submit-btn">
            Save & Continue
          </button>
        </form>

        <div className="modal-note">
          <p>💡 Your API key is stored locally and securely in your browser.</p>
        </div>
      </div>
    </div>
  )
}