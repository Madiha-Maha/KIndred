export type UserRole = 'MENTOR' | 'LEARNER';

export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  name: string;
  avatarUrl: string;
  bio: string;
  createdAt: string | Date;
  mentorProfile?: MentorProfile | null;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  iconName?: string;
  description?: string;
}

export interface AvailabilitySlot {
  dayOfWeek: string; // 'Monday', 'Tuesday', etc.
  startTime: string; // '10:00 AM'
  endTime: string;   // '12:00 PM'
}

export interface MentorProfile {
  id?: string;
  userId: string;
  skills: Skill[];
  availability: AvailabilitySlot[];
  ratePerSession: number; // in USD or credits
  yearsOfExperience?: number;
  location?: string;
  handwrittenGreeting?: string;
  lifeMotto?: string;
  user?: User;
}

export type SessionMode = 'VIDEO' | 'IN_PERSON';
export type SessionStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Session {
  id: string;
  mentorId: string;
  learnerId: string;
  skillId: string;
  scheduledAt: string | Date;
  mode: SessionMode;
  status: SessionStatus;
  notes?: string;
  meetingLink?: string;
  mentor?: User & { mentorProfile?: MentorProfile };
  learner?: User;
  skill?: Skill;
  review?: Review | null;
  journalEntry?: LegacyJournalEntry | null;
}

export interface Review {
  id?: string;
  sessionId: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt?: string | Date;
  authorName?: string;
}

export interface LegacyJournalEntry {
  id?: string;
  mentorId: string;
  sessionId: string;
  summaryText: string;
  mediaUrl?: string;
  createdAt?: string | Date;
  mentorName?: string;
  skillName?: string;
  quotes?: string[];
  keyLessons?: string[];
}

export interface CompatibilityScoreResponse {
  learnerId: string;
  skillId: string;
  score: number; // 0 to 100
  breakdown: {
    skillMatch: number;
    availabilityMatch: number;
    intergenerationalSynergy: number;
  };
  reasoning: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
