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

  // ── Toolbar ──
  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";

  // Row 1: title + save/exit
  const toolbarTop = document.createElement("div");
  toolbarTop.className = "editor-toolbar-top";

  const toolbarTitle = document.createElement("div");
  toolbarTitle.className = "editor-toolbar-title";
  toolbarTitle.textContent = "Notecard HTML/MD Editor";

  const toolbarActions = document.createElement("div");
  toolbarActions.className = "editor-toolbar-actions";

  const saveBtn = document.createElement("button");
  saveBtn.title = "Save Entry";
  saveBtn.textContent = "Save";

  saveBtn.addEventListener("click", () => {
    isEditing = false;

    const newText = codeArea.getValue().trim();
    body.dataset.fullText = newText;
    entry.body = newText;
    body.innerHTML = marked.parse(newText);

    const newTitle = currentEditor.querySelector(".editor-title").value.trim();
    entry.title = newTitle;
    title.textContent = newTitle;

    const newCategory = currentEditor.querySelector(".editor-category").value.trim();
    entry.category = newCategory;
    category.textContent = newCategory;

    currentEditor.remove();
    excelDM.dirtyEntries.add(entry);
    reCurrent();
  });

  const exitBtn = document.createElement("button");
  exitBtn.title = "Close Editor";
  exitBtn.textContent = "✕";

  exitBtn.addEventListener("click", (event) => {
    if (event.shiftKey || confirm("Close Editor without Saving?")) {
      isEditing = false;
      currentEditor.remove();
      reCurrent();
    }
  });

  toolbarActions.appendChild(saveBtn);
  toolbarActions.appendChild(exitBtn);
  toolbarTop.appendChild(toolbarTitle);
  toolbarTop.appendChild(toolbarActions);

  // Row 2: formatting buttons
  const toolbarFormat = document.createElement("div");
  toolbarFormat.className = "editor-toolbar-format";

  function makeFormatBtn(label, title) {
    const btn = document.createElement("button");
    btn.title = title;
    btn.textContent = label;
    return btn;
  }

  function wrapInline(before, after) {
    const doc = codeArea.getDoc();
    const from = doc.getCursor("from");
    const to   = doc.getCursor("to");
    const isEmpty = from.line === to.line && from.ch === to.ch;
    if (isEmpty) {
      doc.replaceRange(before + after, from);
      doc.setCursor(from.line, from.ch + before.length);
    } else {
      doc.replaceRange(before + doc.getRange(from, to) + after, from, to);
    }
    codeArea.focus();
  }

  function wrapBlock(before, after) {
    const doc = codeArea.getDoc();
    const from = doc.getCursor("from");
    const to   = doc.getCursor("to");
    const isEmpty = from.line === to.line && from.ch === to.ch;
    if (isEmpty) {
      doc.replaceRange(before + after, from);
    } else {
      doc.replaceRange(before + "\n" + doc.getRange(from, to) + "\n" + after, from, to);
    }
    codeArea.focus();
  }

  // Bold
  const boldBtn = makeFormatBtn("B", "Bold");
  boldBtn.style.fontWeight = "bold";
  boldBtn.addEventListener("click", () => wrapInline("<b>", "</b>"));

  // Italic
  const italicBtn = makeFormatBtn("I", "Italic");
  italicBtn.style.fontStyle = "italic";
  italicBtn.addEventListener("click", () => wrapInline("*", "*"));

  // Heading
  const headingBtn = makeFormatBtn("H4", "Heading (####)");
  headingBtn.addEventListener("click", () => {
    const doc    = codeArea.getDoc();
    const cursor = doc.getCursor();
    const line   = doc.getLine(cursor.line);
    if (!line.startsWith("#### ")) {
      doc.replaceRange("#### ", { line: cursor.line, ch: 0 });
    }
    codeArea.focus();
  });

  // Inline code
  const codeBtn = makeFormatBtn("`code`", "Inline Code");
  codeBtn.addEventListener("click", () => wrapInline("`", "`"));

  // Paragraph
  const pBtn = makeFormatBtn("¶", "Paragraph");
  pBtn.addEventListener("click", () => wrapInline("<p>", "</p>"));

  // Boxed text
  const boxBtn = makeFormatBtn("▣ Box", "Boxed Text");
  boxBtn.addEventListener("click", () => wrapBlock('<div class="boxed-text">', "</div>"));

  // Table
  const tableBtn = makeFormatBtn("⊞ Table", "Insert Table");
  tableBtn.addEventListener("click", () => {
    const doc = codeArea.getDoc();
    doc.replaceRange(
      `| Header 1 | Header 2 | Header 3 |\n|:---------|:---------|:---------|\n| Data 1   | Data 2   | Data 3   |\n| Data 1   | Data 2   | Data 3   |\n\n`,
      doc.getCursor(),
    );
    codeArea.focus();
  });

  // Horizontal rule
  const hrBtn = makeFormatBtn("— HR", "Horizontal Rule");
  hrBtn.addEventListener("click", () => {
    const doc = codeArea.getDoc();
    doc.replaceRange("\n---\n", doc.getCursor());
    codeArea.focus();
  });

  // Link
  const linkBtn = makeFormatBtn("[url]", "Insert Link");
  linkBtn.addEventListener("click", () => {
    const doc  = codeArea.getDoc();
    const from = doc.getCursor("from");
    const to   = doc.getCursor("to");
    const isEmpty = from.line === to.line && from.ch === to.ch;
    const text = isEmpty ? "text" : doc.getRange(from, to);
    const snippet = `[${text}](url)`;
    doc.replaceRange(snippet, from, isEmpty ? from : to);
    codeArea.focus();
  });

  const sep = document.createElement("div");
  sep.className = "editor-toolbar-separator";

  toolbarFormat.appendChild(boldBtn);
  toolbarFormat.appendChild(italicBtn);
  toolbarFormat.appendChild(headingBtn);
  toolbarFormat.appendChild(codeBtn);
  toolbarFormat.appendChild(pBtn);
  toolbarFormat.appendChild(sep);
  toolbarFormat.appendChild(boxBtn);
  toolbarFormat.appendChild(tableBtn);
  toolbarFormat.appendChild(hrBtn);
  toolbarFormat.appendChild(linkBtn);

  toolbar.appendChild(toolbarTop);
  toolbar.appendChild(toolbarFormat);

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
