require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('Error: Por favor configura MONGO_URI en tu archivo .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas exitosamente'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

app.get('/', (req, res) => {
    res.send('API de Inventario Distribuido funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
