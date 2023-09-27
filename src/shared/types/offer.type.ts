import { City } from './city.enum.js';
import { OfferType } from './offer-type.enum.js';
import { GoodType } from './good-type.enum.js';
import { Location } from './location.type.js';
import { Host } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxGuests: number;
  price: number;
  goods: GoodType[];
  host: Host;
  commentsNumber: number;
  location: Location;
};
