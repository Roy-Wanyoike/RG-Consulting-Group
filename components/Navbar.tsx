"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [["About", "/#about"], ["Services", "/#services"], ["Why Choose Us", "/#why-us"], ["How It Works", "/#process"], ["FAQ", "/#faq"], ["Contact", "/#contact"]];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  return <header className="site-header">
    <div className="nav-shell">
      <Logo />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="button button--gold nav-cta" href="/#contact">Book a Consultation</Link>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={panelId}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
    <div id={panelId} className={`mobile-panel ${open ? "is-open" : ""}`} hidden={!open}>
      <nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></Link>)}</nav>
      <Link className="button button--gold" href="/#contact" onClick={() => setOpen(false)}>Book a Consultation</Link>
    </div>
  </header>;
}
