import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nudgeRouter from './routes/nudge.js';
import fallbackRouter from './routes/fallback.js';
import uploadRouter from './routes/upload.js';
import tasksRouter from './routes/tasks.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/nudge', nudgeRouter);
app.use('/api/fallback', fallbackRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ PulseCore backend running on port ${PORT}`));