AOS.init();

//  Work experience cards

const experiencecards = document.querySelector(".experience-cards");
const exp = [
  {
    title: "Business Development Specialist & AI Automation Developer / AI-Powered Sales, Marketing & Lead Generation Specialist",
    place: "Rotomaker VFX & AdsAI",
    time: "2022 - Present",
    duration: "Current Role",
    highlight: "Business Development • Lead Generation • Sales Operations • Client Acquisition • Sales Automation • Marketing Automation • AWS Cloud Infrastructure",
    icon: "fas fa-robot",
    colorClass: "tech-purple",
    desp: "<li>Built B2B outreach automation systems using n8n workflows for multi-channel campaigns (LinkedIn, WhatsApp, Gmail)</li><li>Developed 9-agent LangGraph pipeline on AWS EC2 for automated lead generation and outreach</li><li>Built AI-powered Gmail-Telegram approval system — incoming client emails auto-forward to Telegram, AI drafts a reply, I review/approve directly in Telegram, and it sends back through Gmail — deployed across 4 businesses (Rotomaker, AdsAI, HybridFilms, Career Visa Overseas)</li><li>Scrape and identify potential client data — emails, phone numbers, decision-maker contacts — using AI-powered tools</li><li>Manage full sales cycle: prospecting → email/WhatsApp outreach → follow-ups → client meetings → requirement gathering</li><li>Marketing & outreach execution: multi-channel campaign scheduling, Claude API-powered email personalization, social media auto-post automation</li><li>Created full-stack dashboards (FastAPI + React + PostgreSQL + Redis) for sales tracking and contact management</li><li>Manage AWS EC2 (ap-south-1) production infrastructure — LiteLLM proxy routing to AWS Bedrock, S3 storage, n8n Cloud — powering all automation and outreach systems</li><li>Handle bid/quotation coordination, approval workflows, and continuous follow-up through deal closure</li><li><strong>Drive end-to-end lead generation</strong> — sourcing, qualifying, and converting prospects into scheduled client meetings</li>",
    projects: [
      {
        name: "AdsAI B2B Outreach System",
        desc: "9-agent LangGraph pipeline • Multi-channel automation • 7 cities worldwide",
        icon: "fas fa-network-wired",
        link: ""
      },
      {
        name: "Multi-Business n8n Automation Hub",
        desc: "40+ production workflows across 6 businesses • Telegram approval bots • WhatsApp AI agents • 1,200+ executions",
        icon: "fas fa-cogs",
        link: ""
      },
      {
        name: "Production AI Infrastructure Stack",
        desc: "AWS EC2 + Bedrock (LiteLLM proxy) • S3 • n8n Cloud",
        icon: "fas fa-server",
        link: ""
      },
      {
        name: "AWS-Based Lead Scraping Engine",
        desc: "Self-hosted AWS EC2 server scrapes company and decision-maker data — emails, phone numbers, business contacts — for outreach at scale",
        icon: "fas fa-database",
        link: ""
      },
      {
        name: "OpenClaw AI Gateway",
        desc: "EC2-based AI gateway • Telegram + Claude Haiku • Tavily web search",
        icon: "fas fa-satellite-dish",
        link: ""
      },
      {
        name: "AI-Built Client Website Portfolio",
        desc: "7 production sites — Career Visa Overseas, Skyline AI Caterers, Prem Nirvana Caterers, Pro Realtor Me, Kings Tea, Tanvika Enterprises, Ramesh Portfolio",
        icon: "fas fa-globe",
        link: "https://github.com/KalyanAiWorks/career-visa-overseas"
      },
      {
        name: "Mike Bags Dashboard",
        desc: "Sales intelligence analytics • Real-time data visualization • Business metrics",
        icon: "fas fa-shopping-bag",
        link: "https://github.com/KalyanAiWorks/mikebags-dashboard"
      }
    ]
  },
  {
    title: "GIS Engineer",
    place: "RMSI",
    time: "Jul 2021 - Oct 2022",
    duration: "1 yr 4 mos",
    highlight: "Fiber Network Design Specialist",
    icon: "fas fa-map-marked-alt",
    colorClass: "geo-green",
    desp: "<li>Developed FTTP network designs using MapInfo, AutoCAD, and QGIS for National Broadband Network Fiber Design (Australia)</li><li>Created construction packs, as-built drawings, and scope plans for large-scale telecom infrastructure projects</li><li>Collaborated with cross-functional teams to optimize fiber network deployment strategies</li><li>Tools: MapInfo, AutoCAD, QGIS, Excel</li>",
  },
  {
    title: "EnodeB Engineer",
    place: "Sri Laxmi Enterprises",
    time: "Jan 2017 - Feb 2020",
    duration: "3 yrs 2 mos",
    highlight: "Telstra Australia Infrastructure",
    icon: "fas fa-broadcast-tower",
    colorClass: "telco-orange",
    desp: "<li>Maintained Samsung LTE network equipment (CDU, RRU, RRH) for Telstra Australia telecom infrastructure</li><li>Performed site installation, integration, and RF surveys to ensure optimal network performance</li><li>Resolved network alarms and conducted network optimization for improved service quality</li><li>Managed on-site technical operations and coordinated with engineering teams</li>",
  },
  {
    title: "Alarm Engineer",
    place: "Samsung India Electronics",
    time: "Jan 2017 - Aug 2017",
    duration: "8 mos",
    highlight: "LTE Equipment Deployment",
    icon: "fas fa-microchip",
    colorClass: "samsung-blue",
    desp: "<li>RRH swapping and tri-band site installations for Samsung LTE equipment deployment</li><li>EnodeB unit installation and configuration for network expansion projects</li><li>Conducted equipment testing and troubleshooting to maintain network reliability</li>",
  },
];

const showCards2 = () => {
  let output = "";
  exp.forEach(
    ({ title, place, time, duration, highlight, icon, colorClass, desp, projects }) => {
      let projectsHTML = "";

      if (projects && projects.length > 0) {
        projectsHTML = `
          <div class="exp-projects">
            <div class="projects-grid">
              ${projects.map(project => `
                <${project.link ? 'a href="' + project.link + '" target="_blank" rel="noopener"' : 'div'} class="project-card ${project.link ? 'has-link' : ''}">
                  <div class="project-icon">
                    <i class="${project.icon}"></i>
                  </div>
                  <div class="project-content">
                    <h5 class="project-name">${project.name}</h5>
                    <p class="project-desc">${project.desc}</p>
                    ${project.link ? '<span class="project-link-icon"><i class="fas fa-external-link-alt"></i></span>' : ''}
                  </div>
                </${project.link ? 'a' : 'div'}>
              `).join('')}
            </div>
          </div>
        `;
      }

      output += `
    <div class="exp-card-horizontal ${colorClass}" data-aos="fade-right" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="600">
      <div class="exp-card-header">
        <div class="exp-icon">
          <i class="${icon}"></i>
        </div>
        <div class="exp-title-section">
          <h3 class="exp-title">${title}</h3>
          <p class="exp-company">${place}</p>
        </div>
      </div>
      <div class="exp-meta">
        <span class="exp-time"><i class="far fa-calendar-alt"></i> ${time}</span>
        <span class="exp-duration">${duration}</span>
      </div>
      <div class="exp-highlight">
        <span class="highlight-badge">${highlight}</span>
      </div>
      <div class="exp-description">
        <ul>
          ${desp}
        </ul>
      </div>
      ${projectsHTML}
    </div>
      `;
    }
  );
  experiencecards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards2);
