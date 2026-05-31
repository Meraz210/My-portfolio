import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
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
  Moon,
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { Suspense, lazy, useEffect, useState } from "react";
import GitHubStats from "./components/GitHubStats";
import PortfolioChatbot from "./components/PortfolioChatbot";
import profileImage from "./assets/profile-premium.webp";

const cvUrl = `${import.meta.env.BASE_URL}MD_MERAZ_AHASAN_SHAH_CV.pdf`;
const HeroScene3D = lazy(() => import("./components/HeroScene3D"));
const PremiumBackground3D = lazy(() => import("./components/PremiumBackground3D"));
const projectAsset = (path) => `${import.meta.env.BASE_URL}projects/${path}`;

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Education", "#education"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

const projects = [
  {
    title: "CareerConnect",
    type: "Job Portal System",
    text: "Role-based hiring platform with seeker, employer, and admin dashboards, JWT authentication, application tracking, and admin management.",
    icon: BriefcaseBusiness,
    tech: ["MERN", "JWT", "Role Access"],
    live: "https://job-portal-system-neon.vercel.app",
    source: "https://github.com/Meraz210/job-portal-system",
    caseStudy: "#careerconnect",
    featured: true,
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
    text: "Role-based attendance system for student records, daily status tracking, reports, and admin workflows.",
    icon: GraduationCap,
    tech: ["React", "Node.js", "MongoDB"],
    source: "https://github.com/Meraz210/Attendance-system",
    caseStudy: "#projects",
  },
  {
    title: "YBTDigital",
    type: "Business Website",
    text: "Responsive service presentation site focused on clear messaging, service discovery, SEO, and conversion flow.",
    icon: Rocket,
    tech: ["React", "UI/UX", "SEO"],
    source: "https://github.com/Meraz210/YBTDigital",
    caseStudy: "#projects",
  },
  {
    title: "Tea-Shop",
    type: "Commerce Interface",
    text: "E-commerce style product browsing experience with clean catalog presentation and responsive layouts.",
    icon: ShieldCheck,
    tech: ["React", "Commerce", "CSS3"],
    source: "https://github.com/Meraz210/Tea-Shop",
    caseStudy: "#projects",
  },
  {
    title: "MediCare Hospital",
    type: "Healthcare Dashboard",
    text: "Hospital service interface for appointment context, doctor information, patient workflows, and admin views.",
    icon: Server,
    tech: ["React", "Node.js", "UI"],
    source: "https://github.com/Meraz210/MediCare-Hospital",
    caseStudy: "#projects",
  },
];

const heroStats = [
  ["6+", "Projects"],
  ["15+", "APIs"],
  ["3", "Roles Built"],
  ["Open", "To Work"],
];

const availability = ["Internship Opportunities", "Junior Developer Roles", "Freelance Projects", "Collaboration"];

const aboutHighlights = [
  "MERN Stack",
  "Backend Architecture",
  "REST API Development",
  "Responsive UI",
  "Database Design",
  "Performance Optimization",
];

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    focus: "Responsive interfaces, dashboards, and product UI",
    skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    focus: "APIs, authentication, business logic, and route protection",
    skills: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT", "Firebase"],
  },
  {
    title: "Database",
    icon: Database,
    focus: "Data modeling, CRUD workflows, and relational/noSQL usage",
    skills: ["MongoDB", "MySQL", "SQL Server", "PostgreSQL"],
  },
  {
    title: "Tools",
    icon: GitBranch,
    focus: "Version control, deployment preparation, and daily workflow",
    skills: ["Git", "GitHub", "Linux", "VS Code", "Vercel"],
  },
  {
    title: "Programming",
    icon: Sparkles,
    focus: "Problem solving across web, academic, and systems work",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "PHP"],
  },
];

const skillMeta = {
  Frontend: { label: "Core", level: 92 },
  Backend: { label: "Core", level: 88 },
  Database: { label: "Production", level: 82 },
  Tools: { label: "Workflow", level: 86 },
  Programming: { label: "Familiar", level: 78 },
};

