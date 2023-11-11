import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { DefaultCommentService, CommentEntity, CommentModel, CommentService, CommentController } from './index.js';
import { Controller } from '../../libs/rest/index.js';

export function createCommentContainer() {
  const container = new Container();
  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  container.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();

  return container;
}
