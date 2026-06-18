import { useEffect, useState } from 'react'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  created_at: string
}

const GITHUB_USERNAME = 'Altik22'

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`
        )

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const data: GitHubRepo[] = await response.json()
        const filtered = data
          .filter((r) => !r.name.startsWith('.'))
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

        setRepos(filtered)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repos')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return { repos, loading, error }
}
