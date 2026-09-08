import React from 'react';
import { useKindredStore } from './store/useKindredStore';
import { Navigation } from './components/Navigation';
import { LandingView } from './components/LandingView';
import { LifeShelfView } from './components/LifeShelfView';
import { MentorPostcardView } from './components/MentorPostcardView';
import { BookingView } from './components/BookingView';
import { SessionRoomView } from './components/SessionRoomView';
import { LegacyJournalView } from './components/LegacyJournalView';
import { DashboardView } from './components/DashboardView';
import { OnboardingView } from './components/OnboardingView';
import { MonorepoDeployModal } from './components/MonorepoDeployModal';
import { Sparkles, Heart, Compass, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const store = useKindredStore();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        store.highContrast ? 'bg-[#FFFFFF] text-[#000000]' : 'bg-[#F7F1E6] text-[#2F4131]'
      }`}
    >
      <Navigation />

      <main className="flex-1">
        {store.currentPage === 'landing' && <LandingView />}
        {store.currentPage === 'discover' && <LifeShelfView />}
        {store.currentPage === 'mentor-detail' && <MentorPostcardView />}
        {store.currentPage === 'booking' && <BookingView />}
        {store.currentPage === 'session' && <SessionRoomView />}
        {store.currentPage === 'journal' && <LegacyJournalView />}
        {store.currentPage === 'dashboard' && <DashboardView />}
        {store.currentPage === 'onboarding' && <OnboardingView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5D9C5] bg-[#FAF6EF] py-12 px-4 sm:px-6 lg:px-8 mt-16 text-xs text-[#415A44]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#C1633D] text-[#F7F1E6] flex items-center justify-center font-serif text-lg font-bold">
              K
            </div>
            <div>
              <span className="font-serif font-semibold text-sm text-[#2F4131]">Kindred</span>
              <p className="text-[11px] text-[#415A44]">
                Intergenerational Skill & Wisdom Exchange • Hand-crafted continuity
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-[#2F4131]">
            <button
              onClick={() => store.navigate('discover')}
              className="hover:text-[#C1633D] transition"
            >
              The Life-Shelf
            </button>
            <button
              onClick={() => store.navigate('mentor-detail', { mentorId: 'mentor-1' })}
              className="hover:text-[#C1633D] transition"
            >
              Postcard Profiles
            </button>
            <button
              onClick={() => store.navigate('journal', { mentorId: 'mentor-1' })}
              className="hover:text-[#C1633D] transition"
            >
              Legacy Journal
            </button>
            <button
              onClick={() => store.navigate('onboarding')}
              className="hover:text-[#C1633D] transition"
            >
              Join as Mentor
            </button>
            <button
              onClick={() => store.toggleMonorepoInspector(true)}
              className="hover:text-[#C1633D] transition flex items-center gap-1 text-[#C1633D] font-bold"
            >
              <Layers className="w-3.5 h-3.5" /> Deploy Guide
            </button>
          </div>

          <div className="text-[11px] text-[#415A44] text-center md:text-right">
            Deployed on Vercel & Railway • PostgreSQL via Prisma
          </div>
        </div>
      </footer>

      {/* Deployment & Monorepo Code Inspector Modal */}
      <MonorepoDeployModal />
    </div>
  );
}
