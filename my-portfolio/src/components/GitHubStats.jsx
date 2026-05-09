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
        <div className="mb-12 grid gap-4 text-center sm:grid-cols-3 md:gap-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg border border-cyan-500/20 bg-white/[0.045] p-6 shadow-xl shadow-cyan-500/10 backdrop-blur-xl"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
              <div className="text-5xl font-black text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]">
                <AnimatedNumber value={card.value} />
              </div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">{card.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <h3 className="text-2xl font-black text-cyan-300">Dynamic Repository Showcase</h3>
        <p className="text-sm text-gray-500">Live data from GitHub API</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {repos.map((repo, index) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: index * 0.06 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-white/[0.045] p-6 shadow-lg shadow-cyan-500/10 backdrop-blur-xl transition hover:border-cyan-300/60"
          >
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

            <div className="relative mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                  {repo.language || "Repository"}
                </p>
                <h4 className="text-xl font-black text-white">{repo.name}</h4>
              </div>
              <span className="shrink-0 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-3 py-1 text-sm font-bold text-yellow-200">
                Star {repo.stargazers_count}
              </span>
            </div>

            <p className="relative mb-5 text-gray-400">{repo.description || "No description yet."}</p>

            <div className="relative flex flex-wrap gap-2">
              {(repo.topics?.length ? repo.topics : [repo.language || "code"]).slice(0, 3).map((topic) => (
                <span key={topic} className="rounded-full border border-cyan-400/15 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
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
