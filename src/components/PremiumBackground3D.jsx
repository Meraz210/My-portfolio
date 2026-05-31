import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const cyan = "#22d3ee";
const blue = "#38bdf8";
const deep = "#061326";

function useSceneQuality() {
  const [quality, setQuality] = useState({ mobile: false, reduceMotion: false });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setQuality({
        mobile: mobileQuery.matches,
        reduceMotion: motionQuery.matches,
      });
    };

    update();
    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return quality;
}

function GlassPanel({ position, rotation, size = [1.8, 1.05], accent = cyan, delay = 0 }) {
  const ref = useRef(null);
  const [width, height] = size;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(time * 0.42) * 0.055;
    ref.current.rotation.z = rotation[2] + Math.sin(time * 0.28) * 0.01;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={accent} transparent opacity={0.064} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color={accent} transparent opacity={0.42} />
      </lineSegments>
      {[-0.22, 0, 0.22].map((offset, index) => (
        <mesh key={offset} position={[0.08, offset, 0.002]}>
          <planeGeometry args={[width * (0.42 + index * 0.12), 0.012]} />
          <meshBasicMaterial color={index === 1 ? blue : accent} transparent opacity={0.24} />
        </mesh>
      ))}
      <mesh position={[-width * 0.35, height * 0.32, 0.003]}>
        <circleGeometry args={[0.045, 18]} />
        <meshBasicMaterial color={accent} transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

function FloatingPrism({ position, scale = 1, accent = cyan, delay = 0 }) {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.elapsedTime + delay;
    ref.current.rotation.x = time * 0.11;
    ref.current.rotation.y = time * 0.15;
    ref.current.position.y = position[1] + Math.sin(time * 0.52) * 0.12;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[0.48, 0]} />
      <meshStandardMaterial color={deep} emissive={accent} emissiveIntensity={0.34} metalness={0.28} roughness={0.18} transparent opacity={0.42} />
      <lineSegments>
        <edgesGeometry args={[new THREE.OctahedronGeometry(0.5, 0)]} />
        <lineBasicMaterial color={accent} transparent opacity={0.7} />
      </lineSegments>
    </mesh>
  );
}

