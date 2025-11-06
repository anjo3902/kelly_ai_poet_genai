# 🎭 Kelly - AI Scientist Poet Chatbot

An AI-powered chatbot that responds to questions about artificial intelligence in poetic verse, with a skeptical, analytical, and professional tone. Powered by Groq's LLaMA 3.3 70B model.

![Kelly Chatbot](https://img.shields.io/badge/AI-Poetry-blue) ![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-orange) ![Status](https://img.shields.io/badge/status-live-success)

## 🌟 Features

- 🎨 **Poetic AI Responses** - Every response crafted in verse form
- 🔍 **Skeptical Analysis** - Critical examination of AI claims and limitations  
- ✅ **Planning Checklists** - Shows analytical approach before each response
- 💎 **Premium UI/UX** - Modern glassmorphism design with smooth animations
- ⚡ **Lightning Fast** - Powered by Groq's LLaMA 3.3 70B Versatile model
- 💬 **Real-time Chat** - Seamless conversational interface
- 📱 **Fully Responsive** - Works beautifully on all devices


## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Groq API key ([Get free at console.groq.com](https://console.groq.com/keys))

### Local Development

```bash
# Install dependencies
npm install

# Create .env file with your Groq API key
echo VITE_GROQ_API_KEY=your_groq_api_key_here > .env

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - the app will use your API key automatically!

---

## 🌐 Deployment

### Deploy to Vercel (Recommended - 2 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kelly-chatbot.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com) and sign up with GitHub
   - Click **"Add New Project"** → **"Import"** your repository
   - Vercel auto-detects Vite settings
   - Click **"Deploy"** and wait ~1 minute
   - Get your live URL: `https://your-project.vercel.app`

3. **Add API Key (Important!)**
   - In Vercel dashboard → **Settings** → **Environment Variables**
   - Add: `VITE_GROQ_API_KEY` = `your_groq_api_key`
   - Check all environments (Production, Preview, Development)
   - **Save** → Go to **Deployments** → **Redeploy**
   
   ✅ Now users can use the app immediately without entering an API key!

### Deploy to Netlify

1. Push code to GitHub (same as above)
2. Visit [netlify.com](https://netlify.com) → **"Add new site"** → **"Import from Git"**
3. Select your repository
4. Build settings: `npm run build`, output: `dist`
5. Add environment variable: `VITE_GROQ_API_KEY`
6. Deploy!

---

## 📁 Project Structure

```
kelly_poet_genai/
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx      # Main chat UI
│   │   ├── MessageBubble.jsx      # Individual messages
│   │   ├── PlanningChecklist.jsx  # Analysis display
│   │   └── ApiKeyModal.jsx        # API key settings
│   ├── services/
│   │   ├── llmService.js          # Groq API integration
│   │   └── promptTemplates.js     # Kelly's personality prompts
│   ├── utils/
│   │   └── responseValidator.js   # Response validation
│   ├── styles/
│   │   └── App.css                # Design system & styles
│   ├── App.jsx                    # Root component
│   └── index.jsx                  # React entry point
├── index.html                     # HTML entry
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── vercel.json                    # Vercel deployment config
└── netlify.toml                   # Netlify deployment config
```

---

## 🎨 Customization

### Change Poetic Style

Edit `src/services/promptTemplates.js`:

```javascript
export const SYSTEM_PROMPT = `You are Kelly, an AI Scientist Chatbot...

POETIC STYLE:
- Use [sonnets / haiku / free verse / etc.]
- Maintain [formal / casual / playful] tone
...`
```

### Adjust Skepticism Level

```javascript
// More skeptical
"You are EXTREMELY critical and question all AI capabilities..."

// Balanced
"You thoughtfully examine both strengths and limitations..."
```

### Switch LLM Models

In `src/services/llmService.js`, change the model:

```javascript
model: 'llama-3.3-70b-versatile',  // Current (fast, balanced)
// OR
model: 'llama-3.1-8b-instant',     // Faster, cheaper
```

---

## 🧪 Test Questions

Try asking Kelly:

1. "Can AI replace human programmers?"
2. "Will we achieve AGI in 5 years?"
3. "Is AI truly creative?"
4. "Can we trust AI-generated content?"
5. "What are the limits of machine learning?"

---

## 🐛 Troubleshooting

### "Invalid API key" error

- Verify your Groq API key starts with `gsk_`
- Check `.env` file has: `VITE_GROQ_API_KEY=gsk_...`
- For Vercel: Ensure environment variable is set and redeployed

### Build fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### CORS errors in production

The app runs client-side, so no CORS issues. If you see them:
- Check browser console for actual error
- Verify Groq API endpoint is correct

---

## 💰 Cost Information

**Groq Pricing** (as of 2024):
- ✅ **Free tier**: Generous rate limits for development
- ⚡ **Paid tier**: $0.10 per million tokens (very affordable)
- 📊 **Average chat**: 500-2000 tokens (~$0.0001-0.0002 per message)

Much cheaper than OpenAI GPT-4! Perfect for learning and prototyping.

---

## � Security Notes

**Current Setup (Client-Side)**:
- API key is embedded in the frontend JavaScript
- Users can view it in browser DevTools (acceptable for personal/educational use)
- Groq API key has usage limits to prevent abuse

**For Production/Public Apps**:
Consider creating a backend proxy:

```javascript
// backend/server.js (example with Express)
app.post('/api/chat', async (req, res) => {
  const response = await groqClient.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: req.body.messages
  })
  res.json(response)
})
```

This keeps your API key server-side and fully hidden.

---

## 🎓 What You'll Learn

This project demonstrates:
- ✅ Modern React development (hooks, state management, components)
- ✅ LLM API integration (Groq/OpenAI-compatible)
- ✅ Prompt engineering for consistent AI personalities
- ✅ Professional UI/UX design (glassmorphism, animations, design tokens)
- ✅ Deployment strategies (Vercel, Netlify)
- ✅ Environment variable management
- ✅ Real-world chatbot architecture

---

## 📚 Resources

- [Groq API Docs](https://console.groq.com/docs)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Prompt Engineering Guide](https://www.promptingguide.ai)

---

## 📄 License

MIT License - Free for educational and personal use

---

## 🤝 Contributing

Feel free to fork and enhance:
- Add more LLM providers (OpenAI, Anthropic, etc.)
- Improve prompt engineering
- Enhance UI with dark mode
- Add conversation history/export

---

## 🆘 Support

Issues? Check:
1. Browser console for errors
2. Groq API status: [status.groq.com](https://status.groq.com)
3. Your API key and rate limits
4. Environment variables are set correctly

---

**Built with ❤️ for AI education and creative exploration**

*Ask Kelly a question and discover skeptical poetry about artificial intelligence!*