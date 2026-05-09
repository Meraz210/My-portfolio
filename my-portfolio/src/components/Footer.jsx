import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-20 border-t border-cyan-500/20 bg-black px-5 py-12 text-white md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-cyan-400">Meraz Ahasan</h3>
            <p className="text-gray-400">Built with React, Three.js, Tailwind CSS, and GSAP.</p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-cyan-400">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#projects" className="transition hover:text-cyan-400">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-cyan-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/resume.pdf" download className="transition hover:text-cyan-400">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-cyan-400">Social</h4>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <a
                href="https://github.com/Meraz210"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-400"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/meraz210"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-cyan-400"
              >
                LinkedIn
              </a>
              <a href="mailto:merazahasan210@gmail.com" className="transition hover:text-cyan-400">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 pt-8 text-center text-gray-400">
          <p>Copyright {currentYear} Meraz Ahasan. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
