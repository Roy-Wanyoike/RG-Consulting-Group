import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact a Tax Consultant in Nairobi",
  description:
    "Request a consultation with RG Consulting for KRA returns, business tax, VAT, PAYE, registration and ongoing compliance support in Kenya.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-cream pb-24 pt-36 text-forest">
      <section className="shell" aria-labelledby="contact-page-title">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="eyebrow">GET IN TOUCH</p>
          <h1 id="contact-page-title" className="font-serif text-5xl leading-tight md:text-7xl">
            Let&apos;s make tax <em className="text-gold-dark">simple for you.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-forest/70">
            Tell us what you need and we&apos;ll respond with the right next step.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
          <div className="border border-forest/10 bg-white p-6 shadow-sm sm:p-10">
            <ContactForm />
            <button type="submit" form="contact-request-form" className="button button--gold mt-7">
              Submit Contact Request <Send aria-hidden="true" />
            </button>
          </div>
          <aside className="bg-forest p-7 text-white sm:p-9" aria-label="Contact details">
            <h2 className="font-serif text-3xl">Prefer to speak directly?</h2>
            <p className="mt-3 text-white/70">Reach RG Consulting during normal business hours.</p>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-3"><Phone className="size-5 shrink-0 text-gold" aria-hidden="true" /><a className="underline-offset-4 hover:underline" href="tel:+254799491719">+254 799 491 719</a></li>
              <li className="flex gap-3"><Mail className="size-5 shrink-0 text-gold" aria-hidden="true" /><a className="break-all underline-offset-4 hover:underline" href="mailto:roselyngithinji10@gmail.com">roselyngithinji10@gmail.com</a></li>
              <li className="flex gap-3"><MapPin className="size-5 shrink-0 text-gold" aria-hidden="true" /><span>Nairobi, Kenya</span></li>
              <li className="flex gap-3"><MessageCircle className="size-5 shrink-0 text-gold" aria-hidden="true" /><a className="underline-offset-4 hover:underline" href="https://wa.me/254799491719?text=Hello%20RG%20Consulting%2C%20I%20would%20like%20assistance%20with%20tax%2Fcompliance%20services." target="_blank" rel="noreferrer">Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a></li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
