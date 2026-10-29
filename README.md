# Economic Architect OS — Vercel starter

A premium editorial-style knowledge workspace built with Next.js, Supabase-ready authentication/schema, a source library, local notes, article drafting and a server-side Groq-powered 5% analysis endpoint.

## Important scope / honesty

This is a deployable **starter application**, not a finished enterprise platform. The included curated source starter set is roughly 100 sources, not 1,000 individually audited URLs. A trustworthy 1,000-source library should be expanded through verified imports and deduplication rather than fabricated links. The current AI route analyzes text provided by the user; it does **not** crawl all source domains, authenticate to YouTube, or verify references automatically. Notes currently save in the current browser's local storage. The admin page verifies the profile role but does not yet provide full CRUD screens for all tables. PDF storage schema is supplied but the upload UI still needs to be wired to Supabase Storage.

The HBS reference is used for broad premium editorial cues only. This project does not copy their proprietary site, brand assets, or course content.

## Deploy to Vercel

1. Download/extract this project and push it to a **private GitHub repository**.
2. In Supabase, create a project. Open SQL Editor and run `supabase/schema.sql`.
3. In Supabase Auth, configure email confirmation and Site URL / redirect URLs for your Vercel domain.
4. Create a fresh Groq API key if you want AI analysis. Never reuse a key that was pasted into a chat or committed to a repository.
5. In Vercel, import the repository and set these Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable/anon key only; RLS must be enabled)
   - `GROQ_API_KEY` (secret; server-side only)
   - optional `GROQ_MODEL` (defaults to `llama-3.3-70b-versatile`)
6. Deploy. Add the deployed Vercel URL to Supabase Auth redirect allow-list.
7. Create your account at `/login`. Verify email. In Supabase SQL Editor, grant admin to your verified account using the commented SQL statement in `schema.sql`.
8. Test member sign-in, admin role check, AI endpoint, RLS and private storage policies before inviting other users.

## Run locally

Requirements: Node.js 20.9+ recommended.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## Security checklist

- **Rotate any API key pasted into chats, logs, screenshots, or repositories.** The secret is treated as compromised.
- Never put Groq, Telegram bot, Google OAuth client secret or Supabase `service_role` keys in `NEXT_PUBLIC_*` variables.
- Supabase anon/publishable keys are designed for client use only when RLS is correctly configured. Run the included schema and test access as anon, member A, member B and admin.
- Require email verification, rate-limit authentication and AI endpoints, add CAPTCHA/abuse protection, and configure billing limits with the AI provider.
- Apply storage MIME/size restrictions and private bucket policies. Do not create public signed links for private PDFs without a deliberate expiry policy.
- Add monitoring, backups, a privacy notice, terms, data deletion/export process and a security review before production.
- “100% safe” cannot be guaranteed for any web app; security is a continuous process.

## Telegram and YouTube

A Telegram username alone cannot connect a personal account to this app. A Telegram bot integration needs a bot created through BotFather, a bot token, and an explicit chat interaction/permission. Keep the token server-side. YouTube unlisted upload requires Google OAuth consent and YouTube Data API permissions; an unlisted video is not private—anyone with the link can watch it. These integrations are not falsely represented as already connected in this starter.

## Source library expansion to 1,000

Add a reviewed source-import workflow before production: CSV columns `name,domain,category,description,url,cadence,authority_type,status`; normalize URLs; deduplicate by canonical URL/domain; check status; flag redirects and dead links; manually score primary-source authority and topic fit. Keep source quality and last-checked date visible. Do not bulk-import arbitrary links and call them quality sources.
