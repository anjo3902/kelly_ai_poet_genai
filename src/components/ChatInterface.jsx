import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'
import MessageBubble from './MessageBubble'
import PlanningChecklist from './PlanningChecklist'
import { generateKellyResponse } from '../services/llmService'

export default function ChatInterface({ apiKey }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `In verses measured, skeptic's art,\nI greet you with a questioning heart.\nAsk me of AI's grandiose claim,\nI'll parse the truth from hype's bright flame.\n\nWith evidence and critical eye,\nI'll help you see through marketing's lie.\nWhat would you know? What shall we explore?\nCome, let us question AI's core.`,
      isPoem: true
    }
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentChecklist, setCurrentChecklist] = useState(null)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentChecklist])

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)
    setError(null)

    try {
      // Generate response using LLM
      const response = await generateKellyResponse(input, apiKey)
      
      // Show checklist
      setCurrentChecklist(response.checklist)
      
      // Wait a moment for user to see checklist
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Add assistant response
      const assistantMessage = {
        role: 'assistant',
        content: response.poem,
        isPoem: true,
        validation: response.validation
      }
      setMessages(prev => [...prev, assistantMessage])
      setCurrentChecklist(null)
      
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Failed to generate response. Please check your API key.')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'My apologies, an error occurred while composing my verse. Please try again.',
        isPoem: false,
        isError: true
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        
        {currentChecklist && <PlanningChecklist items={currentChecklist} />}
        
        {isProcessing && !currentChecklist && (
          <div className="typing-indicator">
            <Loader className="spinner" size={24} />
            <span>Kelly is composing her verse...</span>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Kelly about AI..."
          disabled={isProcessing}
          rows={2}
        />
        <button 
          onClick={handleSend} 
          disabled={isProcessing || !input.trim()}
          title="Send message"
        >
          {isProcessing ? <Loader className="spinner" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </div>
  )
}