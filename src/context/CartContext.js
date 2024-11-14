import React, { createContext, useContext, useState } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del carrito, inicializado vacío

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya está en el carrito, solo aumentamos la cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item.id === productId);
      if (product && product.quantity > 1) {
        // Si el producto tiene más de una unidad, solo disminuimos la cantidad
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      // Si la cantidad es 1 o no hay más, lo eliminamos del carrito
      return prevCart.filter((item) => item.id !== productId);
    });
  };
  

  const clearCart = () => {
    setCart([]); // Limpiar el carrito
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
