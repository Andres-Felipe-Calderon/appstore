## APP-STORE 

**Descripción del Proyecto**
Objetivo: Diseñar e implementar una aplicación frontend que gestione el catálogo de productos y pedidos, con un enfoque en la funcionalidad de la interfaz de usuario, el manejo de datos simulados y la reutilización de componentes. No hay interacción con un backend real, pero se simulan datos para ofrecer una experiencia completa de CRUD (Crear, Leer, Actualizar, Eliminar).
Este proyecto permite al usuario navegar y seleccionar productos, agregarlos al carrito y realizar un pedido simulado. Los administradores pueden iniciar sesión para acceder a un panel donde gestionan los productos y visualizan los pedidos.

**Tecnologías Utilizadas**
•	React - Biblioteca principal para la interfaz de usuario.
•	Tailwind CSS - Para estilos rápidos y personalizados.
•	NextUI - Para componentes de interfaz de usuario adicionales.
•	SweetAlert - Para alertas elegantes y diálogos de confirmación.
•	API Fakestore - Para simular la interacción con datos de productos.
•	Mock de API - Para simular CRUD completo en productos y pedidos.

**Funcionalidades Principales**

Usuarios Generales
•	Catálogo de Productos: Visualiza una lista de productos con la opción de añadirlos al carrito.
•	Carrito de Compras: Los productos seleccionados se agregan al carrito y se puede simular un pedido.
Administradores
•	Autenticación: Inicia sesión para acceder al panel de administración.
•	Gestión de Productos: Crear, editar y eliminar productos.
•	Visualización de Pedidos: Accede a una lista de pedidos realizados por los usuarios.

## Credenciales de Inicio de Sesión
Para acceder al panel de administración, use las siguientes credenciales:

- **Usuario**: `admin`
- **Contraseña**: `2024`

**Requisitos Previos**
Asegúrate de tener instalados los siguientes programas:
•	Node.js: Descargar Node.js
•	npm: Normalmente viene con Node.js, pero puedes verificar con npm -v.

**Configuración y Ejecución**

1.	Clona el repositorio:

•	git clone https://github.com/tu-usuario/app-store.git
•	cd app-store

2.	Instala las dependencias:
•	npm install

3.	Ejecuta la aplicación en modo desarrollo:
•	npm start
Notas Adicionales
•	Gestión de Estados: Utiliza hooks de React para manejar los estados de los productos y el carrito.
•	Simulación de Backend: La aplicación utiliza una API mock de Fakestore para simular las operaciones CRUD.
•	Autenticación: La funcionalidad de login está simulada para acceder al panel de administración.


