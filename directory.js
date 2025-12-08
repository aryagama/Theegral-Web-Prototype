// ================================
// HEADER SHOW/HIDE ON SCROLL
// ================================
let lastScroll = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    header.classList.remove("hidden");
    return;
  }
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
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
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
  const options = { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const timeInJakarta = new Intl.DateTimeFormat("id-ID", options).format(now);
  document.getElementById("indonesiaClock").textContent = timeInJakarta + " | ID";
}
setInterval(updateClock, 1000);
updateClock();

// ================================
// EXPANDABLE DIRECTORY ITEMS (REVISED)
// ================================
let currentlyExpandedItem = null;

function initializeDirectoryItems() {
  const items = document.querySelectorAll('.directory-list .item');
  
  items.forEach(item => {
    const itemMain = item.querySelector('.item-main');
    const viewDetailsBtn = item.querySelector('.view-details-btn');
    const dataHref = itemMain.getAttribute('data-href');
    
    // Handle click on item main
    itemMain.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Collapse item yang sedang expanded sebelumnya
      if (currentlyExpandedItem && currentlyExpandedItem !== item) {
        currentlyExpandedItem.classList.remove('expanded');
      }
      
      // Toggle item saat ini
      const wasExpanded = item.classList.contains('expanded');
      item.classList.toggle('expanded');
      
      // Update currently expanded item
      if (item.classList.contains('expanded')) {
        currentlyExpandedItem = item;
        
        // Scroll item ke view jika diperlukan (hanya saat membuka)
        if (!wasExpanded) {
          const rect = item.getBoundingClientRect();
          if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      } else {
        currentlyExpandedItem = null;
      }
    });
    
    // Handle click on view details button
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        window.location.href = dataHref;
      });
    }
    
    // Close expanded item when clicking outside
    document.addEventListener('click', function(e) {
      if (!item.contains(e.target) && item.classList.contains('expanded')) {
        item.classList.remove('expanded');
        currentlyExpandedItem = null;
      }
    });
  });
}

// ================================
// FILTER FUNCTIONALITY
// ================================
function initializeFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.directory-list .item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter items
      items.forEach(item => {
        if (filterValue === 'All') {
          item.style.display = 'block';
        } else {
          const itemType = item.getAttribute('data-type');
          if (itemType === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
            
            // Juga collapse item jika sedang expanded
            if (item.classList.contains('expanded')) {
              item.classList.remove('expanded');
              currentlyExpandedItem = null;
            }
          }
        }
      });
      
      // Reset currently expanded item saat filter berubah
      if (currentlyExpandedItem && currentlyExpandedItem.style.display === 'none') {
        currentlyExpandedItem.classList.remove('expanded');
        currentlyExpandedItem = null;
      }
    });
  });
}

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
  setTimeout(() => (accessibilityPanel.style.display = "none"), 300);
});

