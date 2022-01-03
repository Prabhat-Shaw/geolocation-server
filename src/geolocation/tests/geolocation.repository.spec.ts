import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeolocationEntity } from '../entities';
import { GeolocationRepository } from '../repositories/geolocation.repository';

describe('GeolocationRepository', () => {
  let app: TestingModule;
  let repository: Repository<GeolocationEntity>;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(GeolocationRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<Repository<GeolocationEntity>>(
      getRepositoryToken(GeolocationRepository),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
