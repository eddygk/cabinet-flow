import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';

// Load environment variables
dotenv.config();

// Import routes (these would be implemented in separate files)
// const authRoutes = require('./routes/auth.routes');
// const fileRoutes = require('./routes/file.routes');
// const projectRoutes = require('./routes/project.routes');
// const qrCodeRoutes = require('./routes/qrCode.routes');
// const syncRoutes = require('./routes/sync.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses

// Basic routes (to be expanded and moved to separate files)
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'CabinetFlow API is running' });
});

// API routes (to be implemented)
// app.use('/api/auth', authRoutes);
// app.use('/api/files', fileRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/qrcodes', qrCodeRoutes);
// app.use('/api/sync', syncRoutes);

// File uploads endpoint (placeholder)
app.post('/api/upload', (req, res) => {
  res.status(501).json({ message: 'Upload functionality not implemented yet' });
});

// QR code generation endpoint (placeholder)
app.get('/api/qrcode/:type/:id', (req, res) => {
  const { type, id } = req.params;
  res.status(501).json({ 
    message: 'QR code generation not implemented yet',
    params: { type, id }
  });
});

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});