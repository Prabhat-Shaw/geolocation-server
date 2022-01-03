import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageEntity } from '../entities';
import { LanguageRepository } from '../repositories/language.repository';

describe('LanguageRepository', () => {
  let app: TestingModule;
  let repository: Repository<LanguageEntity>;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(LanguageRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<Repository<LanguageEntity>>(
      getRepositoryToken(LanguageRepository),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
