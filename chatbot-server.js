const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// IMPORTANT: Set your Groq API key here or via environment variable
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

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

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
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
