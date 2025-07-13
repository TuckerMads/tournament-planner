import { Router } from 'express';
import db from '../db';

const router = Router();

router.post('/tournaments', (req, res) => {
  const { name, organizer, passcode } = req.body;

  db.prepare(`
    INSERT INTO tournaments (name, organizer, passcode)
    VALUES (?, ?, ?)
  `).run(name, organizer, passcode);

  res.status(201).json({ message: 'Tournament created' });
});

router.get('/tournaments/by-passcode/:passcode', (req, res) => {
  const { passcode } = req.params;
  const tournament = db.prepare('SELECT * FROM tournaments WHERE passcode = ?').get(passcode);
  if (!tournament) return res.status(404).json({ message: 'Not found' });
  res.json(tournament);
});

router.get('/tournaments/:id', (req, res) => {
  const { id } = req.params;
  const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(id);
  if (!tournament) return res.status(404).json({ message: 'Not found' });
  res.json(tournament);
});

export default router;