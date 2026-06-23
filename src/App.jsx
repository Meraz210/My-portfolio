import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
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
  Sun,
  Users,
  X,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import GitHubStats from "./components/GitHubStats";
import PortfolioChatbot from "./components/PortfolioChatbot";
import profileImage from "./assets/profile-premium.webp";

const cvUrl = `${import.meta.env.BASE_URL}MD_MERAZ_AHASAN_SHAH_CV.pdf`;
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
    outcome: "Result: Full role-based product workflow with live demo and review-ready source code.",
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
    outcome: "Result: Clean student workflow concept with reusable UI and API-ready structure.",
    problem: "Students need one organized place to track study goals, resources, and progress without jumping between disconnected tools.",
    solution: "A responsive learning dashboard structure with resource discovery, progress context, and clean student-first workflows.",
    proof: "Shows product thinking around education workflows, reusable React UI, API-ready structure, and mobile-friendly presentation.",
    icon: Globe2,
    tech: ["React", "API", "Tailwind"],
    source: "https://github.com/Meraz210/StudyHub",
    caseStudy: "#studyhub-case",
  },
  {
    title: "Attendance System",
    type: "Education Operations",
    text: "Role-based attendance system for student records, daily status tracking, reports, and admin workflows.",
    outcome: "Result: Practical admin workflow for records, reporting, and daily operations.",
    problem: "Manual attendance tracking makes daily records, reporting, and admin review slow and error-prone.",
    solution: "A role-aware attendance workflow for student records, daily status management, reporting context, and admin operations.",
    proof: "Demonstrates CRUD depth, database-backed workflows, protected admin thinking, and practical education operations.",
    icon: GraduationCap,
    tech: ["React", "Node.js", "MongoDB"],
    source: "https://github.com/Meraz210/Attendance-system",
    caseStudy: "#attendance-system-case",
  },
  {
    title: "YBTDigital",
    type: "Business Website",
    text: "Responsive service presentation site focused on clear messaging, service discovery, SEO, and conversion flow.",
    outcome: "Result: Client-facing site structure optimized for trust, clarity, and contact flow.",
    problem: "Service businesses need a fast, clear web presence that explains offers and guides visitors toward contact.",
    solution: "A responsive business website structure focused on service clarity, scanning, SEO readiness, and conversion flow.",
    proof: "Shows client-facing UI judgment, content hierarchy, responsive layout work, and business-oriented presentation.",
    icon: Rocket,
    tech: ["React", "UI/UX", "SEO"],
    source: "https://github.com/Meraz210/YBTDigital",
    caseStudy: "#ybtdigital-case",
  },
  {
    title: "Tea-Shop",
    type: "Commerce Interface",
    text: "E-commerce style product browsing experience with clean catalog presentation and responsive layouts.",
    outcome: "Result: Buyer-friendly catalog UI with responsive product discovery.",
    problem: "Small commerce experiences need clear product browsing, attractive catalog presentation, and low-friction navigation.",
    solution: "A clean product catalog interface with responsive cards, commerce-style structure, and readable product discovery.",
    proof: "Highlights frontend polish, layout discipline, product-card UI, and buyer-facing responsive design.",
    icon: ShieldCheck,
    tech: ["React", "Commerce", "CSS3"],
    source: "https://github.com/Meraz210/Tea-Shop",
    caseStudy: "#tea-shop-case",
  },
  {
    title: "MediCare Hospital",
    type: "Healthcare Dashboard",
    text: "Hospital service interface for appointment context, doctor information, patient workflows, and admin views.",
    outcome: "Result: Domain-aware healthcare interface with structured service workflows.",
    problem: "Healthcare users need quick access to services, doctors, appointment context, and structured admin information.",
    solution: "A healthcare interface concept with service discovery, doctor information, patient workflow context, and dashboard-ready layout.",
    proof: "Demonstrates domain-aware UI, information architecture, and the ability to model practical service workflows.",
    icon: Server,
    tech: ["React", "Node.js", "UI"],
    source: "https://github.com/Meraz210/MediCare-Hospital",
    caseStudy: "#medicare-hospital-case",
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

const skillBarGroups = {
  technical: [
    ["React.js", 92],
    ["Node.js & Express.js", 88],
    ["MongoDB & Database Design", 84],
    ["REST API Development", 90],
    ["JWT Authentication", 86],
    ["Tailwind CSS & Responsive UI", 92],
    ["Git, GitHub & Deployment", 86],
  ],
  professional: [
    ["Problem Solving", 88],
    ["Product Thinking", 84],
    ["Communication", 82],
    ["Team Collaboration", 90],
    ["Adaptability", 88],
    ["Project Ownership", 86],
  ],
};

const capabilityChips = [
  ["React Interfaces", 92],
  ["REST APIs", 90],
  ["JWT Auth", 86],
  ["MongoDB", 84],
  ["Dashboard UI", 90],
  ["Responsive Design", 92],
  ["GitHub Workflow", 86],
  ["Problem Solving", 88],
  ["Communication", 82],
  ["Project Ownership", 86],
];

const contactEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const recruiterProof = [
  ["Production Build", "Vite production build and ESLint checks pass cleanly."],
  ["Real Deployment", "CareerConnect has a live deployment plus source code review path."],
  ["Role Coverage", "Seeker, employer, and admin workflows prove full-stack depth."],
  ["Contact Ready", "Form submission uses Formspree when configured, with mail fallback."],
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
  impact: [
    ["3", "Role dashboards"],
    ["JWT", "Protected access"],
    ["Live", "Deployment ready"],
  ],
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

const careerConnectGallery = [
  ["Admin dashboard", "Platform management for users, jobs, applications, and role control.", projectAsset("careerconnect/careerconnect-admin.jpg")],
  ["Seeker workflow", "Job discovery, application context, and seeker-facing dashboard flow.", projectAsset("careerconnect/careerconnect-seeker.jpg")],
  ["Employer workflow", "Employer dashboard for posting jobs and reviewing applicants.", projectAsset("careerconnect/careerconnect-employer.jpg")],
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

  const scrollToSection = (event, href) => {
    event.preventDefault();
    const section = document.querySelector(href);
    if (!section) return;

    const anchorTarget = section.querySelector(".saas-section-header") || section;
    const top = anchorTarget.getBoundingClientRect().top + window.scrollY - 104;

    setActive(href);
    setOpen(false);
    window.history.pushState(null, "", href);
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      const activationLine = Math.min(window.innerHeight * 0.45, 360);
      const current = navItems
        .map(([, href]) => href)
        .findLast((href) => {
          const element = document.querySelector(href);
          return element && element.getBoundingClientRect().top <= activationLine;
        });
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="saas-nav-wrap">
      <nav className="saas-nav" aria-label="Primary navigation">
        <div className="saas-nav-links">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={active === href ? "is-active" : ""}
              aria-current={active === href ? "page" : undefined}
              onClick={(event) => scrollToSection(event, href)}
            >
              {label}
            </a>
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
        </div>
        <button
          type="button"
          className="saas-menu-btn"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-controls="mobile-navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-navigation" className="saas-mobile-menu">
          <button type="button" className="saas-theme-toggle saas-theme-toggle-mobile" onClick={onThemeToggle}>
            {isDay ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span>{isDay ? "Switch to night mode" : "Switch to day mode"}</span>
          </button>
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(event) => scrollToSection(event, href)}
              aria-current={active === href ? "page" : undefined}
            >
              {label}
            </a>
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

function CountUpStat({ value }) {
  const number = Number.parseInt(value, 10);
  const suffix = value.replace(String(number), "");
  const [displayValue, setDisplayValue] = useState(Number.isNaN(number) ? value : 1);

  useEffect(() => {
    if (Number.isNaN(number)) {
      return undefined;
    }

    let frameId;
    const duration = 950;
    const startTime = performance.now();
    const startValue = 1;

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (number - startValue) * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [number, value]);

  if (Number.isNaN(number)) {
    return (
      <motion.strong initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {value}
      </motion.strong>
    );
  }

  return <strong>{displayValue}{suffix}</strong>;
}

function Hero() {
  return (
    <section id="home" className="saas-section saas-hero">
      <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="saas-hero-copy">
        <motion.h1 variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>Full-Stack Developer building clean, scalable web products.</motion.h1>
        <motion.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="saas-hero-subtitle">
          I design and build recruiter-ready web applications, REST APIs, dashboards, and product interfaces with React, Node.js, Express, MongoDB, and clean UI execution.
        </motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="saas-hero-actions">
          <a href="#projects" className="saas-btn saas-btn-primary">View Projects <ArrowRight className="h-4 w-4" /></a>
          <a href="#contact" className="saas-btn saas-btn-secondary">Contact Me</a>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="saas-hero-stats">
          {heroStats.map(([value, label]) => (
            <div key={label}>
              <CountUpStat value={value} />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.aside {...fadeUp} className="saas-hero-visual" aria-label="Developer profile and product preview">
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
            <article>
              <p>Result</p>
              <h3>Clear proof of full-stack product execution.</h3>
              <span>The project gives recruiters a live demo, real dashboard screenshots, role coverage, and source code that shows practical MERN architecture.</span>
            </article>
          </div>
          <div className="saas-stack-row">
            {careerConnect.tech.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="saas-impact-row" aria-label="CareerConnect project impact">
            {careerConnect.impact.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
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
      <div className="saas-real-screenshot-grid" aria-label="CareerConnect real product screenshots">
        {careerConnectGallery.map(([title, text, image], index) => (
          <motion.article
            key={title}
            {...fadeUp}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="saas-real-screenshot-card"
          >
            <img src={image} alt={`${title} screenshot`} loading="lazy" />
            <div>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
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
              <p className="saas-project-outcome">{project.outcome}</p>
              <div className="saas-project-proof">
                <span>{project.live ? "Live demo available" : "Source code review ready"}</span>
                <span>{project.live ? "Production-style deployment" : "Demo deployment planned"}</span>
              </div>
              <div className="saas-stack-row">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="saas-project-actions">
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a>
                ) : (
                  <a href={project.source} target="_blank" rel="noreferrer">Source Review</a>
                )}
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

function SupportingCaseStudies() {
  const caseStudies = projects.filter((project) => !project.featured);

  return (
    <section className="saas-section" id="case-studies">
      <SectionHeader eyebrow="Project Proof" title="Supporting case studies with practical product thinking">
        Each supporting project is framed by the problem, implementation direction, and the proof a reviewer can inspect in code.
      </SectionHeader>
      <div className="saas-case-study-grid">
        {caseStudies.map((project, index) => {
          const Icon = project.icon;
          const caseId = project.caseStudy.replace("#", "");

          return (
            <motion.article
              id={caseId}
              key={project.title}
              {...fadeUp}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="saas-mini-case-study"
            >
              <div className="saas-mini-case-head">
                <span><Icon className="h-5 w-5" /></span>
                <div>
                  <p>{project.type}</p>
                  <h3>{project.title}</h3>
                </div>
              </div>
              <div className="saas-mini-case-body">
                <div>
                  <b>Problem</b>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <b>Solution</b>
                  <p>{project.solution}</p>
                </div>
                <div>
                  <b>Proof</b>
                  <p>{project.proof}</p>
                </div>
              </div>
              <div className="saas-stack-row">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="saas-project-actions">
                {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live Demo <ExternalLink className="h-3.5 w-3.5" /></a>}
                <a href={project.source} target="_blank" rel="noreferrer">Source Code <GitBranch className="h-3.5 w-3.5" /></a>
                <a href="#contact">Discuss Project <ArrowRight className="h-3.5 w-3.5" /></a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function RecruiterProof() {
  return (
    <section className="saas-section">
      <SectionHeader eyebrow="Recruiter Proof" title="Ready for review, demo, and contact">
        The portfolio now highlights build health, deployment status, role coverage, and contact readiness so reviewers can evaluate quickly.
      </SectionHeader>
      <div className="saas-recruiter-proof-grid">
        {recruiterProof.map(([title, text], index) => (
          <motion.article
            key={title}
            {...fadeUp}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="saas-recruiter-proof-card"
          >
            <span><CheckCircle2 className="h-5 w-5" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
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

function useOnceInView() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return [ref, isVisible];
}

function SkillBarRow({ skill, level, index, variant = "technical" }) {
  const [ref, isVisible] = useOnceInView();
  const [displayLevel, setDisplayLevel] = useState(0);
  const delay = index * 130;
  const duration = 1300 + Math.min(index, 4) * 90;

  useEffect(() => {
    if (!isVisible) return undefined;

    let frameId;
    let timeoutId;

    timeoutId = window.setTimeout(() => {
      const startTime = performance.now();

      const update = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayLevel(Math.round(level * eased));

        if (progress < 1) {
          frameId = requestAnimationFrame(update);
        }
      };

      frameId = requestAnimationFrame(update);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [delay, duration, isVisible, level]);

  return (
    <div
      ref={ref}
      className={`saas-skill-bar-row ${variant === "professional" ? "is-professional" : ""}`}
      style={{
        "--skill-level": isVisible ? `${level}%` : "0%",
        "--skill-delay": `${delay}ms`,
        "--skill-duration": `${duration}ms`,
      }}
    >
      <div>
        <span>{skill}</span>
        <b>{displayLevel}%</b>
      </div>
      <i aria-hidden="true" />
    </div>
  );
}

function SkillColumn({ title, skills, variant }) {
  return (
    <div className={`saas-skill-bars-column ${variant === "professional" ? "is-professional" : ""}`}>
      <h3>{title}</h3>
      {skills.map(([skill, level], index) => (
        <SkillBarRow key={skill} skill={skill} level={level} index={index} variant={variant} />
      ))}
    </div>
  );
}

function SkillChip({ label, level, index }) {
  return (
    <span className={index % 2 ? "is-blue" : ""}>
      <i />
      <b>{label}</b>
      <em>{level}%</em>
    </span>
  );
}

function SkillChipSlider({ chips }) {
  const renderChips = (duplicate = false) =>
    chips.map(([label, level], index) => (
      <SkillChip key={duplicate ? `${label}-duplicate` : label} label={label} level={level} index={index} />
    ));

  return (
    <motion.div {...fadeUp} className="saas-capability-chip-strip" aria-label="Key capability highlights">
      <div className="saas-capability-chip-track">
        <div className="saas-capability-chip-group">{renderChips()}</div>
        <div className="saas-capability-chip-group" aria-hidden="true">{renderChips(true)}</div>
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="saas-section saas-skills-board">
      <SectionHeader eyebrow="My Skills" title="Technical depth and professional delivery">
        A focused view of the tools and working habits I use to build MERN products, dashboards, APIs, and reliable user flows.
      </SectionHeader>
      <motion.div {...fadeUp} className="saas-skill-bars-panel" aria-label="Technical and professional skills">
        <SkillColumn title="Technical Skills" skills={skillBarGroups.technical} variant="technical" />
        <SkillColumn title="Professional Skills" skills={skillBarGroups.professional} variant="professional" />
      </motion.div>
      <SkillChipSlider chips={capabilityChips} />
    </section>
  );
}

function AboutAndSkills() {
  return (
    <section className="saas-section">
      <About />
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
  const [status, setStatus] = useState("idle");
  const isSubmitting = status === "submitting";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    if (!contactEndpoint) {
      window.location.href = `mailto:merazahasan210@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${payload.name}`)}&body=${encodeURIComponent(`${payload.message}\n\nFrom: ${payload.name} <${payload.email}>`)}`;
      setStatus("fallback");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (!response.ok) throw new Error("Unable to send message");

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="saas-section">
      <motion.div {...fadeUp} className="saas-contact">
        <div>
          <p className="saas-pill">Contact</p>
          <h2>Let's build something useful.</h2>
          <p>Available for internships, junior developer roles, freelance projects, and collaboration. Send a short message through the portfolio form or use the direct contact links.</p>
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
          onSubmit={handleSubmit}
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
          <button type="submit" className="saas-btn saas-btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
          </button>
          <div className="saas-contact-trust" aria-label="Contact expectations">
            <span><CheckCircle2 className="h-3.5 w-3.5" /> Clear project scope</span>
            <span><ShieldCheck className="h-3.5 w-3.5" /> Fast follow-up</span>
            <span><GitBranch className="h-3.5 w-3.5" /> Code review ready</span>
          </div>
          {status === "sent" && <p className="saas-form-status is-success">Message sent. I will reply as soon as possible.</p>}
          {status === "fallback" && <p className="saas-form-status">Email app opened because no form endpoint is configured.</p>}
          {status === "error" && <p className="saas-form-status is-error">Message failed. Please use email or LinkedIn instead.</p>}
        </form>
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
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Suspense fallback={<div className="premium-bg-fallback" aria-hidden="true" />}>
        <PremiumBackground3D />
      </Suspense>
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <main id="main-content">
        <Hero />
        <FeaturedProject />
        <Projects />
        <SupportingCaseStudies />
        <RecruiterProof />
        <AboutAndSkills />
        <Skills />
        <JourneyAndGitHub />
        <Contact />
      </main>
      <Footer />
      <PortfolioChatbot />
    </div>
  );
}
