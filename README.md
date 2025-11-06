# Kelly - AI Scientist Chatbot

An AI-powered chatbot that responds to questions about artificial intelligence in poetic verse, with a skeptical, analytical, and professional tone. Powered by Groq's LLaMA 3.3 70B model.

![Kelly Chatbot](https://img.shields.io/badge/AI-Poetry-blue) ![Status](https://img.shields.io/badge/status-active-success)

## 🌟 Features

- **Poetic AI Responses**: Every response is crafted in verse form
- **Skeptical Analysis**: Critical examination of AI claims and limitations
- **Planning Checklists**: Shows analytical approach before each response
- **Professional UI/UX**: Modern, designer-quality interface with glassmorphism
- **Groq-Powered**: Fast inference with LLaMA 3.3 70B Versatile model
- **Real-time Chat**: Interactive conversation interface
- **Responsive Design**: Works beautifully on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Groq API key (get free at [console.groq.com](https://console.groq.com/keys))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd kelly_poet_genai

# Install dependencies
npm install

# Create .env file
echo "VITE_GROQ_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment (No CLI Required!)

Your build is already complete (`npm run build` succeeded). Now deploy via web interface - **no command line needed**.

### Option 1: Deploy to Vercel (Recommended - 2 minutes)

1. **Push Your Code to GitHub**
   ```bash
   # Initialize git (if not done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Kelly AI Chatbot - Initial deployment"
   
   # Create repository on GitHub.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/kelly-chatbot.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel** (via Web Browser)
   - Go to [vercel.com](https://vercel.com)
   - Click **"Sign Up"** (use GitHub login)
   - Click **"Add New Project"**
   - Click **"Import"** next to your `kelly-chatbot` repository
   - Vercel auto-detects settings:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click **"Deploy"**
   - Wait ~1 minute

3. **Get Your Live URL**
   - Vercel shows: `https://kelly-chatbot-xxxxx.vercel.app`
   - Share this link with anyone! ✅

4. **Optional: Add Environment Variable**
   - Go to your project → **Settings** → **Environment Variables**
   - Add variable: `VITE_GROQ_API_KEY` = `your_key_here`
   - Click **"Save"**
   - Go to **Deployments** → Click **"..."** → **"Redeploy"**
   - *(This auto-fills API key for users, but they can still override in UI)*

### Option 2: Deploy to Netlify (Also Easy!)

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify** (via Web Browser)
   - Go to [netlify.com](https://netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"GitHub"** and authorize
   - Select your `kelly-chatbot` repository
   - Build settings (Netlify detects these):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click **"Deploy site"**
   - Wait ~1-2 minutes

3. **Get Your Live URL**
   - Netlify shows: `https://kelly-chatbot-xxxxx.netlify.app`
   - Can customize in **Site settings** → **Domain management**

4. **Optional: Add Environment Variable**
   - **Site settings** → **Environment variables** → **Add a variable**
   - Key: `VITE_GROQ_API_KEY`, Value: your key
   - **Save** → **Deploys** → **Trigger deploy**

### Important: API Key Security

⚠️ **Current Setup (Browser-Based)**:
- Users enter their own Groq API key via the settings ⚙️ button
- Key is stored in browser localStorage
- This is safe for personal/educational use

⚠️ **For Public Production Apps**:
- Consider creating a backend API to proxy Groq calls
- This keeps your API key server-side and hidden
- See "Advanced: Backend Proxy" section below

---

### Using Different LLM Providers

#### Option 1: OpenAI (Default)
Already configured in the code above.

#### Option 2: Anthropic Claude

1. Install Anthropic SDK:
```bash
npm install @anthropic-ai/sdk
```

2. Update `.env`:
```bash
VITE_ANTHROPIC_API_KEY=your-anthropic-key
```

3. In `src/services/llmService.js`, use the `generateKellyResponseClaude` function

#### Option 3: Google Gemini

1. Get API key from: https://makersuite.google.com/app/apikey

2. Update `.env`:
```bash
VITE_GOOGLE_API_KEY=your-google-key
```

3. Implement Gemini service (similar to OpenAI implementation)

## 📦 Deployment

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Build the project
npm run build

# Deploy
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Project name: kelly-ai-chatbot
# - Directory: ./
# - Build command: npm run build
# - Output directory: dist
```

You'll get a live URL like: `https://kelly-ai-chatbot.vercel.app`

#### Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add: `VITE_OPENAI_API_KEY` with your API key
4. Redeploy the project

### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Environment Variables on Netlify

1. Go to Site Settings → Environment Variables
2. Add: `VITE_OPENAI_API_KEY`
3. Trigger a new deploy

### Option 3: GitHub Pages with Custom Backend

Since GitHub Pages only serves static files, you'll need a separate backend for API calls:
```bash
# Deploy frontend to GitHub Pages
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/kelly-ai-chatbot",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

**Note**: For GitHub Pages, consider creating a separate backend service (e.g., on Vercel/Netlify) to handle API calls securely.

## 🔒 Security Best Practices

### ⚠️ Important: API Key Security

The current implementation uses `dangerouslyAllowBrowser: true` for demonstration purposes. This exposes your API key in the browser.

**For Production:**

1. **Create a Backend Server** (Recommended)
```javascript
// backend/server.js (Node.js + Express example)
import express from 'express'
import OpenAI from 'openai'

const app = express()
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.post('/api/generate', async (req, res) => {
  try {
    const { question } = req.body
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [/* your messages */]
    })
    res.json({ response: response.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => console.log('Server running on port 3001'))
```

2. **Update Frontend to Call Backend**
```javascript
// src/services/llmService.js
export async function generateKellyResponse(question) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  })
  return response.json()
}
```

3. **Deploy Backend Separately** (e.g., Railway, Render, Fly.io)

## 📁 Project Structure
```
kelly-ai-chatbot/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx   # Main chat component
│   │   ├── MessageBubble.jsx   # Individual message display
│   │   ├── PlanningChecklist.jsx  # Analysis checklist display
│   │   └── ApiKeyModal.jsx     # API key configuration modal
│   ├── services/
│   │   ├── llmService.js       # LLM API integration
│   │   └── promptTemplates.js  # System prompts for Kelly
│   ├── utils/
│   │   └── responseValidator.js  # Response quality validation
│   ├── styles/
│   │   └── App.css             # Application styles
│   ├── App.jsx                 # Root component
│   └── index.jsx               # React entry point
├── .env                        # Environment variables (git-ignored)
├── .env.example                # Example environment file
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🎨 Customization

### Changing the Poetic Style

Edit `src/services/promptTemplates.js`:
```javascript
export const SYSTEM_PROMPT = `You are Kelly, an AI Scientist Chatbot...

STYLE GUIDELINES:
- Use [Shakespearean sonnets / haiku / free verse / etc.]
- ...
`
```

### Adjusting Skepticism Level

Modify the prompt to be more or less skeptical:
```javascript
// More skeptical
"You are EXTREMELY skeptical and critical of all AI claims..."

// Less skeptical
"You are thoughtfully skeptical while acknowledging AI's genuine capabilities..."
```

### Adding More LLM Models

1. Update `package.json` with new SDK
2. Create new service function in `llmService.js`
3. Add model selection UI in `ApiKeyModal.jsx`

## 🧪 Testing

Test the chatbot with these sample questions:

1. "Can AI replace all programmers?"
2. "Will we achieve AGI in 5 years?"
3. "Is AI biased?"
4. "Can AI be creative?"
5. "Should I trust AI-generated content?"

## 🐛 Troubleshooting

### API Key Issues

**Error**: `Invalid API key`
- Verify your API key is correct
- Check it starts with `sk-`
- Ensure no extra spaces

**Error**: `Rate limit exceeded`
- You've hit OpenAI's rate limit
- Wait a few minutes
- Consider upgrading your OpenAI plan

### Build Issues

**Error**: `Module not found`
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error**: Vite build fails
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### CORS Issues (Production)

If you see CORS errors:
- Implement a proper backend server
- Don't call OpenAI API directly from browser
- Use a proxy service

## 💰 Cost Considerations

- **GPT-4**: ~$0.03 per 1K tokens (input) + $0.06 per 1K tokens (output)
- **GPT-3.5-Turbo**: ~$0.0015 per 1K tokens (much cheaper)
- Average conversation: $0.01 - $0.05 per exchange

**Cost Reduction Tips**:
1. Use GPT-3.5-Turbo for development
2. Implement response caching
3. Set `max_tokens` limit
4. Add rate limiting

## 📚 Learning Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Prompt Engineering Guide](https://www.promptingguide.ai)

## 🤝 Contributing

This is an educational project. Feel free to:
- Add new LLM providers
- Improve prompt engineering
- Enhance the UI/UX
- Add more validation features

## 📄 License

MIT License - feel free to use for educational purposes

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the OpenAI API status page
3. Verify your API key and billing status
4. Check browser console for errors

## 🎓 Assignment Notes

This project demonstrates:
- ✅ LLM API integration (OpenAI GPT-4)
- ✅ Prompt engineering for consistent poetic responses
- ✅ System design with Kelly's skeptical personality
- ✅ Response validation and quality control
- ✅ Modern React development practices
- ✅ Professional deployment strategies

**Key Learning Outcomes**:
1. How to integrate LLM APIs into applications
2. Prompt engineering for consistent character/tone
3. Building conversational interfaces
4. Managing API keys securely
5. Deploying AI-powered applications