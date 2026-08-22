import type { Metadata } from 'next'
import { Services, Process, ComplianceCTA } from '@/components/Sections'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Tax & Compliance Services | RG Consulting',
  description: 'Explore KRA return filing, business tax, VAT, PAYE, registration, consultation and ongoing compliance support in Kenya.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return <main id="main-content"><div className="inner-hero"><div className="shell"><p className="eyebrow">RG CONSULTING SERVICES</p><h1>Practical support for<br/><em>confident compliance.</em></h1><p>Clear help for individuals, entrepreneurs and growing businesses navigating tax responsibilities in Kenya.</p></div></div><Services/><Process/><ComplianceCTA/><WhatsAppButton/></main>
}
