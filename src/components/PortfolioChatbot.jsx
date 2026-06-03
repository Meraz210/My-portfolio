import { AnimatePresence, motion } from "framer-motion";
import { Bot, BriefcaseBusiness, Mail, MessageCircle, SendHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const starterMessages = [
  {
    role: "assistant",
    text: "Hi, I am Meraz's portfolio assistant. I can help you evaluate his MERN skills, projects, GitHub work, and contact options.",
  },
];

const quickPrompts = [
  "Why should I hire Meraz?",
  "Summarize his best projects",
  "What is his MERN stack strength?",
  "How can I contact him?",
];

const localKnowledge = [
  {
    keys: ["hire", "client", "work", "available", "job", "recruit"],
    followUp: "You can ask: Which project best proves hiring readiness?",
    reply:
      "Meraz is a strong fit for MERN product work because he can handle responsive React interfaces, Node/Express APIs, MongoDB data flows, and polished dashboard-style UI. For hiring or collaboration, email him at merazahasan210@gmail.com.",
  },
  {
    keys: ["project", "portfolio", "build", "app"],
    followUp: "You can ask: What makes CareerConnect the strongest case study?",
    reply:
      "Meraz's featured projects include CareerConnect, Attendance System, StudyHub, Tea-Shop, YBTDigital, and MediCare Hospital. CareerConnect is the flagship MERN job portal with seeker, employer, and admin roles, JWT authentication, application tracking, and dashboard workflows.",
  },
  {
    keys: ["skill", "stack", "technology", "mern", "frontend", "backend"],
    followUp: "You can ask: How does his frontend and backend experience compare?",
    reply:
      "Meraz works across the MERN stack: React and Tailwind for frontend UI, Node.js and Express for REST APIs, MongoDB/PostgreSQL experience for data modeling, JWT authentication, role-based access, GitHub workflows, Framer Motion, GSAP, Three.js, and responsive delivery practices.",
  },
  {
    keys: ["github", "repo", "repository", "code"],
    followUp: "You can ask: Which repositories should a recruiter review first?",
    reply:
      "Meraz's GitHub profile is https://github.com/Meraz210. The portfolio highlights repository activity and public project work without inventing private or unavailable details.",
  },
  {
    keys: ["contact", "email", "phone", "location", "dhaka"],
    followUp: "You can ask: Draft a short hiring email for Meraz.",
    reply:
      "You can contact Meraz at merazahasan210@gmail.com or +880 1568-088936. He is based in Dhaka, Bangladesh, and his GitHub is https://github.com/Meraz210.",
  },
];

const defaultLocalReply = {
  reply:
    "Meraz Ahasan is a Full-Stack MERN Developer based in Dhaka, Bangladesh. Ask about his projects, MERN skills, GitHub work, or contact details for a more specific answer.",
  followUp: "You can ask: Why should I hire Meraz?",
};

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready");
  const listRef = useRef(null);

  const assistantStats = useMemo(
    () => [
      ["Context", "Portfolio"],
      ["Mode", "Professional"],
      ["Focus", "Hiring"],
    ],
    []
  );

  const getLocalReply = (question) => {
    const lower = question.toLowerCase();
    const match = localKnowledge.find((item) => item.keys.some((key) => lower.includes(key)));
    const localReply = match || defaultLocalReply;

    return `${localReply.reply}\n\n${localReply.followUp}`;
  };

  const askAssistant = async (question) => {
    const apiUrl = import.meta.env.VITE_CHAT_API_URL || "/api/chat";

    try {
      setStatus("Thinking");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: messages.slice(-10),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setStatus("Limit reached");
          return `${getLocalReply(question)}\n\nLive AI is rate-limited for a moment, so I am using the local portfolio guide.`;
        }

        throw new Error("Chat endpoint unavailable");
      }
      const data = await response.json();
      setStatus(data.intent ? `Intent: ${data.intent}` : "Ready");
      return data.reply || getLocalReply(question);
    } catch {
      setStatus("Offline fallback");
      return `${getLocalReply(question)}\n\nLive AI is unavailable right now, so I am using the local portfolio guide.`;
    }
  };

  const scrollToBottom = () => {
    window.requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (event, prompt) => {
    event?.preventDefault();
    const question = (prompt || input).trim();
    if (!question || loading) return;

    setInput("");
    setLoading(true);
    setMessages((items) => [...items, { role: "user", text: question }]);

    const answer = await askAssistant(question);

    setMessages((items) => [...items, { role: "assistant", text: answer }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.24 }}
            className="assistant-panel w-[calc(100vw-2rem)] max-w-[26rem] overflow-hidden rounded-xl border border-slate-700/80 bg-[#06111d]/95 shadow-2xl shadow-black/35 backdrop-blur-2xl"
          >
            <div className="assistant-top relative overflow-hidden border-b border-slate-800/90 px-5 py-5">
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.16)]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                      AI Portfolio Assistant
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      Professional MERN portfolio guidance
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-700 bg-white/[0.03] text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
                  aria-label="Close assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-2">
                {assistantStats.map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-slate-800 bg-black/20 px-3 py-2">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                    <p className="mt-1 truncate text-xs font-black text-cyan-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 bg-black/20 px-5 py-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
                {status}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Smart context
              </span>
            </div>

            <div ref={listRef} className="max-h-[22rem] space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "assistant"
                        ? "border border-slate-700/80 bg-slate-950/60 text-slate-100"
                        : "border border-cyan-300/25 bg-cyan-400/12 font-semibold text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                    }`}
                  >
                    {message.text.split("\n").map((line, lineIndex) => (
                      <p key={`${line}-${lineIndex}`} className={lineIndex > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-700/80 bg-white/[0.045] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:300ms]" />
                      <span className="ml-1 text-xs font-semibold text-slate-400">Analyzing portfolio context</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 bg-black/20 px-5 py-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-cyan-300" />
                Suggested questions
              </div>
              <div className="grid gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={(event) => sendMessage(event, prompt)}
                    disabled={loading}
                    className="rounded-lg border border-slate-700/80 bg-white/[0.035] px-3 py-2 text-left text-xs font-bold text-slate-200 transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-cyan-100 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-800 bg-black/25 p-4">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Meraz's fit, skills, projects..."
                disabled={loading}
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.35)] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            </form>

            <div className="flex items-center justify-between border-t border-slate-900 bg-[#020617] px-5 py-3 text-[0.68rem] font-semibold text-slate-600">
              <span>Portfolio-only answers</span>
              <a href="mailto:merazahasan210@gmail.com" className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200">
                <Mail className="h-3.5 w-3.5" />
                Email Meraz
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open portfolio assistant"
        className="assistant-launcher group relative grid h-16 w-16 place-items-center rounded-xl border border-cyan-300/40 bg-[#071827] text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.24)] transition hover:border-cyan-300/70 hover:bg-[#0a2235]"
      >
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-[#020713] bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </motion.button>
    </div>
  );
}
