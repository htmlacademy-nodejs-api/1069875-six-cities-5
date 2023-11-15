import { City, GoodType, Offer, OfferType, UserStatus } from '../types/index.js';

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
  const [name, email, userStatus] = host.split(';');
  const status = userStatus as UserStatus;

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
    host: { name, email, status },
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
  };
}
