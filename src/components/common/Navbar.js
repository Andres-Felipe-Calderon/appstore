import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica si el usuario está autenticado al cargar el componente y cuando la ubicación cambia
  useEffect(() => {
    const authStatus = localStorage.getItem('authenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (authStatus) {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    }
  }, [location.pathname]);

  // Rutas de administración donde debe mostrarse el menú de usuario
  const adminRoutes = ['/admin', '/admin/pedidos', '/admin/productos'];

  // Función de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('passwordHash');
    setIsAuthenticated(false);
    setMenuOpen(false); // Cierra el menú desplegable
    setMobileMenuOpen(false); // Cierra el menú móvil
    navigate('/'); // Redirige a la página principal
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo y Nombre de la Tienda */}
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <FaHome className="inline mr-2" />
          Tu Tienda
        </Link>

        {/* Enlaces de Navegación */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-white hover:text-gray-400 flex items-center rounded-lg px-3 py-2 transition-all duration-300 ease-in-out transform hover:bg-gray-700"
          >
            <FaHome className="mr-1" /> Inicio
          </Link>
        </div>

        {/* Botón de Iniciar Sesión o Menú de Usuario */}
        {isAuthenticated && adminRoutes.includes(location.pathname) ? (
          <div className="relative hidden md:flex">
            <button
              onClick={() => setMenuOpen(!menuOpen)} // Alterna la visibilidad del menú
              className="text-white flex items-center space-x-2 focus:outline-none"
            >
              <FaUserCircle className="text-2xl" />
              <span className="font-semibold">{username}</span>
            </button>
            {/* Menú desplegable */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic en el enlace
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-white text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out hidden md:inline"
          >
            Iniciar Sesión
          </Link>
        )}

        {/* Menú móvil */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-16 right-0 w-48 bg-white rounded-lg shadow-lg z-10">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              {isAuthenticated && adminRoutes.includes(location.pathname) ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
