import React, { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import "./ChatBot.css";

/**
 * ChatBot that loads /bg-data.json from public/ and answers with verses
 * based on user's feeling using synonyms + fuzzy search.
 *
 * Requirements:
 *   - npm i fuse.js
 *   - public/bg-data.json (your full 1036-line file)
 */

const SYNO = {
  // Anger
  angry: "Anger", anger: "Anger", mad: "Anger", furious: "Anger", rage: "Anger", irritated: "Anger",
  // Confusion
  confused: "Confusion", confusion: "Confusion", unsure: "Confusion", unclear: "Confusion", perplexed: "Confusion",
  // Envy
  envy: "Envy", jealous: "Envy", jealousy: "Envy",
  // Demotivated
  demotivated: "Demotivated", unmotivated: "Demotivated", motivationless: "Demotivated",
  // Discriminated
  discriminated: "Discriminated", bias: "Discriminated", unfair: "Discriminated",
  // Depressed
  depressed: "Depressed", depression: "Depressed", sad: "Depressed", sorrow: "Depressed", low: "Depressed", hopeless: "Depressed",
  // Fear
  fear: "Fear", afraid: "Fear", scared: "Fear", anxiety: "Fear", anxious: "Fear",
  // Feeling sinful
  sinful: "Feeling sinful", sinner: "Feeling sinful", guilt: "Feeling sinful", guilty: "Feeling sinful",
  // Forgetfulness
  forgetful: "Forgetfulness", forgetfulness: "Forgetfulness", forgot: "Forgetfulness",
  // Greed
  greed: "Greed", greedy: "Greed", avarice: "Greed",
  // Laziness
  lazy: "Laziness", laziness: "Laziness", procrastinate: "Laziness", procrastination: "Laziness",
  // Loneliness
  lonely: "Loneliness", loneliness: "Loneliness", alone: "Loneliness", isolated: "Loneliness",
  // Losing hope
  "losing hope": "Losing hope", hopelessness: "Losing hope", despair: "Losing hope",
  // Lust
  lust: "Lust", lustful: "Lust", desire: "Lust",
  // Practicing forgiveness
  forgiveness: "Practicing forgiveness", forgive: "Practicing forgiveness", forgiving: "Practicing forgiveness",
  // Pride
  pride: "Pride", proud: "Pride", arrogance: "Pride", arrogant: "Pride", ego: "Pride",
  // Seeking peace
  peace: "Seeking peace", peaceful: "Seeking peace", calm: "Seeking peace", serenity: "Seeking peace",
  // Temptation
  temptation: "Temptation", tempted: "Temptation",
  // Uncontrolled mind
  "uncontrolled mind": "Uncontrolled mind", distracted: "Uncontrolled mind", restless: "Uncontrolled mind",
  // Death of loved one
  bereaved: "Death of loved one", grief: "Death of loved one", mourning: "Death of loved one", bereavement: "Death of loved one",
  // Memorization
  memorize: "Memorization", memory: "Memorization", memorization: "Memorization", remember: "Memorization",
};

const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ChatBot = () => {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "BG Bot", text: "🙏 Welcome! Ask me your feelings (e.g., I am angry, I feel depressed)." },
  ]);
  const [input, setInput] = useState("");
  const viewRef = useRef(null);

  const [lastGroup, setLastGroup] = useState(null);
  const [lastIndex, setLastIndex] = useState(0);

  const toggleChat = () => setIsOpen(!isOpen);

  // Load the JSON from public/
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL || ""}/bg-data.json`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Could not load bg-data.json. Ensure it's in /public." },
        ]);
      });
  }, []);

  // Build fast lookups once data arrives
  const lookups = useMemo(() => {
    if (!data?.cards) return null;

    const byId = new Map();            // id:number -> card
    const byChapVerse = new Map();     // "ch.v":string -> card

    for (const c of data.cards) {
      if (typeof c.id !== "undefined") byId.set(Number(c.id), c);
      const ch = String(c.chapter || "").trim();
      const vs = String(c.verse || "").trim();
      if (ch && vs) byChapVerse.set(`${ch}.${vs}`, c);
    }

    const groups = (data.groups || []).filter((g) => g?.isActive !== false);
    const groupNames = groups.map((g) => g.name);

    // Fuse for fuzzy group-name search
    const fuse = new Fuse(groups, {
      keys: ["name", "description"],
      includeScore: true,
      threshold: 0.45, // looser match helps "angry" -> "Anger"
      distance: 100,
      ignoreLocation: true,
    });

    return { groups, groupNames, byId, byChapVerse, fuse };
  }, [data]);

  // Auto-scroll chat
  useEffect(() => {
    if (viewRef.current) viewRef.current.scrollTop = viewRef.current.scrollHeight;
  }, [messages]);

  const resolveGroup = (query) => {
    if (!lookups) return null;
    const q = normalize(query);

    // 1) Synonym hit
    for (const [kw, grp] of Object.entries(SYNO)) {
      if (q.includes(kw)) {
        const found = lookups.groups.find((g) => normalize(g.name) === normalize(grp));
        if (found) return found;
      }
    }

    // 2) Direct contains of actual group name
    for (const g of lookups.groups) {
      if (q.includes(normalize(g.name))) return g;
    }

    // 3) Fuzzy search fallback
    const res = lookups.fuse.search(q);
    if (res.length && res[0].score <= 0.6) return res[0].item;

    return null;
  };

  // Resolve a group's `cards` entries to full card objects
  const resolveCards = (group) => {
    if (!lookups || !group?.cards?.length) return [];
    const out = [];

    for (const raw of group.cards) {
      // raw can be: 102 (id) or 16.21 (chapter.verse) or "9.29"
      const key = typeof raw === "number" ? raw : String(raw).trim();

      let card = null;
      if (typeof key === "number" && lookups.byId.has(key)) {
        card = lookups.byId.get(key);
      } else {
        const asStr = String(key);
        // Try exact chapter.verse match
        if (lookups.byChapVerse.has(asStr)) card = lookups.byChapVerse.get(asStr);
        else {
          // Sometimes JSON numbers like 16.21 may serialize oddly; be forgiving
          // Try to split by '.' and compare
          const m = asStr.match(/^(\d+)\.(\d+)$/);
          if (m) {
            const alt = `${parseInt(m[1], 10)}.${parseInt(m[2], 10)}`;
            if (lookups.byChapVerse.has(alt)) card = lookups.byChapVerse.get(alt);
          }
        }
      }

      if (card) out.push(card);
    }

    // Deduplicate by id
    const seen = new Set();
    return out.filter((c) => {
      const k = c.id ?? `${c.chapter}.${c.verse}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  const formatCard = (c) => {
    debugger;
    const code = c.code || (c.chapter && c.verse ? `BG ${c.chapter}.${c.verse}` : "BG");
    const meaning = c.meaning?.trim() || c.description?.trim() || "";
    return `📖 ${code}\n${c.description}\n${c.meaning}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    if (!lookups) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Loading data, please try again in a moment." }]);
      return;
    }

    const q = normalize(userText);

    // 👇 Check if user is asking for "more" or "another"
    if (lastGroup && (q.includes("more") || q.includes("another") || q.includes("next"))) {
      const cards = resolveCards(lastGroup);
      if (lastIndex < cards.length) {
        const card = cards[lastIndex];
        setLastIndex(lastIndex + 1);

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Here’s another verse from **${lastGroup.name}**:\n\n${formatCard(card)}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `🙏 I’ve already shared all verses I have for **${lastGroup.name}**.` },
        ]);
      }
      return;
    }

    const group = resolveGroup(userText);

    if (!group) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I couldn't find a matching feeling. Try words like angry, depressed, confused, fear, etc." },
      ]);
      return;
    }

    const cards = resolveCards(group);
    if (!cards.length) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `I found the group "${group.name}", but no verses are mapped yet.` },
      ]);
      return;
    }

    //   // Limit to first 8 for readability
    //   const top = cards.slice(0, 8).map(formatCard).join("\n\n");
    //   const more = cards.length > 8 ? `\n\n…and ${cards.length - 8} more.` : "";

    //   setMessages((prev) => [
    //     ...prev,
    //     { sender: "bot", text: `Here are verses for **${group.name}**:\n\n${top}${more}` },
    //   ]);
    // };
    // Reset context
    setLastGroup(group);
    setLastIndex(1);

    const firstCard = formatCard(cards[0]);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: `This sounds like **${group.name}**. Here’s a verse:\n\n${firstCard}` },
    ]);
  };

  return (
    <div>
      <button className="chatbot-btn" onClick={toggleChat}>💬</button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">Chatbot</div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.sender}`}>
                {msg.text.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>

  );
};

export default ChatBot;
