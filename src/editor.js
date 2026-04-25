import { reCurrent, excelDM } from "./main.js";
import { loadSnippets, addSnippet, updateSnippet, deleteSnippet } from "./snippets.js";
import { render as renderMacro } from "./macroEngine.js";
import { getCurrentRuleset, getRulesetData, loadRulesetModule } from "./ruleset.js";
import { confirmDialog } from "./dialog.js";

export function loadEditor(
  entry,
  body,
  title,
  category,
  editBtn,
  isEditing,
  marked,
  onSave = null,
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
  currentEditor.style.display = "flex";

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

  const snippetToggleBtn = document.createElement("button");
  snippetToggleBtn.title = "Toggle Snippet Library";
  snippetToggleBtn.textContent = "📋";

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
    snippetPanel.remove();
    if (onSave) {
      onSave(entry);
    } else {
      excelDM.dirtyEntries.add(entry);
      reCurrent();
    }
  });

  const exitBtn = document.createElement("button");
  exitBtn.title = "Close Editor";
  exitBtn.textContent = "✕";

  exitBtn.addEventListener("click", async (event) => {
    if (event.shiftKey || await confirmDialog("Close Editor without Saving?")) {
      isEditing = false;
      currentEditor.remove();
      snippetPanel.remove();
      reCurrent();
    }
  });

  toolbarActions.appendChild(snippetToggleBtn);
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

  // Highlight
  const highlightBtn = makeFormatBtn("H", "Highlight (yellow)");
  highlightBtn.style.background = "#d8d83c";
  highlightBtn.style.color = "#000";
  highlightBtn.addEventListener("click", () => wrapInline("<mark>", "</mark>"));

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

  // Inline editable field (renders as a small editable input in the notecard).
  const fieldBtn = makeFormatBtn("# Field", "Insert Editable Field");
  fieldBtn.addEventListener("click", () => {
    const doc  = codeArea.getDoc();
    const from = doc.getCursor("from");
    const to   = doc.getCursor("to");
    const isEmpty = from.line === to.line && from.ch === to.ch;
    const name = isEmpty ? "quantity" : doc.getRange(from, to);
    const snippet = `<span data-field="${name}">0</span>`;
    doc.replaceRange(snippet, from, isEmpty ? from : to);
    codeArea.focus();
  });

  const sep = document.createElement("div");
  sep.className = "editor-toolbar-separator";

  toolbarFormat.appendChild(boldBtn);
  toolbarFormat.appendChild(highlightBtn);
  toolbarFormat.appendChild(italicBtn);
  toolbarFormat.appendChild(headingBtn);
  toolbarFormat.appendChild(codeBtn);
  toolbarFormat.appendChild(pBtn);
  toolbarFormat.appendChild(sep);
  toolbarFormat.appendChild(boxBtn);
  toolbarFormat.appendChild(tableBtn);
  toolbarFormat.appendChild(hrBtn);
  toolbarFormat.appendChild(linkBtn);
  toolbarFormat.appendChild(fieldBtn);

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

  // ── Snippet panel ──
  const snippetPanel = document.createElement("div");
  snippetPanel.className = "snippet-panel";
  snippetPanel.style.display = "none";

  // Panel tab bar
  const snippetPanelHeader = document.createElement("div");
  snippetPanelHeader.className = "snippet-panel-header";

  const tabSnippets = document.createElement("button");
  tabSnippets.className = "snippet-panel-tab active";
  tabSnippets.textContent = "Snippets";

  const tabRules = document.createElement("button");
  tabRules.className = "snippet-panel-tab";
  tabRules.textContent = getCurrentRuleset() || "Rules";
  if (!getCurrentRuleset()) tabRules.style.display = "none";

  const snippetPanelClose = document.createElement("button");
  snippetPanelClose.className = "snippet-panel-close";
  snippetPanelClose.textContent = "×";
  snippetPanelClose.title = "Close panel";

  snippetPanelHeader.appendChild(tabSnippets);
  snippetPanelHeader.appendChild(tabRules);
  snippetPanelHeader.appendChild(snippetPanelClose);

  const snippetList = document.createElement("div");
  snippetList.className = "snippet-list";

  const snippetFooter = document.createElement("div");
  snippetFooter.className = "snippet-panel-footer";
  const snippetAddBtn = document.createElement("button");
  snippetAddBtn.className = "snippet-add-btn";
  snippetAddBtn.textContent = "+ New Snippet";
  snippetFooter.appendChild(snippetAddBtn);

  // ── Rules pane ──
  const rulesPane = document.createElement("div");
  rulesPane.className = "rules-pane";
  rulesPane.style.display = "none";

  const rulesSearch = document.createElement("input");
  rulesSearch.type = "text";
  rulesSearch.className = "rules-search";
  rulesSearch.placeholder = "Search…";

  const rulesList = document.createElement("div");
  rulesList.className = "rules-list";

  rulesPane.appendChild(rulesSearch);
  rulesPane.appendChild(rulesList);

  // Tab switching
  tabSnippets.addEventListener("click", () => {
    tabSnippets.classList.add("active");
    tabRules.classList.remove("active");
    snippetList.style.display = "";
    snippetFooter.style.display = "";
    rulesPane.style.display = "none";
  });

  tabRules.addEventListener("click", async () => {
    tabRules.classList.add("active");
    tabSnippets.classList.remove("active");
    snippetList.style.display = "none";
    snippetFooter.style.display = "none";
    rulesPane.style.display = "flex";
    await renderRulesPane();
  });

  // Rules pane rendering
  let rulesCache = null;
  let rulesetModule = null;
  let rulesQuery = "";

  async function renderRulesPane() {
    if (!rulesCache) {
      rulesList.innerHTML = '<p class="snippet-empty">Loading…</p>';
      [rulesetModule] = await Promise.all([loadRulesetModule()]);
      const keys = rulesetModule ? rulesetModule.sections.map(s => s.key) : [];
      const uniqueKeys = [...new Set([...keys, "classes", "races"])];
      const results = await Promise.all(uniqueKeys.map(k => getRulesetData(k)));
      rulesCache = Object.fromEntries(uniqueKeys.map((k, i) => [k, results[i]]));
    }
    renderRulesSections(rulesQuery);
  }

  rulesSearch.addEventListener("input", () => {
    rulesQuery = rulesSearch.value.toLowerCase().trim();
    if (rulesCache) renderRulesSections(rulesQuery);
  });

  function renderRulesSections(query) {
    rulesList.innerHTML = "";
    const sections = rulesetModule?.sections ?? [];

    // Build a collapsible heading element (collapsed by default unless query is active)
    function makeHeading(text, depth, startCollapsed) {
      const el = document.createElement("div");
      el.className = depth === 0 ? "rules-section-heading" : "rules-subsection-heading";
      el.textContent = text;
      if (startCollapsed) el.classList.add("collapsed");
      return el;
    }

    function makeEntryRow(entry, formatBlock, formatLine, extraButtons) {
      const name = entry.name || entry.title || "";
      const row = document.createElement("div");
      row.className = "snippet-item";

      const nameEl = document.createElement("span");
      nameEl.className = "rules-entry-name";
      nameEl.textContent = name;
      nameEl.title = formatLine(entry);

      const actions = document.createElement("div");
      actions.className = "snippet-item-actions";

      const lineBtn = document.createElement("button");
      lineBtn.className = "snippet-action-btn";
      lineBtn.textContent = "+";
      lineBtn.title = "Insert one-liner";
      lineBtn.addEventListener("click", () => {
        codeArea.replaceRange(formatLine(entry), codeArea.getCursor());
        codeArea.focus();
      });

      const fullBtn = document.createElement("button");
      fullBtn.className = "snippet-action-btn";
      fullBtn.textContent = "≡";
      fullBtn.title = "Insert full stat block";
      fullBtn.addEventListener("click", () => {
        codeArea.replaceRange(formatBlock(entry), codeArea.getCursor());
        codeArea.focus();
      });

      actions.appendChild(lineBtn);
      actions.appendChild(fullBtn);

      if (extraButtons) {
        for (const def of extraButtons(entry) ?? []) {
          const btn = document.createElement("button");
          btn.className = "snippet-action-btn";
          btn.textContent = def.label;
          btn.title = def.title;
          btn.addEventListener("click", () => {
            const out = def.format();
            if (out) {
              codeArea.replaceRange(out, codeArea.getCursor());
              codeArea.focus();
            }
          });
          actions.appendChild(btn);
        }
      }

      row.appendChild(nameEl);
      row.appendChild(actions);
      return row;
    }

    const hasQuery = !!query;

    sections.forEach(({ label, key, groupBy, formatBlock: rawFormatBlock, formatLine: rawFormatLine, formatTable, extraButtons }) => {
      const formatBlock = e => rawFormatBlock(e, rulesCache);
      const formatLine  = e => rawFormatLine(e, rulesCache);
      let entries = rulesCache[key] ?? [];
      if (query) {
        entries = entries.filter(e =>
          (e.name || e.title || "").toLowerCase().includes(query) ||
          (e.family || e.category || e.class || "").toLowerCase().includes(query)
        );
      }
      if (entries.length === 0) return;

      // Top-level section
      const section = document.createElement("div");
      section.className = "rules-section";

      const heading = makeHeading(`${label} (${entries.length})`, 0, !hasQuery);
      const sectionBody = document.createElement("div");
      sectionBody.className = "rules-section-body";
      if (!hasQuery) sectionBody.style.display = "none";

      heading.addEventListener("click", () => {
        const isVisible = sectionBody.style.display !== "none";
        sectionBody.style.display = isVisible ? "none" : "";
        heading.classList.toggle("collapsed", isVisible);
      });

      // Group into subsections
      const groups = new Map();
      entries.forEach(e => {
        const g = groupBy(e);
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g).push(e);
      });

      // Sort group keys
      const sortedGroups = [...groups.keys()].sort((a, b) => a.localeCompare(b));

      sortedGroups.forEach(groupName => {
        const groupEntries = groups.get(groupName);

        const subHeading = makeHeading(`${groupName} (${groupEntries.length})`, 1, !hasQuery);
        const subBody = document.createElement("div");
        subBody.className = "rules-subsection-body";
        if (!hasQuery) subBody.style.display = "none";

        // Table insert button
        const tableBtn = document.createElement("button");
        tableBtn.className = "rules-table-btn";
        tableBtn.textContent = "⊞";
        tableBtn.title = "Insert as table";
        tableBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          codeArea.replaceRange(formatTable(groupEntries), codeArea.getCursor());
          codeArea.focus();
        });
        subHeading.appendChild(tableBtn);

        subHeading.addEventListener("click", () => {
          const isVisible = subBody.style.display !== "none";
          subBody.style.display = isVisible ? "none" : "";
          subHeading.classList.toggle("collapsed", isVisible);
        });

        groupEntries.forEach(entry => {
          subBody.appendChild(makeEntryRow(entry, formatBlock, formatLine, extraButtons));
        });

        sectionBody.appendChild(subHeading);
        sectionBody.appendChild(subBody);
      });

      section.appendChild(heading);
      section.appendChild(sectionBody);
      rulesList.appendChild(section);
    });

    // Classes section
    let classes = rulesCache.classes ?? [];
    if (query) {
      classes = classes.filter(c => c.name.toLowerCase().includes(query));
    }
    if (classes.length > 0) {
      const section = document.createElement("div");
      section.className = "rules-section";

      const heading = makeHeading(`Classes (${classes.length})`, 0, !hasQuery);
      const sectionBody = document.createElement("div");
      sectionBody.className = "rules-section-body";
      if (!hasQuery) sectionBody.style.display = "none";

      heading.addEventListener("click", () => {
        const isVisible = sectionBody.style.display !== "none";
        sectionBody.style.display = isVisible ? "none" : "";
        heading.classList.toggle("collapsed", isVisible);
      });

      classes.forEach(cls => {
        const subHeading = makeHeading(cls.name, 1, !hasQuery);
        const subBody = document.createElement("div");
        subBody.className = "rules-subsection-body";
        if (!hasQuery) subBody.style.display = "none";

        subHeading.addEventListener("click", () => {
          const isVisible = subBody.style.display !== "none";
          subBody.style.display = isVisible ? "none" : "";
          subHeading.classList.toggle("collapsed", isVisible);
        });

        (cls.levels ?? []).forEach(levelData => {
          const row = document.createElement("div");
          row.className = "snippet-item";

          const nameEl = document.createElement("span");
          nameEl.className = "rules-entry-name";
          nameEl.textContent = `Level ${levelData.level}`;

          const actions = document.createElement("div");
          actions.className = "snippet-item-actions";

          const genBtn = document.createElement("button");
          genBtn.className = "snippet-action-btn";
          genBtn.textContent = "+";
          genBtn.title = "Insert one-liner NPC";
          genBtn.addEventListener("click", () => {
            const line = rulesetModule?.generateNPC?.(cls, levelData.level, rulesCache);
            if (line) {
              codeArea.replaceRange(line, codeArea.getCursor());
              codeArea.focus();
            }
          });

          const blockBtn = document.createElement("button");
          blockBtn.className = "snippet-action-btn";
          blockBtn.textContent = "≡";
          blockBtn.title = "Insert full character sheet";
          blockBtn.addEventListener("click", () => {
            const block = rulesetModule?.generateNPCBlock?.(cls, levelData.level, rulesCache);
            if (block) {
              codeArea.replaceRange(block, codeArea.getCursor());
              codeArea.focus();
            }
          });

          actions.appendChild(genBtn);
          actions.appendChild(blockBtn);
          row.appendChild(nameEl);
          row.appendChild(actions);
          subBody.appendChild(row);
        });

        sectionBody.appendChild(subHeading);
        sectionBody.appendChild(subBody);
      });

      section.appendChild(heading);
      section.appendChild(sectionBody);
      rulesList.appendChild(section);
    }

    // Treasure section — driven by rulesetModule.generators
    if (!query && rulesetModule?.generators?.length) {
      const section = document.createElement("div");
      section.className = "rules-section";

      const heading = makeHeading("Treasure", 0, true);
      const sectionBody = document.createElement("div");
      sectionBody.className = "rules-section-body";
      sectionBody.style.display = "none";

      heading.addEventListener("click", () => {
        const isVisible = sectionBody.style.display !== "none";
        sectionBody.style.display = isVisible ? "none" : "";
        heading.classList.toggle("collapsed", isVisible);
      });

      function makeTreasureRow(label, rollFn) {
        const row = document.createElement("div");
        row.className = "snippet-item";

        const nameEl = document.createElement("span");
        nameEl.className = "rules-entry-name";
        nameEl.textContent = label;

        const actions = document.createElement("div");
        actions.className = "snippet-item-actions";

        const btn = document.createElement("button");
        btn.className = "snippet-action-btn";
        btn.textContent = "⚄";
        btn.title = `Roll ${label}`;
        btn.addEventListener("click", () => {
          codeArea.replaceRange(rollFn(), codeArea.getCursor());
          codeArea.focus();
        });

        actions.appendChild(btn);
        row.appendChild(nameEl);
        row.appendChild(actions);
        return row;
      }

      rulesetModule.generators.forEach(({ label, rows }) => {
        const subHeading = makeHeading(label, 1, false);
        const subBody = document.createElement("div");
        subBody.className = "rules-subsection-body";
        subHeading.addEventListener("click", () => {
          const v = subBody.style.display !== "none";
          subBody.style.display = v ? "none" : "";
          subHeading.classList.toggle("collapsed", v);
        });
        rows.forEach(({ label: rowLabel, fn }) => {
          subBody.appendChild(makeTreasureRow(rowLabel, () => fn(rulesCache)));
        });
        sectionBody.appendChild(subHeading);
        sectionBody.appendChild(subBody);
      });

      section.appendChild(heading);
      section.appendChild(sectionBody);
      rulesList.appendChild(section);
    }

    if (rulesList.children.length === 0) {
      rulesList.innerHTML = '<p class="snippet-empty">No results.</p>';
    }
  }

  snippetPanel.appendChild(snippetPanelHeader);
  snippetPanel.appendChild(snippetList);
  snippetPanel.appendChild(rulesPane);
  snippetPanel.appendChild(snippetFooter);

  // Render the snippet list
  function renderSnippetList() {
    snippetList.innerHTML = "";
    const snippets = loadSnippets();
    if (snippets.length === 0) {
      const empty = document.createElement("p");
      empty.className = "snippet-empty";
      empty.textContent = "No snippets yet.";
      snippetList.appendChild(empty);
      return;
    }
    snippets.forEach(snippet => {
      const item = document.createElement("div");
      item.className = "snippet-item";

      const nameBtn = document.createElement("button");
      nameBtn.className = "snippet-insert-btn";
      nameBtn.textContent = snippet.name;
      nameBtn.title = "Insert at cursor";
      nameBtn.addEventListener("click", () => {
        codeArea.replaceRange(renderMacro(snippet.template), codeArea.getCursor());
        codeArea.focus();
      });

      const actions = document.createElement("div");
      actions.className = "snippet-item-actions";

      const editBtn2 = document.createElement("button");
      editBtn2.className = "snippet-action-btn";
      editBtn2.textContent = "✎";
      editBtn2.title = "Edit snippet";
      editBtn2.addEventListener("click", () => showSnippetForm(snippet));

      const delBtn = document.createElement("button");
      delBtn.className = "snippet-action-btn";
      delBtn.textContent = "✕";
      delBtn.title = "Delete snippet";
      delBtn.addEventListener("click", async () => {
        if (await confirmDialog(`Delete snippet "${snippet.name}"?`)) {
          deleteSnippet(snippet.id);
          renderSnippetList();
        }
      });

      actions.appendChild(editBtn2);
      actions.appendChild(delBtn);
      item.appendChild(nameBtn);
      item.appendChild(actions);
      snippetList.appendChild(item);
    });
  }

  // Inline add/edit form at bottom of panel
  function showSnippetForm(existing = null) {
    let form = snippetPanel.querySelector(".snippet-form");
    if (form) form.remove();

    form = document.createElement("div");
    form.className = "snippet-form";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "snippet-form-name";
    nameInput.placeholder = "Snippet name…";
    nameInput.value = existing?.name ?? "";

    const templateArea = document.createElement("textarea");
    templateArea.className = "snippet-form-template";
    templateArea.placeholder = "Markdown template…\nExpressions: {{roll(3d6)}}  {{ran(1,20)}}  {{pick(\"a\",\"b\")}}";
    templateArea.value = existing?.template ?? "";

    const formActions = document.createElement("div");
    formActions.className = "snippet-form-actions";

    const formSave = document.createElement("button");
    formSave.textContent = "Save";
    formSave.className = "snippet-form-save";
    formSave.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const template = templateArea.value;
      if (!name) return;
      if (existing) {
        updateSnippet(existing.id, name, template);
      } else {
        addSnippet(name, template);
      }
      form.remove();
      renderSnippetList();
    });

    const formCancel = document.createElement("button");
    formCancel.textContent = "Cancel";
    formCancel.className = "snippet-form-cancel";
    formCancel.addEventListener("click", () => form.remove());

    formActions.appendChild(formSave);
    formActions.appendChild(formCancel);
    form.appendChild(nameInput);
    form.appendChild(templateArea);
    form.appendChild(formActions);
    snippetPanel.appendChild(form);
    nameInput.focus();
  }

  snippetAddBtn.addEventListener("click", () => showSnippetForm());
  snippetPanelClose.addEventListener("click", () => {
    snippetPanel.style.display = "none";
  });

  snippetToggleBtn.addEventListener("click", () => {
    const isOpen = snippetPanel.style.display !== "none";
    snippetPanel.style.display = isOpen ? "none" : "flex";
    if (!isOpen) renderSnippetList();
  });

  // Add inputs to editor
  currentEditor.appendChild(toolbar);
  currentEditor.appendChild(categoryInput);
  currentEditor.appendChild(titleInput);
  currentEditor.appendChild(textarea);

  // Attach editor and panel to body (panel is independent, floats to the right)
  document.body.appendChild(currentEditor);
  document.body.appendChild(snippetPanel);

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
