// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import triageRoutes from './routes/triage.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/triage', triageRoutes);

app.get('/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Frontline Triage Server running on port ${PORT}`);
});