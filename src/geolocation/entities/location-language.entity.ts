import { AbstractEntity } from 'src/common/entities';
import { Entity, ManyToOne, Unique } from 'typeorm';
import { LanguageEntity } from './language.entity';
import { LocationEntity } from './location.entity';

@Entity({ name: 'location_languages' })
@Unique(['language', 'location'])
export class LocationLanguageEntity extends AbstractEntity {
  @ManyToOne(
    () => LanguageEntity,
    (language: LanguageEntity) => language.locationLanguages,
    { eager: true, nullable: false },
  )
  public language: LanguageEntity;

  @ManyToOne(
    () => LocationEntity,
    (location: LocationEntity) => location.locationLanguages,
    { eager: true, nullable: false },
  )
  public location: LocationEntity;
}
