import React from 'react';
import Sidebar from './Sidebar'; // Importamos el Sidebar
import { Route, Routes, Navigate } from 'react-router-dom'; // Usamos Routes en lugar de Switch
import PedidosPage from '../../pages/PedidosPage'; // Vista de pedidos
import ProductosPage from '../../pages/ProductosPage'; // Vista de productos

const AdminPanel = () => {
  const username = localStorage.getItem('username') || '';

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-100">
        <Routes>
          {/* Mensaje de bienvenida en la ruta exacta /admin */}
          <Route path="/admin" element={
          <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">¡Bienvenido, {username}!</h1>
          <p className="text-gray-600">Selecciona una opción del menú para empezar a administrar tu tienda.</p>
        </div>
          } />
        
          <Route path="/admin/pedidos" element={<PedidosPage />} />
          <Route path="/admin/productos" element={<ProductosPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
