'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '../../../lib/api-client';
import { Video, Users, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const mentorId = (params?.mentorId as string) || 'mentor-1';

  const [mentor, setMentor] = useState<any>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<'VIDEO' | 'IN_PERSON'>('VIDEO');
  const [scheduledAt, setScheduledAt] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [compatibility, setCompatibility] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.getMentorById(mentorId);
        setMentor(res.mentor);
        if (res.mentor?.skills?.[0]) {
          setSelectedSkillId(res.mentor.skills[0].id);
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [mentorId]);

  useEffect(() => {
    async function fetchCompatibility() {
      if (selectedSkillId) {
        try {
          const score = await apiClient.getMatchingScore({
            learnerId: 'learner-1',
            skillId: selectedSkillId,
            mentorId,
          });
          setCompatibility(score);
        } catch (e) {
          console.error(e);
        }
      }
    }
    fetchCompatibility();
  }, [selectedSkillId, mentorId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mentor) return;
    setSubmitting(true);

    try {
      const res = await apiClient.createSession({
        mentorId: mentor.id,
        skillId: selectedSkillId || mentor.skills[0].id,
        scheduledAt: scheduledAt || new Date(Date.now() + 86400000 * 2).toISOString(),
        mode: selectedMode,
        notes,
        learnerId: 'learner-1',
        learnerName: 'Marcus Chen',
      });
      setBookingComplete(res.session);
    } catch (err) {
      console.error(err);
      alert('Failed to submit session booking.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-[#F7F1E6] flex items-center justify-center p-6 text-[#2F4131]">
        Loading booking details...
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-[#F7F1E6] p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#FDFBF7] border border-[#E5D9C5] rounded-3xl p-8 text-center shadow-lg">
          <div className="w-14 h-14 bg-[#EDE3D1] rounded-full flex items-center justify-center mx-auto mb-4 text-[#2F4131]">
            <CheckCircle2 className="w-8 h-8 text-[#C1633D]" />
          </div>
          <h2 className="font-serif text-2xl text-[#2F4131] font-bold">Apprenticeship Requested</h2>
          <p className="mt-2 text-sm text-[#415A44]">
            Your session with <span className="font-semibold text-[#2F4131]">{mentor.name}</span> has been dispatched to their workshop desk.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-[#FAF6EF] border border-[#EDE3D1] text-xs text-left space-y-1.5 text-[#2F4131]">
            <div><span className="font-bold">Mode:</span> {bookingComplete.mode}</div>
            <div><span className="font-bold">Status:</span> {bookingComplete.status}</div>
            <div><span className="font-bold">Scheduled:</span> {new Date(bookingComplete.scheduledAt).toLocaleString()}</div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href={`/session/${bookingComplete.id}`}
              className="w-full py-3 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-semibold hover:bg-[#A8502E]"
            >
              Enter Session Workshop Room
            </Link>
            <Link
              href="/dashboard"
              className="w-full py-3 rounded-full border border-[#2F4131] text-[#2F4131] text-xs font-semibold hover:bg-[#EDE3D1]"
            >
              Go to My Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1E6] p-6 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href={`/mentors/${mentor.id}`} className="text-xs uppercase tracking-widest text-[#C1633D] font-bold hover:underline mb-6 inline-block">
          ← Back to {mentor.name}'s Postcard
        </Link>

        <div className="bg-[#FAF6EF] border border-[#E5D9C5] rounded-3xl p-8 sm:p-10 shadow-lg">
          <h1 className="font-serif text-3xl text-[#2F4131] font-medium mb-1">
            Book Apprenticeship with {mentor.name}
          </h1>
          <p className="text-sm text-[#415A44] mb-8">
            Select your craft focus and establish your learning intentions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skill Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-2">
                Craft Focus
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {mentor.skills.map((s: any) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSelectedSkillId(s.id)}
                    className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      selectedSkillId === s.id
                        ? 'border-[#C1633D] bg-[#FDFBF7] shadow-sm ring-1 ring-[#C1633D]'
                        : 'border-[#E5D9C5] bg-[#FAF6EF] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span className="text-sm font-medium text-[#2F4131]">{s.name}</span>
                    <span className="text-[11px] text-[#415A44] mt-1">{s.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compatibility Insight */}
            {compatibility && (
              <div className="p-4 rounded-2xl bg-[#EDE3D1]/60 border border-[#D8C7B0] flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#2F4131]">Kindred Synergy:</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C1633D] text-[#F7F1E6] text-[10px] font-bold">
                      {compatibility.score}% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#415A44] mt-1 leading-relaxed">{compatibility.reasoning}</p>
                </div>
              </div>
            )}

            {/* Mode Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-2">
                Session Mode
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMode('VIDEO')}
                  className={`p-4 rounded-xl border text-left transition flex items-center gap-3 ${
                    selectedMode === 'VIDEO'
                      ? 'border-[#C1633D] bg-[#FDFBF7] ring-1 ring-[#C1633D]'
                      : 'border-[#E5D9C5] bg-[#FAF6EF]'
                  }`}
                >
                  <Video className="w-5 h-5 text-[#C1633D]" />
                  <div>
                    <div className="text-sm font-medium text-[#2F4131]">Live Workshop Video</div>
                    <div className="text-xs text-[#415A44]">Real-time video & notes</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode('IN_PERSON')}
                  className={`p-4 rounded-xl border text-left transition flex items-center gap-3 ${
                    selectedMode === 'IN_PERSON'
                      ? 'border-[#C1633D] bg-[#FDFBF7] ring-1 ring-[#C1633D]'
                      : 'border-[#E5D9C5] bg-[#FAF6EF]'
                  }`}
                >
                  <Users className="w-5 h-5 text-[#2F4131]" />
                  <div>
                    <div className="text-sm font-medium text-[#2F4131]">In-Person Studio Visit</div>
                    <div className="text-xs text-[#415A44]">{mentor.location}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Scheduled Date */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-2">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
              />
            </div>

            {/* Notes to Mentor */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-2">
                Message & Learning Goals
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your current experience, what project you want to tackle, or questions you have..."
                className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium hover:bg-[#A8502E] transition shadow-md text-sm"
            >
              {submitting ? 'Dispatching Request...' : `Confirm Session ($${mentor.ratePerSession})`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
