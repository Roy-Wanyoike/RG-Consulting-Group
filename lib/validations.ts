import { z } from "zod";

const kenyanPhone = /^(?:\+?254|0)?[17]\d{8}$/;

export const clientTypes = ["Individual", "Business"] as const;

export const serviceOptions = [
  "Individual Tax Services",
  "Business Tax Services",
  "Registration & Setup",
  "Consultation Services",
  "Ongoing Compliance Support",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .max(30, "Enter a valid Kenyan phone number.")
    .refine(
      (value) => kenyanPhone.test(value.replace(/[\s()-]/g, "")),
      "Enter a valid Kenyan phone number.",
    ),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  clientType: z.enum(clientTypes, {
    message: "Please select a client type.",
  }),
  service: z.enum(serviceOptions, {
    message: "Please select the service you need.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about what you need.")
    .max(2_000, "Please keep your message under 2,000 characters."),
  // Honeypot: real users never see or fill this field.
  company: z.string().max(200).optional().default(""),
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactSubmission = z.output<typeof contactSchema>;
