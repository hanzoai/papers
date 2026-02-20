import { getBrandConfig } from '@/config/brands'
import { Header } from '@/components/Header'
import { PaperCard } from '@/components/PaperCard'
import { Footer } from '@/components/Footer'

export default function Home() {
  const config = getBrandConfig()

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header config={config} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {config.name} Research Papers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {config.description}
          </p>
        </div>

        {/* Papers Grid */}
        {config.papers.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {config.papers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} brand={config.name.toLowerCase()} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Papers coming soon...
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">About {config.fullName}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {config.description}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href={config.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Website
            </a>
            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <Footer config={config} />
    </main>
  )
}
