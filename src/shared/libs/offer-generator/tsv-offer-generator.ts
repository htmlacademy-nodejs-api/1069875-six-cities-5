import { MockServerData } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';
import dayjs from 'dayjs';
import {
  GuestsNumber,
  PriceValue,
  RoomsNumber,
} from '../../const/index.js';

enum DateDiffNumber {
  Min = 1,
  Max = 10,
}

enum LatitudeNumber {
  Min = 47,
  Max = 54,
}

enum LongitudeNumber {
  Min = 1,
  Max = 11,
}

const LOCATION_FLOAT_NUMBER = 6;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const date = dayjs()
      .subtract(
        generateRandomValue(DateDiffNumber.Min, DateDiffNumber.Max),
        'day'
      )
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const images = getRandomItems(this.mockData.images);
    const previewImage = getRandomItem(images);
    const isPremium = generateRandomValue(0, 1);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(RoomsNumber.Min, RoomsNumber.Max);
    const guests = generateRandomValue(GuestsNumber.Min, GuestsNumber.Max);
    const price = generateRandomValue(PriceValue.Min, PriceValue.Max);
    const goods = getRandomItems(this.mockData.goods);

    const location = [
      generateRandomValue(
        LatitudeNumber.Min,
        LatitudeNumber.Max,
        LOCATION_FLOAT_NUMBER
      ),
      generateRandomValue(
        LongitudeNumber.Min,
        LongitudeNumber.Max,
        LOCATION_FLOAT_NUMBER
      ),
    ];

    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const isPro = generateRandomValue(0, 1);
    const host = [name, email, isPro];

    return [
      title,
      description,
      date,
      city,
      previewImage,
      images.join(';'),
      isPremium,
      type,
      bedrooms,
      guests,
      price,
      goods.join(';'),
      host.join(';'),
      location.join(';'),
    ].join('\t');
  }
}
