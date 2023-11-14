import { StatusCodes } from 'http-status-codes';
import { DefaultAuthException } from './default-auth.exception.js';

export class UserNotFoundException extends DefaultAuthException {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'User not found');
  }
}
