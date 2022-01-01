import { AbstractEntity } from 'src/common/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { LocationLanguageEntity } from './location-language.entity';

@Entity({ name: 'languages' })
export class LanguageEntity extends AbstractEntity {
  @Column({ unique: true })
  public code: string;

  @Column()
  public name: string;

  @Column()
  public native: string;

  @OneToMany(
    () => LocationLanguageEntity,
    (location_language: LocationLanguageEntity) => location_language.language,
  )
  public location_languages: LocationLanguageEntity[];
}
