import { inject } from 'inversify';
import {
  DefaultController,
  DocumentExistsMiddleware,
  HttpMethod,
  ValidateDTOMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response } from 'express';
import {
  OfferRDO,
  OfferService,
  CreateOfferRequest,
  FullOfferRDO,
  ParamOfferId,
  UpdateOfferRequest,
  GetOffersRequest,
  CreateOfferDTO,
  UpdateOfferDTO,
} from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRDO, CommentService } from '../comment/index.js';

export class OfferController extends DefaultController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDTOMiddleware(CreateOfferDTO)],
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.indexPremium,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDTOMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async index(
    { query: { limit } }: GetOffersRequest,
    res: Response
  ): Promise<void> {
    const count = limit !== undefined ? +limit : limit;
    const offers = await this.offerService.find(count);
    this.ok(res, fillDTO(OfferRDO, offers));
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      hostId: tokenPayload.id,
    });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(FullOfferRDO, offer));
  }

  public async indexPremium(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium();
    this.ok(res, fillDTO(OfferRDO, offers));
  }

  public async show(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(FullOfferRDO, offer));
  }

  public async update(
    { params, body }: UpdateOfferRequest,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    await this.offerService.updateById(offerId, body);
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(FullOfferRDO, offer));
  }

  public async delete(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async getComments(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRDO, comments));
  }
}
