import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDTO, UserEntity } from './index.js';
import { DocumentExists } from '../../types/index.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  exists(id: string): Promise<boolean>;
}
