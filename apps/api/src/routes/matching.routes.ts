import { Router, Request, Response } from 'express';
import { matchingScoreSchema } from '@kindred/shared';
import { calculateCompatibilityScore } from '../services/matching.service';

export const matchingRouter = Router();

matchingRouter.post('/score', async (req: Request, res: Response) => {
  const parseResult = matchingScoreSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Validation failed', details: parseResult.error.issues });
  }

  const result = await calculateCompatibilityScore({
    learnerId: parseResult.data.learnerId,
    skillId: parseResult.data.skillId,
    mentorId: req.body.mentorId,
  });

  return res.json(result);
});
