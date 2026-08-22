import Image from "next/image";
import { ArrowDownRight, Check } from "lucide-react";

export function Hero() {
  return <section className="hero" id="home">
    <div className="hero-copy">
      <p className="eyebrow">RG CONSULTING</p>
      <h1>Tax Solutions.<br/><em>Peace of Mind.</em></h1>
      <p className="hero-intro">We help individuals and small businesses stay compliant with KRA, optimize their taxes, and avoid unnecessary penalties.</p>
      <div className="hero-actions"><a href="/#contact" className="button button--gold">Book a Consultation <ArrowDownRight aria-hidden="true" /></a><a href="/#services" className="text-link">Explore Our Services <span aria-hidden="true">↘</span></a></div>
      <p className="trust-line"><Check aria-hidden="true" /> Accurate. Confidential. Reliable. Always.</p>
    </div>
    <div className="hero-media">
      <Image src="/images/rg-consulting-hero.png" alt="A business owner reviewing financial records with a tax advisor in Nairobi" fill priority loading="eager" sizes="(max-width: 900px) 100vw, 52vw" />
      <div className="hero-quote"><span>“</span>Your compliance today,<br/>your peace of mind tomorrow.</div>
      <div className="trust-seal"><b>ACCURATE.<br/>CONFIDENTIAL.<br/>RELIABLE.</b><em>Always.</em></div>
    </div>
  </section>;
}
