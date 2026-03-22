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
  const options = {
    timeZone: "Asia/Jakarta",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  const timeInJakarta = new Intl.DateTimeFormat("id-ID", options).format(now);
  document.getElementById("indonesiaClock").textContent = `${timeInJakarta} | ID`;
}
setInterval(updateClock, 1000);
updateClock();

// ================================
// SIMPLE VISIBILITY BUBBLE
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
  colorMode: localStorage.getItem("aboutColorMode") === "bw",
  fontLarge: localStorage.getItem("aboutFontSize") === "large",
  dyslexia: localStorage.getItem("aboutDyslexia") === "true"
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
  localStorage.setItem("aboutColorMode", visibilitySettings.colorMode ? "bw" : "normal");
  renderVisibilityStates();
});

toggleFontSize.addEventListener("click", () => {
  visibilitySettings.fontLarge = !visibilitySettings.fontLarge;
  localStorage.setItem("aboutFontSize", visibilitySettings.fontLarge ? "large" : "normal");
  renderVisibilityStates();
});

toggleDyslexia.addEventListener("click", () => {
  visibilitySettings.dyslexia = !visibilitySettings.dyslexia;
  localStorage.setItem("aboutDyslexia", visibilitySettings.dyslexia ? "true" : "false");
  renderVisibilityStates();
});

renderVisibilityStates();

// ================================
// LOGO CLICK TO HOME
// ================================
document.querySelector(".logo").addEventListener("click", function() {
  window.location.href = "index.html";
});
