# Kindred — Intergenerational Skill & Wisdom Exchange

Kindred connects elder masters and wisdom keepers with modern apprentices and younger learners for 1-on-1 slow-craft mentoring, life philosophy transmission, and intergenerational connection.

This repository is structured as a **production-ready monorepo** with two independently deployable applications:
- **`apps/web`**: Next.js 14 (App Router, TypeScript, Tailwind CSS, Zustand) deployed on **Vercel**
- **`apps/api`**: Node.js + Express + TypeScript + Prisma ORM (PostgreSQL) + Socket.IO deployed on **Railway**
- **`packages/shared`**: Shared TypeScript types, interfaces, and Zod schemas used by both applications

---

## 8. DEPLOYMENT STEPS

1. Push repo to GitHub.
2. **Railway**: New Project → Deploy from GitHub repo → set root/service to `apps/api` → Add PostgreSQL plugin (auto-sets `DATABASE_URL`) → set `JWT_SECRET` and `CORS_ORIGIN` env vars → deploy → confirm `GET /health` returns 200 → copy the generated public URL.
3. **Vercel**: New Project → import same GitHub repo → set root directory to `apps/web` → set `NEXT_PUBLIC_API_BASE_URL` to the Railway URL from step 2, plus `NEXTAUTH_SECRET`/`NEXTAUTH_URL` → deploy.
4. Update `CORS_ORIGIN` on Railway to include the final Vercel production domain, redeploy API.
5. Verify end-to-end: register a user from the deployed Vercel URL, confirm it writes to Railway Postgres via Prisma Studio (`pnpm --filter api exec prisma studio`).

---

## Environment Variables

### Backend (`apps/api/.env`)
- `DATABASE_URL`: PostgreSQL connection string (auto-injected by Railway Postgres plugin).
- `JWT_SECRET`: Random 256-bit string for signing JSON Web Tokens.
- `CORS_ORIGIN`: Comma-separated list of allowed origins, e.g. `https://kindred.vercel.app,http://localhost:3000`.
- `PORT`: Port number (defaults to `4000` or Railway dynamic `$PORT`).

### Frontend (`apps/web/.env.local`)
- `NEXT_PUBLIC_API_BASE_URL`: Public URL of the deployed Railway backend (e.g. `https://kindred-api.up.railway.app`).
- `NEXTAUTH_SECRET`: Secret key for session security.
- `NEXTAUTH_URL`: Canonical production frontend URL (e.g. `https://kindred.vercel.app`).

---

## Manual Dashboard Steps Required

### On Railway:
1. Click **New Project** → **Deploy from GitHub repo**.
2. Select this repository, and in the service settings, specify the Root Directory as `apps/api`.
3. In the Railway project canvas, click **New** → **Database** → **Add PostgreSQL**. Railway will automatically provision a Postgres database and inject the `DATABASE_URL` variable into your service.
4. In the Variables tab of `apps/api`, add:
   - `JWT_SECRET`: your custom secure string
   - `CORS_ORIGIN`: `https://your-vercel-domain.vercel.app,http://localhost:3000`
5. Railway's Nixpacks runner will detect `apps/api/railway.json` and automatically run `prisma migrate deploy` followed by starting the server.
6. Verify deployment by visiting `https://your-railway-app.up.railway.app/health`. It must respond with `{"status":"ok"}`.

### On Vercel:
1. Click **Add New...** → **Project** → Import this GitHub repository.
2. In the configuration screen, set **Root Directory** to `apps/web`.
3. Open **Environment Variables** and configure:
   - `NEXT_PUBLIC_API_BASE_URL`: your Railway app URL (e.g., `https://your-railway-url.up.railway.app`)
   - `NEXTAUTH_SECRET`: a 32+ character secret
   - `NEXTAUTH_URL`: your Vercel URL (e.g., `https://your-app.vercel.app`)
4. Click **Deploy**. Vercel will install dependencies via pnpm and compile the Next.js static and serverless routes.

---

## Local Development

```bash
# Install all dependencies across the workspace
pnpm install

# Start both frontend and backend concurrently
pnpm dev

# Or start individually:
pnpm --filter api dev   # Express API on http://localhost:4000
pnpm --filter web dev   # Next.js frontend on http://localhost:3000
```
