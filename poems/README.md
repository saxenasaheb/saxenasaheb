# कविताएँ — डॉ. प्रणव गौतम

A simple, elegant site for showcasing the Hindi poems and ghazals of
**डॉ. प्रणव गौतम**. Each poem gets its own page; the home page lists them all.

## Viewing it

Open `index.html` in a browser. No build step, no server needed.
(If links inside don't work when opening the file directly, run a tiny
local server from this folder: `python3 -m http.server` then visit
`http://localhost:8000`.)

## Adding a new poem

Everything lives in **`poems.js`** — that's the only file you edit.

Copy an existing block and paste it at the **top** of the list:

```js
{
  id: "ek-pehchaan",        // short unique name for the link (lowercase, dashes)
  title: "एक पहचान",         // the poem's title
  date: "2024",             // optional — leave "" to hide
  note: "ग़ज़ल",              // optional short label/dedication — "" to hide
  context: "",              // optional longer preface (the occasion) — "" to hide
  body: `पहली पंक्ति यहाँ,
दूसरी पंक्ति यहाँ।

(खाली पंक्ति = नया छंद / new stanza)
अगला छंद यहाँ।`
},
```

Rules of thumb:
- Put the poem text between the backticks `` ` ` ``.
- Press **Enter** for a new line — line breaks are kept exactly.
- Leave a **blank line** between stanzas.
- Each `id` must be unique.

That's it. Save, refresh the browser, and the new poem appears in the list
and gets its own page.

## Files

| File         | What it is                                            |
|--------------|-------------------------------------------------------|
| `index.html` | Page shell + fonts.                                   |
| `poems.js`   | **The poems.** This is what you edit.                 |
| `app.js`     | Renders the list and poem pages. No need to touch.    |
| `style.css`  | The warm, traditional look. Edit to change the style. |
