require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('./models/Producto');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('Error: Por favor configura MONGO_URI en tu archivo .env');
    process.exit(1);
}

const mockProducts = [
    { nombre: 'Laptop HP Envy 15', sede: 'Sede Principal', existencias: 45, descontinuado: false },
    { nombre: 'Monitor Dell 27" 4K', sede: 'Sede Principal', existencias: 12, descontinuado: false },
    { nombre: 'Teclado Mecánico Keychron', sede: 'Norte', existencias: 34, descontinuado: false },
    { nombre: 'Mouse Logitech MX Master 3', sede: 'Sur', existencias: 89, descontinuado: false },
    { nombre: 'Silla Ergonómica Herman Miller', sede: 'Oriente', existencias: 5, descontinuado: false },
    { nombre: 'Cable HDMI 2.1 (2mts)', sede: 'Sur', existencias: 150, descontinuado: false },
    { nombre: 'Disco Duro Externo 2TB', sede: 'Norte', existencias: 0, descontinuado: true },
    { nombre: 'Auriculares Sony WH-1000XM5', sede: 'Oriente', existencias: 22, descontinuado: false },
    { nombre: 'Memoria RAM Corsair 16GB', sede: 'Sede Principal', existencias: 60, descontinuado: false },
    { nombre: 'Adaptador USB-C a Ethernet', sede: 'Sur', existencias: 4, descontinuado: true },
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB Atlas. Limpiando colección...');

        // Opcional: limpiar la BD antes de insertar
        await Producto.deleteMany({});
        console.log('Colección anterior limpiada.');

        console.log('Insertando productos de prueba...');
        await Producto.insertMany(mockProducts);

        console.log('¡Productos sembrados exitosamente!');
        process.exit(0);
    } catch (error) {
        console.error('Error poblando la base de datos:', error);
        process.exit(1);
    }
}

seedDatabase();
