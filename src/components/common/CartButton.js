import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import CartPanel from '../common/CartPanel'; // Importa el nuevo componente CartPanel

const CartButton = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el panel lateral

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="fixed bottom-4 right-4 flex items-center justify-center">
        <button
          onClick={toggleCart}
          className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <FaShoppingCart className="text-2xl" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Panel lateral del carrito */}
      {isOpen && <CartPanel onClose={toggleCart} />} {/* Mostrar el panel si isOpen es true */}
    </>
  );
};

export default CartButton;
