import express from 'express';
import db from '../lib/db.js';
import { generateNudges } from '../lib/gptEngine.js';
import { fallbackNudges } from '../lib/fallbackEngine.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { dealId } = req.body;
  const { rows } = await db.query(\`
    SELECT COUNT(*) FILTER (WHERE due_date < NOW() AND status != 'complete') AS "overdueTasks",
           COUNT(*) FILTER (WHERE last_active < NOW() - INTERVAL '2 days') AS "inactiveUsers"
    FROM tasks WHERE deal_id = $1
  \`, [dealId]);

  const result = await generateNudges(rows[0]) || fallbackNudges(rows[0]);
  res.json({ source: result.source || 'Fallback', nudges: result });
});

export default router;