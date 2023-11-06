import { Expose } from 'class-transformer';

export class LocationRDO {
  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;
}
