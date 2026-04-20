import { SetMetadata } from '@nestjs/common';

/**
 * Decorador que deshabilita una ruta, en caso de intentar acceder a una ruta deshabilitada nos devolvera un 404.
 * @returns 
 */
export const Deshabilitada = () => SetMetadata('isDisabled', true);