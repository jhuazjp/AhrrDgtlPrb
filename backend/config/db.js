const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        const dbUri = process.env.BD_MONGO;
        if (!dbUri) {
            throw new Error('La variable de entorno BD_MONGO no está definida');
        }
        await mongoose.connect(dbUri, {});
        console.log('Base de datos conectada exitosamente');
    } catch (error) {
       console.error('Error al conectar a la base de datos:', error);
    }
};

module.exports = conectarDB;