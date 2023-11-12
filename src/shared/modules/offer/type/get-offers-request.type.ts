import { Request } from 'express';
import { RequestQuery } from '../../../libs/rest/index.js';

export type GetOffersRequest = Request<
  unknown,
  unknown,
  unknown,
  RequestQuery
>;
