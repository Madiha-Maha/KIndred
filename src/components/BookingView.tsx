import React, { useState } from 'react';
import { useKindredStore } from '../store/useKindredStore';
import {
  Video,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const BookingView: React.FC = () => {
  const store = useKindredStore();
  const mentor =
    store.mentors.find((m) => m.id === store.selectedMentorId) || store.mentors[0];

  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    mentor.skills[0]?.id || 'skill-1'
  );
  const [selectedMode, setSelectedMode] = useState<'VIDEO' | 'IN_PERSON'>('VIDEO');
  const [scheduledDate, setScheduledDate] = useState<string>(() => {
    const d = new Date(Date.now() + 1000 * 60 * 60 * 48);
    return d.toISOString().slice(0, 16);
  });
  const [notes, setNotes] = useState<string>(
    'I want to understand the hand tension when centering high clay mounds without water pooling in the base.'
  );
  const [confirmedSessionId, setConfirmedSessionId] = useState<string | null>(null);

  const compatibility = store.calculateCompatibility('learner-1', selectedSkillId);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const session = store.bookSession({
      mentorId: mentor.id,
      skillId: selectedSkillId,
      mode: selectedMode,
      scheduledAt: new Date(scheduledDate).toISOString(),
      notes,
    });
    setConfirmedSessionId(session.id);
  };

  if (confirmedSessionId) {
    return (
      <div className="py-16 px-4 sm:px-6 max-w-xl mx-auto text-center">
        <div className="bg-[#FAF6EF] border-2 border-[#E5D9C5] rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EDE3D1] text-[#C1633D] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-[#C1633D] tracking-widest">
              Postcard Dispatched
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#2F4131]">
              Apprenticeship Confirmed!
            </h2>
            <p className="text-sm text-[#415A44] leading-relaxed">
              Your session with <span className="font-bold text-[#2F4131]">{mentor.name}</span> has
              been entered into the studio schedule.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] text-xs text-left space-y-2 text-[#2F4131]">
            <div className="flex justify-between border-b border-[#EDE3D1] pb-2">
              <span className="text-[#415A44]">Craft Topic:</span>
              <span className="font-semibold">
                {mentor.skills.find((s) => s.id === selectedSkillId)?.name}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#EDE3D1] pb-2">
              <span className="text-[#415A44]">Mode:</span>
              <span className="font-semibold">
                {selectedMode === 'VIDEO' ? 'Live Studio Video' : 'In-Person Studio Visit'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#415A44]">Date & Time:</span>
              <span className="font-semibold">
                {new Date(scheduledDate).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => store.navigate('session', { sessionId: confirmedSessionId })}
              id="enter-studio-now-btn"
              className="flex-1 py-3.5 px-6 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-semibold hover:bg-[#A8502E] transition shadow-xs flex items-center justify-center gap-2"
            >
              Enter Studio Room <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => store.navigate('dashboard')}
              id="view-dashboard-btn"
              className="py-3.5 px-6 rounded-full border border-[#2F4131] text-[#2F4131] text-xs font-semibold hover:bg-[#EDE3D1] transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      <button
        onClick={() => store.navigate('mentor-detail', { mentorId: mentor.id })}
        className="text-xs uppercase tracking-widest text-[#C1633D] font-bold hover:underline"
      >
        ← Return to {mentor.name}'s Postcard
      </button>

      <div className="bg-[#FAF6EF] border-2 border-[#E5D9C5] rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
        <div className="border-b border-[#E5D9C5] pb-6 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-[#C1633D] tracking-wider">
              1-on-1 Apprenticeship Booking
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2F4131] mt-1">
              Learn with {mentor.name}
            </h1>
            <p className="text-xs text-[#415A44] mt-1">
              {mentor.location} • Rate: ${mentor.ratePerSession} / session
            </p>
          </div>
          <img
            src={mentor.avatarUrl}
            alt={mentor.name}
            className="w-16 h-16 rounded-2xl object-cover border border-[#E5D9C5] hidden sm:block"
          />
        </div>

        <form onSubmit={handleConfirm} className="space-y-6">
          {/* Craft Selection */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131]">
              Select Craft Technique
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {mentor.skills.map((skill) => {
                const isSelected = selectedSkillId === skill.id;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#C1633D] bg-[#FDFBF7] ring-2 ring-[#C1633D] shadow-xs'
                        : 'border-[#E5D9C5] bg-[#FAF6EF] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span className="text-2xl">{skill.shelfObjectIcon || '🏺'}</span>
                    <div>
                      <div className="text-xs font-bold text-[#2F4131]">{skill.name}</div>
                      <div className="text-[11px] text-[#415A44] mt-0.5">{skill.category}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Compatibility Breakdown */}
          <div className="p-5 rounded-2xl bg-[#EDE3D1]/60 border border-[#D8C7B0] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F4131] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A45C]" /> Intergenerational Synergy Engine
              </span>
              <span className="px-3 py-1 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-bold shadow-2xs">
                {compatibility.score}% Match
              </span>
            </div>

            <p className="text-xs text-[#415A44] leading-relaxed italic font-serif">
              "{compatibility.reasoning}"
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D8C7B0]/60 text-center">
              <div>
                <div className="text-[10px] text-[#415A44]">Skill Alignment</div>
                <div className="text-xs font-bold text-[#2F4131]">
                  {compatibility.breakdown.skillMatch}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#415A44]">Schedule Rhythm</div>
                <div className="text-xs font-bold text-[#2F4131]">
                  {compatibility.breakdown.availabilityMatch}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#415A44]">Patience Synergy</div>
                <div className="text-xs font-bold text-[#2F4131]">
                  {compatibility.breakdown.intergenerationalSynergy}%
                </div>
              </div>
            </div>
          </div>

          {/* Session Mode Selector */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131]">
              Apprenticeship Format
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMode('VIDEO')}
                className={`p-4 rounded-2xl border text-left transition flex items-center gap-3.5 ${
                  selectedMode === 'VIDEO'
                    ? 'border-[#C1633D] bg-[#FDFBF7] ring-2 ring-[#C1633D] shadow-xs'
                    : 'border-[#E5D9C5] bg-[#FAF6EF]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#EDE3D1] flex items-center justify-center text-[#C1633D]">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2F4131]">Studio Video Room</div>
                  <div className="text-[11px] text-[#415A44]">Encrypted 1-on-1 audio/video + notes</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('IN_PERSON')}
                className={`p-4 rounded-2xl border text-left transition flex items-center gap-3.5 ${
                  selectedMode === 'IN_PERSON'
                    ? 'border-[#C1633D] bg-[#FDFBF7] ring-2 ring-[#C1633D] shadow-xs'
                    : 'border-[#E5D9C5] bg-[#FAF6EF]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#EDE3D1] flex items-center justify-center text-[#2F4131]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2F4131]">In-Person Studio Visit</div>
                  <div className="text-[11px] text-[#415A44]">{mentor.location}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Scheduled Date & Time */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131]">
              Proposed Date & Studio Hour
            </label>
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs sm:text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
            />
          </div>

          {/* Learning Intentions */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131]">
              Your Learning Intentions & Experience
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What questions or projects are you bringing to this session?"
              className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs sm:text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="confirm-booking-btn"
            className="w-full py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium hover:bg-[#A8502E] transition shadow-md flex items-center justify-center gap-2 text-sm"
          >
            Confirm & Dispatch Apprenticeship Request (${mentor.ratePerSession})
          </button>
        </form>
      </div>
    </div>
  );
};
