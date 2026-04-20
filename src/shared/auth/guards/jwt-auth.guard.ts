import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';


/**
 *  Guard que valida autentificacion mediante JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger('JwtAuthGuard.name');
    constructor( private reflector: Reflector, ) {
        super();
      }

    canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler()
      );

      if (isPublic) {
        return true;
      }

      return super.canActivate(context);
    }
      
    handleRequest(err, payload, info: Error ) {
      if (err || !payload) {
          this.logger.warn('Error en autenticacion', err || info);
          throw err || new UnauthorizedException(info);
      }
      return payload;
    }
}