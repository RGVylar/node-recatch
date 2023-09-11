// Importa los módulos utilizando la sintaxis ESM en lugar de require
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { exec } from 'child_process';

const app = express();
const server = http.createServer(app);

//const wss = new WebSocket.Server({ noServer: true });
const wss = new WebSocketServer({ noServer: true });

// Importa la función enviarContenido desde el archivo enviarContenido.mjs
import { enviarContenido } from './cjs/enviarContenido.mjs';
import { moduloNativoOS } from './cjs/moduloNativoOS.mjs';
import { moduloNativoFSSync } from './cjs/moduloNativoFSSync.mjs';
import { moduloNativoFSAsync } from './cjs/moduloNativoFSAsync.mjs';

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});


// Middleware de registro de solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida en: ${new Date()}`);
  next();
});




// Ruta de ejemplo
//app.get('/', (req, res) => {
  // Puedes enviar un HTML personalizado o cualquier otro contenido aquí
  //res.send('<h1>Bienvenido a mi aplicación</h1><p>Esta es la página principal.</p>');
//});

// Ruta para el archivo principal
app.get('/', (req, res) => {
  enviarContenido(res, './web/app.html', '/archivo');
});

// Ruta para la teoría
app.get('/teoria', (req, res) => {
  enviarContenido(res, './web/teoria.html', '/teoria');
});


// Stream de datos en tiempo real a través de WebSocket
// Agrega una función para manejar los mensajes desde el cliente
wss.on('connection', socket => {
  console.log('Cliente WebSocket conectado');
  socket.on('message', async message => {
    console.log(`Mensaje del cliente: ${message}`);

    // Cuando recibes el mensaje "ejecutar_script" desde el cliente
    if (message == "ejecutar_script_sonido") {
      exec("D:\\Github\\node-recatch\\scripts\\app.vbs", function (err, stdout, stderr) {
        if (err) {
            return console.log(err);
        }
        console.log(stdout);
    });
    }else if(message == "ejecutar_script_imagen"){
      exec("D:\\Github\\node-recatch\\scripts\\app.bat", function (err, stdout, stderr) {
        if (err) {
            return console.log(err);
        }
    
        // done.
        console.log(stdout);
    });
    } else if (message == "ejecutar_modulo_nativo_os") {
        // Llama a la función para obtener información del sistema operativo
      const systemInfo = moduloNativoOS();

      // Envía la respuesta al cliente a través del WebSocket
      socket.send(JSON.stringify(systemInfo));
    } else if (message == "ejecutar_modulo_nativo_fs_sync") {
        // Llama a la función para obtener información del sistema operativo
      const fileOutput = moduloNativoFSSync();

      // Envía la respuesta al cliente a través del WebSocket
      socket.send(JSON.stringify(fileOutput));
    } else if (message == "ejecutar_modulo_nativo_fs_async") {
        let date = Date();
        let response = [];
        let result = "Inicio de la ejecucion ";
        try {
            response.push({ result, date });
            result = await moduloNativoFSAsync();
            date = Date();
            response.push({ result, date });
        } catch (error) {
            // Maneja los errores si ocurren
            console.error('Error en la ruta:', error.message)
        }
      // Envía la respuesta al cliente a través del WebSocket
      socket.send(JSON.stringify(response));
    }
  });

  socket.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});


server.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
