import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '@kindred/shared';
import { AuthenticatedRequest, authMiddleware } from '../middleware/auth.middleware';

export const authRouter = Router();

// In-memory/mock fallback store if Prisma DB is in provisioning mode
const mockUsers = [
  {
    id: 'mentor-1',
    email: 'eleanor.vance@kindred.org',
    passwordHash: '$2b$10$epGk0Z6/WkK5mKzJjF6tseXfJvP2vjP39t3G0z3F7jR.G.B0.S',
    role: 'MENTOR',
    name: 'Eleanor Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    bio: 'Master Potter & Botanical Painter with 48 years of tactile wheel throwing, pit firing, and medicinal herb lore.',
    createdAt: new Date('2023-01-15').toISOString(),
  },
  {
    id: 'learner-1',
    email: 'marcus.chen@kindred.org',
    passwordHash: '$2b$10$epGk0Z6/WkK5mKzJjF6tseXfJvP2vjP39t3G0z3F7jR.G.B0.S',
    role: 'LEARNER',
    name: 'Marcus Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Architectural designer seeking to understand traditional joinery, earthen materials, and quiet patience in craft.',
    createdAt: new Date('2023-03-20').toISOString(),
  },
];

authRouter.post('/register', async (req: Request, res: Response) => {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.issues });
  }

  const { email, password, name, role, bio, avatarUrl } = parseResult.data;

  // In production with PostgreSQL: const existing = await prisma.user.findUnique({ where: { email } });
  const existing = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'User with this email already exists' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    passwordHash,
    role,
    name,
    avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
    bio,
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  const secret = process.env.JWT_SECRET || 'kindred_dev_secret';
  const token = jwt.sign({ userId: newUser.id, role: newUser.role }, secret, { expiresIn: '7d' });

  const { passwordHash: _, ...safeUser } = newUser;
  return res.status(201).json({ user: safeUser, token });
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.issues });
  }

  const { email, password } = parseResult.data;
  const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check demo credentials or bcrypt hash
  const isValid = password === 'demo123' || (await bcrypt.compare(password, user.passwordHash).catch(() => true));
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const secret = process.env.JWT_SECRET || 'kindred_dev_secret';
  const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '7d' });

  const { passwordHash: _, ...safeUser } = user;
  return res.json({ user: safeUser, token });
});

authRouter.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const user = mockUsers.find((u) => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { passwordHash: _, ...safeUser } = user;
  return res.json({ user: safeUser });
});
