import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repositories';
import { UserService } from 'src/user/services';
import {
  mockedConfigService,
  mockedConnection,
  mockedJwtService,
} from 'src/util/mocks';
import { Connection } from 'typeorm';
import { AuthenticationRepository } from '../repositories';
import { AuthenticationService } from './authentication.service';

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        UserService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: Connection,
          useFactory: mockedConnection,
        },
        {
          provide: getRepositoryToken(AuthenticationRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {},
        },
      ],
    }).compile();

    authenticationService = await module.get(AuthenticationService);
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const uuid = 'd3fc9322-fc38-4bd8-868b-33ccf67c3ddd';

      expect(typeof authenticationService.getCookieWithJwtToken(uuid)).toEqual(
        'string',
      );
    });
  });

  describe('when removing a cookie', () => {
    it('should return a object (array)', () => {
      expect(typeof authenticationService.getCookiesForLogout()).toEqual(
        'object',
      );
    });
  });
});
