// PERUBAHAN: Efek ketik yang lebih smooth dengan cursor
const finalTextEl = document.getElementById("finalText");
const textContent = "\nAs we seeing every corner in\nbetween has a main core, we embraces\na broad spectrum of typologies and\nmethods, from raw ideas, artwork, art,\ndesign, spatial and research.";
let i = 0;
let lineCount = 0;

function typeWriter() {
  if (i < textContent.length) {
    // Handle new lines
    if (textContent.charAt(i) === '\n') {
      finalTextEl.innerHTML += '<br>';
      lineCount++;
      // Tambahkan delay lebih lama untuk pergantian baris
      setTimeout(typeWriter, 200);
    } else {
      finalTextEl.innerHTML += textContent.charAt(i);
      // Tambahkan cursor berkedip
      finalTextEl.innerHTML = finalTextEl.innerHTML.replace(/<span class="cursor"><\/span>/, '');
      finalTextEl.innerHTML += '<span class="cursor"></span>';
    }
    i++;
    // Kecepatan ketik bervariasi untuk efek lebih natural
    const speed = Math.random() * 50 + 120; // 30-80ms per karakter
    setTimeout(typeWriter, speed);
  } else {
    // Hapus cursor setelah selesai
    finalTextEl.innerHTML = finalTextEl.innerHTML.replace(/<span class="cursor"><\/span>/, '');
    finalTextEl.style.opacity = 1;
  }
}

// PERBAIKAN: Posters repel + parallax - Pastikan selector benar
function initPosters() {
  const posters = document.querySelectorAll(".poster");
  
  // Hanya jalankan jika ada posters
  if (posters.length > 0) {
    document.addEventListener("mousemove", (e) => {
      posters.forEach(poster => {
        const rect = poster.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const moveX = -dx / dist * 20;
        const moveY = -dy / dist * 20;
        
        // Reset transform sebelumnya dan terapkan yang baru
        poster.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }
}

// PERBAIKAN: Clock WIB (GMT+7) - Fungsi yang benar
function updateClock() {
  const clockEl = document.getElementById("currentTime");
  if (clockEl) {
    const now = new Date();
    
    // Konversi ke WIB (GMT+7)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const wibTime = new Date(utc + (3600000 * 7));
    
    // Format waktu menjadi HH:MM
    const hours = wibTime.getHours().toString().padStart(2, '0');
    const minutes = wibTime.getMinutes().toString().padStart(2, '0');
    
    clockEl.textContent = `${hours}:${minutes} WIB`;
  }
}

// PERBAIKAN BESAR: Scroll effect untuk header dengan fade opacity - VERSI SIMPLIFIED
let lastScrollY = window.pageYOffset;
let scrollTimeout;

function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const currentScrollY = window.pageYOffset;
    
    // Clear timeout sebelumnya
    clearTimeout(scrollTimeout);
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll ke bawah - hide header dengan opacity 0
        header.classList.add('hidden');
        header.classList.remove('visible');
    } else {
        // Scroll ke atas - show header dengan opacity 1
        header.classList.remove('hidden');
        header.classList.add('visible');
    }
    
    // Update scrolled class untuk background
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
    
    // Debounce untuk performance
    scrollTimeout = setTimeout(() => {
        // Optional: tambahan logic jika needed
    }, 10);
}

// Scroll Effect untuk Sticky Container
function handleStickyScroll() {
  const stickyContainer = document.querySelector('.sticky-container');
  const heroSection = document.querySelector('.hero');
  
  if (!stickyContainer || !heroSection) return;
  
  const scrollY = window.pageYOffset;
  const heroHeight = heroSection.offsetHeight;
  
  // Hitung progress scroll (0 sampai 1)
  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  
  // Terapkan efek berdasarkan progress scroll
  if (scrollProgress > 0.1) {
    stickyContainer.classList.add('scrolled');
  } else {
    stickyContainer.classList.remove('scrolled');
  }
  
  // Parallax effect untuk posters
  const posters = document.querySelectorAll('.poster');
  posters.forEach((poster, index) => {
    const speed = 0.1 + (index * 0.05);
    const yPos = -(scrollY * speed);
    poster.style.transform = `translateY(${yPos}px)`;
  });
}

// PERBAIKAN: Accessibility Panel - VERSI FIXED
function initAccessibilityPanel() {
    const visibilityBtn = document.getElementById('visibilityBtn');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const closePanelBtn = document.querySelector('.close-panel');
    
    console.log('Accessibility elements:', { visibilityBtn, accessibilityPanel, closePanelBtn });
    
    if (!visibilityBtn || !accessibilityPanel) {
        console.log('Accessibility elements not found');
        return;
    }
    
    // Toggle panel visibility
    visibilityBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        console.log('Visibility button clicked');
        
        if (accessibilityPanel.style.display === 'flex') {
            // Hide panel
            accessibilityPanel.classList.remove('show');
            setTimeout(() => {
                accessibilityPanel.style.display = 'none';
            }, 300);
        } else {
            // Show panel
            accessibilityPanel.style.display = 'flex';
            // Trigger reflow
            void accessibilityPanel.offsetWidth;
            accessibilityPanel.classList.add('show');
        }
    });
    
    // Close panel button
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            accessibilityPanel.classList.remove('show');
            setTimeout(() => {
                accessibilityPanel.style.display = 'none';
            }, 300);
        });
    }
    
    // Close panel when clicking outside
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
    
    // Prevent panel close when clicking inside panel
    accessibilityPanel.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// PERBAIKAN: Accessibility Settings dengan error handling
