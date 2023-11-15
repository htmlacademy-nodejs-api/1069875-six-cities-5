import { prop, getModelForClass, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/hash.js';
import { UserStatus } from '../../types/user-type.enum.js';

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
  public avatarUrl?: string;

  @prop({
    require: true,
    default: UserStatus.Default,
  })
  public status: UserStatus;

  @prop({
    require: true,
    default: '',
  })
  private password?: string;

  @prop({
    type: () => [String],
    default: [],
  })
  public favorite: string[];

  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.status = userData.status;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
