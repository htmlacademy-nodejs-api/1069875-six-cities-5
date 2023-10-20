import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { DefaultUserService, UserEntity, UserModel, UserService } from './index.js';

export function createUserContainer() {
  const container = new Container();
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return container;
}
