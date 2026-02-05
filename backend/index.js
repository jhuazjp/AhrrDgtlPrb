require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const app = express();
const port = 30000;

// Conectar a la base de datos
conectarDB();   
app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/nota'));


app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

