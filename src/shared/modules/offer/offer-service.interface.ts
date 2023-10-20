import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO, OfferEntity } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
