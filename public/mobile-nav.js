(function () {
  function setupMobileMenu() {
    var header = document.querySelector('header');
    if (!header) return;

    var nav = header.querySelector('.mobile-nav') || header.querySelector('nav');
    if (!nav) return;

    var existing = header.querySelector('.mobile-menu-toggle');
    if (existing) return;

    var searchRow = document.createElement('div');
    searchRow.className = 'header-search';

    var searchWrap = document.createElement('div');
    searchWrap.className = 'mobile-nav-search-inputwrap';
    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'mobile-nav-search-input';
    searchInput.placeholder = 'Search';
    searchInput.setAttribute('aria-label', 'Search navigation');
    searchWrap.appendChild(searchInput);
    searchRow.appendChild(searchWrap);

    var searchBtn = document.createElement('button');
    searchBtn.className = 'mobile-nav-search-btn';
    searchBtn.setAttribute('type', 'button');
    searchBtn.setAttribute('aria-label', 'Open search');
    searchBtn.innerHTML = '<img src="/searchicon.svg" alt="Search icon" />';
    searchRow.appendChild(searchBtn);

    var mainNav = header.querySelector('.main-nav') || header.querySelector('nav');
    if (mainNav) {
      header.insertBefore(searchRow, mainNav);
    } else {
      header.appendChild(searchRow);
    }

    var btn = document.createElement('button');
    btn.className = 'mobile-menu-toggle';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Toggle navigation menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';

    header.appendChild(btn);

    function closeMenu() {
      header.classList.remove('mobile-menu-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function isMobileViewport() {
      return window.matchMedia('(max-width: 768px), (max-width: 932px) and (orientation: landscape)').matches;
    }

    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      var willOpen = !header.classList.contains('mobile-menu-open');
      header.classList.toggle('mobile-menu-open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    nav.addEventListener('click', function (event) {
      if (event.target && event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('click', function (event) {
      if (isMobileViewport() && !header.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
  } else {
    setupMobileMenu();
  }
})();
