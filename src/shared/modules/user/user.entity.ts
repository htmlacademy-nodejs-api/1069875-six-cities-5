import { prop, getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { User } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    require: true,
    minlength: 1,
    maxlength: 15,
    default: '',
  })
  public name: string;

  @prop({
    unique: true,
    require: true,
    default: '',
  })
  public email: string;

  @prop({
    default: '',
  })
  public avatarUrl: string;

  @prop({
    require: true,
    default: false,
  })
  public isPro: boolean;
}

export const UserModel = getModelForClass(UserEntity);
