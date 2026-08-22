import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, ChartNoAxesCombined, FileCheck2, MessageSquareText, UserRound } from "lucide-react";

export const contact = {
  phoneDisplay: "+254 799 491 719",
  phone: "+254799491719",
  email: "roselyngithinji10@gmail.com",
  location: "Nairobi, Kenya",
  instagram: "https://instagram.com/rgconsulting_ke",
  tiktok: "https://tiktok.com/@rgconsulting_ke",
};

export type Service = { title: string; description: string; items: string[]; icon: LucideIcon };

export const services: Service[] = [
  { icon: UserRound, title: "Individual Tax Services", description: "Clear, accurate support for every individual obligation.", items: ["KRA Return Filing", "Nil & P9 Returns", "Multiple Income Returns", "Tax Advisory"] },
  { icon: BriefcaseBusiness, title: "Business Tax Services", description: "Keep your business current, organised and compliant.", items: ["Business Income Tax", "VAT Filing", "PAYE Filing", "Turnover Tax (TOT)"] },
  { icon: FileCheck2, title: "Registration & Setup", description: "Start correctly with practical, guided registration.", items: ["KRA PIN Registration", "iTax Setup / Updates", "VAT Registration"] },
  { icon: MessageSquareText, title: "Consultation Services", description: "Professional answers for confident decisions.", items: ["Basic Consultation", "Advanced Tax Advisory"] },
  { icon: ChartNoAxesCombined, title: "Ongoing Compliance Support", description: "Dependable support beyond a single filing.", items: ["Monthly Filing", "Compliance Reminders", "Ongoing Advisory"] },
];

export const faqs = [
  { question: "Who needs to file a KRA tax return?", answer: "Filing requirements depend on your registration and circumstances. We can review your situation and explain the applicable steps clearly." },
  { question: "Can you assist with Nil Returns?", answer: "Yes. We assist eligible individuals with accurate Nil Return filing and help confirm the information needed before submission." },
  { question: "Do you help businesses with VAT and PAYE?", answer: "Yes. Our business compliance support includes VAT and PAYE filing, subject to your organisation’s registration and obligations." },
  { question: "Can you register a KRA PIN?", answer: "Yes. We guide individuals and businesses through KRA PIN registration and the required supporting information." },
  { question: "Do you assist with iTax updates?", answer: "Yes. We can help with common iTax setup and update requests and advise on the appropriate next step for your case." },
  { question: "Can RG Consulting handle monthly compliance?", answer: "Yes. We offer ongoing filing support, reminders and advisory tailored to your recurring compliance needs." },
  { question: "Do you provide tax consultation for small businesses?", answer: "Yes. Consultations are available for entrepreneurs and small businesses that need clarity on tax filings, registration or ongoing obligations." },
  { question: "How do I get started?", answer: "Book a consultation, call us or send a WhatsApp message. We’ll understand your needs and outline the documents and next steps." },
];
