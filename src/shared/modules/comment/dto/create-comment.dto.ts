import { IsString, Length, IsInt, Min, Max, IsMongoId } from 'class-validator';
import { CommentValidationMessage } from '../index.js';
import { CommentLength, RatingValue } from '../../../const/index.js';

export class CreateCommentDTO {
  @IsString({ message: CommentValidationMessage.text.invalidFormat })
  @Length(CommentLength.Min, CommentLength.Max, {
    message: CommentValidationMessage.text.length,
  })
  public text: string;

  @IsInt({ message: CommentValidationMessage.rating.invalidFormat })
  @Min(RatingValue.Min, { message: CommentValidationMessage.rating.value })
  @Max(RatingValue.Max, { message: CommentValidationMessage.rating.value })
  public rating: number;

  @IsMongoId({ message: CommentValidationMessage.userId.invalidId })
  public userId: string;

  @IsMongoId({ message: CommentValidationMessage.offerId.invalidId })
  public offerId: string;
}
