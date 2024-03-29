import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedConnection } from 'src/util/mocks';
import { Connection } from 'typeorm';
import {
  GeolocationRepository,
  LanguageRepository,
  LocationLanguageRepository,
  LocationRepository,
} from '../repositories';
import {
  ClientService,
  GeolocationService,
  LanguageService,
  LocationLanguageService,
  LocationService,
} from '../services';

describe('GeolocationService', () => {
  let geolocationService: GeolocationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GeolocationService,
        ClientService,
        LanguageService,
        LocationService,
        LocationLanguageService,
        ConfigService,
        {
          provide: getRepositoryToken(GeolocationRepository),
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
          provide: getRepositoryToken(LocationLanguageRepository),
          useValue: {},
        },
        {
          provide: Connection,
          useValue: mockedConnection,
        },
      ],
    }).compile();

    geolocationService = module.get<GeolocationService>(GeolocationService);
  });

  it('should be defined', () => {
    expect(geolocationService).toBeDefined();
  });
});
