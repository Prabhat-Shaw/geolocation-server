import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LocationEntity } from '../entities';

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {}
