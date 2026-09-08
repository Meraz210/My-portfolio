import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiExpress, SiFirebase, SiMongodb, SiTailwindcss } from "react-icons/si";

const skills = [
  { label: "React", level: 92, icon: FaReact, color: "text-cyan-300" },
  { label: "Node.js", level: 86, icon: FaNodeJs, color: "text-emerald-300" },
  { label: "MongoDB", level: 84, icon: SiMongodb, color: "text-green-300" },
  { label: "Express", level: 82, icon: SiExpress, color: "text-gray-200" },
  { label: "Tailwind", level: 90, icon: SiTailwindcss, color: "text-sky-300" },
  { label: "Firebase", level: 78, icon: SiFirebase, color: "text-amber-300" },
  { label: "Git", level: 88, icon: FaGitAlt, color: "text-orange-300" },
  { label: "GitHub", level: 87, icon: FaGithub, color: "text-white" },
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
    <section className="relative z-20 overflow-hidden px-4 py-24 sm:px-6 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Technical Expertise</p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Skills & Capabilities
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Full-stack MERN development with specialized expertise in interactive UI, immersive 3D experiences, and modern tooling.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
            <motion.article
              key={skill.label}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              data-aos="fade-up"
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950/55 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-slate-950/80"
            >
              <div className="relative flex flex-col h-full space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-4xl ${skill.color}`}>
                    <Icon />
                  </span>
                  <span className="font-mono text-sm font-bold text-sky-300">{skill.level}%</span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white mb-2">{skill.label}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    Production-focused {skill.label} skills for modern MERN stack application delivery.
                  </p>
                </div>

                <div className="my-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-sky-400"
                  />
                </div>
              </div>
            </motion.article>
          );
          })}
        </motion.div>

        {/* PROFESSIONAL IDENTITY CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2"
        >
          <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-sky-300 mb-3">Professional Identity</p>
            <h3 className="text-xl md:text-2xl font-black text-white mb-5">Full-Stack MERN Specialist</h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-400">
              Blending backend reliability with frontend polish. Specializing in modern React applications, Node.js APIs, MongoDB databases, and clean user interfaces.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/55 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-sky-300 mb-3">Delivery Focus</p>
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
