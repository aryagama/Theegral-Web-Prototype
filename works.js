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
// ACCESSIBILITY PANEL + 3 CONTROLS
// ================================
const visibilityBtn = document.getElementById("visibilityBtn");
const accessibilityPanel = document.getElementById("accessibilityPanel");
const toggleColorMode = document.getElementById("toggleColorMode");
const toggleFontSize = document.getElementById("toggleFontSize");
const toggleDyslexia = document.getElementById("toggleDyslexia");
const colorState = document.getElementById("colorState");
const fontState = document.getElementById("fontState");
const dyslexiaState = document.getElementById("dyslexiaState");

const visibilitySettings = {
  colorMode: localStorage.getItem("worksColorMode") === "bw",
  fontLarge: localStorage.getItem("worksFontSize") === "large",
  dyslexia: localStorage.getItem("worksDyslexia") === "true"
};

function renderVisibilityStates() {
  document.body.classList.toggle("bw-mode", visibilitySettings.colorMode);
  document.body.classList.toggle("font-large-simple", visibilitySettings.fontLarge);
  document.body.classList.toggle("dyslexia-mode", visibilitySettings.dyslexia);

  colorState.classList.toggle("active", visibilitySettings.colorMode);
  fontState.classList.toggle("active", visibilitySettings.fontLarge);
  dyslexiaState.classList.toggle("active", visibilitySettings.dyslexia);
}

visibilityBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = accessibilityPanel.classList.contains("show");
  if (isOpen) {
    accessibilityPanel.classList.remove("show");
    setTimeout(() => {
      accessibilityPanel.style.display = "none";
    }, 180);
  } else {
    accessibilityPanel.style.display = "flex";
    requestAnimationFrame(() => {
      accessibilityPanel.classList.add("show");
    });
  }
});

document.addEventListener("click", (event) => {
  if (
    accessibilityPanel.classList.contains("show") &&
    !accessibilityPanel.contains(event.target) &&
    !visibilityBtn.contains(event.target)
  ) {
    accessibilityPanel.classList.remove("show");
    setTimeout(() => {
      accessibilityPanel.style.display = "none";
    }, 180);
  }
});

accessibilityPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});

toggleColorMode.addEventListener("click", () => {
  visibilitySettings.colorMode = !visibilitySettings.colorMode;
  localStorage.setItem("worksColorMode", visibilitySettings.colorMode ? "bw" : "normal");
  renderVisibilityStates();
});

toggleFontSize.addEventListener("click", () => {
  visibilitySettings.fontLarge = !visibilitySettings.fontLarge;
  localStorage.setItem("worksFontSize", visibilitySettings.fontLarge ? "large" : "normal");
  renderVisibilityStates();
});

toggleDyslexia.addEventListener("click", () => {
  visibilitySettings.dyslexia = !visibilitySettings.dyslexia;
  localStorage.setItem("worksDyslexia", visibilitySettings.dyslexia ? "true" : "false");
  renderVisibilityStates();
});

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
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.transform = 'translateY(0)';
    });
    
    this.classList.add('active');
    this.style.transform = 'translateY(-2px)';
    
    const filterValue = this.getAttribute('data-filter');
    
    filterCards(filterValue);
  });
});

function filterCards(filterValue) {
  const allCards = document.querySelectorAll('.card');
  const additionalCards = document.querySelectorAll('.additional-card');
  const cards = [...allCards, ...additionalCards];
  const normalizedFilter = filterValue.toLowerCase();
  
  if (normalizedFilter === 'all') {
    cards.forEach(card => {
      card.classList.remove('hidden');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'all 0.4s ease';
    });
  } else {
    cards.forEach(card => {
      const author = card.getAttribute('data-author');
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      
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
function showNoResultsMessage(contextText) {
  removeNoResultsMessage();

  const message = document.createElement('div');
  message.className = 'no-results-message';
  message.style.cssText = `
    text-align: center;
    padding: 60px 20px;
    font-size: 18px;
    color: #666;
    font-family: Arial, sans-serif;
    animation: fadeIn 0.5s ease;
  `;

  const mainLine = document.createElement('p');
  mainLine.textContent = `No works found for ${contextText}`;

  const subLine = document.createElement('p');
  subLine.className = 'sub-message';
  subLine.textContent = 'Try another filter or search keyword';

  message.appendChild(mainLine);
  message.appendChild(subLine);

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
    additionalCards.dataset.manualReveal = 'true';
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
