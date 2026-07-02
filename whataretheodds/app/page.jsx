"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const TICKER_FACTS = [
  "Struck by lightning this year: 1 in 1,222,000",
  "Hole in one (amateur): 1 in 12,500",
  "Born on Feb 29: 1 in 1,461",
  "Dealt a royal flush: 1 in 649,740",
  "Finding a four-leaf clover: 1 in 5,076",
  "Bowling a perfect 300: 1 in 11,500",
  "Identical twins: 1 in 250 births",
  "Shark attack (lifetime): 1 in 3,748,067",
  "Two people in a room of 23 sharing a birthday: 1 in 2",
];

const STATUS_LINES = [
  "Consulting actuarial tables...",
  "Interviewing a coin, mid-flip...",
  "Adjusting for cosmic coincidence...",
  "Cross-referencing the Vegas line...",
  "Applying the law of large numbers...",
  "Accounting for your specific luck...",
  "Running 10,000 simulations of your life...",
  "Checking Mercury's current mood...",
];

const PLACEHOLDERS = [
  "I ran into my ex at an airport in another country...",
  "My phone died at exactly 4:32 twice this week...",
  "The barista guessed my order on my first visit...",
  "My wife shares a birthday with her favourite actress...",
];

function formatOdds(n) {
  if (!n || n < 1) return "1";
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  return Math.round(n).toLocaleString("en-US");
}

function randomDigits(len) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += Math.floor(Math.random() * 10);
    if (i % 3 === 2 && i !== len - 1) s += ",";
  }
  return s;
}

export default function Home() {
  const [phase, setPhase] = useState("idle"); // idle | calculating | revealed | error
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [statusIdx, setStatusIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const numberRef = useRef(null);
  const scrambleRef = useRef(null);
  const statusRef = useRef(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    setPlaceholder(
      PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
    );
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Scramble digits + rotate status lines while calculating
  useEffect(() => {
    if (phase !== "calculating") return;
    if (!reducedRef.current) {
      scrambleRef.current = setInterval(() => {
        if (numberRef.current) {
          numberRef.current.textContent = randomDigits(5);
        }
      }, 70);
    } else if (numberRef.current) {
      numberRef.current.textContent = "· · · · ·";
    }
    statusRef.current = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_LINES.length);
    }, 1100);
    return () => {
      clearInterval(scrambleRef.current);
      clearInterval(statusRef.current);
    };
  }, [phase]);

  // Count-up on reveal
  useEffect(() => {
    if (phase !== "revealed" || !result) return;
    const target = result.one_in;
    if (reducedRef.current) {
      if (numberRef.current)
        numberRef.current.textContent = formatOdds(target);
      return;
    }
    const dur = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      if (numberRef.current)
        numberRef.current.textContent = formatOdds(
          Math.max(1, target * eased)
        );
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, result]);

  const calculate = useCallback(async () => {
    const q = question.trim();
    if (!q || phase === "calculating") return;
    setPhase("calculating");
    setResult(null);
    setCopied(false);
    setStatusIdx(Math.floor(Math.random() * STATUS_LINES.length));

    try {
      const res = await fetch("/api/odds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      if (!res.ok) throw new Error(`engine ${res.status}`);
      const parsed = await res.json();
      if (!parsed.one_in || !parsed.comparison) throw new Error("bad shape");
      // small dramatic pause so the scramble gets its moment
      setTimeout(
        () => {
          setResult(parsed);
          setPhase("revealed");
        },
        reducedRef.current ? 0 : 700
      );
    } catch (err) {
      console.error("Odds engine error:", err);
      setPhase("error");
    }
  }, [question, phase]);

  const copyResult = async () => {
    if (!result) return;
    const text = `"${question.trim()}"\n\nTHE ODDS: 1 in ${formatOdds(
      result.one_in
    )}\n${result.comparison}\n\nwhataretheodds.com`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setPhase("idle");
    setResult(null);
    setQuestion("");
    setCopied(false);
  };

  const showBoard = phase === "calculating" || phase === "revealed";

  return (
    <div className="wato-root">
      <nav className="wato-nav">
        <div className="wato-mark">
          WHAT ARE THE ODDS<span>?</span>
        </div>
        <div className="wato-nav-note">odds engine · live</div>
      </nav>

      <main className="wato-main">
        {phase === "idle" && (
          <>
            <h1 className="wato-h1">
              Something wild just
              <br />
              happened to <em>you.</em>
            </h1>
            <p className="wato-sub">
              Describe it. The engine calculates the odds and tells you exactly
              how impressed to be.
            </p>
            <div className="wato-input-wrap">
              <label className="wato-label" htmlFor="wato-q">
                Your situation
              </label>
              <textarea
                id="wato-q"
                className="wato-input"
                placeholder={placeholder}
                value={question}
                maxLength={500}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    calculate();
                  }
                }}
              />
              <button
                className="wato-cta"
                onClick={calculate}
                disabled={!question.trim()}
              >
                What are the odds?
              </button>
            </div>
          </>
        )}

        {showBoard && (
          <div className="wato-board" key={phase}>
            <p className="wato-q">&ldquo;{question.trim()}&rdquo;</p>

            {phase === "revealed" && result && (
              <div className="wato-verdict">{result.verdict}</div>
            )}

            <div className="wato-onein">THE ODDS ARE 1 IN</div>
            <div className="wato-number" ref={numberRef} aria-live="polite">
              {phase === "revealed" && result ? formatOdds(result.one_in) : ""}
            </div>

            {phase === "calculating" && (
              <div className="wato-status" aria-live="polite">
                {STATUS_LINES[statusIdx]}
              </div>
            )}

            {phase === "revealed" && result && (
              <>
                {result.breakdown.length > 0 && (
                  <div className="wato-breakdown">
                    <div className="wato-bk-title">How we got there</div>
                    {result.breakdown.map((row, i) => (
                      <div className="wato-bk-row" key={i}>
                        <span className="wato-bk-factor">{row.factor}</span>
                        <span className="wato-bk-math">{row.math}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="wato-comparison">{result.comparison}</p>
                {result.footnote && (
                  <p className="wato-footnote">* {result.footnote}</p>
                )}
                <div className="wato-actions">
                  <button className="wato-btn-primary-sm" onClick={copyResult}>
                    {copied ? "Copied!" : "Copy my odds"}
                  </button>
                  <button className="wato-btn-secondary" onClick={reset}>
                    Ask another
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {phase === "error" && (
          <div className="wato-error">
            <h2>The engine choked.</h2>
            <p>
              Even we didn&rsquo;t see that coming. Give it another spin, the
              actuaries are back at their desks.
            </p>
            <button
              className="wato-btn-primary-sm"
              onClick={() => setPhase("idle")}
            >
              Try again
            </button>
          </div>
        )}
      </main>

      <div className="wato-ticker" aria-hidden="true">
        <div className="wato-ticker-track">
          {[...TICKER_FACTS, ...TICKER_FACTS].map((f, i) => {
            const [label, odds] = f.split(": ");
            return (
              <span className="wato-ticker-item" key={i}>
                {label}: <b>{odds}</b>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
