import React, { useState } from 'react';
import { useKindredStore } from '../store/useKindredStore';
import { BookOpen, Quote, Sparkles, Calendar, ArrowRight, User } from 'lucide-react';

export const LegacyJournalView: React.FC = () => {
  const store = useKindredStore();
  const [activeMentorFilter, setActiveMentorFilter] = useState<string>('All');

  const filteredEntries = store.journalEntries.filter((entry) => {
    if (activeMentorFilter === 'All') return true;
    return entry.mentorId === activeMentorFilter;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE3D1] text-[#2F4131] text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" />
          Living Digital Heirloom
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#2F4131]">
          The <span className="italic font-normal text-[#C1633D]">Legacy Journal</span>
        </h1>

        <p className="text-sm sm:text-base text-[#415A44] leading-relaxed">
          Living records of transmission — timeless aphorisms, technical subtleties, and generational reflections preserved from completed apprenticeships across America.
        </p>

        {/* Mentor Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveMentorFilter('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              activeMentorFilter === 'All'
                ? 'bg-[#2F4131] text-[#F7F1E6]'
                : 'bg-[#FAF6EF] text-[#2F4131] border border-[#E5D9C5] hover:bg-[#EDE3D1]'
            }`}
          >
            All Masters ({store.journalEntries.length})
          </button>
          {store.mentors.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMentorFilter(m.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                activeMentorFilter === m.id
                  ? 'bg-[#2F4131] text-[#F7F1E6]'
                  : 'bg-[#FAF6EF] text-[#2F4131] border border-[#E5D9C5] hover:bg-[#EDE3D1]'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Entries Feed */}
      <div className="space-y-8">
        {filteredEntries.map((entry) => (
          <article
            key={entry.id}
            className="postcard-texture border-2 border-[#D8C7B0] rounded-3xl p-6 sm:p-10 shadow-md space-y-6 relative overflow-hidden"
          >
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5D9C5] pb-4 text-xs text-[#415A44]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2F4131] font-serif text-sm">
                  {entry.mentorName}
                </span>
                <span>•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EDE3D1] text-[#C1633D] font-bold text-[10px]">
                  {entry.skillName}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#C1633D]" />
                {new Date(entry.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-start">
              <div className="md:col-span-8 space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2F4131] font-medium leading-snug">
                  "{entry.summaryText}"
                </h3>

                {/* Quotes Section */}
                {entry.quotes && entry.quotes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {entry.quotes.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#EDE3D1] text-xs font-serif italic text-[#2F4131] flex items-start gap-3 shadow-2xs"
                      >
                        <Quote className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">"{q}"</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technical Lessons */}
                {entry.keyLessons && entry.keyLessons.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#2F4131] mb-2">
                      Transmission Lessons:
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#415A44]">
                      {entry.keyLessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#C1633D] font-bold">•</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Photo representation of the craft */}
              {entry.mediaUrl && (
                <div className="md:col-span-4">
                  <img
                    src={entry.mediaUrl}
                    alt={entry.skillName}
                    className="w-full h-52 object-cover rounded-2xl border-2 border-[#E5D9C5] shadow-xs"
                  />
                  <div className="text-[10px] text-[#415A44] text-center mt-2 italic font-serif">
                    Studio documentation • Kindred transmission
                  </div>
                </div>
              )}
            </div>

            {/* Footer action to book that mentor */}
            <div className="pt-4 border-t border-[#E5D9C5] flex items-center justify-between">
              <button
                onClick={() =>
                  store.navigate('mentor-detail', { mentorId: entry.mentorId })
                }
                className="text-xs font-semibold text-[#2F4131] hover:text-[#C1633D] flex items-center gap-1"
              >
                View {entry.mentorName}'s Postcard <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => store.navigate('booking', { mentorId: entry.mentorId })}
                className="px-4 py-1.5 rounded-full bg-[#C1633D] text-white text-xs font-medium hover:bg-[#A8502E]"
              >
                Learn This Craft
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
