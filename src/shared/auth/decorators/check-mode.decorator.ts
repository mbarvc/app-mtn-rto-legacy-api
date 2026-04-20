import { SetMetadata } from '@nestjs/common';

/**
 * Este decorador define si se deben requerir todos los roles 'TODOS' o solo uno (no pasar nada o 'ALGUNO')
 * @param require 
 * @returns 
 */
export const RolesCheckMode = (require: string) => SetMetadata('require', require);
