const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.desktop-nav');

// Add Home to the header navigation on every page.
if (nav && !nav.querySelector('a[href="index.html"]')) {
  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.textContent = 'Home';
  if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')) {
    homeLink.setAttribute('aria-current', 'page');
  }
  nav.insertBefore(homeLink, nav.firstChild);
}

// Highlight the current page with a red underline.
if (nav) {
  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .desktop-nav a[aria-current="page"] {
      color: var(--red);
      position: relative;
    }
    .desktop-nav a[aria-current="page"]::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -8px;
      height: 2px;
      border-radius: 2px;
      background: var(--red);
    }
  `;
  document.head.appendChild(activeStyle);
}

// Send every Login button to the external ODRS login/signup application.
document.querySelectorAll('a[href="login.html"]').forEach(link => {
  link.href = 'https://odrs-company-io.vercel.app/';
  link.target = '_self';
});

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
