import { inject, injectable } from 'inversify';
import { DefaultController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Response } from 'express';
import { CreateCommentRequest } from './index.js';

@injectable()
export class CommentController extends DefaultController {
  constructor(@inject(Component.Logger) protected readonly logger: Logger) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public create(_req: CreateCommentRequest, _res: Response): void {}
}
