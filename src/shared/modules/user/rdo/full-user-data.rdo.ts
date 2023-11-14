import { Expose } from 'class-transformer';

export class FullUserDataRDO {
  @Expose()
  public name: string;

  @Expose()
  public email: string ;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public isPro: boolean;

  @Expose()
  public favorite: string[];
}
