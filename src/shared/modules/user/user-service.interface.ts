import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDTO, UserEntity } from './index.js';

export interface UserService {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(dto: CreateUserDTO): Promise<DocumentType<UserEntity> | null>;
  findById(dto: CreateUserDTO): Promise<DocumentType<UserEntity> | null>;
}
