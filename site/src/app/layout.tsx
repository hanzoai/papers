import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { siteConfig } from '@/config/papers'
import './global.css'

export const metadata: Metadata = {
  title: `${siteConfig.name} Research Papers`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} Research Papers`,
    description: siteConfig.description,
    url: siteConfig.website,
    siteName: `${siteConfig.name} Papers`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} Research Papers`,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var s=localStorage.getItem('hanzo-papers-theme');if(s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-svh bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="hanzo-papers-theme"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
