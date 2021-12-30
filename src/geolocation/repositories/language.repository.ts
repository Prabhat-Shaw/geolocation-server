import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LanguageEntity } from '../entities';

@EntityRepository(LanguageEntity)
export class LanguageRepository extends Repository<LanguageEntity> {}
