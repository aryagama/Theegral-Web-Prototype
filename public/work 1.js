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
  theme: localStorage.getItem("work1Theme") || "light",
  fontSize: localStorage.getItem("work1FontSize") || "medium",
  dyslexia: localStorage.getItem("work1Dyslexia") === "true"
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
    localStorage.setItem("work1Theme", visibilitySettings.theme);
    renderVisibilityStates();
  });
}

if (toggleFontSize) {
  toggleFontSize.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentIndex = fontOrder.indexOf(visibilitySettings.fontSize);
    const nextIndex = (currentIndex + 1) % fontOrder.length;
    visibilitySettings.fontSize = fontOrder[nextIndex];
    localStorage.setItem("work1FontSize", visibilitySettings.fontSize);
    renderVisibilityStates();
  });
}

if (toggleDyslexia) {
  toggleDyslexia.addEventListener("click", (event) => {
    event.stopPropagation();
    visibilitySettings.dyslexia = !visibilitySettings.dyslexia;
    localStorage.setItem("work1Dyslexia", visibilitySettings.dyslexia ? "true" : "false");
    renderVisibilityStates();
  });
}

renderVisibilityStates();

// ================================
// COMMENT BUBBLE + STICKY NOTES (WORK 1 ONLY)
// ================================
function initBottomCommentBubble() {
  const commentBubble = document.getElementById("commentPromptBubble");
  const commentCopy = document.getElementById("commentBubbleCopy");
  const stickyLaunchBtn = document.getElementById("stickyLaunchBtn");
  const stickyPalette = document.getElementById("commentStickyPalette");
  const stickyLayer = document.getElementById("stickyNotesLayer");

  if (!commentBubble || !commentCopy || !stickyLaunchBtn || !stickyPalette || !stickyLayer) {
    return;
  }

  const pageSlug = window.location.pathname.includes("/work-2") ? "work-2" : "work-1";
  const storageKey = pageSlug === "work-1" ? "work1StickyNotesData" : `${pageSlug}StickyNotesData`;
  const devStorageKey = pageSlug === "work-1" ? "work1DeveloperMode" : `${pageSlug}DeveloperMode`;
  const stickyApiEndpoint = `/api/work1-sticky-notes?pageKey=${encodeURIComponent(pageSlug)}`;
  const query = new URLSearchParams(window.location.search);
  if (query.get("dev") === "1") {
    localStorage.setItem(devStorageKey, "true");
  } else if (query.get("dev") === "0") {
    localStorage.setItem(devStorageKey, "false");
  } else if (localStorage.getItem(devStorageKey) === null) {
    localStorage.setItem(devStorageKey, "false");
  }
  const isDeveloperMode = () => localStorage.getItem(devStorageKey) === "true";
  let commentExpanded = false;
  let commentDismissed = false;
  let dragGhost = null;
  let topZ = 1;
  let remoteSaveTimer = null;
  let isRestoringNotes = false;
  const noteColors = ["#e4c965", "#f5e7c4", "#f4cdbf", "#f4e89a", "#d9ebbd", "#bee4f2", "#d8c3ea", "#e0d5b8"];
  let launchColor = noteColors[0];

  const syncStickyLayerSize = () => {
    stickyLayer.style.minHeight = `${Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    )}px`;
  };

  const updateBubbleVisibility = () => {
    if (commentDismissed) {
      commentBubble.classList.remove("show", "expanded");
      commentBubble.setAttribute("aria-hidden", "true");
      stickyPalette.setAttribute("aria-hidden", "true");
      return;
    }

    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 170;
    commentBubble.classList.toggle("show", nearBottom);
    commentBubble.setAttribute("aria-hidden", nearBottom ? "false" : "true");
    stickyPalette.setAttribute("aria-hidden", "true");
  };

  const setExpanded = (expanded) => {
    commentExpanded = expanded;
    commentBubble.classList.toggle("expanded", expanded);
    commentCopy.textContent = "";
    stickyPalette.setAttribute("aria-hidden", expanded ? "false" : "true");
  };

  const postNotesToApi = async (notes) => {
    try {
      await fetch(stickyApiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: pageSlug, notes }),
        cache: "no-store"
      });
    } catch (_error) {
      // Keep local fallback only when remote is unavailable.
    }
  };

  const queueRemoteSave = (notes) => {
    if (remoteSaveTimer) {
      clearTimeout(remoteSaveTimer);
    }
    remoteSaveTimer = setTimeout(() => {
      postNotesToApi(notes);
    }, 350);
  };

  const saveNotes = () => {
    const notes = Array.from(stickyLayer.querySelectorAll(".sticky-note")).map((note) => {
      const editor = note.querySelector(".sticky-note-editor");
      return {
        id: note.dataset.noteId,
        x: parseFloat(note.style.left) || 0,
        y: parseFloat(note.style.top) || 0,
        color: note.dataset.color || "#e4c965",
        text: editor ? (editor.innerText || "").replace(/\r/g, "") : "",
        alignX: note.dataset.alignX || "left",
        alignY: note.dataset.alignY || "top",
        saved: note.classList.contains("note-saved")
      };
    });
    localStorage.setItem(storageKey, JSON.stringify(notes));
    if (!isRestoringNotes) {
      queueRemoteSave(notes);
    }
    return notes;
  };

  const focusEditorWithCaret = (editor) => {
    if (!editor) return;
    editor.focus();
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const applyNoteAlignment = (note) => {
    const wrap = note.querySelector(".sticky-note-editor-wrap");
    const editor = note.querySelector(".sticky-note-editor");
    if (!wrap || !editor) return;

    wrap.classList.remove("align-y-top", "align-y-middle", "align-y-bottom");
    editor.classList.remove("align-x-left", "align-x-center", "align-x-right");

    wrap.classList.add(`align-y-${note.dataset.alignY || "top"}`);
    editor.classList.add(`align-x-${note.dataset.alignX || "left"}`);
  };

  const setNoteEditable = (note, editable) => {
    const editor = note.querySelector(".sticky-note-editor");
    if (!editor) return;
    editor.setAttribute("contenteditable", editable ? "true" : "false");
    editor.style.cursor = editable ? "text" : "default";
  };

  const createColorButton = (note, color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sticky-note-color";
    button.style.setProperty("--sticky-color", color);
    button.dataset.color = color;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      note.dataset.color = color;
      note.style.setProperty("--note-color", color);
      const all = note.querySelectorAll(".sticky-note-color");
      all.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      saveNotes();
    });
    return button;
  };

  const createStickyNote = (pageX, pageY, initialData) => {
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.dataset.noteId = initialData?.id || `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    note.dataset.color = initialData?.color || launchColor;
    note.style.setProperty("--note-color", note.dataset.color);
    topZ += 1;
    note.style.zIndex = String(topZ);

    const docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );
    const safeX = Math.min(Math.max(12, pageX - 85), docWidth - 182);
    const safeY = Math.min(Math.max(12, pageY - 85), docHeight - 220);
    note.style.left = `${initialData?.x ?? safeX}px`;
    note.style.top = `${initialData?.y ?? safeY}px`;

    note.dataset.alignX = initialData?.alignX || "left";
    note.dataset.alignY = initialData?.alignY || "top";

    const editorWrap = document.createElement("div");
    editorWrap.className = "sticky-note-editor-wrap";
    const editor = document.createElement("div");
    editor.className = "sticky-note-editor";
    editor.setAttribute("contenteditable", "true");
    editor.setAttribute("role", "textbox");
    editor.setAttribute("aria-label", "Sticky note text");
    editor.setAttribute("data-placeholder", "Text");
    editor.textContent = initialData?.text || "";
    editorWrap.appendChild(editor);
    note.appendChild(editorWrap);

    const controls = document.createElement("div");
    controls.className = "sticky-note-controls";

    const colorsWrap = document.createElement("div");
    colorsWrap.className = "sticky-note-colors";
    noteColors.forEach((color) => {
      const colorButton = createColorButton(note, color);
      if (color === note.dataset.color) {
        colorButton.classList.add("active");
      }
      colorsWrap.appendChild(colorButton);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "sticky-note-delete";
    deleteButton.setAttribute("aria-label", "Delete sticky note");
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      note.remove();
      saveNotes();
    });

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "sticky-note-save";
    saveButton.setAttribute("aria-label", "Save sticky note");
    saveButton.textContent = "✓";
    saveButton.addEventListener("click", (event) => {
      event.stopPropagation();
      note.classList.add("note-saved");
      setNoteEditable(note, false);
      saveNotes();
    });

    controls.appendChild(colorsWrap);

    const alignXWrap = document.createElement("div");
    alignXWrap.className = "sticky-note-colors";
    [
      { key: "left", label: "L" },
      { key: "center", label: "C" },
      { key: "right", label: "R" }
    ].forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `sticky-note-align align-x-${item.key}`;
      button.setAttribute("aria-label", `Align ${item.key}`);
      const glyph = document.createElement("span");
      glyph.className = "align-glyph";
      button.appendChild(glyph);
      if (item.key === note.dataset.alignX) {
        button.classList.add("active");
      }
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        note.dataset.alignX = item.key;
        alignXWrap.querySelectorAll(".sticky-note-align").forEach((el) => el.classList.remove("active"));
        button.classList.add("active");
        applyNoteAlignment(note);
        saveNotes();
      });
      alignXWrap.appendChild(button);
    });
    controls.appendChild(alignXWrap);

    const alignYWrap = document.createElement("div");
    alignYWrap.className = "sticky-note-colors";
    [
      { key: "top", label: "T" },
      { key: "middle", label: "M" },
      { key: "bottom", label: "B" }
    ].forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `sticky-note-align align-y-${item.key}`;
      button.setAttribute("aria-label", `Align ${item.key}`);
      const glyph = document.createElement("span");
      glyph.className = "align-glyph";
      button.appendChild(glyph);
      if (item.key === note.dataset.alignY) {
        button.classList.add("active");
      }
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        note.dataset.alignY = item.key;
        alignYWrap.querySelectorAll(".sticky-note-align").forEach((el) => el.classList.remove("active"));
        button.classList.add("active");
        applyNoteAlignment(note);
        saveNotes();
      });
      alignYWrap.appendChild(button);
    });
    controls.appendChild(alignYWrap);

    controls.appendChild(deleteButton);
    controls.appendChild(saveButton);
    note.appendChild(controls);

    const unlockNoteEditing = () => {
      if (!isDeveloperMode()) return;
      note.classList.remove("note-saved");
      setNoteEditable(note, true);
      saveNotes();
      requestAnimationFrame(() => editor.focus());
    };

    editor.addEventListener("input", saveNotes);
    editor.addEventListener("pointerdown", () => {
      if (note.classList.contains("note-saved")) {
        unlockNoteEditing();
      }
    });
    note.addEventListener("pointerdown", () => {
      topZ += 1;
      note.style.zIndex = String(topZ);
    });
    note.addEventListener("dblclick", unlockNoteEditing);

    if (initialData?.saved) {
      note.classList.add("note-saved");
      setNoteEditable(note, false);
    } else {
      setNoteEditable(note, true);
    }

    applyNoteAlignment(note);
    stickyLayer.appendChild(note);
    initStickyDrag(note, editor);
    saveNotes();
    if (!initialData) {
      requestAnimationFrame(() => focusEditorWithCaret(editor));
    }
  };

  const initStickyDrag = (note, editor) => {
    let startX = 0;
    let startY = 0;
    let noteStartX = 0;
    let noteStartY = 0;
    let dragging = false;

    const onPointerMove = (event) => {
      if (!dragging) return;
      const docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      );
      const nextX = noteStartX + (event.pageX - startX);
      const nextY = noteStartY + (event.pageY - startY);
      note.style.left = `${Math.min(Math.max(8, nextX), docWidth - note.offsetWidth - 8)}px`;
      note.style.top = `${Math.min(Math.max(8, nextY), docHeight - note.offsetHeight - 40)}px`;
    };

    const onPointerUp = () => {
      const wasDragging = dragging;
      dragging = false;
      note.classList.remove("dragging");
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
      saveNotes();
      if (wasDragging && !note.classList.contains("note-saved")) {
        requestAnimationFrame(() => focusEditorWithCaret(editor));
      }
    };

    note.addEventListener("pointerdown", (event) => {
      const targetEl = event.target instanceof Element ? event.target : event.target?.parentElement;
      if (!targetEl) return;
      if (
        (!note.classList.contains("note-saved") && targetEl.closest(".sticky-note-editor")) ||
        targetEl.closest(".sticky-note-color") ||
        targetEl.closest(".sticky-note-delete") ||
        targetEl.closest(".sticky-note-save") ||
        targetEl.closest(".sticky-note-align")
      ) {
        return;
      }
      event.preventDefault();
      dragging = true;
      note.classList.add("dragging");
      startX = event.pageX;
      startY = event.pageY;
      noteStartX = parseFloat(note.style.left) || note.getBoundingClientRect().left;
      noteStartY = parseFloat(note.style.top) || note.getBoundingClientRect().top;
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerUp);
    });
  };

  const onLaunchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dragGhost = document.createElement("div");
    dragGhost.className = "sticky-note";
    dragGhost.style.setProperty("--note-color", launchColor);
    dragGhost.style.width = "94px";
    dragGhost.style.minHeight = "94px";
    dragGhost.style.opacity = "0.85";
    dragGhost.style.pointerEvents = "none";
    dragGhost.style.left = `${event.pageX - 47}px`;
    dragGhost.style.top = `${event.pageY - 47}px`;
    stickyLayer.appendChild(dragGhost);

    const onMove = (moveEvent) => {
      if (!dragGhost) return;
      dragGhost.style.left = `${moveEvent.pageX - 47}px`;
      dragGhost.style.top = `${moveEvent.pageY - 47}px`;
    };

    const onEnd = (endEvent) => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onEnd);
      if (dragGhost) {
        dragGhost.remove();
        dragGhost = null;
      }
      createStickyNote(endEvent.pageX, endEvent.pageY);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onEnd);

    commentDismissed = true;
    setExpanded(false);
    updateBubbleVisibility();
  };

  commentBubble.addEventListener("click", () => {
    if (!commentExpanded) {
      setExpanded(true);
    }
  });

  stickyLaunchBtn.addEventListener("pointerdown", onLaunchStart);

  const bubblePaletteButtons = Array.from(stickyPalette.querySelectorAll(".comment-sticky-color"));
  bubblePaletteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      launchColor = button.dataset.color || noteColors[0];
      bubblePaletteButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  const restoreNotes = async () => {
    const restoreFromArray = (notes) => {
      if (!Array.isArray(notes)) return false;
      isRestoringNotes = true;
      stickyLayer.querySelectorAll(".sticky-note").forEach((note) => note.remove());
      notes.forEach((noteData) => {
        createStickyNote((noteData.x || 0) + 85, (noteData.y || 0) + 85, noteData);
      });
      isRestoringNotes = false;
      localStorage.setItem(storageKey, JSON.stringify(notes));
      return true;
    };

    try {
      const response = await fetch(stickyApiEndpoint, { cache: "no-store" });
      if (response.ok) {
        const payload = await response.json();
        if (restoreFromArray(payload?.notes)) {
          return;
        }
      }
    } catch (_error) {
      // Fallback to local cache.
    }

    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const notes = JSON.parse(raw);
      restoreFromArray(notes);
    } catch (_error) {
      // Ignore corrupted local data
    }
  };

  window.addEventListener("scroll", updateBubbleVisibility, { passive: true });
  window.addEventListener("resize", () => {
    updateBubbleVisibility();
    syncStickyLayerSize();
  });
  syncStickyLayerSize();
  restoreNotes().finally(() => {
    updateBubbleVisibility();
  });
}

initBottomCommentBubble();

// ================================
// LOGO CLICK TO HOME
// ================================
document.querySelector(".logo").addEventListener("click", function() {
  window.location.href = "index.html";
});
