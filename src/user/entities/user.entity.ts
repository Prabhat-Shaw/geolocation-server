import { AuthenticationEntity } from 'src/authentication/entities';
import { AbstractEntity } from 'src/common/entities';
import { GeolocationEntity } from 'src/geolocation/entities';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @OneToOne(
    () => AuthenticationEntity,
    (authentication: AuthenticationEntity) => authentication.user,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  public authentication: AuthenticationEntity;

  @OneToMany(
    () => GeolocationEntity,
    (geolocation: GeolocationEntity) => geolocation.user,
  )
  public geolocations: GeolocationEntity[];
}
