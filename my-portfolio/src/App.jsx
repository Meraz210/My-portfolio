import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
      <div className="relative mb-5 flex h-48 md:h-56 w-full overflow-hidden rounded-2xl border border-cyan-400/15 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.15),transparent_40%),linear-gradient(135deg,rgba(8,47,73,0.8),rgba(0,0,0,0.95))]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative z-10 m-auto px-6 text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300/70">{project.type}</p>
          <p className="mt-2 md:mt-3 text-xl md:text-2xl font-black text-white/70">{project.title}</p>
          <p className="mt-1.5 md:mt-2 text-xs text-gray-400">Screenshot coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={`${project.title} screenshot`}
      className="mb-5 h-48 md:h-56 w-full rounded-2xl object-cover transition hover:scale-105 duration-500"
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
    const rotateY = ((x / bounds.width) - 0.5) * 8;
    const rotateX = ((y / bounds.height) - 0.5) * -8;

    setTilt({ rotateX, rotateY });
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      animate={tilt}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/12 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 p-7 md:p-8 transition-all duration-500 hover:border-cyan-500/35"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent opacity-0 blur-2xl transition duration-500 group-hover:opacity-80" />
      <div className="absolute inset-x-6 md:inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative flex h-full flex-col">
        {/* PROJECT IMAGE */}
        <div className="relative overflow-hidden rounded-2xl mb-7 bg-black/30">
          <ProjectImage project={project} />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-cyan-500/5" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-6 right-6 hidden rounded-lg border border-cyan-400/30 bg-black/70 p-4 text-sm text-cyan-100 backdrop-blur-md md:block"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-cyan-300">Interactive</span>
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-500/60" />
            </div>
            <p className="text-xs text-gray-300">Full-stack project with live deployment</p>
          </motion.div>
        </div>

        {/* PROJECT METADATA */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur">
            {project.type}
          </span>
          <span className="rounded-full border border-gray-600/40 bg-gray-900/30 px-3.5 py-1.5 text-xs font-semibold text-gray-400">
            GitHub
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight">{project.title}</h3>
        
        {/* DESCRIPTION */}
        <p className="text-sm md:text-base text-gray-400 mb-6 leading-relaxed flex-grow">{project.description}</p>

        {/* TECH STACK */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tech.map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06 }}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs md:text-sm font-semibold text-cyan-300 backdrop-blur transition"
            >
              {item}
            </motion.span>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-auto flex gap-3">
          <MagneticButton
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-4 py-3 text-center font-bold text-sm md:text-base text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200"
          >
            View Code
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="flex-1 rounded-lg bg-gradient-to-br from-cyan-500/15 to-cyan-600/15 border border-cyan-500/30 px-4 py-3 text-center font-bold text-sm md:text-base text-cyan-200 transition hover:border-cyan-400 hover:from-cyan-500/25 hover:to-cyan-600/25 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Learn More
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
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
    >
      <div className="relative text-center">
        <div className="absolute -inset-32 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="relative mx-auto mb-8 h-24 w-24 rounded-full border-2 border-cyan-300/30">
          <div className="absolute inset-3 animate-spin rounded-full border-3 border-cyan-400 border-t-transparent shadow-[0_0_50px_rgba(34,211,238,0.5)]" />
          <div className="absolute inset-8 rounded-full bg-cyan-300/40 blur-sm" />
        </div>
        <p className="relative text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Initializing
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

