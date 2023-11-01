import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO, UpdateOfferDTO, OfferEntity } from './index.js';

export interface OfferService {
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(id: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
