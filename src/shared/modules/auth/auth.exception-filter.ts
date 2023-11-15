import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Request, Response, NextFunction } from 'express';
import { DefaultAuthException } from './index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!(error instanceof DefaultAuthException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.statusCode).json({
      type: 'AUTHORIZATION',
      message: error.message,
    });
  }
}
