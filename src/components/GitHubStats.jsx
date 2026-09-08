import axios from "axios";
import { motion } from "framer-motion";
import { AlertCircle, GitBranch, Star } from "lucide-react";
import { useEffect, useState } from "react";

const fallbackRepos = [
  { id: 1, name: "job-portal-system", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/Meraz210/job-portal-system" },
  { id: 2, name: "Attendance-system", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/Meraz210/Attendance-system" },
  { id: 3, name: "StudyHub", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/Meraz210/StudyHub" },
  { id: 4, name: "Tea-Shop", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/Meraz210/Tea-Shop" },
];

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 700;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setDisplayValue(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [value]);

  return displayValue;
}

export default function GitHubStats() {
  const [repos, setRepos] = useState(fallbackRepos);
  const [stats, setStats] = useState({ public_repos: 19, followers: 2, following: 5 });
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          axios.get("https://api.github.com/users/Meraz210"),
          axios.get("https://api.github.com/users/Meraz210/repos?sort=updated&per_page=4"),
        ]);

        setStats(userRes.data);
        setRepos(reposRes.data.length ? reposRes.data : fallbackRepos);
        setUsingFallback(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setUsingFallback(true);
        setRepos(fallbackRepos);
        setStats({ public_repos: 19, followers: 2, following: 5 });
      }
    };

    fetchGitHubData();
  }, []);

  const statCards = [
    { label: "Public Repos", value: stats.public_repos || 19 },
    { label: "Followers", value: stats.followers || 2 },
    { label: "Following", value: stats.following || 5 },
  ];

  return (
    <div className="saas-github-panel">
      {usingFallback && (
        <div className="saas-github-fallback">
          <AlertCircle className="h-5 w-5 text-cyan-300" />
          <div>
            <strong>GitHub fallback active</strong>
            <p>Live GitHub data is temporarily unavailable, so curated repository data is shown.</p>
          </div>
        </div>
      )}

      <div className="saas-github-stats">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            viewport={{ once: true }}
            className="saas-github-stat"
          >
            <strong><AnimatedNumber value={card.value} /></strong>
            <span>{card.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="saas-contribution-card">
        <h3>Contribution Activity</h3>
        <div className="saas-contribution-grid" aria-label="Contribution graph fallback">
          {Array.from({ length: 72 }, (_, index) => <i key={index} />)}
        </div>
        <p>Visual fallback for contribution activity. Repository data below still links to GitHub.</p>
      </div>

      <div className="saas-repo-grid">
        {repos.slice(0, 4).map((repo) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="saas-repo-card"
          >
            <h4>{repo.name}</h4>
            <span>{repo.language || "Code"}</span>
            <span><Star className="h-3 w-3 fill-current" /> {repo.stargazers_count}</span>
          </motion.a>
        ))}
      </div>

      <a href="https://github.com/Meraz210" target="_blank" rel="noopener noreferrer" className="saas-github-link">
        <GitBranch className="h-4 w-4" />
        View GitHub Profile
      </a>
    </div>
  );
}
