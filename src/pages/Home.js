import React, { useState, useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import { getProducts } from '../services/productService';
import bannerImage from '../assets/images/fondostore.jpg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();

        if (Array.isArray(products)) {
          setProducts(products);
        } else {
          throw new Error('Los productos no son un array');
        }
      } catch (error) {
        console.error("Error fetching products:", error); // Imprime el error
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Banner de bienvenida */}
      <div className="relative w-full h-64 sm:h-96 lg:h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-2 sm:space-y-4 p-4">
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold text-center">Bienvenidos a nuestra tienda</h1>
          <p className="text-white text-md sm:text-lg lg:text-xl text-center">¡¡Encuentra lo mejor en ropa y tecnología a un solo click!!</p>
        </div>
      </div>

      {/* Título de productos */}
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Tus Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
