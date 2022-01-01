import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { LanguageEntity, LocationEntity } from '../entities';
import { LocationLanguageEntity } from '../entities/location-language.entity';
import { LocationLanguageRepository } from '../repositories';

@Injectable()
export class LocationLanguageService {
  constructor(
    private readonly _locationLanguageRepository: LocationLanguageRepository,
  ) {}

  public async createLocationLanguages(
    location: LocationEntity,
    languages: LanguageEntity[],
    queryRunner: QueryRunner,
  ): Promise<LocationLanguageEntity[]> {
    const promiseArray = [];

    for (const language of languages) {
      let locationLanguage = await this._getLocationLanguage({
        location,
        language,
      });

      if (locationLanguage) {
        continue;
      }

      locationLanguage = this._locationLanguageRepository.create({
        location,
        language,
      });

      promiseArray.push(queryRunner.manager.save(locationLanguage));
    }

    return Promise.all(promiseArray);
  }

  private async _getLocationLanguage(
    options: Partial<{ language: LanguageEntity; location: LocationEntity }>,
  ): Promise<LocationLanguageEntity> {
    const queryBuilder =
      this._locationLanguageRepository.createQueryBuilder('locationLanguage');

    if (options.language) {
      queryBuilder.andWhere('locationLanguage.language_id = :language_id', {
        language_id: options.language.id,
      });
    }

    if (options.location) {
      queryBuilder.andWhere('locationLanguage.location_id = :location_id', {
        location_id: options.location.id,
      });
    }

    return queryBuilder.getOne();
  }
}
