import { DocumentType, types } from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import {
  CreateOfferDTO,
  DEFAULT_OFFER_COUNT,
  UpdateOfferDTO,
} from './index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const offersCount = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .sort({ date: SortType.Down })
      .limit(offersCount)
      .populate('userId')
      .exec();
  }

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).populate('userId').exec();
  }

  public async updateById(
    id: string,
    dto: UpdateOfferDTO
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async deleteById(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }
}
