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
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { lazy, Suspense, useEffect, useState } from "react";
import GitHubStats from "./components/GitHubStats";
import PortfolioChatbot from "./components/PortfolioChatbot";
import profileImage from "./assets/pf.png";

const HeroScene3D = lazy(() => import("./components/HeroScene3D"));
const cvUrl = `${import.meta.env.BASE_URL}MD_MERAZ_AHASAN_SHAH_CV.pdf`;

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
    title: "CareerConnect",
    type: "Job Portal System",
    text: "Role-based job portal with seeker, employer, and admin workflows, JWT authentication, application tracking, and dashboard-ready architecture.",
    icon: BriefcaseBusiness,
    tech: ["MERN", "JWT", "Role Access"],
    live: "https://job-portal-system-neon.vercel.app",
    source: "https://github.com/Meraz210/job-portal-system",
    caseStudy: "#careerconnect",
    hot: true,
  },
  {
    title: "StudyHub",
    type: "Learning Product",
    text: "Collaborative education platform for study goals, course resources, progress tracking, and responsive student workflows.",
    icon: Globe2,
    tech: ["React", "API", "Tailwind"],
    source: "https://github.com/Meraz210/StudyHub",
    caseStudy: "#projects",
  },
  {
    title: "Attendance System",
    type: "Education Operations",
    text: "Role-based attendance platform for student records, daily status tracking, report-ready data, and admin workflows.",
    icon: GraduationCap,
    tech: ["React", "Node.js", "MongoDB"],
    source: "https://github.com/Meraz210/Attendance-system",
    caseStudy: "#projects",
  },
  {
    title: "YBTDigital",
    type: "Business Platform",
    text: "Digital service presentation website focused on clear brand messaging, service discovery, responsive UI, and conversion flow.",
    icon: Rocket,
    tech: ["React", "UI/UX", "SEO"],
    source: "https://github.com/Meraz210/YBTDigital",
    caseStudy: "#projects",
  },
  {
    title: "Tea-Shop",
    type: "E-Commerce Experience",
    text: "Product browsing and commerce-focused interface with clean catalog presentation, responsive layouts, and checkout-ready flows.",
    icon: ShieldCheck,
    tech: ["React", "Commerce", "CSS3"],
    source: "https://github.com/Meraz210/Tea-Shop",
    caseStudy: "#projects",
  },
  {
    title: "MediCare Hospital",
    type: "Healthcare Dashboard",
    text: "Hospital service interface for appointment handling, doctor context, patient workflows, and organized admin views.",
    icon: Server,
    tech: ["React", "Node.js", "UI"],
    source: "https://github.com/Meraz210/MediCare-Hospital",
    caseStudy: "#projects",
  },
];

const developerMetrics = [
  ["6+", "Projects Completed"],
  ["15+", "REST APIs Built"],
  ["3", "User Roles Implemented"],
  ["JWT", "Authentication"],
  ["DB", "MongoDB & SQL Experience"],
  ["UI", "Responsive UI Systems"],
];

const heroHighlights = ["Internship-ready", "Junior MERN roles", "Remote collaboration"];

const skillGroups = [
  ["Programming", ["JavaScript", "TypeScript", "C", "C++", "C#", "Python", "Java", "PHP", "Kotlin"]],
  ["Frontend", ["React.js", "Next.js", "Angular", "HTML5", "CSS3", "Tailwind CSS", "Three.js", "GSAP"]],
  ["Backend", ["Node.js", "Express.js", "NestJS", "ASP.NET", "ASP.NET Core", "REST APIs", "Firebase"]],
  ["Database", ["MongoDB", "MySQL", "SQL Server"]],
  ["Tools", ["Git", "GitHub", "Linux", "VS Code", "Arduino", "Raspberry Pi"]],
];

const coreCompetencies = [
  "Full-Stack MERN Development",
  "Responsive UI/UX Design",
  "Backend Architecture",
  "API Design & Integration",
  "Performance Optimization",
  "SEO Optimization",
  "Real-Time APIs & WebSockets",
  "Motion Design & Animations",
  "Deployment & DevOps Workflows",
];

const aboutPoints = [
  "Full-Stack MERN Developer",
  "BSc CSE Student at AIUB",
  "REST API & Backend Architecture",
  "Responsive UI/UX Implementation",
  "Performance & SEO Optimization",
  "Motion Design & Animations",
];

const deliverySignals = ["JWT Authentication", "Role-Based Access", "REST API Design", "Responsive UI Systems"];

