import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative z-20 border-t border-slate-800 bg-[#080b12] px-4 py-14 sm:px-6 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-10 md:grid-cols-3 lg:gap-16">
          <div>
            <h3 className="mb-3 text-lg font-black text-sky-300 md:text-xl">Meraz Ahasan</h3>
            <p className="text-sm leading-relaxed text-slate-400 md:text-base">
              Full-stack developer building practical web applications with
              React, Node.js, MongoDB, and thoughtful UI.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-base font-black text-sky-300 md:text-lg">Navigation</h4>
            <ul className="space-y-2.5 text-slate-400">
              {[
                ["Home", "#home"],
                ["Projects", "#projects"],
                ["Contact", "#contact"],
                ["Resume", "/resume.pdf"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    download={label === "Resume" ? true : undefined}
                    className="inline-block text-sm transition hover:translate-x-1 hover:text-sky-300 md:text-base"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-black text-sky-300 md:text-lg">Connect</h4>
            <div className="flex flex-wrap gap-4 text-slate-400">
              <a
                href="https://github.com/Meraz210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition hover:text-sky-300 md:text-base"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/meraz210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition hover:text-sky-300 md:text-base"
              >
                LinkedIn
              </a>
              <a
                href="mailto:merazahasan210@gmail.com"
                className="text-sm transition hover:text-sky-300 md:text-base"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-xs text-slate-500 md:text-sm">
            (c) {currentYear} Meraz Ahasan. Built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
