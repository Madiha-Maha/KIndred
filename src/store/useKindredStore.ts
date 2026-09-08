import { useState, useEffect } from 'react';
import {
  Mentor,
  Session,
  LegacyJournalEntry,
  ActivePage,
  UserRole,
  CompatibilityResult,
} from '../types';
import {
  INITIAL_MENTORS,
  INITIAL_SESSIONS,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_SKILLS,
} from '../data/mockData';

export type FontSizeOption = 'normal' | 'large' | 'extra-large';

// Global state container for the interactive app
class KindredState {
  currentPage: ActivePage = 'landing';
  selectedMentorId: string = 'mentor-1';
  selectedSessionId: string = 'session-101';
  userRole: UserRole = 'LEARNER';
  currentUserName: string = 'Marcus Chen';
  currentUserAvatar: string = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300';

  // Accessibility
  fontSize: FontSizeOption = 'normal';
  highContrast: boolean = false;

  // Codebase inspector drawer
  showMonorepoInspector: boolean = false;

  // Data
  mentors: Mentor[] = INITIAL_MENTORS;
  sessions: Session[] = INITIAL_SESSIONS;
  journalEntries: LegacyJournalEntry[] = INITIAL_JOURNAL_ENTRIES;

  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const savedContrast = localStorage.getItem('kindred_high_contrast');
      if (savedContrast) this.highContrast = savedContrast === 'true';

      const savedFontSize = localStorage.getItem('kindred_font_size') as FontSizeOption;
      if (savedFontSize) this.fontSize = savedFontSize;

      this.applyAccessibilityDom();
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  navigate(page: ActivePage, options?: { mentorId?: string; sessionId?: string }) {
    this.currentPage = page;
    if (options?.mentorId) this.selectedMentorId = options.mentorId;
    if (options?.sessionId) this.selectedSessionId = options.sessionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify();
  }

  toggleHighContrast() {
    this.highContrast = !this.highContrast;
    if (typeof window !== 'undefined') {
      localStorage.setItem('kindred_high_contrast', String(this.highContrast));
      this.applyAccessibilityDom();
    }
    this.notify();
  }

  setFontSize(size: FontSizeOption) {
    this.fontSize = size;
    if (typeof window !== 'undefined') {
      localStorage.setItem('kindred_font_size', size);
      this.applyAccessibilityDom();
    }
    this.notify();
  }

  private applyAccessibilityDom() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    if (this.highContrast) {
      root.setAttribute('data-contrast', 'high');
    } else {
      root.removeAttribute('data-contrast');
    }

    if (this.fontSize !== 'normal') {
      root.setAttribute('data-font-size', this.fontSize);
    } else {
      root.removeAttribute('data-font-size');
    }
  }

  setUserRole(role: UserRole) {
    this.userRole = role;
    if (role === 'MENTOR') {
      this.currentUserName = 'Eleanor Vance';
      this.currentUserAvatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300';
    } else {
      this.currentUserName = 'Marcus Chen';
      this.currentUserAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300';
    }
    this.notify();
  }

  toggleMonorepoInspector(show?: boolean) {
    this.showMonorepoInspector = show !== undefined ? show : !this.showMonorepoInspector;
    this.notify();
  }

  // Session actions
  bookSession(params: {
    mentorId: string;
    skillId: string;
    mode: 'VIDEO' | 'IN_PERSON';
    scheduledAt: string;
    notes?: string;
  }): Session {
    const mentor = this.mentors.find((m) => m.id === params.mentorId) || this.mentors[0];
    const skill = mentor.skills.find((s) => s.id === params.skillId) || mentor.skills[0];

    const newSession: Session = {
      id: `session-${Date.now()}`,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatarUrl,
      learnerId: 'learner-1',
      learnerName: this.currentUserName,
      skillId: skill.id,
      skillName: skill.name,
      scheduledAt: params.scheduledAt,
      mode: params.mode,
      status: 'CONFIRMED',
      notes: params.notes || '',
      meetingLink: `/session/session-${Date.now()}`,
      ratePerSession: mentor.ratePerSession,
    };

    this.sessions = [newSession, ...this.sessions];
    this.notify();
    return newSession;
  }

  updateSessionStatus(sessionId: string, status: Session['status']) {
    this.sessions = this.sessions.map((s) => (s.id === sessionId ? { ...s, status } : s));
    this.notify();
  }

  completeSessionWithReflection(params: {
    sessionId: string;
    summaryText: string;
    quotes: string[];
    keyLessons: string[];
    rating: number;
    comment: string;
  }) {
    const session = this.sessions.find((s) => s.id === params.sessionId);
    if (!session) return;

    const newJournalEntry: LegacyJournalEntry = {
      id: `journal-${Date.now()}`,
      mentorId: session.mentorId,
      sessionId: session.id,
      mentorName: session.mentorName,
      skillName: session.skillName,
      summaryText: params.summaryText,
      quotes: params.quotes,
      keyLessons: params.keyLessons,
      mediaUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800',
      createdAt: new Date().toISOString(),
    };

    this.journalEntries = [newJournalEntry, ...this.journalEntries];

    this.sessions = this.sessions.map((s) =>
      s.id === params.sessionId
        ? {
            ...s,
            status: 'COMPLETED',
            review: {
              rating: params.rating,
              comment: params.comment,
              createdAt: new Date().toISOString(),
            },
            journalEntry: {
              id: newJournalEntry.id,
              summaryText: newJournalEntry.summaryText,
              quotes: newJournalEntry.quotes,
              keyLessons: newJournalEntry.keyLessons,
            },
          }
        : s
    );

    this.notify();
  }

  calculateCompatibility(learnerId: string, skillId: string): CompatibilityResult {
    const hash = (str: string) =>
      str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const baseSeed = (hash(learnerId) + hash(skillId)) % 25;
    const skillMatch = 84 + (baseSeed % 14);
    const availabilityMatch = 78 + ((baseSeed * 2) % 20);
    const intergenerationalSynergy = 88 + ((baseSeed * 3) % 11);

    const score = Math.round(
      skillMatch * 0.4 + availabilityMatch * 0.25 + intergenerationalSynergy * 0.35
    );

    const insights = [
      'Exceptional patience and mutual reverence for slow, tactile mastery.',
      'Complementary schedule rhythm with shared focus on heirloom craftsmanship.',
      'High conversational synergy: apprentice seeks history; elder seeks eager hands.',
      'Ideal resonance for unhurried technique drills and foundational muscle memory.',
    ];

    return {
      learnerId,
      skillId,
      score: Math.min(99, Math.max(82, score)),
      breakdown: { skillMatch, availabilityMatch, intergenerationalSynergy },
      reasoning: insights[baseSeed % insights.length],
    };
  }
}

export const kindredStore = new KindredState();

export function useKindredStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return kindredStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  return kindredStore;
}
