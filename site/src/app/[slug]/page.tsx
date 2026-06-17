import { notFound } from 'next/navigation'
import { Download, ArrowLeft, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/config/papers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function generateStaticParams() {
  return siteConfig.papers.map((paper) => ({ slug: paper.id }))
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const paper = siteConfig.papers.find((p) => p.id === slug)

  if (!paper) {
    notFound()
  }

  // External pdfUrl (http) stays as-is; site-hosted ('/pdfs/...') gets basePath.
  const pdfHref = paper.pdfUrl.startsWith('http')
    ? paper.pdfUrl
    : `${basePath}${paper.pdfUrl}`

  return (
    <div className="min-h-svh flex flex-col">
      <Header config={siteConfig} />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-20">
          <a
            href={`${basePath}/`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All papers
          </a>

          <article>
            <header className="mb-8">
              <time className="text-xs font-mono text-muted-foreground">
                {new Date(paper.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </time>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-2">
                {paper.title}
              </h1>
              <p className="text-lg text-muted-foreground">{paper.subtitle}</p>
              <p className="text-sm text-muted-foreground/80 mt-3">
                {paper.authors.join(' · ')}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] font-mono bg-accent text-accent-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <section className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Abstract
              </h2>
              <p className="text-base text-foreground/90 leading-relaxed">
                {paper.abstract}
              </p>
            </section>

            <div className="flex flex-wrap gap-2 mb-8">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <a
                href={paper.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                Source
              </a>
              {paper.latexUrl && (
                <a
                  href={paper.latexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  LaTeX
                </a>
              )}
            </div>

            {paper.relatedLinks && paper.relatedLinks.length > 0 && (
              <div className="mb-8 flex flex-col gap-1.5">
                {paper.relatedLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <div className="rounded-lg border border-border/60 overflow-hidden bg-card">
              <object
                data={`${pdfHref}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                type="application/pdf"
                className="w-full h-[80vh]"
                aria-label={`${paper.title} PDF preview`}
              >
                <div className="p-8 text-center text-sm text-muted-foreground">
                  Preview unavailable in this browser.{' '}
                  <a
                    href={pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    Download the PDF
                  </a>
                  .
                </div>
              </object>
            </div>
          </article>
        </div>
      </main>

      <Footer config={siteConfig} />
    </div>
  )
}
