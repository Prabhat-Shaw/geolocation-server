import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { GeolocationEntity } from '../entities';

@EntityRepository(GeolocationEntity)
export class GeolocationRepository extends Repository<GeolocationEntity> {}
