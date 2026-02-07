# Last Digit Pro

## Overview
Premium lottery prediction web application with subscription-based access and daily digits. Built with React + Vite frontend and Express backend.

## Recent Changes
- 2026-02-07: Initial Replit setup - installed dependencies, configured Tailwind v4 with Vite plugin, fixed path aliases, removed GitHub Pages base path.

## Project Architecture
- **Frontend**: React 18, Vite 5, Tailwind CSS v4, shadcn/ui components, wouter routing (hash-based)
- **Backend**: Express server (server/index.ts) serving both API and client
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **UI Components**: shadcn/ui (new-york style) in client/src/components/ui/
- **Build**: Vite for client, esbuild for server (script/build.ts)

## Structure
```
client/           - React frontend
  src/
    components/   - UI and modal components
    pages/        - Route pages (home, login, lucky-search, dear-digits)
    lib/          - Utilities and query client
    hooks/        - Custom React hooks
server/           - Express backend
  index.ts        - Server entry point (port 5000)
  routes.ts       - API routes
  vite.ts         - Vite dev middleware
  static.ts       - Static file serving (production)
shared/           - Shared schemas (drizzle/zod)
```

## Dev Server
- Workflow: `npx tsx server/index.ts` on port 5000
- Express serves both API routes and Vite-powered frontend in dev mode

## Deployment
- Build: `npm run build` (Vite client build + esbuild server bundle)
- Run: `node dist/index.cjs`
- Target: autoscale

## User Preferences
- (none recorded yet)
