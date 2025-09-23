// PERUBAHAN: Efek ketik yang lebih smooth dengan cursor
const finalTextEl = document.getElementById("finalText");
const textContent = "❝\nWE SEE EVERY CORNER\nIN BETWEEN HAS A\nMAIN CORE.";
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

// Posters repel + parallax
const posters = document.querySelectorAll(".poster");
document.addEventListener("mousemove", (e) => {
  posters.forEach(poster => {
    const rect = poster.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const moveX = -dx / dist * 20;
    const moveY = -dy / dist * 20;
    poster.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// Clock WIB (GMT+7)
function updateClock() {
  const clockEl = document.getElementById("clock");
  const now = new Date();
  const options = {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  clockEl.textContent = now.toLocaleTimeString("id-ID", options) + " WIB";
}

// Accessibility Panel Toggle
const visibilityBtn = document.getElementById("visibilityBtn");
const accessibilityPanel = document.getElementById("accessibilityPanel");
const closePanelBtn = document.querySelector(".close-panel");

visibilityBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  if (accessibilityPanel.classList.contains("show")) {
    accessibilityPanel.classList.remove("show");
    setTimeout(() => {
      accessibilityPanel.style.display = "none";
    }, 300); // Sesuaikan dengan durasi transisi
  } else {
    accessibilityPanel.style.display = "flex";
    // Trigger reflow untuk memastikan animasi berjalan
    void accessibilityPanel.offsetWidth;
    accessibilityPanel.classList.add("show");
  }
});

closePanelBtn.addEventListener("click", function() {
  accessibilityPanel.classList.remove("show");
  setTimeout(() => {
    accessibilityPanel.style.display = "none";
  }, 300); // Sesuaikan dengan durasi transisi
});

// Close panel when clicking outside
document.addEventListener("click", function(e) {
  if (!accessibilityPanel.contains(e.target) && e.target !== visibilityBtn) {
    accessibilityPanel.classList.remove("show");
    setTimeout(() => {
      accessibilityPanel.style.display = "none";
    }, 300); // Sesuaikan dengan durasi transisi
  }
});

// Mencegah panel tertutup saat mengklik di dalam panel
accessibilityPanel.addEventListener("click", function(e) {
  e.stopPropagation();
});

// Accessibility Settings
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
lightDarkSelect.addEventListener("change", function() {
  document.body.classList.remove("dark-mode");
  if (lightDarkSelect.value === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// High Contrast
highContrastToggle.addEventListener("change", function() {
  document.body.classList.toggle("high-contrast", highContrastToggle.checked);
});

// Dyslexia Mode
dyslexiaToggle.addEventListener("change", function() {
  document.body.classList.toggle("dyslexia-mode", dyslexiaToggle.checked);
});

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
  voiceSelect.innerHTML = '';
  
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
}

populateVoiceList();

textToSpeechToggle.addEventListener("change", function() {
  if (textToSpeechToggle.checked) {
    ttsControls.style.display = "block";
  } else {
    ttsControls.style.display = "none";
    if (currentUtterance) {
      speechSynthesis.cancel();
    }
  }
});

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

pauseTTS.addEventListener("click", function() {
  speechSynthesis.pause();
});

stopTTS.addEventListener("click", function() {
  speechSynthesis.cancel();
  currentUtterance = null;
});

// Magnification
magnificationToggle.addEventListener("change", function() {
  document.body.classList.toggle("magnified", magnificationToggle.checked);
});

// Keyboard Navigation
keyboardNavToggle.addEventListener("change", function() {
  document.body.classList.toggle("keyboard-navigation", keyboardNavToggle.checked);
});

// Reduced Motion
reducedMotionToggle.addEventListener("change", function() {
  document.body.classList.toggle("reduced-motion", reducedMotionToggle.checked);
});

// Color Blind Mode
colorBlindSelect.addEventListener("change", function() {
  document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
  if (colorBlindSelect.value !== "none") {
    document.body.classList.add(colorBlindSelect.value);
  }
});

// Language
languageSelect.addEventListener("change", function() {
  document.body.classList.remove("english", "indonesian");
  document.body.classList.add(languageSelect.value);
});

window.addEventListener("load", function() {
  typeWriter();
  updateClock();
  setInterval(updateClock, 1000);
});

// ... (kode JavaScript yang sudah ada) ...

// Scroll Effect untuk Sticky Container
const stickyContainer = document.querySelector('.sticky-container');
const heroSection = document.querySelector('.hero');

function handleScroll() {
  const scrollY = window.scrollY;
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

// ... (kode JavaScript yang sudah ada) ...

window.addEventListener("load", function() {
  typeWriter();
  updateClock();
  setInterval(updateClock, 1000);
  
  // Tambahkan event listener untuk scroll
  window.addEventListener('scroll', handleScroll);
});
