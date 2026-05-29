/* ============================================================
   app.js — Renders the poem list and individual poems.
   You normally never need to edit this file; add poems in
   poems.js instead.
   ============================================================ */

(function () {
  "use strict";

  const app = document.getElementById("app");

  /* Build a quick lookup of poems by id. */
  const byId = {};
  POEMS.forEach(function (p) { byId[p.id] = p; });

  /* --- helpers -------------------------------------------------- */

  // The first non-empty line of a poem, used as a preview on the list.
  function firstLine(body) {
    const lines = body.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "") return lines[i].trim();
    }
    return "";
  }

  // Render a poem body into stanzas (blank line = stanza break) and
  // lines, preserving the poet's exact line breaks. Each line is its
  // own element so wrapping on small screens uses a hanging indent
  // rather than looking like a real line break.
  function renderBody(body) {
    const wrap = document.createElement("div");
    wrap.className = "poem-body";

    const stanzas = body.replace(/\r\n/g, "\n").split(/\n[ \t]*\n/);
    stanzas.forEach(function (stanza) {
      const lines = stanza.split("\n");
      const st = document.createElement("p");
      st.className = "stanza";
      lines.forEach(function (line) {
        const ln = document.createElement("span");
        ln.className = "line";
        // Keep empty lines from collapsing so spacing is honoured.
        ln.textContent = line.length ? line : " ";
        st.appendChild(ln);
      });
      wrap.appendChild(st);
    });
    return wrap;
  }

  function clear() {
    while (app.firstChild) app.removeChild(app.firstChild);
  }

  /* --- views ---------------------------------------------------- */

  function renderList() {
    clear();
    document.title = "कविताएँ";

    if (!POEMS.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "अभी कोई कविता नहीं जोड़ी गई है।";
      app.appendChild(empty);
      return;
    }

    const list = document.createElement("ul");
    list.className = "poem-list";

    POEMS.forEach(function (p) {
      const li = document.createElement("li");
      li.className = "poem-card";

      const a = document.createElement("a");
      a.href = "#/poem/" + p.id;

      const h = document.createElement("h2");
      h.className = "poem-card-title";
      h.textContent = p.title;
      a.appendChild(h);

      const preview = document.createElement("p");
      preview.className = "poem-card-preview";
      preview.textContent = firstLine(p.body);
      a.appendChild(preview);

      if (p.date) {
        const d = document.createElement("span");
        d.className = "poem-card-date";
        d.textContent = p.date;
        a.appendChild(d);
      }

      li.appendChild(a);
      list.appendChild(li);
    });

    app.appendChild(list);
    window.scrollTo(0, 0);
  }

  function renderPoem(id) {
    const poem = byId[id];
    if (!poem) { renderNotFound(); return; }

    clear();
    document.title = poem.title + " — कविताएँ";

    const back = document.createElement("a");
    back.href = "#/";
    back.className = "back-link";
    back.textContent = "← सभी कविताएँ";
    app.appendChild(back);

    const article = document.createElement("article");
    article.className = "poem";

    const h1 = document.createElement("h1");
    h1.className = "poem-title";
    h1.textContent = poem.title;
    article.appendChild(h1);

    if (poem.note) {
      const note = document.createElement("p");
      note.className = "poem-note";
      note.textContent = poem.note;
      article.appendChild(note);
    }

    article.appendChild(renderBody(poem.body));

    if (poem.date) {
      const date = document.createElement("p");
      date.className = "poem-date";
      date.textContent = poem.date;
      article.appendChild(date);
    }

    app.appendChild(article);
    window.scrollTo(0, 0);
  }

  function renderNotFound() {
    clear();
    document.title = "नहीं मिली — कविताएँ";
    const msg = document.createElement("p");
    msg.className = "empty";
    msg.textContent = "यह कविता नहीं मिली।";
    app.appendChild(msg);

    const back = document.createElement("a");
    back.href = "#/";
    back.className = "back-link";
    back.textContent = "← सभी कविताएँ";
    app.appendChild(back);
  }

  /* --- tiny hash router ----------------------------------------- */

  function route() {
    const hash = window.location.hash || "#/";
    const match = hash.match(/^#\/poem\/(.+)$/);
    if (match) {
      renderPoem(decodeURIComponent(match[1]));
    } else {
      renderList();
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
