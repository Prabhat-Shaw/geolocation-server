import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from '../entities';
import { AuthenticationRepository } from './authentication.repository';

describe('AuthenticationRepository', () => {
  let app: TestingModule;
  let repository: Repository<AuthenticationEntity>;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(AuthenticationRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<Repository<AuthenticationEntity>>(
      getRepositoryToken(AuthenticationRepository),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
