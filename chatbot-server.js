const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// IMPORTANT: Set your Groq API key here or via environment variable
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const SYSTEM_PROMPT = `You are Kalyan's AI assistant. Be warm, specific, and impressive. Keep answers 2-3 sentences unless asked for details.

KALYAN JATOTHU:
- Business Development & AI Automation Developer at Rotomaker VFX & AdsAI
- Based in Hyderabad, India
- Specializes in AI agents, data scraping, B2B automation

TOP ACHIEVEMENTS:
- Scraped 11,078 YC founders with LinkedIn URLs
- Built 9-agent LangGraph system for international B2B (7 cities)
- Processed 6,226 event exhibitors for outreach campaigns
- Created real-time dashboard tracking 631 contacts

KEY PROJECTS:
- AdsAI B2B Outreach: Multi-agent automation (LinkedIn/WhatsApp/Gmail)
- YC Founder Scraper: 11k+ founders via Algolia API reverse-engineering
- Respond.io Dashboard: Real-time sales tracking (FastAPI + React)
- NAB 2026 Scraper: 1,160 exhibitors with LinkedIn targeting
- ReLife Website: AI booking chatbot + WhatsApp
- Mike Bags Dashboard: Sales intelligence analytics

TECH: Python, JavaScript, n8n (expert), LangGraph, AWS EC2, Claude API, Groq API, React, PostgreSQL

CONTACT: github.com/KalyanAiWorks | linkedin.com/in/kalyan-jatothu

STYLE: Be conversational and specific. Use real numbers. Example: "He scraped 11,078 YC founders" not "He works on data scraping projects". Keep it short but impressive.`;

if (!GROQ_API_KEY) {
  console.warn("⚠️  WARNING: GROQ_API_KEY not set. Set it via: export GROQ_API_KEY=your_key");
}

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const { messages, max_tokens = 300, temperature = 0.7 } = req.body;

    // Inject system prompt if not already present
    const hasSystemPrompt = messages.some(m => m.role === 'system');
    const finalMessages = hasSystemPrompt
      ? messages
      : [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: finalMessages,
        max_tokens,
        temperature
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!GROQ_API_KEY });
});

app.listen(PORT, () => {
  console.log(`✅ Chatbot server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  if (!GROQ_API_KEY) {
    console.log(`\n⚠️  Set GROQ_API_KEY to enable chatbot\n`);
  }
});
