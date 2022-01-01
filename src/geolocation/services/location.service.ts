import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { LocationDto } from '../dtos';
import { LocationEntity } from '../entities';
import { LocationRepository } from '../repositories';

@Injectable()
export class LocationService {
  constructor(private readonly _locationRepository: LocationRepository) {}

  public async createLocation(
    createLocationDto: LocationDto,
    queryRunner: QueryRunner,
  ): Promise<LocationEntity> {
    let location = await this._getLocation({
      geoname_id: createLocationDto.geoname_id,
    });

    if (location) {
      return location;
    }

    location = this._locationRepository.create(createLocationDto);
    return queryRunner.manager.save(location);
  }

  private async _getLocation(
    options: Partial<{ geoname_id: number }>,
  ): Promise<LocationEntity> {
    const queryBuilder =
      this._locationRepository.createQueryBuilder('location');

    if (options.geoname_id) {
      queryBuilder.andWhere('location.geoname_id = :geoname_id', {
        geoname_id: options.geoname_id,
      });
    }

    return queryBuilder.getOne();
  }

  public async removeLocation(
    location: LocationEntity,
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.manager.delete(LocationEntity, location.id);
  }
}
