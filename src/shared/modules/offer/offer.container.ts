import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { DefaultOfferService, OfferEntity, OfferModel, OfferService } from './index.js';

export function createOfferContainer() {
  const container = new Container();
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return container;
}
