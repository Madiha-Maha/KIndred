import { Router, Request, Response } from 'express';
import { createSessionSchema, updateSessionStatusSchema } from '@kindred/shared';
import { mockMentors } from './mentors.routes';

export const sessionsRouter = Router();

export const mockSessions = [
  {
    id: 'session-101',
    mentorId: 'mentor-1',
    learnerId: 'learner-1',
    skillId: 'skill-1',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
    mode: 'VIDEO' as const,
    status: 'CONFIRMED' as const,
    notes: 'Focus on stabilizing the clay cylinder without collapsing the wall; reviewing hand positioning.',
    meetingLink: 'https://kindred.app/session/session-101',
    mentorName: 'Eleanor Vance',
    mentorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    learnerName: 'Marcus Chen',
    skillName: 'Wheel-Thrown Stoneware',
    ratePerSession: 35,
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: 'session-102',
    mentorId: 'mentor-2',
    learnerId: 'learner-1',
    skillId: 'skill-4',
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    mode: 'VIDEO' as const,
    status: 'COMPLETED' as const,
    notes: 'Sharpening bevel angles on 1/2 inch Western chisels; cutting first trial mortise.',
    meetingLink: 'https://kindred.app/session/session-102',
    mentorName: 'Arthur Sterling',
    mentorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    learnerName: 'Marcus Chen',
    skillName: 'Hand-Cut Dovetails',
    ratePerSession: 40,
    review: {
      rating: 5,
      comment: 'Arthur noticed the tension in my forearm within 3 minutes over video. Transforming experience.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    journalEntry: {
      id: 'journal-entry-1',
      summaryText: 'True joinery is an act of modesty before the grain. When the chisel sings rather than grates, you are moving with the tree, not imposing your will upon it.',
      mediaUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
      quotes: ['The wood grain already knows what it wants to become.', 'Never force an edge that hasn’t been invited.'],
    },
    createdAt: new Date('2024-01-05').toISOString(),
  },
  {
    id: 'session-103',
    mentorId: 'mentor-3',
    learnerId: 'learner-1',
    skillId: 'skill-7',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    mode: 'VIDEO' as const,
    status: 'PENDING' as const,
    notes: 'Learning to judge fermentation readiness by smell and gas bubble domes rather than clock timers.',
    meetingLink: 'https://kindred.app/session/session-103',
    mentorName: 'Rosa Mendez',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    learnerName: 'Marcus Chen',
    skillName: 'Wild Sourdough Fermentation',
    ratePerSession: 30,
    createdAt: new Date().toISOString(),
  },
];

sessionsRouter.post('/', (req: Request, res: Response) => {
  const parseResult = createSessionSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.issues });
  }

  const { mentorId, skillId, scheduledAt, mode, notes } = parseResult.data;
  const mentor = mockMentors.find((m) => m.id === mentorId);
  if (!mentor) {
    return res.status(404).json({ error: 'Mentor not found' });
  }

  const skill = mentor.skills.find((s) => s.id === skillId) || mentor.skills[0];

  const newSession = {
    id: `session-${Date.now()}`,
    mentorId,
    learnerId: req.body.learnerId || 'learner-1',
    skillId,
    scheduledAt,
    mode,
    status: 'PENDING' as const,
    notes: notes || '',
    meetingLink: `https://kindred.app/session/session-${Date.now()}`,
    mentorName: mentor.name,
    mentorAvatar: mentor.avatarUrl,
    learnerName: req.body.learnerName || 'Marcus Chen',
    skillName: skill.name,
    ratePerSession: mentor.ratePerSession,
    createdAt: new Date().toISOString(),
  };

  mockSessions.unshift(newSession);
  return res.status(201).json({ session: newSession });
});

sessionsRouter.get('/', (req: Request, res: Response) => {
  const { userId, role } = req.query;
  let list = [...mockSessions];

  if (userId && typeof userId === 'string') {
    list = list.filter((s) => s.learnerId === userId || s.mentorId === userId);
  }

  return res.json({ sessions: list });
});

sessionsRouter.get('/:id', (req: Request, res: Response) => {
  const session = mockSessions.find((s) => s.id === req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  return res.json({ session });
});

sessionsRouter.patch('/:id/status', (req: Request, res: Response) => {
  const parseResult = updateSessionStatusSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.issues });
  }

  const session = mockSessions.find((s) => s.id === req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  session.status = parseResult.data.status;
  return res.json({ session });
});
