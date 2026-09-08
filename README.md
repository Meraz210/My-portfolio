# MD Meraz Ahasan Shah Portfolio

Premium React and Vite portfolio for MD Meraz Ahasan Shah, focused on MERN stack projects, recruiter-ready case studies, GitHub activity, a contact workflow, and an optional AI portfolio assistant endpoint.

## Highlights

- Featured CareerConnect MERN job portal case study with seeker, employer, and admin workflows
- Real CareerConnect screenshots for admin, seeker, and employer dashboards
- Supporting project case studies with problem, solution, proof, source code, and contact paths
- Responsive SaaS-style UI with day/night theme and subtle 3D background depth
- Production build and ESLint checks configured for clean review

## Tech Stack

- React 19 and Vite
- Tailwind CSS
- Framer Motion and AOS
- Lightweight CSS/React 3D background layer
- Vercel-style serverless API route for chatbot responses

## Featured Project

CareerConnect is a role-based hiring platform built around practical MERN workflows:

- JWT authentication and role-aware routing
- Seeker, employer, and admin dashboards
- Job posting, discovery, and application tracking
- Admin management for users, jobs, and platform control
- Live demo: https://job-portal-system-neon.vercel.app
- Source code: https://github.com/Meraz210/job-portal-system

## Local Development

```bash
npm install
npm run dev
```

PowerShell may block `npm.ps1` on some Windows setups. Use the command shim if needed:

```bash
npm.cmd run dev
```

## Environment Variables

Create a local `.env` file when you need API-backed features:

```bash
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-5.2
OPENAI_FALLBACK_MODEL=gpt-4.1-mini
VITE_CHAT_API_URL=/api/chat
VITE_FORMSPREE_ENDPOINT=your_formspree_endpoint
```

`OPENAI_API_KEY`, `OPENAI_MODEL`, and `OPENAI_FALLBACK_MODEL` are used by `api/chat.js` on the server. Do not expose the OpenAI key with a `VITE_` prefix.

`VITE_FORMSPREE_ENDPOINT` is optional. Without it, the contact form falls back to a `mailto:` link.

Copy `.env.example` to `.env` for local setup:

```bash
copy .env.example .env
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Before sharing or deploying, run:

```bash
npm.cmd run build
npm.cmd run lint
```

## Deployment Notes

The chatbot API route works on platforms that support the `api/chat.js` serverless function pattern, such as Vercel. Static-only hosting can still run the portfolio, but chatbot requests will fall back to local canned responses unless `VITE_CHAT_API_URL` points to a deployed API endpoint.

For Vercel, set these environment variables in Project Settings > Environment Variables:

```bash
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-5.2
OPENAI_FALLBACK_MODEL=gpt-4.1-mini
VITE_CHAT_API_URL=/api/chat
```

Redeploy after changing environment variables. The OpenAI key must stay server-side only.
