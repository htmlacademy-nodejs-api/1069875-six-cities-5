import { StatusCodes } from 'http-status-codes';
import { DefaultAuthException } from './default-auth.exception.js';

export class UserPasswordIncorrectException extends DefaultAuthException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect user name or password');
  }
}
