import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ClientService } from '../services';

describe('ClientService', () => {
  let clientService: ClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ConfigService, ClientService],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
  });
});
