import { Request } from 'express';
import { ParamOfferId, UpdateOfferDTO } from '../index.js';

export type UpdateOfferRequest = Request<
  ParamOfferId,
  unknown,
  UpdateOfferDTO
>;
