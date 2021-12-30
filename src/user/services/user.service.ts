import { Injectable } from '@nestjs/common';
import { AuthenticationEntity } from 'src/authentication/entities';
import { QueryRunner } from 'typeorm';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  public async createUser(
    authentication: AuthenticationEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this._userRepository.create({ authentication });

    return queryRunner.manager.save(user);
  }

  public async getUser(
    options: Partial<{ uuid: string; emailAddress: string }>,
  ): Promise<UserEntity> {
    const queryBuilder = this._userRepository.createQueryBuilder('user');

    queryBuilder.innerJoinAndSelect('user.authentication', 'authentication');

    if (options.uuid) {
      queryBuilder.andWhere('user.uuid = :uuid', { uuid: options.uuid });
    }

    if (options.emailAddress) {
      queryBuilder.andWhere('authentication.emailAddress = :emailAddress', {
        emailAddress: options.emailAddress,
      });
    }

    return queryBuilder.getOne();
  }
}
