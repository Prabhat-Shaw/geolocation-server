import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LocationLanguageEntity } from '../entities/location-language.entity';

@EntityRepository(LocationLanguageEntity)
export class LocationLanguageRepository extends Repository<LocationLanguageEntity> {}
