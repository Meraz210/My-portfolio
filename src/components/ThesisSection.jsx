import { ArrowRight, BookOpen, FileText, ScanLine } from "lucide-react";
import "./ThesisSection.css";

const researchTools = ["Python", "PyTorch", "Ultralytics YOLO", "Roboflow", "Google Colab"];

export default function ThesisSection({ resumeUrl }) {
  return (
    <section id="thesis" className="saas-section saas-thesis" aria-labelledby="thesis-heading">
      <div className="saas-section-header">
        <p>Research Thesis</p>
        <h2 id="thesis-heading">Computer vision for fabric defect detection</h2>
      </div>
      <article className="saas-thesis-card" aria-labelledby="thesis-title">
        <div className="saas-thesis-copy">
          <div className="saas-thesis-meta">
            <span><BookOpen size={16} aria-hidden="true" /> Bachelor's Research</span>
            <span>AIUB</span>
            <span>2025 - 2026</span>
          </div>
          <h3 id="thesis-title">BDFD-10: A Bangladesh-Centric Multi-Class Fabric Defect Dataset and a Cross-Generation Benchmark of Deep Object Detectors</h3>
          <p className="saas-thesis-summary">
            My thesis brings together a Bangladesh-centric fabric defect dataset and a comparative evaluation of deep object detectors using real-world textile imagery.
          </p>
          <ul className="saas-thesis-contributions">
            <li>Developed BDFD-10 with 1,208 real-world images collected from four textile and garment factory groups.</li>
            <li>Benchmarked 10 object detection models under a unified evaluation protocol, including YOLOv8, YOLO11, YOLO12, YOLO26, RT-DETR-L, and Faster R-CNN.</li>
            <li>Implemented the data preparation and evaluation pipeline with Python, PyTorch, Ultralytics YOLO, Roboflow, and Google Colab.</li>
          </ul>
          <ul className="saas-thesis-tools" aria-label="Research tools">
            {researchTools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
          <div className="saas-thesis-actions">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="saas-btn saas-btn-secondary">
              View Resume <FileText size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="saas-thesis-contact">
              Discuss My Research <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside className="saas-thesis-results" aria-label="Thesis results">
          <div className="saas-thesis-result-head"><ScanLine size={22} aria-hidden="true" /> Benchmark Highlight</div>
          <strong className="saas-thesis-score">93.2<span>%</span></strong>
          <p className="saas-thesis-score-label">mAP@0.5 with YOLOv8s</p>
          <p className="saas-thesis-result-note">Mean average precision at an intersection-over-union threshold of 0.5.</p>
          <dl className="saas-thesis-stats">
            <div><dt>Real-world images</dt><dd>1,208</dd></div>
            <div><dt>Models benchmarked</dt><dd>10</dd></div>
            <div><dt>Factory groups</dt><dd>4</dd></div>
          </dl>
        </aside>
      </article>
    </section>
  );
}
