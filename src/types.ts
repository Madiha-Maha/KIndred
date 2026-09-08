export type UserRole = 'MENTOR' | 'LEARNER';

export interface Skill {
  id: string;
  name: string;
  category: string;
  iconName: string;
  shelfObjectIcon?: string;
  description: string;
}

export interface AvailabilitySlot {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: 'MENTOR';
  avatarUrl: string;
  bio: string;
  location: string;
  lifeMotto: string;
  handwrittenGreeting: string;
  yearsOfExperience: number;
  ratePerSession: number;
  skills: Skill[];
  availability: AvailabilitySlot[];
  reviewsCount: number;
  averageRating: number;
  stampPostmark: string;
}

export type SessionMode = 'VIDEO' | 'IN_PERSON';
export type SessionStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Session {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  learnerId: string;
  learnerName: string;
  skillId: string;
  skillName: string;
  scheduledAt: string;
  mode: SessionMode;
  status: SessionStatus;
  notes?: string;
  meetingLink: string;
  ratePerSession: number;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
  journalEntry?: {
    id: string;
    summaryText: string;
    mediaUrl?: string;
    quotes: string[];
    keyLessons: string[];
  };
}

export interface LegacyJournalEntry {
  id: string;
  mentorId: string;
  sessionId: string;
  mentorName: string;
  skillName: string;
  summaryText: string;
  quotes: string[];
  keyLessons: string[];
  mediaUrl?: string;
  createdAt: string;
}

export interface CompatibilityResult {
  learnerId: string;
  skillId: string;
  score: number;
  breakdown: {
    skillMatch: number;
    availabilityMatch: number;
    intergenerationalSynergy: number;
  };
  reasoning: string;
}

export type ActivePage =
  | 'landing'
  | 'discover'
  | 'mentor-detail'
  | 'booking'
  | 'session'
  | 'journal'
  | 'dashboard'
  | 'onboarding';
