/* global process */

const portfolioContext = `
You are the AI assistant for Meraz Ahasan's developer portfolio.

Developer:
- Name: Meraz Ahasan
- Role: MERN Stack Developer
- GitHub: https://github.com/Meraz210
- Email: merazahasan210@gmail.com

Projects:
- Attendance System: MERN attendance platform for students, records, reports, and admin workflows.
- LifeDrop: blood donation platform connecting donors and recipients.
- StudyHub: collaborative education and learning platform.
- Tea-Shop: e-commerce experience for tea products.
- YBTDigital: digital business and service presentation platform.
- MediCare Hospital: hospital and healthcare service platform.

Skills and technologies:
- React, Next.js, Node.js, Express.js, MongoDB, Firebase
- Tailwind CSS, Three.js, React Three Fiber, Framer Motion, GSAP
- Git, GitHub, REST APIs, responsive UI, dashboards, interactive 3D web experiences

Rules:
- Answer only about Meraz Ahasan, his portfolio, projects, skills, GitHub, resume, and contact details.
- Keep answers concise, professional, and friendly.
- If asked about hiring or collaboration, direct the user to email Meraz.
- Do not invent live demos, private details, education, work history, pricing, or availability beyond the context above.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const recentHistory = history
    .slice(-8)
    .filter((item) => item?.role && item?.text)
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: String(item.text).slice(0, 1200),
    }));

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature: 0.4,
        max_tokens: 220,
        messages: [
          { role: "system", content: portfolioContext },
          ...recentHistory,
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({
      reply: reply || "I can help with Meraz's projects, skills, GitHub, and contact information.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Chat request failed" });
  }
}
