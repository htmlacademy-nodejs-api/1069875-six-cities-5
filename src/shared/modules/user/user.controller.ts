import { inject, injectable } from 'inversify';
import {
  DefaultController,
  HttpError,
  HttpMethod,
  UploadFileMiddleware,
  ValidateDTOMiddleware,
  ValidateObjectIdMiddleware,
  DocumentExistsMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import {
  UserRDO,
  UserService,
  CreateUserRequest,
  LoginRequest,
  CreateUserDTO,
  LoginDTO,
  ParamUserId,
} from './index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRDO, OfferService } from '../offer/index.js';

@injectable()
export class UserController extends DefaultController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.register,
      middlewares: [new ValidateDTOMiddleware(CreateUserDTO)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuth,
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDTOMiddleware(LoginDTO)],
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Delete,
      handler: this.logout,
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ],
    });
    this.addRoute({
      path: '/:userId/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
      ],
    });
  }

  public async register(
    { body }: CreateUserRequest,
    res: Response
  ): Promise<void> {
    const existedUser = await this.userService.findByEmail(body.email);

    if (existedUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRDO, result));
  }

  public checkAuth(_req: Request, _res: Response): void {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async login({ body }: LoginRequest, _res: Response): Promise<void> {
    const existedUser = await this.userService.findByEmail(body.email);

    if (!existedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email «${body.email}» not found.`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public logout(_req: Request, _res: Response): void {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async uploadAvatar(req: Request, res: Response): Promise<void> {
    this.created(res, {
      filepath: req.file?.path,
    });
  }

  public async getFavorites(
    { params }: Request<ParamUserId>,
    res: Response
  ): Promise<void> {
    const { userId } = params;
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with id «${userId}» not found.`,
        'UserController'
      );
    }

    const favoriteOffers = await this.offerService.findFromList(user.favorite);
    this.ok(res, fillDTO(OfferRDO, favoriteOffers));
  }
}
