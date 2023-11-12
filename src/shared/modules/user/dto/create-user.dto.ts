import {
  IsOptional,
  IsString,
  Length,
  IsBoolean,
  IsEmail,
} from 'class-validator';
import { UserValidationMessage } from '../index.js';
import { UserNameLength, UserPasswordLength } from '../../../const/index.js';

export class CreateUserDTO {
  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: UserValidationMessage.name.length,
  })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString({ message: UserValidationMessage.avatarUrl.invalidFormat })
  public avatarUrl?: string;

  @IsBoolean({ message: UserValidationMessage.isPro.invalidFormat })
  public isPro: boolean;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UserValidationMessage.password.length,
  })
  public password: string;
}
