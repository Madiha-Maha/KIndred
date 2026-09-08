'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../lib/api-client';
import { Calendar, Clock, Star, MapPin, Compass, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

export default function MentorPostcardPage() {
  const params = useParams();
  const mentorId = (params?.id as string) || 'mentor-1';
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.getMentorById(mentorId);
        setMentor(res.mentor);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [mentorId]);

  if (loading || !mentor) {
    return (
      <div className="min-h-screen bg-[#F7F1E6] flex items-center justify-center p-6 text-[#2F4131]">
        Loading mentor postcard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1E6] p-6 lg:p-12 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6 flex items-center justify-between">
        <Link href="/discover" className="text-xs uppercase tracking-widest text-[#C1633D] font-bold hover:underline">
          ← Back to Life-Shelf
        </Link>
        <Link
          href={`/journal/${mentor.id}`}
          className="text-xs font-semibold px-4 py-2 rounded-full border border-[#2F4131] text-[#2F4131] hover:bg-[#FAF6EF]"
        >
          Read Legacy Journal
        </Link>
      </div>

      {/* The Handwritten Postcard Container */}
      <div className="w-full max-w-4xl bg-[#FAF6EF] border-2 border-[#D8C7B0] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        {/* Postmark stamp simulation in top-right */}
        <div className="absolute top-6 right-8 sm:top-10 sm:right-12 pointer-events-none opacity-85">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-[#C1633D] p-2 flex flex-col items-center justify-center text-center rotate-6">
            <span className="text-[10px] font-mono tracking-widest text-[#C1633D] uppercase">KINDRED POST</span>
            <span className="text-xs font-bold text-[#2F4131] font-serif mt-0.5">{mentor.location}</span>
            <span className="text-[9px] text-[#415A44] font-mono mt-0.5">WISDOM AIRMAIL</span>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Column: Portrait & Postcard Message */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={mentor.avatarUrl}
                alt={mentor.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E5D9C5] shadow-sm"
              />
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#2F4131] font-medium">{mentor.name}</h1>
                <p className="text-sm text-[#415A44] flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-[#C1633D]" /> {mentor.location} • {mentor.yearsOfExperience} yrs practicing
                </p>
              </div>
            </div>

            {/* Handwritten Message */}
            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] shadow-inner space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#C1633D] font-bold">Personal Dispatch:</div>
              <p className="font-serif italic text-lg sm:text-xl text-[#2F4131] leading-relaxed">
                "{mentor.handwrittenGreeting}"
              </p>
              <div className="text-xs text-[#415A44] border-t border-[#EDE3D1] pt-3">
                <span className="font-semibold text-[#2F4131]">Life motto:</span> {mentor.lifeMotto}
              </div>
            </div>

            {/* Bio & Craft philosophy */}
            <div>
              <h3 className="font-serif text-lg text-[#2F4131] font-medium mb-2">About My Practice</h3>
              <p className="text-sm text-[#415A44] leading-relaxed">{mentor.bio}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-serif text-lg text-[#2F4131] font-medium mb-2">Mastered Traditions</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((s: any) => (
                  <div key={s.id} className="px-3.5 py-1.5 rounded-lg bg-[#EDE3D1] text-[#2F4131] text-xs font-medium">
                    {s.name} <span className="text-[#C1633D]">({s.category})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Rate, Availability & Booking CTA */}
          <div className="md:col-span-5 bg-[#FDFBF7] border border-[#E5D9C5] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-baseline justify-between border-b border-[#E5D9C5] pb-4">
              <div>
                <span className="text-3xl font-serif font-bold text-[#2F4131]">${mentor.ratePerSession}</span>
                <span className="text-xs text-[#415A44]"> / 60-min session</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-[#2F4131]">
                <Star className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
                {mentor.averageRating} <span className="text-xs text-[#415A44]">({mentor.reviewsCount})</span>
              </div>
            </div>

            {/* Availability Slots */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C1633D]" /> Regular Studio Hours
              </h4>
              <div className="space-y-2">
                {mentor.availability.map((slot: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-[#FAF6EF] border border-[#EDE3D1]"
                  >
                    <span className="font-semibold text-[#2F4131]">{slot.dayOfWeek}</span>
                    <span className="text-[#415A44]">{slot.startTime} – {slot.endTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intergenerational Promise */}
            <div className="p-3.5 rounded-xl bg-[#EDE3D1]/50 text-xs text-[#415A44] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2F4131] shrink-0 mt-0.5" />
              <span>Dedicated 1-on-1 pacing, unhurried guidance, and an automatic entry created in the Legacy Journal.</span>
            </div>

            {/* Booking Button */}
            <Link
              href={`/booking/${mentor.id}`}
              className="w-full py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium text-center hover:bg-[#A8502E] transition shadow-md flex items-center justify-center gap-2 text-sm"
            >
              Book Apprenticeship Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
