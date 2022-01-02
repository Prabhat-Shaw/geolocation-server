import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LanguageRepository } from '../repositories';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let languageService: LanguageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LanguageService,
        {
          provide: getRepositoryToken(LanguageRepository),
          useValue: {},
        },
      ],
    }).compile();

    languageService = module.get<LanguageService>(LanguageService);
  });

  it('should be defined', () => {
    expect(languageService).toBeDefined();
  });
});
