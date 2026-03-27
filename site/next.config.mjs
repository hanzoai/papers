/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  env: { NEXT_PUBLIC_BRAND: 'hanzo' },
}

export default config
