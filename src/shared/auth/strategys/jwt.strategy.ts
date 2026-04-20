import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { lastValueFrom, catchError, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Payload, IUserInstanceModel } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
  
     const issuerUrl = configService.getOrThrow('SIA_OIDC_API');
    
      super({
          secretOrKeyProvider: passportJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${issuerUrl}.well-known/jwks.json`,
          }),
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          issuer: `${issuerUrl}`,
          algorithms: ['RS256'],
          passReqToCallback: true,
        });

  }

  /**
   * Funcion que realiza las primeras validaciones, aca agregamos los roles utilizando el endpoint de sia
   * @param req 
   * @param payload 
   * @returns 
   */
 async validate(req: Request, payload: any) : Promise<Payload> {
    const nroAplicacion = this.configService.getOrThrow('NRO_APLICACION');
    const JWT = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    
    if (JWT) {
      // Obtenemos el usuario (ahora esto usará caché por detrás)
      const userInstance : IUserInstanceModel = await this.authService.obtenerUserInstance(JWT, nroAplicacion);
      
      // Armamos el payload final y lo retornamos. 
      // Passport agarrará esto y lo meterá en req.user de forma segura y aislada para cada petición.
      return { ...payload, userInstance }; 
    } else {
      throw new HttpException('Invalid token', 401);
    }
  }

  /**
   * Obtengo los roles del usuario utilizando el JWT recibido y el n° de aplicacion
   * @param token 
   * @returns 
   */
  async getRoles( token:string ): Promise<IUserInstanceModel> {
    try {
        const SIA_USERINFO = this.configService.getOrThrow('SIA_INFO_API');
        const nroAplicacion = this.configService.getOrThrow('NRO_APLICACION');

        const response = await lastValueFrom(
            this.httpService.get<IUserInstanceModel>(`${SIA_USERINFO}/api/v1/usuarios/actual?nroAplicacion=${nroAplicacion}`,{
              headers: {
                Authorization: `Bearer ${token}`
                }
              })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw new Error(`user info error: ${error.message}`)
                    }),
                    map(response => response.data)
                )
        );

        return response;
    } catch (error) {
        throw new HttpException(`auth error: ${error.message}`, error.status || 500);
    }
  };
}