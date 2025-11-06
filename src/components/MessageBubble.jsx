import React from 'react'

export default function MessageBubble({ message }) {
  return (
    <div className={`message ${message.role} ${message.isError ? 'error' : ''}`}>
      <div className="message-content">
        {message.isPoem ? (
          <pre className="poem">{message.content}</pre>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  )
}