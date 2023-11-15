import { DocumentType, types } from '@typegoose/typegoose';
import { CreateUserDTO, DEFAULT_AVATAR_FILE_NAME } from './index.js';
import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ){}

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({ ...dto, avatarUrl: DEFAULT_AVATAR_FILE_NAME });
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);
    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id).exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.userModel.exists({_id: id})) !== null;
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateFavorites(userId: string, offerId: string, toAdd: boolean): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findByIdAndUpdate(userId, { [`$${toAdd ? 'push' : 'pull'}`]: { favorite: offerId }}, { new: true }).exec();
  }
}
