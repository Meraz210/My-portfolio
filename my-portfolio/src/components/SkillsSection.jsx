import { motion } from "framer-motion";

const skillSystems = [
  {
    label: "Interface Engineering",
    level: 92,
    summary: "High-fidelity React interfaces with motion, responsive layouts, and polished UI states.",
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    signal: "Frontend",
  },
  {
    label: "Backend Architecture",
    level: 86,
    summary: "REST APIs, authentication-ready flows, database models, and maintainable server logic.",
    stack: ["Node.js", "Express.js", "MongoDB", "Firebase"],
    signal: "Backend",
  },
  {
    label: "Immersive Web",
    level: 80,
    summary: "Interactive 3D scenes, cinematic transitions, scroll reveals, and premium visual systems.",
    stack: ["Three.js", "React Three Fiber", "GSAP", "tsParticles"],
    signal: "3D Motion",
  },
  {
    label: "Developer Workflow",
    level: 88,
    summary: "Clean Git workflow, API integration, deployment-ready builds, and scalable project structure.",
    stack: ["Git/GitHub", "Vite", "REST APIs", "npm"],
    signal: "Delivery",
  },
];

const deliverySignals = [
  "Responsive mobile-first UI",
  "Reusable component systems",
  "GitHub API integration",
  "Performance-minded animation",
  "Clean project structure",
  "Professional deployment flow",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function SkillsSection() {
  return (
    <section className="relative z-20 overflow-hidden px-5 md:px-10 py-24">
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Technical Expertise</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Skills & Capabilities
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Full-stack MERN development with specialized expertise in interactive UI, 3D web experiences, and modern tooling.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillSystems.map((system) => (
            <motion.article
              key={system.label}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 p-8 transition-all duration-500 hover:border-cyan-500/30"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl transition group-hover:bg-cyan-400/25" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

              <div className="relative flex flex-col h-full">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    {system.signal}
                  </span>
                  <span className="font-mono text-sm font-bold text-cyan-400">{system.level}%</span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-white mb-3">{system.label}</h3>
                <p className="text-sm leading-relaxed text-gray-400 mb-6">{system.summary}</p>

                <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${system.level}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg shadow-cyan-500/50"
                  />
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {system.stack.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08 }}
                      className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur transition hover:border-cyan-400/60 hover:bg-cyan-500/20"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Identity</p>
            <h3 className="text-2xl font-black text-white mb-4">Full-Stack MERN Specialist</h3>
            <p className="text-base text-gray-400">
              Expertly blend backend reliability with frontend polish. Specializing in modern React applications, Node.js APIs, MongoDB databases, and interactive 3D experiences.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">Core Strengths</p>
            <div className="grid gap-3 grid-cols-2">
              {deliverySignals.map((signal) => (
                <div key={signal} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
