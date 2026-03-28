import { reCurrent, excelDM } from "./main.js";

export function loadEditor(
  entry,
  body,
  title,
  category,
  editBtn,
  isEditing,
  marked,
) {
  //Remove old Editors if any
  document.querySelectorAll(".editor").forEach((editor) => {
    editor.remove();
  });

  let codeArea;
  let currentEditor = null;

  // Create editor container
  currentEditor = document.createElement("div");
  currentEditor.classList.add("editor");
  currentEditor.style.display = "block";

  //Toolbar -- Top Ribbon of Editor
  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";

  const toolbarContainer = document.createElement("div");
  toolbarContainer.style.display = "flex";
  toolbarContainer.style.justifyContent = "space-between";
  toolbarContainer.style.alignItems = "center";
  toolbarContainer.style.position = "relative";

  const toolbarTitle = document.createElement("div");
  toolbarTitle.textContent = "Notecard HTML/MD Editor";
  toolbarTitle.style.padding = "5px";
  toolbarContainer.appendChild(toolbarTitle);
  toolbar.appendChild(toolbarContainer);

  //Toolbar Buttons Container
  const toolbarBtns = document.createElement("div");
  toolbarBtns.className = "buttons-top-right";

  //Save Button
  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.title = "Save Entry";
  saveBtn.innerHTML = "💾";

  saveBtn.addEventListener("click", () => {
    // Save and close
    isEditing = false;
    currentEditor.remove();

    const newText = codeArea.getValue().trim();
    body.dataset.fullText = newText;
    entry.body = newText;
    body.innerHTML = marked.parse(newText);

    const newTitle = currentEditor.querySelector(".editor-title").value.trim();
    entry.title = newTitle;
    title.textContent = newTitle;

    const newCategory = currentEditor
      .querySelector(".editor-category")
      .value.trim();
    entry.category = newCategory;
    category.textContent = newCategory;

    // Remove editor element
    currentEditor.remove();

    excelDM.dirtyEntries.add(entry);
    reCurrent();
  });

  //Exit Button
  const exitBtn = document.createElement("button");
  exitBtn.className = "delete-btn";
  exitBtn.title = "Close Editor";
  exitBtn.innerHTML = "❌";

  exitBtn.addEventListener("click", (event) => {
    if (event.shiftKey || confirm(`Close Editor without Saving?`)) {
      isEditing = false;
      currentEditor.remove();
      reCurrent();
    }
  });

  //Insert Table Button
  const tableBtn = document.createElement("button");
  tableBtn.className = "table-btn";
  tableBtn.title = "Insert Table";
  tableBtn.innerHTML = "⚖";

  tableBtn.addEventListener("click", () => {
    const tableMarkdown = `| Header 1 | Header 2 | Header 3 |\n|:---------|:---------|:---------|\n| Data 1   | Data 2   | Data 3   |\n| Data 1   | Data 2   | Data 3   |\n\n`;
    const doc = codeArea.getDoc();
    const cursor = doc.getCursor();
    doc.replaceRange(tableMarkdown, cursor);
    codeArea.focus();
  });

  // Insert Bold <b> Button
  const boldBtn = document.createElement("button");
  boldBtn.className = "bold-btn";
  boldBtn.title = "Bold Text";
  boldBtn.innerHTML = "𝐁"; // or "B" or "𝗕"

  boldBtn.addEventListener("click", () => {
    const doc = codeArea.getDoc();
    const from = doc.getCursor("from");
    const to = doc.getCursor("to");

    if (from.line === to.line && from.ch === to.ch) {
      // No selection, insert empty bold tags
      doc.replaceRange("<b></b>", from);
      // Position cursor inside tags
      doc.setCursor(from.line, from.ch + 3);
    } else {
      // Wrap selected text in <b>
      const selectedText = doc.getRange(from, to);
      doc.replaceRange(`<b>${selectedText}</b>`, from, to);
    }

    codeArea.focus();
  });

  //Insert Paragraph <p>
  const pBtn = document.createElement("button");
  pBtn.className = "p-btn";
  pBtn.title = "Insert Paragraph";
  pBtn.innerHTML = "¶";

  pBtn.addEventListener("click", () => {
    const doc = codeArea.getDoc();
    const from = doc.getCursor("from");
    const to = doc.getCursor("to");

    // If text is selected, wrap it in <p>
    if (from.line === to.line && from.ch === to.ch) {
      // No selection, insert empty paragraph
      doc.replaceRange("\n<p></p>", from);
    } else {
      // Wrap selected text
      const selectedText = doc.getRange(from, to);
      doc.replaceRange(`<p>${selectedText}</p>`, from, to);
    }

    codeArea.focus();
  });

  // Insert Boxed Text Button
  const boxBtn = document.createElement("button");
  boxBtn.className = "box-btn";
  boxBtn.title = "Boxed Text";
  boxBtn.innerHTML = "🔲";

  boxBtn.addEventListener("click", () => {
    const doc = codeArea.getDoc();
    const from = doc.getCursor("from");
    const to = doc.getCursor("to");

    if (from.line === to.line && from.ch === to.ch) {
      // No selection, insert empty boxed div
      doc.replaceRange('<div class="boxed-text"></div>', from);
      // Position cursor inside div
      doc.setCursor(from.line, from.ch + 19);
    } else {
      // Wrap selected text in boxed div
      const selectedText = doc.getRange(from, to);
      doc.replaceRange(
        `<div class="boxed-text">\n${selectedText}\n</div>`,
        from,
        to,
      );
    }

    codeArea.focus();
  });

  toolbarBtns.appendChild(boxBtn);
  toolbarBtns.appendChild(boldBtn);
  toolbarBtns.appendChild(pBtn);
  toolbarBtns.appendChild(tableBtn);
  toolbarBtns.appendChild(saveBtn);
  toolbarBtns.appendChild(exitBtn);
  toolbarContainer.appendChild(toolbarBtns);

  // Title input
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "editor-title editing";
  titleInput.value = title.textContent;

  // Category input
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.className = "editor-category editing";
  categoryInput.placeholder = "Seperate tags by commas to categorise.";
  categoryInput.value = category.textContent;

  // Textarea (source for CodeMirror)
  const textarea = document.createElement("textarea");
  textarea.className = "notecard-body editing";
  textarea.value = body.dataset.fullText;

  // Add inputs to editor first
  currentEditor.appendChild(toolbar);
  currentEditor.appendChild(categoryInput);
  currentEditor.appendChild(titleInput);
  currentEditor.appendChild(textarea);
  //makeDraggable(currentEditor); //buggy

  // Attach editor to DOM first so CodeMirror can size correctly
  document.body.appendChild(currentEditor);

  // Turn textarea into CodeMirror
  codeArea = CodeMirror.fromTextArea(textarea, {
    mode: "markdown",
    lineNumbers: true,
    lineWrapping: true,
  });
  codeArea.getInputField().classList.add("editing");

  titleInput.focus();

  // Live update card while editing
  codeArea.on("change", () => {
    const markdown = codeArea.getValue();
    body.dataset.fullText = markdown;
    body.innerHTML = marked.parse(markdown);
  });

  // Title/category live updates
  titleInput.addEventListener("input", (e) => {
    title.textContent = e.target.value;
    entry.title = e.target.value;
  });

  categoryInput.addEventListener("input", (e) => {
    category.textContent = e.target.value;
    entry.category = e.target.value;
  });

  editBtn.addEventListener("click", () => {
    if (!isEditing) {
      isEditing = true;
      loadEditor();
    }
  });
}
