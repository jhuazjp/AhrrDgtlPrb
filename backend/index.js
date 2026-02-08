require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 30000;

conectarDB();
app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/simulador', require('./routes/simuladorRoutes'));


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
