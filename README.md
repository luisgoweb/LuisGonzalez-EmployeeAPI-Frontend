Este es un proyecto de gestión de empleados desarrollado como una prueba técnica. La aplicación implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y cuenta con un sistema de autenticación seguro basado en tokens. La interfaz de usuario es intuitiva y está diseñada para una experiencia de usuario fluida.

Tecnologías Utilizadas
El proyecto se construyó utilizando las siguientes tecnologías clave:

Vite: Un bundler rápido para desarrollo frontend.

React: Biblioteca de JavaScript para construir interfaces de usuario.

TypeScript: Lenguaje de programación que añade tipado estático a JavaScript, mejorando la robustez del código.

Zod: Biblioteca de validación de esquemas que asegura la integridad de los datos.

Zustand: Un gestor de estado minimalista y flexible para manejar el estado de la aplicación.

Material-UI (MUI): Un framework de diseño para componentes de React que proporciona un look and feel profesional.

CSS Modules: Para encapsular los estilos de cada componente y evitar conflictos.

Axios: Un cliente HTTP para realizar peticiones a la API.

React Hook Form: Para manejar los formularios de manera eficiente y con validaciones robustas.

Cómo Correr el Proyecto
Para poner en marcha el proyecto, sigue estos sencillos pasos:

Clona el repositorio:

Bash

git clone https://github.com/luisgoweb/LuisGonz-lez-EmployeeAPI-Frontend.git
Instala las dependencias: Navega al directorio del proyecto y ejecuta el siguiente comando.

Bash

npm install
Corre el proyecto en modo de desarrollo:

Bash

npm run dev
El proyecto se iniciará en tu navegador por defecto.

Diseño y Decisiones Clave
Las decisiones de diseño y arquitectura se tomaron con el objetivo de crear una aplicación robusta, escalable y fácil de mantener.

Gestión de Estado Centralizada: Se eligió Zustand para gestionar el estado de la autenticación (token, nombre de usuario) y la lista de empleados. Esta decisión nos permitió evitar el "prop drilling" y mantener la información crítica accesible desde cualquier componente.

Validación de Datos Completa: La combinación de React Hook Form y Zod fue crucial. React Hook Form maneja el ciclo de vida del formulario de manera eficiente, mientras que Zod se encarga de la validación del esquema de datos tanto en el frontend como en las respuestas de la API, proporcionando una capa extra de seguridad y consistencia.

Arquitectura Modular: El código se estructuró en directorios lógicos (components, services, schemas, store, types). Esto separa las responsabilidades de cada parte de la aplicación (UI, lógica de negocio, validación), lo que facilita la lectura y el mantenimiento del código.

Manejo de la Seguridad: La autenticación se maneja a través de tokens, los cuales se almacenan en el localStorage para persistencia. Cada petición a la API que requiere autorización se realiza con el token, asegurando que solo los usuarios autenticados puedan acceder a los recursos.

Experiencia de Usuario: Se priorizó una UX intuitiva. El Dashboard incluye funcionalidades como búsqueda dinámica y paginación, lo que permite una gestión eficiente de un gran número de empleados. Las alertas de Material-UI se utilizan para proporcionar retroalimentación visual al usuario de manera elegante, reemplazando las alertas nativas del navegador.
