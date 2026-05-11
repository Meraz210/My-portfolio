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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="w-[90vw] max-w-lg overflow-hidden rounded-2xl border border-cyan-400/40 bg-gradient-to-b from-black/90 to-black/95 shadow-2xl shadow-cyan-500/30 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="relative border-b border-cyan-400/20 bg-gradient-to-r from-cyan-400/15 to-purple-400/10 px-5 py-5">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl" />
              </div>
              <div className="relative">
                <p className="text-base font-bold uppercase tracking-[0.2em] text-cyan-200">
                  AI Assistant
                </p>
                <p className="mt-1 text-xs text-cyan-300/70">
                  Ask me about projects, skills, GitHub, or contact
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={listRef} className="max-h-96 space-y-4 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-2 ${
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "assistant"
                        ? "border border-cyan-400/25 bg-cyan-400/10 text-cyan-50"
                        : "bg-gradient-to-r from-cyan-400 to-cyan-500 font-medium text-black shadow-lg shadow-cyan-500/20"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-3">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="border-t border-cyan-400/20 bg-black/50 px-5 py-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-300/60">
                Quick Prompts
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt) => (
                  <motion.button
                    key={prompt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={(event) => sendMessage(event, prompt)}
                    disabled={loading}
                    className="rounded-lg border border-cyan-400/40 bg-cyan-400/15 px-3 py-2 text-xs font-bold text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/25 hover:text-cyan-100 disabled:opacity-50"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="flex gap-2 border-t border-cyan-400/20 bg-black/50 p-4">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything..."
                disabled={loading}
                className="min-w-0 flex-1 rounded-lg border border-cyan-400/30 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-cyan-300 focus:bg-white/10 disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 px-5 py-2.5 font-black text-black shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open AI portfolio assistant"
        className="group relative h-16 w-16 rounded-full border-2 border-cyan-300/60 bg-gradient-to-br from-cyan-400 to-cyan-500 font-black text-black shadow-2xl shadow-cyan-500/60 transition hover:border-cyan-200 hover:shadow-cyan-400/80 sm:h-14 sm:w-14"
      >
        <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-cyan-300/20" />
        <span className="absolute inset-0 -z-10 rounded-full border border-cyan-300/30 animate-ping opacity-75" />
        <span className="flex h-full w-full items-center justify-center text-lg sm:text-base">
          {open ? "✕" : "✨"}
        </span>
      </motion.button>
    </div>
  );
}
