import { Prisma } from '@prisma/client';
import { DomainException } from '../exceptions/domain.exception';
import { Logger } from '@nestjs/common'; // Útil para registrar errores no controlados

/**
 * Helper para manejar y mapear errores de Prisma. Usar en los repository NO en los services
 * @param error 
 * @param entityName 
 */
export function handlePrismaError(error: unknown, entityName: string = 'Registro'): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const buildMsg = (msg: string) => `${entityName}: ${msg}`;

    switch (error.code) {
      case 'P2002': // Unique constraint failed
        const target = (error.meta?.target as string[])?.join(', ') || 'campo único';
        throw new DomainException(buildMsg(`Ya existe un registro con el mismo ${target}.`), 400);

      case 'P2003': // Foreign key constraint failed
        throw new DomainException(buildMsg(`Violación de relación. Asegúrate de que los datos referenciados existan.`), 400);

      case 'P2011': // Null constraint violation
        throw new DomainException(buildMsg(`Un campo requerido no puede ser nulo.`), 400);

      case 'P2025': // Record not found
        throw new DomainException(buildMsg(`El registro que intentas actualizar o eliminar no existe.`), 404);

      default:
        // Logger.error(`Prisma Error ${error.code}`, error.message, 'DatabaseErrorHandler');
        throw new DomainException(`Error de base de datos no controlado (Código: ${error.code})`, 500);
    }
  }

  // Si el error ya es una excepción de dominio, lo dejamos pasar
  if (error instanceof DomainException) {
    throw error;
  }

  // Para cualquier otro error (ej. fallos de red, timeouts)
  throw new DomainException('Error interno del servidor al procesar la base de datos.', 500);
}