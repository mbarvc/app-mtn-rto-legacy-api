import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { winstonConfig } from './shared/infrastructure/logger/winston.config';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const { name, description, version } = require(`${process.cwd()}/package.json`);

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);

  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: logger,
      abortOnError: false,
    });

    app.useStaticAssets(join(process.cwd(), 'public'));

    app.setGlobalPrefix('api', {
      exclude: [
        { path: 'doc', method: RequestMethod.GET },
        { path: 'docs', method: RequestMethod.GET },
        { path: '', method: RequestMethod.GET },
      ],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: true,
      }),
    );

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    const config = new DocumentBuilder()
      .setTitle(name)
      .setDescription(description)
      .setVersion(
        `${process.env.NODE_ENV?.toUpperCase().includes('PROD') ? '' : process.env.NODE_ENV?.toUpperCase()} v${version}`,
      )
      .setContact(
        'Comisión Nacional de Regulación del Transporte',
        'https://www.argentina.gob.ar/transporte/cnrt',
        'sgi@cnrt.gob.ar',
      )
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const customCss = `
                    .swagger-ui .topbar {
                      background: #232d4f;
                    }

                    .swagger-ui .topbar-wrapper a svg,
                    .swagger-ui .topbar-wrapper a img,
                    .swagger-ui .topbar-wrapper a span {
                      display: none !important;
                    }

                    .swagger-ui .topbar-wrapper .link::before {
                      content: "";
                      display: inline-block;
                      width: 140px;
                      height: 40px;
                      background: url('/logo_cnrt_blanco.png') no-repeat left center;
                      background-size: contain;
                    }`;

    const options: SwaggerCustomOptions = {
      useGlobalPrefix: true,
      jsonDocumentUrl: 'doc/json',
      yamlDocumentUrl: 'doc/yaml',
      customfavIcon: '/favicon.ico',
      customSiteTitle: name,
      customCss: customCss,
    };

    SwaggerModule.setup('doc', app, document, options);

    app.useGlobalFilters(new AllExceptionsFilter(app.get(ConfigService)));

    app.enableCors({
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Disposition'],
    });

    const port = process.env.PORT ?? 4000;
    await app.listen(port);

    logger.log(`🚀 Aplicación iniciada exitosamente en puerto ${port}`);
    logger.log(
      `📄 Documentación disponible en http://localhost:${port}/api/doc`,
    );
  } catch (error) {
    const errorStack = error instanceof Error ? error.stack : String(error);
    logger.error(
      '❌ CRITICAL ERROR: La aplicación falló al iniciar',
      errorStack,
    );
    process.exit(1);
  }
}
bootstrap();
