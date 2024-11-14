import React, { useState, useEffect, useMemo } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Pagination } from '@nextui-org/react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Asegúrate de que todos estén aquí
import Swal from 'sweetalert2';


import ProductModal from './ProductModal'; // Modal para crear y editar


const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null); // Producto seleccionado para editar

  const fetchProducts = async () => {
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (filterValue) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }
    return filtered;
  }, [products, filterValue, statusFilter]);

  const pages = Math.ceil(filteredProducts.length / rowsPerPage);
  const currentPageItems = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleEditProduct = (product) => {
    setModalProduct(product);
    setIsModalOpen(true); // Abrir modal de edición
  };

  const handleAddProduct = () => {
    setModalProduct(null); // No pasa ningún producto, es para agregar
    setIsModalOpen(true); // Abrir modal de creación
  };
  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto será eliminado de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí debes agregar la lógica para eliminar el producto
    
        // Por ejemplo, podrías hacer una llamada a tu API o actualizar el estado local
        // Eliminar el producto del estado
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          placeholder="Buscar por nombre..."
          startContent={<FaSearch />}
          value={filterValue}
          onValueChange={(value) => {
            setFilterValue(value);
            setPage(1);
          }}
          className="w-1/2"
        />
        <Button onClick={handleAddProduct} className="bg-blue-500 text-white flex items-center gap-2">
          <FaPlus /> Agregar Nuevo
        </Button>
      </div>

      <div className="overflow-auto max-h-[490px]">
      <Table aria-label="Tabla de productos" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
  <TableHeader>
    <TableColumn>Imagen</TableColumn>
    <TableColumn>Nombre</TableColumn>
    <TableColumn>Precio</TableColumn>
    <TableColumn>Categoría</TableColumn>
    <TableColumn>Acciones</TableColumn>
  </TableHeader>
  <TableBody items={currentPageItems}>
    {item => (
      <TableRow key={item.id}>
        <TableCell><img src={item.image} alt={item.title} className="w-16 h-16 object-cover" /></TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>{`$${item.price.toFixed(2)}`}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
          <Button
  size="sm"
  className="text-blue-500"
  onClick={() => handleEditProduct(item)}
>
  <FaEdit />
</Button>
<Button
  size="sm"
  className="text-red-500"
  onClick={() => handleDeleteProduct(item.id)}  // Llamar a la función con el id del producto
>
  <FaTrash />
</Button>



          </div>
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
        <Pagination page={page} total={pages} onChange={setPage} color="primary" />
      </div>

      {/* Modal para agregar o editar un producto */}
      {isModalOpen && <ProductModal product={modalProduct} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ProductTable;
