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
  theme: localStorage.getItem("aboutTheme") || "light",
  fontSize: localStorage.getItem("aboutFontSize") || "medium",
  dyslexia: localStorage.getItem("aboutDyslexia") === "true"
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
    localStorage.setItem("aboutTheme", visibilitySettings.theme);
    renderVisibilityStates();
  });
}

if (toggleFontSize) {
  toggleFontSize.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentIndex = fontOrder.indexOf(visibilitySettings.fontSize);
    const nextIndex = (currentIndex + 1) % fontOrder.length;
    visibilitySettings.fontSize = fontOrder[nextIndex];
    localStorage.setItem("aboutFontSize", visibilitySettings.fontSize);
    renderVisibilityStates();
  });
}

if (toggleDyslexia) {
  toggleDyslexia.addEventListener("click", (event) => {
    event.stopPropagation();
    visibilitySettings.dyslexia = !visibilitySettings.dyslexia;
    localStorage.setItem("aboutDyslexia", visibilitySettings.dyslexia ? "true" : "false");
    renderVisibilityStates();
  });
}

renderVisibilityStates();

// ================================
// LOGO CLICK TO HOME
// ================================
document.querySelector(".logo").addEventListener("click", function() {
  window.location.href = "index.html";
});
