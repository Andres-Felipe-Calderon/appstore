import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaTags, FaBars, FaTimes } from 'react-icons/fa'; // Añadimos FaTimes para el icono de cierre
import { Tooltip } from '@nextui-org/react'; // Componente Tooltip de NextUI para mejorar la interacción

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Icono de menú hamburguesa para pantallas pequeñas */}
      <div className="md:hidden fixed top-[72px] left-4 z-50"> {/* Ajustamos la posición del icono */}
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isSidebarOpen ? <FaTimes className="text-2xl text-white" /> : <FaBars className="text-2xl text-gray-800" />}
        </button>
      </div>

      {/* Sidebar visible en pantallas grandes y controlado por el ícono en pantallas pequeñas */}
      <div className={`h-full w-64 bg-gray-800 text-white flex flex-col p-4 shadow-xl rounded-xl md:static fixed top-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:translate-x-0`}>
        <h2 className="text-2xl font-semibold text-center mb-8 text-teal-400">Panel de Admin</h2>

        {/* Opciones de menú con más margen superior */}
        <nav className="flex flex-col space-y-6 mt-8">
          <Tooltip content="Ver pedidos" placement="right">
            <Link
              to="/admin/pedidos"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-600 transition-all"
              onClick={() => setIsSidebarOpen(false)} // Cierra el sidebar al hacer clic en un enlace en móviles
            >
              <FaBox className="text-2xl" />
              <span className="font-medium">Pedidos</span>
            </Link>
          </Tooltip>

          <Tooltip content="Gestionar productos" placement="right">
            <Link
              to="/admin/productos"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-600 transition-all"
              onClick={() => setIsSidebarOpen(false)} // Cierra el sidebar al hacer clic en un enlace en móviles
            >
              <FaTags className="text-2xl" />
              <span className="font-medium">Productos</span>
            </Link>
          </Tooltip>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
