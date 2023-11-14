import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../index.js';
import { StatusCodes } from 'http-status-codes';
import { HasOwner } from '../../../types/index.js';

export class OwnerRouteMiddleware implements Middleware {
  constructor(
    private readonly service: HasOwner,
    private readonly paramName: string,
  ) {}

  public async execute(
    { params, tokenPayload }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const documentId = params[this.paramName];
    const userId = tokenPayload.id;
    const ownerId = await this.service.getOwner(documentId);

    if (ownerId !== userId) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden action',
        'OwnerRouteMiddleware'
      );
    }

    next();
  }
}
