import React from 'react';
import { Button, Table } from '@nextui-org/react';
import { useCart } from '../context/CartContext';  // Usamos el hook useCart en lugar de useContext

const Cart = () => {
  const { cart, removeFromCart } = useCart();  // Obtenemos el carrito y la función para eliminar productos

  return (
    <div>
    <h1 className="text-center">Carrito de Comprass</h1>

      <Table aria-label="Cart Items">
        <Table.Header>
          <Table.Column>Producto</Table.Column>
          <Table.Column>Cantidad</Table.Column>
          <Table.Column>Acción</Table.Column>
        </Table.Header>
        <Table.Body>
          {cart.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => removeFromCart(item.id)}>Eliminar</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Cart;
