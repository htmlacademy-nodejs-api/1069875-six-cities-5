import { OfferType, City, GoodType, Location } from '../../../types/index.js';

export class UpdateOfferDTO {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: OfferType;
  public bedrooms?: number;
  public maxGuests?: number;
  public price?: number;
  public goods?: GoodType[];
  public location?: Location;
}
