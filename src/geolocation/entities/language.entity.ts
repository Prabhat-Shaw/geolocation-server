import { AbstractEntity } from 'src/common/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { LocationLanguageEntity } from './location-language.entity';

@Entity({ name: 'languages' })
export class LanguageEntity extends AbstractEntity {
  @Column()
  public code: string;

  @Column()
  public name: string;

  @Column()
  public native: string;

  @OneToMany(
    () => LocationLanguageEntity,
    (locationLanguage: LocationLanguageEntity) => locationLanguage.language,
  )
  public locationLanguages: LocationLanguageEntity[];
}
