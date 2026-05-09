import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "./assets/profile.png";
import AboutSection from "./components/AboutSection";
import CursorGlow from "./components/CursorGlow";
import Footer from "./components/Footer";
import GitHubStats from "./components/GitHubStats";
import ParticlesBackground from "./components/ParticlesBackground";
import PortfolioChatbot from "./components/PortfolioChatbot";
import SkillsSection from "./components/SkillsSection";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    title: "Attendance System",
    image: "/projects/attendance.png",
    description: "A MERN attendance platform for managing students, daily records, reports, and admin workflows.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Meraz210/Attendance-system",
    type: "Operations",
  },
  {
    title: "LifeDrop",
    image: "/projects/lifedrop.png",
    description: "A blood donation platform designed to connect donors and recipients through a clean digital flow.",
    tech: ["React", "Express", "MongoDB"],
    github: "https://github.com/Meraz210/LifeDrop",
    type: "HealthTech",
  },
  {
    title: "StudyHub",
    image: "/projects/studyhub.png",
    description: "A collaborative learning product for students, resources, progress, and community-driven study.",
    tech: ["React", "Firebase", "Tailwind"],
    github: "https://github.com/Meraz210/StudyHub",
    type: "EdTech",
  },
  {
    title: "Tea-Shop",
    image: "/projects/tea-shop.png",
    description: "A focused e-commerce experience for browsing tea products and moving customers toward orders.",
    tech: ["React", "Express", "Node.js"],
    github: "https://github.com/Meraz210/Tea-Shop",
    type: "Commerce",
  },
  {
    title: "YBTDigital",
    image: "/projects/ybtdigital.png",
    description: "A digital business platform with service presentation, modern UI, and lead-generation focus.",
    tech: ["Next.js", "Tailwind", "UI Design"],
    github: "https://github.com/Meraz210/YBTDigital",
    type: "Agency",
  },
  {
    title: "MediCare Hospital",
    image: "/projects/medicare-hospital.png",
    description: "A hospital management and healthcare service platform designed for appointments, departments, and patient-focused flows.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Meraz210/MediCare-Hospital",
    type: "HealthTech",
  },
];

function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="relative mb-5 flex h-56 w-full overflow-hidden rounded-lg border border-cyan-400/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.28),transparent_35%),linear-gradient(135deg,rgba(8,47,73,0.95),rgba(0,0,0,0.98))]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative z-10 m-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">{project.type}</p>
          <p className="mt-3 text-2xl font-black text-white">{project.title}</p>
          <p className="mt-2 text-sm text-gray-400">Add screenshot in public/projects</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={`${project.title} screenshot`}
      className="mb-5 h-56 w-full rounded-lg object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectCard({ project }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (event) => {
    if (window.innerWidth < 768) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 10;
    const rotateX = ((y / bounds.height) - 0.5) * -10;

    setTilt({ rotateX, rotateY });
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      animate={tilt}
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 p-6 md:p-8 transition-all duration-500 hover:border-cyan-500/30"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-6 md:inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="relative overflow-hidden rounded-xl mb-6 bg-black/30">
          <ProjectImage project={project} />
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-cyan-500/10" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 right-6 hidden rounded-lg border border-cyan-400/30 bg-black/70 p-3 text-sm text-cyan-100 backdrop-blur-md md:block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Details</span>
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-500/50" />
            </div>
            <p className="text-xs text-gray-300">Interactive project with live deployment</p>
          </motion.div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur">
            {project.type}
          </span>
          <span className="rounded-full border border-gray-600/50 bg-gray-900/50 px-3 py-1 text-xs font-semibold text-gray-400">
            GitHub
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-white mb-3">{project.title}</h3>
        <p className="text-sm md:text-base text-gray-400 mb-6 leading-relaxed">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs md:text-sm font-semibold text-cyan-300 backdrop-blur transition"
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className="mt-auto flex gap-3 pt-4">
          <MagneticButton
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-center font-bold text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-400"
          >
            Code
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 px-4 py-2 text-center font-bold text-cyan-200 transition hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Details
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
    >
      <div className="relative text-center">
        <div className="absolute -inset-20 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative mx-auto mb-7 h-20 w-20 rounded-full border border-cyan-300/40">
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent shadow-[0_0_40px_rgba(34,211,238,0.65)]" />
          <div className="absolute inset-6 rounded-full bg-cyan-300/70 blur-sm" />
        </div>
        <p className="relative text-sm font-semibold uppercase tracking-[0.38em] text-cyan-300">
          Initializing Interface
        </p>
      </div>
    </motion.div>
  );
}

