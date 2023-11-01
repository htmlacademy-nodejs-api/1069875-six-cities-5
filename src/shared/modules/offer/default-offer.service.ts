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
      .aggregate([
        { $sort: { date: SortType.Down } },
        { $limit: offersCount },
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { offerId: '$$offerId' } },
              { $project: { rating: 1 } },
            ],
            as: 'ratings',
          },
        },
        {
          $addFields: {
            id: { $toString: '$_id' },
            commentsNumber: { $size: '$ratings' },
            rating: {
              $cond: [{ $size: '$ratings' }, { $avg: '$ratings' }, 0]
            },
          },
        },
        { $unset: ['ratings', '_id', 'hostId'] },
      ])
      .exec();
  }

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .aggregate([
        { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: id } ] } } },
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { offerId: '$$offerId' } },
              { $project: { rating: 1 } },
            ],
            as: 'ratings',
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { userId: '$hostId' },
            pipeline: [
              { $match: { $expr : { $eq: ['$_id', '$$userId']} } },
              { $project: { password: 0 } },
            ],
            as: 'host',
          },
        },
        {
          $addFields: {
            id: { $toString: '$_id' },
            commentsNumber: { $size: '$ratings' },
            rating: {
              $cond: [{ $size: '$ratings' }, { $avg: '$ratings' }, 0]
            },
          },
        },
        { $unwind: '$host' },
        { $unset: ['ratings', 'hostId'] },
      ])
      .exec().then((r) => r.at(0) || null);
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
