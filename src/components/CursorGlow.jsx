import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-30 hidden h-96 w-96 rounded-full mix-blend-screen md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 240, 255, 0.18) 0%, transparent 70%)",
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transition: "all 0.1s ease-out",
        }}
      />
      <div
        className="pointer-events-none fixed z-[70] hidden h-4 w-4 rounded-full border border-cyan-200 bg-cyan-300/20 shadow-[0_0_18px_rgba(34,211,238,0.9)] mix-blend-screen md:block"
        style={{
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 8}px`,
          transition: "transform 0.08s ease-out",
        }}
      />
    </>
  );
}
