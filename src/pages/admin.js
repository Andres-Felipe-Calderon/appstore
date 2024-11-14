import React from 'react';
import AdminPanel from '../components/AdminPanel/AdminPanel';

const AdminPage = () => {
  const username = localStorage.getItem('username') || '';

  return (
    <div className="min-h-screen bg-gray-200 p-0"> {/* Elimina el padding aquí */}
     
      <AdminPanel />
      
    </div>
  );
};

export default AdminPage;
