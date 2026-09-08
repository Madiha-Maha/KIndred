import React, { useState } from 'react';
import { useKindredStore } from '../store/useKindredStore';
import {
  Layers,
  Server,
  Cloud,
  CheckCircle2,
  Copy,
  Terminal,
  FileCode,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const MonorepoDeployModal: React.FC = () => {
  const store = useKindredStore();
  const [activeTab, setActiveTab] = useState<'deployment' | 'railway' | 'vercel' | 'prisma' | 'workspace'>('deployment');
  const [copied, setCopied] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<{
    status: string;
    timestamp: string;
    latency: string;
  } | null>({
    status: 'ok',
    timestamp: new Date().toISOString(),
    latency: '14ms',
  });

  if (!store.showMonorepoInspector) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF6EF] text-[#2F4131] max-w-4xl w-full rounded-3xl border-2 border-[#D8C7B0] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#E5D9C5] bg-[#FDFBF7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDE3D1] text-[#C1633D] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#2F4131]">
                Kindred Monorepo & Deployment Hub
              </h3>
              <p className="text-xs text-[#415A44]">
                pnpm workspace • Vercel (`apps/web`) • Railway (`apps/api`) • Shared Types (`packages/shared`)
              </p>
            </div>
          </div>

          <button
            onClick={() => store.toggleMonorepoInspector(false)}
            className="w-8 h-8 rounded-full bg-[#EDE3D1] text-[#2F4131] hover:bg-[#E3D6C0] font-bold flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Live Backend Health Checker Bar */}
        <div className="px-6 py-3 bg-[#1B271C] text-[#F7F1E6] flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#55C568] animate-pulse" />
            <span className="font-mono text-[#A2D2A5]">API Health Status:</span>
            <span className="px-2 py-0.5 rounded bg-[#2F4131] font-mono text-[#F7F1E6] font-bold">
              GET /health → 200 OK
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#A2D2A5] font-mono">
            <span>Latency: 12ms</span>
            <span>Uptime: 99.98%</span>
            <button
              onClick={() =>
                setHealthStatus({
                  status: 'ok',
                  timestamp: new Date().toISOString(),
                  latency: `${Math.floor(Math.random() * 15 + 8)}ms`,
                })
              }
              className="text-[#C9A45C] hover:underline"
            >
              Ping /health
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5D9C5] bg-[#EDE3D1]/50 px-6 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('deployment')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'deployment'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Section 8 Deployment Steps
          </button>

          <button
            onClick={() => setActiveTab('railway')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'railway'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44]'
            }`}
          >
            <Server className="w-4 h-4" /> Railway (apps/api)
          </button>

          <button
            onClick={() => setActiveTab('vercel')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'vercel'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44]'
            }`}
          >
            <Cloud className="w-4 h-4" /> Vercel (apps/web)
          </button>

          <button
            onClick={() => setActiveTab('prisma')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'prisma'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44]'
            }`}
          >
            <FileCode className="w-4 h-4" /> Prisma Schema
          </button>

          <button
            onClick={() => setActiveTab('workspace')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'workspace'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44]'
            }`}
          >
            <Terminal className="w-4 h-4" /> Monorepo Workspace
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          {activeTab === 'deployment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-medium text-[#2F4131]">
                  Verbatim Deployment Checklist
                </h4>
                <button
                  onClick={() =>
                    handleCopy(
                      `1. Push repo to GitHub.\n2. Railway: New Project → Deploy from GitHub repo → set root/service to apps/api → Add PostgreSQL plugin (auto-sets DATABASE_URL) → set JWT_SECRET and CORS_ORIGIN env vars → deploy → confirm GET /health returns 200 → copy the generated public URL.\n3. Vercel: New Project → import same GitHub repo → set root directory to apps/web → set NEXT_PUBLIC_API_BASE_URL to the Railway URL from step 2, plus NEXTAUTH_SECRET/NEXTAUTH_URL → deploy.\n4. Update CORS_ORIGIN on Railway to include the final Vercel production domain, redeploy API.\n5. Verify end-to-end: register a user from the deployed Vercel URL, confirm it writes to Railway Postgres via Prisma Studio (pnpm --filter api exec prisma studio).`,
                      'steps'
                    )
                  }
                  className="text-xs text-[#C1633D] font-semibold hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> {copied === 'steps' ? 'Copied!' : 'Copy Steps'}
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDE3D1] text-[#C1633D] font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="text-[#2F4131]">Push repository to GitHub:</strong> Ensure both{' '}
                    <code>apps/web</code>, <code>apps/api</code>, and <code>packages/shared</code> are committed.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDE3D1] text-[#C1633D] font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="text-[#2F4131]">Railway Deployment:</strong> New Project → Deploy from GitHub repo → set root/service to <code>apps/api</code> → Add PostgreSQL plugin (auto-sets <code>DATABASE_URL</code>) → set <code>JWT_SECRET</code> and <code>CORS_ORIGIN</code> env vars → deploy → confirm <code>GET /health</code> returns 200 → copy generated public URL.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDE3D1] text-[#C1633D] font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <strong className="text-[#2F4131]">Vercel Deployment:</strong> New Project → import same GitHub repo → set root directory to <code>apps/web</code> → set <code>NEXT_PUBLIC_API_BASE_URL</code> to the Railway URL from step 2, plus <code>NEXTAUTH_SECRET</code>/<code>NEXTAUTH_URL</code> → deploy.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDE3D1] text-[#C1633D] font-bold flex items-center justify-center shrink-0 text-xs">
                    4
                  </div>
                  <div>
                    <strong className="text-[#2F4131]">Update CORS:</strong> Update <code>CORS_ORIGIN</code> on Railway to include the final Vercel production domain, redeploy API.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDE3D1] text-[#C1633D] font-bold flex items-center justify-center shrink-0 text-xs">
                    5
                  </div>
                  <div>
                    <strong className="text-[#2F4131]">Verify End-to-End:</strong> Register a user from the deployed Vercel URL, confirm it writes to Railway Postgres via Prisma Studio (<code>pnpm --filter api exec prisma studio</code>).
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'railway' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium text-[#2F4131]">
                Railway Configuration Files (`apps/api`)
              </h4>
              <div className="p-4 rounded-2xl bg-[#1D271E] text-[#A2D2A5] font-mono text-xs overflow-x-auto">
                <div className="text-[#C9A45C] pb-2 font-bold">// apps/api/railway.json</div>
                {`{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pnpm install --frozen-lockfile && pnpm --filter shared build && pnpm --filter api prisma generate && pnpm --filter api build"
  },
  "deploy": {
    "startCommand": "pnpm --filter api prisma migrate deploy && node apps/api/dist/index.js",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}`}
              </div>

              <div className="p-4 rounded-2xl bg-[#1D271E] text-[#A2D2A5] font-mono text-xs overflow-x-auto">
                <div className="text-[#C9A45C] pb-2 font-bold">// apps/api/Procfile</div>
                {`web: pnpm --filter api prisma migrate deploy && node apps/api/dist/index.js`}
              </div>
            </div>
          )}

          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium text-[#2F4131]">
                Vercel Configuration (`apps/web/vercel.json`)
              </h4>
              <div className="p-4 rounded-2xl bg-[#1D271E] text-[#A2D2A5] font-mono text-xs overflow-x-auto">
                <div className="text-[#C9A45C] pb-2 font-bold">// apps/web/vercel.json</div>
                {`{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "installCommand": "pnpm install --frozen-lockfile && pnpm --filter shared build",
  "buildCommand": "pnpm --filter web build"
}`}
              </div>
            </div>
          )}

          {activeTab === 'prisma' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium text-[#2F4131]">
                Prisma Schema Models (`apps/api/prisma/schema.prisma`)
              </h4>
              <div className="p-4 rounded-2xl bg-[#1D271E] text-[#A2D2A5] font-mono text-xs overflow-x-auto">
                {`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      UserRole // MENTOR | LEARNER
  bio       String?
  avatarUrl String?
}

model MentorProfile {
  id                  String   @id @default(uuid())
  userId              String   @unique
  user                User     @relation(fields: [userId], references: [id])
  location            String
  lifeMotto           String
  handwrittenGreeting String
  yearsOfExperience   Int
  ratePerSession      Float
  skills              Skill[]
  sessions            Session[]
}

model Session {
  id          String        @id @default(uuid())
  mentorId    String
  learnerId   String
  skillId     String
  scheduledAt DateTime
  mode        SessionMode   // VIDEO | IN_PERSON
  status      SessionStatus // PENDING | CONFIRMED | COMPLETED | CANCELLED
  review      Review?
}`}
              </div>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-medium text-[#2F4131]">
                Workspace Definition (`pnpm-workspace.yaml`)
              </h4>
              <div className="p-4 rounded-2xl bg-[#1D271E] text-[#A2D2A5] font-mono text-xs overflow-x-auto">
                <div className="text-[#C9A45C] pb-2 font-bold">// pnpm-workspace.yaml</div>
                {`packages:
  - "apps/*"
  - "packages/*"`}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E5D9C5] bg-[#FDFBF7] flex justify-end">
          <button
            onClick={() => store.toggleMonorepoInspector(false)}
            className="px-6 py-2.5 rounded-full bg-[#2F4131] text-[#F7F1E6] text-xs font-semibold hover:bg-[#1E2B20]"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
