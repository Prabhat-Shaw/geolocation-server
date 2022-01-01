import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthenticationService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authenticationService: AuthenticationService) {
    super({ usernameField: 'email_address', passwordField: 'password' });
  }
  async validate(emailAddress: string, password: string): Promise<UserEntity> {
    return this._authenticationService.getAuthenticatedUser(
      emailAddress,
      password,
    );
  }
}
