import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['MENTOR', 'LEARNER']),
  bio: z.string().min(10, 'Please share a few words about yourself (at least 10 characters)'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const createSessionSchema = z.object({
  mentorId: z.string().min(1, 'Mentor ID is required'),
  skillId: z.string().min(1, 'Skill ID is required'),
  scheduledAt: z.string().min(1, 'Scheduled date & time is required'),
  mode: z.enum(['VIDEO', 'IN_PERSON']),
  notes: z.string().optional(),
});

export const updateSessionStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
});

export const matchingScoreSchema = z.object({
  learnerId: z.string().min(1, 'Learner ID is required'),
  skillId: z.string().min(1, 'Skill ID is required'),
});

export const createReviewSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, 'Review comment must be at least 5 characters'),
});

export const createJournalEntrySchema = z.object({
  mentorId: z.string().min(1, 'Mentor ID is required'),
  sessionId: z.string().min(1, 'Session ID is required'),
  summaryText: z.string().min(20, 'Summary text should be at least 20 characters'),
  mediaUrl: z.string().url().optional().or(z.literal('')),
  quotes: z.array(z.string()).optional(),
  keyLessons: z.array(z.string()).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type UpdateSessionStatusInput = z.infer<typeof updateSessionStatusSchema>;
export type MatchingScoreInput = z.infer<typeof matchingScoreSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type CreateJournalEntryInput = z.infer<typeof createJournalEntrySchema>;
