import { inject, injectable } from 'inversify';
import {
  DefaultController,
  HttpError,
  HttpMethod,
  UploadFileMiddleware,
  ValidateDTOMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware,
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
  UpdateFavoriteRequest,
  FullUserDataRDO,
  LoggedUserRDO,
} from './index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRDO, OfferService } from '../offer/index.js';
import { AuthService } from '../auth/index.js';

@injectable()
export class UserController extends DefaultController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.AuthService) private readonly authService: AuthService,
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
      middlewares: [new PrivateRouteMiddleware()],
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
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
      ],
    });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Patch,
      handler: this.updateFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
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

  public async checkAuth(
    { tokenPayload: { id } }: Request,
    res: Response
  ): Promise<void> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(FullUserDataRDO, user));
  }

  public async login({ body }: LoginRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    this.ok(
      res,
      fillDTO(LoggedUserRDO, {
        email: user.email,
        token,
      })
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
    { tokenPayload }: Request<ParamUserId>,
    res: Response
  ): Promise<void> {
    const userId = tokenPayload.id;
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

  public async updateFavorite(
    { tokenPayload, body }: UpdateFavoriteRequest,
    res: Response
  ): Promise<void> {
    const userId = tokenPayload.id;
    const { offerId, toFavorite } = body;

    const user = await this.userService.findById(userId);

    if (user?.favorite.includes(offerId) && toFavorite) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer with id «${offerId}» already in favorites.`,
        'UserController'
      );
    }

    if (!user?.favorite.includes(offerId) && !toFavorite) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer with id «${offerId}» is not in favorites.`,
        'UserController'
      );
    }

    const updatedUserData = await this.userService.updateFavorites(
      userId,
      offerId,
      toFavorite
    );
    this.ok(res, fillDTO(FullUserDataRDO, updatedUserData));
  }
}
