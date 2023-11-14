import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO, UpdateOfferDTO, OfferEntity } from './index.js';
import { DocumentExists, HasOwner } from '../../types/index.js';

export interface OfferService extends DocumentExists, HasOwner {
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  findPremium(): Promise<DocumentType<OfferEntity>[]>;
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(id: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  exists(id: string): Promise<boolean>;
  findFromList(list: string[]): Promise<DocumentType<OfferEntity>[]>;
  getOwner(id: string): Promise<string | null>;
}
