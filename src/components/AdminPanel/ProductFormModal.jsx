import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';

const ProductFormModal = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
 
    // Aquí puedes agregar la lógica para guardar el producto
    onClose(); // Cierra el modal después de guardar el producto
  };

  return (
    <Modal open={true} onClose={onClose}>
      <ModalHeader>
        <h3>Agregar Nuevo Producto</h3>
      </ModalHeader>
      <ModalBody>
        <Input
          label="Nombre"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
        <Input
          label="Precio"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
        <Input
          label="Categoría"
          name="category"
          value={product.category}
          onChange={handleInputChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button auto flat color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button auto onClick={handleSubmit}>
          Guardar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductFormModal;
