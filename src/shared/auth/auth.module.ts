import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategys/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
    imports:[ 
        PassportModule.register({ defaultStrategy: 'jwt' }),   
        // JwtModule.registerAsync({ //TODO -> con esto se implementa login? ver sino borrar
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: async (configService: ConfigService) => ({
        //       secret: 'testsecret', // Otras configuraciones del JWT
        //       signOptions: {
        //         expiresIn: '3600s',
        //         issuer: configService.get<string>('SIA_OIDC_API'), // Aquí pasamos el issuer
        //       },
        //     }),
        //   }),
          HttpModule,
          CacheModule.register()
        ],
    providers: [ 
      JwtStrategy, 
      ConfigService, 
      AuthService,
      JwtAuthGuard, 
      RolesGuard
     ],
    exports: [ 
      JwtStrategy, 
      AuthService,
      JwtAuthGuard, 
      RolesGuard 
    ]
})
export class AuthModule {}
