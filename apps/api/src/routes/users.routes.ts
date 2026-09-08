import { Router, Request, Response } from 'express';

export const usersRouter = Router();

usersRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({
    user: {
      id,
      name: id === 'learner-1' ? 'Marcus Chen' : 'Kindred Member',
      role: id === 'learner-1' ? 'LEARNER' : 'MENTOR',
      bio: 'Enthusiast dedicated to traditional techniques and mindful intergenerational community.',
    },
  });
});
