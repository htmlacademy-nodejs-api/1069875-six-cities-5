import { IsBoolean, IsMongoId } from 'class-validator';
import { FavoriteValidationMessage } from '../index.js';

export class UpdateFavoriteDTO {
  @IsMongoId({ message: FavoriteValidationMessage.offerId.invalidFormat })
  public offerId: string;

  @IsBoolean({ message: FavoriteValidationMessage.toFavorite.invalidFormat })
  public toFavorite: boolean;
}
