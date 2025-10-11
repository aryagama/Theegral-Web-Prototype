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
  alert("All accessibility settings have been reset.");
});

// ================================
// LOGO CLICK TO HOME
// ================================
document.querySelector('.logo').addEventListener('click', function() {
  window.location.href = 'index.html'; // Ganti dengan URL halaman utama Anda
});

// ================================
// FILTER FUNCTIONALITY
// ================================
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    document.querySelectorAll('.filters button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Filter functionality would go here
    // For now, we'll just log the filter type
    console.log('Filter clicked:', this.textContent);
  });
});