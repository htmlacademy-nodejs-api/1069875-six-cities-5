import { Request } from 'express';
import { RequestBody } from '../../../libs/rest/index.js';
import { ParamUserId, UpdateFavoriteDTO } from '../index.js';

export type UpdateFavoriteRequest = Request<
  ParamUserId,
  RequestBody,
  UpdateFavoriteDTO
>;
