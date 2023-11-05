import { inject } from 'inversify';
import { DefaultController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response } from 'express';

export class OfferController extends DefaultController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger
  ){
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getOffers});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.createOffer});
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.getOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.updateOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteOffer});
  }

  public getOffers(_req: Request, _res: Response): void {
    // код
  }

  public createOffer(_req: Request, _res: Response): void {
    // код
  }

  public getPremiumOffers(_req: Request, _res: Response): void {
    // код
  }

  public getOffer(_req: Request, _res: Response): void {
    // код
  }

  public updateOffer(_req: Request, _res: Response): void {
    // код
  }

  public deleteOffer(_req: Request, _res: Response): void {
    // код
  }
}
