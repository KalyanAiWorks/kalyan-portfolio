AOS.init();

//  Tech Stacks cards

const techStackCards = document.querySelector(".techstack-box");
const techStack = [
  {
    langImage: "assets/images/techstack-page/python.png",
    langName: "Python",
    langDesc: "<li>Primary language for AI automation, backend development, and data processing workflows</li>",
  },
  {
    langImage: "assets/images/techstack-page/javascript.png",
    langName: "JavaScript",
    langDesc: "<li>Frontend development, n8n workflows, and interactive web applications</li>",
  },
  {
    langImage: "assets/images/techstack-page/typescript.png",
    langName: "TypeScript",
    langDesc: "<li>Type-safe development for scalable full-stack applications</li>",
  },
  {
    langImage: "assets/images/techstack-page/fastapi.png",
    langName: "FastAPI",
    langDesc: "<li>High-performance Python framework for building RESTful APIs and backend services</li>",
  },
  {
    langImage: "assets/images/techstack-page/react.png",
    langName: "React",
    langDesc: "<li>Component-based frontend library for building interactive dashboards and web UIs</li>",
  },
  {
    langImage: "assets/images/techstack-page/n8n.png",
    langName: "n8n",
    langDesc: "<li>Expert-level workflow automation for multi-channel campaigns and business process automation</li>",
  },
  {
    langImage: "assets/images/techstack-page/langgraph.png",
    langName: "LangGraph",
    langDesc: "<li>Multi-agent orchestration for complex AI workflows and autonomous systems</li>",
  },
  {
    langImage: "assets/images/techstack-page/langchain.png",
    langName: "LangChain",
    langDesc: "<li>LLM application development framework for building AI-powered automation</li>",
  },
  {
    langImage: "assets/images/techstack-page/aws.png",
    langName: "AWS EC2",
    langDesc: "<li>Cloud infrastructure deployment for scalable AI services and automation pipelines</li>",
  },
  {
    langImage: "assets/images/techstack-page/docker.png",
    langName: "Docker",
    langDesc: "<li>Containerization for consistent deployment across development and production environments</li>",
  },
  {
    langImage: "assets/images/techstack-page/postgresql.png",
    langName: "PostgreSQL",
    langDesc: "<li>Relational database for data persistence, analytics, and transaction management</li>",
  },
  {
    langImage: "assets/images/techstack-page/redis.png",
    langName: "Redis",
    langDesc: "<li>In-memory caching and real-time data processing for high-performance applications</li>",
  },
  {
    langImage: "assets/images/techstack-page/claude.png",
    langName: "Claude API",
    langDesc: "<li>AI-powered personalization and intelligent automation using Anthropic's Claude models</li>",
  },
  {
    langImage: "assets/images/techstack-page/nginx.png",
    langName: "nginx",
    langDesc: "<li>Reverse proxy and load balancing for production web services</li>",
  },
];

const displayTechStacksCards = () => {
  const entireCardTemplate =
  techStack.map((stack)=> {
      return `        
    <div class="row page-content techstackcards" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="0" data-aos-duration="400"> 
        <div class="tech_card">
            <div class="card_img">
                <img src ="${stack.langImage}" class="featured_image">
            </div>
            <div class="card_header">
                <header>
                    <div class="text-center langName">
                        <h4>${stack.langName}</h4>
                    </div>
                </header>
                <ul class="description">
                ${stack.langDesc}
            </ul>
            </div>
        </div>
    </div>
      `}).join('');
  techStackCards.innerHTML = entireCardTemplate;
};
// displayTechStacksCards(techStack)
document.addEventListener("DOMContentLoaded", displayTechStacksCards);
