import { Container } from 'inversify';
import { AuthService } from './auth-service.interface.js';
import { Component } from '../../types/index.js';
import { AuthExceptionFilter, DefaultAuthService } from './index.js';
import { ExceptionFilter } from '../../libs/rest/index.js';

export function createAuthContainer() {
  const container = new Container();
  container
    .bind<AuthService>(Component.AuthService)
    .to(DefaultAuthService)
    .inSingletonScope();
  container
    .bind<ExceptionFilter>(Component.AuthExceptionFilter)
    .to(AuthExceptionFilter)
    .inSingletonScope();

  return container;
}
