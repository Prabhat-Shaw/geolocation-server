import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { UserEntity } from 'src/user/entities';
import { Connection, DeleteResult, QueryRunner } from 'typeorm';
import {
  CreateGeolocationDto,
  GeolocationDto,
  RemoveGeolocationDto,
} from '../dtos';
import { GeolocationEntity, LanguageEntity, LocationEntity } from '../entities';
import {
  GeolocationNotFoundedException,
  GeolocationWasCreatedException,
} from '../exceptions';
import { GeolocationRepository } from '../repositories';
import { ClientService } from './client.service';
import { LanguageService } from './language.service';
import { LocationLanguageService } from './location-language.service';
import { LocationService } from './location.service';

@Injectable()
export class GeolocationService {
  constructor(
    private readonly _geolocationRepository: GeolocationRepository,
    private readonly _clientService: ClientService,
    private readonly _connection: Connection,
    private readonly _languageService: LanguageService,
    private readonly _locationService: LocationService,
    private readonly _locationLanguageService: LocationLanguageService,
  ) {}

  public async getGeolocations(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<GeolocationEntity>> {
    const queryBuilder =
      this._geolocationRepository.createQueryBuilder('geolocation');

    queryBuilder
      .innerJoinAndSelect('geolocation.user', 'user')
      .innerJoinAndSelect('user.authentication', 'authentication')
      .innerJoinAndSelect('geolocation.location', 'location')
      .orderBy('geolocation.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  public async createGeolocation(
    { ipAddress }: CreateGeolocationDto,
    user: UserEntity,
  ): Promise<GeolocationEntity> {
    const geolocationData = await this._clientService.getData(ipAddress);

    return this._saveData(geolocationData, user);
  }

  public async removeGeolocations(
    { uuid }: RemoveGeolocationDto,
    user: UserEntity,
  ): Promise<GeolocationEntity> {
    const geolocation = await this._getGeolocation({ uuid, user });

    if (!geolocation) {
      throw new GeolocationNotFoundedException();
    }

    const queryRunner = this._connection.createQueryRunner();
    const promiseArray = [];

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      geolocation.location.languages.forEach((language: LanguageEntity) =>
        promiseArray.push(
          this._languageService.removeLanguage(language, queryRunner),
        ),
      );

      promiseArray.push(
        this._removeGeolocation(geolocation, queryRunner),
        this._locationService.removeLocation(geolocation.location, queryRunner),
      );

      await Promise.all(promiseArray);

      await queryRunner.commitTransaction();

      return geolocation;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  private async _getGeolocation(
    options: Partial<{ user: UserEntity; uuid: string; ip: string }>,
  ): Promise<GeolocationEntity> {
    const queryBuilder =
      this._geolocationRepository.createQueryBuilder('geolocation');

    queryBuilder.innerJoinAndSelect('geolocation.location', 'location');

    if (options.uuid) {
      queryBuilder.andWhere('geolocation.uuid = :uuid', { uuid: options.uuid });
    }

    if (options.user) {
      queryBuilder.andWhere('geolocation.user_id = :user_id', {
        user_id: options.user.id,
      });
    }

    return queryBuilder.getOne();
  }

  private async _removeGeolocation(
    geolocation: GeolocationEntity,
    queryRunner: QueryRunner,
  ): Promise<DeleteResult> {
    return queryRunner.manager.delete(GeolocationEntity, geolocation.id);
  }

  private async _saveData(
    geolocationDto: GeolocationDto,
    user: UserEntity,
  ): Promise<GeolocationEntity | any> {
    const geolocation = await this._getGeolocation({ ip: geolocationDto.ip });

    if (geolocation) {
      throw new GeolocationWasCreatedException();
    }

    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [location, languages] = await Promise.all([
        this._locationService.createLocation(
          geolocationDto.location,
          queryRunner,
        ),
        this._languageService.createLanguages(
          geolocationDto.location.languages,
          queryRunner,
        ),
      ]);

      const [, geolocation] = await Promise.all([
        this._locationLanguageService.createLocationLanguages(
          location,
          languages,
          queryRunner,
        ),
        this._createGeolocation(geolocationDto, location, user, queryRunner),
      ]);

      await queryRunner.commitTransaction();

      geolocation.location.languages = await this._languageService.getLanguages(
        { location: geolocation.location },
      );

      return geolocation;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  private async _createGeolocation(
    geolocationDto: GeolocationDto,
    location: LocationEntity,
    user: UserEntity,
    queryRunner: QueryRunner,
  ): Promise<GeolocationEntity> {
    const geolocation = this._geolocationRepository.create({
      ...geolocationDto,
      location,
      user,
    });

    return queryRunner.manager.save(geolocation);
  }
}
