import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function ProductModal({ isOpen, onClose, product, onSave, sedeActual }) {
    const [formData, setFormData] = useState({
        nombre: '',
        sede: '',
        existencias: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                nombre: product.nombre,
                sede: product.sede,
                existencias: product.existencias
            });
        } else {
            setFormData({ nombre: '', sede: sedeActual || '', existencias: 0 });
        }
    }, [product, isOpen, sedeActual]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (product) {
                // Edit part involves updating existencias
                await api.put(`/productos/${product._id}`, { existencias: formData.existencias });
                toast.success('Existencias actualizadas');
            } else {
                // Create new
                await api.post('/productos', formData);
                toast.success('Producto creado');
            }
            onSave(); // Refresh list and close
        } catch (error) {
            toast.error(error.response?.data?.mensaje || 'Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content - Glassmorphism style */}
            <div className="relative w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-white/40 dark:border-white/10 transform transition-all animate-in zoom-in-95 duration-200">

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {product ? 'Actualizar Existencias' : 'Nuevo Producto'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Nombre del Producto</label>
                        <input
                            required
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            disabled={!!product}
                            className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                            placeholder="Ej. Laptop HP"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sede</label>
                        <select
                            required
                            name="sede"
                            value={formData.sede}
                            onChange={handleChange}
                            disabled={!!product}
                            className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900 appearance-none"
                        >
                            <option value="" disabled>Selecciona una sede</option>
                            <option value="Sede Principal" className="dark:bg-gray-800">Sede Principal</option>
                            <option value="Sur" className="dark:bg-gray-800">Sur</option>
                            <option value="Norte" className="dark:bg-gray-800">Norte</option>
                            <option value="Oriente" className="dark:bg-gray-800">Oriente</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Existencias</label>
                        <input
                            required
                            type="number"
                            name="existencias"
                            min="0"
                            value={formData.existencias}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                            placeholder="100"
                        />
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary-500 hover:bg-primary-900 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 flex items-center disabled:opacity-75"
                        >
                            {loading ? (
                                <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin mr-2" />
                            ) : (
                                <Save size={18} className="mr-2" />
                            )}
                            Guardar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
