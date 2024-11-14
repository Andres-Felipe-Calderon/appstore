import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input } from '@nextui-org/react';
import Sidebar from '../components/AdminPanel/Sidebar'; // Importamos Sidebar

const PedidosPage = () => {
  const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos
  const [filteredOrders, setFilteredOrders] = useState([]); // Estado para almacenar los pedidos filtrados
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const [page, setPage] = useState(1); // Estado para la paginación
  const rowsPerPage = 4; // Número de filas por página

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || []; // Obtener pedidos del localStorage
    setOrders(storedOrders); // Actualizar el estado con los pedidos obtenidos
    setFilteredOrders(storedOrders); // Inicializamos los pedidos filtrados
  }, []); // El array vacío [] asegura que solo se ejecute una vez cuando el componente se monte

  useEffect(() => {
    // Filtrar los pedidos basados en el término de búsqueda
    const filtered = orders.filter((order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.comments.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered); // Actualizar el estado con los pedidos filtrados
    setPage(1); // Resetear la página cuando se cambie el filtro
  }, [searchTerm, orders]);

  const pages = Math.ceil(filteredOrders.length / rowsPerPage); // Calcular el número total de páginas

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredOrders.slice(start, end);
  }, [page, filteredOrders]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal de la página */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center md:text-left">Pedidos</h2>

        {/* Campo de búsqueda */}
        <div className="mt-4">
          <Input
            clearable
            underlined
            fullWidth
            placeholder="Buscar por nombre, dirección o comentarios"
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
            value={searchTerm}
          />
        </div>

        {/* Mostrar la lista de pedidos */}
        {filteredOrders.length === 0 ? (
          <p className="mt-4 text-gray-500">No hay pedidos que coincidan con la búsqueda.</p>
        ) : (
          <div className="mt-4">
            <Table aria-label="Pedidos con paginación">
              <TableHeader>
                <TableColumn key="name">Nombre</TableColumn>
                <TableColumn key="address">Dirección</TableColumn>
                <TableColumn key="phone">Teléfono</TableColumn>
                <TableColumn key="date">Fecha</TableColumn>
                <TableColumn key="comments">Comentarios</TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.customerName}>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.customerAddress}</TableCell>
                    <TableCell>{item.customerPhone}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.comments}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Paginación */}
            <div className="flex w-full justify-center mt-4">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PedidosPage;
