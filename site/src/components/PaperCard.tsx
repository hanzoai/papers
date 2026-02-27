import { FileText, ExternalLink } from 'lucide-react'
import type { PaperConfig } from '@/config/papers'

interface PaperCardProps {
  paper: PaperConfig
}

export function PaperCard({ paper }: PaperCardProps) {
  return (
    <article className="group rounded-lg border border-border/60 bg-card hover:border-border transition-colors">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <time className="text-xs text-muted-foreground font-mono">
            {new Date(paper.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </time>
          <FileText className="h-4 w-4 text-muted-foreground/50" />
        </div>

        <h2 className="text-base font-semibold mb-1 text-foreground group-hover:text-foreground/90">
          {paper.title}
        </h2>

        <h3 className="text-sm text-muted-foreground mb-3">
          {paper.subtitle}
        </h3>

        <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-3 leading-relaxed">
          {paper.abstract}
        </p>

        <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
          {paper.authors.join(' · ')}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {paper.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono bg-accent text-accent-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-3 border-t border-border/40">
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            PDF
          </a>
          <a
            href={paper.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm font-medium border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Source
          </a>
        </div>

        {paper.relatedLinks && paper.relatedLinks.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/30">
            {paper.relatedLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
