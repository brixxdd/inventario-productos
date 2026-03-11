const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    sede: { type: String, required: true },
    existencias: { type: Number, required: true, default: 0 },
    descontinuado: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);
