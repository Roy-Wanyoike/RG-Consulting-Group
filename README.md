# RG Consulting Website

Production-ready marketing website for **RG Consulting — Tax & Compliance Support**, a Nairobi-based consultancy serving individuals and growing businesses in Kenya.

The site uses Next.js App Router, TypeScript and Tailwind CSS. It includes responsive service pages, accessible navigation and FAQs, WhatsApp integration, SEO metadata, and a validated consultation form.

## Technology

- Next.js 16 with the App Router
- React and TypeScript
- Tailwind CSS
- React Hook Form and Zod
- Resend for contact-email delivery
- Lucide React icons

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy the safe example and add local values:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public HTTPS origin used by metadata, canonical URLs, `robots.txt`, and `sitemap.xml`. |
| `RESEND_API_KEY` | Resend API key used only by the server-side contact endpoint. |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend. |
| `CONTACT_TO_EMAIL` | Inbox that receives consultation requests. |

Never commit `.env.local` or real credentials. `.env.example` contains names and safe placeholders only.

## Contact form

The form posts to `POST /api/contact` and provides:

- Shared client/server Zod validation
- Accessible inline errors
- Request timeout and explicit fallback messages
- JSON content-type and request-size enforcement
- Honeypot spam handling
- Best-effort per-instance rate limiting
- HTML escaping before email rendering
- Resend delivery with a verified sender domain

Without Resend configuration, valid submissions return a service-unavailable response and display the published phone and email fallback. The interface never reports a false success.

For a high-traffic multi-instance deployment, replace the in-memory rate limiter with a shared store such as Vercel KV or Upstash Redis.

## Quality checks

Run before every release:

```bash
npm run lint
npm run build
```

The application provides `/`, `/services`, `/contact`, `/robots.txt`, `/sitemap.xml`, and `/api/contact`.

After deployment, verify desktop and mobile layouts, navigation, FAQ behavior, WhatsApp/telephone/email links, and one real contact-form delivery.

## Deployment to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables listed above.
4. Verify the `CONTACT_FROM_EMAIL` domain in Resend.
5. Deploy and test a consultation request end to end.

Set `NEXT_PUBLIC_SITE_URL` to the real production domain before launch. The development fallback in the code is provisional.

### Vercel install failure (fix for `unrs-resolver`)

Vercel build logs may show an `ENOENT spawn powershell.exe` error caused by a dev sub-dependency (`unrs-resolver`) that runs a Windows-only install script. To avoid this, CI should skip devDependencies during install.

This repository includes a `.npmrc` with `production=true` so Vercel and other CI systems will omit `devDependencies` by default. If you need dev dependencies during a special build, run locally or in CI with:

```bash
npm ci --include=dev
```

If you prefer not to commit `.npmrc`, configure Vercel's Install Command to:

```bash
npm ci --omit=dev
```


## Project structure

```text
app/                 Routes, metadata, API endpoint and global styles
components/          Shared UI and contact-form components
lib/                 Service data and validation schemas
public/images/       Production logo and website imagery
design/              Approved visual reference used during implementation
```

## Content maintenance

Tax information is general service information, not individual legal or tax advice. Review regulatory content whenever KRA requirements change. Do not add credentials, testimonials, statistics or guarantees unless the business has verified them.

## Repository hygiene

The `.gitignore` excludes dependencies, framework output, secrets, logs, caches, coverage, temporary QA artifacts, local agent instructions, and editor/OS metadata. Commit the source code, `package-lock.json`, `.env.example`, and intentional assets under `public/` and `design/`.
