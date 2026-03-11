import { useEffect, useState } from 'react';
import { Package, MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import api from '../services/api';

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass }) => (
    // Glassmorphism effect based on rules
    <div className={`backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-2xl p-6 overflow-hidden relative group`}>
        {/* Background subtle gradient for modern look */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 dark:opacity-20 transition-transform duration-700 group-hover:scale-[1.7] ${gradientClass}`} />

        <div className="flex items-center justify-between relative z-10">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl transition-transform duration-500 group-hover:rotate-12 ${colorClass}`}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [resumen, setResumen] = useState({ totalGlobalExistencias: 0, resumenPorSede: [] });
    const [loading, setLoading] = useState(true);

    const fetchResumen = async () => {
        try {
            const { data } = await api.get('/productos/reportes/resumen');
            setResumen(data);
        } catch (error) {
            console.error('Error fetching resumen:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumen();
    }, []);

    if (loading) {
        return <div className="p-8 flex items-center justify-center min-h-64"><div className="w-8 h-8 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div></div>;
    }

    const listadoSedes = Array.isArray(resumen?.resumenPorSede) ? resumen.resumenPorSede : [];
    const cantidadSedes = listadoSedes.length;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">

            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-balance mb-2">Visión General</h2>
                <p className="text-gray-500 dark:text-gray-400 text-pretty">Resumen del inventario distribuido en tiempo real.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Total de Existencias"
                    value={resumen?.totalGlobalExistencias || 0}
                    icon={Package}
                    colorClass="bg-primary-100 text-primary-900 dark:bg-primary-900/40 dark:text-primary-300"
                    gradientClass="bg-primary-500"
                />
                <StatCard
                    title="Sedes Activas"
                    value={cantidadSedes}
                    icon={MapPin}
                    colorClass="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                    gradientClass="bg-blue-500"
                />
                <StatCard
                    title="Promedio por Sede"
                    value={cantidadSedes > 0 ? Math.round(resumen?.totalGlobalExistencias / cantidadSedes) : 0}
                    icon={TrendingUp}
                    colorClass="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                    gradientClass="bg-green-500"
                />
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Distribución por Sede</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {listadoSedes.map((sedeStats, idx) => (
                        <div key={idx} className="backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 border border-white/30 dark:border-white/5 rounded-xl p-5 hover:bg-white/60 dark:hover:bg-gray-800/70 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                            <div className="flex items-center mb-3">
                                <MapPin size={18} className="text-primary-500 dark:text-primary-400 mr-2" />
                                <h4 className="font-medium text-lg text-gray-800 dark:text-gray-100">{sedeStats._id}</h4>
                            </div>
                            <div className="flex justify-between items-end border-t border-black/5 dark:border-white/5 pt-3 mt-2">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Productos</p>
                                    <p className="text-lg font-bold text-gray-700 dark:text-gray-200">{sedeStats.cantidadProductos}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Existencias</p>
                                    <p className="text-lg font-bold text-primary-900 dark:text-primary-400">{sedeStats.total}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {listadoSedes.length === 0 && (
                        <div className="col-span-full py-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl opacity-50">
                            <AlertCircle className="mx-auto mb-2 text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">No hay datos registrados aún.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
