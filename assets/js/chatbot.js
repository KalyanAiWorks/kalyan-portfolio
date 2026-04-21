(function () {
  // TODO: Set GROQ_API_KEY via environment variable or secure config
  const GROQ_API_KEY = ""; // DO NOT commit actual API keys
  const GROQ_MODEL = "llama-3.3-70b-versatile";
  const SYSTEM_PROMPT = `You are an AI assistant for Kalyan Jatothu's personal portfolio website. Help visitors learn about Kalyan. He is into AI Automation. Be friendly, concise, and professional. Keep responses short (2-4 sentences). Answer questions about his skills, experience, projects, and how to contact him.`;
  const chatHistory = [];

  // Inject into a Shadow DOM so site CSS cannot interfere at all
  const host = document.createElement("div");
  host.id = "kj-host";
  host.style.cssText = "position:fixed;bottom:0;right:0;z-index:2147483647;width:0;height:0;";
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      #btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed, #a855f7);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(124,58,237,0.5);
        transition: transform 0.2s;
      }
      #btn:hover { transform: scale(1.1); }
      #btn svg { width: 26px; height: 26px; fill: #fff; }

      #win {
        position: fixed;
        bottom: 90px;
        right: 24px;
        width: 340px;
        height: 500px;
        background: #111827;
        border: 1px solid rgba(124,58,237,0.4);
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 40px rgba(0,0,0,0.8);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        overflow: hidden;
        transform: translateY(16px) scale(0.96);
        opacity: 0;
        pointer-events: none;
        transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
      }
      #win.open {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: all;
      }

      #header {
        background: linear-gradient(135deg, #1e0a3c, #150328);
        padding: 10px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid rgba(124,58,237,0.2);
        flex-shrink: 0;
        height: 58px;
      }
      #avatar {
        width: 36px;
        height: 36px;
        min-width: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg,#7c3aed,#a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      #hinfo {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      #hname {
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
      }
      #hstatus {
        font-size: 11px;
        color: #22c55e;
        white-space: nowrap;
        line-height: 1.3;
      }
      #close {
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        font-size: 22px;
        line-height: 1;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        flex-shrink: 0;
      }
      #close:hover { color: #fff; background: rgba(255,255,255,0.1); }

      #messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
      }
      #messages::-webkit-scrollbar { width: 4px; }
      #messages::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 4px; }

      .msg {
        max-width: 82%;
        padding: 9px 13px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.5;
        word-break: break-word;
        color: #e5e7eb;
      }
      .bot { background: #1f2937; align-self: flex-start; border-bottom-left-radius: 3px; }
      .user { background: linear-gradient(135deg,#7c3aed,#9333ea); color: #fff; align-self: flex-end; border-bottom-right-radius: 3px; }
      .typing { background: #1f2937; color: #6b7280; align-self: flex-start; font-style: italic; font-size: 12px; }

      #suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 8px 12px;
        background: #0f172a;
        border-top: 1px solid rgba(255,255,255,0.05);
        flex-shrink: 0;
      }
      .sbtn {
        background: #1e293b;
        border: 1px solid rgba(124,58,237,0.3);
        border-radius: 16px;
        padding: 5px 12px;
        font-size: 11px;
        color: #a78bfa;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        font-family: inherit;
      }
      .sbtn:hover { background: rgba(124,58,237,0.2); color: #c4b5fd; }

      #input-area {
        padding: 10px 12px;
        border-top: 1px solid rgba(255,255,255,0.06);
        display: flex;
        gap: 8px;
        align-items: center;
        background: #0f172a;
        flex-shrink: 0;
      }
      #inp {
        flex: 1;
        background: #1e293b;
        border: 1px solid rgba(124,58,237,0.25);
        border-radius: 20px;
        padding: 8px 14px;
        color: #e2e8f0;
        font-size: 13px;
        outline: none;
        font-family: inherit;
        min-width: 0;
      }
      #inp:focus { border-color: rgba(124,58,237,0.6); }
      #inp::placeholder { color: #4b5563; }
      #sendbtn {
        width: 36px;
        height: 36px;
        min-width: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg,#7c3aed,#a855f7);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #sendbtn:disabled { opacity: 0.4; cursor: not-allowed; }
      #sendbtn svg { width: 15px; height: 15px; fill: #fff; }
    </style>

    <button id="btn" title="Chat with Kalyan's AI">
      <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.046 21.953l4.785-1.392A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.951 7.951 0 0 1-4.027-1.088l-.29-.172-2.84.826.836-2.78-.19-.302A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/><circle cx="8.5" cy="12.5" r="1.5"/><circle cx="12" cy="12.5" r="1.5"/><circle cx="15.5" cy="12.5" r="1.5"/></svg>
    </button>

    <div id="win">
      <div id="header">
        <div id="avatar">🤖</div>
        <div id="hinfo">
          <div id="hname">Kalyan's AI Assistant</div>
          <div id="hstatus">● Online — Powered by Groq</div>
        </div>
        <button id="close">×</button>
      </div>
      <div id="messages"></div>
      <div id="suggestions">
        <button class="sbtn">Who is Kalyan?</button>
        <button class="sbtn">His skills?</button>
        <button class="sbtn">His projects?</button>
        <button class="sbtn">Contact him</button>
      </div>
      <div id="input-area">
        <input id="inp" type="text" placeholder="Ask me anything…" maxlength="300" />
        <button id="sendbtn">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;

  const $ = id => shadow.getElementById(id);
  const btn     = $("btn");
  const win     = $("win");
  const close   = $("close");
  const messages= $("messages");
  const inp     = $("inp");
  const sendbtn = $("sendbtn");

  btn.addEventListener("click", () => {
    const isOpen = win.classList.toggle("open");
    if (isOpen) {
      inp.focus();
      if (messages.children.length === 0) {
        addMsg("bot", "👋 Hi! I'm Kalyan's AI assistant. Ask me about his skills, projects, experience, or how to contact him!");
      }
    }
  });

  close.addEventListener("click", () => win.classList.remove("open"));

  shadow.querySelectorAll(".sbtn").forEach(b => {
    b.addEventListener("click", () => send(b.textContent.trim()));
  });

  function addMsg(type, text) {
    const d = document.createElement("div");
    d.className = "msg " + type;
    d.textContent = text;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
    return d;
  }

  async function send(text) {
    if (!text.trim()) return;
    addMsg("user", text);
    inp.value = "";
    sendbtn.disabled = true;
    chatHistory.push({ role: "user", content: text });
    const t = addMsg("typing", "Thinking…");
    try {
      const res = await fetch("https://wallace-double-organizations-falls.trycloudflare.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...chatHistory],
          max_tokens: 300,
          temperature: 0.7
        })
      });
      const data = await res.json();
      t.remove();
      if (data.choices?.[0]) {
        const reply = data.choices[0].message.content.trim();
        chatHistory.push({ role: "assistant", content: reply });
        addMsg("bot", reply);
      } else {
        addMsg("bot", "Sorry, couldn't get a response. Try again!");
      }
    } catch {
      t.remove();
      addMsg("bot", "Network error. Please try again.");
    }
    sendbtn.disabled = false;
    inp.focus();
  }

  sendbtn.addEventListener("click", () => send(inp.value));
  inp.addEventListener("keydown", e => { if (e.key === "Enter") send(inp.value); });
})();
