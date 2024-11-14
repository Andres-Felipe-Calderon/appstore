import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">La página que buscas no se ha encontrado.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
