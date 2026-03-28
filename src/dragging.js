let nextZIndex = 51;

export function makeDraggable(element, saveCoordsCallback = null) {
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  element.style.cursor = "move";
  element.style.userSelect = "none";
  element.style.position = "fixed";

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - element.getBoundingClientRect().left;
    dragOffsetY = e.clientY - element.getBoundingClientRect().top;
    element.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    element.style.zIndex = (nextZIndex++).toString();
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    element.style.left = `${e.clientX - dragOffsetX}px`;
    element.style.top = `${e.clientY - dragOffsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (saveCoordsCallback) {
      saveCoordsCallback({
        x: element.style.left,
        y: element.style.top,
      });
    }
    isDragging = false;
    element.style.cursor = "grab";
    document.body.style.userSelect = "";
  });

  return { isDragging, dragOffsetX, dragOffsetY };
}
