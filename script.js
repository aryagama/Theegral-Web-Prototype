const randomTextEl = document.getElementById("randomText");
const finalTextEl = document.getElementById("finalText");
const finalText = "WE SEE EVERY CORNER IN BETWEEN HAS A MAIN CORE.";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let iterations = 0;

// Generate random scrambled text
function generateRandomText(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Animate text on load
function animateText() {
  const interval = setInterval(() => {
    randomTextEl.textContent = generateRandomText(finalText.length);

    iterations++;
    if (iterations > 15) {
      clearInterval(interval);
      randomTextEl.style.display = "none";
      finalTextEl.style.opacity = 1;
    }
  }, 100);
}

// Clock WIB (GMT+7)
function updateClock() {
  const clockEl = document.getElementById("clock");
  const now = new Date();
  // convert ke WIB
  const options = {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  clockEl.textContent = now.toLocaleTimeString("id-ID", options) + " WIB";
}

window.addEventListener("load", () => {
  animateText();
  updateClock();
  setInterval(updateClock, 1000);
});
