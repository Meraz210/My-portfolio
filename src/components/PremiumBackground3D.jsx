const particles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  x: `${(index * 37) % 100}%`,
  y: `${12 + ((index * 23) % 72)}%`,
  delay: `${-(index % 9) * 0.8}s`,
}));

const rails = Array.from({ length: 9 }, (_, index) => index);

export default function PremiumBackground3D() {
  return (
    <div className="premium-bg-3d premium-bg-lite" aria-hidden="true">
      <div className="premium-bg-stage">
        <div className="premium-grid-floor" />
        <div className="premium-data-core">
          <span className="premium-core-face premium-core-front">AI</span>
          <span className="premium-core-face premium-core-back" />
          <span className="premium-core-ring premium-core-ring-one" />
          <span className="premium-core-ring premium-core-ring-two" />
        </div>
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
