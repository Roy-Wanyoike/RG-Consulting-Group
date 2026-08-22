import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ message: "Content-Type must be application/json." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ message: "Request body is too large." }, 413);
  }

  const limited = checkRateLimit(getClientId(request));
  if (limited) {
    return NextResponse.json(
      { message: "Too many requests. Please wait a few minutes and try again." },
      { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(limited) } },
    );
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ message: "Request body is too large." }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ message: "Invalid request body." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { message: "Please check the form and try again.", errors: parsed.error.flatten().fieldErrors },
      422,
    );
  }

  if (parsed.data.company) {
    return json({ message: "Your consultation request has been sent." }, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "roselyngithinji10@gmail.com";
  if (!apiKey || !from) {
    return json(
      { message: "Online requests are temporarily unavailable. Please call +254 799 491 719 or email roselyngithinji10@gmail.com." },
      503,
    );
  }

  const resend = new Resend(apiKey);
  const { name, email, phone, clientType, service, message } = parsed.data;
  const escaped = [name, email, phone, clientType, service, message].map(escapeHtml);

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Consultation request: ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nClient type: ${clientType}\nService: ${service}\n\nMessage:\n${message}`,
      html: `<h2>New consultation request</h2><p><strong>Name:</strong> ${escaped[0]}</p><p><strong>Email:</strong> ${escaped[1]}</p><p><strong>Phone:</strong> ${escaped[2]}</p><p><strong>Client type:</strong> ${escaped[3]}</p><p><strong>Service:</strong> ${escaped[4]}</p><p><strong>Message:</strong></p><p>${escaped[5].replace(/\n/g, "<br>")}</p>`,
    });

    if (result.error) throw new Error(result.error.message);
    return json({ message: "Your consultation request has been sent." }, 200);
  } catch (error) {
    console.error("Contact email delivery failed", error);
    return json(
      { message: "We could not send your request. Please call or email us instead." },
      502,
    );
  }
}

function json(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function getClientId(request: Request) {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function checkRateLimit(clientId: string) {
  const now = Date.now();
  const current = attempts.get(clientId);
  if (!current || current.resetAt <= now) {
    attempts.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return 0;
  }
  current.count += 1;
  if (current.count <= RATE_LIMIT_MAX) return 0;
  return Math.max(1, Math.ceil((current.resetAt - now) / 1_000));
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
    };
    return entities[character];
  });
}