// PROFESSIONAL CORE - CORPORATE AESTHETIC
function PremiumAICore() {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const sphereRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);

  useEffect(() => {
    let animationId;
    
    const animate = () => {
      // Very subtle group rotation
      if (groupRef.current) {
        groupRef.current.rotation.z += 0.00008;
      }
      // Core smooth rotation
      if (coreRef.current) {
        coreRef.current.rotation.x += 0.0004;
        coreRef.current.rotation.y += 0.0002;
      }
      // Sphere gentle rotation
      if (sphereRef.current) {
        sphereRef.current.rotation.x += 0.00015;
        sphereRef.current.rotation.y += 0.0003;
      }
      // Ring 1 rotation
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x += 0.0002;
      }
      // Ring 2 rotation
      if (ring2Ref.current) {
        ring2Ref.current.rotation.z += 0.00025;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* PROFESSIONAL CORE - CORPORATE BLUE */}
      <mesh position={[0, 0, 0]} ref={coreRef}>
        <octahedronGeometry args={[0.3, 2]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#60a5fa"
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.15}
          wireframe={false}
        />
      </mesh>

      {/* CORPORATE GLOW SHELL */}
      <mesh position={[0, 0, 0]} scale={1.2}>
        <octahedronGeometry args={[0.3, 2]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#60a5fa"
          emissiveIntensity={0.25}
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* PROFESSIONAL WIREFRAME SPHERE */}
      <mesh position={[0, 0, 0]} ref={sphereRef} scale={1.5}>
        <icosahedronGeometry args={[0.28, 2]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#818cf8"
          emissiveIntensity={0.3}
          wireframe={true}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* PRIMARY PROFESSIONAL RING - BLUE */}
      <mesh position={[0, 0, 0]} rotation={[0.4, 0.25, 0.15]} ref={ring1Ref}>
        <torusGeometry args={[0.9, 0.0025, 10, 120]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* SECONDARY PROFESSIONAL RING - SLATE */}
      <mesh position={[0, 0, 0]} rotation={[-0.3, 0.15, 0.35]} ref={ring2Ref}>
        <torusGeometry args={[1.15, 0.002, 8, 100]} />
        <meshStandardMaterial
          color="#64748b"
          emissive="#94a3b8"
          emissiveIntensity={0.35}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* FLOATING ACCENT NODE 1 */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.15}>
        <mesh position={[1.2, 0.5, 0.15]}>
          <octahedronGeometry args={[0.06, 1]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* FLOATING ACCENT NODE 2 */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.15}>
        <mesh position={[-1.1, 0.35, -0.1]}>
          <octahedronGeometry args={[0.055, 1]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>
    </group>
  );
}

