import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed authorization token' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'kindred_dev_secret';

  try {
    const payload = jwt.verify(token, secret) as { userId: string; role: string };
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token' });
  }
}
