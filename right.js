export function draw(parent) {
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
    label.textContent = child.title;
    label.style.left = `${child.x}px`;
    label.style.top = `${child.y}px`;

    label.addEventListener("mouseenter", (e) => {
      if (!e.ctrlKey){return}
      label.classList.add("highlight");

      const leftPanelCard = document.querySelector(
        `.notecard[data-entry-title="${CSS.escape(child.title)}"]`
      );

      if (leftPanelCard) {
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
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    container.appendChild(label);
  });
}

export function HexToMap(parent) {
  return new Promise((resolve, reject) => {
    const hexString = parent?.image;
    const mapCanvas = document.getElementById("map-layer");
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
