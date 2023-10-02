import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/common.js';
import dayjs from 'dayjs';
import {
  GuestsNumber,
  PriceValue,
  RatingValue,
  RoomsNumber,
} from '../../const/offer.js';

enum DateDiffNumber {
  Min = 1,
  Max = 10,
}

enum CommentsNumber {
  Min = 0,
  Max = 100,
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
    const isFavorite = generateRandomValue(0, 1);
    const rating = generateRandomValue(RatingValue.Min, RatingValue.Max);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(RoomsNumber.Min, RoomsNumber.Max);
    const guests = generateRandomValue(GuestsNumber.Min, GuestsNumber.Max);
    const price = generateRandomValue(PriceValue.Min, PriceValue.Max);
    const goods = getRandomItems(this.mockData.goods);
    const comments = generateRandomValue(
      CommentsNumber.Min,
      CommentsNumber.Max
    );
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
    const avatar = getRandomItem(this.mockData.avatars);
    const isPro = generateRandomValue(0, 1);
    const host = [name, email, avatar, isPro];

    return [
      title,
      description,
      date,
      city,
      previewImage,
      images.join(';'),
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      guests,
      price,
      goods.join(';'),
      host.join(';'),
      comments,
      location.join(';'),
    ].join('\t');
  }
}
