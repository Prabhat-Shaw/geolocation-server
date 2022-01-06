import { BadRequestException } from '@nestjs/common';

export class MonthlyLimitReachedException extends BadRequestException {
  constructor(error?: string) {
    super('Monthly limit reached', error);
  }
}
