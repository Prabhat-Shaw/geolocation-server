import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationLanguageService } from '.';
import { LocationLanguageRepository } from '../repositories';

describe('LocationLanguageService', () => {
  let locationLanguageService: LocationLanguageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocationLanguageService,
        {
          provide: getRepositoryToken(LocationLanguageRepository),
          useValue: {},
        },
      ],
    }).compile();

    locationLanguageService = module.get<LocationLanguageService>(
      LocationLanguageService,
    );
  });

  it('should be defined', () => {
    expect(locationLanguageService).toBeDefined();
  });
});
