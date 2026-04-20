import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responsePayload: any = { message: 'Internal server error' };
    let stacktrace: string | undefined;

    // ====================================================================
    // 1. MANEJO DE EXCEPCIONES HTTP (NestJS, Terminus, Validaciones)
    // ====================================================================
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      stacktrace = exception.stack;

      // CASO A: Terminus Health Check (503 Service Unavailable)
      // Preservamos el JSON completo con los detalles de la base de datos y memoria.
      if (
        exception instanceof ServiceUnavailableException &&
        typeof res === 'object'
      ) {
        responsePayload = res;
      }
      // CASO B: Ruta No Encontrada (404)
      // Sobrescribimos el mensaje genérico de Express por el nuestro personalizado.
      else if (exception instanceof NotFoundException) {
        responsePayload = {
          error: 'Not Found',
          message: exception.message ?? 'Ruta inválida o no implementada',
        };
      }
      // CASO C: Otras excepciones HTTP (Ej: Class-Validator 400 Bad Request)
      else {
        responsePayload = typeof res === 'object' ? res : { message: res };
      }
    }
    // ====================================================================
    // 2. MANEJO DE ERRORES DE BASE DE DATOS (Prisma)
    // ====================================================================
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      responsePayload = {
        error: 'Database Error',
        message: `Prisma Error Code: ${exception.code}`,
      };
      stacktrace = exception.stack;
    }
    // ====================================================================
    // 3. ERRORES GENÉRICOS DE JAVASCRIPT / NODE (Fallos críticos)
    // ====================================================================
    else if (exception instanceof Error) {
      responsePayload = {
        error: 'Internal Error',
        message: exception.message,
      };
      stacktrace = exception.stack;
    }

    // ====================================================================
    // LOGGING (Winston / Nest Logger)
    // ====================================================================
    // Evitamos ensuciar la consola con el stacktrace gigante de Terminus si solo es un ping fallido
    if (exception instanceof ServiceUnavailableException) {
      this.logger.warn(
        `[${request.method}] ${request.url} - Health Check Fallido (Servicio Degradado)`,
      );
    } else if (status >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} - Error: ${JSON.stringify(responsePayload)}`,
        stacktrace,
      );
    } else {
      this.logger.warn(
        `[${request.method}] ${request.url} - Warning: ${JSON.stringify(responsePayload)}`,
      );
    }

    // ====================================================================
    // CONSTRUCCIÓN DE LA RESPUESTA FINAL
    // ====================================================================
    const isProduction =
      this.configService.get<string>('APP_ENVIRONMENT') === 'prod';

    // Armamos un JSON predecible. Al hacer spread (...responsePayload), inyectamos
    // dinámicamente el contenido de Terminus, de validación o nuestro 404.
    const finalResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...responsePayload,
    };

    // Solo adjuntamos el stacktrace si estamos en desarrollo
    if (!isProduction && stacktrace && status >= 500) {
      finalResponse.stack = stacktrace;
    }

    response.status(status).json(finalResponse);
  }
}
