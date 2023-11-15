import { Expose } from 'class-transformer';

export class UploadAvatarRDO {
  @Expose()
  public filepath: string;
}
