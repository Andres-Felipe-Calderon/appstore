import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from '@nextui-org/react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) {
    return <p>No product data available</p>;
  }

  const handleAddToCart = () => {
   
    addToCart(product);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out flex flex-col justify-between h-full">
      <CardHeader className="p-4">
        <h3 className="text-md font-bold mb-2 h-12 overflow-hidden">{product.title}</h3>
      </CardHeader>
      
      <CardBody className="flex-grow p-4 flex flex-col items-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-contain rounded-md mb-4"
        />
        <p className="text-gray-700 text-lg font-semibold">${product.price}</p>
      </CardBody>

      <CardFooter className="p-4">
        <Button 
          size="sm" 
          color="primary" 
          className="w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
