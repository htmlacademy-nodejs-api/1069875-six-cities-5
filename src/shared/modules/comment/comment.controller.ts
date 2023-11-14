import { inject, injectable } from 'inversify';
import {
  DefaultController,
  HttpError,
  HttpMethod,
  ValidateDTOMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Response } from 'express';
import {
  CommentRDO,
  CommentService,
  CreateCommentDTO,
  CreateCommentRequest,
} from './index.js';
import { OfferService } from '../offer/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/index.js';

@injectable()
export class CommentController extends DefaultController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDTOMiddleware(CreateCommentDTO)],
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'OfferController'
      );
    }

    const comment = await this.commentService.create({
      ...body,
      userId: tokenPayload.id,
    });
    this.created(res, fillDTO(CommentRDO, comment));
  }
}
