import express from 'express';
import db, { initializeDatabase } from './db';
import tournamentRoutes from './routes/tournaments';
import pageRoutes from './routes/pages';

const app = express();
const PORT = 3000;

initializeDatabase();

app.use(express.json());
app.use('/public', express.static('public'));

app.use('/api', tournamentRoutes);
app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});