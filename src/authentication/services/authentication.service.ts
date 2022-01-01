import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PostgresErrorCode } from 'src/database/constraints';
import { UserEntity } from 'src/user/entities';
import { UserService } from 'src/user/services';
import { Connection, QueryRunner } from 'typeorm';
import { CreateAuthenticationDto } from '../dtos';
import { RegistrationDto } from '../dtos/registration.dto';
import { AuthenticationEntity } from '../entities';
import { WrongCredentialsProvidedException } from '../exceptions';
import { TokenPayload } from '../interfaces';
import { AuthenticationProvider } from '../providers';
import { AuthenticationRepository } from '../repositories';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _authenticationRepository: AuthenticationRepository,
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    private readonly _connection: Connection,
  ) {}

  public async registration(
    registrationDto: RegistrationDto,
  ): Promise<UserEntity> {
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const authentication = await this._createAuthentication(
        registrationDto,
        queryRunner,
      );

      const user = await this._userService.createUser(
        authentication,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with that email already exists');
      }

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  public login({ uuid }: UserEntity): string {
    return this._getCookieWithJwtToken(uuid);
  }

  public getCookiesForLogout(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public async getAuthenticatedUser(
    emailAddress: string,
    plainTextPassword: string,
  ): Promise<UserEntity> {
    const user = await this._userService.getUser({ emailAddress });

    if (!user) {
      /**
       * the same exception is given to protect the controller from API attacks
       */
      throw new WrongCredentialsProvidedException();
    }

    const isPasswordMatching = await AuthenticationProvider.validateHash(
      plainTextPassword,
      user.authentication.password,
    );

    if (!isPasswordMatching) {
      throw new WrongCredentialsProvidedException();
    }

    return user;
  }

  private async _createAuthentication(
    createAuthenticationDto: CreateAuthenticationDto,
    queryRunner: QueryRunner,
  ): Promise<AuthenticationEntity> {
    const authentication = this._authenticationRepository.create(
      createAuthenticationDto,
    );

    return queryRunner.manager.save(authentication);
  }

  private _getCookieWithJwtToken(uuid: string): string {
    const payload: TokenPayload = { uuid };
    const token = this._jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this._configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
