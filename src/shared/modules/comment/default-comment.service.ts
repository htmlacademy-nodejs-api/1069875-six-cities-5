import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CommentModel } from './comment.entity.js';

export class DefaultCommentService implements CommentService {

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const result = await CommentModel.create(dto);
    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return CommentModel.find({ offerId }).exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await CommentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  }
}