// PROFESSIONAL HERO SCENE
function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.8], fov: 50 }}
      className="hero-scene absolute inset-0"
    >
      {/* PROFESSIONAL LIGHTING SETUP */}
      
      {/* Ambient - Professional Fill */}
      <ambientLight intensity={0.3} color="#f8fafc" />

      {/* Main Key Light - Blue from Top-Right */}
      <spotLight
        position={[3, 2.5, 4]}
        angle={0.65}
        penumbra={0.9}
        intensity={8}
        color="#60a5fa"
      />

      {/* Secondary Key Light - Indigo from Top-Left */}
      <spotLight
        position={[-2.5, 2, 3]}
        angle={0.55}
        penumbra={0.7}
        intensity={5}
        color="#818cf8"
      />

      {/* Fill Light - Slate from Below */}
      <pointLight
        position={[0, -2, 1.5]}
        intensity={3}
        color="#cbd5e1"
      />

      {/* Rim Light - Back */}
      <pointLight
        position={[0, 0.5, -2.5]}
        intensity={2.5}
        color="#94a3b8"
      />

      {/* Top Accent */}
      <pointLight
        position={[0, 3, 0]}
        intensity={1.5}
        color="#e0f2fe"
      />

      {/* STARFIELD BACKGROUND - SUBTLE */}
      <Stars
        radius={100}
        depth={60}
        count={1200}
        factor={3.5}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* PROFESSIONAL CORE */}
      <PremiumAICore />

      {/* FOG FOR DEPTH */}
      <fog attach="fog" args={["#000000", 6, 45]} />
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed left-1/2 top-5 z-50 w-[95%] max-w-7xl -translate-x-1/2 md:w-[90%] lg:w-[88%]"
    >
      <div className="flex items-center justify-between rounded-2xl border border-cyan-500/15 bg-black/25 px-6 md:px-8 py-3.5 md:py-4 shadow-xl shadow-cyan-500/5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/25 hover:shadow-cyan-500/10">
        <a href="#home" className="group flex items-center gap-2.5 md:gap-3 shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/60 animate-pulse" />
          <span className="text-sm md:text-base font-black uppercase tracking-[0.12em] text-white">
            Meraz <span className="text-cyan-300 font-black">Dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-1.5 lg:gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 md:px-4 py-2 text-sm md:text-base font-semibold text-gray-300 transition duration-300 hover:bg-cyan-500/8 hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
          <div className="w-px h-6 bg-cyan-500/15 mx-1" />
          <a
            href="/resume.pdf"
            download
            className="rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 px-5 md:px-6 py-2 text-sm md:text-base font-bold text-black shadow-lg shadow-cyan-500/30 transition duration-300 hover:shadow-cyan-500/50 hover:scale-105"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="md:hidden rounded-lg border border-cyan-400/40 bg-cyan-500/5 px-3 py-2 text-sm font-bold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-500/10"
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 left-0 mt-3 rounded-2xl border border-cyan-400/20 bg-black/95 p-4 backdrop-blur-xl md:hidden"
          >
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-200 transition hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
            <div className="my-3 h-px bg-cyan-500/10" />
            <a
              href="/resume.pdf"
              download
              className="block rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 px-4 py-3 text-center font-bold text-black text-sm transition hover:shadow-lg hover:shadow-cyan-500/30"
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
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={submitForm} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-2">Full Name</label>
        <input
          required
          placeholder="Enter your name"
          className="w-full rounded-lg border border-blue-500/20 bg-blue-500/5 px-5 py-3.5 md:py-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400 focus:bg-blue-500/10 focus:shadow-lg focus:shadow-blue-500/10"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-2">Email Address</label>
        <input
          required
          type="email"
          placeholder="your@email.com"
          className="w-full rounded-lg border border-blue-500/20 bg-blue-500/5 px-5 py-3.5 md:py-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400 focus:bg-blue-500/10 focus:shadow-lg focus:shadow-blue-500/10"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-2">Project Details</label>
        <textarea
          required
          rows="5"
          placeholder="Tell me about your project..."
          className="w-full resize-none rounded-lg border border-blue-500/20 bg-blue-500/5 px-5 py-3.5 md:py-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400 focus:bg-blue-500/10 focus:shadow-lg focus:shadow-blue-500/10"
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-4 font-bold text-base md:text-lg text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 hover:from-blue-400 hover:to-blue-500"
      >
        Send Inquiry
      </motion.button>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center"
          >
            <p className="text-sm font-semibold text-green-300">
              ✓ Message sent successfully! I'll respond within 24 hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
      // HERO PARALLAX EFFECTS
      gsap.to(".hero-scene", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero-copy", {
        y: -70,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "30% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-profile", {
        y: -100,
        rotate: -2,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".parallax-slow", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // REVEAL ANIMATIONS
      gsap.utils.toArray(".motion-title").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.5,
          },
          opacity: 0,
          y: 50,
          filter: "blur(15px)",
          duration: 1.1,
          ease: "power4.out",
        });
      });

      gsap.utils.toArray(".reveal-up").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: { 
            trigger: element, 
            start: "top 85%",
            end: "top 40%",
            scrub: 0.4,
          },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power4.out",
        });
      });

      // STAGGER GROUP ANIMATIONS
      gsap.utils.toArray(".stagger-group").forEach((group) => {
        gsap.from(group.querySelectorAll(".stagger-item"), {
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.5,
          },
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
        });
      });

      // SECTION ENTRANCE ANIMATIONS
      gsap.utils.toArray(".section-transition").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.6,
          },
          opacity: 0.7,
          y: 60,
          scale: 0.98,
          ease: "power3.out",
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

      {/* HERO SECTION - PREMIUM CINEMATIC COMPOSITION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-10 lg:px-16 py-20"
        style={{
          background: "linear-gradient(180deg, rgba(10,14,39,0.95) 0%, rgba(0,0,0,0.98) 40%, rgba(5,5,15,0.99) 100%), radial-gradient(circle at 50% 20%, rgba(34,211,238,0.15) 0%, transparent 35%), radial-gradient(circle at 15% 70%, rgba(168,85,247,0.08) 0%, transparent 40%)"
        }}
      >
        {/* 3D SCENE - BACKGROUND LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          {/* GRID OVERLAY - SUBTLE */}
          <div className="parallax-slow absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:120px_120px] opacity-15" />
          
          {/* TOP GLOW */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          
          {/* TOP FADE GRADIENT */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          
          {/* BOTTOM FADE GRADIENT */}
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          
          {/* ATMOSPHERIC GLOW - BLUE LEFT */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[900px] h-[800px] rounded-full bg-blue-400/4 blur-[200px] opacity-20" />
          
          {/* ATMOSPHERIC GLOW - INDIGO RIGHT */}
          <div className="absolute right-0 top-1/3 w-[700px] h-[700px] rounded-full bg-indigo-400/3 blur-[180px] opacity-15" />
        </div>

        {/* CENTER CONTENT - PROFESSIONAL COMPOSITION */}
        <div className="relative z-20 w-full max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center min-h-[70vh]">
            {/* LEFT SIDE - PREMIUM TYPOGRAPHY & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-1 text-center lg:text-left space-y-8"
            >
              {/* STATUS INDICATOR - PREMIUM */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="inline-flex items-center gap-3 rounded-full border border-green-500/40 bg-gradient-to-r from-green-500/15 to-green-500/8 px-5 py-2.5 backdrop-blur-lg lg:justify-start w-full lg:w-auto justify-center relative overflow-hidden group hover:border-green-500/60 transition duration-500"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 transform -translate-x-full group-hover:translate-x-full" />
                
                {/* Status indicator */}
                <div className="relative flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 shadow-lg shadow-green-500/70 animate-pulse" />
                  <div className="absolute inset-0 h-2 w-2 rounded-full bg-green-400 animate-ping opacity-75" />
                </div>
                
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-300 relative z-10">
                  Open to work
                </span>
              </motion.div>

              {/* CINEMATIC HEADLINE - PROFESSIONAL HIERARCHY */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-[-0.03em]"
              >
                <span className="text-white">Building scalable</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 font-black block">
                  full-stack digital
                </span>
                <span className="text-white font-black block">
                  products.
                </span>
              </motion.h1>

              {/* PREMIUM SUBHEADING - RECRUITER FOCUSED */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.4, ease: "easeOut" }}
                className="text-lg md:text-xl text-gray-300 leading-[1.8] max-w-2xl font-light tracking-wide"
              >
                MERN stack developer focused on modern frontend engineering, immersive UI systems, scalable backend architecture, and premium digital experiences. Crafting cinematic interfaces for high-growth startups and innovative products.
              </motion.p>

              {/* PREMIUM CTA BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 pt-6 lg:justify-start justify-center"
              >
                <MagneticButton
                  href="#projects"
                  className="group px-10 py-4 font-bold text-base md:text-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-black rounded-xl shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/70 hover:scale-105 transition duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Work
                    <span className="group-hover:translate-x-1 transition duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-cyan-500 opacity-0 group-hover:opacity-100 transition duration-300" />
                </MagneticButton>
                <MagneticButton
                  href="https://github.com/Meraz210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-10 py-4 font-bold text-base md:text-lg border border-cyan-400/60 text-cyan-300 rounded-xl hover:bg-cyan-500/15 hover:border-cyan-300/80 hover:scale-105 transition duration-300 relative overflow-hidden backdrop-blur-sm"
                >
                  <span className="relative z-10">GitHub</span>
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                </MagneticButton>
              </motion.div>

              {/* PROFESSIONAL EXPERTISE BADGES */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
                className="flex flex-wrap gap-2 pt-6"
              >
                <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/25 bg-cyan-500/8 px-3 py-1.5">
                  <span className="text-xs font-bold text-cyan-400">★</span>
                  <span className="text-xs font-semibold text-cyan-300">Full-Stack</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-purple-400/25 bg-purple-500/8 px-3 py-1.5">
                  <span className="text-xs font-bold text-purple-400">✦</span>
                  <span className="text-xs font-semibold text-purple-300">3D & Motion</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-500/8 px-3 py-1.5">
                  <span className="text-xs font-bold text-emerald-400">◆</span>
                  <span className="text-xs font-semibold text-emerald-300">Performance</span>
                </div>
              </motion.div>

              {/* PROFESSIONAL METRICS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="grid grid-cols-3 gap-4 pt-8 border-t border-cyan-500/15 lg:border-t-0 lg:pt-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg border border-cyan-400/20 bg-cyan-500/5 p-4 backdrop-blur-sm group hover:border-cyan-400/40 transition duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  <p className="relative z-10 text-2xl md:text-3xl font-black text-cyan-300">6+</p>
                  <p className="relative z-10 text-xs md:text-sm uppercase tracking-wider text-gray-400 font-semibold mt-1">Projects</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg border border-purple-400/20 bg-purple-500/5 p-4 backdrop-blur-sm group hover:border-purple-400/40 transition duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  <p className="relative z-10 text-2xl md:text-3xl font-black text-purple-300">Full</p>
                  <p className="relative z-10 text-xs md:text-sm uppercase tracking-wider text-gray-400 font-semibold mt-1">Stack</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg border border-emerald-400/20 bg-emerald-500/5 p-4 backdrop-blur-sm group hover:border-emerald-400/40 transition duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  <p className="relative z-10 text-2xl md:text-3xl font-black text-emerald-300">∞</p>
                  <p className="relative z-10 text-xs md:text-sm uppercase tracking-wider text-gray-400 font-semibold mt-1">Learning</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* CENTER - 3D SCENE (hidden on mobile for better composition) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex lg:col-span-1 items-center justify-center h-full min-h-[500px]"
            >
              {/* 3D Scene Container - Removed */}
            </motion.div>

            {/* RIGHT SIDE - PREMIUM PROFILE CARD */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Premium Glow Background */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-cyan-500/10 blur-3xl opacity-70" />
                
                {/* Main Card */}
                <div className="relative rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-white/8 via-white/4 to-white/2 p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
                  {/* Premium Border Accent */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent" />

                  {/* Profile Image - Premium Frame */}
                  <div className="relative overflow-hidden rounded-2xl mb-8 aspect-square border border-cyan-400/20">
                    {/* Cinematic Overlay */}
                    <motion.div
                      animate={{ opacity: [0.08, 0.25, 0.08] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-cyan-500/10 to-cyan-500/20 pointer-events-none"
                    />
                    <img
                      src={profileImage}
                      alt="Meraz Ahasan - Frontend Developer"
                      className="w-full h-full object-cover brightness-105 hover:brightness-125 transition duration-500"
                    />
                  </div>

                  {/* Profile Information */}
                  <div className="space-y-7">
                    {/* Title & Name */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 letter-spacing-wide">
                        Full-Stack Engineer
                      </p>
                      <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                        Meraz Ahasan
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/50 to-transparent" />

                    {/* Tech Stack - Modern Tags */}
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-bold">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Node.js", "MongoDB", "Express", "Three.js"].map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="rounded-lg border border-cyan-400/40 bg-cyan-500/8 px-3.5 py-2 text-xs font-semibold text-cyan-300 backdrop-blur-sm hover:bg-cyan-500/15 hover:border-cyan-300/60 transition duration-300 cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500/12 to-emerald-500/6 border border-emerald-400/25 group hover:border-emerald-400/50 transition duration-500 relative overflow-hidden">
                      {/* Subtle shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
                      
                      <div className="relative">
                        <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/70 animate-pulse inline-block" />
                        <span className="absolute inset-0 h-3 w-3 rounded-full bg-emerald-300 animate-ping opacity-75" />
                      </div>
                      <span className="text-sm font-bold text-emerald-300 relative z-10">Open to opportunities</span>
                    </div>

                    {/* Quick Action Links */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <motion.a
                        whileHover={{ y: -4, scale: 1.02 }}
                        href="https://github.com/Meraz210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-xl border border-cyan-400/30 bg-cyan-500/8 p-3.5 text-center text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-300/60 hover:shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden"
                      >
                        <span className="relative z-10">GitHub</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -4, scale: 1.02 }}
                        href="mailto:merazahasan210@gmail.com"
                        className="group rounded-xl border border-cyan-400/30 bg-cyan-500/8 p-3.5 text-center text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/20 hover:border-cyan-300/60 hover:shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden"
                      >
                        <span className="relative z-10">Email</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* BOTTOM SCROLL INDICATOR */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Scroll</span>
              <svg className="w-4 h-6 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Alternative mobile hero (shown only on mobile) */}
      <section
        id="home-mobile"
        className="relative lg:hidden min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
        style={{
          background: "linear-gradient(180deg, rgba(10,14,39,0.95) 0%, rgba(0,0,0,0.98) 40%, rgba(5,5,15,0.99) 100%), radial-gradient(circle at 50% 20%, rgba(34,211,238,0.15) 0%, transparent 35%)"
        }}
      >
        {/* 3D SCENE FOR MOBILE - Removed */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        {/* MOBILE CONTENT */}
        <div className="relative z-20 max-w-md w-full text-center space-y-8 pt-12">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-green-500/40 bg-gradient-to-r from-green-500/15 to-green-500/8 px-5 py-2.5 backdrop-blur-lg relative overflow-hidden group hover:border-green-500/60 transition duration-500"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 transform -translate-x-full group-hover:translate-x-full" />
            
            {/* Status indicator */}
            <div className="relative flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 shadow-lg shadow-green-500/70 animate-pulse" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-green-400 animate-ping opacity-75" />
            </div>
            
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-300 relative z-10">
              Open to work
            </span>
          </motion.div>

          {/* Mobile Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="text-5xl font-black leading-[0.95] tracking-[-0.03em]"
          >
            <span className="text-white">Building scalable</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 font-black block">
              full-stack digital
            </span>
            <span className="text-white font-black block">
              products.
            </span>
          </motion.h1>

          {/* Mobile Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.35 }}
            className="text-base text-gray-300 leading-[1.7] font-light"
          >
            MERN stack developer crafting premium digital experiences for startups and innovative products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="flex flex-col gap-3 pt-4"
          >
            <MagneticButton
              href="#projects"
              className="group w-full px-8 py-4 font-bold text-base bg-gradient-to-br from-cyan-400 to-cyan-500 text-black rounded-xl shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/70 hover:scale-105 transition duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Work
                <span className="group-hover:translate-x-1 transition duration-300">→</span>
              </span>
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Meraz210"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full px-8 py-4 font-bold text-base border border-cyan-400/60 text-cyan-300 rounded-xl hover:bg-cyan-500/15 hover:border-cyan-300/80 hover:scale-105 transition duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">GitHub</span>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section-transition relative z-20 px-6 md:px-10 lg:px-16 py-32 md:py-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="space-y-4 mb-6">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Featured Work</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Premium Projects
              </h2>
            </div>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
              Full-stack applications engineered with meticulous attention to user experience, performance optimization, and modern design systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <AboutSection />
      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div id="skills" className="section-transition">
        <SkillsSection />
      </div>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <section id="github" className="section-transition relative z-20 px-6 md:px-10 lg:px-16 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl"
        >
          <div className="space-y-4 mb-24">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Live Data</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
              GitHub Activity
            </h2>
          </div>
          <GitHubStats />
        </motion.div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <section id="contact" className="section-transition relative z-20 px-6 md:px-10 lg:px-16 py-32 md:py-40 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <div className="space-y-4 mb-20">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Let's collaborate
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">Ready to discuss your next project? Reach out and let's create something exceptional together.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <p className="text-base md:text-lg leading-relaxed text-gray-300">
                I'm open to full-stack development projects, consulting opportunities, and meaningful technical conversations about frontend engineering, 3D experiences, and digital innovation.
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:merazahasan210@gmail.com" 
                  className="group block rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 transition hover:border-blue-500/50 hover:bg-blue-500/15"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-2">Email Address</p>
                  <p className="text-lg font-semibold text-white break-all group-hover:text-blue-200 transition">
                    merazahasan210@gmail.com
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Typically responds within 24 hours</p>
                </a>

                <a 
                  href="tel:+8801568088936" 
                  className="group block rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 transition hover:border-blue-500/50 hover:bg-blue-500/15"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-2">Phone Number</p>
                  <p className="text-lg font-semibold text-white group-hover:text-blue-200 transition">
                    +880 1568-088936
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Available for calls and WhatsApp</p>
                </a>
              </div>

              <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-300 mb-3">Quick Links</p>
                <div className="flex gap-4 flex-wrap">
                  <a href="https://github.com/Meraz210" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition">GitHub →</a>
                  <a href="/resume.pdf" download className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition">Resume →</a>
                  <a href="#projects" className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition">Projects →</a>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/8 via-transparent to-indigo-500/8 p-8 md:p-10">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Quick Message</h3>
                <p className="text-sm text-gray-400">Fill out the form below and I'll get back to you promptly.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <Footer />
    </div>
  );
}
