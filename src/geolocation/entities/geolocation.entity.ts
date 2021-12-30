import { AbstractEntity } from 'src/common/entities';
import { UserEntity } from 'src/user/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity({ name: 'geolocations' })
export class GeolocationEntity extends AbstractEntity {
  @Column()
  public ip: string;

  @Column()
  public hostname: string;

  @Column()
  public type: string;

  @Column()
  public continentCode: string;

  @Column()
  public continentName: string;

  @Column()
  public regionCode: string;

  @Column()
  public regionName: string;

  @Column()
  public city: string;

  @Column()
  public zip: string;

  @Column({ type: 'float' })
  public latitude: number;

  @Column({ type: 'float' })
  public longitude: number;

  @ManyToOne(
    () => LocationEntity,
    (location: LocationEntity) => location.geolocations,
    { eager: true, nullable: false },
  )
  public location: LocationEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.geolocations, {
    eager: true,
    nullable: false,
  })
  public user: UserEntity;

  // @ManyToOne(
  //   () => TimeZoneEntity,
  //   (timeZone: TimeZoneEntity) => timeZone.geolocations,
  //   { eager: true, nullable: false },
  // )
  // public timeZone: TimeZoneEntity;

  // @ManyToOne(
  //   () => CurrencyEntity,
  //   (currency: CurrencyEntity) => currency.geolocations,
  //   { eager: true, nullable: false },
  // )
  // public currency: CurrencyEntity;

  // @ManyToOne(
  //   () => ConnectionEntity,
  //   (connection: ConnectionEntity) => connection.geolocations,
  //   { eager: true, nullable: false },
  // )
  // public connection: ConnectionEntity;

  // @ManyToOne(
  //   () => SecurityEntity,
  //   (security: SecurityEntity) => security.geolocations,
  //   { eager: true, nullable: false },
  // )
  // public security: SecurityEntity;
}
