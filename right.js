export function initNotesCanvas(parent) {
  const children = parent.children;
  const canvas = document.getElementById("note-layer");
  const ctx = canvas.getContext("2d");

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";

  ctx.scale(dpr, dpr);


  // Track dragging state
  let dragIndex = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  let lastHoverIndex = -1;
  let hoverIndex = -1;

  function hitTest(x, y) {
    for (let i = children.length - 1; i >= 0; i--) {
      const note = children[i];
      ctx.font = "bold 1.1em Soutane";
      const textWidth = ctx.measureText(note.title).width;
      const padding = 6;
      const rectWidth = textWidth + padding * 2;
      const rectHeight = 20;
      const rectX = note.x;
      const rectY = note.y - rectHeight + 5;
      if (
        x >= rectX &&
        x <= rectX + rectWidth &&
        y >= rectY &&
        y <= rectY + rectHeight
      ) {
        return i; // index of hit note
      }
    }
    return null;
  }

  function getHoverIndex(mouseX, mouseY, notes, ctx) {
    for (let i = notes.length - 1; i >= 0; i--) {
      const note = notes[i];
      ctx.font = "bold 1.1em Soutane";
      const padding = 6;
      const rectHeight = 20;
      const textWidth = ctx.measureText(note.title).width;
      const rectWidth = textWidth + padding * 2;
      const rectX = note.x;
      const rectY = note.y - rectHeight / 2;

      if (
        mouseX >= rectX &&
        mouseX <= rectX + rectWidth &&
        mouseY >= rectY &&
        mouseY <= rectY + rectHeight
      ) {
        return i; // Found hovered note
      }
    }
    return -1; // No hover
  }

  function updateHighlight() {
    const container = document.getElementById("leftPanel");
    const cards = container.getElementsByClassName("notecard");

    for (let i = 0; i < cards.length; i++) {
      if (i === hoverIndex) {
        cards[i].classList.add("highlight");
        cards[i].scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        cards[i].classList.remove("highlight");
      }
    }
  }

  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const hit = hitTest(mouseX, mouseY);
    if (hit !== null) {
      dragIndex = hit;
      dragOffsetX = mouseX - children[dragIndex].x;
      dragOffsetY = mouseY - children[dragIndex].y;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (dragIndex !== null) {
      children[dragIndex].x = mouseX - dragOffsetX;
      children[dragIndex].y = mouseY - dragOffsetY;
      draw(parent);
      return;
    }

    hoverIndex = getHoverIndex(mouseX, mouseY, children, ctx);

    if (hoverIndex !== lastHoverIndex) {
      lastHoverIndex = hoverIndex;
      updateHighlight();
      draw(parent);
    }
  });

  canvas.addEventListener("mouseup", () => {
    dragIndex = null;
  });

  canvas.addEventListener("mouseleave", () => {
    dragIndex = null;
  });

}

export function draw(parent) {
  const children = parent.children;
  const canvas = document.getElementById("note-layer");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 1.1em Soutane";
  ctx.globalAlpha = 0.7;

  children.forEach((child, i) => {
    // Draw label background
    ctx.fillStyle = "#fffbe6"; // match note card background
    const padding = 6;
    const rectHeight = 20;
    const textWidth = ctx.measureText(child.title).width;
    const rectWidth = textWidth + padding * 2;

    // Draw rectangle
    const rectX = child.x;
    const rectY = child.y - rectHeight / 2;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Draw label text
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle"; // vertically center text
    ctx.fillText(child.title, rectX + padding, child.y);
  });
}

export function HexToMap(parent) {
  return new Promise((resolve, reject) => {
    const hexString = parent?.image;
    const mapCanvas = document.getElementById("map-layer");
    const notesCanvas = document.getElementById("note-layer");
    const ctx = mapCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

    if (!hexString) {
      resolve(); // No image, resolve immediately
      return;
    }

    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.slice(i, i + 2), 16));
    }
    const uint8arr = new Uint8Array(bytes);

    const blob = new Blob([uint8arr], { type: "image/png" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      mapCanvas.width = img.naturalWidth * dpr;
      mapCanvas.height = img.naturalHeight * dpr;
      mapCanvas.style.width = img.naturalWidth + "px";
      mapCanvas.style.height = img.naturalHeight + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);
      resolve(); // Resolve the promise when done
    };

    img.onerror = (error) => {
      reject(error); // Reject if loading fails
    };

    img.src = url;
  });
}
