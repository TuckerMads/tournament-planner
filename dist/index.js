"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const types_1 = require("./types");
const app = (0, express_1.default)();
const port = 3000;
const db = new better_sqlite3_1.default('testdb.db');
app.use('/public', express_1.default.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'views', 'index.html'));
});
app.get('/api/users', (req, res) => {
    const rawUsers = db.prepare('SELECT * FROM users').all();
    const userViews = rawUsers.map(types_1.toUserViewModel);
    res.json(userViews);
});
app.post('/api/users', (req, res) => {
    const { name, birthYear } = req.body;
    if (!name || typeof birthYear !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    db.prepare('INSERT INTO users (name, birthYear) VALUES (?, ?)').run(name, birthYear);
    res.status(201).json({ message: 'User added' });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
