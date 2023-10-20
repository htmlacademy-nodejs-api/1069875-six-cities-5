import { prop, getModelForClass, defaultClasses, modelOptions, Ref } from '@typegoose/typegoose';
import { City, GoodType, OfferType, Location } from '../../types/index.js';
import { DescriptionLength, GuestsNumber, OfferTitleLength, PriceValue, RatingValue, RoomsNumber } from '../../const/offer.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    require: true,
    minlength: OfferTitleLength.Min,
    maxlength: OfferTitleLength.Max,
  })
  public title: string;

  @prop({
    require: true,
    minlength: DescriptionLength.Min,
    maxlength: DescriptionLength.Max,
  })
  public description: string;

  @prop({
    require: true,
    default: new Date(),
  })
  public date: Date;

  @prop({
    type: () => String,
    enum: City,
    require: true,
  })
  public city: City;

  @prop({
    require: true,
  })
  public previewImage: string;

  @prop({
    require: true,
    default: [],
  })
  public images: string[];

  @prop({
    require: true,
    default: false,
  })
  public isPremium: boolean;

  @prop({
    require: true,
    default: false,
  })
  public isFavorite: boolean;

  @prop({
    require: true,
    min: RatingValue.Min,
    max: RatingValue.Max,
  })
  public rating: number;

  @prop({
    type: () => String,
    enum: OfferType,
    require: true,
  })
  public type: OfferType;

  @prop({
    require: true,
    min: RoomsNumber.Min,
    max: RoomsNumber.Max,
  })
  public bedrooms: number;

  @prop({
    require: true,
    min: GuestsNumber.Min,
    max: GuestsNumber.Max,
  })
  public maxGuests: number;

  @prop({
    require: true,
    min: PriceValue.Min,
    max: PriceValue.Max,
  })
  public price: number;

  @prop({
    type: () => Array<string>,
    enum: GoodType,
    require: true,
    default: []
  })
  public goods: GoodType[];

  @prop({
    ref: UserEntity,
    require: true,
  })
  public hostId: Ref<UserEntity>;

  @prop({
    default: 0,
  })
  public commentsNumber: number;

  @prop({
    require: true,
  })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
