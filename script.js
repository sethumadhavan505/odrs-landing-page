const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.desktop-nav');

const savedTheme = localStorage.getItem('odrs-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('odrs-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  nav.style.display = open ? 'flex' : '';
  if (open) {
    nav.style.position = 'absolute';
    nav.style.top = '68px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.padding = '18px 5%';
    nav.style.background = 'var(--card)';
    nav.style.flexDirection = 'column';
    nav.style.borderBottom = '1px solid var(--line)';
  }
});

document.querySelectorAll('.desktop-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    if (window.innerWidth <= 700) nav.style.display = '';
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
