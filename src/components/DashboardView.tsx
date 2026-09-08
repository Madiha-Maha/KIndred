import React, { useState } from 'react';
import { useKindredStore } from '../store/useKindredStore';
import {
  Calendar,
  Video,
  Clock,
  CheckCircle2,
  User,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const store = useKindredStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'completed'>('upcoming');

  const upcomingSessions = store.sessions.filter((s) => s.status === 'CONFIRMED');
  const pendingSessions = store.sessions.filter((s) => s.status === 'PENDING');
  const completedSessions = store.sessions.filter((s) => s.status === 'COMPLETED');

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Workbench Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5D9C5] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-[#C1633D] tracking-wider">
              {store.userRole === 'LEARNER' ? 'Apprentice Workbench' : 'Elder Mentor Studio Desk'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#EDE3D1] text-[10px] font-bold text-[#2F4131]">
              Live Active
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2F4131] mt-1">
            Welcome back, {store.currentUserName}
          </h1>
          <p className="text-xs sm:text-sm text-[#415A44] mt-1">
            Review upcoming apprenticeship exchanges, join encrypted studio rooms, or inspect your journal notes.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() =>
              store.setUserRole(store.userRole === 'LEARNER' ? 'MENTOR' : 'LEARNER')
            }
            className="px-4 py-2 rounded-full border border-[#2F4131] text-xs font-semibold text-[#2F4131] hover:bg-[#EDE3D1] transition"
          >
            Switch View to: {store.userRole === 'LEARNER' ? 'Elder Mentor' : 'Apprentice'}
          </button>

          <button
            onClick={() => store.navigate('discover')}
            className="px-4 py-2 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-semibold hover:bg-[#A8502E] transition shadow-xs flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" /> Find Mentors
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5D9C5] gap-4 sm:gap-8 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'border-[#C1633D] text-[#C1633D] font-bold'
              : 'border-transparent text-[#415A44] hover:text-[#2F4131]'
          }`}
        >
          <span>Confirmed Sessions</span>
          <span className="px-2 py-0.5 rounded-full bg-[#EDE3D1] text-[10px] text-[#2F4131]">
            {upcomingSessions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'border-[#C1633D] text-[#C1633D] font-bold'
              : 'border-transparent text-[#415A44] hover:text-[#2F4131]'
          }`}
        >
          <span>Pending Requests</span>
          <span className="px-2 py-0.5 rounded-full bg-[#EDE3D1] text-[10px] text-[#2F4131]">
            {pendingSessions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'border-[#C1633D] text-[#C1633D] font-bold'
              : 'border-transparent text-[#415A44] hover:text-[#2F4131]'
          }`}
        >
          <span>Completed & Archived</span>
          <span className="px-2 py-0.5 rounded-full bg-[#EDE3D1] text-[10px] text-[#2F4131]">
            {completedSessions.length}
          </span>
        </button>
      </div>

      {/* Sessions Content */}
      <div className="space-y-4">
        {activeTab === 'upcoming' &&
          (upcomingSessions.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF6EF] rounded-3xl border border-[#E5D9C5] text-sm text-[#415A44]">
              No confirmed sessions scheduled yet. Visit the Life-Shelf to discover an elder master.
            </div>
          ) : (
            upcomingSessions.map((s) => (
              <div
                key={s.id}
                className="bg-[#FAF6EF] border-2 border-[#E5D9C5] rounded-3xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={s.mentorAvatar}
                    alt={s.mentorName}
                    className="w-16 h-16 rounded-2xl object-cover border border-[#E5D9C5] shadow-xs"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C1633D] tracking-wider">
                      {s.mode === 'VIDEO' ? 'Live Studio Video' : 'In-Person Studio'}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#2F4131]">{s.skillName}</h3>
                    <p className="text-xs text-[#415A44]">
                      Mentored by <span className="font-semibold text-[#2F4131]">{s.mentorName}</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#2F4131] mt-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#C1633D]" />
                      {new Date(s.scheduledAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => store.navigate('session', { sessionId: s.id })}
                    id={`enter-studio-${s.id}`}
                    className="px-5 py-3 rounded-full bg-[#2F4131] text-[#F7F1E6] text-xs font-semibold hover:bg-[#1E2B20] transition shadow-xs flex items-center gap-2"
                  >
                    <Video className="w-4 h-4 text-[#C9A45C]" />
                    Enter Studio Room
                  </button>
                </div>
              </div>
            ))
          ))}

        {activeTab === 'pending' &&
          (pendingSessions.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF6EF] rounded-3xl border border-[#E5D9C5] text-sm text-[#415A44]">
              No pending apprenticeship requests at this time.
            </div>
          ) : (
            pendingSessions.map((s) => (
              <div
                key={s.id}
                className="bg-[#FAF6EF] border border-[#E5D9C5] rounded-3xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#2F4131]">{s.skillName}</h3>
                  <p className="text-xs text-[#415A44]">With {s.mentorName}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EDE3D1] text-[#C1633D] text-xs font-bold">
                    Awaiting Elder Confirmation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => store.updateSessionStatus(s.id, 'CONFIRMED')}
                    className="px-4 py-2 rounded-full bg-[#C1633D] text-white text-xs font-semibold hover:bg-[#A8502E]"
                  >
                    Confirm Session (Simulate)
                  </button>
                </div>
              </div>
            ))
          ))}

        {activeTab === 'completed' &&
          (completedSessions.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF6EF] rounded-3xl border border-[#E5D9C5] text-sm text-[#415A44]">
              No completed sessions yet. Once a workshop ends, reflections are archived here.
            </div>
          ) : (
            completedSessions.map((s) => (
              <div
                key={s.id}
                className="bg-[#FAF6EF] border border-[#E5D9C5] rounded-3xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#415A44] tracking-wider">
                    Completed Workshop
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#2F4131]">{s.skillName}</h3>
                  <p className="text-xs text-[#415A44]">With {s.mentorName}</p>
                  {s.review && (
                    <div className="mt-2 text-xs italic font-serif text-[#415A44]">
                      Review: "{s.review.comment}" ({s.review.rating}★)
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => store.navigate('journal', { mentorId: s.mentorId })}
                    className="px-4 py-2 rounded-full border border-[#2F4131] text-[#2F4131] text-xs font-semibold hover:bg-[#EDE3D1] flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" /> Inspect Legacy Entry
                  </button>
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
};
