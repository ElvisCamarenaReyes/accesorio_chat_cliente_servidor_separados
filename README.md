#### Para poder ejecutar el frontend (chat_backend_prueba) usamos npm run dev desde powershell
paquetes instalados para crear el proyecto:
- npm create vite@latest chat-support-app --template react
- npm install (desde dentro de la carpeta creada por vite@latest)
- npm install lucide-react
- npm install -D tailwindcss@3.4.14 postcss autoprefixer (esta version era la mas compatible para trabajar en ese momento)
- npx tailwindcss init -p
- npm install react-router-dom
Lo ejecuto con el siguiente comando en la terminal powershell:
- npm run dev (corre en http://localhost:5173)
  
### I added this 3 lines on top of src/index.css document:
@tailwind base;
@tailwind components;
@tailwind utilities;

#### Para poder ejecutar el backend que es lo que esta en la otra carpeta:

Paquetes instalados para que funcione el backend:
- npm init -y
- npm install express@4 cors
Lo ejecuto con el siguiente comando en la terminal powershell:
- node server.js (corre en http://localhost:5173/admin)
