import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/auth/guards/jwt-auth.guard';
import { DisabledRouteGuard } from './shared/guards/disabled-route.guard';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './shared/auth/auth.module';

import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './shared/infrastructure/logger/winston.config';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggingMiddleware } from './shared/infrastructure/middleware/logging.middleware';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module';
import { ParametricasModule } from './modules/parametricas/parametricas.module';
import { RevisionModule } from './modules/revision/revision.module';
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';

@Module({
  imports: [    
    // AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SwaggerModule,
    TerminusModule, 
    HttpModule,   
    WinstonModule.forRoot({...winstonConfig}),
    ParametricasModule,
    RevisionModule,
    VehiculoModule,
  ],
  controllers: [AppController],
  providers:[
    // {
      // provide: APP_GUARD,
      // useClass: DisabledRouteGuard,
    // },
    // {
      // provide: APP_GUARD,
      // useClass: JwtAuthGuard,
    // },
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL }); // Aplica a TODAS las rutas
  }
}
