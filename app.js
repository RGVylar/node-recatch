const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });
const { spawn } = require('child_process');

const { enviarContenido }  = require('./functions/enviarContenido');
//const { moduloNativoOs }  = require('./functions/moduloNativoOs');

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
  enviarContenido(res, 'app.html', '/archivo');
});

// Ruta para la teoría
app.get('/teoria', (req, res) => {
  enviarContenido(res, 'teoria.html', '/teoria');
});


// Stream de datos en tiempo real a través de WebSocket
// Agrega una función para manejar los mensajes desde el cliente
wss.on('connection', socket => {
  console.log('Cliente WebSocket conectado');

  socket.on('message', message => {
    console.log(`Mensaje del cliente: ${message}`);

    // Cuando recibes el mensaje "ejecutar_script" desde el cliente
    if (message == "ejecutar_script_sonido") {
      require('child_process').exec("D:\\Github\\node-recatch\\app.vbs", function (err, stdout, stderr) {
        if (err) {
            return console.log(err);
        }
        console.log(stdout);
    });
    }else if(message == "ejecutar_script_imagen"){
      require('child_process').exec("D:\\Github\\node-recatch\\app.bat", function (err, stdout, stderr) {
        if (err) {
            return console.log(err);
        }
    
        // done.
        console.log(stdout);
    });

    }else if(message == "modulo_nativo_os"){
      //moduloNativoOs(); 
    }
  });

  socket.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});


server.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
