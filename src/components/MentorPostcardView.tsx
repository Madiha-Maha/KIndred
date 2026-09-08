import React from 'react';
import { useKindredStore } from '../store/useKindredStore';
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Award,
  Sparkles,
  Heart,
} from 'lucide-react';

export const MentorPostcardView: React.FC = () => {
  const store = useKindredStore();
  const mentor =
    store.mentors.find((m) => m.id === store.selectedMentorId) || store.mentors[0];

  const compatibility = store.calculateCompatibility('learner-1', mentor.skills[0].id);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Back to Shelf navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => store.navigate('discover')}
          className="text-xs uppercase tracking-widest text-[#C1633D] font-bold hover:underline flex items-center gap-1"
        >
          ← Return to Life-Shelf
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => store.navigate('journal', { mentorId: mentor.id })}
            className="text-xs font-semibold px-4 py-2 rounded-full border border-[#2F4131] text-[#2F4131] hover:bg-[#EDE3D1] transition flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" /> Read Legacy Journal
          </button>
        </div>
      </div>

      {/* THE POSTCARD CONTAINER */}
      <div className="postcard-texture border-4 border-[#D8C7B0] rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
        {/* POSTMARK AND STAMP IN TOP RIGHT */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 pointer-events-none flex items-center gap-2 rotate-2 opacity-90">
          {/* Postmark Circle */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-[#C1633D] p-1 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-mono tracking-widest text-[#C1633D] uppercase">
              KINDRED POST
            </span>
            <span className="text-[10px] font-bold text-[#2F4131] font-serif leading-tight mt-0.5">
              {mentor.stampPostmark}
            </span>
            <span className="text-[8px] text-[#415A44] font-mono mt-0.5">WISDOM AIRMAIL</span>
          </div>

          {/* Postage Stamp */}
          <div className="w-16 h-20 sm:w-20 sm:h-24 border-2 border-dashed border-[#2F4131] bg-[#FAF6EF] rounded-md p-1.5 flex flex-col justify-between items-center text-center shadow-xs">
            <span className="text-[8px] font-bold text-[#C1633D] tracking-widest">USA 2026</span>
            <span className="text-2xl sm:text-3xl">🏺</span>
            <span className="text-[9px] font-serif font-bold text-[#2F4131] leading-none">
              SLOW CRAFT
            </span>
          </div>
        </div>

        {/* POSTCARD CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10 pt-4 sm:pt-0">
          {/* LEFT SIDE: Personal handwritten dispatch and mentor identity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4 pr-16 sm:pr-0">
              <img
                src={mentor.avatarUrl}
                alt={mentor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#E5D9C5] shadow-sm"
              />
              <div>
                <span className="text-xs uppercase font-bold text-[#C1633D] tracking-wider">
                  Elder Craft Master
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2F4131]">
                  {mentor.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#415A44] flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C1633D]" />
                  {mentor.location} • {mentor.yearsOfExperience} years devoted to craft
                </p>
              </div>
            </div>

            {/* HANDWRITTEN POSTCARD DISPATCH (Signature UI) */}
            <div className="p-6 rounded-2xl bg-[#FAF6EF] border border-[#E5D9C5] shadow-xs space-y-3 relative">
              <div className="text-[11px] uppercase font-bold tracking-widest text-[#C1633D]">
                Handwritten Message on Postcard:
              </div>
              <p className="font-script text-2xl sm:text-3xl text-[#2F4131] leading-snug">
                "{mentor.handwrittenGreeting}"
              </p>
              <div className="text-xs text-[#415A44] border-t border-[#EDE3D1] pt-3 flex items-center gap-1.5">
                <span className="font-semibold text-[#2F4131]">Guiding Principle:</span>
                <span className="italic font-serif">"{mentor.lifeMotto}"</span>
              </div>
            </div>

            {/* Biography & Studio Tradition */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg text-[#2F4131] font-medium">
                The Story of My Practice
              </h3>
              <p className="text-sm text-[#415A44] leading-relaxed">{mentor.bio}</p>
            </div>

            {/* Mastered Skills List */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-[#2F4131] font-medium">
                Lineages & Techniques
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {mentor.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 rounded-xl bg-[#FAF6EF] border border-[#EDE3D1] flex items-center gap-3"
                  >
                    <span className="text-xl">{skill.shelfObjectIcon || '✨'}</span>
                    <div>
                      <div className="text-xs font-semibold text-[#2F4131]">{skill.name}</div>
                      <div className="text-[10px] text-[#415A44]">{skill.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews from modern learners */}
            <div className="space-y-3 pt-4 border-t border-[#E5D9C5]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-[#2F4131] font-medium">
                  Apprentice Testimonials
                </h3>
                <div className="flex items-center gap-1 text-xs text-[#C9A45C]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-[#2F4131]">{mentor.averageRating}</span>
                  <span className="text-[#415A44]">({mentor.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] text-xs text-[#415A44] space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-[#2F4131]">
                  <span>Marcus Chen (Apprentice)</span>
                  <span className="text-[#C9A45C]">★★★★★</span>
                </div>
                <p className="italic font-serif">
                  "Eleanor stopped my hand twice on the wheel and asked me what I was trying to prove.
                  That single question changed how I approach architecture, design, and mornings."
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Booking Desk Card */}
          <div className="lg:col-span-5 bg-[#FAF6EF] border-2 border-[#E5D9C5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-baseline justify-between border-b border-[#E5D9C5] pb-4">
              <div>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#2F4131]">
                  ${mentor.ratePerSession}
                </span>
                <span className="text-xs text-[#415A44]"> / 60-min transmission</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EDE3D1] text-[#C1633D]">
                Verified Master
              </span>
            </div>

            {/* Kindred Compatibility Score */}
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#D8C7B0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F4131] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C9A45C]" /> Compatibility Match
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-bold">
                  {compatibility.score}%
                </span>
              </div>
              <p className="text-xs text-[#415A44] leading-relaxed">
                {compatibility.reasoning}
              </p>
            </div>

            {/* Studio Hours Availability */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#2F4131] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C1633D]" /> Regular Studio Availability
              </h4>
              <div className="space-y-2">
                {mentor.availability.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FDFBF7] border border-[#EDE3D1]"
                  >
                    <span className="font-semibold text-[#2F4131]">{slot.dayOfWeek}</span>
                    <span className="text-[#415A44]">
                      {slot.startTime} – {slot.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Sided Trust Banner */}
            <div className="p-3.5 rounded-xl bg-[#EDE3D1]/70 text-xs text-[#415A44] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2F4131] shrink-0 mt-0.5" />
              <span>
                1-on-1 private attention. Unhurried transmission. Automatic archiving of session takeaways into the Legacy Journal.
              </span>
            </div>

            {/* Booking Action Button */}
            <button
              onClick={() => store.navigate('booking', { mentorId: mentor.id })}
              id="postcard-book-now-btn"
              className="w-full py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium text-center hover:bg-[#A8502E] transition shadow-md flex items-center justify-center gap-2 text-sm"
            >
              Book Apprenticeship Session <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