// ================================
// DARK / LIGHT MODE
// ================================
const lightDarkSelect = document.getElementById("lightDark");
lightDarkSelect.addEventListener("change", (e) => {
  if (e.target.value === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

// ================================
// HIGH CONTRAST MODE
// ================================
const highContrast = document.getElementById("highContrast");
highContrast.addEventListener("change", () => {
  if (highContrast.checked) {
    document.body.style.filter = "contrast(1.5)";
  } else {
    document.body.style.filter = "contrast(1)";
  }
});

// ================================
// DYSLEXIA-FRIENDLY FONT
// ================================
const dyslexia = document.getElementById("dyslexia");
dyslexia.addEventListener("change", () => {
  if (dyslexia.checked) {
    document.body.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";
  } else {
    document.body.style.fontFamily = "'Times New Roman', Times, serif";
  }
});

// ================================
// MAGNIFICATION
// ================================
const magnification = document.getElementById("magnification");
magnification.addEventListener("change", () => {
  document.body.style.transformOrigin = "center top";
  if (magnification.checked) {
    document.body.style.transform = "scale(1.1)";
  } else {
    document.body.style.transform = "scale(1)";
  }
});

// ================================
// REDUCED MOTION
// ================================
const reducedMotion = document.getElementById("reducedMotion");
reducedMotion.addEventListener("change", () => {
  const allElements = document.querySelectorAll("*");
  if (reducedMotion.checked) {
    allElements.forEach(el => el.style.transition = "none");
  } else {
    allElements.forEach(el => el.style.transition = "");
  }
});

// ================================
// COLOR BLIND MODE
// ================================
const colorBlindSelect = document.getElementById("colorBlind");
colorBlindSelect.addEventListener("change", (e) => {
  document.body.style.filter = "";
  const mode = e.target.value;
  if (mode !== "none") {
    document.body.style.filter = `url(#${mode})`;
  }
});

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
speechSynthesis.onvoiceschanged = populateVoices;

ttsToggle.addEventListener("change", () => {
  if (ttsToggle.checked) {
    ttsControls.classList.add("show");
    populateVoices();
  } else {
    ttsControls.classList.remove("show");
    speechSynthesis.cancel();
  }
});
closeTTS.addEventListener("click", () => {
  ttsControls.classList.remove("show");
  ttsToggle.checked = false;
  speechSynthesis.cancel();
});
rateControl.addEventListener("input", () => {
  rateValue.textContent = rateControl.value;
});
playBtn.addEventListener("click", () => {
  const text = document.body.innerText;
  utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices[voiceSelect.value];
  utterance.rate = parseFloat(rateControl.value);
  speechSynthesis.speak(utterance);
});
pauseBtn.addEventListener("click", () => speechSynthesis.pause());
stopBtn.addEventListener("click", () => speechSynthesis.cancel());

// ================================
// RESET SETTINGS
// ================================
resetSettings.addEventListener("click", () => {
  document.body.className = "";
  document.body.style.filter = "";
  document.body.style.transform = "scale(1)";
  lightDarkSelect.value = "light";
  highContrast.checked = false;
  dyslexia.checked = false;
  magnification.checked = false;
  reducedMotion.checked = false;
  colorBlindSelect.value = "none";
  ttsToggle.checked = false;
  ttsControls.classList.remove("show");
  
  // Juga collapse semua item yang expanded
  document.querySelectorAll('.item.expanded').forEach(item => {
    item.classList.remove('expanded');
  });
  currentlyExpandedItem = null;
  
  alert("All accessibility settings have been reset.");
});

// ================================
// LOGO CLICK TO HOME
// ================================
document.querySelector('.logo').addEventListener('click', function() {
  window.location.href = 'index.html'; // Ganti dengan URL halaman utama Anda
});

// ================================
// KEYBOARD NAVIGATION SUPPORT
// ================================
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // ESC key closes expanded item
    if (e.key === 'Escape' && currentlyExpandedItem) {
      currentlyExpandedItem.classList.remove('expanded');
      currentlyExpandedItem = null;
    }
    
    // Arrow keys navigation between items
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const items = Array.from(document.querySelectorAll('.directory-list .item:not([style*="display: none"])'));
      const currentIndex = items.indexOf(currentlyExpandedItem);
      
      if (e.key === 'ArrowDown' && currentIndex < items.length - 1) {
        e.preventDefault();
        const nextItem = items[currentIndex + 1];
        if (currentlyExpandedItem) currentlyExpandedItem.classList.remove('expanded');
        nextItem.classList.add('expanded');
        currentlyExpandedItem = nextItem;
        nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        const prevItem = items[currentIndex - 1];
        if (currentlyExpandedItem) currentlyExpandedItem.classList.remove('expanded');
        prevItem.classList.add('expanded');
        currentlyExpandedItem = prevItem;
        prevItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });
}

// ================================
// TOUCH DEVICE SUPPORT
// ================================
function initializeTouchSupport() {
  let touchStartY = 0;
  let touchEndY = 0;
  
  document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  }, false);
  
  document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    
    // Swipe down to close expanded item
    if (currentlyExpandedItem && touchEndY - touchStartY > 50) {
      currentlyExpandedItem.classList.remove('expanded');
      currentlyExpandedItem = null;
    }
  }, false);
}

// ================================
// INITIALIZE ALL FUNCTIONALITY
// ================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize directory items
  initializeDirectoryItems();
  
  // Initialize filter buttons
  initializeFilterButtons();
  
  // Initialize keyboard navigation
  initializeKeyboardNavigation();
  
  // Initialize touch support for mobile devices
  initializeTouchSupport();
  
  // Set filter "All" as active by default
  document.querySelector('.filter-btn[data-filter="All"]').classList.add('active');
  
  // Add animation delay to items for staggered effect
  const items = document.querySelectorAll('.directory-list .item');
  items.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
  });
});
