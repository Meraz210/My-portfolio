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

// PROFESSIONAL AI-CORE 3D VISUALIZATION
function PremiumAICore() {
  const groupRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    let animationId;
    
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.z += 0.0004;
      }
      if (coreRef.current) {
        coreRef.current.rotation.x += 0.0006;
        coreRef.current.rotation.y += 0.0003;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* CENTRAL LUMINOUS CORE */}
      <mesh position={[0, 0, 0]} ref={coreRef}>
        <icosahedronGeometry args={[0.4, 5]} />
        <meshStandardMaterial
          color="#0891b2"
          emissive="#22d3ee"
          emissiveIntensity={1.3}
          metalness={0.9}
          roughness={0.08}
          wireframe={false}
        />
      </mesh>

      {/* OUTER GLOW SHELL */}
      <mesh position={[0, 0, 0]} scale={1.5}>
        <icosahedronGeometry args={[0.4, 5]} />
        <meshStandardMaterial
          color="#067a8f"
          emissive="#06b6d4"
          emissiveIntensity={0.7}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* SINGLE ELEGANT ORBITAL RING */}
      <mesh position={[0, 0, 0]} rotation={[0.3, 0.4, 0.2]}>
        <torusGeometry args={[1.2, 0.005, 16, 200]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={1.2}
          metalness={0.98}
          roughness={0.02}
        />
      </mesh>

      {/* SECONDARY SUBTLE RING */}
      <mesh position={[0, 0, 0]} rotation={[-0.25, 0.2, 0.5]}>
        <torusGeometry args={[1.6, 0.003, 16, 200]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7e22ce"
          emissiveIntensity={0.8}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* MINIMAL FLOATING NODES */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[1.5, 0.8, 0.3]}>
          <tetrahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={0.9}
            wireframe={true}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[-1.5, 0.5, -0.2]}>
          <tetrahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#22d3ee"
            emissiveIntensity={0.8}
            wireframe={true}
          />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[0.7, -1.2, 0.1]}>
          <tetrahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#c084fc"
            emissiveIntensity={0.75}
            wireframe={true}
          />
        </mesh>
      </Float>
    </group>
  );
}

