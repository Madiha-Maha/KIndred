import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import { authRouter } from './routes/auth.routes';
import { mentorsRouter } from './routes/mentors.routes';
import { sessionsRouter } from './routes/sessions.routes';
import { matchingRouter } from './routes/matching.routes';
import { journalRouter } from './routes/journal.routes';
import { usersRouter } from './routes/users.routes';
import { errorHandler } from './middleware/error.middleware';
import { setupSessionSockets } from './sockets/session.socket';

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = Number(process.env.PORT) || 4000;

// CORS setup: explicitly allow Vercel production + preview domains via CORS_ORIGIN
const rawCorsOrigin = process.env.CORS_ORIGIN || 'https://kindred.vercel.app,http://localhost:3000,http://localhost:5173';
const allowedOrigins = rawCorsOrigin.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, Railway healthchecks)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost')
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Mandatory health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'kindred-api',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount modular API routers
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/mentors', mentorsRouter);
app.use('/sessions', sessionsRouter);
app.use('/matching', matchingRouter);
app.use('/journal', journalRouter);

// Global error handling middleware
app.use(errorHandler);

// Real-time socket.io server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
setupSessionSockets(io);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Kindred API] Server running on http://0.0.0.0:${PORT}`);
  console.log(`[Kindred API] Health endpoint active at http://0.0.0.0:${PORT}/health`);
});

export { app, server };
