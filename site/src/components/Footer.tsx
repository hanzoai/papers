import type { BrandConfig } from '@/config/brands'

interface FooterProps {
  config: BrandConfig
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {config.fullName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Open source research papers
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={config.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Website
            </a>
            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/hanzo-apps/papers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Template
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
