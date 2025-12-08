// ================================
// HEADER SHOW/HIDE ON SCROLL
// ================================
let lastScroll = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    header.classList.remove("hidden");
    header.classList.remove("scrolled");
    return;
  }
  
  // Add scrolled class when scrolling down
  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  
  // Show/hide header based on scroll direction
  if (currentScroll > lastScroll && !header.classList.contains("hidden")) {
    header.classList.add("hidden");
  } else if (currentScroll < lastScroll && header.classList.contains("hidden")) {
    header.classList.remove("hidden");
  }
  lastScroll = currentScroll;
});

// ================================
// BACK TO TOP BUTTON
// ================================
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "flex";
    setTimeout(() => {
      backToTop.classList.add("show");
    }, 10);
  } else {
    backToTop.classList.remove("show");
    setTimeout(() => {
      if (!backToTop.classList.contains("show")) {
        backToTop.style.display = "none";
      }
    }, 200);
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================================
// CLOCK WIB
// ================================
function updateClock() {
  const now = new Date();
  const options = { 
    timeZone: "Asia/Jakarta", 
    hour12: false,
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit" 
  };
  const timeInJakarta = new Intl.DateTimeFormat("id-ID", options).format(now);
  document.getElementById("indonesiaClock").textContent = timeInJakarta + " | ID";
}
setInterval(updateClock, 1000);
updateClock();

// ================================
// ACCESSIBILITY PANEL BEHAVIOR
// ================================
const visibilityBtn = document.getElementById("visibilityBtn");
const accessibilityPanel = document.getElementById("accessibilityPanel");
const closePanel = document.querySelector(".close-panel");
const resetSettings = document.getElementById("resetSettings");

visibilityBtn.addEventListener("click", () => {
  accessibilityPanel.style.display = "flex";
  setTimeout(() => accessibilityPanel.classList.add("show"), 10);
});
closePanel.addEventListener("click", () => {
  accessibilityPanel.classList.remove("show");
  setTimeout(() => (accessibilityPanel.style.display = "none"), 200);
});

// ================================
// DARK / LIGHT MODE
// ================================
const lightDarkSelect = document.getElementById("lightDark");
lightDarkSelect.addEventListener("change", (e) => {
  if (e.target.value === "dark") {
    document.body.classList.add("dark-mode");
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add("dark-mode");
  lightDarkSelect.value = "dark";
}

// ================================
// HIGH CONTRAST MODE
// ================================
const highContrast = document.getElementById("highContrast");
highContrast.addEventListener("change", () => {
  if (highContrast.checked) {
    document.body.classList.add("high-contrast");
    localStorage.setItem('highContrast', 'true');
  } else {
    document.body.classList.remove("high-contrast");
    localStorage.setItem('highContrast', 'false');
  }
});

// Load saved high contrast
const savedHighContrast = localStorage.getItem('highContrast');
if (savedHighContrast === 'true') {
  highContrast.checked = true;
  document.body.classList.add("high-contrast");
}

// ================================
// DYSLEXIA-FRIENDLY FONT
// ================================
const dyslexia = document.getElementById("dyslexia");
dyslexia.addEventListener("change", () => {
  if (dyslexia.checked) {
    document.body.classList.add("dyslexia-mode");
    localStorage.setItem('dyslexia', 'true');
  } else {
    document.body.classList.remove("dyslexia-mode");
    localStorage.setItem('dyslexia', 'false');
  }
});

// Load saved dyslexia mode
const savedDyslexia = localStorage.getItem('dyslexia');
if (savedDyslexia === 'true') {
  dyslexia.checked = true;
  document.body.classList.add("dyslexia-mode");
}

// ================================
// MAGNIFICATION
// ================================
const magnification = document.getElementById("magnification");
magnification.addEventListener("change", () => {
  if (magnification.checked) {
    document.body.classList.add("magnified");
    localStorage.setItem('magnification', 'true');
  } else {
    document.body.classList.remove("magnified");
    localStorage.setItem('magnification', 'false');
  }
});

// Load saved magnification
const savedMagnification = localStorage.getItem('magnification');
if (savedMagnification === 'true') {
  magnification.checked = true;
  document.body.classList.add("magnified");
}

// ================================
// REDUCED MOTION
// ================================
const reducedMotion = document.getElementById("reducedMotion");
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.checked) {
    document.body.classList.add("reduced-motion");
    localStorage.setItem('reducedMotion', 'true');
  } else {
    document.body.classList.remove("reduced-motion");
    localStorage.setItem('reducedMotion', 'false');
  }
});

