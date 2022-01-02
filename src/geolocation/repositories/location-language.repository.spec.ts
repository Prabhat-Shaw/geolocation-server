import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationLanguageEntity } from '../entities';
import { LocationLanguageRepository } from './location-language.repository';

describe('LocationLanguageRepository', () => {
  let app: TestingModule;
  let repository: Repository<LocationLanguageEntity>;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(LocationLanguageRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<Repository<LocationLanguageEntity>>(
      getRepositoryToken(LocationLanguageRepository),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
