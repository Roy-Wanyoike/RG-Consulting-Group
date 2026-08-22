# RG Consulting website

Production-oriented Next.js website for RG Consulting, a tax and KRA compliance consultancy in Nairobi, Kenya.

## Local setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add valid values.
4. Run `npm run dev`, then open `http://localhost:3000`.

Before release, run:

```bash
npm run lint
npm run build
```

## Contact form delivery

The `/api/contact` endpoint validates every request on the server and sends it using [Resend](https://resend.com). Configure:

- `RESEND_API_KEY`: Resend API key.
- `CONTACT_FROM_EMAIL`: sender at a domain verified in Resend.
- `CONTACT_TO_EMAIL`: inbox that receives requests (defaults to RG Consulting's published address).

If email delivery is not configured, the endpoint deliberately returns HTTP 503 and the form shows the phone and email fallback. It never displays a false success message.

## SEO and deployment

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin so canonical URLs, `sitemap.xml`, and `robots.txt` point to the production domain. The sample value is provisional and should be replaced if the business chooses another domain.

Deploy to Vercel by importing the repository, adding the environment variables above, and deploying. Verify the contact form using a real message after the Resend sending domain is verified.

## Content note

Tax information on the site is general service information, not individual legal or tax advice. Review business details and regulatory content before publication and whenever KRA requirements change.
# RG-Consulting-Group
