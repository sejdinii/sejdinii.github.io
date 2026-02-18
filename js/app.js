// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
let conversationHistory = [];
let isLoading = false;
const firstName = CONFIG.name.split(' ')[0];

// ═══════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cv-theme', theme);
  const lightBtn = document.getElementById('toggleLight');
  const darkBtn = document.getElementById('toggleDark');
  lightBtn.classList.toggle('active', theme === 'light');
  darkBtn.classList.toggle('active', theme === 'dark');
  lightBtn.setAttribute('aria-pressed', theme === 'light');
  darkBtn.setAttribute('aria-pressed', theme === 'dark');
  announce(theme === 'light' ? 'Switched to light mode' : 'Switched to dark mode');
}

const savedTheme = localStorage.getItem('cv-theme') || 'light';
setTheme(savedTheme);

// ═══════════════════════════════════════════════════════════════
// ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════
function announce(text) {
  const el = document.getElementById('srAnnounce');
  if (el) {
    el.textContent = '';
    setTimeout(() => { el.textContent = text; }, 50);
  }
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
function init() {
  document.getElementById('heroBrandName').textContent = CONFIG.name;
  document.getElementById('heroBadge').textContent = CONFIG.location + ' · Seeking ML / Data Science Internship';
  document.getElementById('heroTitle').textContent = CONFIG.name;
  document.getElementById('heroSubtitle').textContent = CONFIG.title;
  document.getElementById('heroTagline').textContent = CONFIG.tagline;

  const heroLinks = document.getElementById('heroLinksContainer');
  CONFIG.links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'hero-link'; a.textContent = l.label;
    a.setAttribute('aria-label', l.label);
    heroLinks.appendChild(a);
  });

  const heroSug = document.getElementById('heroSuggestions');
  CONFIG.suggestions.forEach(q => {
    const b = document.createElement('button');
    b.className = 'hero-chip'; b.textContent = q;
    b.setAttribute('role', 'listitem');
    b.onclick = () => openChat(q);
    heroSug.appendChild(b);
  });

  document.getElementById('footerYear').textContent = new Date().getFullYear();
  const footerLinks = document.getElementById('footerLinks');
  CONFIG.links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'footer-link'; a.textContent = l.label;
    footerLinks.appendChild(a);
  });

  document.getElementById('sidebarTitle').textContent = firstName + "'s CV";
  document.getElementById('chatModelLabel').textContent = CONFIG.name;
  document.getElementById('chatWelcomeTitle').textContent = "Hi, I'm " + firstName + "'s AI assistant";
  document.getElementById('chatWelcomeSub').textContent = "Ask me anything about " + firstName + "'s professional background";
  document.getElementById('footerName').textContent = firstName;

  const chatLinks = document.getElementById('chatHeaderLinks');
  CONFIG.links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'header-link'; a.textContent = l.label;
    chatLinks.appendChild(a);
  });

  const chatSug = document.getElementById('chatSuggestions');
  CONFIG.suggestions.forEach(q => {
    const b = document.createElement('button');
    b.className = 'chat-chip'; b.textContent = q;
    b.setAttribute('role', 'listitem');
    b.onclick = () => sendMessage(q);
    chatSug.appendChild(b);
  });

  const infoLinks = document.getElementById('sidebarInfoLinks');
  CONFIG.links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'sidebar-info-link'; a.textContent = l.label;
    infoLinks.appendChild(a);
  });

  if (CONFIG.links[1]) {
    document.getElementById('sidebarLinkedIn').onclick = () => window.open(CONFIG.links[1].url);
  }

  const inp = document.getElementById('chatInput');
  inp.addEventListener('input', () => {
    document.getElementById('sendBtn').disabled = !inp.value.trim();
  });

  renderProjects();

  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  PROJECTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="project-card-emoji" aria-hidden="true">${p.emoji}</div>
      <h3 class="project-card-title">${p.title}</h3>
      <p class="project-card-desc">${p.description}</p>
      <div class="project-card-tags" aria-label="Technologies used">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      ${p.stats ? `<div class="project-card-stats">${p.stats}</div>` : ''}
    `;
    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════
let projectsReturnTo = 'hero';

function openProjects(from) {
  projectsReturnTo = from || 'hero';
  document.getElementById('heroSection').classList.add('hidden');
  document.getElementById('chatApp').classList.remove('active');
  document.getElementById('projectsView').classList.add('active');
  document.body.style.overflow = '';
  announce('Viewing projects');
  window.scrollTo(0, 0);
}

function closeProjects() {
  document.getElementById('projectsView').classList.remove('active');
  if (projectsReturnTo === 'chat') {
    document.getElementById('chatApp').classList.add('active');
    document.body.style.overflow = 'hidden';
    announce('Back to chat');
  } else {
    document.getElementById('heroSection').classList.remove('hidden');
    document.body.style.overflow = '';
    announce('Back to homepage');
    window.scrollTo(0, 0);
  }
}

function openChat(initialQ) {
  document.getElementById('heroSection').classList.add('hidden');
  document.getElementById('projectsView').classList.remove('active');
  document.getElementById('chatApp').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('chatInput').focus();
  announce('Chat opened');
  if (initialQ) setTimeout(() => sendMessage(initialQ), 300);
}

function closeChat() {
  document.getElementById('chatApp').classList.remove('active');
  document.body.style.overflow = '';
  closeSidebar();
}

function goBack() {
  document.getElementById('chatApp').classList.remove('active');
  document.getElementById('projectsView').classList.remove('active');
  document.getElementById('heroSection').classList.remove('hidden');
  document.body.style.overflow = '';
  closeSidebar();
  announce('Back to homepage');
  window.scrollTo(0, 0);
}

// ═══════════════════════════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════════════════════════
async function sendMessage(text) {
  const input = document.getElementById('chatInput');
  const userMsg = text || input.value.trim();
  if (!userMsg || isLoading) return;

  document.getElementById('chatWelcome').style.display = 'none';
  document.getElementById('messagesArea').style.display = 'block';

  addMsg('user', userMsg);
  conversationHistory.push({ role: 'user', content: userMsg });

  input.value = '';
  input.style.height = 'auto';
  document.getElementById('sendBtn').disabled = true;

  isLoading = true;
  showTyping();
  announce('Thinking...');

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (CONFIG.api.key) {
      headers['Authorization'] = 'Bearer ' + CONFIG.api.key;
    }

    const res = await fetch(CONFIG.api.endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model: CONFIG.api.model,
        messages: [{ role: 'system', content: CV_DATA }, ...conversationHistory],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";

    hideTyping();
    addMsg('assistant', reply);
    conversationHistory.push({ role: 'assistant', content: reply });
    announce('Response received');
  } catch (err) {
    console.error(err);
    hideTyping();
    addMsg('assistant',
      "⚠️ Couldn't connect to the AI service.\n\nTo activate this chat:\n1. Get a free API key at console.groq.com\n2. Replace PASTE_YOUR_GROQ_KEY_HERE in js/config.js\n\nThat's it!"
    );
    announce('Error connecting to AI');
  } finally {
    isLoading = false;
    input.focus();
  }
}

function addMsg(role, content) {
  const area = document.getElementById('messagesArea');
  const row = document.createElement('div');
  row.className = 'msg-row ' + role;
  row.setAttribute('role', 'article');
  row.setAttribute('aria-label', role === 'user' ? 'Your message' : 'AI response');

  if (role === 'user') {
    row.innerHTML = '<div class="user-bubble">' + esc(content) + '</div>';
  } else {
    row.innerHTML = '<div class="ai-text">' + fmt(content) + '</div>';
  }
  area.appendChild(row);
  scrollBottom();
}

function showTyping() {
  const area = document.getElementById('messagesArea');
  const row = document.createElement('div');
  row.className = 'typing-row'; row.id = 'typingIndicator';
  row.setAttribute('aria-label', 'AI is typing');
  row.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  area.appendChild(row);
  scrollBottom();
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function resetChat() {
  conversationHistory = [];
  document.getElementById('messagesArea').innerHTML = '';
  document.getElementById('messagesArea').style.display = 'none';
  document.getElementById('chatWelcome').style.display = 'flex';
  document.getElementById('chatInput').focus();
  closeSidebar();
  announce('Chat cleared');
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function fmt(text) {
  let h = esc(text);
  h = h.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/`(.*?)`/g, '<code>$1</code>');
  h = h.replace(/^[•\-]\s+(.+)$/gm, '• $1');
  h = h.split(/\n\n+/).map(p => '<p>' + p.trim() + '</p>').join('');
  h = h.replace(/\n/g, '<br>');
  return h;
}

function scrollBottom() {
  const c = document.getElementById('messagesContainer');
  requestAnimationFrame(() => { c.scrollTop = c.scrollHeight; });
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 150) + 'px';
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  const isOpen = sb.classList.toggle('open');
  ov.classList.toggle('visible');
  ov.setAttribute('aria-hidden', !isOpen);
  announce(isOpen ? 'Sidebar opened' : 'Sidebar closed');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  const ov = document.getElementById('sidebarOverlay');
  ov.classList.remove('visible');
  ov.setAttribute('aria-hidden', 'true');
}

// ═══════════════════════════════════════════════════════════════
// KEYBOARD
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('sidebar').classList.contains('open')) {
      closeSidebar();
    } else if (document.getElementById('chatApp').classList.contains('active')) {
      goBack();
    } else if (document.getElementById('projectsView').classList.contains('active')) {
      closeProjects();
    }
  }
});

// ═══════════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════════
init();