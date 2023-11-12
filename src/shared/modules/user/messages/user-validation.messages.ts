import { UserNameLength, UserPasswordLength } from '../../../const/index.js';

export const UserValidationMessage = {
  name: {
    invalidFormat: 'Field image must be a string',
    length: `Name length min is ${UserNameLength.Min}, max is ${UserNameLength.Max}`,
  },
  password: {
    invalidFormat: 'Field image must be a string',
    length: `Password length min is ${UserPasswordLength.Min}, max is ${UserPasswordLength.Max}`,
  },
  email: {
    invalidFormat: 'Email must be a valid address',
  },
  avatarUrl: {
    invalidFormat: 'Field avatar must be a string',
  },
  isPro: {
    invalidFormat: 'Field isPro must be a boolean type',
  },
} as const;
