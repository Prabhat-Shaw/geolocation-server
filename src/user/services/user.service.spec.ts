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

describe('The UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
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
          provide: getRepositoryToken(UserRepository),
          useValue: {},
        },
      ],
    }).compile();

    userService = await module.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
