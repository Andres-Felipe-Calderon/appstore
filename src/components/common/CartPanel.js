import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import OrderModal from './OrderModal';  // Importamos el modal para el pedido

const CartPanel = ({ onClose }) => {
    const { cart, removeFromCart, clearCart } = useCart(); // Asegúrate de tener clearCart en tu contexto
    const [isModalVisible, setIsModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal

    if (!Array.isArray(cart)) {
        return <div>Datos de carrito no válidos</div>;
    }

    return (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl p-6 overflow-y-auto z-50 border-l border-gray-200
      transition-transform duration-300 ease-in-out transform scale-100"
        >
           <button
    onClick={onClose}
    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xl font-semibold py-2 px-4 mb-6 rounded-full shadow-lg hover:shadow-xl focus:outline-none transform transition-all duration-300 ease-in-out hover:scale-105"
>
    X
</button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Carrito de Compras</h2>


            {cart.length > 0 ? (
                <div className="space-y-4">
                    {cart.map((item, index) => {
                        if (!item || !item.id || !item.title || !item.quantity) return null;

                        return (
                            <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="flex-1 ml-4">
                                    {/* Ajuste del texto para que se divida en varias líneas */}
                                    <p className="text-gray-700 font-semibold text-sm break-words">{item.title}</p>
                                    <p className="text-gray-500">Cantidad: {item.quantity}</p>

                                    {/* Botón de eliminar debajo de la cantidad con ícono rojo */}
                                    <Button
                                        auto
                                        size="xs"
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-600 p-0 bg-transparent"
                                    >
                                        <FaTrashAlt />
                                    </Button>

                                </div>
                            </div>

                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <FaShoppingCart className="text-6xl mb-4" />
                    <p className="text-xl font-semibold">Tu carrito está vacío</p>
                </div>
            )}

            {/* Botón para abrir el modal de ordenar */}
            <div className="mt-6">
                <Button
                    auto
                    onClick={() => {
                        console.log("Hacer pedido clickeado");
                        setIsModalVisible(true);  // Muestra el modal cuando se hace clic
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                    Hacer Pedido
                </Button>
            </div>

            {/* Modal de pedido */}
            {isModalVisible && <OrderModal onClose={() => setIsModalVisible(false)} clearCart={clearCart} />}
        </div>
    );
};

export default CartPanel;
