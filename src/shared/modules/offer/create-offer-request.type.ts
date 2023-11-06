import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { CreateOfferDTO } from './index.js';

export type CreateOfferRequest = Request<
  RequestParams,
  RequestBody,
  CreateOfferDTO
>;
