import { UnauthorizedException } from '@nestjs/common';

export class WrongCredentialsProvidedException extends UnauthorizedException {
  constructor(error?: string) {
    super('Wrong credentials provided', error);
  }
}
