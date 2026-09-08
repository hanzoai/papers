'use client'

import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { PaperConfig } from '@/config/papers'
import { PaperCard } from '@/components/PaperCard'

export function PaperLibrary({ papers }: { papers: PaperConfig[] }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('All')
  const topics = useMemo(
    () => ['All', ...Array.from(new Set(papers.flatMap((paper) => paper.tags))).sort()],
    [papers],
  )
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return papers.filter((paper) => {
      const topicMatches = topic === 'All' || paper.tags.includes(topic)
      const queryMatches = !needle || [paper.title, paper.subtitle, paper.abstract, ...paper.authors, ...paper.tags]
        .join(' ')
        .toLowerCase()
        .includes(needle)
      return topicMatches && queryMatches
    })
  }, [papers, query, topic])

  return (
    <>
      <div className="mb-8 grid gap-3 rounded-lg border border-border/60 bg-card p-3 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <span className="sr-only">Search papers</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles, topics, and authors"
            className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/50"
          />
        </label>
        <select value={topic} onChange={(event) => setTopic(event.target.value)} aria-label="Filter by topic" className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground/50">
          {topics.map((value) => <option key={value}>{value}</option>)}
        </select>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{shown.length} {shown.length === 1 ? 'paper' : 'papers'}</p>
      {shown.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((paper) => <PaperCard key={paper.id} paper={paper} />)}
        </div>
      ) : (
        <div className="rounded-lg border border-border/60 py-20 text-center text-muted-foreground">No papers match that search.</div>
      )}
    </>
  )
}
