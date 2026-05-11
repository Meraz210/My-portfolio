import { motion } from "framer-motion";
import profileImage from "../assets/profile.png";

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
      className="relative z-20 px-6 md:px-10 lg:px-16 py-32 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4 mb-20"
        >
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">About Me</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Developer & Designer
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs lg:max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-purple-500/8 to-transparent blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-black/20 p-1">
                <img
                  src={profileImage}
                  alt="Meraz Ahasan"
                  className="rounded-3xl w-full aspect-square object-cover brightness-95 hover:brightness-105 transition duration-500"
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
            className="space-y-10"
          >
            <div className="space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-gray-300 first-letter:font-bold">
                I'm a <span className="font-bold text-cyan-300">MERN stack developer</span> passionate about building production-quality web applications with thoughtful design, reliable backends, and seamless user experiences.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-300">
                My expertise spans React, Node.js, MongoDB, Three.js, Tailwind CSS, and GSAP. I specialize in responsive design, performance optimization, and creating immersive digital experiences that engage and delight users.
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
                      <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-lg shadow-cyan-500/50" />
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
              className="pt-6 border-t border-cyan-500/15"
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
