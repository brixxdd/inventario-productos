import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, AlertTriangle, CheckCircle, Search, Package, MapPin } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import ProductCardMobile from './ProductCardMobile';

export default function ProductList({ onEdit, refreshTrigger }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProductos = async () => {
        try {
            const { data } = await api.get('/productos');
            setProductos(data);
        } catch (error) {
            toast.error('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/productos/${id}`);
                toast.success('Producto eliminado');
                fetchProductos();
            } catch (error) {
                toast.error('Error al eliminar');
            }
        }
    };

    const handleToggleDescontinuado = async (producto) => {
        try {
            await api.put(`/productos/${producto._id}`, {
                descontinuado: !producto.descontinuado
            });
            toast.success(producto.descontinuado ? 'Producto Reactivado' : 'Producto Descontinuado');
            fetchProductos();
        } catch (error) {
            toast.error('Error al actualizar estado');
        }
    };

    const handleLimpiarDescontinuados = async () => {
        if (confirm('Eliminar TODOS los productos descontinuados permanentemente?')) {
            try {
                const { data } = await api.delete('/productos/descontinuados');
                toast.success(data.mensaje);
                fetchProductos();
            } catch (error) {
                toast.error('Error al eliminar');
            }
        }
    };

    const filtrados = Array.isArray(productos) ? productos.filter(p =>
        p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sede?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Catálogo de Productos</h2>
                    <p className="text-gray-500 dark:text-gray-400">Administra el inventario en todas las sedes.</p>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleLimpiarDescontinuados}
                        className="hidden sm:flex bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 transition px-4 py-2 rounded-xl text-sm font-semibold items-center border border-red-200"
                    >
                        <Trash2 size={16} className="mr-2" />
                        Limpiar Descontinuados
                    </button>

                    {/* Main Button following rules */}
                    <button
                        onClick={() => onEdit(null)}
                        className="bg-primary-500 text-white px-5 py-2.5 rounded-xl hover:bg-primary-900 shadow-md hover:shadow-xl transition-all duration-300 font-semibold flex items-center"
                    >
                        <Plus size={18} className="mr-2" />
                        Nuevo Producto
                    </button>
                </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por nombre o sede..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200/50 dark:border-white/10 rounded-xl leading-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Responsive Table / Cards  (We use Glassmorphism for the container) */}
            <div className="transition-all duration-300">

                {loading ? (
                    <div className="backdrop-blur-md bg-white/50 dark:bg-gray-800/40 border border-white/40 dark:border-white/10 shadow-sm rounded-2xl p-12 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div></div>
                ) : filtrados.length === 0 ? (
                    <div className="backdrop-blur-md bg-white/50 dark:bg-gray-800/40 border border-white/40 dark:border-white/10 shadow-sm rounded-2xl p-12 text-center text-gray-500">
                        <Package size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No se encontraron productos.</p>
                        <p className="text-sm">Agrega uno nuevo o intenta con otra búsqueda.</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile Grid View */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {filtrados.map((producto) => (
                                <ProductCardMobile
                                    key={producto._id}
                                    producto={producto}
                                    onEdit={onEdit}
                                    onDelete={handleDelete}
                                    onToggleStatus={handleToggleDescontinuado}
                                />
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block backdrop-blur-md bg-white/50 dark:bg-gray-800/40 border border-white/40 dark:border-white/10 shadow-sm rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200/50 dark:divide-white/5">
                                    <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Producto & Sede</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Existencias</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                                            <th scope="col" className="relative px-6 py-4 text-right"><span className="sr-only">Acciones</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200/50 dark:divide-white/5 bg-white/20 dark:bg-gray-800/20">
                                        {filtrados.map((producto) => (
                                            <tr key={producto._id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${producto.descontinuado ? 'bg-gray-400 dark:bg-gray-600' : 'bg-gradient-to-br from-primary-500 to-primary-900'}`}>
                                                            {producto.nombre?.charAt(0)?.toUpperCase() || '?'}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{producto.nombre || 'Sin nombre'}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                                                                <MapPin size={12} className="mr-1" />
                                                                {producto.sede}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{producto.existencias} uds</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleToggleDescontinuado(producto)}
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${producto.descontinuado
                                                            ? 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                                                            : 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                                                            }`}
                                                    >
                                                        {producto.descontinuado ? (
                                                            <><AlertTriangle size={12} className="mr-1" /> Descontinuado</>
                                                        ) : (
                                                            <><CheckCircle size={12} className="mr-1" /> Activo</>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button
                                                            onClick={() => onEdit(producto)}
                                                            className="text-primary-900 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-400 bg-white dark:bg-gray-800 shadow-sm hover:shadow border border-gray-100 dark:border-gray-700 p-2 rounded-lg transition-all"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(producto._id)}
                                                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-white dark:bg-gray-800 shadow-sm hover:shadow border border-gray-100 dark:border-gray-700 p-2 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
