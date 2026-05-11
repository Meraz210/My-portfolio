import { motion } from "framer-motion";

const skillSystems = [
  {
    label: "Interface Engineering",
    level: 92,
    summary: "High-fidelity React interfaces with refined motion, responsive layouts, and polished interactive states.",
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    signal: "Frontend",
  },
  {
    label: "Backend Architecture",
    level: 86,
    summary: "Robust REST APIs, authentication flows, database design, and maintainable server logic.",
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
    summary: "Clean Git workflows, API integration, deployment-ready builds, and scalable project structure.",
    stack: ["Git/GitHub", "Vite", "REST APIs", "npm"],
    signal: "Delivery",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function SkillsSection() {
  return (
    <section className="relative z-20 overflow-hidden px-6 md:px-10 lg:px-16 py-32 md:py-40">
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/6 blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 space-y-6"
        >
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Technical Expertise</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Skills & Capabilities
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
            Full-stack MERN development with specialized expertise in interactive UI, immersive 3D experiences, and modern tooling.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillSystems.map((system) => (
            <motion.article
              key={system.label}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 p-6 md:p-7 transition-all duration-500 hover:border-cyan-500/30"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/12 blur-3xl transition opacity-0 group-hover:opacity-100 duration-500" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

              <div className="relative flex flex-col h-full space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    {system.signal}
                  </span>
                  <span className="font-mono text-sm font-bold text-cyan-400">{system.level}%</span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white mb-2">{system.label}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{system.summary}</p>
                </div>

                <div className="my-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${system.level}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg shadow-cyan-500/40"
                  />
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {system.stack.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      className="rounded-lg border border-cyan-500/20 bg-cyan-500/8 px-2.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur transition hover:border-cyan-400/60 hover:bg-cyan-500/15"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* PROFESSIONAL IDENTITY CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400 mb-3">Professional Identity</p>
            <h3 className="text-xl md:text-2xl font-black text-white mb-5">Full-Stack MERN Specialist</h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-400">
              Expertly blend backend reliability with frontend polish. Specializing in modern React applications, Node.js APIs, MongoDB databases, and immersive 3D experiences.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-purple-400 mb-3">Delivery Focus</p>
            <h3 className="text-xl md:text-2xl font-black text-white mb-5">Production-Ready Output</h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-400">
              Commitment to clean code, performance optimization, responsive design, and pixel-perfect implementation across all projects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
