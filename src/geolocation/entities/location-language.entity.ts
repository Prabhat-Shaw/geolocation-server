import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities';
import { Entity, Index, ManyToOne, Unique } from 'typeorm';
import { LanguageEntity } from './language.entity';
import { LocationEntity } from './location.entity';

@Entity({ name: 'location_languages' })
@Unique(['language', 'location'])
export class LocationLanguageEntity extends AbstractEntity {
  @ManyToOne(
    () => LanguageEntity,
    (language: LanguageEntity) => language.location_languages,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @Index()
  public language: LanguageEntity;

  @ManyToOne(
    () => LocationEntity,
    (location: LocationEntity) => location.location_languages,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @Exclude()
  @Index()
  public location: LocationEntity;
}
