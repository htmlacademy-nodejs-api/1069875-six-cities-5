import { City, GoodType, Offer, OfferType } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';

function transformToOfferObject(dataArray: string[]): Offer {
  const [
    title,
    description,
    date,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxGuests,
    price,
    goods,
    host,
    commentsNumber,
    location,
  ] = dataArray;

  const [latitude, longitude] = location.split(';');
  const [name, email, avatarUrl, isPro] = host.split(';');

  return {
    title,
    description,
    date: new Date(date),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseInt(rating, 10),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxGuests: Number.parseInt(maxGuests, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';').map((good) => good as GoodType),
    host: { name, email, avatarUrl, isPro: isPro === 'true' },
    commentsNumber: Number.parseInt(commentsNumber, 10),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
  };
}

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map((line) => transformToOfferObject(line));
  }
}
