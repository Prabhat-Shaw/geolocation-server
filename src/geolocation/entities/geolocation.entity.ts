import { AbstractEntity } from 'src/common/entities';
import { UserEntity } from 'src/user/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity({ name: 'geolocations' })
export class GeolocationEntity extends AbstractEntity {
  @Column()
  public ip: string;

  @Column()
  public type: string;

  @Column()
  public continent_code: string;

  @Column()
  public continent_name: string;

  @Column()
  public region_code: string;

  @Column()
  public region_name: string;

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
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  public location: LocationEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.geolocations, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  public user: UserEntity;
}
