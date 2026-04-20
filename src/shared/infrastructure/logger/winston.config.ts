import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const timezoned = () => {
  return new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }); 
};
// Configuración de rotación mensual SIN compresión
const monthlyRotateTransport = new winston.transports.DailyRotateFile({
  // 1. Carpeta de logs
  dirname: 'logs',

  // 2. Patrón de nombre.
  // Ejemplo resultante: application-2025-11.log
  filename: 'rto-legacy-api-log-%DATE%.log',

  // 3. Frecuencia de rotación: YYYY-MM = Mensual
  datePattern: 'YYYY-MM',

  // 4. DESACTIVADO: No comprimir. Guarda texto plano (.log)
  zippedArchive: false,

  // 5. tamaño:
  // Como no comprimimos, si un mes tiene MUCHOS logs, el archivo podría ser gigante.
  // Esta opción rota el archivo si supera 50MB dentro del mismo mes
  // (creará application-2025-11.1.log, etc.)
  maxSize: '50m',

  // 6. antigüedad:
  // Winston mirará la fecha del archivo y borrará los que tengan
  // más de 6 meses de antigüedad.
  maxFiles: '6m',
});

export const winstonConfig = {
  transports: [
    // Consola (para desarrollo/docker logs)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('rto-legacy-api', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    // Archivo Rotativo Mensual
    monthlyRotateTransport,
  ],
  // Formato del archivo (JSON es más seguro y fácil de leer por máquinas)
  format: winston.format.combine(
    winston.format.timestamp({ format: timezoned }),
    winston.format.json(),
  ),
};