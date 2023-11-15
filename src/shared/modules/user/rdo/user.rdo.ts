import { Expose } from 'class-transformer';
import { UserStatus } from '../../../types/index.js';

export class UserRDO {
  @Expose()
  public name: string;

  @Expose()
  public email: string ;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public status: UserStatus;
}
