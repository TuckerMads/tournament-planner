import { Router } from 'express';
import db from '../db';

const router = Router();

router.post('/', (req, res) => {
  const { name, organizer, passcode, description, maxPlayerCount } = req.body;

  try {
    db.prepare(`
      INSERT INTO tournaments (name, organizer, passcode, description, maxTeams)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, organizer, passcode, description, maxPlayerCount);

    res.status(201).json({ message: 'Tournament created' });
  } catch (err: any) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({ message: 'Tournament with that name and passcode already exists' });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

router.get('/by-passcode/:passcode', (req, res) => {
  const { passcode } = req.params;
  const tournament = db.prepare('SELECT * FROM tournaments WHERE passcode = ?').get(passcode);
  if (!tournament) return res.status(404).json({ message: 'Not found' });
  res.json(tournament);
});

router.get('/exists', (req, res) => {
  console.log('🎯 /api/tournaments/exists route hit');
  console.log('Raw query:', req.query);
  const { name, passcode } = req.query;

  if (!name || !passcode) {
    return res.status(400).json({ exists: false, message: 'Missing name or passcode' });
  }

  const existing = db.prepare(`
    SELECT id FROM tournaments WHERE name = ? AND passcode = ?
  `).get(name, passcode);

  console.log(existing);
  res.json({ exists: !!existing });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(id);
  if (!tournament) return res.status(404).json({ message: 'Not found' });
  res.json(tournament);
});

export default router;