// Load saved reduced motion
const savedReducedMotion = localStorage.getItem('reducedMotion');
if (savedReducedMotion === 'true') {
  reducedMotion.checked = true;
  document.body.classList.add("reduced-motion");
}

// ================================
// COLOR BLIND MODE
// ================================
const colorBlindSelect = document.getElementById("colorBlind");
colorBlindSelect.addEventListener("change", (e) => {
  document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
  const mode = e.target.value;
  if (mode !== "none") {
    document.body.classList.add(mode);
  }
  localStorage.setItem('colorBlind', mode);
});

// Load saved color blind mode
const savedColorBlind = localStorage.getItem('colorBlind');
if (savedColorBlind) {
  colorBlindSelect.value = savedColorBlind;
  if (savedColorBlind !== "none") {
    document.body.classList.add(savedColorBlind);
  }
}

// ================================
// TEXT TO SPEECH FEATURE
// ================================
const ttsToggle = document.getElementById("textToSpeech");
const ttsControls = document.getElementById("ttsControls");
const playBtn = document.getElementById("playTTS");
const pauseBtn = document.getElementById("pauseTTS");
const stopBtn = document.getElementById("stopTTS");
const closeTTS = document.querySelector(".close-tts");
const voiceSelect = document.getElementById("voiceSelect");
const rateControl = document.getElementById("rateControl");
const rateValue = document.getElementById("rateValue");

