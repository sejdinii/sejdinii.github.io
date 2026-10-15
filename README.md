# Portfolio with CV Chat

**Live:** https://sejdinii.github.io

My personal portfolio site, where visitors can ask an AI assistant about my CV, skills and projects instead of reading a PDF.

> My newer, full version of this idea is **TalkCV**: https://talk-cv.vercel.app/enessejdini

## How it works

- **Site:** static HTML, CSS and vanilla JavaScript on GitHub Pages, with a project section, CV download and a light/dark theme. The theme toggle is accessible (`aria-pressed`, screen-reader announcements).
- **Chat:** the browser sends each question to a **Cloudflare Worker**. The worker adds the Groq API key server-side and forwards the request to Groq's chat-completions API, so the key never reaches the browser. The worker accepts only POST requests and checks the request origin.
- **Knowledge:** the assistant answers from structured profile content (CV, projects, skills) in `js/config.js`.

## Structure

```
index.html        page
css/style.css     styling and themes
js/config.js      profile content, projects, chat settings
js/app.js         chat logic, navigation, theme, accessibility
assets/cv.pdf     downloadable CV
worker/worker.js  Cloudflare Worker (API proxy, deployed separately)
```

## Run your own

1. Deploy `worker/worker.js` as a Cloudflare Worker and add a `GROQ_API_KEY` secret.
2. Put the worker URL in `js/config.js` (`api.endpoint`) and your own details in the same file.
3. Publish the rest of the files with GitHub Pages.
