import { inject } from 'inversify';
import { DefaultController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response } from 'express';
import { OfferRDO, OfferService } from './index.js';
import { fillDTO } from '../../helpers/common.js';

export class OfferController extends DefaultController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
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

  public async getOffers(_req: Request, res: Response): Promise<void> {
    // ожидает дополнения
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
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
