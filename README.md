# Enes Sejdini — CV Chat Website

Personal portfolio with an AI chatbot that answers questions about your CV.

## Project Structure

```
cv-site/
├── index.html              ← Main page
├── css/style.css           ← All styling + themes
├── js/
│   ├── config.js           ← Your info, projects, CV data, API endpoint
│   └── app.js              ← Chat logic, navigation, accessibility
├── assets/
│   └── cv.pdf              ← Downloadable CV
└── worker/
    └── worker.js           ← Cloudflare Worker (API proxy)
```

---

## Deployment Guide (3 steps)

### Step 1: Deploy Cloudflare Worker (API proxy)

This keeps your Groq API key secret.

1. **Get a Groq API key**
   - Go to [console.groq.com](https://console.groq.com)
   - Create account → API Keys → Create new key
   - Copy it

2. **Create the Cloudflare Worker**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com) → create account (free)
   - Click **"Workers & Pages"** in the left sidebar
   - Click **"Create"** → **"Create Worker"**
   - Name it `cv-chat-proxy` (or whatever you like)
   - Click **"Deploy"** (deploys the hello world template)
   - Click **"Edit Code"**
   - Delete everything and paste the contents of `worker/worker.js`
   - Click **"Deploy"**

3. **Add your API key as a secret**
   - Go back to the worker dashboard
   - Click **"Settings"** → **"Variables and Secrets"**
   - Under **"Secrets"**, click **"Add"**
   - Name: `GROQ_API_KEY`
   - Value: paste your Groq API key
   - Click **"Save"**

4. **Copy your Worker URL**
   - It looks like: `https://cv-chat-proxy.YOUR-SUBDOMAIN.workers.dev`
   - Update this URL in `js/config.js` → `api.endpoint`

---

### Step 2: Deploy to GitHub Pages

1. **Create a new GitHub repo**
   - Go to [github.com/new](https://github.com/new)
   - Name it `sejdinii.github.io` (for root domain) or any name like `cv-site`
   - Set to **Public**
   - Click **Create repository**

2. **Upload your files**
   
   Option A — **GitHub web upload** (easiest):
   - On the repo page, click **"uploading an existing file"**
   - Drag and drop ALL files from the `cv-site` folder:
     - `index.html`
     - `css/style.css`
     - `js/config.js`
     - `js/app.js`
     - `assets/cv.pdf`
   - (Do NOT upload the `worker/` folder — that's for Cloudflare only)
   - Click **"Commit changes"**

   Option B — **Git command line**:
   ```bash
   cd cv-site
   git init
   git add index.html css/ js/ assets/
   git commit -m "Initial deploy"
   git branch -M main
   git remote add origin https://github.com/sejdinii/sejdinii.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repo **Settings** → **Pages**
   - Source: **"Deploy from a branch"**
   - Branch: **main** / **/ (root)**
   - Click **Save**
   - Wait 1-2 minutes

4. **Your site is live at:**
   - `https://sejdinii.github.io` (if repo name is `sejdinii.github.io`)
   - or `https://sejdinii.github.io/cv-site` (if repo name is `cv-site`)

---

### Step 3: Update CORS origins

After you know your GitHub Pages URL:

1. Go to Cloudflare dashboard → Workers → `cv-chat-proxy` → Edit Code
2. Update `ALLOWED_ORIGINS` array with your actual GitHub Pages URL
3. Deploy

---

## Update your Worker URL in config

Open `js/config.js` and replace:
```js
endpoint: "https://cv-chat-proxy.YOUR-SUBDOMAIN.workers.dev"
```
with your actual Cloudflare Worker URL.

---

## Done! 🎉

Your site should now be fully working:
- Visitors chat with your AI at your GitHub Pages URL
- API key is safely hidden behind Cloudflare Worker
- Everything is free

---

## Updating your CV later

- **Change personal info / CV data** → edit `js/config.js`
- **Change design / colors** → edit `css/style.css`
- **Change behavior / features** → edit `js/app.js`
- **Update PDF** → replace `assets/cv.pdf`
- Then push to GitHub again
