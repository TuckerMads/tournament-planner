import express from 'express';
import db, { initializeDatabase } from './db';
import tournamentRoutes from './routes/tournaments';
import pageRoutes from './routes/pages';

const app = express();
const PORT = 3000;

initializeDatabase();

app.use(express.json());
app.use('/public', express.static('public'));

console.log('loading');
app.use('/api/tournaments', tournamentRoutes);

app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
