import { AbstractEntity } from 'src/common/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { GeolocationEntity } from './geolocation.entity';
import { LocationLanguageEntity } from './location-language.entity';

@Entity({ name: 'locations' })
export class LocationEntity extends AbstractEntity {
  @Column()
  public geonameId: number;

  @Column()
  public capital: string;

  @OneToMany(
    () => LocationLanguageEntity,
    (locationLanguage: LocationLanguageEntity) => locationLanguage.language,
  )
  public locationLanguages: LocationLanguageEntity[];

  @Column()
  public countryFlag: string;

  @Column()
  public countryFlagEmoji: string;

  @Column()
  public countryFlagEmojiUnicode: string;

  @Column()
  public callingCode: string;

  @Column()
  public isEu: boolean;

  @OneToMany(
    () => GeolocationEntity,
    (geolocation: GeolocationEntity) => geolocation.location,
  )
  public geolocations: GeolocationEntity[];
}
