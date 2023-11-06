import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { LoginDTO } from './index.js';

export type LoginRequest = Request<
  RequestParams,
  RequestBody,
  LoginDTO
>;
