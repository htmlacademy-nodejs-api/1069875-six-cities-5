import {
  DescriptionLength,
  GuestsNumber,
  IMAGES_NUMBER,
  OfferTitleLength,
  PriceValue,
  RoomsNumber,
} from '../../../const/index.js';
import { transformObjectValuesToString } from '../../../helpers/common.js';
import { City, GoodType, OfferType } from '../../../types/index.js';

export const OfferValidationMessage = {
  title: {
    invalidFormat: 'Field image must be a string',
    length: `Title length min is ${OfferTitleLength.Min}, max is ${OfferTitleLength.Max}`,
  },
  description: {
    invalidFormat: 'Field image must be a string',
    length: `Description length min is ${DescriptionLength.Min}, max is ${DescriptionLength.Max}`,
  },
  date: {
    invalidFormat: 'Date must be a valid ISO date',
  },
  city: {
    invalid: `Type must be from options: ${transformObjectValuesToString(City)}`,
  },
  previewImage: {
    invalidFormat: 'Field image must be a string',
  },
  images: {
    invalidFormat: 'Field goods must be an array',
    length: `Images field required ${IMAGES_NUMBER} items`,
    invalidItems: 'Items must be a string type',
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be a boolean type',
  },
  type: {
    invalidFormat: `Type must be from options: ${transformObjectValuesToString(OfferType)}`,
  },
  bedrooms: {
    invalidFormat: 'Field bedrooms must be an integer',
    value: `Minimum bedrooms is ${RoomsNumber.Min}, maximum is  ${RoomsNumber.Max}`,
  },
  maxGuests: {
    invalidFormat: 'Field guests must be an integer',
    value: `Minimum guests is ${GuestsNumber.Min}, maximum is ${GuestsNumber.Max}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    value: `Minimum price is ${PriceValue.Min}, maximum is ${PriceValue.Max}`,
  },
  goods: {
    invalidFormat: 'Field goods must be an array',
    invalidItems: `Goods must be one or few options: ${transformObjectValuesToString(GoodType)}`,
  },
  hostId: {
    invalidId: 'HostId field must be a valid id',
  },
  location: {
    invalidFormat: 'Location must be a valid latitude and longitude',
  },
} as const;
