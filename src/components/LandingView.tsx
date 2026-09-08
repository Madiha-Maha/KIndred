import React from 'react';
import { useKindredStore } from '../store/useKindredStore';
import {
  Sparkles,
  ArrowRight,
  Compass,
  BookOpen,
  Heart,
  ShieldCheck,
  Award,
  Layers,
  Star,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const store = useKindredStore();

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE3D1] text-[#2F4131] text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C1633D]" />
            Intergenerational Skill & Wisdom Exchange
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#2F4131] tracking-tight leading-[1.1]">
            Where lifetimes of tactile craft{' '}
            <span className="italic font-normal text-[#C1633D]">meet eager young hands</span>.
          </h1>

          <p className="text-base sm:text-lg text-[#415A44] max-w-2xl mx-auto leading-relaxed">
            In an era of fleeting synthetic feeds, Kindred restores unhurried 1-on-1 human apprenticeship.
            Sit beside master potters, joiners, bakers, and darkroom printers through personal video studios
            and handwritten postcard dispatches.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => store.navigate('discover')}
              id="hero-explore-shelf-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium text-sm hover:bg-[#A8502E] transition shadow-md flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" /> Explore the Life-Shelf
            </button>

            <button
              onClick={() => store.navigate('onboarding')}
              id="hero-join-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#2F4131] text-[#2F4131] bg-[#FAF6EF] font-medium text-sm hover:bg-[#EDE3D1] transition flex items-center justify-center gap-2"
            >
              Join as Mentor or Apprentice <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating signature postcards showcase */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {store.mentors.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => store.navigate('mentor-detail', { mentorId: mentor.id })}
              className="postcard-texture border-2 border-[#E5D9C5] rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#C1633D] uppercase tracking-widest pb-3 border-b border-[#EDE3D1]">
                  <span>{mentor.stampPostmark}</span>
                  <span>{mentor.yearsOfExperience} yrs craft</span>
                </div>

                <div className="flex items-center gap-3.5 mt-4">
                  <img
                    src={mentor.avatarUrl}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#E5D9C5]"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2F4131]">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-[#415A44]">{mentor.location}</p>
                  </div>
                </div>

                <p className="font-script text-xl text-[#2F4131] mt-4 line-clamp-2 leading-relaxed">
                  "{mentor.handwrittenGreeting}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EDE3D1] mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2F4131]">
                  ${mentor.ratePerSession} / session
                </span>
                <span className="text-[#C1633D] font-bold flex items-center gap-1">
                  View Postcard →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE CORE ETHOS PILLARS */}
      <section className="bg-[#EDE3D1]/50 border-y border-[#E5D9C5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2F4131] font-medium">
              Architecture of Human Continuity
            </h2>
            <p className="text-sm text-[#415A44]">
              How Kindred protects and transmits physical culture across generations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FAF6EF] border border-[#D8C7B0] rounded-3xl p-8 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE3D1] text-[#C1633D] flex items-center justify-center font-serif text-xl font-bold">
                01
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2F4131]">
                The Tactile Life-Shelf
              </h3>
              <p className="text-xs sm:text-sm text-[#415A44] leading-relaxed">
                Skills are not dry keywords; they are curated physical artifacts on a wooden shelf — a wood-fired teabowl, an heirloom sourdough starter, an oak mortise joint.
              </p>
            </div>

            <div className="bg-[#FAF6EF] border border-[#D8C7B0] rounded-3xl p-8 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE3D1] text-[#C9A45C] flex items-center justify-center font-serif text-xl font-bold">
                02
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2F4131]">
                Handwritten Postcard Profiles
              </h3>
              <p className="text-xs sm:text-sm text-[#415A44] leading-relaxed">
                Senior mentors introduce their studio through personal warm postcards, stamped from coastal Maine, the Hudson Valley, and Taos with authentic lifetime mottos.
              </p>
            </div>

            <div className="bg-[#FAF6EF] border border-[#D8C7B0] rounded-3xl p-8 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE3D1] text-[#2F4131] flex items-center justify-center font-serif text-xl font-bold">
                03
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2F4131]">
                The Legacy Journal
              </h3>
              <p className="text-xs sm:text-sm text-[#415A44] leading-relaxed">
                Every transmission concludes with distilled lessons, quotes, and memories archived forever into a collective digital family heirloom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & ASSURANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2F4131] text-[#F7F1E6] rounded-3xl p-8 sm:p-14 shadow-2xl grid md:grid-cols-4 gap-8 text-center items-center">
          <div>
            <div className="font-serif text-4xl sm:text-5xl font-light text-[#DEC284]">48+ Yrs</div>
            <div className="text-xs text-[#A2D2A5] mt-1 uppercase tracking-wider">
              Average Craft Devotion
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl sm:text-5xl font-light text-[#DEC284]">1-on-1</div>
            <div className="text-xs text-[#A2D2A5] mt-1 uppercase tracking-wider">
              Private Video Transmission
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl sm:text-5xl font-light text-[#DEC284]">100%</div>
            <div className="text-xs text-[#A2D2A5] mt-1 uppercase tracking-wider">
              Unhurried Human Touch
            </div>
          </div>
          <div>
            <div className="font-serif text-4xl sm:text-5xl font-light text-[#DEC284]">0%</div>
            <div className="text-xs text-[#A2D2A5] mt-1 uppercase tracking-wider">
              Algorithmic Shortcuts
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
