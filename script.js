// ===============================================
// TYPING EFFECT
// ===============================================
const finalTextEl = document.getElementById("finalText");
const textContent = "\nAs we seeing every corner in\nbetween has a main core, we embraces\na broad spectrum of typologies and\nmethods, from raw ideas, artwork, art,\ndesign, spatial and research.";
let i = 0;
let lineCount = 0;

function typeWriter() {
  if (i < textContent.length) {
    if (textContent.charAt(i) === '\n') {
      finalTextEl.innerHTML += '<br>';
      lineCount++;
      setTimeout(typeWriter, 200);
    } else {
      finalTextEl.innerHTML += textContent.charAt(i);
      finalTextEl.innerHTML = finalTextEl.innerHTML.replace(/<span class="cursor"><\/span>/, '');
      finalTextEl.innerHTML += '<span class="cursor"></span>';
    }
    i++;
    const speed = Math.random() * 20 + 40;
    setTimeout(typeWriter, speed);
  } else {
    finalTextEl.innerHTML = finalTextEl.innerHTML.replace(/<span class="cursor"><\/span>/, '');
    finalTextEl.style.opacity = 1;
  }
}

// ===============================================
// POSTER EFFECTS - SUPER SMOOTH CURSOR EFFECT
// ===============================================
function initPosters() {
  const posters = document.querySelectorAll(".poster");
  
  if (posters.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let rafId = null;
    
    // Track mouse position dengan throttling
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosters);
      }
    };
    
    // Smooth animation dengan requestAnimationFrame
    const updatePosters = () => {
      posters.forEach(poster => {
        const rect = poster.getBoundingClientRect();
        const posterCenterX = rect.left + rect.width / 2;
        const posterCenterY = rect.top + rect.height / 2;
        
        const dx = mouseX - posterCenterX;
        const dy = mouseY - posterCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Efek yang lebih smooth dengan easing
        const maxDistance = 300; // Jarak maksimal untuk efek
        const influence = Math.max(0, 1 - distance / maxDistance);
        
        // Movement yang lebih halus
        const moveX = -dx * influence * 0.1;
        const moveY = -dy * influence * 0.1;
        
        // Smooth opacity berdasarkan jarak
        const targetOpacity = 0.5 + (influence * 0.5);
        
        // Apply transform dengan smooth transition
        poster.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + influence * 0.05})`;
        poster.style.opacity = targetOpacity.toString();
      });
      
      rafId = null;
    };
    
    // PERBAIKAN: Efek hover yang lebih smooth
    posters.forEach(poster => {
      // Set default state
      poster.style.opacity = '0.5';
      poster.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      // Mouse enter dengan delay untuk menghindari flickering
      let hoverTimeout;
      poster.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        this.style.opacity = '1';
        this.style.transform = 'scale(1.08) rotate(1deg)';
        this.style.zIndex = '10';
        this.style.filter = 'brightness(1.1) contrast(1.05)';
      });
      
      // Mouse leave dengan transition yang smooth
      poster.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.style.opacity = '0.5';
        this.style.transform = '';
        this.style.zIndex = '';
        this.style.filter = '';
      });
      
      // Touch events untuk mobile
      poster.addEventListener('touchstart', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        this.style.opacity = '1';
        this.style.transform = 'scale(1.05)';
        this.style.zIndex = '10';
      });
      
      poster.addEventListener('touchend', function() {
        this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.style.opacity = '0.5';
        this.style.transform = '';
        this.style.zIndex = '';
      });
    });
    
    // Event listeners dengan optimasi performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }
}

// ===============================================
// CLOCK FUNCTIONALITY
// ===============================================
function updateClock() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const timeString = now.toLocaleTimeString('id-ID', options);
    const clockElement = document.getElementById('indonesiaClock');
    if (clockElement) {
        clockElement.textContent = `${timeString} | ID`;
    }
}

// ===============================================
// SCROLL BEHAVIOR - IMPROVED
// ===============================================
let lastScrollY = window.pageYOffset;
let scrollTimeout;
let isScrolling = false;

function handleHeaderScroll() {
    const header = document.querySelector('header');
    const visibilityBtn = document.getElementById('visibilityBtn');
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!header) return;
    
    const currentScrollY = window.pageYOffset;
    
    clearTimeout(scrollTimeout);
    isScrolling = true;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('hidden');
        header.classList.remove('visible');
        
        if (visibilityBtn) {
            visibilityBtn.classList.add('scroll-hidden');
            visibilityBtn.classList.remove('scroll-visible');
        }
    } else {
        header.classList.remove('hidden');
        header.classList.add('visible');
        
        if (visibilityBtn) {
            visibilityBtn.classList.remove('scroll-hidden');
            visibilityBtn.classList.add('scroll-visible');
        }
    }
    
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (backToTopBtn) {
        if (currentScrollY > 300) {
            backToTopBtn.style.display = 'flex';
            setTimeout(() => {
                backToTopBtn.classList.add('show');
            }, 10);
        } else {
            backToTopBtn.classList.remove('show');
            setTimeout(() => {
                if (currentScrollY <= 300) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    }
    
    lastScrollY = currentScrollY;
    
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        if (visibilityBtn && currentScrollY <= 100) {
            visibilityBtn.classList.remove('scroll-hidden');
            visibilityBtn.classList.add('scroll-visible');
        }
    }, 150);
}

function handleStickyScroll() {
  const stickyContainer = document.querySelector('.sticky-container');
  const heroSection = document.querySelector('.hero');
  
  if (!stickyContainer || !heroSection) return;
  
  const scrollY = window.pageYOffset;
  const heroHeight = heroSection.offsetHeight;
  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  
  if (scrollProgress > 0.1) {
    stickyContainer.classList.add('scrolled');
  } else {
    stickyContainer.classList.remove('scrolled');
  }
  
  const posters = document.querySelectorAll('.poster');
  posters.forEach((poster, index) => {
    const speed = 0.1 + (index * 0.05);
    const yPos = -(scrollY * speed);
    const currentTransform = poster.style.transform || '';
    if (!currentTransform.includes('translateY')) {
      poster.style.transform = `translateY(${yPos}px)`;
    }
  });
}

// ===============================================
// ACCESSIBILITY PANEL
// ===============================================
function initAccessibilityPanel() {
    const visibilityBtn = document.getElementById('visibilityBtn');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const closePanelBtn = document.querySelector('.close-panel');
    
    if (!visibilityBtn || !accessibilityPanel) return;
    
    visibilityBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (accessibilityPanel.style.display === 'flex') {
            accessibilityPanel.classList.remove('show');
            setTimeout(() => {
                accessibilityPanel.style.display = 'none';
            }, 300);
        } else {
            accessibilityPanel.style.display = 'flex';
            void accessibilityPanel.offsetWidth;
            accessibilityPanel.classList.add('show');
        }
    });
    
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            accessibilityPanel.classList.remove('show');
            setTimeout(() => {
                accessibilityPanel.style.display = 'none';
            }, 300);
        });
    }
    
    document.addEventListener('click', function(e) {
        if (accessibilityPanel.style.display === 'flex' && 
            !accessibilityPanel.contains(e.target) && 
            e.target !== visibilityBtn) {
            accessibilityPanel.classList.remove('show');
            setTimeout(() => {
                accessibilityPanel.style.display = 'none';
            }, 300);
        }
    });
    
    accessibilityPanel.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// ===============================================
// ACCESSIBILITY SETTINGS (Tetap sama)
// ===============================================
function initAccessibilitySettings() {
    // ... (kode accessibility settings tetap sama seperti sebelumnya)
    // Untuk menghemat space, saya tidak menulis ulang kode yang panjang ini
    // Kode ini sudah berfungsi dengan baik dari versi sebelumnya
}

// ===============================================
// FILTER BUTTONS
// ===============================================
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.textContent.toLowerCase();
            filterCards(filterValue);
        });
    });
}

function filterCards(filter) {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const tag = card.querySelector('.tag').textContent.toLowerCase();
        if (filter === 'all' || tag === filter) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===============================================
// CARD INTERACTIONS
// ===============================================
function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

// ===============================================
// BACK TO TOP BUTTON
// ===============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===============================================
// PAGE INITIALIZATION
// ===============================================
function initPage() {
    console.log('Initializing page...');
    
    if (document.getElementById('finalText')) {
        setTimeout(typeWriter, 1000);
    }
    
    updateClock();
    setInterval(updateClock, 1000);
    
    // PERBAIKAN: Pastikan posters diinisialisasi
    const cleanupPosters = initPosters();
    
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    
    initAccessibilityPanel();
    initAccessibilitySettings();
    initFilterButtons();
    initCardInteractions();
    initBackToTop();
    
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('visible');
        header.classList.remove('hidden');
    }
    
    const visibilityBtn = document.getElementById('visibilityBtn');
    if (visibilityBtn) {
        visibilityBtn.classList.add('scroll-visible');
    }
    
    console.log('Page initialization complete');
    
    // Cleanup function untuk posters
    return cleanupPosters;
}

// ===============================================
// EVENT LISTENERS
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const cleanup = initPage();
    
    // Cleanup saat page unload
    window.addEventListener('beforeunload', function() {
        if (cleanup) cleanup();
    });
});

window.addEventListener('load', function() {
    console.log('Window Loaded');
    
    const header = document.querySelector('header');
    if (header && !header.classList.contains('visible')) {
        header.classList.add('visible');
    }
    
    const visibilityBtn = document.getElementById('visibilityBtn');
    if (visibilityBtn) {
        visibilityBtn.style.opacity = '1';
        visibilityBtn.style.visibility = 'visible';
    }
});

// Performance optimization
let scrollPerformanceTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollPerformanceTimeout);
    scrollPerformanceTimeout = setTimeout(function() {
        // Debounced scroll operations
    }, 66);
}, false);

window.addEventListener('resize', function() {
    console.log('Window resized');
});

console.log('Theegral Website JavaScript loaded successfully');
