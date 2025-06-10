import mongoose from 'mongoose';
import app from './server';
import dotenv from 'dotenv';
import { initializeAdmin } from './config/setup';

dotenv.config(); // Cargar variables de entorno desde .env

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:secretpassword@localhost:27017/la-vitrina?authSource=admin';
const PORT = process.env.PORT || 3000;

console.log(PORT, MONGODB_URI);

// Conexinn a MongoDB
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('🍃 Conectado a MongoDB');
    
    // Inicializar usuario admin
    await initializeAdmin();
    
    // Iniciar el servidor solo después de conectar a MongoDB
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  });

mongoose.connection.on('error', (error) => {
  console.error('Error de MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
  console.warn('❌ Desconectado de MongoDB');
});
