export default function HeroScene3D() {
  return (
    <div className="hero-scene-3d hero-visual relative hidden min-h-[470px] lg:block" aria-label="3D laptop and code scene">
      <div className="laptop-stage">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="float-cube cube-main" />
        <div className="float-cube small cube-small" />
        <div className="float-cube violet cube-violet" />
        <div className="float-ball orb-ball" />
        <div className="laptop-screen">
          <div className="screen-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="code-line line-1">React Node MongoDB</span>
          <span className="code-line line-2">API UI Auth</span>
          <span className="code-line line-3">Production ready</span>
          <span className="code-line line-4">Ship product</span>
        </div>
        <div className="laptop-base" />
        <div className="neon-ring" />
        <div className="pedestal pedestal-one" />
        <div className="pedestal pedestal-two" />
      </div>
    </div>
  );
}