let voices = [];
let utterance = null;

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((v, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${v.name} (${v.lang})`;
    voiceSelect.appendChild(opt);
  });
}

if (window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

ttsToggle.addEventListener("change", () => {
  if (ttsToggle.checked) {
    ttsControls.style.display = "block";
    setTimeout(() => ttsControls.classList.add("show"), 10);
    populateVoices();
  } else {
    ttsControls.classList.remove("show");
    setTimeout(() => {
      if (!ttsControls.classList.contains("show")) {
        ttsControls.style.display = "none";
      }
    }, 200);
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
    }
  }
});

closeTTS.addEventListener("click", () => {
  ttsControls.classList.remove("show");
  setTimeout(() => {
    if (!ttsControls.classList.contains("show")) {
      ttsControls.style.display = "none";
    }
  }, 200);
  ttsToggle.checked = false;
  if (window.speechSynthesis) {
    speechSynthesis.cancel();
  }
});

rateControl.addEventListener("input", () => {
  rateValue.textContent = rateControl.value;
});

playBtn.addEventListener("click", () => {
  if (!window.speechSynthesis) {
    alert("Text-to-speech is not supported in your browser.");
    return;
  }
  
  const text = document.body.innerText;
  utterance = new SpeechSynthesisUtterance(text);
  if (voices.length > 0) {
    utterance.voice = voices[voiceSelect.value];
  }
  utterance.rate = parseFloat(rateControl.value);
  speechSynthesis.speak(utterance);
});

pauseBtn.addEventListener("click", () => {
  if (window.speechSynthesis) {
    speechSynthesis.pause();
  }
});

stopBtn.addEventListener("click", () => {
  if (window.speechSynthesis) {
    speechSynthesis.cancel();
  }
});

// ================================
// RESET SETTINGS
// ================================
resetSettings.addEventListener("click", () => {
  // Reset body classes
  document.body.className = "";
  document.body.style.filter = "";
  document.body.style.transform = "scale(1)";
  
  // Reset form elements
  lightDarkSelect.value = "light";
  highContrast.checked = false;
  dyslexia.checked = false;
  magnification.checked = false;
  reducedMotion.checked = false;
  colorBlindSelect.value = "none";
  ttsToggle.checked = false;
  
  // Hide panels
  ttsControls.classList.remove("show");
  setTimeout(() => {
    ttsControls.style.display = "none";
  }, 200);
  
  // Clear local storage
  localStorage.clear();
  
  alert("All accessibility settings have been reset.");
});

// ================================
// LOGO CLICK TO HOME
// ================================
document.querySelector('.logo').addEventListener('click', function() {
  window.location.href = 'index.html'; // Ganti dengan URL halaman utama Anda
});

// ================================
// FILTER FUNCTIONALITY - FIXED
// ================================
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.transform = 'translateY(0)';
    });
    
    // Add active class to clicked button
    this.classList.add('active');
    this.style.transform = 'translateY(-2px)';
    
    // Get filter value
    const filterValue = this.getAttribute('data-filter');
    
    // Apply filter
    filterCards(filterValue);
  });
});

// Function to filter cards
function filterCards(filterValue) {
  const allCards = document.querySelectorAll('.card');
  const additionalCards = document.querySelectorAll('.additional-card');
  const cards = [...allCards, ...additionalCards];
  
  if (filterValue === 'all') {
    // Show all cards
    cards.forEach(card => {
      card.classList.remove('hidden');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'all 0.4s ease';
    });
  } else {
    // Filter cards
    cards.forEach(card => {
      const author = card.getAttribute('data-author');
      const title = card.getAttribute('data-title').toLowerCase();
      const tags = card.getAttribute('data-tags').toLowerCase();
      
      // Check if card matches filter
      const matchesFilter = 
        author === filterValue || 
        title.includes(filterValue.toLowerCase()) || 
        tags.includes(filterValue.toLowerCase());
      
      if (matchesFilter) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'all 0.4s ease';
      } else {
        card.classList.add('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.4s ease';
      }
    });
    
    // Show additional cards container if any additional cards are visible
    const additionalCardsContainer = document.getElementById('additionalCards');
    const visibleAdditionalCards = Array.from(additionalCards).filter(card => !card.classList.contains('hidden'));
    
    if (visibleAdditionalCards.length > 0) {
      additionalCardsContainer.style.display = 'grid';
      additionalCardsContainer.classList.add('show');
    } else {
      additionalCardsContainer.style.display = 'none';
      additionalCardsContainer.classList.remove('show');
    }
  }
  
  // Show message if no cards match
  setTimeout(() => {
    const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
    if (visibleCards.length === 0 && filterValue !== 'all') {
      showNoResultsMessage(filterValue);
    } else {
      removeNoResultsMessage();
    }
  }, 400);
}

// Function to show no results message
function showNoResultsMessage(filterValue) {
  removeNoResultsMessage();
  
  const message = document.createElement('div');
  message.className = 'no-results-message';
  message.innerHTML = `
    <p>No works found for "${filterValue}"</p>
    <p class="sub-message">Try selecting a different filter</p>
  `;
  message.style.cssText = `
    text-align: center;
    padding: 60px 20px;
    font-size: 18px;
    color: #666;
    font-family: Arial, sans-serif;
    animation: fadeIn 0.5s ease;
  `;
  
  const cardList = document.querySelector('.card-list');
  cardList.parentNode.insertBefore(message, cardList.nextSibling);
}

// Function to remove no results message
function removeNoResultsMessage() {
  const existingMessage = document.querySelector('.no-results-message');
  if (existingMessage) {
    existingMessage.remove();
  }
}

// ================================
// KEYBOARD NAVIGATION
// ================================
const keyboardNav = document.getElementById("keyboardNav");
keyboardNav.addEventListener("change", () => {
  if (keyboardNav.checked) {
    document.body.classList.add("keyboard-navigation");
    localStorage.setItem('keyboardNav', 'true');
  } else {
    document.body.classList.remove("keyboard-navigation");
    localStorage.setItem('keyboardNav', 'false');
  }
});

// Load saved keyboard navigation
const savedKeyboardNav = localStorage.getItem('keyboardNav');
if (savedKeyboardNav === 'true') {
  keyboardNav.checked = true;
  document.body.classList.add("keyboard-navigation");
}

// ================================
// LANGUAGE SWITCH
// ================================
const languageSelect = document.getElementById("language");
languageSelect.addEventListener("change", (e) => {
  if (e.target.value === "indonesian") {
    document.body.classList.add("indonesian");
    document.body.classList.remove("english");
    localStorage.setItem('language', 'indonesian');
  } else {
    document.body.classList.add("english");
    document.body.classList.remove("indonesian");
    localStorage.setItem('language', 'english');
  }
});

// Load saved language
const savedLanguage = localStorage.getItem('language');
if (savedLanguage === 'indonesian') {
  languageSelect.value = "indonesian";
  document.body.classList.add("indonesian");
  document.body.classList.remove("english");
} else {
  languageSelect.value = "english";
  document.body.classList.add("english");
  document.body.classList.remove("indonesian");
}

// ================================
// VISIBILITY BUTTON SCROLL BEHAVIOR
// ================================
window.addEventListener('scroll', () => {
  const visibilityBtn = document.getElementById('visibilityBtn');
  if (window.scrollY > 100) {
    visibilityBtn.classList.add('scroll-visible');
    visibilityBtn.classList.remove('scroll-hidden');
  } else {
    visibilityBtn.classList.add('scroll-hidden');
    visibilityBtn.classList.remove('scroll-visible');
  }
});

// Initialize visibility button
document.addEventListener('DOMContentLoaded', () => {
  const visibilityBtn = document.getElementById('visibilityBtn');
  if (window.scrollY > 100) {
    visibilityBtn.classList.add('scroll-visible');
  } else {
    visibilityBtn.classList.add('scroll-hidden');
  }
});

// ================================
// ANIMATION DELAY FOR CARDS
// ================================
document.addEventListener('DOMContentLoaded', () => {
  // Add animation delay for cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${1.8 + (index * 0.2)}s`;
  });
  
  // Ensure final text is visible after animation
  const finalText = document.getElementById('finalText');
  setTimeout(() => {
    if (finalText.style.opacity === '0') {
      finalText.style.opacity = '1';
      finalText.style.animation = 'fadeInUp 0.8s ease forwards';
    }
  }, 1200);
});

