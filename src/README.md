
# Detección de Movimiento con Captura Automática y Envío de Correo

Este proyecto utiliza una combinación de React y Node.js para detectar movimiento en tiempo real usando la cámara del dispositivo y enviar una captura de pantalla por correo electrónico cuando se detecta movimiento significativo.

## Tecnologías Utilizadas

- **React** (con TypeScript y `react-webcam`) para la captura de video.
- **Node.js** y **Express** para la API que envía correos electrónicos.
- **Nodemailer** para enviar correos electrónicos con la imagen adjunta.
- **Vite** para crear el proyecto de React.

## Características

- Detección de movimiento en tiempo real.
- Captura de imagen automática cuando se detecta movimiento.
- Envío de la imagen capturada al correo electrónico especificado.

## Configuración e Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/ramiroec/my-webcam-app.git
cd tu_repositorio
```

### 2. Configuración del Servidor (Node.js)

1. Navega a la carpeta del servidor:
   ```bash
   cd server
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura el archivo de envío de correo:
   - Edita el archivo `server.js` y coloca tu correo y la contraseña de aplicación en la configuración de `nodemailer`:
     ```javascript
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'tu_email@gmail.com', // Reemplaza con tu correo
         pass: 'tu_contraseña_de_aplicación' // Contraseña de aplicación de Gmail
       }
     });
     ```

### 3. Configuración del Cliente (React)

1. Navega a la carpeta del cliente:
   ```bash
   cd client
   ```

2. Crea el proyecto con Vite y selecciona React + TypeScript:
   ```bash
   npm create vite@latest
   ```

3. Instala las dependencias:
   ```bash
   npm install
   npm install react-webcam
   ```

### 4. Ejecución del Proyecto

1. En la carpeta del servidor, inicia el servidor:
   ```bash
   node server.js
   ```

2. En la carpeta del cliente, inicia el proyecto de React:
   ```bash
   npm run dev
   ```

3. Abre el navegador en `http://localhost:5173` (o el puerto que indique Vite).

## Uso

1. Al iniciar la aplicación de React, se activará la cámara y comenzará a detectar movimiento.
2. Cuando se detecta un cambio significativo en la imagen (movimiento), el sistema captura automáticamente una imagen y la envía al correo configurado.
3. El sistema tiene ajustes de sensibilidad para evitar múltiples capturas por pequeños cambios.

## Ajustes de Sensibilidad

En el archivo `WebcamComponent.tsx` del cliente de React, puedes modificar los parámetros para ajustar la sensibilidad de la detección de movimiento:

- **`pixelDiffThreshold`**: Establece el umbral de diferencia de píxeles individuales para considerar un cambio significativo.
- **`motionPixelThreshold`**: Define el porcentaje mínimo de píxeles que deben cambiar para que se considere que hubo movimiento.
- **Intervalo de Detección**: Ajusta el intervalo de tiempo (en milisegundos) entre cada comprobación de movimiento.

## Dependencias

- **Node.js**
- **Express**
- **Nodemailer**
- **React**
- **Vite**
- **react-webcam**

## Notas

- Asegúrate de tener activada la autenticación de dos factores en tu cuenta de Gmail y de utilizar una contraseña de aplicación para `nodemailer`.
- Ajusta los parámetros de sensibilidad según tus necesidades para evitar múltiples envíos de correos por pequeños cambios en la imagen.

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT. Ramiro Estigarribia Canese
