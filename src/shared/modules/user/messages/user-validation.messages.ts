import { UserNameLength, UserPasswordLength } from '../../../const/index.js';
import { transformObjectValuesToString } from '../../../helpers/common.js';
import { UserStatus } from '../../../types/index.js';

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
  status: {
    invalidFormat: `Status must be from options: ${transformObjectValuesToString(UserStatus)}`,
  },
} as const;
