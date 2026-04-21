AOS.init();
/* Project Cards */

const projectcards = document.querySelector(".projectcards");

// Array of project objects with enhanced data
const projects = [
  {
    title: "Google Maps to Respond.io Pipeline",
    description: "Automated lead extraction and WhatsApp outreach",
    icon: "fas fa-map-marked-alt",
    gradient: "linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC04 75%, #EA4335 100%)",
    techStack: ["SerpAPI", "Respond.io", "n8n", "WhatsApp"],
    Githublink: "",
    category: "Automation"
  },
  {
    title: "Claude-Powered Email Personalization",
    description: "AI-driven Gmail draft creation with personalization engine",
    icon: "fas fa-envelope-open-text",
    gradient: "linear-gradient(135deg, #FF6B35 0%, #764BA2 100%)",
    techStack: ["Claude API", "Gmail API", "Python", "Google Sheets"],
    Githublink: "",
    category: "AI & Automation"
  },
  {
    title: "AdsAI Gmail Campaign",
    description: "Scheduled multi-client email campaigns with rate limiting",
    icon: "fas fa-paper-plane",
    gradient: "linear-gradient(135deg, #EA4335 0%, #C5221F 100%)",
    techStack: ["n8n", "Gmail", "Automation", "Scheduling"],
    Githublink: "",
    category: "Marketing Automation"
  },
  {
    title: "AdsAI B2B Outreach System",
    description: "9-agent LangGraph pipeline for multi-channel acquisition",
    icon: "fas fa-project-diagram",
    gradient: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    techStack: ["LangGraph", "AWS EC2", "Telegram", "Multi-channel"],
    Githublink: "",
    category: "AI Systems"
  },
  {
    title: "Respond.io Tracker Dashboard",
    description: "Real-time contact tracking • 631 contacts synced",
    icon: "fas fa-chart-line",
    gradient: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)",
    techStack: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
    Githublink: "",
    category: "Full-Stack"
  },
  {
    title: "OpenClaw AI Gateway",
    description: "EC2-based AI gateway with Telegram integration",
    icon: "fas fa-robot",
    gradient: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
    techStack: ["Claude Haiku", "Telegram", "Tavily", "AWS EC2"],
    Githublink: "",
    category: "AI Gateway"
  },
  {
    title: "ReLife Physiotherapy Website",
    description: "Healthcare landing page with AI booking chatbot",
    icon: "fas fa-heartbeat",
    gradient: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
    techStack: ["JavaScript", "AI Chatbot", "WhatsApp", "Booking"],
    Githublink: "",
    category: "Web Development"
  },
  {
    title: "Kalyan Construction",
    description: "TypeScript full-stack site with AI inquiry chatbot",
    icon: "fas fa-building",
    gradient: "linear-gradient(135deg, #F09819 0%, #EDDE5D 100%)",
    techStack: ["TypeScript", "Full-Stack", "AI Chatbot"],
    Githublink: "https://github.com/KalyanAiWorks/kalyan-construction",
    category: "Web Development"
  },
  {
    title: "Mike Bags Dashboard",
    description: "Sales intelligence analytics with business metrics",
    icon: "fas fa-shopping-bag",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)",
    techStack: ["React", "Analytics", "Sales Intelligence"],
    Githublink: "https://github.com/KalyanAiWorks/mikebags-dashboard",
    category: "Analytics"
  },
  {
    title: "Trading Agent",
    description: "Algorithmic trading automation system",
    icon: "fas fa-chart-candlestick",
    gradient: "linear-gradient(135deg, #00C853 0%, #B2FF59 50%, #FF1744 100%)",
    techStack: ["Python", "Trading API", "Algorithms"],
    Githublink: "https://github.com/KalyanAiWorks/trading-agent",
    category: "Finance"
  },
  {
    title: "Multi-Language Translator",
    description: "Real-time translation supporting multiple languages",
    icon: "fas fa-globe",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #96CEB4 75%, #FFEAA7 100%)",
    techStack: ["Python", "Translation API", "Multi-language"],
    Githublink: "https://github.com/KalyanAiWorks/multi-language-translator",
    category: "AI Tools"
  },
];

// Function to render modern SaaS-style project cards
const showCards = () => {
  let output = "";
  projects.forEach(({ title, description, icon, gradient, techStack, Githublink, category }) => {
    const hasGithub = Githublink && Githublink !== "";
    output += `
      <div class="column skill-card card" data-aos="zoom-in-up" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="600">
        <div class="project-card-modern">
          <div class="project-card-header" style="background: ${gradient};">
            <div class="project-category">${category}</div>
            <div class="project-icon-wrapper">
              <i class="${icon}"></i>
            </div>
            <h3 class="project-title">${title}</h3>
          </div>
          <div class="project-card-body">
            <p class="project-description">${description}</p>
            <div class="tech-stack">
              ${techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            ${hasGithub ? `
              <a href="${Githublink}" target="_blank" rel="noopener noreferrer" class="view-project-btn">
                <i class="fab fa-github"></i> View Project
              </a>
            ` : `
              <div class="view-project-btn disabled">
                <i class="fas fa-lock"></i> Private Project
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  });
  projectcards.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCards);

// Search functionality
function myFunction() {
  var input, filter, cards, card, title, i;
  input = document.getElementById("myInput").value;
  filter = input.toUpperCase();
  cards = document.getElementsByClassName("skill-card");

  for (i = 0; i < cards.length; i++) {
    title = cards[i].querySelector(".project-title");
    if (title) {
      if (title.innerText.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
}
