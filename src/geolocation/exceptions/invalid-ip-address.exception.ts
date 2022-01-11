import { BadRequestException } from '@nestjs/common';

export class InvalidIpAddressException extends BadRequestException {
  constructor(error?: string) {
    super('IP Address supplied is invalid.', error);
  }
}
