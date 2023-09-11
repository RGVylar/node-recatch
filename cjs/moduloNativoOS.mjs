import os from 'os';

export function moduloNativoOS() {
  const platform = os.platform();
  const release = os.release();
  const arch = os.arch();
  const freemem = os.freemem() / 1024 / 1024;
  const totalmem = os.totalmem() / 1024 / 1024;
  const uptime = os.uptime() / 60 / 60;

  // Construye la respuesta como un objeto JSON
  const response = {
    platform,
    release,
    arch,
    freemem,
    totalmem,
    uptime
  };

  return response;
}
