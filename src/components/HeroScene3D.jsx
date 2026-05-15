import { Float, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function LaptopModel() {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08 - 0.22;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <group ref={group} position={[0, 0.45, 0]} rotation={[0.16, -0.2, 0]}>
      <RoundedBox args={[2.35, 1.45, 0.09]} radius={0.045} position={[0, 0.72, -0.34]} rotation={[-0.18, 0, 0]}>
        <meshStandardMaterial color="#0b1220" metalness={0.45} roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[2.08, 1.18, 0.025]} radius={0.035} position={[0, 0.73, -0.285]} rotation={[-0.18, 0, 0]}>
        <meshStandardMaterial color="#020617" emissive="#061827" emissiveIntensity={0.65} />
      </RoundedBox>
      {[
        ["const stack = ['React', 'Node'];", -0.44, "#22d3ee"],
        ["await api.connect('MongoDB');", -0.2, "#f472b6"],
        ["ship({ ui: 'polished' });", 0.04, "#a78bfa"],
        ["return productionReady;", 0.28, "#67e8f9"],
      ].map(([line, y, color]) => (
        <Text
          key={line}
          position={[-0.84, y + 0.72, -0.245]}
          rotation={[-0.18, 0, 0]}
          fontSize={0.055}
          color={color}
          anchorX="left"
          anchorY="middle"
          maxWidth={1.65}
        >
          {line}
        </Text>
      ))}
      <RoundedBox args={[2.6, 0.95, 0.1]} radius={0.065} position={[0, -0.12, 0.36]} rotation={[1.14, 0, 0]}>
        <meshStandardMaterial color="#34465b" metalness={0.72} roughness={0.22} />
      </RoundedBox>
      <RoundedBox args={[1.0, 0.34, 0.018]} radius={0.035} position={[0, -0.05, 0.46]} rotation={[1.14, 0, 0]}>
        <meshStandardMaterial color="#111827" metalness={0.35} roughness={0.42} />
      </RoundedBox>
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 10 }).map((__, col) => (
          <mesh key={`${row}-${col}`} position={[-0.84 + col * 0.185, 0.12 - row * 0.055, 0.22 + row * 0.07]} rotation={[1.14, 0, 0]}>
            <boxGeometry args={[0.12, 0.018, 0.018]} />
            <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.5} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Pedestal() {
  const ring = useRef(null);

  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.z = state.clock.elapsedTime * 0.18;
  });

  return (
    <group position={[0, -1.05, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <cylinderGeometry args={[1.58, 1.82, 0.26, 96]} />
        <meshStandardMaterial color="#061527" metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
        <torusGeometry args={[1.34, 0.035, 16, 128]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
        <torusGeometry args={[1.72, 0.025, 12, 128]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.75} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function FloatingObjects() {
  return (
    <>
      <Float speed={1.8} rotationIntensity={0.7} floatIntensity={0.8}>
        <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.035} position={[-1.65, 0.45, 0.15]} rotation={[0.55, 0.72, 0.3]}>
          <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.45} metalness={0.35} roughness={0.18} />
        </RoundedBox>
      </Float>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.7}>
        <RoundedBox args={[0.34, 0.34, 0.34]} radius={0.03} position={[1.72, -0.12, 0.1]} rotation={[0.4, -0.6, 0.25]}>
          <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={0.65} metalness={0.3} roughness={0.2} />
        </RoundedBox>
      </Float>
      <Float speed={1.2} rotationIntensity={0.45} floatIntensity={0.65}>
        <mesh position={[1.28, 1.48, -0.28]}>
          <sphereGeometry args={[0.32, 48, 48]} />
          <meshStandardMaterial color="#38bdf8" emissive="#2563eb" emissiveIntensity={0.7} metalness={0.35} roughness={0.16} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.4}>
        <mesh position={[-1.0, 1.72, -0.2]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={1.5} />
        </mesh>
      </Float>
    </>
  );
}

function OrbitLines() {
  return (
    <group position={[0, -0.12, 0]} rotation={[1.2, 0.14, -0.2]}>
      {[1.55, 2.05, 2.45].map((radius, index) => (
        <mesh key={radius} rotation={[0, 0, index * 0.45]}>
          <torusGeometry args={[radius, 0.004, 8, 160]} />
          <meshBasicMaterial color={index === 1 ? "#38bdf8" : "#1d4ed8"} transparent opacity={index === 1 ? 0.32 : 0.18} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene3D() {
  return (
    <div className="hero-scene-3d relative hidden min-h-[440px] lg:block" aria-label="3D laptop and code scene">
      <Canvas camera={{ position: [0, 1.2, 5.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.82} />
        <pointLight position={[-2, 3, 3]} intensity={1.9} color="#22d3ee" />
        <pointLight position={[2.6, 2.1, 2.5]} intensity={1.4} color="#60a5fa" />
        <spotLight position={[0, 4.5, 2.8]} intensity={1.4} angle={0.42} penumbra={0.7} color="#e0f2fe" />
        <OrbitLines />
        <Pedestal />
        <LaptopModel />
        <FloatingObjects />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
