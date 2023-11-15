import { City, GoodType, Offer, OfferType } from '../types/index.js';

export function createOffer(line: string): Offer {
  const [
    title,
    description,
    date,
    city,
    previewImage,
    images,
    isPremium,
    type,
    bedrooms,
    maxGuests,
    price,
    goods,
    host,
    location,
  ] = line.replace('\n', '').split('\t');

  const [latitude, longitude] = location.split(';');
  const [name, email, isPro] = host.split(';');

  return {
    title,
    description,
    date: new Date(date),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(Number.parseInt(isPremium, 10)),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxGuests: Number.parseInt(maxGuests, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';').map((good) => good as GoodType),
    host: { name, email, isPro: Boolean(Number.parseInt(isPro, 10)) },
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
  };
}
