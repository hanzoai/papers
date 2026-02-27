import { siteConfig } from '@/config/papers'
import { Header } from '@/components/Header'
import { PaperCard } from '@/components/PaperCard'
import { Footer } from '@/components/Footer'

export default function Home() {
  const paperCount = siteConfig.papers.length

  return (
    <div className="min-h-svh flex flex-col">
      <Header config={siteConfig} />

      <main className="flex-1">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            {paperCount} papers
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {siteConfig.name}
            <span className="block text-muted-foreground text-2xl md:text-3xl font-normal mt-1">
              Research Papers
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        {/* Papers Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {paperCount > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siteConfig.papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Papers coming soon...</p>
            </div>
          )}
        </div>
      </main>

      <Footer config={siteConfig} />
    </div>
  )
}