const capabilityHighlights = [
  ["Frontend Systems", "Responsive product UI, dashboards, and interaction patterns."],
  ["Backend Architecture", "REST APIs, auth flows, route protection, and business logic."],
  ["Database Design", "MongoDB and SQL-backed models for practical app workflows."],
  ["Deployment Workflow", "Git, GitHub, Vercel, environment setup, and release readiness."],
];

const coreStack = [
  "MERN Stack",
  "React + Node + MongoDB",
  "JWT Authentication",
  "REST API Development",
  "Responsive UI Systems",
];

const journey = [
  ["2022", "Started CSE at AIUB", "Built core foundations in programming, software engineering, databases, and systems thinking."],
  ["2023", "Built first full-stack projects", "Moved from UI practice into database-backed web applications and CRUD workflows."],
  ["2024", "Focused on MERN stack and backend APIs", "Strengthened React, Node.js, Express, MongoDB, REST APIs, dashboards, and deployment preparation."],
  ["2025", "Built CareerConnect Job Portal System", "Created a role-based hiring platform with seeker, employer, and admin flows, JWT auth, and application tracking."],
  ["2026", "Built premium portfolio and production-ready apps", "Refined project storytelling, UI quality, recruiter presentation, and production-readiness."],
];

const educationItems = [
  {
    period: "2022 - Present",
    title: "BSc in Computer Science and Engineering",
    place: "American International University-Bangladesh (AIUB)",
    details: "Focused on programming, databases, software engineering, web technologies, and practical full-stack project development.",
  },
  {
    period: "Ongoing",
    title: "MERN Stack Specialization",
    place: "Self-directed product engineering practice",
    details: "Building React, Node.js, Express, MongoDB, JWT auth, REST API, dashboard, and deployment-ready portfolio projects.",
  },
];

const experienceItems = [
  {
    period: "2025 - Present",
    title: "Full-Stack MERN Developer",
    place: "Project-based development",
    details: "Designed and built CareerConnect, a role-based job portal with seeker, employer, and admin dashboards, authentication, and application tracking.",
  },
  {
    period: "2024 - Present",
    title: "Frontend & Backend Project Builder",
    place: "Academic and personal projects",
    details: "Created responsive interfaces, CRUD workflows, REST APIs, database-backed features, and recruiter-ready SaaS-style UI presentations.",
  },
];

const careerConnect = {
  tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs", "Tailwind CSS"],
  features: [
    "Seeker, employer, and admin dashboards",
    "JWT authentication with role-based access",
    "Job posting and discovery workflow",
    "Application tracking and status flow",
    "Admin management for users, jobs, and platform control",
    "Responsive SaaS-style UI structure",
  ],
  roles: ["Seeker", "Employer", "Admin"],
  screenshots: [
    ["Login", "JWT sign-in and role routing", LockKeyhole],
    ["Jobs", "Search and listing experience", BriefcaseBusiness],
    ["Seeker", "Applications and profile flow", Users],
    ["Employer", "Post jobs and review applicants", LayoutDashboard],
    ["Admin", "Manage users, jobs, and platform data", ShieldCheck],
  ],
};

const careerConnectPanels = [
  ["Admin Dashboard", "Users, jobs, applications, and platform control.", "Admin", projectAsset("careerconnect/careerconnect-admin.jpg")],
  ["Seeker Dashboard", "Job discovery, applications, and profile workflow.", "Seeker", projectAsset("careerconnect/careerconnect-seeker.jpg")],
  ["Employer Dashboard", "Post jobs, review applicants, and hiring controls.", "Employer", projectAsset("careerconnect/careerconnect-employer.jpg")],
  ["Jobs Page", "Search, filter, and apply to open roles.", "Jobs", projectAsset("careerconnect/careerconnect-seeker.jpg")],
  ["Login", "JWT sign-in and role-aware routing.", "Auth", projectAsset("careerconnect/careerconnect-admin.jpg")],
];

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: "easeOut" },
};

