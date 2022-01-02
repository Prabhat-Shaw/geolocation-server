import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repositories';
import { UserService } from 'src/user/services';
import {
  mockedConfigService,
  mockedConnection,
  mockedJwtService,
  mockedUser,
} from 'src/util/mocks';
import { Connection } from 'typeorm';
import { AuthenticationRepository } from '../repositories';
import { AuthenticationService } from './authentication.service';

jest.mock('bcrypt');

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let bcryptCompare: jest.Mock;
  let getUser: jest.Mock;

  beforeEach(async () => {
    getUser = jest.fn().mockResolvedValue(mockedUser);

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

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

  describe('the provided password is not valid', () => {
    beforeEach(() => {
      bcryptCompare.mockReturnValue(false);
    });

    it('should throw an error', async () => {
      await expect(
        authenticationService.getAuthenticatedUser(
          'user@email.com',
          'strongPassword',
        ),
      ).rejects.toThrow();
    });
  });

  describe('and the user is not found in the database', () => {
    beforeEach(() => {
      getUser.mockResolvedValue(undefined);
    });

    it('should throw an error', async () => {
      await expect(
        authenticationService.getAuthenticatedUser(
          'user@email.com',
          'strongPassword',
        ),
      ).rejects.toThrow();
    });
  });
});
