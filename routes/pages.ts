import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

router.get('/createTournament', (req, res) => {
  res.sendFile(path.resolve('views/createTournament.html'));
});

router.get('/joinTournament/:id', (req, res) => {
  res.sendFile(path.resolve('views/joinTournament.html'));
});

export default router;