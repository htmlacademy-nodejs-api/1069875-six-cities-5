import { Expose } from 'class-transformer';
import { UserStatus } from '../../../types/index.js';

export class LoggedUserRDO {
  @Expose()
  public email: string ;

  @Expose()
  public token: string;

  @Expose()
  public name: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public status: UserStatus;

  @Expose()
  public favorite: string[];
}
