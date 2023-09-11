//FORMA NUEVA
// Función para manejar la lectura de archivos y el envío de contenido a través de WebSocket

import { promises as fs } from 'fs';
import WebSocket from 'ws';
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ noServer: true });
export async function enviarContenido(res, archivo, rutaWebSocket) {
    try {
      const data = await fs.readFile(archivo, 'utf8');
      // Enviar el contenido del archivo al cliente a través de WebSocket
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      res.send(data);
    } catch (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).send('Error interno del servidor');
    }
  }
