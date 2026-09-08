import React, { useState, useEffect } from 'react';
import { useKindredStore } from '../store/useKindredStore';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  Sparkles,
  BookOpen,
  Clock,
  CheckCircle2,
  Quote,
  Star,
  Award,
  Radio,
} from 'lucide-react';

export const SessionRoomView: React.FC = () => {
  const store = useKindredStore();
  const session =
    store.sessions.find((s) => s.id === store.selectedSessionId) || store.sessions[0];

  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(2540); // ~42 mins
  const [collaborativeNotes, setCollaborativeNotes] = useState(
    `[Workshop Notes — ${session.skillName}]\n\n• Principle 1: Never fight the grain or force clay off-center.\n• Principle 2: Anchor the pelvic crest to form a human lathe.\n• Observation: Notice how the sound of the chisel changes when the bevel is flush.`
  );

  // Archival modal
  const [showArchivalModal, setShowArchivalModal] = useState(false);
  const [summaryText, setSummaryText] = useState(
    'Centering is not muscle; it is stillness. When your body breathes calmly, the material discovers its own natural axis.'
  );
  const [quoteInput, setQuoteInput] = useState(
    'The clay only yields when the hands remember to breathe.'
  );
  const [lessonInput, setLessonInput] = useState(
    'Anchor the left forearm firmly against the pelvic bone.'
  );
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState(
    'Transformative, unhurried guidance. 48 years of tactile memory passed across in a single hour.'
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleArchive = (e: React.FormEvent) => {
    e.preventDefault();
    store.completeSessionWithReflection({
      sessionId: session.id,
      summaryText,
      quotes: [quoteInput],
      keyLessons: [lessonInput],
      rating,
      comment: reviewComment,
    });
    setShowArchivalModal(false);
    store.navigate('journal', { mentorId: session.mentorId });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#1A251B] text-[#F7F1E6] flex flex-col">
      {/* Studio Header Bar */}
      <div className="px-4 sm:px-8 py-3.5 border-b border-[#2F4131] bg-[#121B13] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => store.navigate('dashboard')}
            className="text-xs text-[#C9A45C] hover:underline"
          >
            ← Leave Studio to Dashboard
          </button>
          <span className="text-xs text-[#445D47]">|</span>
          <span className="font-serif text-sm sm:text-base text-[#F7F1E6]">
            {session.skillName} • Studio Transmission with {session.mentorName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Real-time Socket status indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F4131] text-[11px] text-[#A2D2A5]">
            <Radio className="w-3 h-3 text-[#55C568] animate-pulse" />
            <span className="hidden sm:inline">Socket.IO Live Room:</span>
            <span className="font-mono">{session.id}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F4131] text-xs text-[#DEC284] font-mono">
            <Clock className="w-3.5 h-3.5 text-[#C9A45C]" /> {formatTime(secondsRemaining)}
          </div>

          <button
            onClick={() => setShowArchivalModal(true)}
            id="archive-session-btn"
            className="px-4 py-1.5 rounded-full bg-[#C1633D] text-white text-xs font-semibold hover:bg-[#A8502E] transition shadow-xs"
          >
            Archive to Legacy Journal
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="flex-1 grid lg:grid-cols-12 p-4 sm:p-6 gap-4 sm:gap-6 overflow-hidden">
        {/* Main Video Screen (Elder Mentor Workshop) */}
        <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-4">
          <div className="flex-1 relative rounded-3xl bg-[#243527] border-2 border-[#374E39] overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[460px] shadow-2xl">
            {videoActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-5">
                  <img
                    src={session.mentorAvatar}
                    alt={session.mentorName}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-[#C9A45C] shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-[#C1633D] text-[#F7F1E6] text-[10px] font-bold shadow-xs">
                    LIVE
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F1E6] font-light">
                  {session.mentorName}
                </h3>
                <p className="text-xs text-[#C9A45C] mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#55C568] inline-block animate-ping" />
                  Main Studio Stream Active (WebRTC Encrypted Peer)
                </p>
                <p className="text-xs text-[#8BA18E] mt-2 max-w-sm italic font-serif">
                  "Keep your thumbs resting together, Marcus. Feel the water beneath your palms before you apply inward pressure."
                </p>
              </div>
            ) : (
              <div className="text-center text-sm text-[#8BA18E]">Video stream paused</div>
            )}

            {/* Learner Picture-in-Picture (Bottom-Right) */}
            <div className="absolute bottom-4 right-4 w-36 sm:w-48 h-28 sm:h-36 rounded-2xl bg-[#111A12] border-2 border-[#C9A45C]/50 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-2 text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                alt="Marcus Chen"
                className="w-12 h-12 rounded-full object-cover border border-[#C9A45C] mb-1"
              />
              <span className="text-[10px] uppercase tracking-wider text-[#DEC284] font-bold">
                Marcus Chen (You)
              </span>
              <span className="text-[9px] text-[#7C9080]">Apprentice Camera</span>
            </div>
          </div>

          {/* Controls Dock */}
          <div className="flex items-center justify-center gap-3 py-2 bg-[#172218] rounded-2xl border border-[#2F4131] px-6">
            <button
              onClick={() => setMicActive(!micActive)}
              id="studio-mic-btn"
              className={`p-3.5 rounded-full text-xs font-semibold transition ${
                micActive ? 'bg-[#2F4131] text-[#F7F1E6] hover:bg-[#3D553F]' : 'bg-red-800 text-white'
              }`}
              title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setVideoActive(!videoActive)}
              id="studio-video-btn"
              className={`p-3.5 rounded-full text-xs font-semibold transition ${
                videoActive
                  ? 'bg-[#2F4131] text-[#F7F1E6] hover:bg-[#3D553F]'
                  : 'bg-red-800 text-white'
              }`}
              title={videoActive ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setScreenSharing(!screenSharing)}
              id="studio-screenshare-btn"
              className={`p-3.5 rounded-full text-xs font-semibold transition ${
                screenSharing ? 'bg-[#C1633D] text-white' : 'bg-[#2F4131] text-[#F7F1E6] hover:bg-[#3D553F]'
              }`}
              title="Share Craft Macro Angle / Second Camera"
            >
              <ScreenShare className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Collaborative Workshop Notebook */}
        <div className="lg:col-span-4 bg-[#FAF6EF] text-[#2F4131] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-2 border-[#E5D9C5] shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5D9C5]">
              <h4 className="font-serif text-xl font-medium text-[#2F4131] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C1633D]" /> Workshop Notebook
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDE3D1] text-[#C1633D]">
                Auto-Sync Active
              </span>
            </div>

            <p className="text-xs text-[#415A44] leading-relaxed">
              Jot notes, questions, and physical measurements. These reflections will automatically seed
              the public entry in the Legacy Journal upon completion.
            </p>

            <textarea
              rows={14}
              value={collaborativeNotes}
              onChange={(e) => setCollaborativeNotes(e.target.value)}
              id="studio-notebook-input"
              className="w-full p-4 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs font-mono leading-relaxed text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
            />
          </div>

          <div className="pt-4 border-t border-[#E5D9C5] space-y-2">
            <div className="text-[11px] text-[#415A44] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              Mentor is also viewing this synced notepad.
            </div>
            <button
              onClick={() => setShowArchivalModal(true)}
              className="w-full py-3 rounded-full bg-[#2F4131] text-[#F7F1E6] text-xs font-semibold hover:bg-[#1E2B20] transition"
            >
              Complete Session & Archive Wisdom
            </button>
          </div>
        </div>
      </div>

      {/* ARCHIVAL DIALOG MODAL */}
      {showArchivalModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF6EF] text-[#2F4131] max-w-xl w-full rounded-3xl p-6 sm:p-8 border-2 border-[#D8C7B0] shadow-2xl space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#E5D9C5] pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#C1633D] tracking-wider">
                  Transmission Completion
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#2F4131] mt-0.5">
                  Preserve in Legacy Journal
                </h3>
              </div>
              <button
                onClick={() => setShowArchivalModal(false)}
                className="text-sm font-bold text-[#415A44] hover:text-[#2F4131]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleArchive} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Core Wisdom Reflection
                </label>
                <textarea
                  rows={3}
                  value={summaryText}
                  onChange={(e) => setSummaryText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Memorable Quote from {session.mentorName}
                </label>
                <input
                  type="text"
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Tactile Technique Lesson
                </label>
                <input
                  type="text"
                  value={lessonInput}
                  onChange={(e) => setLessonInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Rating & Apprentice Review
                </label>
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`text-lg ${s <= rating ? 'text-[#C9A45C]' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs text-[#415A44]">({rating} / 5 stars)</span>
                </div>
                <textarea
                  rows={2}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowArchivalModal(false)}
                  className="py-3 px-5 rounded-full border border-[#2F4131] text-xs font-semibold text-[#2F4131] hover:bg-[#EDE3D1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-archive-btn"
                  className="flex-1 py-3 px-6 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-semibold hover:bg-[#A8502E] transition shadow-md"
                >
                  Confirm & Publish to Legacy Journal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
