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
  ] = line.replace('\n', '').split('\t');

  const [latitude, longitude] = location.split(';');
  const [name, email, avatarUrl, isPro] = host.split(';');

  return {
    title,
    description,
    date: new Date(date),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number.parseInt(rating, 10),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxGuests: Number.parseInt(maxGuests, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';').map((good) => good as GoodType),
    host: { name, email, avatarUrl, isPro: Boolean(isPro) },
    commentsNumber: Number.parseInt(commentsNumber, 10),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
  };
}
