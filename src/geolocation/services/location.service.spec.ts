import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationRepository } from '../repositories';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let locationService: LocationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(LocationRepository),
          useValue: {},
        },
      ],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });
});