function CommandCore({ mobile }) {
  const group = useRef(null);
  const inner = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = time * 0.045;
      group.current.position.y = Math.sin(time * 0.35) * 0.08;
    }
    if (inner.current) inner.current.rotation.y = -time * 0.18;
    if (ringA.current) ringA.current.rotation.z = time * 0.1;
    if (ringB.current) ringB.current.rotation.z = -time * 0.075;
  });

  const cubeSize = mobile ? 0.95 : 1.32;

  return (
    <group ref={group} position={[0, 0.22, -3.6]}>
      <mesh ref={inner}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshStandardMaterial color="#082033" emissive={cyan} emissiveIntensity={0.38} metalness={0.34} roughness={0.16} transparent opacity={0.29} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(cubeSize * 1.04, cubeSize * 1.04, cubeSize * 1.04)]} />
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.72} />
      </lineSegments>
      <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[mobile ? 1.32 : 2.05, 0.008, 10, 128]} />
        <meshBasicMaterial color={cyan} transparent opacity={0.36} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.22, 0.42, 0]}>
        <torusGeometry args={[mobile ? 1.75 : 2.75, 0.006, 10, 128]} />
        <meshBasicMaterial color={blue} transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.58, 0]}>
        <ringGeometry args={[mobile ? 1.15 : 1.85, mobile ? 1.18 : 1.89, 128]} />
        <meshBasicMaterial color={cyan} transparent opacity={0.17} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function DataRails({ mobile }) {
  const railPositions = useMemo(() => {
    const rows = mobile ? 5 : 8;
    const positions = [];

    for (let i = 0; i < rows; i += 1) {
      const y = -1.95 + i * 0.32;
      const z = -4.9 + i * 0.22;
      positions.push(-6.2, y, z, 6.2, y + 0.04, z - 0.18);
    }

    for (let i = 0; i < rows - 1; i += 1) {
      const x = -4.8 + i * 1.36;
      positions.push(x, -2.25, -3.2, x + 0.72, 0.95, -5.1);
    }

    return new Float32Array(positions);
  }, [mobile]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[railPositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={cyan} transparent opacity={0.095} />
    </lineSegments>
  );
}

function DataConstellation({ mobile }) {
  const nodes = useMemo(() => {
    const count = mobile ? 8 : 15;
    return Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2;
      const radius = index % 3 === 0 ? 5.3 : 3.85;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        -0.9 + ((index * 7) % 5) * 0.46,
        Math.sin(angle) * 1.05 - 3.3,
      );
    });
  }, [mobile]);

  const linePositions = useMemo(() => {
    const positions = [];
    nodes.forEach((node, index) => {
      const next = nodes[(index + 3) % nodes.length];
      positions.push(node.x, node.y, node.z, next.x, next.y, next.z);
    });
    return new Float32Array(positions);
  }, [nodes]);

  return (
    <group>
      {nodes.map((node, index) => (
        <mesh key={`${node.x}-${node.y}`} position={node}>
          <sphereGeometry args={[index % 4 === 0 ? 0.065 : 0.043, 14, 14]} />
          <meshBasicMaterial color={index % 2 ? blue : cyan} transparent opacity={index % 4 === 0 ? 0.82 : 0.5} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={blue} transparent opacity={0.075} />
      </lineSegments>
    </group>
  );
}

function Particles({ mobile }) {
  const positions = useMemo(() => {
    const count = mobile ? 32 : 86;
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const seed = i + 1;
      values[i * 3] = Math.sin(seed * 12.9898) * 6.2;
      values[i * 3 + 1] = Math.abs(Math.cos(seed * 4.731)) * 4.4 - 1.55;
      values[i * 3 + 2] = Math.sin(seed * 3.178) * 3.2 - 3.45;
    }

    return values;
  }, [mobile]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={blue} size={mobile ? 0.026 : 0.022} transparent opacity={0.34} sizeAttenuation />
    </points>
  );
}

function BackgroundScene({ mobile, reduceMotion }) {
  const root = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!mobile && !reduceMotion) window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mobile, reduceMotion]);

  useFrame(({ clock }) => {
    if (!root.current || reduceMotion) return;
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.current.x * 0.045, 0.035);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -pointer.current.y * 0.026, 0.035);
    root.current.position.y = Math.sin(clock.elapsedTime * 0.28) * 0.06;
  });

  return (
    <group ref={root}>
      <gridHelper args={[22, mobile ? 14 : 36, "#0891b2", "#123147"]} position={[0, -3.08, -3.35]} />
      <DataRails mobile={mobile} />
      <CommandCore mobile={mobile} />
      <GlassPanel position={[-4.45, 0.72, -4.35]} rotation={[0.02, 0.42, -0.055]} size={mobile ? [1.2, 0.72] : [2.05, 1.16]} accent={cyan} />
      <GlassPanel position={[4.35, 0.5, -4.25]} rotation={[0.04, -0.38, 0.05]} size={mobile ? [1.25, 0.72] : [2.15, 1.2]} accent={blue} delay={1.2} />
      {!mobile && <GlassPanel position={[0.25, 1.7, -4.92]} rotation={[0.02, -0.04, 0.018]} size={[2.95, 1.25]} accent="#60a5fa" delay={2.1} />}
      <FloatingPrism position={[-5.45, 1.72, -2.8]} scale={mobile ? 0.42 : 0.55} accent={blue} />
      <FloatingPrism position={[5.28, 1.24, -2.72]} scale={mobile ? 0.38 : 0.5} accent={cyan} delay={1.5} />
      {!mobile && <FloatingPrism position={[1.65, 2.78, -3.76]} scale={0.68} accent="#67e8f9" delay={2.4} />}
      {!mobile && <FloatingPrism position={[4.15, -1.15, -2.05]} scale={0.34} accent="#60a5fa" delay={3.2} />}
      <DataConstellation mobile={mobile} />
      <Particles mobile={mobile} />
    </group>
  );
}

export default function PremiumBackground3D() {
  const { mobile, reduceMotion } = useSceneQuality();

  return (
    <div className="premium-bg-3d" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.18, 7.15], fov: 46 }}
        dpr={mobile ? [1, 1.15] : [1, 1.5]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.34} />
        <pointLight position={[0, 3.4, 2.2]} color={cyan} intensity={1.12} distance={8.2} />
        <pointLight position={[-4.5, 1.2, 1.8]} color={blue} intensity={0.62} distance={7} />
        <pointLight position={[4, -0.8, 1.4]} color="#60a5fa" intensity={0.36} distance={6} />
        <BackgroundScene mobile={mobile} reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
