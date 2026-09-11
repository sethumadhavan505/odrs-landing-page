const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.desktop-nav');

// Add Home to the header navigation on every page.
if (nav && !nav.querySelector('a[href="index.html"]')) {
  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.textContent = 'Home';
  nav.insertBefore(homeLink, nav.firstChild);
}

// Automatically highlight the page that is currently open.
if (nav) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  nav.querySelectorAll('a').forEach(link => {
    link.removeAttribute('aria-current');

    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .desktop-nav a[aria-current="page"] {
      color: var(--red) !important;
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

// ===== DARK MODE + HEADER LOGO =====
const headerLogo = document.getElementById('headerLogo');

function updateHeaderLogo() {
  if (!headerLogo) return;

  if (document.body.classList.contains('dark')) {
    headerLogo.src = 'darkmodelogo.png';
  } else {
    headerLogo.src = 'logo.png';
  }
}

// Restore saved theme
const savedTheme = localStorage.getItem('odrs-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

// Set correct logo when page loads
updateHeaderLogo();

// Change theme + logo when toggle is clicked
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');

    localStorage.setItem(
      'odrs-theme',
      isDark ? 'dark' : 'light'
    );

    updateHeaderLogo();
  });
}

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
