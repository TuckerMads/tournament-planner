"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const tournaments_1 = __importDefault(require("./routes/tournaments"));
const pages_1 = __importDefault(require("./routes/pages"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, db_1.initializeDatabase)();
app.use(express_1.default.json());
app.use('/public', express_1.default.static('public'));
console.log('loading');
app.use('/api/tournaments', tournaments_1.default);
// ✅ Page-level routes like index.html and createTournament.html
app.use('/', pages_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
