const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// 1. Registrar productos
router.post('/', async (req, res) => {
    try {
        const clientIP = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
        const nuevoProducto = new Producto({
            ...req.body,
            ultimaIP: clientIP
        });
        const guardado = await nuevoProducto.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos los productos y mostrar la sede
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 2. Consultar productos por sede
router.get('/sede/:sede', async (req, res) => {
    try {
        const productos = await Producto.find({ sede: req.params.sede });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 3. Actualizar existencias
router.put('/:id', async (req, res) => {
    try {
        const { existencias, descontinuado } = req.body;
        const clientIP = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();

        const camposParaActualizar = { ultimaIP: clientIP };
        if (existencias !== undefined) camposParaActualizar.existencias = existencias;
        if (descontinuado !== undefined) camposParaActualizar.descontinuado = descontinuado;

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            camposParaActualizar,
            { new: true }
        );
        res.json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 4. Eliminar productos descontinuados
router.delete('/descontinuados', async (req, res) => {
    try {
        const resultado = await Producto.deleteMany({ descontinuado: true });
        res.json({ mensaje: `${resultado.deletedCount} productos descontinuados eliminados` });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Eliminar un producto específico por ID
router.delete('/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 5. Reportes básico
router.get('/reportes/resumen', async (req, res) => {
    try {
        const totalExistencias = await Producto.aggregate([
            { $group: { _id: null, total: { $sum: '$existencias' } } }
        ]);
        const totalPorSede = await Producto.aggregate([
            { $group: { _id: '$sede', total: { $sum: '$existencias' }, cantidadProductos: { $sum: 1 } } }
        ]);
        res.json({
            totalGlobalExistencias: totalExistencias[0]?.total || 0,
            resumenPorSede: totalPorSede
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
