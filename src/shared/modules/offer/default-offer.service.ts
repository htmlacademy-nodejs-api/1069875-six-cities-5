import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO } from './index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

export class DefaultOfferService implements OfferService {
  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    return await OfferModel.create(dto);
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return OfferModel.findById(id).exec();
  }
}
