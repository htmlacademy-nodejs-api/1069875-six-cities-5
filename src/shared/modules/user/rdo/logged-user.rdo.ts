import { Expose } from 'class-transformer';

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
  public isPro: boolean;

  @Expose()
  public favorite: string[];
}
