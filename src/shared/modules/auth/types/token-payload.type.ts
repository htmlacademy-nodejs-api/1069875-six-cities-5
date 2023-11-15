import { UserStatus } from '../../../types/index.js';

export type TokenPayload = {
  email: string;
  name: string;
  id: string;
  status: UserStatus;
};
