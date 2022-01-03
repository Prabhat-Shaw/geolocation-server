import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories/user.repository';

describe('UserRepository', () => {
  let app: TestingModule;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<Repository<UserEntity>>(
      getRepositoryToken(UserRepository),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
