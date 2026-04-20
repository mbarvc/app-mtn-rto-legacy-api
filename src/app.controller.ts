import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheckService, MemoryHealthIndicator, HealthCheck, HealthIndicatorResult, PrismaHealthIndicator } from '@nestjs/terminus';
import { Public } from './shared/auth/decorators/public.decorator';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService,
    private db: PrismaHealthIndicator,
    private prismaSer : PrismaService

  ) {}

  // @Get('doc')
  // redirectDoc(@Res() res) {
  //  return res.redirect('/api/docs');
  // }

  // Captura mi-api.com/doc y lo envía a mi-api.com/api/docs
  @Get('doc')
  @Redirect('/api/doc', 301)
  @ApiExcludeEndpoint() // Para que no ensucie tu Swagger
  redirectDoc() {}

  @Get('docs')
  @Redirect('/api/doc', 301)
  @ApiExcludeEndpoint() // Para que no ensucie tu Swagger
  redirectDocs() {}

  @Get('health')
  @Public() // Tu decorador para saltar el Auth Guard
  @HealthCheck() // Decorador de Swagger/Terminus
  check() {
    return this.health.check([
      () => this.db.pingCheck('database', this.prismaSer ),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.getAppInfo(),
    ]);
  }

  /**
   * Crea un indicador de salud personalizado para mostrar metadatos
   */
  private getAppInfo(): HealthIndicatorResult {
    const appName = 'Portal Empresas - API';
    
    return {
      app_metadata: {
        status: 'up', // Siempre arriba si llegamos aquí
        info: {
            name: appName,
            environment: this.configService.get('NODE_ENV') || 'development',
            version: {
                branch: process.env.GIT_BRANCH || 'unknown',
                commit: process.env.GIT_SHA || 'unknown',
            },
            timestamp: new Date().toISOString(),
        }
      },
    };
  }
}
