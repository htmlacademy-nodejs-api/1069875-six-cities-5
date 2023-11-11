import { Expose, Type } from 'class-transformer';
import { UserRDO } from '../../user/index.js';

export class CommentRDO {
  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRDO)
  public user: string;

  @Expose({ name: 'createdAt' })
  public date: string;
}
