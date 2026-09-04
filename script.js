// ---------- Sticky nav on scroll ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 600);
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ---------- Animated counters (trigger once when visible) ----------
const counters = document.querySelectorAll('.stat-num');
let countersStarted = false;
function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counters.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
}, { threshold: 0.4 });
heroObserver.observe(document.querySelector('.hero-stats'));

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    success.classList.remove('hidden');
    form.reset();
    setTimeout(() => success.classList.add('hidden'), 4000);
  }
});

// ---------- Back to top ----------
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// ---------- SAFE GSAP Animations (Kuch bhi hide nahi hoga) ----------
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Hero Par Sirf Text Entrance Animation (Safe)
gsap.from('.hero h1', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' });
gsap.from('.hero-sub', { duration: 1, y: 20, opacity: 0, delay: 0.2, ease: 'power3.out' });
gsap.from('.hero-actions .btn', { duration: 1, y: 20, opacity: 0, delay: 0.4, stagger: 0.1, ease: 'power3.out' });

// Scroll Par Sections Ko Upar Aana (Safe - Isme kuch hide nahi hota)
gsap.utils.toArray('section').forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});