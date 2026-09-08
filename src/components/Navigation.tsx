import React from 'react';
import { useKindredStore } from '../store/useKindredStore';
import {
  Compass,
  BookOpen,
  Calendar,
  Sparkles,
  Layers,
  Eye,
  Type,
  UserCheck,
  Video,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const store = useKindredStore();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EF]/95 backdrop-blur border-b border-[#E5D9C5] shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => store.navigate('landing')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#C1633D] text-[#F7F1E6] flex items-center justify-center font-serif text-2xl font-bold shadow-sm group-hover:bg-[#A8502E] transition">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2F4131]">
                  Kindred
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#EDE3D1] text-[#C1633D] text-[10px] font-bold uppercase tracking-wider">
                  Exchange
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-[#415A44] font-medium">
                Intergenerational Wisdom
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => store.navigate('discover')}
              id="nav-discover-btn"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                store.currentPage === 'discover'
                  ? 'bg-[#2F4131] text-[#F7F1E6] shadow-xs'
                  : 'text-[#2F4131] hover:bg-[#EDE3D1]/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#C9A45C]" /> Life-Shelf
            </button>

            <button
              onClick={() => store.navigate('mentor-detail', { mentorId: 'mentor-1' })}
              id="nav-postcards-btn"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                store.currentPage === 'mentor-detail'
                  ? 'bg-[#2F4131] text-[#F7F1E6] shadow-xs'
                  : 'text-[#2F4131] hover:bg-[#EDE3D1]/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C1633D]" /> Postcard Profiles
            </button>

            <button
              onClick={() => store.navigate('session', { sessionId: 'session-101' })}
              id="nav-session-btn"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                store.currentPage === 'session'
                  ? 'bg-[#2F4131] text-[#F7F1E6] shadow-xs'
                  : 'text-[#2F4131] hover:bg-[#EDE3D1]/60'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#C1633D]" /> Studio Room
            </button>

            <button
              onClick={() => store.navigate('journal', { mentorId: 'mentor-1' })}
              id="nav-journal-btn"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                store.currentPage === 'journal'
                  ? 'bg-[#2F4131] text-[#F7F1E6] shadow-xs'
                  : 'text-[#2F4131] hover:bg-[#EDE3D1]/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" /> Legacy Journal
            </button>

            <button
              onClick={() => store.navigate('dashboard')}
              id="nav-dashboard-btn"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                store.currentPage === 'dashboard'
                  ? 'bg-[#2F4131] text-[#F7F1E6] shadow-xs'
                  : 'text-[#2F4131] hover:bg-[#EDE3D1]/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Dashboard
            </button>
          </nav>

          {/* Right Action Bar & Accessibility Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Accessibility Controls Pill */}
            <div className="flex items-center bg-[#FDFBF7] border border-[#E5D9C5] rounded-full p-1 shadow-2xs">
              {/* High Contrast Toggle */}
              <button
                onClick={() => store.toggleHighContrast()}
                id="toggle-contrast-btn"
                title="Toggle High Contrast Mode"
                className={`p-1.5 rounded-full transition flex items-center gap-1 text-[11px] font-semibold px-2 ${
                  store.highContrast
                    ? 'bg-[#111B12] text-[#FFFFFF]'
                    : 'text-[#2F4131] hover:bg-[#EDE3D1]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">
                  {store.highContrast ? 'High' : 'Contrast'}
                </span>
              </button>

              {/* Font Size Scaler */}
              <div className="flex items-center border-l border-[#E5D9C5] ml-1 pl-1 gap-0.5">
                <button
                  onClick={() => store.setFontSize('normal')}
                  id="font-size-normal-btn"
                  title="Normal font size (16px)"
                  className={`px-1.5 py-1 rounded text-[11px] font-bold ${
                    store.fontSize === 'normal'
                      ? 'bg-[#C1633D] text-[#F7F1E6]'
                      : 'text-[#415A44] hover:bg-[#EDE3D1]'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => store.setFontSize('large')}
                  id="font-size-large-btn"
                  title="Large font size (18px)"
                  className={`px-1.5 py-1 rounded text-xs font-bold ${
                    store.fontSize === 'large'
                      ? 'bg-[#C1633D] text-[#F7F1E6]'
                      : 'text-[#415A44] hover:bg-[#EDE3D1]'
                  }`}
                >
                  A+
                </button>
                <button
                  onClick={() => store.setFontSize('extra-large')}
                  id="font-size-xl-btn"
                  title="Extra Large font size (20px)"
                  className={`px-1.5 py-1 rounded text-sm font-bold ${
                    store.fontSize === 'extra-large'
                      ? 'bg-[#C1633D] text-[#F7F1E6]'
                      : 'text-[#415A44] hover:bg-[#EDE3D1]'
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            {/* Monorepo Architecture & Railway Deployment Drawer Button */}
            <button
              onClick={() => store.toggleMonorepoInspector(true)}
              id="monorepo-inspector-btn"
              className="px-3 py-2 rounded-full border border-[#2F4131] text-[#2F4131] bg-[#FAF6EF] hover:bg-[#EDE3D1] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
              title="Inspect Monorepo Files & Railway/Vercel Deploy Specs"
            >
              <Layers className="w-3.5 h-3.5 text-[#C1633D]" />
              <span className="hidden sm:inline">Monorepo & Deploy</span>
            </button>

            {/* Role Switcher Pill */}
            <button
              onClick={() =>
                store.setUserRole(store.userRole === 'LEARNER' ? 'MENTOR' : 'LEARNER')
              }
              id="switch-role-btn"
              className="flex items-center gap-2 p-1 sm:pr-3 rounded-full bg-[#EDE3D1] hover:bg-[#E3D6C0] border border-[#D8C7B0] transition"
              title="Toggle role between Learner Marcus Chen and Mentor Eleanor Vance"
            >
              <img
                src={store.currentUserAvatar}
                alt={store.currentUserName}
                className="w-7 h-7 rounded-full object-cover border border-[#C1633D]"
              />
              <div className="text-left hidden lg:block leading-none">
                <span className="text-[10px] uppercase font-bold text-[#C1633D] block">
                  {store.userRole}
                </span>
                <span className="text-xs font-medium text-[#2F4131]">
                  {store.currentUserName.split(' ')[0]}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#E5D9C5] bg-[#FAF6EF] px-2 py-2 text-[11px] font-semibold">
        <button
          onClick={() => store.navigate('discover')}
          className={`px-2.5 py-1.5 rounded-lg ${store.currentPage === 'discover' ? 'bg-[#2F4131] text-[#F7F1E6]' : 'text-[#2F4131]'}`}
        >
          Life-Shelf
        </button>
        <button
          onClick={() => store.navigate('mentor-detail', { mentorId: 'mentor-1' })}
          className={`px-2.5 py-1.5 rounded-lg ${store.currentPage === 'mentor-detail' ? 'bg-[#2F4131] text-[#F7F1E6]' : 'text-[#2F4131]'}`}
        >
          Postcards
        </button>
        <button
          onClick={() => store.navigate('session', { sessionId: 'session-101' })}
          className={`px-2.5 py-1.5 rounded-lg ${store.currentPage === 'session' ? 'bg-[#2F4131] text-[#F7F1E6]' : 'text-[#2F4131]'}`}
        >
          Studio Room
        </button>
        <button
          onClick={() => store.navigate('journal', { mentorId: 'mentor-1' })}
          className={`px-2.5 py-1.5 rounded-lg ${store.currentPage === 'journal' ? 'bg-[#2F4131] text-[#F7F1E6]' : 'text-[#2F4131]'}`}
        >
          Journal
        </button>
        <button
          onClick={() => store.navigate('dashboard')}
          className={`px-2.5 py-1.5 rounded-lg ${store.currentPage === 'dashboard' ? 'bg-[#2F4131] text-[#F7F1E6]' : 'text-[#2F4131]'}`}
        >
          Dashboard
        </button>
      </div>
    </header>
  );
};
