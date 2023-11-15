import {
  IsInt,
  IsString,
  Length,
  Min,
  Max,
  IsEnum,
  IsArray,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { OfferType, City, GoodType } from '../../../types/index.js';
import { Type } from 'class-transformer';
import { LocationDTO } from './location.dto.js';
import {
  OfferTitleLength,
  DescriptionLength,
  RoomsNumber,
  GuestsNumber,
  PriceValue,
  IMAGES_NUMBER,
} from '../../../const/index.js';
import { OfferValidationMessage } from '../index.js';

export class CreateOfferDTO {
  @IsString({ message: OfferValidationMessage.title.invalidFormat })
  @Length(OfferTitleLength.Min, OfferTitleLength.Max, { message: OfferValidationMessage.title.length })
  public title: string;

  @IsString({ message: OfferValidationMessage.description.invalidFormat })
  @Length(DescriptionLength.Min, DescriptionLength.Max, { message: OfferValidationMessage.description.length })
  public description: string;

  @IsEnum(City, { message: OfferValidationMessage.city.invalid })
  public city: City;

  @IsString({ message: OfferValidationMessage.previewImage.invalidFormat })
  public previewImage: string;

  @IsArray({ message: OfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(IMAGES_NUMBER)
  @ArrayMaxSize(IMAGES_NUMBER)
  @IsString({ each: true, message: OfferValidationMessage.images.invalidItems })
  public images: string[];

  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(OfferType, { message: OfferValidationMessage.type.invalidFormat })
  public type: OfferType;

  @IsInt({ message: OfferValidationMessage.bedrooms.invalidFormat })
  @Min(RoomsNumber.Min, { message: OfferValidationMessage.bedrooms.value })
  @Max(RoomsNumber.Max, { message: OfferValidationMessage.bedrooms.value })
  public bedrooms: number;

  @IsInt({ message: OfferValidationMessage.maxGuests.invalidFormat })
  @Min(GuestsNumber.Min, { message: OfferValidationMessage.maxGuests.value })
  @Max(GuestsNumber.Max, { message: OfferValidationMessage.maxGuests.value })
  public maxGuests: number;

  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(PriceValue.Min, { message: OfferValidationMessage.price.value })
  @Max(PriceValue.Max, { message: OfferValidationMessage.price.value })
  public price: number;

  @IsArray({ message: OfferValidationMessage.goods.invalidFormat })
  @IsEnum(GoodType, { each: true, message: OfferValidationMessage.goods.invalidItems })
  public goods: GoodType[];

  public hostId: string;

  @ValidateNested({ each: true, message: OfferValidationMessage.location.invalidFormat })
  @Type(() => LocationDTO)
  public location: LocationDTO;
}
