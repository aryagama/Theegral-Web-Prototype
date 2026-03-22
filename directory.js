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
  colorMode: localStorage.getItem("directoryColorMode") === "bw",
  fontLarge: localStorage.getItem("directoryFontSize") === "large",
  dyslexia: localStorage.getItem("directoryDyslexia") === "true"
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
  localStorage.setItem("directoryColorMode", visibilitySettings.colorMode ? "bw" : "normal");
  renderVisibilityStates();
});

toggleFontSize.addEventListener("click", () => {
  visibilitySettings.fontLarge = !visibilitySettings.fontLarge;
  localStorage.setItem("directoryFontSize", visibilitySettings.fontLarge ? "large" : "normal");
  renderVisibilityStates();
});

toggleDyslexia.addEventListener("click", () => {
  visibilitySettings.dyslexia = !visibilitySettings.dyslexia;
  localStorage.setItem("directoryDyslexia", visibilitySettings.dyslexia ? "true" : "false");
  renderVisibilityStates();
});

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
