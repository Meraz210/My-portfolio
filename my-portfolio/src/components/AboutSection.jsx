import { motion } from "framer-motion";
import profileImage from "../assets/profile.png";

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-20 px-5 md:px-10 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">About Me</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Developer & Designer
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-1">
              <img
                src={profileImage}
                alt="Meraz"
                className="rounded-xl w-full aspect-square object-cover brightness-95"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-gray-300">
                I'm a <span className="font-bold text-cyan-300">MERN stack developer</span> focused on building production-quality web applications with clean interfaces, reliable backends, and seamless user experiences.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                My toolkit includes React, Node.js, MongoDB, Three.js, Tailwind CSS, and GSAP. I'm passionate about responsive design, performance optimization, and creating immersive web experiences that engage users.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white mb-4">Core Expertise</h3>
                <ul className="space-y-3">
                  {[
                    "Full-stack web application development",
                    "Interactive 3D web experiences",
                    "Responsive UI/UX design",
                    "Performance optimization & SEO",
                    "Real-time features & APIs",
                    "Component-driven architecture"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/20">
              <p className="text-sm text-gray-400">
                Currently available for freelance projects, internships, and full-time opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
