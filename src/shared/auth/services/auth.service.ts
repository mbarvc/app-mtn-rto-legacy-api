import { HttpException, Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { lastValueFrom, catchError, map } from 'rxjs';
import { AxiosError } from 'axios';
import { IUserInstanceModel } from '../interfaces';
import e from 'express';
import { error } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor( 
        private readonly configService : ConfigService,
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache, // Inyectamos la caché
    ) {}

  async obtenerUserInstance(token: string, nroApp?: number): Promise<IUserInstanceModel> {
    try {
        // 1. Definimos una llave única para este token
        const cacheKey = `user_roles_${token}`;
        
        // 2. Buscamos si ya lo tenemos en memoria
        const cachedUser = await this.cacheManager.get<IUserInstanceModel>(cacheKey);
        if (cachedUser) {
            return cachedUser; // Respuesta instantánea, evitamos el 504 Timeout
        }

        // 3. Si no está en caché, hacemos la petición HTTP a SIA
        const SIA_USERINFO = this.configService.getOrThrow('SIA_INFO_API');
        const response = await lastValueFrom(
            this.httpService.get<IUserInstanceModel>(`${SIA_USERINFO}/api/v1/usuarios/actual?nroAplicacion=${nroApp}`,{
              headers: { Authorization: `Bearer ${token}` }
            }).pipe(
                catchError((error: AxiosError) => {
                    throw new Error(`user info error: ${error.message}`)
                }),
                map(res => res.data)
            )
        );

        // 4. Guardamos el resultado en caché. 
        // Importante: En cache-manager v5, el TTL se pasa en milisegundos. Acá lo guardo por 30 minutos en milesimas de segundo.
        await this.cacheManager.set(cacheKey, response, 1800000); 

        return response;
    } catch (error) {
        throw new HttpException(`auth error: ${error.message}`, error.status || 500);
    }
  };
}