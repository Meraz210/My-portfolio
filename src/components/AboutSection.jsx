import { motion } from "framer-motion";
import profileImage from "../assets/pf.png";

const expertise = [
  "Full-stack MERN development",
  "Interactive 3D web experiences",
  "Responsive UI/UX design",
  "Performance & SEO optimization",
  "Real-time APIs & WebSockets",
  "Component-driven architecture",
  "Motion design & animations",
  "Deployment & DevOps workflows"
];

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-20 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sky-300">About Me</p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Developer with a practical product mindset.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
          {/* PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-sm">
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-2 shadow-xl shadow-black/15">
                <img
                  src={profileImage}
                  alt="Meraz Ahasan"
                  className="aspect-square w-full rounded-xl object-cover brightness-95 transition duration-500 hover:brightness-105"
                />
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-gray-300 first-letter:font-bold">
                I'm a <span className="font-bold text-sky-300">MERN stack developer</span> passionate about building production-quality web applications with thoughtful design, reliable backends, and clear user experiences.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-300">
                My expertise spans React, Node.js, MongoDB, Tailwind CSS, Firebase, and animation libraries. I specialize in responsive design, performance-focused interfaces, and maintainable app structure.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-black text-white mb-6 tracking-tight">Core Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {expertise.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <span className="h-2 w-2 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-xl border border-slate-800 bg-slate-950/55 p-5"
            >
              <p className="text-sm text-gray-400 leading-relaxed">
                Currently available for freelance projects, full-time roles, and collaborative opportunities with innovative teams.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
