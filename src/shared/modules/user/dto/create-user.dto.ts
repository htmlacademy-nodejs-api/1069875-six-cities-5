import {
  IsString,
  Length,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { UserValidationMessage } from '../index.js';
import { UserNameLength, UserPasswordLength } from '../../../const/index.js';
import { UserStatus } from '../../../types/index.js';

export class CreateUserDTO {
  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: UserValidationMessage.name.length,
  })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsEnum(UserStatus, { message: UserValidationMessage.status.invalidFormat })
  public status: UserStatus;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UserValidationMessage.password.length,
  })
  public password: string;
}
