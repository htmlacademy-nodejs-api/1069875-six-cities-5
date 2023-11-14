import { LoginDTO, UserEntity } from '../user/index.js';

export interface AuthService {
  verify(dto: LoginDTO): Promise<UserEntity>;
  authenticate(user: UserEntity): Promise<string>;
}
