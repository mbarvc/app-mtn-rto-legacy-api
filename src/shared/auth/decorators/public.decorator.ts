import { SetMetadata } from '@nestjs/common';

/**
 * Decorador que habilita una ruta para que se acceda de manera publica sin JWT
 * @returns 
 */
export const Public = () => SetMetadata('isPublic', true);