const heroMetrics = [
  { value: "06", label: "Featured builds" },
  { value: "MERN", label: "Core stack" },
  { value: "3D", label: "Interactive UI" },
];

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.4], fov: 50 }} className="hero-scene absolute inset-0">
      <ambientLight intensity={0.75} />
      <spotLight position={[0, 5, 6]} angle={0.55} penumbra={0.8} intensity={8} color="#67e8f9" />
      <pointLight position={[4.5, 2.4, 4]} intensity={8} color="#22d3ee" />
      <pointLight position={[-4, -3, 3]} intensity={5.5} color="#a855f7" />
      <pointLight position={[0, -3, 2]} intensity={2.5} color="#ffffff" />
      <Stars radius={78} depth={52} count={2300} factor={4.6} saturation={0} fade speed={1.15} />

      <Float speed={2.1} rotationIntensity={1.25} floatIntensity={1.7}>
        <mesh position={[1.25, -0.05, -0.25]} rotation={[0.55, 0.2, 0.12]}>
            <icosahedronGeometry args={[0.8, 2]} />
            <meshStandardMaterial color="#22d3ee" wireframe emissive="#0891b2" emissiveIntensity={0.9} />
          </mesh>
        </Float>

        <Float speed={1.45} rotationIntensity={1.8} floatIntensity={1.15}>
          <mesh position={[1.25, -0.05, -0.25]} rotation={[0.2, 0.8, 0.15]}>
            <torusGeometry args={[1.4, 0.012, 16, 180]} />
          <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={0.75} />
        </mesh>
      </Float>

      <Float speed={1.9} rotationIntensity={2.2} floatIntensity={1.6}>
        <mesh position={[3.1, -1.2, -0.65]} rotation={[0.8, 0.2, 0.5]}>
          <torusKnotGeometry args={[0.55, 0.16, 128, 16]} />
          <meshStandardMaterial color="#c084fc" wireframe emissive="#7e22ce" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <Float speed={2.35} rotationIntensity={1.4} floatIntensity={1.8}>
        <mesh position={[-2.8, 1.1, -0.55]}>
          <octahedronGeometry args={[0.75, 0]} />
          <meshStandardMaterial color="#67e8f9" wireframe emissive="#06b6d4" emissiveIntensity={0.45} />
        </mesh>
      </Float>

      <Float speed={2.7} rotationIntensity={1.1} floatIntensity={2.2}>
        <mesh position={[-3.2, -1.7, -1.2]} rotation={[0.25, 0.4, 0.1]}>
          <tetrahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#ffffff" wireframe emissive="#67e8f9" emissiveIntensity={0.35} />
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
    </Canvas>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-1/2 top-6 z-50 w-[90%] -translate-x-1/2 md:w-[85%]"
    >
      <div className="mx-auto flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-black/30 px-6 py-4 shadow-lg shadow-cyan-500/10 backdrop-blur-2xl">
        <a href="#home" className="group flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.95)]" />
          <span className="text-base font-black uppercase tracking-[0.18em] text-white md:text-lg">
            Meraz <span className="text-cyan-300">Ahasan</span>
          </span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-2 text-base font-semibold text-gray-300 transition hover:bg-cyan-400/10 hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="ml-2 rounded-lg bg-cyan-300 px-6 py-2 text-base font-black text-black shadow-lg shadow-cyan-500/25 transition hover:bg-white"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-cyan-400/40 px-3 py-2 text-sm font-bold text-cyan-200 md:hidden"
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-7xl rounded-lg border border-cyan-400/20 bg-black/90 p-3 backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-gray-200 hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="mt-2 block rounded-lg bg-cyan-300 px-4 py-3 text-center font-black text-black"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function MagneticButton({ as: Component = "a", children, className = "", ...props }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.22,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.28,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.35 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={submitForm} className="space-y-4">
      <input
        required
        placeholder="Your name"
        className="w-full rounded-lg border border-white/10 bg-black/45 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400"
      />
      <input
        required
        type="email"
        placeholder="Email address"
        className="w-full rounded-lg border border-white/10 bg-black/45 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400"
      />
      <textarea
        required
        rows="5"
        placeholder="Project details"
        className="w-full resize-none rounded-lg border border-white/10 bg-black/45 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-cyan-300 px-6 py-3 font-black text-black shadow-lg shadow-cyan-500/25 transition hover:bg-white"
      >
        Send Project Request
      </button>
      {sent && <p className="text-sm text-cyan-200">Message captured locally. Email Meraz for direct delivery.</p>}
    </form>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".section-transition", {
        clipPath: "inset(0% 0% 0% 0%)",
        transformOrigin: "center top",
      });

      gsap.to(".hero-scene", {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".hero-copy", {
        y: -80,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "45% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-profile", {
        y: -130,
        rotate: -3,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".parallax-slow", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.utils.toArray(".motion-title").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
          opacity: 0,
          y: 42,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".reveal-up").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: { trigger: element, start: "top 82%" },
          opacity: 0,
          y: 56,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".stagger-group").forEach((group) => {
        gsap.from(group.querySelectorAll(".stagger-item"), {
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
          },
          opacity: 0,
          y: 34,
          scale: 0.96,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".section-transition").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 45%",
            scrub: 0.8,
          },
          opacity: 0.62,
          y: 72,
          scale: 0.985,
          ease: "none",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="luxury-shell min-h-screen overflow-x-hidden text-white">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <CursorGlow />
      <ParticlesBackground />
      <Navbar />
      <PortfolioChatbot />

      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_72%_34%,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_18%_18%,rgba(168,85,247,0.12),transparent_32%),linear-gradient(180deg,#0a0e27_0%,#000000_50%,#0a0a0a_100%)] px-5 md:px-10"
      >
        {/* 3D SCENE - BACKGROUND LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          <HeroScene />
          <div className="parallax-slow absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-cyan-500/8 blur-[150px] opacity-50" />
          <div className="absolute left-1/3 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[140px]" />
        </div>

        {/* LEFT CONTENT - HERO COPY */}
        <div className="relative z-20 max-w-2xl pr-8 md:pr-12 lg:pr-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-copy space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/5 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
                Frontend Developer
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="space-y-4"
            >
              <h1 className="motion-title text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block">Building</span>
                <span className="block bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  cinematic
                </span>
                <span className="block">experiences</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-xl"
            >
              MERN stack developer specializing in premium full-stack products, 
              immersive 3D web experiences, and responsive design systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <MagneticButton
                href="#projects"
                className="luxury-button-primary rounded-lg px-7 py-3 font-bold text-base transition hover:shadow-lg hover:shadow-cyan-500/50"
              >
                View Work
              </MagneticButton>
              <MagneticButton
                href="https://github.com/Meraz210"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button-secondary rounded-lg px-7 py-3 font-bold text-base transition hover:border-cyan-300 hover:text-cyan-100"
              >
                GitHub
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT PROFILE CARD - PREMIUM DESIGN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 0.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent blur-2xl" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/5" />

            <div className="relative rounded-2xl border border-cyan-500/20 bg-black/40 p-6 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

              <div className="relative overflow-hidden rounded-xl mb-6">
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 z-10 bg-[linear-gradient(transparent_0%,rgba(34,211,238,0.15)_50%,transparent_100%)]"
                />
                <img
                  src={profileImage}
                  alt="Meraz Ahasan"
                  className="aspect-square w-full object-cover saturate-110 brightness-95"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Developer Profile</p>
                  <h3 className="text-2xl font-black text-white mt-1">Meraz Ahasan</h3>
                </div>

                <div className="flex gap-2">
                  {["React", "Node", "3D"].map((skill) => (
                    <div
                      key={skill}
                      className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur"
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-400">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="projects" className="section-transition relative z-20 px-5 md:px-10 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="space-y-4 mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Featured Work</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Premium Projects
              </h2>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl">
              Full-stack applications engineered with attention to UX, performance, and modern design patterns.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <AboutSection />
      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div id="skills" className="section-transition">
        <SkillsSection />
      </div>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <section id="github" className="section-transition relative z-20 px-5 md:px-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <div className="space-y-4 mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Live Data</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              GitHub Activity
            </h2>
          </div>
          <GitHubStats />
        </motion.div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <section id="contact" className="section-transition relative z-20 px-5 md:px-10 py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <div className="space-y-4 mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Let's work together
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                Whether you have a project in mind or just want to chat about frontend, 3D web, or career opportunities, I'm always open to connecting.
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:merazahasan210@gmail.com" 
                  className="group block rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 transition hover:border-cyan-500/50 hover:bg-cyan-500/10"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Email</p>
                  <p className="text-lg font-semibold text-white break-all group-hover:text-cyan-200 transition">
                    merazahasan210@gmail.com
                  </p>
                </a>

                <a 
                  href="tel:+8801568088936" 
                  className="group block rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 transition hover:border-cyan-500/50 hover:bg-cyan-500/10"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Phone</p>
                  <p className="text-lg font-semibold text-white group-hover:text-cyan-200 transition">
                    +880 1568-088936
                  </p>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 p-8">
              <h3 className="text-2xl font-black text-white mb-8">Quick Message</h3>
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <Footer />
    </div>
  );
}
