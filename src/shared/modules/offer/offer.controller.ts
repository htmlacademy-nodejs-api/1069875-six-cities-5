import { inject } from 'inversify';
import {
  DefaultController,
  DocumentExistsMiddleware,
  HttpMethod,
  OwnerRouteMiddleware,
  PrivateRouteMiddleware,
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
  OfferEntity,
} from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRDO, CommentService } from '../comment/index.js';
import { UserService } from '../user/index.js';
import { DocumentType } from '@typegoose/typegoose';
import { TokenPayload } from '../auth/index.js';

export class OfferController extends DefaultController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
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
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDTOMiddleware(CreateOfferDTO),
      ],
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
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDTOMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new OwnerRouteMiddleware(this.offerService, 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new OwnerRouteMiddleware(this.offerService, 'offerId'),
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

  private async addFavoriteFlags(
    tokenPayload: TokenPayload | undefined,
    offers: DocumentType<OfferEntity>[]
  ): Promise<DocumentType<OfferEntity>[]> {
    const favoriteList = tokenPayload
      ? (await this.userService.findById(tokenPayload.id))?.favorite
      : undefined;
    const data = offers.map((offer) => {
      offer.isFavorite = favoriteList ? favoriteList.includes(offer.id) : false;
      return offer;
    });
    return data;
  }

  public async index(
    { query: { limit }, tokenPayload }: GetOffersRequest,
    res: Response
  ): Promise<void> {
    const count = limit !== undefined ? +limit : limit;
    const offers = await this.offerService.find(count);
    const responseData = fillDTO(
      OfferRDO,
      await this.addFavoriteFlags(tokenPayload, offers)
    );
    this.ok(res, responseData);
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
    this.created(res, fillDTO(FullOfferRDO, { ...offer, isFavorite: false }));
  }

  public async indexPremium(
    { tokenPayload }: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.findPremium();
    const responseData = fillDTO(
      OfferRDO,
      await this.addFavoriteFlags(tokenPayload, offers)
    );
    console.log(responseData);
    this.ok(res, responseData);
  }

  public async show(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    const responseData = fillDTO(
      FullOfferRDO,
      offer ? (await this.addFavoriteFlags(tokenPayload, [offer])).at(0) : offer
    );
    this.ok(res, responseData);
  }

  public async update(
    { params, body, tokenPayload }: UpdateOfferRequest,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    await this.offerService.updateById(offerId, body);
    const offer = await this.offerService.findById(offerId);
    const responseData = fillDTO(
      FullOfferRDO,
      offer ? (await this.addFavoriteFlags(tokenPayload, [offer])).at(0) : offer
    );
    this.ok(res, responseData);
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
