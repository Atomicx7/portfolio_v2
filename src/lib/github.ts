export interface RepoStats {
  stars: number
  forks: number
  downloads: number
}

const fallback: RepoStats = { stars: 202, forks: 31, downloads: 5600 }

export async function repoStats(owner: string, repo: string): Promise<RepoStats> {
  const headers: HeadersInit = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}

  try {
    const [repository, releases] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, { headers, next: { revalidate: 3600 } }),
    ])

    if (!repository.ok) return fallback
    const data = (await repository.json()) as { stargazers_count: number; forks_count: number }
    const releaseData = releases.ok
      ? ((await releases.json()) as { assets?: { download_count?: number }[] }[])
      : []
    const downloads = releaseData.reduce(
      (total, release) => total + (release.assets ?? []).reduce((sum, asset) => sum + (asset.download_count ?? 0), 0),
      0,
    )

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      downloads: downloads || fallback.downloads,
    }
  } catch {
    return fallback
  }
}
