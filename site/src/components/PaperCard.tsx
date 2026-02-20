import type { PaperConfig } from '@/config/brands'

interface PaperCardProps {
  paper: PaperConfig
  brand: string
}

export function PaperCard({ paper, brand }: PaperCardProps) {
  const brandColors: Record<string, string> = {
    hanzo: 'from-orange-500 to-blue-600',
    zoo: 'from-green-500 to-emerald-600',
    zen: 'from-purple-500 to-pink-600',
    lux: 'from-blue-500 to-cyan-600',
  }

  const gradientClass = brandColors[brand] || 'from-blue-500 to-purple-600'

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />

      <div className="p-6">
        {/* Date and Tags */}
        <div className="flex items-center justify-between mb-3">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(paper.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {paper.title}
        </h2>

        {/* Subtitle */}
        <h3 className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {paper.subtitle}
        </h3>

        {/* Authors */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {paper.authors.join(', ')}
          </p>
        </div>

        {/* Abstract */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-4">
          {paper.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 px-4 py-2 bg-gradient-to-r ${gradientClass} text-white rounded-lg hover:opacity-90 transition-opacity text-center font-medium`}
          >
            Read PDF
          </a>
          <a
            href={paper.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Related Links */}
        {paper.relatedLinks && paper.relatedLinks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Related Links:
            </p>
            <ul className="space-y-1">
              {paper.relatedLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {link.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
