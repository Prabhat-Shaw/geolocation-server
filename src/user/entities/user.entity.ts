import { AuthenticationEntity } from 'src/authentication/entities';
import { AbstractEntity } from 'src/common/entities';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @OneToOne(
    () => AuthenticationEntity,
    (authentication: AuthenticationEntity) => authentication.user,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  public authentication: AuthenticationEntity;
}
