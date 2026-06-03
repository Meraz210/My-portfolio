import { useEffect, useMemo, useState } from "react";

const createParticles = (count) => Array.from({ length: count }, (_, index) => ({
  id: index,
  x: `${(index * 37) % 100}%`,
  y: `${12 + ((index * 23) % 72)}%`,
  delay: `${-(index % 9) * 0.8}s`,
}));

const createRails = (count) => Array.from({ length: count }, (_, index) => index);

function useReduced3DScene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
}

export default function PremiumBackground3D() {
  const reduced = useReduced3DScene();
  const particles = useMemo(() => createParticles(reduced ? 14 : 42), [reduced]);
  const rails = useMemo(() => createRails(reduced ? 4 : 9), [reduced]);

  return (
    <div className={`premium-bg-3d premium-bg-lite ${reduced ? "premium-bg-reduced" : ""}`} aria-hidden="true">
      <div className="premium-bg-stage">
        <div className="premium-grid-floor" />
        <div className="premium-data-core">
          <span className="premium-core-face premium-core-front">AI</span>
          <span className="premium-core-face premium-core-back" />
          <span className="premium-core-ring premium-core-ring-one" />
          <span className="premium-core-ring premium-core-ring-two" />
        </div>
        {!reduced && (
          <>
            <div className="premium-panel premium-panel-left">
              <b>API</b>
              <span />
              <span />
              <span />
            </div>
            <div className="premium-panel premium-panel-right">
              <b>DB</b>
              <span />
              <span />
              <span />
            </div>
            <div className="premium-panel premium-panel-top">
              <b>Cloud</b>
              <span />
              <span />
            </div>
            <div className="premium-prism premium-prism-left" />
            <div className="premium-prism premium-prism-right" />
            <div className="premium-prism premium-prism-top" />
          </>
        )}
        <div className="premium-rails">
          {rails.map((rail) => <span key={rail} style={{ "--rail": rail }} />)}
        </div>
        <div className="premium-particles">
          {particles.map((particle) => (
            <span
              key={particle.id}
              style={{
                left: particle.x,
                top: particle.y,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
