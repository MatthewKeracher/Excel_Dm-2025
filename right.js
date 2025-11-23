export function initNotesCanvas(parent) {
  const children = parent.children
  console.log(parent, children)
  const canvas = document.getElementById("note-layer");
  const ctx = canvas.getContext("2d");

  // Track dragging state
  let dragIndex = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  let lastHoverIndex = -1;
  let hoverIndex = -1; // current hover index

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
      drawNotesCanvas(parent);
      return;
    }

    hoverIndex = getHoverIndex(mouseX, mouseY, children, ctx);

    if (hoverIndex !== lastHoverIndex) {
      lastHoverIndex = hoverIndex;
      updateHighlight();
      drawNotesCanvas(parent);
    }
  });

  canvas.addEventListener("mouseup", () => {
    dragIndex = null;
  });

  canvas.addEventListener("mouseleave", () => {
    dragIndex = null;
  });
}

export function drawNotesCanvas(parent) {
  const children = parent.children
  const canvas = document.getElementById("note-layer");
  const ctx = canvas.getContext("2d");

  // Scale canvas to same size as map.
  const mapCanvas = document.getElementById("map-layer");

  canvas.width = mapCanvas.clientWidth;
  canvas.height = mapCanvas.clientHeight;


  function draw(children) {
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
      // Adjust rectY so rect aligns with note.y at vertical center
      const rectX = child.x;
      const rectY = child.y - rectHeight / 2;

      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

      // Draw label text
      ctx.fillStyle = "black";
      ctx.textBaseline = "middle"; // vertically center text
      ctx.fillText(child.title, rectX + padding, child.y);
    });
  }

  // Initial draw
  draw(children);
}