function Navbar({ theme, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const isDay = theme === "day";

  useEffect(() => {
    const onScroll = () => {
      const current = navItems
        .map(([, href]) => href)
        .findLast((href) => {
          const element = document.querySelector(href);
          return element && element.getBoundingClientRect().top <= 128;
        });
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="saas-nav-wrap">
      <nav className="saas-nav">
        <a href="#home" className="saas-brand"><span>MS</span> MD Meraz Ahasan Shah</a>
        <div className="saas-nav-links">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className={active === href ? "is-active" : ""}>{label}</a>
          ))}
        </div>
        <div className="saas-nav-actions">
          <button
            type="button"
            className="saas-theme-toggle"
            onClick={onThemeToggle}
            aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
            title={isDay ? "Night mode" : "Day mode"}
          >
            {isDay ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <a href={cvUrl} target="_blank" rel="noreferrer" download className="saas-nav-cta"><Download className="h-4 w-4" /> Download CV</a>
        </div>
        <button type="button" className="saas-menu-btn" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      {open && (
        <div className="saas-mobile-menu">
          <button type="button" className="saas-theme-toggle saas-theme-toggle-mobile" onClick={onThemeToggle}>
            {isDay ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span>{isDay ? "Switch to night mode" : "Switch to day mode"}</span>
          </button>
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <motion.div {...fadeUp} className="saas-section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {children && <span>{children}</span>}
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="saas-section saas-hero">
      <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="saas-hero-copy">
        <motion.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="saas-pill">Full-Stack MERN Developer</motion.p>
        <motion.h1 variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>MD Meraz Ahasan Shah</motion.h1>
        <motion.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="saas-hero-subtitle">
          I build scalable web applications, REST APIs, dashboards, and digital products with React, Node.js, Express, MongoDB, and clean product-focused UI.
        </motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="saas-hero-actions">
          <a href="#projects" className="saas-btn saas-btn-primary">View Projects <ArrowRight className="h-4 w-4" /></a>
          <a href="#contact" className="saas-btn saas-btn-secondary">Contact Me</a>
          <a href={cvUrl} target="_blank" rel="noreferrer" download className="saas-btn saas-btn-ghost" aria-label="Download CV"><Download className="h-4 w-4" /></a>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="saas-hero-stats">
          {heroStats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.aside {...fadeUp} className="saas-hero-visual" aria-label="Developer profile and product preview">
        <Suspense fallback={<div className="saas-hero-3d-fallback" aria-hidden="true" />}>
          <HeroScene3D />
        </Suspense>
        <div className="saas-profile-card">
          <div className="saas-profile-image-wrap">
            <img src={profileImage} alt="MD Meraz Ahasan Shah" width="920" height="1149" loading="eager" decoding="async" fetchPriority="high" />
          </div>
          <div>
            <p className="saas-status"><span /> Open to internship and junior roles</p>
            <h2>Full-Stack MERN Developer</h2>
            <p>CSE Student</p>
            <p>Dhaka, Bangladesh</p>
          </div>
          <div className="saas-profile-grid">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>JWT Auth</span>
          </div>
          <div className="saas-socials">
            <a href="mailto:merazahasan210@gmail.com" aria-label="Email"><Mail className="h-4 w-4" /></a>
            <a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/merazahasan" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn className="h-4 w-4" /></a>
            <a href="tel:+8801568088936" aria-label="Phone"><Phone className="h-4 w-4" /></a>
          </div>
        </div>
      </motion.aside>
    </section>
  );
}

function handleProjectTilt(event) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateX = ((rect.height / 2 - y) / rect.height) * 7;
  const rotateY = ((x - rect.width / 2) / rect.width) * 8;

  card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
  card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  card.style.setProperty("--glow-x", `${((x / rect.width) * 100).toFixed(2)}%`);
  card.style.setProperty("--glow-y", `${((y / rect.height) * 100).toFixed(2)}%`);
}

function resetProjectTilt(event) {
  const card = event.currentTarget;
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--glow-x", "50%");
  card.style.setProperty("--glow-y", "0%");
}

function FeaturedProject() {
  return (
    <section id="careerconnect" className="saas-section">
      <SectionHeader eyebrow="Featured Project" title="CareerConnect - Job Portal System">
        A premium MERN case study built around real hiring workflows, protected routes, role-specific dashboards, and practical application tracking.
      </SectionHeader>
      <motion.div {...fadeUp} className="saas-featured-project">
        <div className="saas-product-preview">
          <div className="saas-browser-bar">
            <i /><i /><i />
            <span>careerconnect.app/roles</span>
          </div>
          <div className="saas-preview-status">
            <div>
              <strong>Role-based platform</strong>
              <span>Seeker / Employer / Admin</span>
            </div>
            <p>JWT secured</p>
          </div>
          <div className="saas-dashboard-stack" aria-label="CareerConnect layered dashboard preview">
            {careerConnectPanels.map(([title, text, label, image], index) => (
              <article key={title} className="saas-dashboard-layer" style={{ "--layer": index }}>
                <img src={image} alt="" loading="lazy" />
                <div>
                  <span>0{index + 1}</span>
                  <b>{label}</b>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <i />
                <i />
              </article>
            ))}
          </div>
        </div>
        <div className="saas-case-content">
          <div className="saas-case-kicker">
            <span>Production-style MERN case study</span>
            <b>5 role-focused screens</b>
          </div>
          <div className="saas-case-grid">
            <article>
              <p>Problem</p>
              <h3>Hiring platforms need role-aware workflows.</h3>
              <span>Job seekers, employers, and admins need different dashboards, permissions, and application states. Simple job listing pages do not show enough full-stack depth.</span>
            </article>
            <article>
              <p>Solution</p>
              <h3>A complete MERN hiring workflow.</h3>
              <span>CareerConnect uses protected routes, JWT authentication, role-based access, application tracking, and admin management to model a real job portal system.</span>
            </article>
          </div>
          <div className="saas-stack-row">
            {careerConnect.tech.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="saas-architecture">
            <div><LockKeyhole className="h-4 w-4" /> JWT authentication</div>
            <div><Users className="h-4 w-4" /> Seeker, Employer, Admin</div>
            <div><LayoutDashboard className="h-4 w-4" /> Application tracking</div>
            <div><ShieldCheck className="h-4 w-4" /> Admin management</div>
          </div>
          <div className="saas-feature-list">
            {careerConnect.features.map((item) => (
              <p key={item}><CheckCircle2 className="h-4 w-4" /> {item}</p>
            ))}
          </div>
          <div className="saas-project-actions">
            <a href="https://job-portal-system-neon.vercel.app" target="_blank" rel="noreferrer">Live Demo <ExternalLink className="h-3.5 w-3.5" /></a>
            <a href="https://github.com/Meraz210/job-portal-system" target="_blank" rel="noreferrer">GitHub Repo <GitBranch className="h-3.5 w-3.5" /></a>
            <a href="#careerconnect">Case Study <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </motion.div>
      <div className="saas-screenshot-grid">
        {careerConnect.screenshots.map(([title, text, Icon]) => (
          <motion.article key={title} {...fadeUp} className="saas-screenshot-card">
            <Icon className="h-5 w-5" />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const otherProjects = projects.filter((project) => !project.featured);
  return (
    <section id="projects" className="saas-section">
      <SectionHeader eyebrow="All Projects" title="Projects built for real product workflows">
        CareerConnect leads the portfolio, with supporting projects across education, business, commerce, and healthcare interfaces.
      </SectionHeader>
      <div className="saas-project-grid">
        {otherProjects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.title}
              {...fadeUp}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="saas-project-card"
              onPointerMove={handleProjectTilt}
              onPointerLeave={resetProjectTilt}
            >
              <Icon className="h-5 w-5" />
              <h3>{project.title}</h3>
              <p className="saas-project-type">{project.type}</p>
              <p>{project.text}</p>
              <div className="saas-stack-row">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="saas-project-actions">
                {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a> : <button type="button" disabled>Coming Soon</button>}
                <a href={project.source} target="_blank" rel="noreferrer">GitHub Repo</a>
                <a href={project.caseStudy}>Case Study</a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <div id="about" className="saas-about">
      <motion.div {...fadeUp} className="saas-about-copy">
        <p className="saas-pill">About Me</p>
        <h2>Developer focused on clean full-stack execution.</h2>
        <p>
          I am MD Meraz Ahasan Shah, a CSE student at AIUB and Full-Stack MERN Developer. I build practical web applications with clear UI, protected backend flows, database-backed features, and recruiter-ready project presentation.
        </p>
        <p>
          My current focus is building internship and junior-level proof through strong MERN projects, REST API architecture, dashboard workflows, authentication, and polished product UI.
        </p>
        <div className="saas-highlight-grid">
          {aboutHighlights.map((item) => <span key={item}><CheckCircle2 className="h-4 w-4" /> {item}</span>)}
        </div>
      </motion.div>
      <motion.div {...fadeUp} className="saas-about-image">
        <img src={profileImage} alt="Meraz Ahasan" width="920" height="1149" loading="lazy" decoding="async" />
      </motion.div>
      <motion.aside {...fadeUp} className="saas-about-stats-card">
        <div className="saas-about-stat-grid">
          {heroStats.slice(0, 3).map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <pre>{`const passion = "Building products that solve real problems";
const focus = ["Clean Code", "Performance", "Scalability"];
let available = true;`}</pre>
        <b>Meraz</b>
      </motion.aside>
    </div>
  );
}

function Skills() {
  return (
    <div id="skills" className="saas-skills-command">
      <motion.div {...fadeUp} className="saas-skills-intro">
        <p className="saas-pill">Engineering Toolkit</p>
        <h2>Full-stack command center for building product workflows.</h2>
        <p>
          A focused toolkit for shipping scalable MERN applications, protected APIs, responsive dashboards, and production-ready user flows.
        </p>
        <div className="saas-capability-grid">
          {capabilityHighlights.map(([title, text]) => (
            <article key={title}>
              <CheckCircle2 className="h-4 w-4" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="saas-core-stack-panel">
          <span>Core Stack</span>
          <div>
            {coreStack.map((item) => <b key={item}>{item}</b>)}
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="saas-skills-matrix" aria-label="Full-stack skills matrix">
        <div className="saas-matrix-topbar">
          <span>stack.map(delivery)</span>
          <i />
        </div>
        <div className="saas-matrix-grid">
          {skillGroups.map(({ title, icon: Icon, focus, skills }, index) => {
            const meta = skillMeta[title];
            return (
              <article key={title} className="saas-skill-card" style={{ "--skill-index": index, "--skill-level": `${meta.level}%` }}>
                <div className="saas-skill-head">
                  <span><Icon className="h-5 w-5" /></span>
                  <div>
                    <p>{meta.label}</p>
                    <h3>{title}</h3>
                  </div>
                </div>
                <p>{focus}</p>
                <div className="saas-skill-meter" aria-hidden="true">
                  <i />
                </div>
                <div className="saas-skill-tags">
                  {skills.map((skill, skillIndex) => (
                    <span key={skill} className={skillIndex < 3 ? "is-core" : ""}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <div className="saas-skill-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </motion.div>
    </div>
  );
}

function AboutAndSkills() {
  return (
    <section className="saas-section saas-about-toolkit">
      <About />
      <Skills />
    </section>
  );
}

function JourneyAndGitHub() {
  return (
    <section className="saas-section saas-two-col">
      <div id="education">
        <SectionHeader eyebrow="Education & Experience" title="Academic foundation and practical full-stack work" />
        <div className="saas-edu-exp-grid">
          <motion.div {...fadeUp} className="saas-edu-exp-panel">
            <div className="saas-edu-exp-head">
              <GraduationCap className="h-5 w-5" />
              <h3>Education</h3>
            </div>
            {educationItems.map((item) => (
              <article key={item.title}>
                <time>{item.period}</time>
                <h4>{item.title}</h4>
                <strong>{item.place}</strong>
                <p>{item.details}</p>
              </article>
            ))}
          </motion.div>
          <motion.div id="experience" {...fadeUp} className="saas-edu-exp-panel">
            <div className="saas-edu-exp-head">
              <BriefcaseBusiness className="h-5 w-5" />
              <h3>Experience</h3>
            </div>
            {experienceItems.map((item) => (
              <article key={item.title}>
                <time>{item.period}</time>
                <h4>{item.title}</h4>
                <strong>{item.place}</strong>
                <p>{item.details}</p>
              </article>
            ))}
          </motion.div>
        </div>
        <SectionHeader eyebrow="Journey" title="Consistent full-stack growth" />
        <div className="saas-timeline">
          {journey.map(([year, title, text]) => (
            <motion.article key={year} {...fadeUp}>
              <time>{year}</time>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <div id="github">
        <SectionHeader eyebrow="GitHub" title="Activity and repositories" />
        <GitHubStats />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="saas-section">
      <motion.div {...fadeUp} className="saas-contact">
        <div>
          <p className="saas-pill">Contact</p>
          <h2>Let's build something useful.</h2>
          <p>Available for internships, junior developer roles, freelance projects, and collaboration. Send a short message and your email app will open with the details ready.</p>
          <div className="saas-available">
            <h3>Available For</h3>
            {availability.map((item) => <span key={item}><CheckCircle2 className="h-4 w-4" /> {item}</span>)}
          </div>
          <div className="saas-contact-links">
            <a href="mailto:merazahasan210@gmail.com"><Mail className="h-4 w-4" /> merazahasan210@gmail.com</a>
            <a href="tel:+8801568088936"><Phone className="h-4 w-4" /> +8801568088936</a>
            <p><MapPin className="h-4 w-4" /> Nikunjo-02, Dhaka, Bangladesh</p>
            <a href="https://www.linkedin.com/in/merazahasan" target="_blank" rel="noreferrer"><FaLinkedinIn className="h-4 w-4" /> linkedin.com/in/merazahasan</a>
            <a href="https://github.com/Meraz210" target="_blank" rel="noreferrer"><GitBranch className="h-4 w-4" /> github.com/Meraz210</a>
          </div>
        </div>
        <form
          className="saas-contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            window.location.href = `mailto:merazahasan210@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${data.get("name")}`)}&body=${encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`)}`;
          }}
        >
          <label>
            <span>Name</span>
            <input required name="name" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input required name="email" type="email" placeholder="you@example.com" />
          </label>
          <label>
            <span>Message</span>
            <textarea required name="message" rows="6" placeholder="Tell me about the role, project, or collaboration..." />
          </label>
          <button type="submit" className="saas-btn saas-btn-primary">Send Message <Send className="h-4 w-4" /></button>
        </form>
        <aside className="saas-contact-info-card" aria-label="Contact details">
          <div className="saas-contact-visual">
            <Mail className="h-10 w-10" />
          </div>
          <div>
            <span>Email</span>
            <a href="mailto:merazahasan210@gmail.com">merazahasan210@gmail.com</a>
          </div>
          <div>
            <span>Phone</span>
            <a href="tel:+8801568088936">+8801568088936</a>
          </div>
          <div>
            <span>Location</span>
            <p>Dhaka, Bangladesh</p>
          </div>
          <div className="saas-socials">
            <a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/merazahasan" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn className="h-4 w-4" /></a>
            <a href="mailto:merazahasan210@gmail.com" aria-label="Email"><Mail className="h-4 w-4" /></a>
          </div>
        </aside>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="saas-section saas-footer">
      <div>
        <h3>MD Meraz Ahasan Shah</h3>
        <p>Full-Stack MERN Developer building clean, scalable web applications and recruiter-ready product projects.</p>
        <a href={cvUrl} target="_blank" rel="noreferrer" download>Download CV <Download className="h-3.5 w-3.5" /></a>
      </div>
      <div>
        <h3>Navigation</h3>
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </div>
      <div>
        <h3>Connect</h3>
        <div className="saas-socials">
          <a href="https://github.com/Meraz210" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/merazahasan" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn className="h-4 w-4" /></a>
          <a href="mailto:merazahasan210@gmail.com" aria-label="Email"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
      <p className="saas-copyright">&copy; 2026 MD Meraz Ahasan Shah. All rights reserved.</p>
      <a href="#home" className="saas-back-top" aria-label="Back to top"><ArrowRight className="h-4 w-4 -rotate-90" /></a>
    </footer>
  );
}

function getInitialTheme() {
  if (typeof window === "undefined") return "night";
  const stored = window.localStorage.getItem("portfolio-theme");
  if (stored === "day" || stored === "night") return stored;
  return "night";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((value) => (value === "night" ? "day" : "night"));

  return (
    <div className="saas-page" data-theme={theme}>
      <Suspense fallback={<div className="premium-bg-fallback" aria-hidden="true" />}>
        <PremiumBackground3D />
      </Suspense>
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero />
        <FeaturedProject />
        <Projects />
        <AboutAndSkills />
        <JourneyAndGitHub />
        <Contact />
      </main>
      <Footer />
      <PortfolioChatbot />
    </div>
  );
}
