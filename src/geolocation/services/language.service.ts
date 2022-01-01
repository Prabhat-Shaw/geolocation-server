import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { LanguageDto } from '../dtos';
import { LanguageEntity, LocationEntity } from '../entities';
import { LanguageRepository } from '../repositories';

@Injectable()
export class LanguageService {
  constructor(private readonly _languageRepository: LanguageRepository) {}

  public async createLanguages(
    createLanguageDtos: LanguageDto[],
    queryRunner: QueryRunner,
  ): Promise<LanguageEntity[]> {
    const languages = [];

    for (const createLanguageDto of createLanguageDtos) {
      const language = await this._createLanguage(
        createLanguageDto,
        queryRunner,
      );

      languages.push(language);
    }

    return languages;
  }

  public async getLanguages(
    options: Partial<{ location: LocationEntity }>,
  ): Promise<LanguageEntity[]> {
    const queryBuilder =
      this._languageRepository.createQueryBuilder('language');

    queryBuilder.innerJoin('language.location_languages', 'locationLanguages');

    if (options.location) {
      queryBuilder.andWhere('locationLanguages.location_id = :location_id', {
        location_id: options.location.id,
      });
    }

    return queryBuilder.getMany();
  }

  public async removeLanguage(
    language: LanguageEntity,
    queryRunner: QueryRunner,
  ): Promise<any> {
    return queryRunner.manager.delete(LanguageEntity, language.id);
  }

  private async _createLanguage(
    createLanguageDto: LanguageDto,
    queryRunner: QueryRunner,
  ): Promise<LanguageEntity> {
    let language = await this._getLanguage({ code: createLanguageDto.code });

    if (language) {
      return language;
    }

    language = this._languageRepository.create(createLanguageDto);
    return queryRunner.manager.save(language);
  }

  private async _getLanguage(
    options: Partial<{ uuid: string; code: string }>,
  ): Promise<LanguageEntity> {
    const queryBuilder =
      this._languageRepository.createQueryBuilder('language');

    if (options.uuid) {
      queryBuilder.andWhere('language.uuid = :uuid', { uuid: options.uuid });
    }

    if (options.code) {
      queryBuilder.andWhere('language.code = :code', { code: options.code });
    }

    return queryBuilder.getOne();
  }
}
