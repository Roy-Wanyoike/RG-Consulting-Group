import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rgconsulting.co.ke'),
  title: 'RG Consulting | Tax & KRA Compliance Services in Kenya',
  description: 'Professional tax filing, KRA compliance, business tax, registration, consultation and ongoing compliance support for individuals and small businesses in Kenya.',
  alternates: { canonical: '/' },
  keywords: ['KRA tax services Kenya', 'tax consultant Nairobi', 'KRA return filing', 'business tax Kenya', 'VAT filing Kenya', 'PAYE filing', 'KRA PIN registration', 'tax advisory Kenya', 'iTax services'],
  openGraph: { title: 'RG Consulting | Tax & KRA Compliance Services in Kenya', description: 'Practical tax and compliance support for individuals and growing businesses in Kenya.', type: 'website', locale: 'en_KE', images: [{ url: '/images/rg-consulting-hero.png', width: 1600, height: 1024, alt: 'RG Consulting tax and compliance consultation' }] },
  twitter: { card: 'summary_large_image', title: 'RG Consulting | Tax & KRA Compliance Services', description: 'Tax clarity and compliance support for individuals and growing businesses in Kenya.', images: ['/images/rg-consulting-hero.png'] },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#003D2D' }

const structuredData = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'RG Consulting', description: 'Tax and compliance support for individuals and small businesses in Kenya.', telephone: '+254799491719', email: 'roselyngithinji10@gmail.com', address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' }, areaServed: { '@type': 'Country', name: 'Kenya' }, sameAs: ['https://instagram.com/rgconsulting_ke', 'https://tiktok.com/@rgconsulting_ke'] }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}><a className="skip-link" href="#main-content">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /><Navbar />{children}<Footer /></body></html>
}
