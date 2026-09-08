import { Server as SocketIOServer, Socket } from 'socket.io';

export function setupSessionSockets(io: SocketIOServer) {
  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join specific session room (e.g. video call or live notes)
    socket.on('session:join', (sessionId: string) => {
      socket.join(`session:${sessionId}`);
      console.log(`[Socket.IO] Socket ${socket.id} joined session:${sessionId}`);
      io.to(`session:${sessionId}`).emit('session:peer-joined', {
        socketId: socket.id,
        timestamp: new Date().toISOString(),
      });
    });

    // Leave session room
    socket.on('session:leave', (sessionId: string) => {
      socket.leave(`session:${sessionId}`);
      io.to(`session:${sessionId}`).emit('session:peer-left', {
        socketId: socket.id,
        timestamp: new Date().toISOString(),
      });
    });

    // Session status changes (e.g. CONFIRMED, COMPLETED, CANCELLED)
    socket.on('session:status-update', (payload: { sessionId: string; status: string }) => {
      io.to(`session:${payload.sessionId}`).emit('session:status-changed', payload);
      io.emit('notification:session-status', payload);
    });

    // Collaborative live notes between mentor and learner during session
    socket.on('session:notes-sync', (payload: { sessionId: string; notes: string; author: string }) => {
      socket.to(`session:${payload.sessionId}`).emit('session:notes-updated', payload);
    });

    // Signal exchange for WebRTC peer connection
    socket.on('webrtc:signal', (payload: { sessionId: string; signal: any; from: string }) => {
      socket.to(`session:${payload.sessionId}`).emit('webrtc:signal', payload);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
}
