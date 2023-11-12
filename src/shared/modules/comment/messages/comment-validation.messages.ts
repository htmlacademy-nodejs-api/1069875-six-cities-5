import { CommentLength, RatingValue } from '../../../const/index.js';

export const CommentValidationMessage = {
  text: {
    invalidFormat: 'Field image must be a string',
    length: `Text length min is ${CommentLength.Min}, max is ${CommentLength.Max}`,
  },
  rating: {
    invalidFormat: 'Field bedrooms must be an integer',
    value: `Minimum rating is ${RatingValue.Min}, maximum is  ${RatingValue.Max}`,
  },
  userId: {
    invalidId: 'UserId field must be a valid id',
  },
  offerId: {
    invalidId: 'OfferId field must be a valid id',
  },
} as const;
