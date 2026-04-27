require('dotenv').config();
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const Groq = require('groq-sdk');

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json({ limit: '20mb' }));
app.use(express.static(path.join(__dirname)));

// 6 readings per IP per 10 minutes — enough for real use, hard to abuse
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many readings. Please wait a few minutes before trying again.' }
});

const PROMPT = `You are an expert palmist. Carefully analyze this palm image and produce a detailed, personalized reading.

Examine:
1. Hand shape — palm width vs finger length: Fire = square + short fingers, Earth = square + short but solid, Air = rectangular + long fingers, Water = oval/rectangular + long fingers. Identify the blend.
2. Which hand is shown (left or right).
3. Heart line — the topmost major horizontal crease.
4. Head line — the middle horizontal crease.
5. Life line — the prominent curved line around the thumb base.
6. Fate line — vertical crease rising from palm base toward middle finger (note if faint or absent).

Reply ONLY with a raw JSON object — no markdown, no code fences, no extra text:
{
  "handType": "AIR-EARTH",
  "dominant": "Left",
  "element": "Air / Earth",
  "heartLine": "2-3 sentence reading...",
  "headLine": "2-3 sentence reading...",
  "lifeLine": "2-3 sentence reading...",
  "fateLine": "2-3 sentence reading or note its absence...",
  "handShape": "2 sentence description of shape and what it reveals...",
  "keyTraits": ["Trait1", "Trait2", "Trait3", "Trait4", "Trait5", "Trait6", "Trait7"],
  "overallReading": "2-3 sentence holistic synthesis...",
  "guidance": [
    "First guidance point...",
    "Second guidance point...",
    "Third guidance point...",
    "Fourth guidance point..."
  ]
}`;

app.post('/api/read-palm', limiter, async (req, res) => {
  const { image, mimeType } = req.body;

  if (!image || !mimeType || !mimeType.startsWith('image/')) {
    return res.status(400).json({ error: 'Missing or invalid image data.' });
  }

  // Sanity-check base64 size (~15 MB decoded max)
  if (image.length > 20 * 1024 * 1024) {
    return res.status(400).json({ error: 'Image too large. Please use a smaller photo.' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${image}` } },
          { type: 'text', text: PROMPT }
        ]
      }],
      max_tokens: 1400,
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content.trim();

    let reading;
    try {
      reading = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) reading = JSON.parse(match[0]);
      else throw new Error('Model returned an unexpected format.');
    }

    res.json({ reading });
  } catch (err) {
    console.error('Groq error:', err.message);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Analysis failed. Please try again.' });
  }
});

// Serve the palm app at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'palm', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Palm reading server running on http://localhost:${PORT}`));
