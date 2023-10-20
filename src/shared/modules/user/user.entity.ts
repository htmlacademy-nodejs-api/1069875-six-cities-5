import { prop, getModelForClass, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
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

  @prop({
    require: true,
    default: '',
  })
  private password?: string;

  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
