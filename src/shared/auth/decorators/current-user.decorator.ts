import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Payload => {
    const request = ctx.switchToHttp().getRequest();
    // Passport automáticamente inyecta lo que devuelva tu JwtStrategy.validate() adentro de request.user
    return request.user; 
  },
);