const journey = [
  {
    year: "2022",
    title: "Started CSE at AIUB",
    text: "Began formal computer science study and built fundamentals in programming, software engineering, databases, and systems thinking.",
  },
  {
    year: "2023",
    title: "Built first full-stack projects",
    text: "Moved from frontend practice into practical full-stack workflows with CRUD features, authentication basics, and database-backed interfaces.",
  },
  {
    year: "2024",
    title: "Focused on MERN stack and backend APIs",
    text: "Strengthened React, Node.js, Express, MongoDB, REST API design, dashboard layouts, and deployment preparation.",
  },
  {
    year: "2025",
    title: "Built CareerConnect Job Portal System",
    text: "Created a role-based hiring platform with seeker, employer, and admin flows, JWT authentication, application tracking, and admin management.",
  },
  {
    year: "2026",
    title: "Built premium portfolio and production-ready apps",
    text: "Upgraded project presentation, refined UI systems, improved recruiter-facing storytelling, and prepared apps for internship and junior developer opportunities.",
  },
];

const availableFor = ["Internship Opportunities", "Junior Developer Roles", "Freelance Projects", "Collaboration"];

const careerConnectDetails = {
  problem: "Job seekers, employers, and admins need separate workflows, but many beginner job portal builds stop at simple listings without real role control or application tracking.",
  solution: "CareerConnect organizes the hiring flow into seeker, employer, and admin dashboards with protected routes, JWT authentication, role-based access, job management, and application status tracking.",
  tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs", "Tailwind CSS"],
  features: [
    "Seeker, employer, and admin dashboards",
    "JWT authentication with role-based access",
    "Job posting and job discovery workflows",
    "Application tracking for submitted jobs",
    "Admin management for platform oversight",
    "Responsive recruiter-friendly UI",
  ],
  screenshots: [
    { title: "Login page", meta: "JWT sign-in, validation, role routing", icon: LockKeyhole },
    { title: "Jobs page", meta: "Searchable listings and job detail flow", icon: BriefcaseBusiness },
    { title: "Seeker dashboard", meta: "Applications, saved jobs, profile state", icon: Users },
    { title: "Employer dashboard", meta: "Post jobs and review applicants", icon: LayoutDashboard },
    { title: "Admin dashboard", meta: "Users, jobs, and platform management", icon: ShieldCheck },
  ],
  impact: ["Complete MERN hiring workflow", "Reusable protected-route architecture", "Clear internship-ready flagship project"],
};

