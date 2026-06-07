const checklistRoot = document.querySelector("#checklist-content");

async function loadChecklist() {
  const response = await fetch("../docs/prep-checklist.md");
  if (!response.ok) {
    throw new Error(`Checklist request failed: ${response.status}`);
  }
  const markdown = (await response.text()).replace(/^# .+\n+/, "");
  checklistRoot.innerHTML = renderMarkdown(markdown);
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      closeList();
      html.push(`<h1>${inline(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      closeList();
      html.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
      continue;
    }

    const task = trimmed.match(/^- \[( |x)\] (.+)$/i);
    if (task) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      const checked = task[1].toLowerCase() === "x";
      html.push(`
        <li class="${checked ? "is-done" : ""}">
          <span class="task-check">${checked ? "✓" : ""}</span>
          <span>${inline(task[2])}</span>
        </li>
      `);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li><span>${inline(trimmed.slice(2))}</span></li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inline(trimmed)}</p>`);
  }

  closeList();
  return html.join("");
}

function inline(value) {
  return escapeHtml(value).replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

loadChecklist().catch((error) => {
  console.error(error);
  checklistRoot.innerHTML = `<div class="empty-state">清單載入失敗</div>`;
});
