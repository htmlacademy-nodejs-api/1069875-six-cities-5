import { IsEmail, IsString, Length } from 'class-validator';
import { UserValidationMessage } from '../index.js';
import { UserPasswordLength } from '../../../const/index.js';

export class LoginDTO {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UserValidationMessage.password.length,
  })
  public password: string;
}
