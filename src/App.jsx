import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  GitBranch,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { lazy, Suspense, useEffect, useState } from "react";
import GitHubStats from "./components/GitHubStats";
import PortfolioChatbot from "./components/PortfolioChatbot";
import profileImage from "./assets/pf.png";

const HeroScene3D = lazy(() => import("./components/HeroScene3D"));

const navItems = [
  ["Home", "#home"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["GitHub", "#github"],
  ["Contact", "#contact"],
];

const projects = [
  {
    title: "Attendance System",
    type: "Education Operations",
    text: "Role-based attendance platform for student records, daily status tracking, report-ready data, and admin workflows.",
    icon: GraduationCap,
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/Meraz210/Attendance-system",
  },
  {
    title: "LifeDrop",
    type: "HealthTech Platform",
    text: "Donor and recipient matching experience with searchable requests, secure account flows, and clear contact actions.",
    icon: ShieldCheck,
    tech: ["MERN", "Auth", "Search"],
    link: "https://github.com/Meraz210/LifeDrop",
    hot: true,
  },
  {
    title: "StudyHub",
    type: "Learning Product",
    text: "Collaborative learning interface for study goals, course resources, progress visibility, and responsive student flows.",
    icon: Globe2,
    tech: ["React", "API", "Tailwind"],
    link: "https://github.com/Meraz210/StudyHub",
  },
  {
    title: "MediCare Hospital",
    type: "Healthcare Dashboard",
    text: "Hospital service interface for appointment handling, doctor context, patient workflows, and organized admin views.",
    icon: Server,
    tech: ["React", "Node.js", "UI"],
    link: "https://github.com/Meraz210",
  },
];

const skills = [
  ["Frontend Engineering", "Responsive React interfaces with reusable components, clean states, and polished interaction details.", 92],
  ["Backend APIs", "REST endpoints, Express services, validation, auth-ready patterns, and maintainable server structure.", 88],
  ["Database Modeling", "MongoDB schemas, practical relationships, query structure, and dashboard-friendly data flows.", 86],
  ["Authentication", "JWT-based access, protected routes, role-aware UI, and secure user workflow foundations.", 84],
  ["Deployment", "Production builds, environment setup, GitHub workflow, and cloud-ready delivery practices.", 80],
];

const aboutPoints = [
  "Full-Stack MERN Developer",
  "Clean & Maintainable Code",
  "Problem Solver",
  "RESTful API & Integrations",
  "Responsive & Modern UI",
  "Performance Focused",
];

const deliverySignals = ["API Architecture", "Dashboard UI", "MongoDB Modeling", "Responsive Delivery"];

const journey = [
  {
    year: "2026",
    title: "Client-ready portfolio and product polish",
    text: "Refined visual systems, project storytelling, contact flows, and deployment structure for professional review.",
  },
  {
    year: "2025",
    title: "Full-stack MERN project delivery",
    text: "Built practical apps across education, healthcare, commerce, productivity, and admin dashboard workflows.",
  },
  {
    year: "2024",
    title: "Frontend engineering foundation",
    text: "Focused on React, responsive layouts, animation, reusable UI patterns, and clean implementation habits.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      const current = navItems
        .map(([, href]) => href)
        .findLast((href) => {
          const element = document.querySelector(href);
          return element && element.getBoundingClientRect().top <= 120;
        });
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-xl border border-white/5 bg-[#050b16]/70 px-4 backdrop-blur-xl">
        <a href="#home" className="text-sm font-black uppercase tracking-[0.16em] text-white">
          Meraz Ahasan
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`nav-link ${active === href ? "nav-link-active" : ""}`}
            >
              {label}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden items-center gap-2 rounded-md bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.45)] md:inline-flex">
          Hire Me <ArrowRight className="h-3.5 w-3.5" />
        </a>

        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-9 w-9 place-items-center rounded-md border border-slate-700 text-slate-100 md:hidden">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 grid max-w-6xl gap-1 rounded-xl border border-slate-800 bg-[#050b16]/95 p-3 backdrop-blur md:hidden">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200">
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionTitle({ eyebrow, title, children, right }) {
  return (
    <motion.div {...fadeUp} className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h2>
        {children && <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{children}</p>}
      </div>
      {right}
    </motion.div>
  );
}

function ProfileCard() {
  return (
    <motion.aside {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="profile-card">
      <img src={profileImage} alt="Meraz Ahasan" className="h-44 w-full rounded-lg object-cover" />
      <h3 className="mt-5 text-xl font-black uppercase text-white">Meraz Ahasan</h3>
      <p className="mt-1 text-sm text-slate-400">Full-Stack MERN Developer</p>
      <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
        Open to projects and roles
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["Focus", "MERN Apps"],
          ["Delivery", "UI to API"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-slate-800 bg-black/20 px-3 py-2">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-1 text-xs font-black text-slate-100">{value}</p>
          </div>
        ))}
      </div>
      <div className="my-5 h-px bg-slate-800" />
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Tech Stack</p>
      <div className="flex flex-wrap gap-2">
        {["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"].map((item) => (
          <span key={item} className="rounded-md border border-slate-700 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-slate-300">{item}</span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {[
          [Mail, "mailto:merazahasan210@gmail.com"],
          [GitBranch, "https://github.com/Meraz210"],
          [FaLinkedinIn, "https://www.linkedin.com/in/meraz-ahasan/"],
          [Phone, "tel:+8801568088936"],
        ].map(([Icon, href]) => (
          <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="grid h-10 place-items-center rounded-md border border-slate-700 bg-white/[0.03] text-slate-200 hover:border-cyan-300 hover:text-cyan-200">
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <a href="/resume.pdf" download className="mt-3 flex items-center justify-center gap-2 rounded-md border border-cyan-300/30 px-4 py-2.5 text-xs font-bold text-white hover:bg-cyan-400 hover:text-slate-950">
        <Download className="h-3.5 w-3.5" /> Download CV
      </a>
    </motion.aside>
  );
}

function Hero() {
  return (
    <section id="home" className="section-shell hero-grid pt-28 md:pt-32">
      <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} className="hero-copy">
        <motion.p variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="hero-badge">Full-Stack MERN Developer</motion.p>
        <motion.h1 variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-5 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
          Building scalable <span className="text-cyan-300">full-stack</span> digital products.
        </motion.h1>
        <motion.p variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-6 max-w-md text-base leading-7 text-slate-300">
          I design and build production-ready MERN applications with clean interfaces, reliable APIs, and business-focused user flows.
        </motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#projects" className="primary-btn">Explore My Work <ArrowRight className="h-4 w-4" /></a>
          <a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" className="secondary-btn">View on GitHub <GitBranch className="h-4 w-4" /></a>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-9 grid max-w-sm grid-cols-3 gap-3">
          {[["6+", "Projects"], ["Full", "Stack"], ["2+", "Years Exp."]].map(([value, label]) => (
            <div key={label} className="stat-card">
              <p>{value}</p>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
          className="delivery-strip mt-6"
        >
          {deliverySignals.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </motion.div>
      <Suspense fallback={<div className="hero-scene-fallback hidden min-h-[440px] lg:block" />}>
        <HeroScene3D />
      </Suspense>
      <ProfileCard />
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-shell border-t border-slate-900/90 py-14">
      <SectionTitle
        eyebrow="Featured Work"
        title="Premium Projects"
        right={<a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" className="hidden rounded-md border border-slate-700 px-5 py-3 text-xs font-bold text-slate-100 hover:border-cyan-300 md:inline-flex">View All Projects <ArrowRight className="ml-2 h-3.5 w-3.5" /></a>}
      >
        Selected product-style builds focused on practical workflows, clean dashboards, responsive UI, and maintainable MERN architecture.
      </SectionTitle>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              {...fadeUp}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="project-card"
            >
              <div className={`icon-box ${project.hot ? "hot" : ""}`}><Icon className="h-5 w-5" /></div>
              <h3>{project.title}</h3>
              <p className="type">{project.type}</p>
              <p className="desc">{project.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <div className="mt-5 border-t border-slate-800 pt-4 text-xs font-bold text-cyan-300">View Case Study <ExternalLink className="ml-1 inline h-3 w-3" /></div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-shell grid gap-10 py-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
      <motion.div {...fadeUp} className="image-frame">
        <img src={profileImage} alt="Meraz Ahasan" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div {...fadeUp}>
        <p className="eyebrow">About Me</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Developer & Designer</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          I am Meraz Ahasan, a full-stack developer focused on building clean, scalable, and useful web applications. My work combines responsive frontend systems, API-driven backends, and careful attention to usability.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {aboutPoints.map((point) => (
            <div key={point} className="flex items-center gap-3 text-sm font-bold text-slate-200">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
              {point}
            </div>
          ))}
        </div>
        <a href="#contact" className="mt-8 inline-flex rounded-md border border-slate-700 px-5 py-3 text-xs font-bold text-white hover:border-cyan-300">More About Me <ArrowRight className="ml-2 h-3.5 w-3.5" /></a>
      </motion.div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell border-t border-slate-900/90 py-14">
      <SectionTitle eyebrow="My Expertise" title="Skills & Capabilities" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {skills.map(([title, text, value], index) => (
          <motion.article key={title} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.06 }} className="skill-card">
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="mt-7 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.8)]" />
              </div>
              <span>{value}%</span>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <motion.div {...fadeUp} className="wide-card">
          <div className="big-icon"><Code2 className="h-8 w-8" /></div>
          <div>
            <h3>Full-Stack MERN Specialist</h3>
            <p>End-to-end development using MongoDB, Express, React, and Node.js, with delivery focused on useful features and maintainable code.</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="wide-card">
          <div className="big-icon violet"><Rocket className="h-8 w-8" /></div>
          <div>
            <h3>Production-Ready Output</h3>
            <p>Structured implementation, readable components, clean API contracts, and responsive layouts prepared for real users.</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="wide-card lg:col-span-2">
          <div className="big-icon emerald"><BriefcaseBusiness className="h-8 w-8" /></div>
          <div>
            <h3>Professional Workflow</h3>
            <p>Clear communication, organized implementation, Git-based delivery, and portfolio-ready presentation for hiring managers and clients.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GitHubAndJourney() {
  return (
    <section className="section-shell grid gap-12 border-t border-slate-900/90 py-14 lg:grid-cols-[1fr_0.95fr]">
      <div id="github">
        <SectionTitle eyebrow="My Expertise" title="GitHub Activity" />
        <GitHubStats />
      </div>
      <div id="experience">
        <SectionTitle eyebrow="Experience & Learning" title="My Journey" />
        <div className="timeline">
          {journey.map((item, index) => (
            <motion.article key={item.year} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.08 }} className="timeline-item">
              <div className="timeline-dot" />
              <p>{item.year}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell relative py-10">
      <motion.div {...fadeUp} className="contact-card">
        <div>
          <p className="eyebrow">Let's Work Together</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Let's collaborate</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Have a project in mind or want to work together? Send a short brief and I will follow up with the best next step.
          </p>
          <div className="mt-8 space-y-4 text-sm font-semibold text-slate-300">
            <a href="mailto:merazahasan210@gmail.com" className="flex items-center gap-3"><Mail className="h-4 w-4 text-cyan-300" /> merazahasan210@gmail.com</a>
            <a href="tel:+8801568088936" className="flex items-center gap-3"><Phone className="h-4 w-4 text-cyan-300" /> +880 1568-088936</a>
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-cyan-300" /> Dhaka, Bangladesh</p>
          </div>
        </div>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            window.location.href = `mailto:merazahasan210@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${data.get("name")}`)}&body=${encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`)}`;
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input required name="name" placeholder="Your Name" />
            <input required name="email" type="email" placeholder="Your Email" />
          </div>
          <textarea required name="message" rows="6" placeholder="Project Details" />
          <button type="submit" className="primary-btn w-full justify-center">Send Message <Send className="h-4 w-4" /></button>
        </form>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="section-shell pb-8 pt-8">
      <div className="grid gap-10 border-t border-slate-900 pt-8 md:grid-cols-3">
        <div>
          <h3 className="font-black text-cyan-300">Meraz Ahasan</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Full-stack developer crafting modern MERN applications with clean interfaces, reliable APIs, and thoughtful user flows.</p>
        </div>
        <div>
          <h3 className="font-black text-cyan-300">Navigation</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-500">
            {navItems.map(([label, href]) => <a key={href} href={href} className="hover:text-cyan-300">{label}</a>)}
          </div>
        </div>
        <div>
          <h3 className="font-black text-cyan-300">Connect</h3>
          <div className="mt-3 flex gap-3">
            {[
              [GitBranch, "https://github.com/Meraz210"],
              [FaLinkedinIn, "https://www.linkedin.com/in/meraz-ahasan/"],
              [Mail, "mailto:merazahasan210@gmail.com"],
            ].map(([Icon, href]) => (
              <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-slate-800 bg-white/[0.03] text-slate-300 hover:border-cyan-300 hover:text-cyan-200">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-600">&copy; 2026 Meraz Ahasan. All rights reserved.</p>
      <a href="#home" className="fixed bottom-6 right-6 grid h-10 w-10 place-items-center rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_26px_rgba(34,211,238,0.45)]">
        <ArrowRight className="h-4 w-4 -rotate-90" />
      </a>
    </footer>
  );
}

export default function App() {
  return (
    <div className="portfolio-page min-h-screen overflow-x-hidden text-white">
      <div className="ambient-grid" />
      <div className="scene-3d" aria-hidden="true">
        <div className="scene-vignette" />
        <div className="scene-panel panel-one" />
        <div className="scene-panel panel-two" />
        <div className="scene-grid scene-grid-back" />
        <div className="scene-grid scene-grid-front" />
        <div className="scene-orbit orbit-a" />
        <div className="scene-orbit orbit-b" />
        <div className="scene-shape shape-cube shape-one" />
        <div className="scene-shape shape-cube shape-two" />
        <div className="scene-shape shape-cube shape-three" />
        <div className="scene-shape shape-ball shape-four" />
        <div className="scene-shape shape-ball shape-five" />
      </div>
      <div className="decor-cube decor-left" />
      <div className="decor-ball decor-right" />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <GitHubAndJourney />
        <Contact />
      </main>
      <Footer />
      <PortfolioChatbot />
    </div>
  );
}
