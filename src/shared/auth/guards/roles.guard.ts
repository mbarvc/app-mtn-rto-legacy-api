import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Payload } from '../interfaces';

/**
 *  Guard que valida los roles del usuario.
 *  Se puede combinar con el decorador 
 *  @RequireRoles('TODOS') para que requiera todos los roles
 *  Caso contrario, con que posea solo alguno de los roles será suficiente
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(  private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const require = this.reflector.get<string>('require', context.getHandler());

    if (!requiredRoles) {
      return true;  // Si no se requieren roles, permitir acceso
    }

    const request = context.switchToHttp().getRequest();
    const userPayload : Payload = request.user; // El usuario autenticado
    
    // Obtener roles desde el UserInstanceModel
    const userRoles = userPayload?.userInstance?.roles.map(role => role.nombre);
    
    if (!userRoles || userRoles.length === 0) {
      throw new HttpException('No roles assigned to the user', HttpStatus.FORBIDDEN);
    }

    if ( require === 'TODOS'){
        const hasRoles = () => requiredRoles.every((role) => userRoles.includes(role));
        if (!hasRoles()) {
          throw new HttpException('Forbidden: Insufficient permissions', HttpStatus.FORBIDDEN);
        }
    } else {
        // Verificar si el usuario tiene uno de los roles requeridos
        const hasRole = () => requiredRoles.some(role => userRoles.includes(role));
        if (!hasRole()) {
          throw new HttpException('Forbidden: Insufficient permissions', HttpStatus.FORBIDDEN);
        }
    }


    return true;
  }
}