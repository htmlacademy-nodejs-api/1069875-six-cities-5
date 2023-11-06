import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { CreateUserDTO } from './index.js';

export type CreateUserRequest = Request<
  RequestParams,
  RequestBody,
  CreateUserDTO
>;
