import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import { Toaster } from 'react-hot-toast';
import { Package, LayoutDashboard, Settings, Moon, Sun } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentSede, setCurrentSede] = useState(localStorage.getItem('sede_actual') || '');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Efecto que controla la clase dark base
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = () => {
    setRefreshTrigger(prev => prev + 1);
    handleCloseModal();
  };

  return (
    <div className="flex min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Toaster position="top-right" />

      {/* Sidebar - Modern Design */}
      <aside className="w-64 shrink-0 bg-gray-900/95 dark:bg-gray-950/80 backdrop-blur-xl text-white p-6 shadow-2xl z-20 hidden md:flex flex-col sticky top-0 h-screen transition-colors duration-500">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-900 flex items-center justify-center shadow-lg">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">SyncStock</h1>
            <p className="text-xs text-gray-400">Inventario Distribuido</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${activeTab === 'dashboard'
              ? 'bg-primary-500/20 text-primary-500 border border-primary-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <LayoutDashboard size={20} className="mr-3" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('productos')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${activeTab === 'productos'
              ? 'bg-primary-500/20 text-primary-500 border border-primary-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Package size={20} className="mr-3" />
            Productos
          </button>
        </nav>

        <div className="mt-auto space-y-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 font-medium"
          >
            <div className="flex items-center">
              {isDarkMode ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
              {isDarkMode ? 'Modo Claro' : 'Modo Noche'}
            </div>
          </button>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center text-sm text-gray-300">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              Sistema Operativo
            </div>
            <p className="text-xs text-gray-500 mt-2">MongoDB Atlas Conectado</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">

        {/* Mobile Header */}
        <div className="md:hidden bg-gray-900 dark:bg-gray-950 border-b border-gray-800 dark:border-white/5 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md transition-colors duration-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-900 flex items-center justify-center">
              <Package size={16} />
            </div>
            <span className="font-bold">SyncStock</span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg text-gray-400 hover:text-white">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
            <button onClick={() => setActiveTab('dashboard')} className={`p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'}`}><LayoutDashboard size={20} /></button>
            <button onClick={() => setActiveTab('productos')} className={`p-2 rounded-lg ${activeTab === 'productos' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'}`}><Package size={20} /></button>
          </div>
        </div>

        {/* Content Wrapper for standard layout rules */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'productos' && (
            <ProductList
              onEdit={handleOpenModal}
              refreshTrigger={refreshTrigger}
            />
          )}
        </div>

      </main>

      {/* Global Modals */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSaveProduct}
        sedeActual={currentSede}
      />

      {/* Sede Selection Overlay */}
      {!currentSede && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/20 text-center transform transition-all animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30">
              <Package size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 dark:text-white">Bienvenido Nodo</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Selecciona la sede que representa esta computadora en el sistema distribuido.</p>
            <div className="grid grid-cols-1 gap-3">
              {['Sede Principal', 'Norte', 'Sur', 'Oriente'].map(sede => (
                <button
                  key={sede}
                  onClick={() => {
                    localStorage.setItem('sede_actual', sede);
                    setCurrentSede(sede);
                  }}
                  className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all font-semibold dark:text-gray-200"
                >
                  {sede}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