function initAccessibilitySettings() {
    console.log('Initializing accessibility settings...');
    
    const lightDarkSelect = document.getElementById("lightDark");
    const highContrastToggle = document.getElementById("highContrast");
    const dyslexiaToggle = document.getElementById("dyslexia");
    const textToSpeechToggle = document.getElementById("textToSpeech");
    const magnificationToggle = document.getElementById("magnification");
    const keyboardNavToggle = document.getElementById("keyboardNav");
    const reducedMotionToggle = document.getElementById("reducedMotion");
    const colorBlindSelect = document.getElementById("colorBlind");
    const languageSelect = document.getElementById("language");

    // Light/Dark Mode
    if (lightDarkSelect) {
        lightDarkSelect.addEventListener("change", function() {
            document.body.classList.remove("dark-mode");
            if (lightDarkSelect.value === "dark") {
                document.body.classList.add("dark-mode");
            }
        });
    }

    // High Contrast
    if (highContrastToggle) {
        highContrastToggle.addEventListener("change", function() {
            document.body.classList.toggle("high-contrast", highContrastToggle.checked);
        });
    }

    // Dyslexia Mode
    if (dyslexiaToggle) {
        dyslexiaToggle.addEventListener("change", function() {
            document.body.classList.toggle("dyslexia-mode", dyslexiaToggle.checked);
        });
    }

    // Text-to-Speech
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    const ttsControls = document.getElementById("ttsControls");
    const playTTS = document.getElementById("playTTS");
    const pauseTTS = document.getElementById("pauseTTS");
    const stopTTS = document.getElementById("stopTTS");
    const voiceSelect = document.getElementById("voiceSelect");
    const rateControl = document.getElementById("rateControl");

    // Populate voice options
    function populateVoiceList() {
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }
        
        const voices = speechSynthesis.getVoices();
        if (voiceSelect) {
            voiceSelect.innerHTML = '';
            
            voices.forEach(voice => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                voiceSelect.appendChild(option);
            });
        }
    }

    if (speechSynthesis) {
        populateVoiceList();
    }

    if (textToSpeechToggle) {
        textToSpeechToggle.addEventListener("change", function() {
            if (textToSpeechToggle.checked && ttsControls) {
                ttsControls.style.display = "block";
            } else if (ttsControls) {
                ttsControls.style.display = "none";
                if (currentUtterance) {
                    speechSynthesis.cancel();
                }
            }
        });
    }

    if (playTTS) {
        playTTS.addEventListener("click", function() {
            if (currentUtterance) {
                speechSynthesis.resume();
            } else {
                const textToRead = document.body.innerText;
                currentUtterance = new SpeechSynthesisUtterance(textToRead);
                
                const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
                const voices = speechSynthesis.getVoices();
                currentUtterance.voice = voices.find(voice => voice.name === selectedVoice);
                currentUtterance.rate = rateControl.value;
                
                currentUtterance.onend = function() {
                    currentUtterance = null;
                };
                
                speechSynthesis.speak(currentUtterance);
            }
        });
    }

    if (pauseTTS) {
        pauseTTS.addEventListener("click", function() {
            speechSynthesis.pause();
        });
    }

    if (stopTTS) {
        stopTTS.addEventListener("click", function() {
            speechSynthesis.cancel();
            currentUtterance = null;
        });
    }

    // Magnification
    if (magnificationToggle) {
        magnificationToggle.addEventListener("change", function() {
            document.body.classList.toggle("magnified", magnificationToggle.checked);
        });
    }

    // Keyboard Navigation
    if (keyboardNavToggle) {
        keyboardNavToggle.addEventListener("change", function() {
            document.body.classList.toggle("keyboard-navigation", keyboardNavToggle.checked);
        });
    }

    // Reduced Motion
    if (reducedMotionToggle) {
        reducedMotionToggle.addEventListener("change", function() {
            document.body.classList.toggle("reduced-motion", reducedMotionToggle.checked);
        });
    }

    // Color Blind Mode
    if (colorBlindSelect) {
        colorBlindSelect.addEventListener("change", function() {
            document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
            if (colorBlindSelect.value !== "none") {
                document.body.classList.add(colorBlindSelect.value);
            }
        });
    }

    // Language
    if (languageSelect) {
        languageSelect.addEventListener("change", function() {
            document.body.classList.remove("english", "indonesian");
            document.body.classList.add(languageSelect.value);
        });
    }
}

