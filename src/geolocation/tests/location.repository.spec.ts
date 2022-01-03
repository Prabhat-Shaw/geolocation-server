import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../entities';
import { LocationRepository } from '../repositories';

describe('LocationRepository', () => {
  let app: TestingModule;
  let repository: Repository<LocationEntity>;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(LocationRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<Repository<LocationEntity>>(
      getRepositoryToken(LocationRepository),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
