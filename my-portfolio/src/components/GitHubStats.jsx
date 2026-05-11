import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [value]);

  return displayValue;
}

export default function GitHubStats() {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          axios.get("https://api.github.com/users/Meraz210"),
          axios.get("https://api.github.com/users/Meraz210/repos?sort=updated&per_page=6"),
        ]);

        setStats(userRes.data);
        setRepos(reposRes.data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-cyan-500/20 bg-white/[0.045] p-8 text-center text-gray-400 backdrop-blur-xl">
        Syncing GitHub signal...
      </div>
    );
  }

  const statCards = stats
    ? [
        { label: "Public Repos", value: stats.public_repos },
        { label: "Followers", value: stats.followers },
        { label: "Following", value: stats.following },
      ]
    : [];

  return (
    <div>
      {stats && (
        <div className="mb-16 grid gap-6 text-center sm:grid-cols-3">
          {statCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/8 to-transparent p-8 md:p-10 shadow-xl shadow-cyan-500/5 backdrop-blur-xl transition hover:border-cyan-500/40 hover:shadow-cyan-500/15"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
              <div className="text-5xl md:text-6xl font-black text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)] mb-2">
                <AnimatedNumber value={card.value} />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-gray-400">{card.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-cyan-300 mb-2">Repository Showcase</h3>
          <p className="text-sm text-gray-500">Live data from GitHub API</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, index) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent p-7 md:p-8 shadow-lg shadow-cyan-500/5 backdrop-blur-xl transition hover:border-cyan-500/40 hover:shadow-cyan-500/20"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/8 blur-3xl transition opacity-0 group-hover:opacity-100 duration-500" />
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="relative mb-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
                  {repo.language || "Repository"}
                </p>
                <h4 className="text-lg md:text-xl font-black text-white truncate">{repo.name}</h4>
              </div>
              <span className="shrink-0 rounded-lg border border-yellow-300/20 bg-yellow-300/8 px-2.5 py-1 text-xs md:text-sm font-bold text-yellow-200 whitespace-nowrap">
                ⭐ {repo.stargazers_count}
              </span>
            </div>

            <p className="relative mb-6 text-sm text-gray-400 line-clamp-2">{repo.description || "No description yet."}</p>

            <div className="relative flex flex-wrap gap-2">
              {(repo.topics?.length ? repo.topics : [repo.language || "code"]).slice(0, 3).map((topic) => (
                <span key={topic} className="rounded-full border border-cyan-400/20 bg-cyan-500/8 px-3 py-1 text-xs font-medium text-cyan-300">
                  {topic}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
