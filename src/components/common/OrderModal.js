import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const OrderModal = ({ onClose, clearCart }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isOpen, setIsOpen] = useState(true); // Para manejar el estado del modal

  const handleOrderSubmit = () => {
    // Crear el objeto del pedido
    const order = {
      customerName,
      customerAddress,
      customerPhone,
      comments: document.getElementById('comments').value, // Agregar los comentarios
      date: new Date().toLocaleString(), // Fecha y hora de la creación del pedido
    };

    // Guardar el pedido en el localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || []; // Obtener pedidos previos
    existingOrders.push(order); // Agregar el nuevo pedido
    localStorage.setItem('orders', JSON.stringify(existingOrders)); // Guardar los pedidos en el localStorage

    // Limpiar el carrito desde el contexto
    clearCart();

    // Mostrar mensaje de éxito con SweetAlert2
    Swal.fire({
      title: '¡Éxito!',
      text: 'Tu pedido fue enviado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });

  

    onClose(); // Cierra el modal después de enviar el pedido
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Formulario de Pedido</h3>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 text-lg">&times;</button>
        </div>

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label htmlFor="customerName" className="text-sm font-semibold text-gray-700">Nombre</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="customerAddress" className="text-sm font-semibold text-gray-700">Dirección</label>
            <input
              id="customerAddress"
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="customerPhone" className="text-sm font-semibold text-gray-700">Teléfono</label>
            <input
              id="customerPhone"
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="comments" className="text-sm font-semibold text-gray-700">Comentarios adicionales</label>
            <textarea
              id="comments"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Si tienes alguna solicitud especial, escríbela aquí..."
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleOrderSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Enviar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
