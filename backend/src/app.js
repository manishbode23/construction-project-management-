import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import procurementRoutes from './routes/procurement.js';
import photoRoutes from './routes/photos.js';
import financeRoutes from './routes/finance.js';
import reportRoutes from './routes/reports.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/procurement', procurementRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/reports', reportRoutes);

app.use((err, req, res, _next) => {
  const status = err.status || 500;
  const message = status === 500 ? 'Server error' : err.message;

  console.error(err);
  res.status(status).json({ error: message });
});

export default app;
