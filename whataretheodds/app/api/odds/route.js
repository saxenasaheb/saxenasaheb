export const runtime = "edge";

const ENGINE_PROMPT = (q) => `You are the odds engine behind whataretheodds.com, a playful site where people describe a situation and you tell them the odds of it happening. You are a confident statistician who is clearly having fun: your numbers are precise, your methodology is fake-rigorous but internally consistent, and your comparisons make the odds feel visceral.

The user's situation: "${q}"

CALIBRATION RULES (most important):
- When a real base rate exists, anchor to it, then apply small playful adjustments. Do NOT inflate rarity for drama. Examples of correct anchoring:
  - One specific person sharing a birthday with one specific other person: ~1 in 365. A playful adjustment for birth seasonality might land it at 1 in 372. NOT 1 in 100,000.
  - Any two people in a group of 23 sharing a birthday: ~1 in 2.
  - Running into someone you know in a random foreign city: depends on network size and city, typically 1 in 5,000 to 1 in 50,000, not 1 in a million.
  - A coin landing heads 5 times in a row: 1 in 32.
- If the situation is actually common, LOW odds are the funny answer. "1 in 4" delivered with total confidence is funnier than fake rarity.
- Where no base rate exists, invent a confident, precise figure with visible reasoning. Never answer exactly 50/50 or a suspiciously round number like 1 in 1,000.
- The breakdown must multiply out roughly to the final answer. Internal consistency is the joke.

TONE RULES:
- Every string punchy. No hedging.
- No em-dashes anywhere.
- If the situation involves death, serious illness, self-harm, or genuine tragedy, drop the jokes entirely: give a respectful, gentle response with sensible odds and a warm comparison.

Respond with ONLY a valid JSON object, no markdown fences, no preamble:
{
  "one_in": <number, the X in "1 in X", between 2 and 900000000>,
  "verdict": "<2-4 word ALL-CAPS verdict, e.g. GENUINELY RARE, HAPPENS CONSTANTLY, BORDERLINE MIRACLE, SUSPICIOUSLY COMMON, RARER THAN IT FEELS, MORE COMMON THAN IT FEELS>",
  "breakdown": [
    {"factor": "<short factor name, under 8 words>", "math": "<short pseudo-math, e.g. base rate 1/365 or x 0.24 or / 7>"},
    {"factor": "...", "math": "..."},
    {"factor": "...", "math": "..."}
  ],
  "comparison": "<one sentence: 'About the same odds as ...' with a vivid, concrete comparison>",
  "footnote": "<one short witty methodology disclaimer, under 15 words>"
}`;

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function POST(req) {
  let question;
  try {
    const body = await req.json();
    question = (body.question || "").toString().trim();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  if (!question || question.length > 500) {
    return Response.json(
      { error: "Give us a situation between 1 and 500 characters." },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Server is missing ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 800,
        messages: [{ role: "user", content: ENGINE_PROMPT(question) }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Anthropic API error:", res.status, detail.slice(0, 300));
      return Response.json({ error: "Engine unavailable" }, { status: 502 });
    }

    const data = await res.json();
    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    const parsed = extractJson(text.replace(/```json|```/g, ""));
    if (
      !parsed ||
      typeof parsed.one_in !== "number" ||
      !isFinite(parsed.one_in) ||
      !parsed.comparison
    ) {
      console.error("Unparseable engine output:", text.slice(0, 300));
      return Response.json({ error: "Engine returned nonsense" }, { status: 502 });
    }

    return Response.json({
      one_in: Math.max(2, Math.min(900000000, Math.round(parsed.one_in))),
      verdict: (parsed.verdict || "THE VERDICT IS IN").toString().slice(0, 40),
      breakdown: Array.isArray(parsed.breakdown)
        ? parsed.breakdown.slice(0, 4).map((r) => ({
            factor: (r.factor || "").toString().slice(0, 80),
            math: (r.math || "").toString().slice(0, 40),
          }))
        : [],
      comparison: parsed.comparison.toString().slice(0, 240),
      footnote: (parsed.footnote || "").toString().slice(0, 120),
    });
  } catch (err) {
    console.error("Odds engine failure:", err);
    return Response.json({ error: "Engine unavailable" }, { status: 502 });
  }
}
