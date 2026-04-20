import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const start = Date.now();
    if (method === 'POST' || method === 'PUT' || method === 'DELETE'){
      this.logger.log(`>> INCOMING ${method} ${originalUrl}`);
    }
    res.on('finish', () => {
      const { statusCode } = res;
      const delay = Date.now() - start;
      
      const message = `<< COMPLETED ${method} ${originalUrl} ${statusCode} ${delay}ms - ${userAgent}`;

      // Si es un error (4xx o 5xx), podrías querer verlo en warn/error, 
      // pero para mantener el formato "Access Log" que pediste, usamos log (info).
      this.logger.log(message);
    });

    next();
  }
}