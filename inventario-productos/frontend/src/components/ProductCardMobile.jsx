import { Edit2, Trash2, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ProductCardMobile({ producto, onEdit, onDelete, onToggleStatus }) {
    const isDescontinuado = producto.descontinuado;

    return (
        <div className="md:hidden relative overflow-hidden backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/40 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 group animate-in fade-in slide-in-from-bottom-4">
            {/* Decorative background gradient */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 dark:opacity-20 transition-transform duration-700 group-hover:scale-150 ${isDescontinuado ? 'bg-gray-500' : 'bg-primary-500'}`} />

            <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDescontinuado ? 'bg-gray-400 dark:bg-gray-600' : 'bg-gradient-to-br from-primary-500 to-primary-900'}`}>
                        {producto.nombre?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{producto.nombre}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <MapPin size={14} className="mr-1 text-primary-500" />
                            {producto.sede}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => onEdit(producto)}
                        className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-700/80 text-primary-600 dark:text-primary-400 border border-white dark:border-white/5 shadow-sm active:scale-95 transition-all"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(producto._id)}
                        className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-700/80 text-red-500 dark:text-red-400 border border-white dark:border-white/5 shadow-sm active:scale-95 transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-4 relative z-10">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1 block">Existencias</span>
                    <span className="text-xl font-black text-gray-900 dark:text-gray-100">{producto.existencias} <span className="text-xs font-normal text-gray-500">uds</span></span>
                </div>

                <button
                    onClick={() => onToggleStatus(producto)}
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${isDescontinuado
                        ? 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                        : 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                        }`}
                >
                    {isDescontinuado ? (
                        <><AlertTriangle size={14} className="mr-2" /> Descontinuado</>
                    ) : (
                        <><CheckCircle size={14} className="mr-2" /> Activo</>
                    )}
                </button>
            </div>
        </div>
    );
}
