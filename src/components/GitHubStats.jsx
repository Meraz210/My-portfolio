import axios from "axios";
import { motion } from "framer-motion";
import { GitBranch, Star } from "lucide-react";
import { useEffect, useState } from "react";

const fallbackRepos = [
  { id: 1, name: "Attendance-system", language: "JavaScript", stargazers_count: 21, html_url: "https://github.com/Meraz210/Attendance-system" },
  { id: 2, name: "LifeDrop", language: "JavaScript", stargazers_count: 31, html_url: "https://github.com/Meraz210/LifeDrop" },
  { id: 3, name: "MERN-CRUD", language: "JavaScript", stargazers_count: 12, html_url: "https://github.com/Meraz210" },
  { id: 4, name: "StudyHub", language: "JavaScript", stargazers_count: 18, html_url: "https://github.com/Meraz210/StudyHub" },
  { id: 5, name: "Tea-Shop", language: "JavaScript", stargazers_count: 21, html_url: "https://github.com/Meraz210/Tea-Shop" },
  { id: 6, name: "Hospital-MGMT-SYS", language: "JavaScript", stargazers_count: 15, html_url: "https://github.com/Meraz210" },
];

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 850;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [value]);

  return displayValue;
}

export default function GitHubStats() {
  const [repos, setRepos] = useState(fallbackRepos);
  const [stats, setStats] = useState({ public_repos: 19, followers: 2, following: 5 });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          axios.get("https://api.github.com/users/Meraz210"),
          axios.get("https://api.github.com/users/Meraz210/repos?sort=updated&per_page=6"),
        ]);

        setStats(userRes.data);
        setRepos(reposRes.data.length ? reposRes.data : fallbackRepos);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
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
    <div>
      <div className="mb-7 grid grid-cols-3 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            viewport={{ once: true }}
            className="github-stat"
          >
            <div className="text-3xl font-black text-cyan-300">
              <AnimatedNumber value={card.value} />
            </div>
            <div className="mt-1 text-xs font-bold text-slate-400">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <h3 className="mb-4 text-lg font-black text-cyan-300">Repository Showcase</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {repos.slice(0, 6).map((repo, index) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="repo-card"
          >
            <h4 className="truncate text-sm font-black text-white">{repo.name}</h4>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5 truncate text-xs font-bold text-slate-400">
                <span className="h-2 w-2 rounded-full bg-yellow-300" />
                {repo.language || "Code"}
              </span>
              <span className="flex items-center gap-1 text-xs font-black text-yellow-300">
                <Star className="h-3 w-3 fill-current" />
                {repo.stargazers_count}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <a
        href="https://github.com/Meraz210"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-md border border-cyan-400/45 py-3 text-xs font-black text-white hover:bg-cyan-400 hover:text-slate-950"
      >
        <GitBranch className="h-4 w-4" />
        View More Repositories on GitHub
        <GitBranch className="h-4 w-4" />
      </a>
    </div>
  );
}
