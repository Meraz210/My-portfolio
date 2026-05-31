/* global process */

const portfolioContext = `
You are MD Meraz Ahasan Shah's professional portfolio assistant.

Primary goal:
- Help visitors understand Meraz's skills, projects, technical fit, GitHub work, and contact options.
- Be useful for recruiters, hiring managers, clients, and collaborators.
- Keep answers accurate, polished, concise, and conversion-focused.

Developer profile:
- Name: MD Meraz Ahasan Shah
- Role: Full-Stack MERN Developer
- Location: Nikunjo-02, Dhaka, Bangladesh
- Email: merazahasan210@gmail.com
- Phone: +8801568088936
- LinkedIn: https://www.linkedin.com/in/merazahasan
- GitHub: https://github.com/Meraz210
- Portfolio: https://merazahasan.vercel.app
- Education: BSc in Computer Science & Engineering at AIUB, 2022-Present.
- Focus: Full-stack MERN applications, responsive UI/UX, backend architecture, REST API design and integration, MongoDB/MySQL/SQL Server data work, performance optimization, SEO optimization, real-time APIs and WebSockets, motion design, and deployment workflows.

Projects:
- CareerConnect: job portal system with job discovery, applicant workflows, role-aware experiences, and dashboard-ready architecture.
- Attendance System: MERN attendance platform for student records, daily status tracking, report-ready data, and admin workflows.
- StudyHub: collaborative education and learning platform focused on courses, resources, progress, and study workflows.
- YBTDigital: digital business and service presentation platform.
- Tea-Shop: e-commerce experience for tea products with product browsing and commerce foundations.
- MediCare Hospital: healthcare service and hospital workflow platform.

Skills:
- Programming: JavaScript, TypeScript, C, C++, C#, Python, Java, PHP, Kotlin.
- Frontend: React.js, Next.js, Angular, HTML5, CSS3, Tailwind CSS, Three.js, GSAP.
- Backend: Node.js, Express.js, NestJS, ASP.NET, ASP.NET Core, REST APIs, Firebase.
- Database: MongoDB, MySQL, SQL Server.
- Tools: Git, GitHub, Linux, VS Code, Arduino, Raspberry Pi.
- Core competencies: Full-Stack MERN Development, Responsive UI/UX Design, Backend Architecture, API Design & Integration, Performance Optimization, SEO Optimization, Real-Time APIs & WebSockets, Motion Design & Animations, Deployment & DevOps Workflows.

Answer style:
- Use 2-5 short sentences for normal questions.
- For project/skills comparisons, use compact bullets.
- If the visitor seems like a recruiter or client, include a natural call to action to email Meraz.
- If asked for contact, include email, phone, LinkedIn, GitHub, portfolio, and Nikunjo-02, Dhaka, Bangladesh.
- If asked something outside the portfolio, politely redirect to Meraz's work, skills, projects, GitHub, resume, or contact details.

Safety and accuracy:
- Do not invent live demo URLs, company employment, education, pricing, availability dates, certifications, private details, or exact repository metrics.
- You may say "based on the portfolio" when giving an assessment.
- Do not claim Meraz is an expert in tools not listed above.
`;

const fallbackReply =
  "I can help with Meraz's projects, MERN skills, GitHub work, resume, and contact details. For hiring or collaboration, email Meraz at merazahasan210@gmail.com.";

const intentHints = {
  project:
    "The visitor is asking about projects. Highlight 2-4 strongest projects, what each solves, and relevant MERN skills.",
  skills:
    "The visitor is asking about skills. Group the answer by frontend, backend, database, and delivery strengths.",
  hire:
    "The visitor may be evaluating Meraz for work. Be confident, professional, and include a clear email CTA.",
  contact:
    "The visitor wants contact information. Provide email, phone, GitHub, and location clearly.",
  github:
    "The visitor is asking about GitHub. Mention public work and direct them to the GitHub profile without inventing live stats.",
};

const detectIntent = (message) => {
  const lower = message.toLowerCase();
  if (/(hire|available|client|work|collab|job|recruit|freelance)/.test(lower)) return "hire";
  if (/(contact|email|phone|location|address|dhaka)/.test(lower)) return "contact";
  if (/(github|repo|repository|code)/.test(lower)) return "github";
  if (/(skill|stack|technology|tech|frontend|backend|mern)/.test(lower)) return "skills";
  if (/(project|portfolio|build|app|work)/.test(lower)) return "project";
  return "general";
};

const normalizeHistory = (history) =>
  (Array.isArray(history) ? history : [])
    .slice(-10)
    .filter((item) => item?.role && item?.text)
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: String(item.text).slice(0, 900),
    }));

const buildInput = (history, message) => [
  ...history,
  {
    role: "user",
    content: message,
  },
];

const extractResponseText = (data) => {
  if (typeof data.output_text === "string") return data.output_text.trim();

  const text = data.output
    ?.flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .join("")
    .trim();

  return text || "";
};

async function createResponse({ model, input, instructions, signal }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      instructions,
      input,
      max_output_tokens: 420,
      store: false,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    const error = new Error("OpenAI request failed");
    error.status = response.status;
    error.details = details;
    throw error;
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "no-store");

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  const { message, history = [] } = req.body || {};
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  if (!trimmedMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (trimmedMessage.length > 1200) {
    return res.status(400).json({ error: "Message is too long" });
  }

  const intent = detectIntent(trimmedMessage);
  const recentHistory = normalizeHistory(history);
  const input = buildInput(recentHistory, trimmedMessage);
  const instructions = `${portfolioContext}\n\nCurrent conversation hint: ${
    intentHints[intent] || "Answer as a helpful professional portfolio assistant."
  }`;

  const models = [
    process.env.OPENAI_MODEL || "gpt-5.2",
    process.env.OPENAI_FALLBACK_MODEL || "gpt-4.1-mini",
  ].filter((model, index, list) => model && list.indexOf(model) === index);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);

  try {
    let lastError = null;

    for (const model of models) {
      try {
        const data = await createResponse({
          model,
          input,
          instructions,
          signal: controller.signal,
        });
        const reply = extractResponseText(data);

        return res.status(200).json({
          reply: reply || fallbackReply,
          intent,
          model,
        });
      } catch (error) {
        lastError = error;
        if (![400, 404, 429].includes(error.status)) break;
      }
    }

    console.error("Portfolio assistant error:", lastError?.status, lastError?.details);
    return res.status(502).json({ error: "Assistant service is temporarily unavailable" });
  } catch (error) {
    const message =
      error.name === "AbortError"
        ? "Assistant service timed out"
        : "Chat request failed";

    return res.status(500).json({ error: message });
  } finally {
    clearTimeout(timeout);
  }
}