// PREMIUM CINEMATIC HERO SCENE
function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.8], fov: 50 }}
      className="hero-scene absolute inset-0"
    >
      {/* CINEMATIC LIGHTING SETUP */}
      
      {/* Ambient - Subtle Fill */}
      <ambientLight intensity={0.35} color="#ffffff" />

      {/* Main Key Light - Cyan from Top-Right */}
      <spotLight
        position={[3, 2.5, 4]}
        angle={0.7}
        penumbra={1}
        intensity={11}
        color="#22d3ee"
      />

      {/* Secondary Key Light - Blue from Top-Left */}
      <spotLight
        position={[-2.5, 2, 3]}
        angle={0.6}
        penumbra={0.8}
        intensity={7}
        color="#06b6d4"
      />

      {/* Fill Light - Purple from Below */}
      <pointLight
        position={[0, -2, 1.5]}
        intensity={5}
        color="#a855f7"
      />

      {/* Rim Light - Back */}
      <pointLight
        position={[0, 0.5, -2.5]}
        intensity={4}
        color="#c084fc"
      />

      {/* Top Accent */}
      <pointLight
        position={[0, 3, 0]}
        intensity={2.5}
        color="#67e8f9"
      />

      {/* STARFIELD BACKGROUND */}
      <Stars
        radius={100}
        depth={60}
        count={2500}
        factor={4.8}
        saturation={0}
        fade
        speed={0.6}
      />

      {/* PREMIUM AI-CORE */}
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
    <form onSubmit={submitForm} className="space-y-5">
      <motion.input
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        required
        placeholder="Your name"
        className="w-full rounded-xl border border-cyan-500/20 bg-black/30 px-5 py-3.5 md:py-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400 focus:bg-black/50 focus:shadow-lg focus:shadow-cyan-500/10"
      />
      <motion.input
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        required
        type="email"
        placeholder="Email address"
        className="w-full rounded-xl border border-cyan-500/20 bg-black/30 px-5 py-3.5 md:py-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400 focus:bg-black/50 focus:shadow-lg focus:shadow-cyan-500/10"
      />
      <motion.textarea
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        required
        rows="6"
        placeholder="Your message..."
        className="w-full resize-none rounded-xl border border-cyan-500/20 bg-black/30 px-5 py-3.5 md:py-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400 focus:bg-black/50 focus:shadow-lg focus:shadow-cyan-500/10"
      />
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 px-6 py-4 font-bold text-base md:text-lg text-black shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/50"
      >
        Send Message
      </motion.button>
      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-cyan-300 text-center font-medium"
          >
            ✓ Message sent! I'll get back to you soon.
          </motion.p>
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_20%_70%,rgba(168,85,247,0.08),transparent_35%),linear-gradient(180deg,#0a0e27_0%,#000000_45%,#0a0a0a_100%)] px-6 md:px-10 lg:px-16 py-20"
      >
        {/* 3D SCENE - BACKGROUND LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          <HeroScene />
          <div className="parallax-slow absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px] opacity-15" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute right-1/3 top-1/3 h-[700px] w-[700px] rounded-full bg-cyan-500/6 blur-[180px] opacity-40" />
          <div className="absolute left-1/4 bottom-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/4 blur-[160px]" />
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
              {/* STATUS INDICATOR */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/8 px-4 py-2 backdrop-blur-sm lg:justify-start w-full lg:w-auto justify-center"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
                  Available for work
                </span>
              </motion.div>

              {/* MAIN HEADLINE */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight"
              >
                <span className="block text-white">Engineer</span>
                <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  premium web
                </span>
                <span className="block text-white">experiences</span>
              </motion.h1>

              {/* SUBHEADING - PROFESSIONAL DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl"
              >
                Full-stack developer specializing in immersive 3D experiences, refined motion design, and award-level frontend engineering. Building the future of digital products.
              </motion.p>

              {/* CTA BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 pt-4 lg:justify-start justify-center"
              >
                <MagneticButton
                  href="#projects"
                  className="px-8 py-3.5 font-bold text-sm md:text-base bg-gradient-to-br from-cyan-400 to-cyan-500 text-black rounded-xl shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 transition duration-300"
                >
                  Explore Work
                </MagneticButton>
                <MagneticButton
                  href="https://github.com/Meraz210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 font-bold text-sm md:text-base border border-cyan-400/40 text-cyan-300 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400/70 transition duration-300"
                >
                  GitHub
                </MagneticButton>
              </motion.div>

              {/* METRICS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                className="grid grid-cols-2 gap-4 pt-6 border-t border-cyan-500/10 lg:border-t-0 lg:pt-0"
              >
                <div className="space-y-1">
                  <p className="text-2xl font-black text-cyan-300">6+</p>
                  <p className="text-xs uppercase tracking-wider text-gray-400">Projects shipped</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-cyan-300">3D</p>
                  <p className="text-xs uppercase tracking-wider text-gray-400">Interactive web</p>
                </div>
              </motion.div>
            </motion.div>

            {/* CENTER - 3D SCENE (hidden on mobile for better composition) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex lg:col-span-1 items-center justify-center h-full min-h-[500px]"
            >
              {/* 3D Scene Container */}
              <div className="relative w-full h-full max-w-md mx-auto">
                <HeroScene />
              </div>
            </motion.div>

            {/* RIGHT SIDE - PROFESSIONAL PROFILE CARD */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent blur-3xl opacity-60" />
                
                <div className="relative rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-black/50 via-black/30 to-black/50 p-8 md:p-10 backdrop-blur-xl">
                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                  {/* Profile Image */}
                  <div className="relative overflow-hidden rounded-xl mb-8 aspect-square">
                    <motion.div
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 z-10 bg-[linear-gradient(transparent_0%,rgba(34,211,238,0.15)_50%,transparent_100%)]"
                    />
                    <img
                      src={profileImage}
                      alt="Meraz Ahasan - Frontend Developer"
                      className="w-full h-full object-cover saturate-125 brightness-100 hover:brightness-110 transition duration-500"
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400 mb-2">
                        Frontend Engineer
                      </p>
                      <h3 className="text-2xl md:text-3xl font-black text-white">Meraz Ahasan</h3>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Node.js", "Three.js", "GSAP", "Tailwind"].map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="pt-4 border-t border-cyan-500/15 flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/60 animate-pulse" />
                      <span className="text-sm font-medium text-gray-300">Open to opportunities</span>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <a
                        href="https://github.com/Meraz210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-center text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/15 hover:border-cyan-500/40"
                      >
                        GitHub
                      </a>
                      <a
                        href="mailto:merazahasan210@gmail.com"
                        className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-center text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/15 hover:border-cyan-500/40"
                      >
                        Email
                      </a>
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
        className="relative lg:hidden min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.12),transparent_40%),linear-gradient(180deg,#0a0e27_0%,#000000_45%,#0a0a0a_100%)] px-6 py-20"
      >
        {/* 3D SCENE FOR MOBILE */}
        <div className="absolute inset-0 pointer-events-none">
          <HeroScene />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* MOBILE CONTENT */}
        <div className="relative z-20 max-w-md w-full text-center space-y-8 pt-12">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/8 px-4 py-2 backdrop-blur-sm"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Available
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl font-black leading-tight"
          >
            <span className="block text-white">Engineer</span>
            <span className="block bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
              premium web
            </span>
            <span className="block text-white">experiences</span>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="flex flex-col gap-3 pt-4"
          >
            <MagneticButton
              href="#projects"
              className="w-full px-8 py-3.5 font-bold text-base bg-gradient-to-br from-cyan-400 to-cyan-500 text-black rounded-xl shadow-lg shadow-cyan-500/40"
            >
              View Work
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Meraz210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-8 py-3.5 font-bold text-base border border-cyan-400/40 text-cyan-300 rounded-xl hover:bg-cyan-500/10"
            >
              GitHub
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
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Let's work together
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <p className="text-base md:text-lg leading-relaxed text-gray-300">
                Whether you have an exciting project in mind or want to discuss frontend engineering, immersive 3D experiences, or career opportunities—I'm always open to meaningful conversations.
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:merazahasan210@gmail.com" 
                  className="group block rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 transition hover:border-cyan-500/50 hover:bg-cyan-500/10"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400 mb-2">Email</p>
                  <p className="text-lg font-semibold text-white break-all group-hover:text-cyan-200 transition">
                    merazahasan210@gmail.com
                  </p>
                </a>

                <a 
                  href="tel:+8801568088936" 
                  className="group block rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 transition hover:border-cyan-500/50 hover:bg-cyan-500/10"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400 mb-2">Phone</p>
                  <p className="text-lg font-semibold text-white group-hover:text-cyan-200 transition">
                    +880 1568-088936
                  </p>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8">Quick Message</h3>
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
