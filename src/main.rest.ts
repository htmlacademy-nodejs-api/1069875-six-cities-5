import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createUserContainer } from './shared/modules/user/index.js';

async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer(), createUserContainer());

  const app = appContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
