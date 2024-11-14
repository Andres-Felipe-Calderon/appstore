// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MD5 from 'crypto-js/md5'; // Importa la función MD5 desde crypto-js

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // El hash MD5 de "2024" 
  const mockUser = {
    username: 'admin',
    passwordHash: '07811dc6c422334ce36a09ff5cd6fe71' // hash MD5 de "2024"
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Elimina espacios al principio y al final antes de generar el hash
    const trimmedPassword = password.trim();

    // Verifica si la contraseña está siendo leída correctamente
   

    // Genera el hash de la contraseña
    const hashedPassword = MD5(trimmedPassword).toString();



    if (username === mockUser.username && hashedPassword === mockUser.passwordHash) {
      // Comprobando si los valores se guardan en localStorage
     
      localStorage.setItem('authenticated', true);
      localStorage.setItem('username', username);
      localStorage.setItem('passwordHash', hashedPassword);

      // Redirigir a /admin
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas');
    }
  };
  
  return (
<div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">

  <div className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 p-8 rounded-3xl shadow-lg w-80 transition-transform transform hover:scale-105">
    <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Iniciar sesión</h2>
    <form onSubmit={handleLogin} className="space-y-4 font-sans">
      <div>
        <label htmlFor="username" className="block text-gray-700 mb-2">Usuario</label>
        <input
          type="text"
          id="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none shadow-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 transition duration-300"
      >
        Iniciar sesión
      </button>
    </form>
  </div>
</div>




  );
};

export default Login;
