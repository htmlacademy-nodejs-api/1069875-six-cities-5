import { Expose, Type } from 'class-transformer';
import { LocationRDO } from './location.rdo.js';
import { UserRDO } from '../../user/index.js';

export class FullOfferRDO {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public city: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose()
  public commentsNumber: number;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxGuests: number;

  @Expose()
  public goods: string[];

  @Expose()
  @Type(() => LocationRDO)
  public location: LocationRDO;

  @Expose()
  @Type(() => UserRDO)
  public host: UserRDO;
}
