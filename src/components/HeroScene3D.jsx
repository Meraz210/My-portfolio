import { useEffect, useState } from "react";

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

export default function HeroScene3D() {
  const reduced = useReduced3DScene();

  return (
    <div className={`saas-hero-scene-3d ${reduced ? "saas-hero-scene-reduced" : ""}`} aria-hidden="true">
      {!reduced && (
        <>
          <div className="saas-scene-orbit saas-scene-orbit-one" />
          <div className="saas-scene-orbit saas-scene-orbit-two" />
        </>
      )}

      <div className="saas-ai-cube"><span>AI</span></div>

      {!reduced && (
        <>
          <div className="saas-floating-chip chip-code">
            <span>{"</>"}</span>
            <b>Code</b>
            <small>Write - Build - Deploy</small>
          </div>
          <div className="saas-floating-chip chip-api">
            <span>API</span>
            <b>RESTful</b>
            <small>Secure - Scalable - Fast</small>
            <i>GET <em>/api/users</em></i>
            <i>POST <em>/api/login</em></i>
          </div>
          <div className="saas-floating-chip chip-db">
            <span>MongoDB</span>
            <b>Database</b>
            <small>Collections</small>
            <small>Queries</small>
            <small>Aggregation</small>
          </div>
          <div className="saas-floating-chip chip-react">
            <span>React</span>
            <b>Frontend</b>
            <small>Components</small>
            <small>Hooks</small>
            <small>State Mgmt</small>
          </div>
          <div className="saas-floating-chip chip-assistant">
            <span>AI Assistant</span>
            <b>How can I help?</b>
            <small>Smart responses</small>
          </div>
          <div className="saas-floating-chip chip-openai">
            <span>AI</span>
            <b>OpenAI</b>
          </div>
          <div className="saas-floating-chip chip-vector">
            <span>Vector DB</span>
            <small>Embeddings</small>
            <small>Semantic Search</small>
          </div>
        </>
      )}

      <div className="saas-terminal-object saas-laptop-object">
        <div className="saas-terminal-top">
          <span />
          <span />
          <span />
          <b>portfolio.jsx</b>
        </div>
        <div className="saas-terminal-body">
          <p><span>import</span> React from "react";</p>
          <p><span>const</span> Developer = () =&gt; &#123;</p>
          <p>&nbsp;&nbsp;build(<span>"clean products"</span>);</p>
          <p>&nbsp;&nbsp;learn(<span>"impact"</span>);</p>
          <p>&#125;;</p>
          <i />
          <i />
          <i />
        </div>
        <div className="saas-laptop-keyboard" />
      </div>

      {!reduced && (
        <>
          <div className="saas-layer-card saas-layer-card-one">
            <span />
            <b />
            <i />
          </div>
          <div className="saas-layer-card saas-layer-card-two">
            <span />
            <b />
            <i />
          </div>
          <div className="saas-code-cube">
            <span>{"</>"}</span>
          </div>
          <div className="saas-mini-cube cube-one" />
          <div className="saas-mini-cube cube-two" />
        </>
      )}
      <div className="saas-scene-base" />
    </div>
  );
}
