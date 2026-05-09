import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

const starterMessages = [
  {
    role: "assistant",
    text: "Hi, I am Meraz's AI portfolio assistant. Ask me about projects, skills, technologies, GitHub, or contact details.",
  },
];

const quickPrompts = ["Projects", "Skills", "GitHub", "Contact"];

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const localReplies = useMemo(
    () => ({
      project:
        "Meraz has built Attendance System, LifeDrop, StudyHub, Tea-Shop, YBTDigital, and MediCare Hospital. His projects focus on MERN apps, healthcare flows, education tools, e-commerce, and polished UI systems.",
      skills:
        "Meraz works with React, Next.js, Node.js, Express.js, MongoDB, Firebase, Tailwind CSS, Three.js, Framer Motion, GSAP, Git, GitHub, and REST APIs.",
      technologies:
        "This portfolio uses React, Tailwind CSS, Three.js, Framer Motion, GSAP, tsParticles, GitHub API data, and an optional OpenAI API chatbot endpoint.",
      github:
        "Meraz's GitHub profile is https://github.com/Meraz210. The GitHub section pulls live profile and repository data through the GitHub API.",
      contact: "You can contact Meraz at merazahasan210@gmail.com. The contact section also includes a project request form and resume download.",
    }),
    []
  );

  const getLocalReply = (question) => {
    const lower = question.toLowerCase();
    const match = Object.entries(localReplies).find(([key]) => lower.includes(key));

    return (
      match?.[1] ||
      "Meraz Ahasan is a MERN Stack Developer who builds full-stack apps, dashboards, healthcare and education platforms, and interactive 3D web experiences."
    );
  };

  const askAssistant = async (question) => {
    const apiUrl = import.meta.env.VITE_CHAT_API_URL || "/api/chat";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: messages.slice(-8),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat endpoint unavailable");
      }

      const data = await response.json();
      return data.reply || getLocalReply(question);
    } catch {
      return getLocalReply(question);
    }
  };

  const scrollToBottom = () => {
    window.requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  };

  const sendMessage = async (event, prompt) => {
    event?.preventDefault();
    const question = (prompt || input).trim();
    if (!question || loading) return;

    setInput("");
    setLoading(true);
    setMessages((items) => [...items, { role: "user", text: question }]);
    scrollToBottom();

    const answer = await askAssistant(question);

    setMessages((items) => [...items, { role: "assistant", text: answer }]);
    setLoading(false);
    scrollToBottom();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-md overflow-hidden rounded-lg border border-cyan-400/30 bg-black/80 shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl"
          >
            <div className="relative overflow-hidden border-b border-white/10 bg-cyan-400/10 px-4 py-4">
              <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-cyan-300/20 blur-xl" />
              <p className="relative text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">
                AI Portfolio Assistant
              </p>
              <p className="relative mt-1 text-xs text-gray-400">
                Ask about projects, skills, repositories, or contact info.
              </p>
            </div>

            <div ref={listRef} className="max-h-80 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.role === "assistant"
                      ? "mr-8 border border-white/10 bg-white/10 text-gray-200"
                      : "ml-8 bg-cyan-300 font-semibold text-black"
                  }`}
                >
                  {message.text}
                </motion.div>
              ))}

              {loading && (
                <div className="mr-8 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-cyan-200">
                  Thinking...
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={(event) => sendMessage(event, prompt)}
                  className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200 transition hover:bg-cyan-300 hover:text-black"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything..."
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open AI portfolio assistant"
        className="group relative rounded-full border border-cyan-300/50 bg-cyan-300 px-5 py-4 font-black text-black shadow-[0_0_35px_rgba(34,211,238,0.55)] transition hover:bg-white"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan-300/30" />
        {open ? "Close" : "AI"}
      </button>
    </div>
  );
}
