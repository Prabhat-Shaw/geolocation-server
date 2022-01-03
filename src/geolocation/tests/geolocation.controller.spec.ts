import { HttpModule } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedConnection } from 'src/util/mocks';
import { Connection } from 'typeorm';
import { GeolocationController } from '../controllers/geolocation.controller';
import {
  GeolocationRepository,
  LanguageRepository,
  LocationLanguageRepository,
  LocationRepository,
} from '../repositories';
import {
  CacheService,
  ClientService,
  GeolocationService,
  LanguageService,
  LocationLanguageService,
  LocationService,
} from '../services';

describe('GeolocationController', () => {
  let app: INestApplication;
  let geolocationController: GeolocationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [GeolocationController],
      providers: [
        ClientService,
        GeolocationService,
        LocationLanguageService,
        LocationService,
        LanguageService,
        CacheService,
        ConfigService,
        {
          provide: getRepositoryToken(GeolocationRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(LocationLanguageRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(LanguageRepository),
          useValue: {},
        },
        {
          provide: getRepositoryToken(LocationRepository),
          useValue: {},
        },
        {
          provide: Connection,
          useValue: mockedConnection,
        },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    geolocationController = module.get<GeolocationController>(
      GeolocationController,
    );
  });

  it('should be defined', () => {
    expect(geolocationController).toBeDefined();
  });
});
