'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../lib/api-client';
import { BookOpen, Quote, Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function LegacyJournalPage() {
  const params = useParams();
  const mentorId = (params?.mentorId as string) || 'mentor-1';

  const [entries, setEntries] = useState<any[]>([]);
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [journalRes, mentorRes] = await Promise.all([
          apiClient.getJournal(mentorId),
          apiClient.getMentorById(mentorId),
        ]);
        setEntries(journalRes.entries);
        setMentor(mentorRes.mentor);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [mentorId]);

  return (
    <div className="min-h-screen bg-[#F7F1E6] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <Link
            href={mentor ? `/mentors/${mentor.id}` : '/discover'}
            className="text-xs uppercase tracking-widest text-[#C1633D] font-bold hover:underline mb-3 inline-block"
          >
            ← Return to {mentor ? `${mentor.name}'s Postcard` : 'Discover'}
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2F4131] font-light">
            The <span className="italic font-normal text-[#C1633D]">Legacy Journal</span>
          </h1>
          <p className="mt-3 text-sm text-[#415A44] max-w-xl mx-auto">
            Living records of transmission — timeless aphorisms, technical subtleties, and generational reflections preserved from completed apprenticeships.
          </p>
        </header>

        {/* Entries stream */}
        <div className="space-y-8">
          {entries.length === 0 ? (
            <div className="bg-[#FAF6EF] border border-[#E5D9C5] rounded-3xl p-12 text-center text-[#415A44]">
              No archived entries found yet for this mentor. As apprentices finish sessions, wisdom is recorded here.
            </div>
          ) : (
            entries.map((entry) => (
              <article
                key={entry.id}
                className="bg-[#FAF6EF] border-2 border-[#E5D9C5] rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-[#E5D9C5] pb-4 mb-6 text-xs text-[#415A44]">
                  <span className="font-semibold text-[#2F4131]">{entry.mentorName} • {entry.skillName}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C1633D]" />
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-8 space-y-4">
                    <h3 className="font-serif text-2xl text-[#2F4131] font-medium leading-snug">
                      "{entry.summaryText}"
                    </h3>

                    {/* Quotes section */}
                    {entry.quotes && entry.quotes.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {entry.quotes.map((q: string, idx: number) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#EDE3D1] text-xs font-serif italic text-[#415A44] flex items-start gap-2.5"
                          >
                            <Quote className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                            <span>"{q}"</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key lessons */}
                    {entry.keyLessons && entry.keyLessons.length > 0 && (
                      <div className="pt-4">
                        <div className="text-[11px] uppercase tracking-wider font-bold text-[#2F4131] mb-2">
                          Transmission Lessons:
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#415A44]">
                          {entry.keyLessons.map((lesson: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#C1633D] font-bold">•</span>
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {entry.mediaUrl && (
                    <div className="md:col-span-4">
                      <img
                        src={entry.mediaUrl}
                        alt="Craft media"
                        className="w-full h-48 object-cover rounded-2xl border border-[#E5D9C5] shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
