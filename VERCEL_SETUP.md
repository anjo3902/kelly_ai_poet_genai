# 🔑 IMPORTANT: Vercel Setup for Auto API Key

## The Problem
Users should NOT see the API key modal. The app should work immediately.

## The Solution
Set your Groq API key as an environment variable in Vercel:

---

## 📋 Step-by-Step Setup on Vercel

### After you deploy to Vercel:

1. **Go to your Vercel project dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click on your `kelly_ai_poet_genai` project

2. **Add Environment Variable**
   - Click **"Settings"** (top menu)
   - Click **"Environment Variables"** (left sidebar)
   - Click **"Add New"** button

3. **Enter these details**:
   ```
   Key:   VITE_GROQ_API_KEY
   Value: [YOUR GROQ API KEY FROM .env FILE]
   ```
   
   📝 **Get your key from**: `E:\kelly_poet_genai\.env` file
   - Open the `.env` file
   - Copy the value after `VITE_GROQ_API_KEY=`
   - Paste it in Vercel
   
4. **Select Environments**:
   - ✅ Check **Production**
   - ✅ Check **Preview**
   - ✅ Check **Development**

5. **Click "Save"**

6. **Redeploy**:
   - Go to **"Deployments"** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**
   - Wait ~1 minute

---

## ✅ Result

After redeployment:
- ✅ Users open the app
- ✅ No API key modal appears
- ✅ Chat works immediately
- ✅ Users can still change the key via ⚙️ settings if needed

---

## 🎯 Your API Key

Open your local `.env` file to get the API key:

```bash
# File location: E:\kelly_poet_genai\.env
VITE_GROQ_API_KEY=[your key is here]
```

Copy the key value and paste it into Vercel Environment Variables.

---

## 🔒 Security Note

- ✅ The API key is NOT in the GitHub repository (secure)
- ✅ It's only in Vercel's environment variables (secure)
- ✅ It will be embedded in the built JavaScript (visible to users)
- ⚠️ Users can see it in browser DevTools (this is expected for client-side apps)

For better security (optional):
- Create a backend API to proxy Groq calls
- This keeps the API key completely hidden server-side

---

## 🚀 Quick Start Commands

If you haven't deployed yet:

```bash
# Already done - code is on GitHub!
# Just go to vercel.com and click "Import"
```

That's it! Your users will never see the API key prompt. 🎉
