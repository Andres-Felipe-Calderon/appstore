import React, { useState, useEffect } from 'react';
import Sidebar from '../components/AdminPanel/Sidebar'; // Importamos Sidebar
import ProductTable from '../components/AdminPanel/ProductTable';
import { getProducts } from '../services/productService'; // Importamos el servicio

const ProductosPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando los productos
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    // Llamada a la API para obtener los productos
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data); // Guardamos los productos en el estado
      } catch (error) {
        setError('Error al cargar los productos'); // Manejamos el error
      } finally {
        setLoading(false); // Al finalizar la carga, establecemos loading como false
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal de la página */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center md:text-left">Productos</h2>
   
        {/* Mostrar cargando mientras se obtiene la data */}
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ProductTable products={products} />
        )}
      </div>
    </div>
  );
};

export default ProductosPage;
