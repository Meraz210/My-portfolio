import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-20 border-t border-cyan-500/15 bg-black px-6 md:px-10 lg:px-16 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-10 md:grid-cols-3 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-3 text-lg md:text-xl font-black text-cyan-400">Meraz Ahasan</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Full-stack developer crafting premium digital experiences with React, Node.js, Three.js, and thoughtful design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-base md:text-lg font-black text-cyan-400">Navigation</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <a href="#home" className="text-sm md:text-base transition hover:text-cyan-300 hover:translate-x-1 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm md:text-base transition hover:text-cyan-300 hover:translate-x-1 inline-block">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm md:text-base transition hover:text-cyan-300 hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
              <li>
                <a href="/resume.pdf" download className="text-sm md:text-base transition hover:text-cyan-300 hover:translate-x-1 inline-block">
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-base md:text-lg font-black text-cyan-400">Connect</h4>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <a
                href="https://github.com/Meraz210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base transition hover:text-cyan-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/meraz210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base transition hover:text-cyan-300"
              >
                LinkedIn
              </a>
              <a href="mailto:merazahasan210@gmail.com" className="text-sm md:text-base transition hover:text-cyan-300">
                Email
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-cyan-500/10 pt-12 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            © {currentYear} Meraz Ahasan. Crafted with React, Three.js, and GSAP.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
