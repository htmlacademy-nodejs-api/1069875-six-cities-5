import { Expose } from 'class-transformer';

export class OfferRDO {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public date: string;

  @Expose()
  public city: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public commentsNumber: number;
}
