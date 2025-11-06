import OpenAI from 'openai'
import { SYSTEM_PROMPT, generateUserPrompt, generateChecklistPrompt } from './promptTemplates'
import { validateResponse } from '../utils/responseValidator'

export async function generateKellyResponse(question, apiKey) {
  // Configure for Groq API (OpenAI-compatible SDK)
  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
    dangerouslyAllowBrowser: true // Note: In production, use a backend server
  })

  try {
    // Step 1: Generate planning checklist
    const checklistResponse = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Current Groq model (Nov 2024+)
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates analytical checklists.' },
        { role: 'user', content: generateChecklistPrompt(question) }
      ],
      temperature: 0.7,
      max_tokens: 300
    })

    let checklist = []
    try {
      const checklistText = checklistResponse.choices[0].message.content.trim()
      checklist = JSON.parse(checklistText)
    } catch (e) {
      // Fallback if JSON parsing fails
      checklist = [
        'Identify core AI claims in the question',
        'Apply skeptical analysis framework',
        'Reference current limitations and research',
        'Provide evidence-based perspective',
        'Offer practical recommendations'
      ]
    }

    // Step 2: Generate poetic response
    const poemResponse = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Current Groq model for creative responses
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: generateUserPrompt(question) }
      ],
      temperature: 0.8,
      max_tokens: 1000
    })

    const poem = poemResponse.choices[0].message.content.trim()

    // Step 3: Validate response
    const validation = validateResponse(poem)

    return {
      checklist,
      poem,
      validation: validation.message
    }

  } catch (error) {
    console.error('LLM Service Error:', error)
    
    if (error.status === 401) {
      throw new Error('Invalid API key. Please check your Groq API key.')
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.')
    } else if (error.status === 500) {
      throw new Error('Groq service error. Please try again.')
    } else {
      throw new Error('Failed to generate response: ' + (error.message || 'Unknown error'))
    }
  }
}

// Alternative: Anthropic Claude implementation
export async function generateKellyResponseClaude(question, apiKey) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `${SYSTEM_PROMPT}\n\n${generateUserPrompt(question)}`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const poem = data.content[0].text

    const checklist = [
      'Examine AI claims skeptically',
      'Analyze technical limitations',
      'Reference research evidence',
      'Highlight practical constraints',
      'Provide measured recommendations'
    ]

    const validation = validateResponse(poem)

    return { checklist, poem, validation: validation.message }

  } catch (error) {
    throw new Error('Failed to generate response: ' + error.message)
  }
}