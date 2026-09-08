'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../lib/api-client';
import { Mic, MicOff, Video, VideoOff, ScreenShare, Sparkles, BookOpen, Clock, CheckCircle } from 'lucide-react';

export default function SessionRoomPage() {
  const params = useParams();
  const sessionId = (params?.sessionId as string) || 'session-101';

  const [session, setSession] = useState<any>(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [liveNotes, setLiveNotes] = useState(
    'Key observation: Hold chisel bevel at 25 degrees. Anchor hip when pulling through the mortise.'
  );
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.getSessionById(sessionId);
        setSession(res.session);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [sessionId]);

  async function handleCompleteSession() {
    try {
      await apiClient.updateSessionStatus(sessionId, { status: 'COMPLETED' });
      setCompleted(true);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-[#1E2B20] text-[#F7F1E6] flex flex-col">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-[#2F4131] flex items-center justify-between bg-[#131D14]">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-xs text-[#DEC284] hover:underline">
            ← Dashboard
          </Link>
          <span className="text-xs text-[#8C9E8E]">|</span>
          <span className="text-xs font-serif font-medium text-[#F7F1E6]">
            {session ? `${session.skillName} with ${session.mentorName}` : 'Kindred Workshop Room'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F4131] text-xs text-[#C9A45C]">
            <Clock className="w-3.5 h-3.5" /> 42:15 remaining
          </div>
          <button
            onClick={handleCompleteSession}
            className="px-4 py-1.5 rounded-full bg-[#C1633D] text-white text-xs font-semibold hover:bg-[#A8502E]"
          >
            Finish & Archive
          </button>
        </div>
      </header>

      {/* Main Video & Notes Workspace */}
      <div className="flex-1 grid lg:grid-cols-12 p-4 sm:p-6 gap-4 sm:gap-6 overflow-hidden">
        {/* Video Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex-1 relative rounded-2xl bg-[#2F4131]/60 border border-[#445D47] overflow-hidden flex items-center justify-center min-h-[360px]">
            {/* Main Stage (Mentor Studio Stream) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full border-2 border-[#C9A45C] overflow-hidden shadow-xl mb-4">
                <img
                  src={session?.mentorAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'}
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-[#F7F1E6]">{session?.mentorName || 'Elder Master'}</h3>
              <p className="text-xs text-[#C9A45C] mt-1">Live Studio Audio & Video Connected (Encrypted)</p>
            </div>

            {/* Learner Picture-in-Picture */}
            <div className="absolute bottom-4 right-4 w-36 h-28 rounded-xl bg-[#131D14] border border-[#C9A45C]/40 overflow-hidden shadow-lg flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#C9A45C] font-mono mb-1">YOU (LEARNER)</span>
              <span className="text-xs text-[#F7F1E6]">Marcus Chen</span>
            </div>
          </div>

          {/* Control bar */}
          <div className="flex items-center justify-center gap-3 py-2">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3.5 rounded-full text-sm ${micOn ? 'bg-[#2F4131] text-[#F7F1E6]' : 'bg-red-800 text-white'}`}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`p-3.5 rounded-full text-sm ${videoOn ? 'bg-[#2F4131] text-[#F7F1E6]' : 'bg-red-800 text-white'}`}
            >
              {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
            <button className="p-3.5 rounded-full bg-[#2F4131] text-[#F7F1E6]">
              <ScreenShare className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Collaborative Notes & Legacy Journal Draft */}
        <div className="lg:col-span-4 bg-[#FAF6EF] text-[#2F4131] rounded-2xl p-6 flex flex-col justify-between border border-[#E5D9C5] shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5D9C5] mb-4">
              <span className="font-serif text-lg font-medium text-[#2F4131] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C1633D]" /> Workshop Notebook
              </span>
              <span className="text-[10px] bg-[#EDE3D1] px-2 py-0.5 rounded-full font-bold text-[#2F4131]">
                Real-time Sync
              </span>
            </div>

            <p className="text-xs text-[#415A44] mb-3">
              Notes written here become preserved reflections inside your Legacy Journal after this session.
            </p>

            <textarea
              rows={12}
              value={liveNotes}
              onChange={(e) => setLiveNotes(e.target.value)}
              className="w-full p-4 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs leading-relaxed text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
            />
          </div>

          <div className="pt-4 border-t border-[#E5D9C5]">
            <div className="text-[11px] text-[#415A44] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              Audio is securely routed through WebRTC peer sockets.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
