import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes.js';

const app = express();
const PORT = process.env.PORT || 1919;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DevPlanner API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/tasks`);
});
