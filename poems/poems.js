/* ============================================================
   poems.js — The poem collection.

   TO ADD A NEW POEM: copy one block below, paste it at the top
   of the list, and fill it in. That's the only file you edit.

   Fields:
     id     – a short unique slug, lowercase, words joined by "-"
              (used in the page link, e.g. #/poem/meri-pehchaan)
     title  – the poem's title (in Hindi)
     date   – optional. Any text you like, e.g. "2024" or "जनवरी 2024".
              Leave as "" to hide it.
     note   – optional. A short line shown under the title (a
              dedication, a context). Leave as "" to hide it.
     body   – the poem itself. Keep it inside the backticks ` `.
              • Press Enter for a new line.
              • Leave a BLANK line between stanzas.
              Line breaks are preserved exactly as you type them.
   ============================================================ */

const POEMS = [
  {
    id: "udaan",
    title: "उड़ान",
    date: "2024",
    note: "सपनों के नाम",
    body: `पंख खोले हैं मैंने आज फिर से,
आसमान को छूने की चाह में।

हवाएँ रोकती रहीं राह में,
पर हौसला कब रुका किसी की चाह में।

ऊँचाइयाँ बुलाती हैं मुझे,
और मैं चल पड़ा हूँ उस ओर —
जहाँ धरती और अम्बर मिलते हैं,
एक नई सुबह की भोर।`
  },
  {
    id: "maa",
    title: "माँ",
    date: "",
    note: "",
    body: `तेरी गोद में सिर रखकर,
मैंने जाना सुकून क्या है।

तेरी आँखों की चमक में,
मैंने देखा अपना कल।

दुनिया कहती है बड़ा हुआ मैं,
पर तेरे लिए वही बच्चा हूँ —
जो आज भी तेरी एक आवाज़ पर
सब कुछ छोड़कर दौड़ा चला आता है।`
  },
  {
    id: "shaam",
    title: "ढलती शाम",
    date: "",
    note: "",
    body: `सूरज ढल रहा है धीरे-धीरे,
परछाइयाँ लंबी हो रही हैं।

दिन भर की थकान लिए,
पंछी लौट रहे हैं घर।

यह शाम भी कह रही है मुझसे —
हर अंत एक नई शुरुआत है,
रुक मत, बस थोड़ी देर ठहर,
फिर चल पड़ना अपनी राह।`
  }
];
