import Link from 'next/link';
import { ArrowRight, Compass, Heart, BookOpen, Sparkles, Award } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E6]">
      {/* Top Bar */}
      <header className="border-b border-[#E5D9C5] bg-[#FAF6EF]/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C1633D] text-[#F7F1E6] flex items-center justify-center font-serif text-xl font-bold shadow-sm">
              K
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#2F4131]">Kindred</span>
              <p className="text-xs uppercase tracking-widest text-[#C1633D] font-medium -mt-1">Wisdom Exchange</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/discover" className="text-[#2F4131] hover:text-[#C1633D] transition">Life-Shelf</Link>
            <Link href="/dashboard" className="text-[#2F4131] hover:text-[#C1633D] transition">Dashboard</Link>
            <Link href="/onboarding" className="px-5 py-2.5 rounded-full bg-[#2F4131] text-[#F7F1E6] hover:bg-[#1E2B20] transition shadow-sm">
              Join as Mentor or Learner
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE3D1] text-[#2F4131] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            Intergenerational Craft & Wisdom Apprenticeship
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#2F4131] leading-tight max-w-4xl mx-auto">
            Where decades of <span className="italic font-normal text-[#C1633D]">living wisdom</span> find hungry hands.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-[#415A44] max-w-2xl mx-auto leading-relaxed">
            Kindred pairs senior masters with younger seekers for 1-on-1 apprenticeships in heirloom skills, slow crafts, and lived life philosophy.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/discover"
              className="px-8 py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium hover:bg-[#A8502E] transition shadow-md flex items-center gap-2 text-base"
            >
              Explore the Life-Shelf <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/onboarding"
              className="px-8 py-4 rounded-full border border-[#2F4131] text-[#2F4131] font-medium hover:bg-[#FAF6EF] transition text-base"
            >
              Share Your Lifetime Craft
            </Link>
          </div>
        </section>

        {/* Postcard Preview Banner */}
        <section className="bg-[#FAF6EF] border-y border-[#E5D9C5] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] shadow-sm">
                <Compass className="w-8 h-8 text-[#C1633D] mb-4" />
                <h3 className="font-serif text-xl text-[#2F4131] mb-2 font-medium">Tactile Postcards</h3>
                <p className="text-sm text-[#415A44] leading-relaxed">
                  Every mentor profile is framed as a personalized handwritten dispatch, preserving character and warmth.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] shadow-sm">
                <BookOpen className="w-8 h-8 text-[#C9A45C] mb-4" />
                <h3 className="font-serif text-xl text-[#2F4131] mb-2 font-medium">The Life-Shelf</h3>
                <p className="text-sm text-[#415A44] leading-relaxed">
                  Browse crafts as tactile shelf objects — woodcraft, sourdough starters, silver darkroom printing, and pottery.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] shadow-sm">
                <Award className="w-8 h-8 text-[#2F4131] mb-4" />
                <h3 className="font-serif text-xl text-[#2F4131] mb-2 font-medium">Legacy Journals</h3>
                <p className="text-sm text-[#415A44] leading-relaxed">
                  Each completed session archives core aphorisms and techniques into a timeless public wisdom vault.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E5D9C5] py-10 text-center text-sm text-[#415A44]">
        <p>© Kindred Technologies. Built for authentic intergenerational connection.</p>
      </footer>
    </div>
  );
}
