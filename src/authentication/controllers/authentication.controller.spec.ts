import { INestApplication, ValidationPipe } from '@nestjs/common';
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
  mockedUser,
} from 'src/util/mocks';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AuthenticationRepository } from '../repositories';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let app: INestApplication;
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        UserService,
        AuthenticationService,
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
          useValue: mockedConnection,
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

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    authenticationController = module.get<AuthenticationController>(
      AuthenticationController,
    );
  });

  it('should be defined', () => {
    expect(authenticationController).toBeDefined();
  });

  describe('when registering', () => {
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/Authentication/registration')
          .send({
            email_address: mockedUser.authentication.email_address,
          })
          .expect(400);
      });
    });
  });
});
