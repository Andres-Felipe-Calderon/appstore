import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const ProductModal = ({ product, onClose }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (product) {
      setProductName(product.title);
      setProductPrice(product.price);
      setProductCategory(product.category);
      setProductDescription(product.description);
      setProductImage(product.image);
    }
  }, [product]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    // Validación de campos vacíos
    if (!productName || !productPrice || !productCategory || !productDescription || !productImage) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos antes de guardar el producto.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return; // No continuar si hay campos vacíos
    }

    const newProduct = {
      id: product ? product.id : Date.now(),
      title: productName,
      price: parseFloat(productPrice),
      category: productCategory,
      description: productDescription,
      image: productImage || 'https://via.placeholder.com/150',
    };

    // Si estamos editando un producto existente
    if (product) {
      Swal.fire({
        title: '¡Producto actualizado!',
        text: 'El producto ha sido actualizado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        onClose(); // Cerrar la modal después de la confirmación
      });
    } else {
      // Si estamos agregando un nuevo producto
      Swal.fire({
        title: '¡Nuevo producto guardado!',
        text: 'El nuevo producto ha sido agregado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        onClose(); // Cerrar la modal después de la confirmación
      });
    }

    // Aquí puedes agregar la lógica de guardar el producto en tu base de datos o en el estado local
   
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg overflow-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre del producto</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el nombre del producto"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Precio</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el precio"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese la categoría"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese la descripción"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Cargar imagen</label>
          <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
            {productImage ? (
              <img
                src={productImage}
                alt="Vista previa"
                className="h-32 w-32 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="text-gray-500 mb-4">Vista previa</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="text-gray-700 text-sm py-1 px-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              Seleccionar imagen
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {product ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
