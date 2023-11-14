import { DocumentType, types } from '@typegoose/typegoose';
import { Types } from 'mongoose';
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
import { PipelineStage } from 'mongoose';
import { PREMIUM_OFFERS_NUMBER } from '../../const/index.js';

const PipelineStage: { [key: string]: PipelineStage } = {
  LookUpRatings: {
    $lookup: {
      from: 'comments',
      let: { offer: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$offerId', '$$offer'] } } },
        { $project: { rating: 1, _id: 0 } },
      ],
      as: 'ratings',
    },
  },
  AddCountingFields: {
    $addFields: {
      commentsNumber: { $size: '$ratings' },
      rating: {
        $cond: [{ $size: '$ratings' }, { $avg: '$ratings.rating' }, 0],
      },
    },
  },
  LookUpHostData: {
    $lookup: {
      from: 'users',
      let: { userId: '$hostId' },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
        { $project: { password: 0 } },
      ],
      as: 'host',
    },
  },
};

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
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        PipelineStage.LookUpRatings,
        PipelineStage.AddCountingFields,
      ])
      .exec();
  }

  public async findPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        { $match: { isPremium: true } },
        { $sort: { date: SortType.Down } },
        { $limit: PREMIUM_OFFERS_NUMBER },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        PipelineStage.LookUpRatings,
        PipelineStage.AddCountingFields,
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
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
        PipelineStage.LookUpRatings,
        PipelineStage.AddCountingFields,
        PipelineStage.LookUpHostData,
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        { $unwind: '$host' },
      ])
      .exec()
      .then((r) => r.at(0) || null);
  }

  public async updateById(
    id: string,
    dto: UpdateOfferDTO
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(id, dto).exec();
  }

  public async deleteById(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: id})) !== null;
  }

  public async getOwner(id: string): Promise<string | null> {
    return await this.offerModel.findById(id).then((offer) => offer?.hostId.toString() || null);
  }

  public async findFromList(list: string[]): Promise<DocumentType<OfferEntity>[]> {
    const idsList = list.map((id) => new Types.ObjectId(id));
    return this.offerModel
      .aggregate([
        { $match: {
          _id: { $in: idsList }
        }
        },
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        PipelineStage.LookUpRatings,
        PipelineStage.AddCountingFields,
      ])
      .exec();
  }
}
