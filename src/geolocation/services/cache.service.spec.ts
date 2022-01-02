import { CACHE_MANAGER } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CacheService } from '../services';

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    }).compile();

    cacheService = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(cacheService).toBeDefined();
  });
});
