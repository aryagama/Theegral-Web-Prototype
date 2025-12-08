// ===============================================
// DIRECT TEXT APPEARANCE - NO TYPING EFFECT
// ===============================================
function initHeroText() {
    const finalTextEl = document.getElementById("finalText");
    const textContent = "\nAs we seeing every corner in\nbetween has a main core, we embraces\na broad spectrum of typologies and\nmethods, from raw ideas, artwork, art,\ndesign, spatial and research.";
    
    // Set text langsung tanpa efek typing
    if (finalTextEl) {
        finalTextEl.textContent = textContent;
        finalTextEl.classList.add('fade-in-text');
        finalTextEl.style.opacity = '1';
    }
}

// ===============================================
// FILTER FUNCTIONALITY - IMPROVED
// ===============================================
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    
    // Store all cards for filtering
    window.allCards = Array.from(cards);
    
    // Initialize filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter cards
            filterCards(filterValue);
        });
    });
    
    // Initialize with "All" filter active
    filterCards('all');
}

function filterCards(filter) {
    const cards = window.allCards || document.querySelectorAll('.card');
    const cardList = document.querySelector('.card-list');
    
    // Jika tidak ada kartu, return
    if (!cards.length) return;
    
    // Flag untuk mengecek apakah ada hasil
    let hasResults = false;
    
    // Filter cards based on tag
    cards.forEach(card => {
        const cardTags = card.getAttribute('data-tags');
        const tagElements = card.querySelectorAll('.tag');
        
        // Collect all tags from card
        const tags = cardTags ? cardTags.split(',').map(tag => tag.trim()) : [];
        
        // Also check visual tag elements
        tagElements.forEach(tagElement => {
            const tagText = tagElement.textContent.trim();
            if (!tags.includes(tagText)) {
                tags.push(tagText);
            }
        });
        
        // Check if card matches filter
        const matchesFilter = filter.toLowerCase() === 'all' || 
                             tags.some(tag => tag.toLowerCase() === filter.toLowerCase());
        
        // Apply animation based on match
        if (matchesFilter) {
            card.classList.remove('hidden');
            card.classList.add('visible', 'fade-in');
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.classList.remove('visible', 'fade-in');
            card.classList.add('hidden', 'fade-out');
            
            // Hide after animation
            setTimeout(() => {
                if (!card.classList.contains('visible')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Show "no results" message if needed
    showNoResultsMessage(!hasResults);
    
    console.log(`Filter applied: ${filter}, Results: ${hasResults ? cards.filter(c => c.classList.contains('visible')).length : 0} cards`);
}

function showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results');
    
    if (show) {
        if (!noResultsMsg) {
            // Create no results message
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.textContent = 'No projects found with this filter. Try another category.';
            
            // Insert message into card list
            const cardList = document.querySelector('.card-list');
            if (cardList) {
                cardList.appendChild(noResultsMsg);
                
                // Show with animation
                setTimeout(() => {
                    noResultsMsg.classList.add('show');
                }, 10);
            }
        } else {
            noResultsMsg.classList.add('show');
        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.classList.remove('show');
            setTimeout(() => {
                if (noResultsMsg && !noResultsMsg.classList.contains('show')) {
                    noResultsMsg.remove();
                }
            }, 300);
        }
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
// ACCESSIBILITY SETTINGS - DENGAN SHORTCUT KEYBOARD
// ===============================================
let currentSettings = {
    theme: 'light',
    contrast: 'normal',
    dyslexia: false,
    textToSpeech: false,
    fontSize: 'normal',
    reducedMotion: false,
    colorBlind: 'none',
    language: 'english'
};

function initAccessibilitySettings() {
    console.log('Initializing accessibility settings with shortcuts...');
    
    // Load saved settings
    loadAccessibilitySettings();
    
    // Setup card click handlers
    setupCardHandlers();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    console.log('Accessibility settings initialized with shortcuts');
}

function setupCardHandlers() {
    const cards = document.querySelectorAll('.accessibility-card');
    
    cards.forEach(card => {
        const setting = card.dataset.setting;
        
        if (setting === 'resetSettings') {
            // Reset card
            card.addEventListener('click', function() {
                console.log('Reset all settings clicked');
                resetAccessibilitySettings();
            });
        } else {
            // Regular setting cards
            card.addEventListener('click', function() {
                handleCardClick(this, setting);
            });
        }
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Don't trigger if user is typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Check for modifier keys (allow Shift for "=" key)
        if (e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        const key = e.key.toUpperCase();
        console.log('Key pressed:', key);
        
        switch(key) {
            case 'Q': // Motion
                toggleReducedMotion();
                e.preventDefault();
                break;
            case 'C': // Contrast
                toggleContrast();
                e.preventDefault();
                break;
            case 'F': // Font Size
                toggleFontSize();
                e.preventDefault();
                break;
            case '=': // Text Speech (Shift + =)
                toggleTextToSpeech();
                e.preventDefault();
                break;
            case 'T': // Theme
                toggleTheme();
                e.preventDefault();
                break;
            case 'D': // Dyslexia
                toggleDyslexia();
                e.preventDefault();
                break;
            case 'V': // Color Mode
                toggleColorBlind();
                e.preventDefault();
                break;
            case 'L': // Language
                toggleLanguage();
                e.preventDefault();
                break;
            case 'R': // Reset
                resetAccessibilitySettings();
                e.preventDefault();
                break;
        }
    });
}

function handleCardClick(card, setting) {
    console.log(`Card clicked: ${setting}`);
    
    switch(setting) {
        case 'theme':
            toggleTheme();
            break;
        case 'contrast':
            toggleContrast();
            break;
        case 'dyslexia':
            toggleDyslexia();
            break;
        case 'textToSpeech':
            toggleTextToSpeech();
            break;
        case 'fontSize':
            toggleFontSize();
            break;
        case 'motion':
            toggleReducedMotion();
            break;
        case 'colorBlind':
            toggleColorBlind();
            break;
        case 'language':
            toggleLanguage();
            break;
    }
}

function toggleTheme() {
    const themes = ['light', 'dark'];
    const currentTheme = currentSettings.theme;
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    // Update settings
    currentSettings.theme = nextTheme;
    
    // Update UI
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(nextTheme + '-mode');
    
    // Update card
    updateCardState('theme', nextTheme);
    document.getElementById('themeValue').textContent = nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1);
    
    // Save to localStorage
    localStorage.setItem('theme', nextTheme);
    
    console.log(`Theme changed to: ${nextTheme}`);
}

function toggleContrast() {
    const contrasts = ['normal', 'high-contrast', 'hi-con', 'saturate'];
    const currentContrast = currentSettings.contrast;
    const currentIndex = contrasts.indexOf(currentContrast);
    const nextIndex = (currentIndex + 1) % contrasts.length;
    const nextContrast = contrasts[nextIndex];
    
    // Update settings
    currentSettings.contrast = nextContrast;
    
    // Remove all contrast classes
    document.body.classList.remove('high-contrast', 'light-high-contrast', 'hi-con', 'saturate');
    
    // Add new contrast class
    if (nextContrast !== 'normal') {
        document.body.classList.add(nextContrast);
    }
    
    // Update card
    updateCardState('contrast', nextContrast);
    const displayText = nextContrast === 'normal' ? 'Normal' : 
                       nextContrast === 'high-contrast' ? 'High' :
                       nextContrast === 'hi-con' ? 'Hi-con' : 'Saturate';
    document.getElementById('contrastValue').textContent = displayText;
    
    // Save to localStorage
    localStorage.setItem('contrast', nextContrast);
    
    console.log(`Contrast changed to: ${nextContrast}`);
}

function toggleDyslexia() {
    // Toggle dyslexia mode
    currentSettings.dyslexia = !currentSettings.dyslexia;
    
    // Update UI
    if (currentSettings.dyslexia) {
        document.body.classList.add('dyslexia-mode');
    } else {
        document.body.classList.remove('dyslexia-mode');
    }
    
    // Update card
    updateCardState('dyslexia', currentSettings.dyslexia);
    document.getElementById('dyslexiaValue').textContent = currentSettings.dyslexia ? 'On' : 'Off';
    
    // Save to localStorage
    localStorage.setItem('dyslexia', currentSettings.dyslexia);
    
    console.log(`Dyslexia mode: ${currentSettings.dyslexia ? 'ON' : 'OFF'}`);
}

function toggleTextToSpeech() {
    const ttsControls = document.getElementById('ttsControls');
    
    // Toggle text-to-speech
    currentSettings.textToSpeech = !currentSettings.textToSpeech;
    
    // Update UI
    if (currentSettings.textToSpeech) {
        ttsControls.style.display = 'block';
        setTimeout(() => {
            ttsControls.classList.add('show');
        }, 10);
        initTextToSpeech();
    } else {
        ttsControls.classList.remove('show');
        setTimeout(() => {
            ttsControls.style.display = 'none';
        }, 300);
        stopSpeech();
    }
    
    // Update card
    updateCardState('textToSpeech', currentSettings.textToSpeech);
    document.getElementById('ttsValue').textContent = currentSettings.textToSpeech ? 'On' : 'Off';
    
    // Save to localStorage
    localStorage.setItem('textToSpeech', currentSettings.textToSpeech);
    
    console.log(`Text-to-Speech: ${currentSettings.textToSpeech ? 'ON' : 'OFF'}`);
}

function toggleFontSize() {
    const fontSizes = ['small', 'normal', 'large', 'larger', 'largest'];
    const currentSize = currentSettings.fontSize;
    const currentIndex = fontSizes.indexOf(currentSize);
    const nextIndex = (currentIndex + 1) % fontSizes.length;
    const nextSize = fontSizes[nextIndex];
    
    // Update settings
    currentSettings.fontSize = nextSize;
    
    // Remove all font size classes
    document.body.classList.remove('font-small', 'font-normal', 'font-large', 'font-larger', 'font-largest');
    
    // Add new font size class
    document.body.classList.add('font-' + nextSize);
    
    // Update card
    updateCardState('fontSize', nextSize);
    const displayText = nextSize.charAt(0).toUpperCase() + nextSize.slice(1);
    document.getElementById('fontSizeValue').textContent = displayText;
    
    // Save to localStorage
    localStorage.setItem('fontSize', nextSize);
    
    console.log(`Font size changed to: ${nextSize}`);
}

function toggleReducedMotion() {
    // Toggle reduced motion
    currentSettings.reducedMotion = !currentSettings.reducedMotion;
    
    // Update UI
    if (currentSettings.reducedMotion) {
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
    
    // Update card
    updateCardState('motion', currentSettings.reducedMotion);
    document.getElementById('motionValue').textContent = currentSettings.reducedMotion ? 'Reduced' : 'Normal';
    
    // Save to localStorage
    localStorage.setItem('reducedMotion', currentSettings.reducedMotion);
    
    console.log(`Reduced motion: ${currentSettings.reducedMotion ? 'ON' : 'OFF'}`);
}

function toggleColorBlind() {
    const colorModes = ['none', 'protanopia', 'deuteranopia', 'tritanopia'];
    const currentMode = currentSettings.colorBlind;
    const currentIndex = colorModes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % colorModes.length;
    const nextMode = colorModes[nextIndex];
    
    // Update settings
    currentSettings.colorBlind = nextMode;
    
    // Remove all color blind classes
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    
    // Add new color blind class
    if (nextMode !== 'none') {
        document.body.classList.add(nextMode);
    }
    
    // Update card
    updateCardState('colorBlind', nextMode);
    const displayText = nextMode === 'none' ? 'Normal' : 
                       nextMode === 'protanopia' ? 'Protan' :
                       nextMode === 'deuteranopia' ? 'Deuteran' : 'Tritan';
    document.getElementById('colorValue').textContent = displayText;
    
    // Save to localStorage
    localStorage.setItem('colorBlind', nextMode);
    
    console.log(`Color blind mode changed to: ${nextMode}`);
}

function toggleLanguage() {
    const languages = ['english', 'indonesian'];
    const currentLang = currentSettings.language;
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    
    // Update settings
    currentSettings.language = nextLang;
    
    // Remove all language classes
    document.body.classList.remove('english', 'indonesian');
    
    // Add new language class
    document.body.classList.add(nextLang);
    
    // Update card
    updateCardState('language', nextLang);
    const displayText = nextLang === 'english' ? 'EN' : 'ID';
    document.getElementById('languageValue').textContent = displayText;
    
    // Update TTS text based on language
    updateTTSLanguage(nextLang);
    
    // Save to localStorage
    localStorage.setItem('language', nextLang);
    
    console.log(`Language changed to: ${nextLang}`);
}

function updateCardState(setting, value) {
    // Find the card
    const card = document.querySelector(`[data-setting="${setting}"]`);
    if (!card) return;
    
    // Remove active class from all cards in the same group
    const allCards = document.querySelectorAll(`[data-setting="${setting}"]`);
    allCards.forEach(c => c.classList.remove('active'));
    
    // Add active class if value is truthy (not false, not 'normal', not 'none')
    if (value && value !== 'normal' && value !== 'none' && value !== 'light' && value !== 'english') {
        card.classList.add('active');
    }
}

function loadAccessibilitySettings() {
    console.log('Loading saved settings...');
    
    // Load from localStorage or use defaults
    currentSettings.theme = localStorage.getItem('theme') || 'light';
    currentSettings.contrast = localStorage.getItem('contrast') || 'normal';
    currentSettings.dyslexia = localStorage.getItem('dyslexia') === 'true';
    currentSettings.textToSpeech = localStorage.getItem('textToSpeech') === 'true';
    currentSettings.fontSize = localStorage.getItem('fontSize') || 'normal';
    currentSettings.reducedMotion = localStorage.getItem('reducedMotion') === 'true';
    currentSettings.colorBlind = localStorage.getItem('colorBlind') || 'none';
    currentSettings.language = localStorage.getItem('language') || 'english';
    
    // Apply theme
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(currentSettings.theme + '-mode');
    document.getElementById('themeValue').textContent = currentSettings.theme.charAt(0).toUpperCase() + currentSettings.theme.slice(1);
    updateCardState('theme', currentSettings.theme);
    
    // Apply contrast
    document.body.classList.remove('high-contrast', 'light-high-contrast', 'hi-con', 'saturate');
    if (currentSettings.contrast !== 'normal') {
        document.body.classList.add(currentSettings.contrast);
    }
    const contrastDisplay = currentSettings.contrast === 'normal' ? 'Normal' : 
                          currentSettings.contrast === 'high-contrast' ? 'High' :
                          currentSettings.contrast === 'hi-con' ? 'Hi-con' : 'Saturate';
    document.getElementById('contrastValue').textContent = contrastDisplay;
    updateCardState('contrast', currentSettings.contrast);
    
    // Apply dyslexia
    if (currentSettings.dyslexia) {
        document.body.classList.add('dyslexia-mode');
    }
    document.getElementById('dyslexiaValue').textContent = currentSettings.dyslexia ? 'On' : 'Off';
    updateCardState('dyslexia', currentSettings.dyslexia);
    
    // Apply text-to-speech
    if (currentSettings.textToSpeech) {
        // Don't auto-show TTS controls on load
    }
    document.getElementById('ttsValue').textContent = currentSettings.textToSpeech ? 'On' : 'Off';
    updateCardState('textToSpeech', currentSettings.textToSpeech);
    
    // Apply font size
    document.body.classList.remove('font-small', 'font-normal', 'font-large', 'font-larger', 'font-largest');
    document.body.classList.add('font-' + currentSettings.fontSize);
    document.getElementById('fontSizeValue').textContent = currentSettings.fontSize.charAt(0).toUpperCase() + currentSettings.fontSize.slice(1);
    updateCardState('fontSize', currentSettings.fontSize);
    
    // Apply reduced motion
    if (currentSettings.reducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    document.getElementById('motionValue').textContent = currentSettings.reducedMotion ? 'Reduced' : 'Normal';
    updateCardState('motion', currentSettings.reducedMotion);
    
    // Apply color blind mode
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (currentSettings.colorBlind !== 'none') {
        document.body.classList.add(currentSettings.colorBlind);
    }
    const colorDisplay = currentSettings.colorBlind === 'none' ? 'Normal' : 
                        currentSettings.colorBlind === 'protanopia' ? 'Protan' :
                        currentSettings.colorBlind === 'deuteranopia' ? 'Deuteran' : 'Tritan';
    document.getElementById('colorValue').textContent = colorDisplay;
    updateCardState('colorBlind', currentSettings.colorBlind);
    
    // Apply language
    document.body.classList.remove('english', 'indonesian');
    document.body.classList.add(currentSettings.language);
    const langDisplay = currentSettings.language === 'english' ? 'EN' : 'ID';
    document.getElementById('languageValue').textContent = langDisplay;
    updateCardState('language', currentSettings.language);
    
    console.log('Settings loaded');
}

function resetAccessibilitySettings() {
    console.log('Resetting all settings...');
    
    // Reset current settings
    currentSettings = {
        theme: 'light',
        contrast: 'normal',
        dyslexia: false,
        textToSpeech: false,
        fontSize: 'normal',
        reducedMotion: false,
        colorBlind: 'none',
        language: 'english'
    };
    
    // Remove all classes from body
    document.body.className = '';
    
    // Add default classes
    document.body.classList.add('font-normal', 'light-mode', 'english');
    
    // Update card values
    document.getElementById('themeValue').textContent = 'Light';
    document.getElementById('contrastValue').textContent = 'Normal';
    document.getElementById('dyslexiaValue').textContent = 'Off';
    document.getElementById('ttsValue').textContent = 'Off';
    document.getElementById('fontSizeValue').textContent = 'Normal';
    document.getElementById('motionValue').textContent = 'Normal';
    document.getElementById('colorValue').textContent = 'Normal';
    document.getElementById('languageValue').textContent = 'EN';
    
    // Remove active class from all cards
    const cards = document.querySelectorAll('.accessibility-card');
    cards.forEach(card => card.classList.remove('active'));
    
    // Hide TTS controls
    const ttsControls = document.getElementById('ttsControls');
    if (ttsControls) {
        ttsControls.classList.remove('show');
        setTimeout(() => {
            ttsControls.style.display = 'none';
        }, 300);
    }
    
    // Clear localStorage
    localStorage.clear();
    
    console.log('Settings reset complete');
}

// ===============================================
// TEXT TO SPEECH FUNCTIONALITY
// ===============================================
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let voices = [];

function initTextToSpeech() {
    console.log('Initializing Text-to-Speech...');
    
    const playBtn = document.getElementById('playTTS');
    const pauseBtn = document.getElementById('pauseTTS');
    const stopBtn = document.getElementById('stopTTS');
    const voiceSelect = document.getElementById('voiceSelect');
    const rateControl = document.getElementById('rateControl');
    const rateValue = document.getElementById('rateValue');
    const closeTTS = document.querySelector('.close-tts');
    
    if (!playBtn || !speechSynthesis) {
        console.log('TTS elements not found or speech synthesis not supported');
        return;
    }
    
    // Close TTS handler
    if (closeTTS) {
        closeTTS.addEventListener('click', function() {
            const ttsControls = document.getElementById('ttsControls');
            ttsControls.classList.remove('show');
            setTimeout(() => {
                ttsControls.style.display = 'none';
            }, 300);
            
            // Update TTS card
            currentSettings.textToSpeech = false;
            document.getElementById('ttsValue').textContent = 'Off';
            updateCardState('textToSpeech', false);
            
            localStorage.setItem('textToSpeech', 'false');
        });
    }
    
    // Load voices
    function loadVoices() {
        voices = speechSynthesis.getVoices();
        console.log('Voices loaded:', voices.length);
        
        voiceSelect.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select a voice';
        defaultOption.value = '';
        voiceSelect.appendChild(defaultOption);
        
        // Add available voices
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name;
            voiceSelect.appendChild(option);
        });
        
        // Try to select a default voice
        const defaultVoice = voices.find(voice => voice.lang.startsWith('en') || voice.default);
        if (defaultVoice) {
            voiceSelect.value = defaultVoice.name;
        }
    }
    
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Initial load
    setTimeout(loadVoices, 100);
    
    // Play TTS
    playBtn.addEventListener('click', function() {
        console.log('Play TTS clicked');
        
        const isIndonesian = document.body.classList.contains('indonesian');
        const text = isIndonesian 
            ? "Saat kita melihat setiap sudut di antara memiliki inti utama, kami merangkul spektrum luas tipologi dan metode, dari ide mentah, karya seni, seni, desain, spasial, dan penelitian."
            : "As we seeing every corner in between has a main core, we embraces a broad spectrum of typologies and methods, from raw ideas, artwork, art, design, spatial and research.";
        
        stopSpeech();
        
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.rate = parseFloat(rateControl.value) || 1;
        
        const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
        if (selectedVoice) {
            currentUtterance.voice = selectedVoice;
        }
        
        currentUtterance.onend = function() {
            console.log('Speech finished');
        };
        
        currentUtterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
        };
        
        speechSynthesis.speak(currentUtterance);
    });
    
    // Pause TTS
    pauseBtn.addEventListener('click', function() {
        console.log('Pause TTS clicked');
        if (speechSynthesis.speaking) {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
                console.log('Speech resumed');
            } else {
                speechSynthesis.pause();
                console.log('Speech paused');
            }
        }
    });
    
    // Stop TTS
    stopBtn.addEventListener('click', function() {
        console.log('Stop TTS clicked');
        stopSpeech();
    });
    
    // Rate control
    rateControl.addEventListener('input', function() {
        rateValue.textContent = this.value;
        if (currentUtterance) {
            currentUtterance.rate = parseFloat(this.value);
        }
    });
    
    // Voice selection
    voiceSelect.addEventListener('change', function() {
        if (currentUtterance) {
            const selectedVoice = voices.find(voice => voice.name === this.value);
            if (selectedVoice) {
                currentUtterance.voice = selectedVoice;
            }
        }
    });
    
    console.log('Text-to-Speech initialized');
}

function stopSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        console.log('Speech stopped');
    }
}

function updateTTSLanguage(language) {
    console.log('TTS language updated to:', language);
    // Language update will be handled when TTS is played
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
    
    // Initialize hero text - langsung muncul tanpa typing
    initHeroText();
    
    // Initialize clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Initialize posters
    const cleanupPosters = initPosters();
    
    // Initialize scroll handlers
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    
    // Initialize accessibility features
    initAccessibilityPanel();
    initAccessibilitySettings();
    initFilterButtons(); // Initialize filter functionality
    initCardInteractions();
    initBackToTop();
    
    // Initialize header and visibility button
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
    
    // Cleanup function for posters
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
        stopSpeech();
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
