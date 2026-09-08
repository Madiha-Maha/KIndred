'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/api-client';
import { Calendar, Video, Clock, CheckCircle2, User, Sparkles, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<'LEARNER' | 'MENTOR'>('LEARNER');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'completed'>('upcoming');

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.getUserSessions('learner-1');
        setSessions(res.sessions);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const upcomingSessions = sessions.filter((s) => s.status === 'CONFIRMED');
  const pendingSessions = sessions.filter((s) => s.status === 'PENDING');
  const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');

  return (
    <div className="min-h-screen bg-[#F7F1E6] p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2F4131] font-medium">Kindred Workshop Desk</h1>
            <p className="text-sm text-[#415A44] mt-1">
              Active apprenticeships, scheduled exchanges, and preserved journals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUserRole(userRole === 'LEARNER' ? 'MENTOR' : 'LEARNER')}
              className="px-4 py-2 rounded-full border border-[#2F4131] text-xs font-semibold text-[#2F4131] bg-[#FAF6EF] hover:bg-[#EDE3D1] transition"
            >
              Viewing as: <span className="text-[#C1633D] font-bold">{userRole}</span> (Toggle)
            </button>
            <Link
              href="/discover"
              className="px-5 py-2 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-semibold hover:bg-[#A8502E] transition shadow-sm"
            >
              + Find New Mentor
            </Link>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex border-b border-[#E5D9C5] gap-4 mb-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'upcoming'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44] hover:text-[#2F4131]'
            }`}
          >
            Confirmed Sessions ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'pending'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44] hover:text-[#2F4131]'
            }`}
          >
            Pending Requests ({pendingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'completed'
                ? 'border-[#C1633D] text-[#C1633D] font-bold'
                : 'border-transparent text-[#415A44] hover:text-[#2F4131]'
            }`}
          >
            Completed & Archived ({completedSessions.length})
          </button>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {activeTab === 'upcoming' &&
            (upcomingSessions.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6EF] rounded-2xl border border-[#E5D9C5] text-sm text-[#415A44]">
                No confirmed sessions scheduled yet.
              </div>
            ) : (
              upcomingSessions.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#FAF6EF] border border-[#E5D9C5] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={s.mentorAvatar}
                      alt={s.mentorName}
                      className="w-14 h-14 rounded-xl object-cover border border-[#E5D9C5]"
                    />
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#2F4131]">{s.skillName}</h3>
                      <p className="text-xs text-[#415A44]">With {s.mentorName} • Mode: {s.mode}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#C1633D] mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(s.scheduledAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/session/${s.id}`}
                      className="px-5 py-2.5 rounded-full bg-[#2F4131] text-[#F7F1E6] text-xs font-semibold hover:bg-[#1E2B20] transition flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" /> Enter Studio Room
                    </Link>
                  </div>
                </div>
              ))
            ))}

          {activeTab === 'pending' &&
            (pendingSessions.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6EF] rounded-2xl border border-[#E5D9C5] text-sm text-[#415A44]">
                No pending requests at this time.
              </div>
            ) : (
              pendingSessions.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#FAF6EF] border border-[#E5D9C5] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2F4131]">{s.skillName}</h3>
                    <p className="text-xs text-[#415A44]">With {s.mentorName}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#EDE3D1] text-[#C1633D] text-[10px] font-bold">
                      Awaiting Mentor Confirmation
                    </span>
                  </div>
                  <div className="text-xs text-[#415A44]">
                    Scheduled for {new Date(s.scheduledAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ))}

          {activeTab === 'completed' &&
            (completedSessions.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6EF] rounded-2xl border border-[#E5D9C5] text-sm text-[#415A44]">
                No completed sessions yet.
              </div>
            ) : (
              completedSessions.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#FAF6EF] border border-[#E5D9C5] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2F4131]">{s.skillName}</h3>
                    <p className="text-xs text-[#415A44]">With {s.mentorName}</p>
                    {s.review && (
                      <p className="text-xs italic text-[#415A44] mt-1 font-serif">
                        Review: "{s.review.comment}" ({s.review.rating}★)
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/journal/${s.mentorId}`}
                    className="px-4 py-2 rounded-full border border-[#2F4131] text-[#2F4131] text-xs font-semibold hover:bg-[#EDE3D1]"
                  >
                    View in Legacy Journal
                  </Link>
                </div>
              ))
            ))}
        </div>
      </div>
    </div>
  );
}
