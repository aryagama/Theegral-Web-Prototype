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
// VISIBILITY CAPSULE (2-STEP)
// ================================
const visibilityBtn = document.getElementById("visibilityBtn");
const accessibilityPanel = document.getElementById("accessibilityPanel");
const visibilityBubble = accessibilityPanel ? accessibilityPanel.querySelector(".visibility-bubble") : null;
const toggleColorMode = document.getElementById("toggleColorMode");
const toggleFontSize = document.getElementById("toggleFontSize");
const toggleDyslexia = document.getElementById("toggleDyslexia");
const colorState = document.getElementById("colorState");
const fontState = document.getElementById("fontState");
const dyslexiaState = document.getElementById("dyslexiaState");

let visibilityBubbleExpanded = false;
const fontOrder = ["small", "medium", "large"];

const visibilitySettings = {
  theme: localStorage.getItem("worksTheme") || "light",
  fontSize: localStorage.getItem("worksFontSize") || "medium",
  dyslexia: localStorage.getItem("worksDyslexia") === "true"
};

function renderVisibilityStates() {
  const isDark = visibilitySettings.theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle("bw-mode", isDark);

  document.body.classList.remove("font-small-simple", "font-medium-simple", "font-large-simple");
  document.body.classList.add(`font-${visibilitySettings.fontSize}-simple`);

  document.body.classList.toggle("dyslexia-mode", visibilitySettings.dyslexia);

  if (colorState) {
    colorState.classList.toggle("active", isDark);
  }
  if (fontState) {
    fontState.classList.remove("size-small", "size-medium", "size-large", "active");
    fontState.classList.add(`size-${visibilitySettings.fontSize}`);
    if (visibilitySettings.fontSize !== "medium") {
      fontState.classList.add("active");
    }
  }
  if (dyslexiaState) {
    dyslexiaState.classList.toggle("active", visibilitySettings.dyslexia);
  }
}

function setVisibilityBubbleExpanded(expanded) {
  visibilityBubbleExpanded = expanded;
  if (visibilityBubble) {
    visibilityBubble.classList.toggle("open", expanded);
  }
}

function showVisibilityBubble() {
  if (!accessibilityPanel) return;
  accessibilityPanel.style.display = "block";
  requestAnimationFrame(() => {
    accessibilityPanel.classList.add("show");
    document.body.classList.add("visibility-panel-open");
  });
  setVisibilityBubbleExpanded(false);
}

function hideVisibilityBubble() {
  if (!accessibilityPanel) return;
  accessibilityPanel.classList.remove("show");
  document.body.classList.remove("visibility-panel-open");
  setVisibilityBubbleExpanded(false);
  setTimeout(() => {
    accessibilityPanel.style.display = "none";
  }, 180);
}

if (visibilityBtn && accessibilityPanel) {
  visibilityBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isVisible = accessibilityPanel.classList.contains("show");
    if (isVisible) {
      hideVisibilityBubble();
    } else {
      showVisibilityBubble();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      accessibilityPanel.classList.contains("show") &&
      !accessibilityPanel.contains(event.target) &&
      !visibilityBtn.contains(event.target)
    ) {
      hideVisibilityBubble();
    }
  });

  accessibilityPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (visibilityBubble) {
  visibilityBubble.addEventListener("click", () => {
    setVisibilityBubbleExpanded(!visibilityBubbleExpanded);
  });
}

if (toggleColorMode) {
  toggleColorMode.addEventListener("click", (event) => {
    event.stopPropagation();
    visibilitySettings.theme = visibilitySettings.theme === "dark" ? "light" : "dark";
    localStorage.setItem("worksTheme", visibilitySettings.theme);
    renderVisibilityStates();
  });
}

if (toggleFontSize) {
  toggleFontSize.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentIndex = fontOrder.indexOf(visibilitySettings.fontSize);
    const nextIndex = (currentIndex + 1) % fontOrder.length;
    visibilitySettings.fontSize = fontOrder[nextIndex];
    localStorage.setItem("worksFontSize", visibilitySettings.fontSize);
    renderVisibilityStates();
  });
}

if (toggleDyslexia) {
  toggleDyslexia.addEventListener("click", (event) => {
    event.stopPropagation();
    visibilitySettings.dyslexia = !visibilitySettings.dyslexia;
    localStorage.setItem("worksDyslexia", visibilitySettings.dyslexia ? "true" : "false");
    renderVisibilityStates();
  });
}

renderVisibilityStates();

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
  const normalizedFilter = filterValue.toLowerCase();
  
  if (normalizedFilter === 'all') {
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
        title.includes(normalizedFilter) || 
        tags.includes(normalizedFilter);
      
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
    if (visibleCards.length === 0 && normalizedFilter !== 'all') {
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
// LOAD MORE WITH "OTHER" TEXT
// ================================
document.addEventListener('DOMContentLoaded', function() {
  const otherTrigger = document.getElementById('otherTrigger');
  const otherBottom = document.getElementById('otherBottom');
  const additionalCards = document.getElementById('additionalCards');
  const worksSection = document.querySelector('.works');
  let hasLoadedAdditionalCards = false;

  if (!otherTrigger || !additionalCards) return;

  function loadAdditionalCards() {
    if (hasLoadedAdditionalCards) return;

    hasLoadedAdditionalCards = true;
    otherTrigger.classList.add('loaded');
    otherTrigger.style.display = 'none';

    additionalCards.style.display = 'grid';
    additionalCards.offsetHeight;
    additionalCards.classList.add('show');
    if (otherBottom) {
      otherBottom.classList.add('show');
      otherBottom.setAttribute('aria-hidden', 'false');
    }

    const additionalCardElements = additionalCards.querySelectorAll('.additional-card');
    additionalCardElements.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(25px)';
      card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100);
    });

    if (worksSection) {
      worksSection.style.paddingBottom = '10px';
      worksSection.style.transition = 'padding-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    setTimeout(() => {
      const additionalCardsTop = additionalCards.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: additionalCardsTop - 80,
        behavior: 'smooth'
      });
    }, additionalCardElements.length * 100 + 200);
  }

  otherTrigger.addEventListener('click', function(event) {
    event.preventDefault();
    loadAdditionalCards();
  });

  otherTrigger.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      loadAdditionalCards();
    }
  });
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
  const arrowButton = document.getElementById('otherTrigger');
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
