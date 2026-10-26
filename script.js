// Footer year
document.getElementById('actualyear').textContent = '© ' + new Date().getFullYear() + ' Rúben Mano';


// Theme toggle: follows the system setting until the visitor picks one
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function savedTheme() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}
systemDark.addEventListener('change', (e) => {
  if (savedTheme()) return;
  root.dataset.theme = e.matches ? 'dark' : 'light';
  labelToggle();
});

function currentTheme() {
  return root.dataset.theme || 'light';
}
function labelToggle() {
  toggle.setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
toggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
  labelToggle();
});
labelToggle();


// Hero chat: scripted replies, no AI behind them
const REPLIES = {
  work: {
    text: 'Four featured projects across aviation, telehealth, the public sector and AI, plus more in banking and education. ',
    link: { href: '#work', label: 'Jump to the work ↓' }
  },
  lab: {
    text: "I lead the AI Lab at Insol. I build AI demos and proofs of concept, and help companies see where AI agents fit into the systems they already run. ",
    link: { href: '#path', label: 'See how I got here ↓' }
  },
  cv: {
    text: "Of course. ",
    link: { href: 'ruben_mano_cv.pdf', label: 'Download my CV (PDF)', download: true }
  }
};

const thread = document.getElementById('chat-thread');

function bubble(className, children) {
  const p = document.createElement('p');
  p.className = 'bubble bubble-new ' + className;
  children.forEach((child) => p.append(child));
  return p;
}

document.querySelectorAll('.chip[data-reply]').forEach((chip) => {
  chip.addEventListener('click', () => {
    const reply = REPLIES[chip.dataset.reply];
    if (!reply) return;

    const question = bubble('bubble-visitor', [chip.textContent]);

    const link = document.createElement('a');
    link.href = reply.link.href;
    link.textContent = reply.link.label;
    if (reply.link.download) link.setAttribute('download', '');

    const row = document.createElement('div');
    row.className = 'reply';
    row.append(bubble('bubble-ruben', [reply.text, link]));

    thread.append(question, row);
    chip.disabled = true;
  });
});


// Contact form (Formspree)
document.getElementById('ct-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const button = form.querySelector('button[type="submit"]');
  const error = document.getElementById('ct-error');
  error.hidden = true;
  button.disabled = true;
  try {
    const res = await fetch('https://formspree.io/f/mgonrrvj', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Formspree returned ' + res.status);
    form.hidden = true;
    document.getElementById('ct-success').hidden = false;
  } catch (err) {
    error.hidden = false;
  } finally {
    button.disabled = false;
  }
});
