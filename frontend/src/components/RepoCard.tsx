import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Calendar } from 'lucide-react'
import type { GitHubRepo } from '../hooks/useGitHubRepos'

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Vue: '#41b883',
  Svelte: '#ff3e00',
}

interface RepoCardProps {
  repo: GitHubRepo
  index: number
  isInView: boolean
}

export default function RepoCard({ repo, index, isInView }: RepoCardProps) {
  const langColor = repo.language ? langColors[repo.language] || '#8b8b8b' : '#8b8b8b'
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card glow-border p-6 hover:bg-white/[0.07] transition-all duration-300 group block"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors truncate flex-1 mr-2">
          {repo.name}
        </h3>
        <ExternalLink className="w-4 h-4 text-dark-200 group-hover:text-primary-400 transition-colors flex-shrink-0 mt-1" />
      </div>

      <p className="text-sm text-dark-100 mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description || 'No description provided'}
      </p>

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-dark-200">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" />
          {repo.forks_count}
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <Calendar className="w-3.5 h-3.5" />
          {updatedDate}
        </span>
      </div>
    </motion.a>
  )
}
