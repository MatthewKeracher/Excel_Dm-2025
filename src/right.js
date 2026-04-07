import { isViewer } from "./userRole.js";
import { excelDM } from "./main.js";
import { saveData } from "./localStorage.js";

let currentGridType = "square";

export function setGridType(type) {
  currentGridType = type;
  drawBackground();
}

export function draw(parent) {
  if (Array.isArray(parent)) return;
  const children = parent.children.filter(
    (entry) => entry.type === "locations"
  );
  const container = document.getElementById("note-layer");
  container.innerHTML = ""; // Clear previous notes

  // Track drag state
  let currentDrag = null;
  let offsetX = 0;
  let offsetY = 0;

  children.forEach((child) => {
    const label = document.createElement("div");
    label.className = "label";
    label.dataset.entryTitle = child.title;
    label.textContent = child.title.replace(/\([^)]*\)/g, "").trim();
    label.style.left = `${child.x}px`;
    label.style.top = `${child.y}px`;

    // Reset width so it can shrink/grow to content size
    label.style.width = "auto";
    label.style.background = child.color || "#fffbe6";

    label.addEventListener("mouseenter", (e) => {
      label.classList.add("highlight");

      const leftPanelCard = document.querySelector(
        `.notecard[data-entry-title="${CSS.escape(child.title)}"]`
      );

      if (e.ctrlKey && leftPanelCard) {
        leftPanelCard.classList.add("highlight");
        leftPanelCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
    label.addEventListener("mouseleave", () => {
      label.classList.remove("highlight");
      const leftPanelCard = document.querySelector(
        `.notecard[data-entry-title="${CSS.escape(child.title)}"]`
      );
      if (leftPanelCard) leftPanelCard.classList.remove("highlight");
    });

    // Dragging logic
    label.addEventListener("mousedown", (e) => {
      if (isViewer()) return;
      currentDrag = label;
      offsetX = e.clientX - child.x;
      offsetY = e.clientY - child.y;
      label.classList.add("dragging");

      // Attach move/up handlers
      function onMouseMove(ev) {
        const newX = ev.clientX - offsetX;
        const newY = ev.clientY - offsetY;
        child.x = newX;
        child.y = newY;
        label.style.left = `${newX}px`;
        label.style.top = `${newY}px`;
      }
      function onMouseUp() {
        currentDrag = null;
        label.classList.remove("dragging");
        excelDM.dirtyEntries.add(child);
        saveData();
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    container.appendChild(label);
  });
}

function drawHex(ctx, cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i + 30); // pointy-top orientation
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawBackground() {
  // back-layer: just the solid green background (CSS handles this via #back-layer background)
  // grid-layer: grid lines drawn on top of the map
  const gridCanvas = document.getElementById("grid-layer");
  const ctx = gridCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const rect = gridCanvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  if (currentGridType === "none") return;

  ctx.strokeStyle = "#d8d83c91";
  ctx.lineWidth = 1;

  if (currentGridType === "square") {
    const size = 40;
    for (let x = 0.5; x <= width; x += size) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0.5; y <= height; y += size) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
  } else {
    // hex (default) — r ≈ 60px gives ~1 sq inch area at 96 DPI
    const r = 60;
    const w = r * Math.sqrt(3);
    const rowH = r * 1.5;
    const rows = Math.ceil(height / rowH) + 2;
    const cols = Math.ceil(width / w) + 2;
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const cx = col * w + (row % 2 !== 0 ? w / 2 : 0) + w / 2;
        const cy = row * rowH + r;
        drawHex(ctx, cx, cy, r);
      }
    }
  }
}

function resizeCanvases(width, height) {
  const container = document.querySelector(".middle-right");
  const rect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  if (!width || !height) {
    width = rect.width || 800; // fallback default width in CSS pixels
    height = rect.height || 600; // fallback default height
  }

  const imgCanvas = document.getElementById("map-layer");
  const bgCanvas = document.getElementById("back-layer");
  const gridCanvas = document.getElementById("grid-layer");

  [bgCanvas, imgCanvas, gridCanvas].forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    canvas.width = width * dpr; // drawing buffer size in device pixels
    canvas.height = height * dpr;
    canvas.style.width = width + "px"; // displayed size in CSS pixels
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  });

  // Resizing clears the canvas — always redraw the grid immediately after.
  drawBackground();
}

// initMap sets up the ResizeObserver so the grid stays visible whenever
// the panel is resized (e.g. window resize, first paint).
export function initMap() {
  const container = document.querySelector(".middle-right");
  if (!container) return;
  resizeCanvases(); // draw grid on initial load
  new ResizeObserver(() => resizeCanvases()).observe(container);
}

export function HexToMap(parent) {
  return new Promise((resolve, reject) => {
    const hexString = parent?.image;
    const mapCanvas = document.getElementById("map-layer");
    const ctx = mapCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

    if (hexString) {
      const bytes = [];
      for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.slice(i, i + 2), 16));
      }
      const uint8arr = new Uint8Array(bytes);

      const blob = new Blob([uint8arr], { type: "image/png" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const dpr = window.devicePixelRatio || 1;
        const imgWidth = img.naturalWidth; // image width in CSS pixels
        const imgHeight = img.naturalHeight; // image height in CSS pixels

        const container = document.querySelector(".middle-right");
        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width;
        const containerHeight = rect.height;

        // Calculate max width and height between container and image
        const width = Math.max(imgWidth, containerWidth);
        const height = Math.max(imgHeight, containerHeight);

        // Resize canvases to the max dimensions
        resizeCanvases(width, height);
        drawBackground();

        const mapCanvas = document.getElementById("map-layer");
        mapCanvas.style.width = width + "px";
        mapCanvas.style.height = height + "px";

        const ctx = mapCanvas.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0);

        URL.revokeObjectURL(url);
        resolve();
      };

      img.onerror = (error) => {
        reject(error); // Reject if loading fails
      };

      img.src = url;
    } else if (!hexString) {
      resizeCanvases();
      drawBackground();
      resolve(); // No image, resolve immediately
      return;
    }
  });
}
