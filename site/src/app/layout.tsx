import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getBrandConfig } from '@/config/brands'

const inter = Inter({ subsets: ['latin'] })

const brandConfig = getBrandConfig()

export const metadata: Metadata = {
  title: `${brandConfig.name} Research Papers`,
  description: brandConfig.description,
  openGraph: {
    title: `${brandConfig.name} Research Papers`,
    description: brandConfig.description,
    url: brandConfig.website,
    siteName: `${brandConfig.name} Papers`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brandConfig.name} Research Papers`,
    description: brandConfig.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
