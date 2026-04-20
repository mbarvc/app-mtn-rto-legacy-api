import { SetMetadata } from '@nestjs/common';
/**
 * Decorador que recibe que roles aceptara el endpoint 
 * @param roles 
 * @returns 
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);