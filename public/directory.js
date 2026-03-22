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
// EXPANDABLE DIRECTORY ITEMS
// ================================
let currentlyExpandedItem = null;
let hasLoadedAdditionalDirectory = false;

function initializeDirectoryItems() {
  const items = document.querySelectorAll(".directory-list .item");

  items.forEach((item) => {
    const itemMain = item.querySelector(".item-main");
    const viewDetailsBtn = item.querySelector(".view-details-btn");
    const dataHref = itemMain.getAttribute("data-href");

    itemMain.addEventListener("click", function(e) {
      e.stopPropagation();

      if (currentlyExpandedItem && currentlyExpandedItem !== item) {
        currentlyExpandedItem.classList.remove("expanded");
      }

      const wasExpanded = item.classList.contains("expanded");
      item.classList.toggle("expanded");

      if (item.classList.contains("expanded")) {
        currentlyExpandedItem = item;

        if (!wasExpanded) {
          const rect = item.getBoundingClientRect();
          if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      } else {
        currentlyExpandedItem = null;
      }
    });

    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        window.location.href = dataHref;
      });
    }

    document.addEventListener("click", function(e) {
      if (!item.contains(e.target) && item.classList.contains("expanded")) {
        item.classList.remove("expanded");
        currentlyExpandedItem = null;
      }
    });
  });
}

// ================================
// FILTER FUNCTIONALITY
// ================================
function applyDirectoryFilter(filterValue) {
  const items = document.querySelectorAll(".directory-list .item");

  items.forEach((item) => {
    if (!hasLoadedAdditionalDirectory && item.classList.contains("additional-directory-item")) {
      item.style.display = "none";
      if (item.classList.contains("expanded")) {
        item.classList.remove("expanded");
        currentlyExpandedItem = null;
      }
      return;
    }

    if (filterValue === "All") {
      item.style.display = "block";
    } else {
      const itemType = item.getAttribute("data-type");
      if (itemType === filterValue) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
        if (item.classList.contains("expanded")) {
          item.classList.remove("expanded");
          currentlyExpandedItem = null;
        }
      }
    }
  });

  if (currentlyExpandedItem && currentlyExpandedItem.style.display === "none") {
    currentlyExpandedItem.classList.remove("expanded");
    currentlyExpandedItem = null;
  }
}

function initializeFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      applyDirectoryFilter(filterValue);
    });
  });
}

// ================================
// OTHER TRIGGER (LOAD MORE)
// ================================
function initializeOtherTrigger() {
  const otherTrigger = document.getElementById("otherTrigger");
  const otherBottom = document.getElementById("otherBottom");
  const additionalItems = document.querySelectorAll(".directory-list .additional-directory-item");

  if (!otherTrigger || additionalItems.length === 0) return;

  function revealAdditionalItems() {
    if (hasLoadedAdditionalDirectory) return;

    hasLoadedAdditionalDirectory = true;
    otherTrigger.style.display = "none";

    additionalItems.forEach((item, index) => {
      item.style.display = "block";
      item.style.opacity = "0";
      item.style.transform = "translateY(18px)";
      item.style.transition = "opacity 0.35s ease, transform 0.35s ease";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 80);
    });

    if (otherBottom) {
      otherBottom.classList.add("show");
      otherBottom.setAttribute("aria-hidden", "false");
    }

    const activeButton = document.querySelector(".filter-btn.active");
    const activeFilter = activeButton ? activeButton.getAttribute("data-filter") : "All";
    applyDirectoryFilter(activeFilter);
  }

  additionalItems.forEach((item) => {
    item.style.display = "none";
  });

  otherTrigger.addEventListener("click", function(event) {
    event.preventDefault();
    revealAdditionalItems();
  });

  otherTrigger.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      revealAdditionalItems();
    }
  });
}

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
  theme: localStorage.getItem("directoryTheme") || "light",
  fontSize: localStorage.getItem("directoryFontSize") || "medium",
  dyslexia: localStorage.getItem("directoryDyslexia") === "true"
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
    localStorage.setItem("directoryTheme", visibilitySettings.theme);
    renderVisibilityStates();
  });
}

if (toggleFontSize) {
  toggleFontSize.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentIndex = fontOrder.indexOf(visibilitySettings.fontSize);
    const nextIndex = (currentIndex + 1) % fontOrder.length;
    visibilitySettings.fontSize = fontOrder[nextIndex];
    localStorage.setItem("directoryFontSize", visibilitySettings.fontSize);
    renderVisibilityStates();
  });
}

if (toggleDyslexia) {
  toggleDyslexia.addEventListener("click", (event) => {
    event.stopPropagation();
    visibilitySettings.dyslexia = !visibilitySettings.dyslexia;
    localStorage.setItem("directoryDyslexia", visibilitySettings.dyslexia ? "true" : "false");
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

// ================================
// INITIALIZATION
// ================================
document.addEventListener("DOMContentLoaded", function() {
  initializeDirectoryItems();
  initializeOtherTrigger();
  initializeFilterButtons();

  const allButton = document.querySelector('.filter-btn[data-filter="All"]');
  if (allButton) {
    allButton.classList.add("active");
  }
  applyDirectoryFilter("All");
});
