import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // No necesitas importar BrowserRouter
import { NextUIProvider } from '@nextui-org/react';
import MyNavbar from './components/common/Navbar';
import MyFooter from './components/common/Footer';
import CartButton from './components/common/CartButton';
import CartPanel from './components/common/CartPanel';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import AdminPage from './pages/admin'; // Página principal del admin
import AdminProducts from './pages/ProductosPage'; // Página de productos (admin)
import AdminOrders from './pages/PedidosPage'; // Página de pedidos (admin)
import Login from './pages/login'; // Agregar la página de Login
import PrivateRoute from './components/common/PrivateRoute'; // Importa el componente PrivateRoute

import "./index.css"; // Asegúrate de importar tus estilos

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation(); // Usamos useLocation para obtener la ruta actual

  // Función para alternar la visibilidad del carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Verificar si estamos en una ruta de administración o en la ruta de login
  const isAdminOrLoginRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <NextUIProvider>
      <main>
        <CartProvider> {/* CartProvider sigue envolviendo la aplicación */}
          <MyNavbar />
          <div style={{ padding: '5px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/login" element={<Login />} /> {/* Agregar ruta de Login */}
              
              {/* Rutas de administración protegidas */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/pedidos"
                element={
                  <PrivateRoute>
                    <AdminOrders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/productos"
                element={
                  <PrivateRoute>
                    <AdminProducts />
                  </PrivateRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* Mostrar el CartButton solo si no estamos en una ruta de administración o de login */}
          {!isAdminOrLoginRoute && <CartButton />}

          {/* CartPanel que se muestra cuando el carrito está abierto */}
          {isCartOpen && <CartPanel onClose={toggleCart} />}

          {/* Mostrar el Footer solo si no estamos en una ruta de administración o de login */}
          {!isAdminOrLoginRoute && <MyFooter />}
        </CartProvider>
      </main>
    </NextUIProvider>
  );
};

export default App;