const fadeUp = {
  initial: false,
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
          MD Meraz Ahasan Shah
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
      <img src={profileImage} alt="MD Meraz Ahasan Shah" className="h-44 w-full rounded-lg object-cover" />
      <h3 className="mt-5 text-xl font-black uppercase text-white">MD Meraz Ahasan Shah</h3>
      <p className="mt-1 text-sm text-slate-400">Full-Stack MERN Developer</p>
      <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
        Open to projects and roles
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["Focus", "MERN Apps"],
          ["Study", "CSE at AIUB"],
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
        {["React.js", "Node.js", "MongoDB", "Express.js", "Next.js"].map((item) => (
          <span key={item} className="rounded-md border border-slate-700 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-slate-300">{item}</span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {[
          [Mail, "mailto:merazahasan210@gmail.com"],
          [GitBranch, "https://github.com/Meraz210"],
          [FaLinkedinIn, "https://www.linkedin.com/in/merazahasan"],
          [Phone, "tel:+8801568088936"],
        ].map(([Icon, href]) => (
          <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="grid h-10 place-items-center rounded-md border border-slate-700 bg-white/[0.03] text-slate-200 hover:border-cyan-300 hover:text-cyan-200">
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <a href={cvUrl} target="_blank" rel="noreferrer" download className="mt-3 flex items-center justify-center gap-2 rounded-md border border-cyan-300/30 px-4 py-2.5 text-xs font-bold text-white hover:bg-cyan-400 hover:text-slate-950">
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
          MD Meraz Ahasan <span className="text-cyan-300">Shah</span>
        </motion.h1>
        <motion.p variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-6 max-w-md text-base leading-7 text-slate-300">
          Full-stack MERN developer and CSE student at AIUB building responsive web applications, scalable REST APIs, database-driven systems, and polished interfaces with performance, SEO, and animation in mind.
        </motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="hero-trust-row">
          {heroHighlights.map((item) => (
            <span key={item}><CheckCircle2 className="h-3.5 w-3.5" /> {item}</span>
          ))}
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#projects" className="primary-btn">Explore My Work <ArrowRight className="h-4 w-4" /></a>
          <a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" className="secondary-btn">View on GitHub <GitBranch className="h-4 w-4" /></a>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
          {developerMetrics.slice(0, 6).map(([value, label]) => (
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
    <section id="projects" className="section-shell border-t border-slate-900/90 py-12">
      <SectionTitle
        eyebrow="Featured Work"
        title="Selected Projects"
        right={<a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" className="hidden rounded-md border border-slate-700 px-5 py-3 text-xs font-bold text-slate-100 hover:border-cyan-300 md:inline-flex">View All Projects <ArrowRight className="ml-2 h-3.5 w-3.5" /></a>}
      >
        Product-style builds across job portals, education, attendance, business platforms, commerce, and healthcare workflows.
      </SectionTitle>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.title}
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
              <div className="project-actions">
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noreferrer" className="project-action-primary">Live Demo <ExternalLink className="h-3 w-3" /></a>
                ) : (
                  <button type="button" disabled>Coming Soon</button>
                )}
                <a href={project.source} target="_blank" rel="noreferrer">Source Code <GitBranch className="h-3 w-3" /></a>
                <a href={project.caseStudy}>Case Study <ArrowRight className="h-3 w-3" /></a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedProject() {
  return (
    <section id="careerconnect" className="section-shell py-12">
      <SectionTitle eyebrow="Flagship Case Study" title="CareerConnect - Job Portal System">
        A recruiter-ready MERN project showing authentication, role-based workflows, dashboards, and practical hiring platform logic.
      </SectionTitle>
      <motion.div {...fadeUp} className="featured-project">
        <div className="featured-copy">
          <div className="case-grid">
            <article>
              <p>Problem</p>
              <h3>Multi-role hiring flows need more than job cards</h3>
              <span>{careerConnectDetails.problem}</span>
            </article>
            <article>
              <p>Solution</p>
              <h3>Role-aware MERN platform architecture</h3>
              <span>{careerConnectDetails.solution}</span>
            </article>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="case-panel">
              <h3>Tech Stack</h3>
              <div className="case-tags">
                {careerConnectDetails.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="case-panel">
              <h3>User Roles</h3>
              <div className="case-tags">
                {["Seeker", "Employer", "Admin"].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>

          <div className="case-panel mt-6">
            <h3>Key Features</h3>
            <div className="feature-list">
              {careerConnectDetails.features.map((item) => (
                <p key={item}><CheckCircle2 className="h-4 w-4" /> {item}</p>
              ))}
            </div>
          </div>

          <div className="case-panel mt-6">
            <h3>Results / Impact</h3>
            <div className="impact-grid">
              {careerConnectDetails.impact.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>

        <div className="screenshot-panel">
          <div className="screenshot-head">
            <p className="eyebrow">Screenshots</p>
            <a href="https://github.com/Meraz210/job-portal-system" target="_blank" rel="noreferrer">View Source <GitBranch className="h-3.5 w-3.5" /></a>
          </div>
          <div className="screenshot-grid">
            {careerConnectDetails.screenshots.map((item, index) => {
              const Icon = item.icon;
              return (
              <div key={item.title} className="screenshot-placeholder">
                <span>0{index + 1}</span>
                <div className="screenshot-preview">
                  <div className="screenshot-sidebar" />
                  <div className="screenshot-content">
                    <i />
                    <i />
                    <i />
                  </div>
                  <Icon className="screenshot-icon h-5 w-5" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </div>
              );
            })}
          </div>
        </div>
      </motion.div>
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
        <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Developer, CSE Student & Product Builder</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          I am MD Meraz Ahasan Shah, a Full-Stack MERN Developer pursuing BSc in CSE at AIUB. I build modern web applications that combine responsive UI/UX, structured backend architecture, REST API integration, database modeling, and performance-focused delivery.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
          My work spans education platforms, attendance systems, job portals, e-commerce experiences, business websites, and healthcare interfaces, with a focus on clean implementation and recruiter-ready project presentation.
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
      <SectionTitle eyebrow="Technical Stack" title="Skills & Capabilities">
        A broad engineering toolkit across programming, frontend, backend, databases, and developer tools.
      </SectionTitle>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {skillGroups.map(([title, items], index) => (
          <motion.article key={title} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.06 }} className="skill-card">
            <h3>{title}</h3>
            <div className="skill-tags mt-5">
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <motion.div {...fadeUp} className="wide-card">
          <div className="big-icon"><Code2 className="h-8 w-8" /></div>
          <div>
            <h3>Full-Stack MERN Specialist</h3>
            <p>End-to-end application development using MongoDB, Express.js, React.js, and Node.js, with clean API contracts and user-focused interfaces.</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="wide-card">
          <div className="big-icon violet"><Rocket className="h-8 w-8" /></div>
          <div>
            <h3>Production-Ready Output</h3>
            <p>Responsive layouts, performance optimization, SEO-aware implementation, animation details, and maintainable delivery workflows.</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="wide-card lg:col-span-2">
          <div className="big-icon emerald"><BriefcaseBusiness className="h-8 w-8" /></div>
          <div>
            <h3>Professional Workflow</h3>
            <p>Git-based development, deployment preparation, database-aware implementation, and practical project presentation for recruiters and clients.</p>
          </div>
        </motion.div>
      </div>
      <motion.div {...fadeUp} className="competency-panel mt-6">
        <h3>Core Competencies</h3>
        <div>
          {coreCompetencies.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </motion.div>
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
        <SectionTitle eyebrow="Education" title="Academic Journey" />
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
    <section id="contact" className="section-shell relative py-12">
      <motion.div {...fadeUp} className="contact-card">
        <div>
          <p className="eyebrow">Let's Work Together</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Let's collaborate</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Have a project, role, or collaboration in mind? Send a short brief and I will follow up with the best next step.
          </p>
          <div className="available-card mt-6">
            <h3>Available For</h3>
            <div>
              {availableFor.map((item) => (
                <span key={item}><CheckCircle2 className="h-3.5 w-3.5" /> {item}</span>
              ))}
            </div>
          </div>
          <div className="mt-8 space-y-4 text-sm font-semibold text-slate-300">
            <a href="mailto:merazahasan210@gmail.com" className="flex items-center gap-3"><Mail className="h-4 w-4 text-cyan-300" /> merazahasan210@gmail.com</a>
            <a href="tel:+8801568088936" className="flex items-center gap-3"><Phone className="h-4 w-4 text-cyan-300" /> +8801568088936</a>
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-cyan-300" /> Nikunjo-02, Dhaka, Bangladesh</p>
            <a href="https://www.linkedin.com/in/merazahasan" target="_blank" rel="noreferrer" className="flex items-center gap-3"><FaLinkedinIn className="h-4 w-4 text-cyan-300" /> linkedin.com/in/merazahasan</a>
            <a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" className="flex items-center gap-3"><GitBranch className="h-4 w-4 text-cyan-300" /> github.com/Meraz210</a>
          </div>
        </div>
        <form
          className="contact-form grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            window.location.href = `mailto:merazahasan210@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${data.get("name")}`)}&body=${encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`)}`;
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span>Your Name</span>
              <input required name="name" placeholder="Meraz Ahasan" />
            </label>
            <label>
              <span>Your Email</span>
              <input required name="email" type="email" placeholder="you@example.com" />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea required name="message" rows="6" placeholder="Tell me about the role, internship, project, or collaboration..." />
          </label>
          <button type="submit" className="primary-btn w-full justify-center">Send Message <Send className="h-4 w-4" /></button>
          <p className="text-center text-xs font-semibold text-slate-500">Opens your email app with a prepared message. No backend required.</p>
        </form>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="section-shell pb-8 pt-8">
      <div className="footer-panel grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h3 className="font-black text-cyan-300">MD Meraz Ahasan Shah</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Full-stack MERN developer crafting modern web applications with responsive UI, reliable APIs, database-driven features, and thoughtful user flows.</p>
          <a href={cvUrl} target="_blank" rel="noreferrer" download className="mt-5 inline-flex items-center gap-2 rounded-md border border-cyan-300/30 px-4 py-2 text-xs font-black text-slate-100 hover:bg-cyan-400 hover:text-slate-950">
            <Download className="h-3.5 w-3.5" /> Download CV
          </a>
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
              [FaLinkedinIn, "https://www.linkedin.com/in/merazahasan"],
              [Mail, "mailto:merazahasan210@gmail.com"],
            ].map(([Icon, href]) => (
              <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-slate-800 bg-white/[0.03] text-slate-300 hover:border-cyan-300 hover:text-cyan-200">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-600">&copy; 2026 MD Meraz Ahasan Shah. All rights reserved.</p>
      <a href="#home" className="back-to-top fixed bottom-6 right-24 grid h-10 w-10 place-items-center rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_26px_rgba(34,211,238,0.45)]">
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
        <FeaturedProject />
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
