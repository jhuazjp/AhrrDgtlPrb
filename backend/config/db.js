const mongoose = require('mongoose');

const conectarDB = async () => {
    const useDb = process.env.USE_DB === 'true';
    if (!useDb) {
        console.log('DB deshabilitada. Usando servicios mock en memoria.');
        return;
    }

    try {
        const dbUri = process.env.BD_MONGO;
        if (!dbUri) {
            throw new Error('La variable de entorno BD_MONGO no esta definida');
        }
        await mongoose.connect(dbUri, {});
        console.log('Base de datos conectada exitosamente');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

module.exports = conectarDB;
