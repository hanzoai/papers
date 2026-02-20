import type { BrandConfig } from '@/config/brands'
import Image from 'next/image'

interface HeaderProps {
  config: BrandConfig
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-xl font-bold">{config.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Research Papers</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a
                href={config.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Website
              </a>
              <a
                href={config.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
            </nav>

            {/* Lux downward-pointing triangle logo - inverted colors */}
            <div className="w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M50 85 L15 25 L85 25 Z" fill="currentColor" className="text-black dark:text-white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
