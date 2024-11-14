import React from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Producto {id}</h1>
      <p>Detalles del producto con ID: {id}</p>
      {/* Agrega más detalles e información del producto */}
    </div>
  );
};

export default Product;
