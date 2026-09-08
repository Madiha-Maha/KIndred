import { Router, Request, Response } from 'express';
import { createJournalEntrySchema } from '@kindred/shared';

export const journalRouter = Router();

export const mockJournalEntries = [
  {
    id: 'journal-1',
    mentorId: 'mentor-1',
    sessionId: 'session-101',
    mentorName: 'Eleanor Vance',
    skillName: 'Wheel-Thrown Stoneware',
    summaryText: 'Centering clay is centering the nervous system. When the wheel spins at 120 RPM, impatience causes wobble. The secret is anchoring your elbow into your hip bone so the clay moves around your stillness, not your strain.',
    quotes: [
      'The clay only yields when the hands remember to breathe.',
      'A pot without love feels like cold concrete in the morning; a pot held with gentleness warms the tea before it touches your lips.',
    ],
    keyLessons: [
      'Bone stillness: Anchor the left forearm directly against the pelvic crest.',
      'Water moderation: Too much slip dissolves structural tension prematurely.',
      'The bevel release: Release thumb pressure over three slow heartbeats.',
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date('2024-01-12').toISOString(),
  },
  {
    id: 'journal-2',
    mentorId: 'mentor-2',
    sessionId: 'session-102',
    mentorName: 'Arthur Sterling',
    skillName: 'Hand-Cut Dovetails',
    summaryText: 'True joinery is an act of modesty before the grain. When the chisel sings rather than grates, you are moving with the tree, not imposing your will upon it.',
    quotes: [
      'Measure with your fingers, cut with your breath.',
      'Never force an edge that hasn’t been invited.',
    ],
    keyLessons: [
      'Grain orientation: Always read the growth rings on the end grain before orienting the pins.',
      'The knife wall: A single crisp mark with an unyielding striking knife guides the chisel better than five pencil passes.',
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date('2024-01-06').toISOString(),
  },
  {
    id: 'journal-3',
    mentorId: 'mentor-3',
    sessionId: 'session-103',
    mentorName: 'Rosa Mendez',
    skillName: 'Wild Sourdough Fermentation',
    summaryText: 'Our starter has been alive across 83 winters. It breathes lactobacillus that lived during the New Mexico rains of my grandmother’s youth. Bread is not food we create; it is life we host.',
    quotes: [
      'Good bread is the shortest bridge between two strangers.',
      'Fermentation teaches what no book can: the grace of invisible transformation.',
    ],
    keyLessons: [
      'The windowpane test: Stretch the dough between wet fingertips until light passes through without tearing.',
      'Crust blister alchemy: Ice cubes cast onto lava rocks under the Dutch oven seal the glossy sheen.',
    ],
    mediaUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date('2024-01-02').toISOString(),
  },
];

journalRouter.get('/:mentorId', (req: Request, res: Response) => {
  const { mentorId } = req.params;
  const entries = mockJournalEntries.filter((j) => j.mentorId === mentorId);
  return res.json({ entries, total: entries.length });
});

journalRouter.post('/', (req: Request, res: Response) => {
  const parseResult = createJournalEntrySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.issues });
  }

  const newEntry = {
    id: `journal-${Date.now()}`,
    mentorId: parseResult.data.mentorId,
    sessionId: parseResult.data.sessionId,
    summaryText: parseResult.data.summaryText,
    mediaUrl: parseResult.data.mediaUrl || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800',
    quotes: parseResult.data.quotes || ['Heirloom craft connects the past with the promise of tomorrow.'],
    keyLessons: parseResult.data.keyLessons || ['Patience over perfection.'],
    createdAt: new Date().toISOString(),
  };

  mockJournalEntries.unshift(newEntry);
  return res.status(201).json({ entry: newEntry });
});
