import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import RepoCard from '../components/RepoCard'
import { Github, Loader2, AlertCircle, Code2, Users, Trophy, Coffee } from 'lucide-react'

const stats = [
  { icon: Code2, label: 'Lines of Code', value: '100K+', color: 'text-accent-cyan' },
  { icon: Users, label: 'Happy Clients', value: '50+', color: 'text-accent-purple' },
  { icon: Trophy, label: 'Projects Done', value: '70+', color: 'text-accent-pink' },
  { icon: Coffee, label: 'Cups of Coffee', value: '∞', color: 'text-yellow-400' },
]

export default function AboutPage() {
  const { repos, loading, error } = useGitHubRepos()
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation()
  const { ref: reposRef, isInView: reposInView } = useScrollAnimation({ threshold: 0.02 })
  const [filterLang, setFilterLang] = useState<string | null>(null)

  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[]
  const filteredRepos = filterLang
    ? repos.filter((r) => r.language === filterLang)
    : repos

  return (
    <main className="pt-24">
      {/* Header */}
      <section ref={headerRef} className="section-padding relative">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-cyan tracking-wider uppercase">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
              Code Speaks <span className="gradient-text">Louder</span>
            </h1>
            <p className="text-dark-100 max-w-2xl mx-auto text-lg">
              We believe in transparency. Our GitHub is our portfolio — every repo, every commit,
              every line of code tells the story of our craft.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-dark-200 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GitHub Repos */}
      <section ref={reposRef} className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reposInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <Github className="w-8 h-8" />
                Live Repositories
              </h2>
              <p className="text-dark-100 mt-2">
                Pulled directly from GitHub API — real code, real projects
              </p>
            </div>
            <a
              href="https://github.com/Altik22"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm !px-5 !py-2 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View Full Profile
            </a>
          </motion.div>

          {/* Language filter */}
          {languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={reposInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              <button
                onClick={() => setFilterLang(null)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filterLang === null
                    ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                    : 'bg-white/5 text-dark-100 border border-white/10 hover:bg-white/10'
                }`}
              >
                All ({repos.length})
              </button>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLang(lang === filterLang ? null : lang)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filterLang === lang
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'bg-white/5 text-dark-100 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {lang} ({repos.filter((r) => r.language === lang).length})
                </button>
              ))}
            </motion.div>
          )}

          {/* Repos grid */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
              <span className="ml-3 text-dark-100">Loading repositories...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-20 text-red-400">
              <AlertCircle className="w-6 h-6 mr-2" />
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRepos.map((repo, i) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  index={i}
                  isInView={reposInView}
                />
              ))}
            </div>
          )}

          {!loading && !error && filteredRepos.length === 0 && (
            <div className="text-center py-16 text-dark-200">
              No repositories found with the selected filter.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
