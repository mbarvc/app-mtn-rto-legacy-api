import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 *  Guard que valida autentificacion mediante JWT
 */
@Injectable()
export class DisabledRouteGuard implements CanActivate {
    constructor( private reflector: Reflector ) {}

    canActivate(context: ExecutionContext) {
      const isDisabled = this.reflector.get<boolean>(
        'isDisabled',
        context.getHandler()
      );

      if ( isDisabled === true ) {
        throw new NotFoundException('Ruta deshabilitada.');
      }

      return true
    }
}