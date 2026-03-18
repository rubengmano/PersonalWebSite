// Language switcher
function setLang(btn) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => obs.observe(el));

// Experience calculation
const startYear = 2020;
const startMonth = 0; // January = 0
const start = new Date(startYear, startMonth);
const now = new Date();
const years = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 365.25));
document.getElementById('years-experience').textContent = years + '+ Years Experience';
const year = new Date().getFullYear();
document.getElementById('actualyear').textContent = '© ' + year + ' Rúben Mano — All rights reserved';


async function handleSubmit(e) {
  e.preventDefault();
  await fetch('https://formspree.io/f/mgonrrvj', {
    method: 'POST',
    body: new FormData(e.target),
    headers: { 'Accept': 'application/json' }
  });
  document.getElementById('ct-form').style.display = 'none';
  document.getElementById('ct-success').style.display = 'flex';
}