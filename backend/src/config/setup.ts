import bcrypt from 'bcrypt';
import User from '../models/User';

//Obviamente no prod ideal
export const initializeAdmin = async () => {
  try {
    // Buscar si existe un usuario admin
    const adminExists = await User.findOne({ email: 'admin@vitrina.com' });

    if (!adminExists) {
      // Crear el hash del password
      const hashedPassword = await bcrypt.hash('admin', 10);

      // Crear el usuario admin
      const adminUser = new User({
        name: 'Admin',
        email: 'admin@vitrina.com',
        password: hashedPassword,
        role: 'admin'
      });

      await adminUser.save();
      console.log('Usuario administrador creado con éxito');
    }
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
  }
};