// PERBAIKAN: Filter buttons functionality
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you can add filtering logic for cards
            const filterValue = this.textContent.toLowerCase();
            console.log('Filter clicked:', filterValue);
            
            // Example filtering logic (you can customize this)
            filterCards(filterValue);
        });
    });
}

// Example card filtering function
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

// PERBAIKAN: Card hover effects
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

// PERBAIKAN: Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.backtotop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// PERBAIKAN: Inisialisasi lengkap dan terstruktur
function initPage() {
    console.log('Initializing page...');
    
    // Typewriter effect
    if (document.getElementById('finalText')) {
        setTimeout(typeWriter, 1000);
    }
    
    // Clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Posters
    initPosters();
    
    // HEADER SCROLL - PASTIKAN INI DIPANGGIL
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    
    // STICKY SCROLL
    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    
    // ACCESSIBILITY PANEL - PASTIKAN INI DIPANGGIL
    initAccessibilityPanel();
    
    // ACCESSIBILITY SETTINGS
    initAccessibilitySettings();
    
    // FILTER BUTTONS
    initFilterButtons();
    
    // CARD INTERACTIONS
    initCardInteractions();
    
    // BACK TO TOP BUTTON
    initBackToTop();
    
    // Pastikan header visible di awal
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('visible');
        header.classList.remove('hidden');
    }
    
    console.log('Page initialization complete');
}

// PERBAIKAN: Event listener yang tepat
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    initPage();
});

// Fallback untuk memastikan semua element sudah loaded
window.addEventListener('load', function() {
    console.log('Window Loaded');
    
    // Additional safety check
    const header = document.querySelector('header');
    if (header && !header.classList.contains('visible')) {
        header.classList.add('visible');
    }
    
    // Ensure visibility button is visible
    const visibilityBtn = document.getElementById('visibilityBtn');
    if (visibilityBtn) {
        visibilityBtn.style.opacity = '1';
        visibilityBtn.style.visibility = 'visible';
    }
});

// Error handling untuk browser yang tidak support某些 features
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scroll
    console.log('Smooth scroll not supported, adding polyfill...');
}

// Performance optimization
let isScrolling;
window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
        // Debounced scroll operations
    }, 66);
}, false);

// Handle resize events
window.addEventListener('resize', function() {
    // Recalculate any layout-dependent values if needed
    console.log('Window resized');
});

// Export functions for global access (if needed)
window.TheegralApp = {
    typeWriter,
    updateClock,
    handleHeaderScroll,
    handleStickyScroll,
    initAccessibilityPanel,
    initAccessibilitySettings,
    initPage
};

console.log('Theegral Website JavaScript loaded successfully');
