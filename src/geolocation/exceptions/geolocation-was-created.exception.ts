import { BadRequestException } from '@nestjs/common';

export class GeolocationWasCreatedException extends BadRequestException {
  constructor(error?: string) {
    super('Geolocation was created', error);
  }
}
