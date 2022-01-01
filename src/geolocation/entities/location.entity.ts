import { AbstractEntity } from 'src/common/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { LanguageEntity } from '.';
import { GeolocationEntity } from './geolocation.entity';
import { LocationLanguageEntity } from './location-language.entity';

@Entity({ name: 'locations' })
export class LocationEntity extends AbstractEntity {
  @Column({ unique: true })
  public geoname_id: number;

  @Column()
  public capital: string;

  @OneToMany(
    () => LocationLanguageEntity,
    (location_language: LocationLanguageEntity) => location_language.language,
  )
  public location_languages: LocationLanguageEntity[];

  @Column()
  public country_flag: string;

  @Column()
  public country_flag_emoji: string;

  @Column()
  public country_flag_emoji_unicode: string;

  @Column()
  public calling_code: string;

  @Column()
  public is_eu: boolean;

  @OneToMany(
    () => GeolocationEntity,
    (geolocation: GeolocationEntity) => geolocation.location,
  )
  public geolocations: GeolocationEntity[];

  public languages: LanguageEntity[];
}