// ================================
// FAST & SMOOTH ARROW BUTTON INTERACTION
// ================================

document.addEventListener('DOMContentLoaded', function() {
  const arrowButton = document.getElementById('arrowButton');
  const additionalCards = document.getElementById('additionalCards');
  const arrowButtonContainer = document.querySelector('.arrow-button-container');
  
  let hasLoadedAdditionalCards = false;
  let isAnimating = false;
  
  // Function to check scroll position for button animation - SIMPLIFIED
  function checkScrollForButtonAnimation() {
    if (!arrowButton || hasLoadedAdditionalCards || isAnimating) return;
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Show button when user has scrolled past 60% of the page
    if (scrollPosition > (document.body.scrollHeight - windowHeight) * 0.4) {
      if (!arrowButton.classList.contains('visible')) {
        arrowButton.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        arrowButton.classList.add('visible');
        
        // Start bounce animation quickly
        setTimeout(() => {
          if (arrowButton.classList.contains('visible') && !hasLoadedAdditionalCards) {
            arrowButton.classList.add('bounce');
          }
        }, 600);
      }
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', checkScrollForButtonAnimation);
  
  // Initial check
  setTimeout(checkScrollForButtonAnimation, 800);
  
  // FAST CLICK FUNCTIONALITY
  arrowButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (hasLoadedAdditionalCards || isAnimating) return;
    
    isAnimating = true;
    
    // Remove bounce animation immediately
    this.classList.remove('bounce');
    
    // Play fast click animation
    this.classList.add('clicked');
    
    // Quick ripple effect
    createRippleEffect(e);
    
    // Wait very short time for click animation
    setTimeout(() => {
      this.classList.remove('clicked');
      this.classList.add('loaded');
      
      // Load additional cards QUICKLY
      loadAdditionalCards();
      hasLoadedAdditionalCards = true;
      
      // Quick completion animation
      setTimeout(() => {
        createSuccessIndicator();
        
        // Quickly hide the button container
        arrowButtonContainer.style.opacity = '0';
        arrowButtonContainer.style.transform = 'translateY(15px) scale(0.95)';
        arrowButtonContainer.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
          arrowButtonContainer.style.display = 'none';
          adjustPageSpacing();
          isAnimating = false;
        }, 400);
      }, 150);
    }, 300);
  });
  
  // Create quick ripple effect
  function createRippleEffect(event) {
    const ripple = document.createElement('div');
    const rect = arrowButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.1);
      transform: scale(0);
      animation: ripple 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 1;
    `;
    
    // Add animation keyframes dynamically
    if (!document.querySelector('#rippleKeyframes')) {
      const style = document.createElement('style');
      style.id = 'rippleKeyframes';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
        body.dark-mode .ripple-effect {
          background: rgba(255, 255, 255, 0.1);
        }
      `;
      document.head.appendChild(style);
    }
    
    arrowButton.appendChild(ripple);
    
    // Remove ripple quickly
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 400);
  }
  
  // Create success indicator
  function createSuccessIndicator() {
    const successMessage = document.createElement('div');
    successMessage.className = 'load-success-message';
    successMessage.innerHTML = '✓ Loaded';
    successMessage.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 13px;
      color: #000;
      opacity: 0;
      animation: successFade 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      font-family: Arial, sans-serif;
      letter-spacing: 0.5px;
      pointer-events: none;
      z-index: 100;
      font-weight: 500;
    `;
    
    arrowButtonContainer.appendChild(successMessage);
    
    // Remove message quickly
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.parentNode.removeChild(successMessage);
      }
    }, 1000);
  }
  
  // Function to load additional cards FAST
  function loadAdditionalCards() {
    console.log('Loading additional works...');
    
    // Show the additional cards container immediately
    additionalCards.style.display = 'grid';
    
    // Force reflow
    additionalCards.offsetHeight;
    
    // Add show class with minimal delay
    setTimeout(() => {
      additionalCards.classList.add('show');
      
      // Animate each additional card QUICKLY
      const additionalCardElements = additionalCards.querySelectorAll('.additional-card');
      additionalCardElements.forEach((card, index) => {
        // Reset styles
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px)';
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Animate with minimal staggered delay
        setTimeout(() => {
          card.classList.add('show');
        }, index * 100);
      });
      
      // Smooth scroll to the newly loaded cards QUICKLY
      setTimeout(() => {
        const additionalCardsTop = additionalCards.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: additionalCardsTop - 80,
          behavior: 'smooth'
        });
      }, additionalCardElements.length * 100 + 200);
    }, 10);
  }
  
  // Function to adjust page spacing
  function adjustPageSpacing() {
    const worksSection = document.querySelector('.works');
    
    // Adjust spacing quickly
    setTimeout(() => {
      worksSection.style.paddingBottom = '10px';
      worksSection.style.transition = 'padding-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 200);
  }
  
  // Enhanced hover effects - FASTER
  arrowButton.addEventListener('mouseenter', function() {
    if (!hasLoadedAdditionalCards && !isAnimating && this.classList.contains('visible')) {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        svg.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))';
      }
    }
  });
  
  arrowButton.addEventListener('mouseleave', function() {
    if (!hasLoadedAdditionalCards && !isAnimating && this.classList.contains('visible')) {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.filter = 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))';
      }
    }
  });
  
  // Enhanced touch interaction for mobile
  arrowButton.addEventListener('touchstart', function(e) {
    if (!hasLoadedAdditionalCards && !isAnimating && this.classList.contains('visible')) {
      this.style.transform = 'translateY(0) scale(0.92)';
      this.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  });
  
  arrowButton.addEventListener('touchend', function(e) {
    if (!hasLoadedAdditionalCards && !isAnimating && this.classList.contains('visible')) {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  });
  
  // Handle accessibility - keyboard navigation
  arrowButton.addEventListener('keydown', function(e) {
    if ((e.key === 'Enter' || e.key === ' ') && !hasLoadedAdditionalCards && !isAnimating) {
      e.preventDefault();
      this.click();
    }
  });
  
  // Check initial position on page load
  setTimeout(() => {
    const cardList = document.querySelector('.card-list');
    if (!cardList) return;
    
    const cardListBottom = cardList.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    
    // If card list is near bottom, show button immediately
    if ((cardListBottom < viewportHeight * 1.5) && !hasLoadedAdditionalCards) {
      arrowButton.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      arrowButton.classList.add('visible');
      
      setTimeout(() => {
        if (arrowButton.classList.contains('visible') && !hasLoadedAdditionalCards) {
          arrowButton.classList.add('bounce');
        }
      }, 700);
    }
  }, 1000);
});

// ================================
// ENHANCE CARD HOVER EFFECTS
// ================================
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '100';
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ================================
// PREVENT ANIMATION CONFLICTS
// ================================
// Add a class to body when animations are complete
setTimeout(() => {
  document.body.classList.add('animations-ready');
}, 1500);

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
  const arrowButton = document.getElementById('arrowButton');
  if (document.hidden) {
    if (arrowButton && arrowButton.classList.contains('bounce')) {
      arrowButton.style.animationPlayState = 'paused';
    }
  } else {
    if (arrowButton && arrowButton.classList.contains('bounce')) {
      arrowButton.style.animationPlayState = 'running';
    }
  }
});

// ================================
// QUICK INITIALIZATION
// ================================
// Initialize faster
document.addEventListener('DOMContentLoaded', function() {
  // Prevent flash of unstyled content
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.2s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});