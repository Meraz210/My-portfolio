# Meraz Ahasan Portfolio

React and Vite portfolio for Meraz Ahasan, including animated sections, GitHub profile data, a contact form fallback, and an optional AI portfolio assistant endpoint.

## Tech Stack

- React 19 and Vite
- Tailwind CSS
- Framer Motion and AOS
- React Three Fiber / Three.js hero scene
- Vercel-style serverless API route for chatbot responses

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
